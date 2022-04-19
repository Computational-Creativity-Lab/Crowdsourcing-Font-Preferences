import React, { useState, useEffect } from "react";
import Navbar from "../components/layout/Navbar";
import { motion, AnimatePresence } from "framer-motion";
import HeadComp from "../components/HeadComp";
import BackgroundGradient from "../components/BackgroundGradient";
import DataRow from "../components/datavis/DataRow";

const descriptors = ["Caring", "Casual", "Cheerful", "Coarse"];

export default function Datavis() {
  const [choices, setChoices] = useState([]);

  let chosenWords;
  useEffect(() => {
    //store user's word selections
    // Make sure we are on client side
    if (typeof window !== "undefined") {
      var tempChoices = [];
      descriptors.forEach((keyword) => {
        tempChoices.push(window.localStorage.getItem(keyword));
      });
      console.log("Choices:", tempChoices);
      setChoices(tempChoices);
      // chosenWords = localStorage;
      // delete chosenWords["ally-supports-cache"];
    }
  }, []);

  return (
    <motion.main className="bg-black min-h-[100vh] overflow-hidden">
      <HeadComp></HeadComp>
      <Navbar isBlack={false}></Navbar>
      <div className="p-4">
        <div className=" grid grid-cols-2 mt-16 mb-48">
          <div>
            <h1 className="text-5xl text-white">
              You're a <span className="underline">Traditionalist</span>
            </h1>
          </div>
          <p className="text-white text-lg mt-3 mr-[10%]">
            You follow the crowd on some fonts, but forge your own path on
            others. Overall, you matched with 50% of other responses. You have a
            preference for types and you tend to stay away from{" "}
          </p>
        </div>
        <div className="text-white grid grid-cols-[300px_1fr] border-b  border-[rgba(255,255,255,.3)] border-solid pb-4 mb-8">
          <p>Keywords</p>
          <p>Top 5 Fonts</p>
        </div>
        <div>
          {choices.map((choice, i) => (
            <DataRow descriptor={descriptors[i]} chosen={choice} />
          ))}
          {/* <DataRow descriptor="Caring" chosenWords={chosenWords}></DataRow>
          <DataRow descriptor="Casual" chosenWords={chosenWords}></DataRow>
          <DataRow descriptor="Cheerful" chosenWords={chosenWords}></DataRow>
          <DataRow descriptor="Coarse" chosenWords={chosenWords}></DataRow>
          <DataRow
            descriptor="Conservative"
            chosenWords={chosenWords}
          ></DataRow> */}
        </div>
      </div>
      <BackgroundGradient></BackgroundGradient>
    </motion.main>
  );
}
