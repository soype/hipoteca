import React, { useState} from "react";

import styles from "./Calculator.module.scss";

const Calculator = ({ title, form, setResult }) => {
  //   const [state, formAction] = useFormState(calculateMortgage, { error: null, message: null });

  const [errorMessage, setErrorMessage] = useState('');

  // Convert form fields to array
  const fieldsArray = Object.values(form.fields);

  const calculateMortgage = (event) => {

    event.preventDefault();

    const formData = new FormData(event.target);
    
    let errorMessage = '';

    const data = {
      houseValue: formData.get("houseValue"),
      loanAmount: formData.get("loanAmount"),
      loanMax: formData.get("loanMax"),
      interestRate: formData.get("interestRate"),
      loanDuration: formData.get("loanDuration"),
      salary: formData.get("salary")
    };

    // ERRROR CHECK

    // Check for empty fields
    for (const [key, value] of Object.entries(data)) {
      if (key !== "salary") {
        if (value.length < 1 || value === null) {
          errorMessage = "Por favor, ingresá todos los datos necesarios";
        }
      }
    }

    // Check for negative values
    Object.values(data).forEach(value => {
      if (value < 0) {
        errorMessage = "Por favor, ingresá solo números positivos";
      }
    });

    // Check if loan amount is allowed by loan max
    if (data.loanAmount > ((data.loanMax / 100) * data.houseValue)) {
      errorMessage = "El monto solicitado excede el máximo permitido";
    }
  
    if(errorMessage.length > 0){
      setErrorMessage(errorMessage);
      return;
    }

    // END ERROR CHECK

    console.log('Data: ',data)
 
    let submittedData;

    // Calculate loan
    const monthlyPayment = data.houseValue / (1 - (1 / (1 + data.interestRate)) ** data.loanDuration) / data.interestRate;

    const escritura = data.houseValue * 0.015;
    const escribano = data.houseValue * 0.02;
    const inmobiliaria = data.houseValue * 0.04 + data.houseValue * 0.04 * 0.21;

    const downpayment = data.houseValue - data.loanAmount;
    console.log('Downpayment: ', downpayment);

    const initialPayment = escritura + escribano + inmobiliaria + downpayment;

    submittedData = {
      // message: "Resultados de tu hipoteca",
      monthlyPayment: monthlyPayment,
      escritura: escritura,
      escribano: escribano,
      inmobiliaria: inmobiliaria,
      initialPayment: initialPayment,
    };

    setErrorMessage('');
    setResult(submittedData);
  };

  return (
    <div className={styles.calculator}>
      <h2>{title}</h2>
      <form action="" onSubmit={calculateMortgage}>
        <button className={styles.clear}>{form.clear}</button>
        {fieldsArray.map((field) => {
          return (
            <div key={field.name}>
              <div className={styles["field"]}>
                <label htmlFor={field.name}>{field.label}</label>
                <div className={`${styles["field-container"]} ${field.symbol.length > 1 && styles["field-container--right"]}`}>
                  {field.symbol.length < 2 && <span className={`${styles.symbol} ${styles["symbol--left"]}`}>{field.symbol}</span>}
                  <input className={styles.input} id={field.name} name={field.name} type="text" placeholder={field.placeholder} />
                  {field.symbol.length > 1 && <span className={`${styles.symbol} ${styles["symbol--right"]}`}>{field.symbol}</span>}
                </div>
              </div>
            </div>
          );
        })}
        {errorMessage.length > 0 && <p className={styles.error}>{errorMessage}</p>}
        <button className={styles.submit}>{form.submit}</button>
      </form>
    </div>
  );
};

export default Calculator;
