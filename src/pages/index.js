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
        className="cursor-pointer"
        onClick={() => Router.push("/survey")}
      >
        <CustomCursor />
        <HeadComp />
        <GlobalContainer>
          <Navbar isBlack={true} />

          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ ease: [0.16, 1, 0.3, 1], duration: 1 }}
            className="px-4 py-4 text-7xl border-2 border-gray-900 pt-20"
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
