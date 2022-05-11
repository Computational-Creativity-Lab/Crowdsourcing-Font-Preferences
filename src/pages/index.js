import React, { useState, useEffect } from "react";
import Navbar from "../components/layout/Navbar";
import { motion, AnimatePresence } from "framer-motion";
import HeadComp from "../components/HeadComp";
import Router from "next/router";
import GlobalContainer from "../components/layout/GlobalContainer";
import Container from "../components/layout/Container";
import JoyRide from "../components/JoyRide";

export default function Home() {
  const [intro, showIntro] = useState(false);
  useEffect(() => {
    // Make sure we are on client side
    if (typeof window !== "undefined") {
      localStorage.clear();
    }
  });
  return (
    <AnimatePresence>
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className={`${!intro ? "cursor-pointer" : ""} bg-zinc-900`}
        onClick={() => {
          showIntro(true);
        }}
      >
        {intro && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute top-0 w-full h-full  bg-[rgba(0,0,0,.5)]"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ ease: [0.16, 1, 0.3, 1], duration: 0.5 }}
            >
              <div className="absolute rounded-xl drop-shadow-2xl max-w-[800px] w-[90%] bg-zinc-900 z-20 left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]">
                <div className="px-8 pt-8">
                  <p className="leading-8 text-3xl text-zinc-100 mb-10">
                    Select the font that best matches each{" "}
                    <span className="pb-1 px-4 border border-solid border-zinc-100 rounded-full">
                      Keyword
                    </span>
                  </p>
                  <div className="text-white grid grid-cols-2 h-auto gap-8">
                    <div className="flex flex-col">
                      <p className="text-base">
                        Whatever font you choose will remain. The unselected one
                        will change. You’ll have four chances to decide on the
                        best match for that keyword. After four rounds, the font
                        that remains will be your selection and you’ll move on
                        to a new keyword.
                      </p>
                    </div>
                    <div className="w-full h-[200px] bg-red-400"></div>
                  </div>
                </div>
                <button
                  onClick={() => {
                    Router.push("/survey");
                  }}
                  className="w-full px-2 py-6 hover:bg-[rgba(255,255,255,.05)] border-t border-solid border-[rgba(255,255,255,.2)] text-white mt-8"
                >
                  Begin
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
        <AnimatePresence>{!intro && <CustomCursor />}</AnimatePresence>
        <HeadComp />
        <GlobalContainer>
          <Navbar isBlack={false} />
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ ease: [0.16, 1, 0.3, 1], duration: 1 }}
            className="text-zinc-100 px-4 py-4 text-7xl border-2 border-gray-900 pt-24"
          >
            Find your fonts!
          </motion.h1>
        </GlobalContainer>
      </motion.main>
    </AnimatePresence>
  );
}

// custom cursor
function useMousePosition() {
  const [mousePosition, setMousePosition] = useState({ x: null, y: null });

  useEffect(() => {
    const mouseMoveHandler = (event) => {
      const { clientX, clientY } = event;
      setMousePosition({ x: clientX, y: clientY });
    };
    document.addEventListener("mousemove", mouseMoveHandler);

    return () => {
      document.removeEventListener("mousemove", mouseMoveHandler);
    };
  }, []);

  return mousePosition;
}

const CustomCursor = () => {
  const { x, y } = useMousePosition();
  return (
    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="absolute will-change-transform text-white"
      style={{
        transform: `translate(${x - 60}px, ${y - 30}px)`,
      }}
    >
      Click to begin
    </motion.p>
  );
};
