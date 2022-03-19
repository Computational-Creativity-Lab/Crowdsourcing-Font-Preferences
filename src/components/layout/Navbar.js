import React from "react";
import { motion } from "framer-motion";

export default function FontCard(props) {
  return (
    <motion.div
      // style={{ borderBottom: "1px solid black" }}
      className="grid px-4 py-5 grid-cols-2 border-b sm:border-solid border-black "
    >
      {/* <motion.div className={styles.container}> */}
      <p className="flex justify-self-start"> Font Preference</p>
      <p className="flex justify-self-end ">{props.rightLink}</p>
    </motion.div>
  );
}
