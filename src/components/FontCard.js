import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function FontCard({ fontStyle, pengram, chosenCard, cardNum }) {
  return (
    <AnimatePresence>
      <motion.div
        className={`${
          chosenCard == cardNum ? "border border-solid border-white" : ""
        } h-full bg-black flex rounded-3xl items-center relative justify-center select-none hover:scale-[1.005] hover:cursor-pointer active:scale-[.99] hover:shadow-[0_25px_35px_rgba(0,0,0,.2)] duration-200`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{
          default: { duration: 0.1 },
        }}
      >
        <p className="absolute block top-5 text-slate-50">{fontStyle}</p>
        <h3
          className="text-xl md:text-4xl text-white block text-center px-5 "
          style={{ fontFamily: `${fontStyle}` }}
        >
          {pengram}
        </h3>
      </motion.div>
    </AnimatePresence>
  );
}
