import React from "react";
import { motion } from "framer-motion";
import Link from "next/Link";

export default function Navbar(props) {
  return (
    <motion.div
      // style={{ borderBottom: "1px solid black" }}
      className="grid px-4 py-5 grid-cols-2 border-b sm:border-solid border-black "
    >
      {/* <motion.div className={styles.container}> */}
      <Link href="/">
        <p className=" cursor-pointer flex justify-self-start hover:opacity-50">
          {" "}
          Font Preference
        </p>
      </Link>
      <Link href="/">
        <p className="cursor-pointer flex justify-self-end hover:opacity-50">
          {props.rightLink}
        </p>
      </Link>
    </motion.div>
  );
}
