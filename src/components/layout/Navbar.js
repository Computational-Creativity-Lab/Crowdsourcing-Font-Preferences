import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Navbar(props) {
  return (
    <motion.div
      className={`grid px-4 py-5 grid-cols-2 border-b sm:border-solid ${props.isBlack ? 'border-black' : 'border-white'}`}
    >
      <Link href="/">
        <p className={`cursor-pointer flex justify-self-start hover:opacity-50 ${props.isBlack ? 'text-black' : 'text-white'}`}>
          Font Preference
        </p>
      </Link>
      <Link href="/">
        <p className={`cursor-pointer flex justify-self-end hover:opacity-50 ${props.isBlack ? 'text-black' : 'text-white'}`}>
          {props.rightLink}
        </p>
      </Link>
    </motion.div>
  );
}
