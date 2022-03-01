import React from "react";
import { motion } from "framer-motion";
import styles from "./FontCard.module.css";

export default function FontCard(props) {
  return (
    <motion.div className={styles.container}>
      <p className={styles.fontName}>Roboto</p>
      <h3 className={styles.pengram}>Sphinx of black quartz, judge my vow.</h3>
    </motion.div>
  );
}
