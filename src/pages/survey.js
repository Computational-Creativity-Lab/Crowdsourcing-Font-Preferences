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
  const keywords = [
    "Authoritative",
    "Caring",
    "Casual",
    "Cheerful",
    "Coarse",
    "Conservative",
    "Conversational",
    "Dry",
    "Edgy",
    "Enthusiastic",
    "Formal",
    "Frank",
    "Friendly",
    "Fun",
    "Funny",
  ];

  // count questions
  const [qCount, setQCount] = useState(0);
  // const [tempAdjCount, setTempAdjCount] = useState(0);
  const [keywordCount, setKeywordCount] = useState(0);
  //change keyword every 4 words
  const keyword = keywords[Math.floor(keywordCount / 4) + 1];

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
        <Navbar rightLink="Exit" />
        <Container>
          <BackgroundGradient keyword={keyword} />
          <FontsPromptLeftCol qCount={qCount} keyword={keyword} />
          <FontsPromptRightCol onclickHandler={handleClick} />
        </Container>
      </GlobalContainer>
    </motion.main>
  );
}
