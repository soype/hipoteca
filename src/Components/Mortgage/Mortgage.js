import React, { useState } from "react";

import text from "./mortgage.json";

import styles from "./Mortgage.module.scss";

import Calculator from "./Calculator/Calculator";
import Results from "./Results/Results";

import { ReactComponent as BankLoan } from "../../assets/bank-loan.svg";

export default function Mortgage() {
  const [result, setResult] = useState({});
  const [language, setLanguage] = useState("es");
  const [data, setData] = useState(text.es);

  const resultHandler = (result) => {
    setResult(result);
  };

  const languageHandler = () => {
    let selection;
    if (language === "es") {
      selection = "en";
    } else {
      selection = "es";
    }
    setLanguage(selection);
    setData(text[selection]);
  };

  return (
    <div className={styles.mortgage}>
      <div className={styles.header}>
        <h1 className={styles.title}>{data.title}</h1>
        <div className={styles.language}>
          <button className={styles["language-selection"]} onClick={languageHandler}>
            {language === "es" ? "English" : "Español"}
          </button>
        </div>
      </div>
      <div className={styles["mortgage-container"]}>
        <Calculator title={data.calculator.title} form={data.calculator.form} setResult={resultHandler}></Calculator>
        <Results data={data.results} result={result}></Results>
      </div>
      <BankLoan className={styles.bank} />
    </div>
  );
}
