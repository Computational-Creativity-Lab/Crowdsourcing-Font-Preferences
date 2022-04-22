import React, { useState, useEffect } from "react";
import Navbar from "../components/layout/Navbar";
import { motion, AnimatePresence } from "framer-motion";
import HeadComp from "../components/HeadComp";
import GlobalContainer from "../components/layout/GlobalContainer";
import FontsPromptRightCol from "../components/FontsPromptRightCol";
import Container from "../components/layout/Container";
import FontsPromptLeftCol from "../components/FontsPromptLeftCol";
import Router from "next/router";
import { KEYWORDS, NUM_QUESTIONS } from "../utils/settings";

// backend
import axios from "axios";
import BackgroundShader from "../components/not-using/ShaderGradient";
import FiberScene from "../components/fiberbg/Scene";
const WRITE_TO_DB = true;

let restoreFonts = false;

export default function Home() {
  // count questions
  const [qIdx, seQIdx] = useState(0);
  const [adj, setAdj] = useState(KEYWORDS[qIdx]);

  // change keyword every 4 words
  useEffect(() => {
    setAdj(KEYWORDS[Math.floor(qIdx / 4)]);
  }, [qIdx]);

  useEffect(() => {
    getLocationData();
  }, []);

  // backend, creating IP state
  const [locationData, setLocationData] = useState({});

  // load ip address using Axios
  async function getLocationData() {
    const res = await axios.get("https://geolocation-db.com/json/");
    setLocationData(res.data);
  }

  async function addPreferenceHandler(payload) {
    if (!WRITE_TO_DB) return;

    const location =
      locationData.country_code === "US"
        ? { country_name: locationData.country_name, state: locationData.state }
        : { country_name: locationData.country_name };
    const time = Date().toLocaleString();
    const data = {
      font: payload.chosenStyle,
      keyword: payload.keyword,
      location: location,
      time: time,
    };
    console.log("Adding data to db: ", data);

    await fetch("/api/new-preference", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  const MAX_Q_IDX = NUM_QUESTIONS - 1;

  async function handleClick(payload) {
    if ((qIdx + 1) % 4 == 0 && qIdx !== 0) {
      await addPreferenceHandler(payload);
    }

    // go to data page
    if (qIdx + 1 > MAX_Q_IDX) {
      Router.push("datavis");
      return;
    }

    //add all fonts back in once keyword is done
    if ((qIdx + 1) % 4 == 0 && qIdx !== 0) {
      restoreFonts = true;
    }

    seQIdx(qIdx + 1);
  }

  return (
    <motion.main>
      <HeadComp />
      <GlobalContainer>
        <Navbar rightLink="Exit" isBlack={true} />
        <Container>
          <FontsPromptLeftCol qCount={qIdx} keyword={adj} />
          <FontsPromptRightCol
            onclickHandler={handleClick}
            qCount={qIdx}
            keyword={adj}
          />
        </Container>
        <FiberScene keyword={adj} />
      </GlobalContainer>
    </motion.main>
  );
}
