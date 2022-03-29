import React, { useState, useEffect } from "react";
import Navbar from "../components/layout/Navbar";
import { motion, AnimatePresence } from "framer-motion";
import HeadComp from "../components/HeadComp";
import GlobalContainer from "../components/layout/GlobalContainer";
import FontsPromptRightCol from "../components/FontsPromptRightCol";
import Container from "../components/layout/Container";
import FontsPromptLeftCol from "../components/FontsPromptLeftCol";
import BackgroundGradient from "../components/BackgroundGradient";






export default function Datavis() {

  return (
    <motion.main class='bg-slate-900 w-screen h-height p-10'>

      <div class='flex gap-4'>
          <h1 class='text-white text-xl h-fit border-solid border-2 border-white rounded-full px-8 py-3 mt-3'> Caring</h1>
          <div class='flex flex-row inline-block py-5 w-full'>
            <div class='flex flex-col w-[40%] '>
              <p class='flex text-white justify-center'>Hello</p>
              <div class='inline-block bg-[#EA6161] p-2 rounded-full border-solid hover:border-2 border-white'></div>
            </div>
            <div class='flex flex-col w-[30%]'>
              <p class='flex text-white justify-center'>Hello</p>
              <div class='inline-block bg-[#ffffff30] p-2 rounded-full'></div>
            </div>
            <div class='flex flex-col w-[10%]'>
              <p class='flex text-white justify-center'>Hello</p>
              <div class='inline-block bg-[#ffffff30] p-2 rounded-full'></div>
            </div>
            <div class='flex flex-col w-[10%]'>
              <p class='flex text-white justify-center'>Hello</p>
              <div class='inline-block bg-[#ffffff30] p-2 rounded-full'></div>
            </div>
            <div class='flex flex-col w-[10%]'>
              <p class='flex text-white justify-center'>Hello</p>
              <div class='inline-block bg-[#ffffff30] p-2 rounded-full'></div>
            </div>
        </div>
      </div>
    <BackgroundGradient></BackgroundGradient>
    </motion.main>
  );
}
