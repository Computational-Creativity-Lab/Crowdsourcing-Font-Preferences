import { motion, AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import Router from "next/router";

export default function JoyRide(props) {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="absolute rounded-xl drop-shadow-2xl w-[800px] h-[500px] bg-zinc-900 z-20 p-8 left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]">
          <p className="text-4xl text-zinc-100 mb-10">
            For each{" "}
            <span className="py-2 px-4 border border-solid border-zinc-100 rounded-full">
              keyword
            </span>{" "}
            select a font
          </p>
          <div className="text-white grid grid-cols-2 h-auto">
            <div className="flex flex-row">
              <p className="text-base">
                You’ll have four chances to decide on the best match for that
                keyword
              </p>
              <button
                onClick={() => {
                  Router.push("/survey");
                  console.log("go to survey");
                }}
                className="p-2 bg-[rgba(255,255,255,.05)] rounded-full text-white"
              >
                Got it!
              </button>
            </div>
            <div className="w-full h-[200px] bg-red-400"></div>
          </div>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute bg-[rgba(0,0,0,.5)] w-full h-full z-10"
      ></motion.div>
    </>
  );
}
