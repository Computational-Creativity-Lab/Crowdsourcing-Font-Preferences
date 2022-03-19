import React, { useState, useEffect } from "react";
import Navbar from "../components/layout/Navbar";
import { motion, AnimatePresence } from "framer-motion";
import HeadComp from "../components/HeadComp";
import GlobalContainer from "../components/layout/GlobalContainer";
import FontsPromptRightCol from "../components/FontsPromptRightCol";
import Container from "../components/layout/Container";
import FontsPromptLeftCol from "../components/FontsPromptLeftCol";

// backend
import axios from "axios";
const WRITE_TO_DB = false;

export default function Home() {
  // backend
  // creating IP state
  const [locationData, setLocationData] = useState({});

  // load ip address using Axios
  async function getLocationData() {
    const res = await axios.get("https://geolocation-db.com/json/");
    // console.log(res.data);
    setLocationData(res.data);
  }

  useEffect(() => {
    getLocationData();
  }, []);

  async function addPreferenceHandler(payload) {
    if (!WRITE_TO_DB) return;

    const location =
      locationData.country_code === "US"
        ? { country_name: locationData.country_name, state: locationData.state }
        : { country_name: locationData.country_name };
    const time = Date().toLocaleString();
    // console.log("time: ", time);
    const response = await fetch("/api/new-preference", {
      method: "POST",
      body: JSON.stringify({
        font: payload.chosenStyle,
        keyword: keyword,
        location: location,
        time: time,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    // console.log(data);
  }

  async function handleClick(payload) {
    // console.log("clicked, data:", payload);

    setQCount(qCount + 1);
    setKeywordCount(keywordCount + 1);
    addPreferenceHandler(payload);
  }

  return (
    <motion.main>
      <HeadComp />
      <GlobalContainer>
        <Navbar rightLink="Share" />
        {/* <h1 className="text-3xl font-bold underline">Find your fonts</h1> */}
        <h1 className="px-1 text-6xl">Choose your font.</h1>
      </GlobalContainer>
    </motion.main>
  );
}
