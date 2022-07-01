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
      className="text-[white] bottom-0 z-10 p-4 fixed w-full h-[80vh] bg-[#1d202a] rounded-t-2xl"
    >
      <div className="grid grid-cols-[5fr_4fr_1fr] w-full mt-1">
        <h1 className="justify-self-start px-3 pt-[2px] pb-[2px] h-8 border inline-block text-lg border-gray-400 border-solid rounded-full w-auto">
          {props.descriptor}
        </h1>
        <div> 
          <p className="mt-2 mb-2">Matched!</p>
          <div className="opacity-50"> 
          <p className="mt-0 text-sm mb-12">
          <span
            style={{
              opacity: '1',
            }}
          >
          You have picked 
          </span>
          {` ${localStorage.getItem(props.descriptor)}`}
          <span
            style={{
              opacity: '1',
            }}
          >
          &nbsp;for
          </span>
          {` 
            ${
            props.descriptor
          }`}
          <span
            style={{
              opacity: '1',
            }}
          >
          . It matches to </span>other&nbsp;
          
          {`${
            props.globalSelectedIdx == -1
              ? 100 - props.globalTotalPercent
              : props.globalPercentages[props.globalSelectedIdx]
          }% of
          people.`}
          </p>
          </div>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 justify-self-end text-white hover:cursor-pointer"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={.75}
          onClick={() => props.setFontModal(false)}
        >
          <path
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </div>
      

      {props.globalTypeNames.map((font, index) => {
        return (
          <div
            key={index}
            className={`text-sm grid grid-cols-[1fr_3fr_1fr] w-full px-0 rounded-full 
            ${
              props.globalSelectedIdx == index
                ? "bg-white text-black"
                : props.globalSelectedIdx == -1 && index == 5
                ? "bg-white text-black"
                : "text-white"
            }`}
          >
            <p className="ml-5 mt-2">{index + 1}</p>
            <p
              className="mt-2"
              style={{
                fontFamily: `${font != "Other" ? font : ""}`,
              }}
            >
              {font}
            </p>
            <p className="mt-2 flex justify-self-start mr-5">
              {props.globalPercentages[index]}%
            </p>
              <div className="bg-white w-full h-[1px] mt-2 mb-1 opacity-20"></div>
              <div className="bg-white w-full h-[1px] mt-2 mb-1 opacity-20"></div>
              <div className="bg-white w-full h-[1px] mt-2 mb-1 opacity-20"></div>
          </div>


        );
      })}
    </motion.div>
  );
}
