import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function DataBar(props) {
  const ref = useRef();
  const [barWidth, setBarWidth] = useState();
  const [isShown, setIsShown] = useState(false);
  const [activeBar, setActiveBar] = useState(false);
  const [activeOther, setActiveOther] = useState(false);

  useEffect(() => {
    setBarWidth(ref.current.clientWidth);
  }, [barWidth]);

  // Update 'width' and 'height' when the window resizes
  useEffect(() => {
    // Make sure we are on client side
    if (typeof window !== "undefined") {
      window.addEventListener("resize", () => {
        setBarWidth(ref.current.clientWidth);
      });

      if (props.index == props.userSelected) {
        setActiveBar(true);
      }

      if (props.userSelected == -1 && props.index == 5) {
        setActiveOther(true);
      }
    }
  }, []);

  return (
    <div
      ref={ref}
      onClick={() => {
        // userSelected is -1 if their choice is not part of the top 5 choices
        setIsShown(true);
      }}
      onMouseLeave={() => setIsShown(false)}
      className={`${
        activeBar || activeOther
          ? `hover:opacity-[1] hover:cursor-pointer`
          : `bg-[#2B2C32] hover:cursor-default`
      } flex flex-col border-solid border-[#ffffff00]
      border p-4 rounded-full relative min-w-[48px]`}
      style={{ width: `${props.percentage}%` }}
    >
      {(activeBar || activeOther) && (
        <img
          className="absolute z-0 top-0 left-0 w-full min-w-full min-h-full max-w-full max-h-full rounded-full"
          width={100}
          src={`/textures/${props.currentDescriptor}.png`}
          alt={props.currentDescriptor}
        />
      )}

      <motion.p
        className="text-black font-semibold whitespace-nowrap min-w-[48px] z-10 max-w-full max-h-full rounded-full overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{
          duration: 0.5,
        }}
      >
        {props.fontName}
      </motion.p>

      {/* POPUP WINDOW when user clicks bar */}
      <AnimatePresence>
        {isShown && (activeBar || activeOther) && (
          <motion.div
            initial={{ opacity: 0, top: 5, scale: 0.95 }}
            animate={{ opacity: 1, top: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ ease: [0.16, 1, 0.3, 1], duration: 0.5 }}
            className="absolute !top-[-340px] !left-[-5px] origin-bottom z-10 mb-6 h-[344px] hover:cursor-default"
          >
            <div className=" text-white bg-zinc-900 rounded-xl overflow-y-auto p-4 overflow-hidden drop-shadow-2xl w-[340px] h-[324px]">
              <p className="text-xl mb-8">
                You picked Roboto which is a unique choice!
              </p>

              {props.fontList.map((font, index) => {
                return (
                  <div
                    key={index}
                    className={`grid grid-cols-[1fr_3fr_1fr] w-full py-4 px-6 rounded-full ${
                      index == props.index
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
                      {props.allPercentages[index]}%
                    </p>
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
