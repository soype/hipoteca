import React, { useState, useEffect } from "react";

import styles from "./Calculator.module.scss";

const Calculator = ({ title, form, setResult }) => {
  //   const [state, formAction] = useFormState(calculateMortgage, { error: null, message: null });

  const [errorMessage, setErrorMessage] = useState("");
  const [houseValue, setHouseValue] = useState(0);
  const [loanMax, setLoanMax] = useState(0);
  const [loanAmount, setLoanAmount] = useState(0);
  const [maxLoanAmount, setMaxLoanAmount] = useState(0);
  const [enableLoanAmount, setEnableLoanAmount] = useState(true);

  // Convert form fields to array
  const fieldsArray = Object.values(form.fields);

  const calculateMortgage = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);

    let errorMessage = "";

    const data = {
      houseValue: formData.get("houseValue"),
      loanAmount: formData.get("loanAmount"),
      loanMax: formData.get("loanMax"),
      interestRate: formData.get("interestRate"),
      loanDuration: formData.get("loanDuration"),
      salary: formData.get("salary"),
    };

    if (data.salary.length < 1) {
      data.salary = 30;
    }

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
    Object.values(data).forEach((value) => {
      if (value < 0) {
        errorMessage = "Por favor, ingresá solo números positivos";
      }
    });

    // Check if loan amount is allowed by loan max
    if (data.loanAmount > (data.loanMax / 100) * data.houseValue) {
      errorMessage = "El monto solicitado excede el máximo permitido";
    }

    if (errorMessage.length > 0) {
      setResult({});
      setErrorMessage(errorMessage);
      return;
    }

    // END ERROR CHECK

    let submittedData;

    // Calculate loan
    const monthlyRate = data.interestRate / 100 / 12;
    const numberOfPayments = data.loanDuration * 12;
    const monthlyPayment = data.loanAmount * (monthlyRate / (1 - Math.pow(1 + monthlyRate, -numberOfPayments)));
    const salary = monthlyPayment / (data.salary / 100);

    const escritura = data.houseValue * 0.015;
    const escribano = data.houseValue * 0.02;
    const inmobiliaria = data.houseValue * 0.04 + data.houseValue * 0.04 * 0.21;

    const downpayment = data.houseValue - data.loanAmount;
    console.log("Downpayment: ", downpayment);

    const initialPayment = escritura + escribano + inmobiliaria + downpayment;

    submittedData = {
      monthlyPayment: monthlyPayment,
      escritura: escritura,
      escribano: escribano,
      inmobiliaria: inmobiliaria,
      initialPayment: initialPayment,
      salary: salary,
    };

    setErrorMessage("");
    setResult(submittedData);
  };

  const clearForm = (event) => {
    event.preventDefault();
    const form = event.target.form;

    // Clear all input fields
    form.reset();

    // Reset the result and error messages
    setResult({});
    setErrorMessage("");
  };

  const houseValueHandler = (event) => {
    setHouseValue(event.target.value);
  };

  const loanMaxHandler = (event) => {
    setLoanMax(event.target.value);
  };

  useEffect(() => {
    // Calculate the loan amount based on the house value and loan max
    if (houseValue > 0 && loanMax > 0) {
      setEnableLoanAmount(false);
      setMaxLoanAmount((loanMax / 100) * houseValue);
    }
  }, [houseValue, loanMax]);

  const loanAmountHandler = (event) => {
    setLoanAmount(event.target.value);
  };

  return (
    <div className={styles.calculator}>
      <h2>{title}</h2>
      <form action="" onSubmit={calculateMortgage}>
        <button className={styles.clear} onClick={clearForm}>
          {form.clear}
        </button>
        {fieldsArray.map((field) => {
          return (
            <div key={field.name}>
              <div className={styles["field"]}>
                <label htmlFor={field.name}>{field.label}</label>
                {field.name === "houseValue" || field.name === "loanMax" ? (
                  <div className={`${styles["field-container"]} ${field.symbol.length > 1 && styles["field-container--right"]}`}>
                    {field.symbol.length < 2 && <span className={`${styles.symbol} ${styles["symbol--left"]}`}>{field.symbol}</span>}
                    <input className={styles.input} id={field.name} name={field.name} type="text" onChange={field.name === "houseValue" ? houseValueHandler : loanMaxHandler} placeholder={field.placeholder} />
                    {field.symbol.length > 1 && <span className={`${styles.symbol} ${styles["symbol--right"]}`}>{field.symbol}</span>}
                  </div>
                ) : field.name === "loanAmount" ? (
                  <div className={`${styles["field-container"]} ${styles["loan-amount"]} ${field.symbol.length > 1 && styles["field-container--right"]}`}>
                    <p>{loanAmount}</p>
                    <input className={styles.input} id={field.name} name={field.name} type="range" min="0" max={maxLoanAmount} onChange={loanAmountHandler} disabled={enableLoanAmount} placeholder={field.placeholder} />
                    {field.symbol.length > 1 && <span className={`${styles.symbol} ${styles["symbol--right"]}`}>{field.symbol}</span>}
                  </div>
                ) : (
                  <div className={`${styles["field-container"]} ${field.symbol.length > 1 && styles["field-container--right"]}`}>
                    {field.symbol.length < 2 && <span className={`${styles.symbol} ${styles["symbol--left"]}`}>{field.symbol}</span>}
                    <input className={styles.input} id={field.name} name={field.name} type="text" placeholder={field.placeholder} />
                    {field.symbol.length > 1 && <span className={`${styles.symbol} ${styles["symbol--right"]}`}>{field.symbol}</span>}
                  </div>
                )}
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
