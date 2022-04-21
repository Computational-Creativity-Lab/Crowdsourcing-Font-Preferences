import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function DataBar(props) {
  const ref = useRef();
  const [barWidth, setBarWidth] = useState();
  const [isShown, setIsShown] = useState(false);
  let userChose = props.index == props.randomSelection;

  useEffect(() => {
    setBarWidth(ref.current.clientWidth);
  }, [barWidth]);

  // Update 'width' and 'height' when the window resizes
  useEffect(() => {
    window.addEventListener("resize", () => {
      setBarWidth(ref.current.clientWidth);
    });
  }, []);

  return (
    <div
      ref={ref}
      onClick={() => {
        console.log(props.index, props.randomSelection);
        setIsShown(true);
      }}
      onMouseLeave={() => setIsShown(false)}
      //MIA - I think you've already done this but the font selected by user should be highlighted here. eventually and ideally, we'll make it a gradient
      className={`${
        props.index == props.randomSelection
          ? `bg-white hover:opacity-[1] hover:cursor-pointer`
          : `bg-[#2B2C32] `
      } flex flex-col border-solid border-[#ffffff00]
      border p-4 rounded-full ease-in-out
      transition-all relative overflow-hidden min-w-[48px]`}
      style={{ width: `${props.percentage}%` }}
    >
      <AnimatePresence>
        {barWidth > 75 && (
          //MIA - need to populate the ranked font names in here (top 5). Last bar should say "Other"
          <motion.p
            className="text-black font-semibold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.5,
            }}
          >
            Roboto
          </motion.p>
        )}
      </AnimatePresence>
      <div className="absolute top-0 right-0 w-[40px] h-full bg-gradient-to-l from-[#2B2C32] to-[#002B2C32]"></div>

      {/* POPUP WINDOW when user clicks bar */}
      <AnimatePresence>
        {isShown && (
          <motion.div
            key="modal"
            initial={{ opacity: 0, top: 5, scale: 0.95 }}
            animate={{ opacity: 1, top: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ ease: [0.16, 1, 0.3, 1], duration: 0.5 }}
            className="absolute !top-[-340px] !left-[-5px] origin-bottom z-10 mb-6 h-[344px] hover:cursor-default"
          >
            <div className=" text-white bg-zinc-900 rounded-xl overflow-y-auto p-4 overflow-hidden drop-shadow-2xl w-[300px] h-[324px]">
              <p className="text-xl mb-8">
                You picked Roboto which is a unique choice!
              </p>

              {props.fontList.map((font, index) => {
                return (
                  <div
                    className={`${
                      index == props.index
                        ? "bg-white text-black"
                        : "text-white"
                    } grid grid-cols-[1fr_3fr_1fr] w-full py-4 px-6 rounded-full`}
                  >
                    <p>{index + 1}</p>
                    {/* MIA need to autopulate top fonts list and their respective % based on backend data*/}
                    <p>{font}</p>
                    <p className="flex justify-self-end">60%</p>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
