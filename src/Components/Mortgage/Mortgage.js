import React, { useState } from "react";

import data from "./mortgage.json";

import styles from "./Mortgage.module.scss";

import Calculator from "./Calculator/Calculator";
import Results from "./Results/Results";

export default function Mortgage() {
  const [result, setResult] = useState({});

  const resultHandler = (result) => {
    // console.log("Result", result);
    setResult(result);
  };

  return (
    <div className={styles.mortgage}>
      <div className={styles["mortgage-container"]}>
        <Calculator title={data.calculator.title} form={data.calculator.form} setResult={resultHandler}></Calculator>
        <Results result={result}></Results>
      </div>
    </div>
  );
}
