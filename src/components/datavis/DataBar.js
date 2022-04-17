import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// let percentages = [10, 20, 30, 40, 50];

export default function DataBar(props) {
  const [isShown, setIsShown] = useState(false);
  let userChose = props.index == props.randomSelection;

  return (
    <div
      onClick={() => setIsShown(true)}
      onMouseLeave={() => setIsShown(false)}
      class={`${
        userChose
          ? `bg-white hover:opacity-[1] hover:cursor-pointer`
          : `bg-[rgba(230,230,255,.25)] `
      } flex flex-col border-solid border-[#ffffff00]
      border px-4 py-4 rounded-full ease-in-out
      transition-all`}
      style={{ width: `${props.percentage}%` }}
    >
      <p class="text-black font-semibold">Roboto</p>
      <AnimatePresence>
        {isShown && userChose && (
          <motion.div
            key="modal"
            initial={{ opacity: 1, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ ease: [0.16, 1, 0.3, 1], duration: 0.5 }}
            class="drop-shadow-2xl absolute mt-12 w-[300px] h-[300px] bg-white rounded-xl p-4"
          >
            <p class="text-black">
              You picked Roboto which is a unique choice!
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
