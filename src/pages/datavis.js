import React, { useState, useEffect } from "react";
import Navbar from "../components/layout/Navbar";
import { motion, AnimatePresence } from "framer-motion";
import HeadComp from "../components/HeadComp";
import BackgroundGradient from "../components/BackgroundGradient";
import DataRow from "../components/DataRow";

export default function Datavis() {
  return (
    <motion.main class="bg-black min-h-[100vh]">
      <HeadComp></HeadComp>
      <Navbar isBlack={false}></Navbar>
      <div class="p-4">
        <div class=" grid grid-cols-2 mt-16 mb-48">
          <div>
            <h1 class="text-5xl text-white">
              You're a <span class="underline">Traditionalist</span>
            </h1>
          </div>
          <p class="text-white text-lg mt-3 mr-[10%]">
            You follow the crowd on some fonts, but forge your own path on
            others. Overall, you matched with 50% of other responses. You have a
            preference for types and you tend to stay away from{" "}
          </p>
        </div>
        <div class="text-white grid grid-cols-[300px_1fr] border-b  border-[rgba(255,255,255,.3)] border-solid pb-4 mb-8">
          <p>Keywords</p>
          <p>Top 5 Fonts</p>
        </div>
        <div>
          <DataRow descriptor="Hi"></DataRow>
          <DataRow descriptor="Caring"></DataRow>
          <DataRow descriptor="Caring"></DataRow>
          <DataRow descriptor="Caring"></DataRow>
          <DataRow descriptor="Caring"></DataRow>
          <DataRow descriptor="Caring"></DataRow>
          <DataRow descriptor="Caring"></DataRow>
          <DataRow descriptor="Caring"></DataRow>
          <DataRow descriptor="Caring"></DataRow>
        </div>
      </div>
      <BackgroundGradient></BackgroundGradient>
    </motion.main>
  );
}
