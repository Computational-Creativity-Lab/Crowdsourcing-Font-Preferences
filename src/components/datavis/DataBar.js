import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function DataBar(props) {
  const ref = useRef();
  const [barWidth, setBarWidth] = useState();
  const [onBar, setOnBar] = useState(false);
  const [onPopup, setOnPopup] = useState(false);
  const [activeBar, setActiveBar] = useState(false);

  useEffect(() => {
    setBarWidth(ref.current.clientWidth);
  }, [barWidth]);

  // Update 'width' and 'height' when the window resizes
  useEffect(() => {
    // Make sure we are on client side
    if (typeof window !== "undefined" && ref.current) {
      window.addEventListener("resize", () => {
        setBarWidth(ref.current.clientWidth);
      });

      if (
        props.index == props.userSelected ||
        (props.userSelected == -1 && props.index == 5)
      ) {
        setActiveBar(true);
      } else {
        setActiveBar(false);
      }
    }
  }, [props.index, props.userSelected]);

  return (
    <div className="relative" style={{ width: `${props.percentage}%` }}>
      <div
        ref={ref}
        onClick={() => {
          setOnBar(true);
        }}
        onMouseLeave={() => setOnBar(false)}
        className={`${
          activeBar
            ? ` hover:cursor-pointer hover:scale-[1.005] ease-in-out transition-transform`
            : `bg-[#2B2C32] hover:cursor-default border-[#ffffff00]`
        } flex flex-col border-solid
      border py-2 pl-3 rounded-full relative overflow-hidden`}
      > 
        {activeBar && (
          <img
            className="absolute z-0 top-0 left-0 w-full min-w-full min-h-full max-w-full max-h-full rounded-full"
            width={100}
            src={`/textures/${props.currentDescriptor}.png`}
            alt={props.currentDescriptor}
            hidden={!activeBar}
          />
        )}

        <motion.p
          className="text-sm text-black font-medium whitespace-nowrap z-[1] max-w-full max-h-full rounded-full overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 0.5,
          }}
        >
          {props.fontName}
        </motion.p>
      </div>
      {/* POPUP WINDOW when user clicks bar */}
      <AnimatePresence>
        {(onBar || onPopup) && activeBar && (
          <motion.div
            initial={{ opacity: 0, top: 5, scale: 0.95 }}
            animate={{ opacity: 1, top: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ ease: [0.16, 1, 0.3, 1], duration: 0.5 }}
            className="absolute !top-[-340px] !left-[-5px] origin-bottom z-10 mb-6 h-[344px] hover:cursor-default z-30"
            onMouseEnter={() => setOnPopup(true)}
            onMouseLeave={() => setOnPopup(false)}
          >
            <div className="bg-[#1d202a] text-white text-sm rounded-xl px-2 overflow-y-auto overflow-hidden drop-shadow-2xl w-[280px] h-[360px]">
              <p className="text-sm mb-8 p-2">
                You picked Roboto which is a unique choice!
              </p>
              {props.fontList.map((font, index) => {
                if (props.allPercentages[index] == 0) {
                  return;
                } else {
                  return (

                    <div
                      key={index}
                      className={`grid grid-cols-[1fr_3fr_1fr] w-full my-1 px-2 rounded-full ${
                        index == props.index
                          ? "bg-white text-black"
                          : "text-white"
                      }`}
                    > 
                      <p className="ml-3 mt-2">{index + 1}</p>
                      <p
                        className="mt-2"
                        style={{
                          fontFamily: `${font != "Other" ? font : ""}`,
                        }}
                      >
                        {font}
                      </p>
                      <p className="mt-2 flex justify-self-start">
                        {props.allPercentages[index]}%
                      </p>
                      <div className="bg-white w-full h-[1px] mt-2 mb-1 opacity-20"></div>
                      <div className="bg-white w-full h-[1px] mt-2 mb-1 opacity-20"></div>
                      <div className="bg-white w-full h-[1px] mt-2 mb-1 opacity-20"></div>
                    </div>
                  );
                }
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
