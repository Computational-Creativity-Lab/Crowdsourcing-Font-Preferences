import React, { useState, useEffect } from "react";
import DataBar from "./DataBar";
import { motion, AnimatePresence } from "framer-motion";

export default function MobileDataCard(props) {
  let isOther = true;

  return (
    <motion.div
      initial={{ opacity: 1, translateY: "200%" }}
      animate={{ opacity: 1, translateY: "0%" }}
      exit={{ opacity: 1, translateY: "200%" }}
      transition={{
        type: "ease",
        ease: [0.16, 1, 0.3, 1],
        duration: 1,
      }}
      className="text-white bottom-0 z-10 p-4 fixed w-full border border-zinc-700 border-solid h-[90vh] bg-zinc-800 rounded-t-2xl"
    >
      <div className="grid grid-cols-2 w-full">
        <h1 className="justify-self-start px-4 py-2 border inline-block text-2xl border-white border-solid rounded-full w-auto">
          {props.descriptor}
        </h1>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 justify-self-end text-zinc-500 hover:cursor-pointer"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          onClick={() => props.setFontModal(false)}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </div>
      <p className="mt-4 text-lg">
        {`You have picked ${localStorage.getItem(props.descriptor)} for ${
          props.descriptor
        }. It matches to other ${
          props.globalSelectedIdx == -1
            ? 100 - props.globalTotalPercent
            : props.globalPercentages[props.globalSelectedIdx]
        }% of
        people.`}
      </p>

      {props.globalTypeNames.map((font, index) => {
        return (
          <div
            key={index}
            className={`grid grid-cols-[1fr_3fr_1fr] w-full py-4 px-6 rounded-full 
            ${
              props.globalSelectedIdx == index
                ? "bg-white text-black"
                : props.globalSelectedIdx == -1 && index == 5
                ? "bg-white text-black"
                : "text-white"
            }`}
          >
            <p>{index + 1}</p>
            <p
              style={{
                fontFamily: `${font != "Other" ? font : ""}`,
              }}
            >
              {font}
            </p>
            <p className="flex justify-self-end">
              {props.globalPercentages[index]}%
            </p>
          </div>
        );
      })}
    </motion.div>
  );
}
