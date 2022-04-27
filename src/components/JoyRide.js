import { motion, AnimatePresence } from "framer-motion";
import React, { useState } from "react";

export default function JoyRide(props) {
  return (
    <AnimatePresence>
      <div>
        <div className="absolute rounded-xl drop-shadow-2xl w-[800px] h-[500px] bg-zinc-900 z-20 p-8 left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]">
          <p className="text-4xl text-zinc-100 mb-10">
            For each{" "}
            <span class="py-2 px-4 border border-solid border-zinc-100 rounded-full">
              keyword
            </span>{" "}
            select a font
          </p>
          <div className="text-white grid grid-cols-2 h-auto">
            <div>
              <p className="text-base">
                You’ll have four chances to decide on the best match for that
                keyword
              </p>
              <button
                onClick={props.joyrideState}
                className="p-2 bg-[rgba(255,255,255,.05)] rounded-full text-white"
              >
                Got it
              </button>
            </div>
            <div className="w-full h-[200px] bg-red-400"></div>
          </div>
        </div>
      </div>
      <div className="absolute bg-[rgba(0,0,0,.2)] backdrop-blur-sm w-full h-full z-10"></div>
      )
    </AnimatePresence>
  );
}
