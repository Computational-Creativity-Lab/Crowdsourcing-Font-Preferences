import React, { useState, useEffect } from "react";
import Navbar from "../components/layout/Navbar";
import { motion, AnimatePresence } from "framer-motion";
import HeadComp from "../components/HeadComp";
import BackgroundGradient from "../components/BackgroundGradient";
import DataRow from "../components/DataRow";






export default function Datavis() {

  return (
    <motion.main class='bg-slate-900 w-screen h-screen'>
      <HeadComp></HeadComp>
      <Navbar isBlack = {false}></Navbar>

      <div class="p-4">
        <DataRow descriptor = "Caring"></DataRow>
        <DataRow descriptor = "Caring"></DataRow>
        <DataRow descriptor = "Caring"></DataRow>
        <DataRow descriptor = "Caring"></DataRow>
        <DataRow descriptor = "Caring"></DataRow>
        <DataRow descriptor = "Caring"></DataRow>
        <DataRow descriptor = "Caring"></DataRow>
        <DataRow descriptor = "Caring"></DataRow>
        <DataRow descriptor = "Caring"></DataRow>
      </div>
    <BackgroundGradient></BackgroundGradient>
    </motion.main>
  );
}
