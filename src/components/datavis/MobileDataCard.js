import React, { useState, useEffect } from "react";
import DataBar from "./DataBar";
import { motion, AnimatePresence } from "framer-motion";

export default function MobileDataCard(props) {
  return (
    <motion.div
      initial={{ opacity: 1, translateY: "200%" }}
      animate={{ opacity: 1, translateY: 0 }}
      exit={{ opacity: 1, translateY: "200%" }}
      transition={{
        type: "ease",
        ease: [0.16, 1, 0.3, 1],
        duration: 1,
      }}
      className="text-white bottom-0 z-10 p-4 fixed w-full h-[90vh] bg-zinc-800 rounded-t-2xl"
    >
      <h1 className="px-4 py-2 border inline-block text-2xl border-white border-solid rounded-full w-auto">
        {props.descriptor}
      </h1>
      <p onClick={() => props.setFontModal(false)} className="mt-4 text-lg">
        {`You have picked Roboto for ${props.descriptor}. It matches to other 60% of
        people.`}
      </p>

      {props.sortedTypefaceNames.map((font, index) => {
        return (
          <div
            key={index}
            className={`grid grid-cols-[1fr_3fr_1fr] w-full py-4 px-6 rounded-full 

            `}
            // ${ index == props.index ? "bg-white text-black" : "text-white"}
          >
            <p>{index + 1}</p>
            <p
              style={{
                fontFamily: `${font != "Other" ? font : ""}`,
              }}
            >
              {font}
            </p>
            <p className="flex justify-self-end">{props.percentages[index]}%</p>
          </div>
        );
      })}
    </motion.div>
  );
}
