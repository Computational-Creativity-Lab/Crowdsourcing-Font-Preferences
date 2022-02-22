import styled from "styled-components";
import React from "react";
import styles from "./fontCard.module.css";

export default function FontCard(props) {
  return (
    <div className={styles.container}>
      <p className={styles.fontName}>Roboto</p>
      <p className={styles.pengram}>Sphinx of black quartz, judge my vow.</p>
    </div>
  );
}
