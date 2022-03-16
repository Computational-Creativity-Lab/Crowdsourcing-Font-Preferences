import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import styles from "./FontCard.module.css";

export default function FontCard(props) {
  // const [transition, startTransition] = useState(false);
  // const textTransition = () => {
  //   startTransition(true);
  //   console.log(transition);
  //   setTimeout(() => {
  //     startTransition(false);
  //   }, 500);
  // };

  return (
    <AnimatePresence>
      <motion.div
        className={styles.container}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{
          default: { duration: 0.1 },
        }}
        // onClick={textTransition}
      >
        <p
          style={{ fontFamily: `${props.fontStyle}` }}
          className={`${styles.fontName} ${
            props.textFadeState ? styles.hide : ""
          }`}
        >
          {props.fontStyle}
        </p>
        <h3
          className={`${styles.pengram} ${
            props.textFadeState ? styles.hide : ""
          }`}
          style={{ fontFamily: `${props.fontStyle}` }}
        >
          Sphinx of black quartz, judge my vow.
        </h3>
      </motion.div>
    </AnimatePresence>
  );
}
