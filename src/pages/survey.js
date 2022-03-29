import React, { useState, useEffect } from "react";
import Navbar from "../components/layout/Navbar";
import { motion, AnimatePresence } from "framer-motion";
import HeadComp from "../components/HeadComp";
import GlobalContainer from "../components/layout/GlobalContainer";
import FontsPromptRightCol from "../components/FontsPromptRightCol";
import Container from "../components/layout/Container";
import FontsPromptLeftCol from "../components/FontsPromptLeftCol";
import Router from "next/router";
import BackgroundGradient from "../components/BackgroundGradient";


// backend
import axios from "axios";
const WRITE_TO_DB = false;

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

let restoreFonts = false;

export default function Home() {
  // count questions
  const [qCount, setQCount] = useState(0);

  //change keyword every 4 words
  let keyword = keywords[Math.floor(qCount / 4) + 1];

  //add all fonts back in once keyword is done
  if(qCount % 4 == 0 && qCount !== 0){
    restoreFonts = true;
  }

  if(qCount + 1 > 20){
    Router.push("/");
  }
  // backend, creating IP state
  const [locationData, setLocationData] = useState({});

  // load ip address using Axios
  async function getLocationData() {
    const res = await axios.get("https://geolocation-db.com/json/");
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

  }

  async function handleClick(payload) {
    setQCount(qCount + 1);
    addPreferenceHandler(payload);
  }


  return (
    <motion.main>
      <HeadComp />
      <GlobalContainer>
        <Navbar rightLink="Exit" />
        <Container>
          <FontsPromptLeftCol qCount={qCount} keyword={keyword} />
          <FontsPromptRightCol
            onclickHandler={handleClick}
            qCount={qCount}/>
        </Container>
          <BackgroundGradient keyword={keyword} />
      </GlobalContainer>
    </motion.main>
  );
}
