import React, { useState, useEffect } from "react";
import Navbar from "../components/layout/Navbar";
import { motion, AnimatePresence } from "framer-motion";
import HeadComp from "../components/HeadComp";
import Router from "next/router";
import GlobalContainer from "../components/layout/GlobalContainer";
import Container from "../components/layout/Container";

export default function Home() {
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
        className="cursor-pointer bg-zinc-900"
        onClick={() => Router.push("/survey")}
      >
        {/* <CustomCursor /> */}
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
          <motion.div
            className="absolute bottom-4 right-4"
            transition={{
              ease: [0.16, 1, 0.3, 1],
              duration: 1,
            }}
            whileHover={{
              scale: 1.02,
            }}
            whileTap={{
              scale: 0.99,
            }}
          >
            <motion.svg
              xmlns="http://www.w3.org/2000/svg"
              className=" h-32 w-64 justify-center h-full grid text-center block items-center p-10 bg-zinc-100 text-zinc-900 rounded-3xl"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </motion.svg>
          </motion.div>

          {/* <div className="grid grid-rows-2 p-4">
              <div></div>
              <div className="row-start-2 bg-zinc-900  text-white rounded-3xl">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 justify-center h-full grid text-center block items-center"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
                <p
                  className="justify-center h-full grid text-center block items-center"
                  self-center
                >
                  Click to start
                </p>
              </div>
            </div> */}
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
    <p
      className="absolute will-change-transform"
      style={{
        transform: `translate(${x - 60}px, ${y - 30}px)`,
      }}
    >
      Click to start quiz
    </p>
  );
};
