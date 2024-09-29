import React from "react";

import styles from "./Results.module.scss";
import data from "../mortgage.json";

const Results = ({result}) => {

  console.log('Result: ', result);

  const text = data.results.form.data;
  const title = data.results.title;

  // format monthly payment to currency using the user's locale
  const formatCurrency = (value) => {
    const formatter = new Intl.NumberFormat(navigator.language, {
      style: 'currency',
      currency: 'ARS',
    });
    return formatter.format(value);
  };
  
  return <div className={styles.results}>
    <h2>Results</h2>
    <p>{title}</p>
    {result.monthlyPayment && <div>
      <p>{text.monthlyPayment}{result.monthlyPayment}</p>
      <p>{text.CABA}</p>
      {/* <p>{text.escritura}{formatCurrency(result.escritura)}</p>
      <p>{text.escribano}{formatCurrency(result.escribano)}</p>
      <p>{text.inmobiliaria}{formatCurrency(result.inmobiliaria)}</p>
      <p>{text.initialPayment}{formatCurrency(result.initialPayment)}</p> */}
    </div>}
  </div>;
};

export default Results;
