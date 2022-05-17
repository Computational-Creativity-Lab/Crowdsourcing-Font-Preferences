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
        {intro && <JoyRide></JoyRide>}
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
          <div className="text-white fixed bottom-0 left-0 px-4 py-4 inline-block flex gap-4 items-center">
            <a href="http://computational-creativity.org" target="_blank">
              <img
                src={"/ccl-logo.svg"}
                alt="ccl logo"
                className="w-auto h-[32px]  opacity-50 inline hover:opacity-100"
              />
            </a>
            <a href="https://studioforcreativeinquiry.org/" target="_blank">
              <img
                src={"/creativeinquiry-logo.png"}
                alt="creative inquiry logo"
                className="w-auto h-[32px] inline"
              />
            </a>
          </div>
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
