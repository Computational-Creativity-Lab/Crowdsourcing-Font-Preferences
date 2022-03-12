import { motion, AnimatePresence } from "framer-motion";
import styles from "./FontCard.module.css";

export default function FontCard(props) {
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
      >
        <p
          style={{ fontFamily: `${props.fontStyle}` }}
          className={styles.fontName}
        >
          {props.fontStyle}
        </p>
        {/* need to dynamically toggle this  */}
        <h3
          className={styles.pengram}
          style={{ fontFamily: `${props.fontStyle}` }}
        >
          Sphinx of black quartz, judge my vow.
        </h3>
      </motion.div>
    </AnimatePresence>
  );
}
