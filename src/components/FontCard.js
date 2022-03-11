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
        <p className={styles.fontName}>{props.fontStyle}</p>
        {/* need to dynamically toggle this  */}
        <h3 className={styles.pengram}>
          Sphinx of black quartz, judge my vow.
        </h3>
      </motion.div>
    </AnimatePresence>
  );
}
