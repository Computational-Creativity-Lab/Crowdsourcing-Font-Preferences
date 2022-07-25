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
  const [hideCursor, setHideCursor] = useState(false);

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
        <AnimatePresence>
          {!intro && !hideCursor && <CustomCursor />}
        </AnimatePresence>
        <HeadComp />
        <GlobalContainer>
          <Navbar
            isBlack={false}
            hideCursor={hideCursor}
            setHideCursor={setHideCursor}
          />
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ ease: [0.16, 1, 0.3, 1], duration: 1 }}
            className="lg:ml-4 ml-1 text-zinc-100 px-4 py-4 text-3xl lg:text-7xl border-2 border-gray-900 pt-24 hover:cursor-default"
            onMouseEnter={() => setHideCursor(true)}
            onMouseLeave={() => setHideCursor(false)}
          >
            Find your fonts
          </motion.h1>
          <div
            onMouseEnter={() => setHideCursor(true)}
            onMouseLeave={() => setHideCursor(false)}
            className="flex lg:ml-4 ml-1 font-light text-sm text-white fixed bottom-0 left-0 mb-2 px-4 py-4 inline-block flex gap-2 items-center"
          >
            <div>
              <a
                href="http://computational-creativity.org"
                target="_blank"
                rel="noreferrer"
                className="inline opacity-50 hover:opacity-100 mr-0 lg:mr-4"
              >
                <img
                  src={"/ccl-logo.svg"}
                  alt="ccl logo"
                  className="m-1 mr-2 w-auto h-[28px] lg:h-[20px] inline"
                />
                <div className="inline hidden lg:inline-block">
                  Computational Creativity Lab
                </div>
              </a>
            </div>
            <div>
              <a
                href="https://studioforcreativeinquiry.org"
                target="_blank"
                rel="noreferrer"
                className="inline opacity-50 hover:opacity-100"
              >
                <img
                  src={"/creativeinquiry-logo.svg"}
                  alt="creative inquiry logo"
                  className="m-1 mr-2 w-auto h-[28px] lg:h-[20px] inline"
                />
                <div className="inline hidden lg:inline-block">
                  The Frank-Ratchye STUDIO For Creative Inquiry
                </div>
              </a>
            </div>
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
      transition={{ duration: 0.2 }}
      className="absolute will-change-transform text-gray-300 text-sm"
      style={{
        transform: `translate(${x - 60}px, ${y - 30}px)`,
      }}
    >
      Click to begin
    </motion.p>
  );
};
