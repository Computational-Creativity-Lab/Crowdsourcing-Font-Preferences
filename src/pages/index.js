import React, { useState, useEffect } from "react";
import Navbar from "../components/layout/Navbar";
import { motion, AnimatePresence } from "framer-motion";
import HeadComp from "../components/HeadComp";
import Router from "next/router";
import GlobalContainer from "../components/layout/GlobalContainer";

export default function Home() {
  return (
    <motion.main onClick={() => Router.push("/survey")}>
      <CustomCursor />
      <HeadComp />
      <GlobalContainer>
        <Navbar rightLink="Share" />
        <h1 className="px-4 py-4 text-7xl border-2 border-gray-900">
          Choose your font.
        </h1>
      </GlobalContainer>
    </motion.main>
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
