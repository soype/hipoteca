import React from "react";

import styles from "./Results.module.scss";

import { ReactComponent as HouseTalking } from "../../../assets/house-talking.svg";

const Results = ({result, data}) => {

  const text = data.fields;

  // format monthly payment to currency using the user's locale
  const formatCurrency = (value) => {
    const formatter = new Intl.NumberFormat(navigator.language, {
      style: 'currency',
      currency: 'USD',
    });
    return formatter.format(value);
  };
  
  return <div className={styles.results}>
    <h2>{data.title}</h2>
    {result.monthlyPayment ? <div className={styles.content}>
      <p>{text.monthlyPayment}<strong>{formatCurrency(result.monthlyPayment)}</strong></p>
      <p>{text.CABA}</p>
      <p>{text.escritura}<strong>{formatCurrency(result.escritura)}</strong></p>
      <p>{text.escribano}<strong>{formatCurrency(result.escribano)}</strong></p>
      <p>{text.inmobiliaria}<strong>{formatCurrency(result.inmobiliaria)}</strong></p>
      <p>{text.initialPayment}<strong>{formatCurrency(result.initialPayment)}</strong></p>
      <p>{text.disclaimer}</p>
      <p>{text.salary}<strong>{formatCurrency(result.salary)}</strong>{text.salary2}</p>
    </div> : <p className={styles['content--placeholder']}>{data.placeholder}</p>}
    <HouseTalking className={styles.house} />
  </div>;
};

export default Results;
