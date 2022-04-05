import React, { useState, useEffect } from "react";
import Navbar from "../components/layout/Navbar";
import { motion, AnimatePresence } from "framer-motion";
import HeadComp from "../components/HeadComp";
import BackgroundGradient from "../components/BackgroundGradient";
import DataRow from "../components/DataRow";






export default function Datavis() {

  return (
    <motion.main class='bg-slate-900'>
      <HeadComp></HeadComp>
      <Navbar isBlack = {false}></Navbar>
      <div class='p-4'>
        <h1 class='text-xl text-white'>You're a</h1>
        <h2 class='text-5xl text-white'>Traditionalist</h2>
        <p class='text-white'>You follow the crowd on some fonts, but forge your own path on others. Overall, you matched with 50% of other responses. You have a preference for types and you tend to stay away from </p>
        <div>
          <DataRow descriptor = "Hi"></DataRow>
          <DataRow descriptor = "Caring"></DataRow>
          <DataRow descriptor = "Caring"></DataRow>
          <DataRow descriptor = "Caring"></DataRow>
          <DataRow descriptor = "Caring"></DataRow>
          <DataRow descriptor = "Caring"></DataRow>
          <DataRow descriptor = "Caring"></DataRow>
          <DataRow descriptor = "Caring"></DataRow>
          <DataRow descriptor = "Caring"></DataRow>
        </div>
      </div>
    <BackgroundGradient></BackgroundGradient>
    </motion.main>
  );
}
