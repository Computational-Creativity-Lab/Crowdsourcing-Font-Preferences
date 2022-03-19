import React from "react";
import { motion } from "framer-motion";
import styles from "./Navbar.module.css";

export default function FontCard(props) {
  return (
    <motion.div className={styles.container}>
      <p>Font Preference</p>
      <p>{props.rightLink}</p>
    </motion.div>
  );
}
