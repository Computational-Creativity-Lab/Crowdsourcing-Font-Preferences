import React, { useState, useEffect } from "react";
import Navbar from "../components/layout/Navbar";
import { motion, AnimatePresence } from "framer-motion";
import HeadComp from "../components/HeadComp";
import GlobalContainer from "../components/layout/GlobalContainer";
import FontsPromptRightCol from "../components/FontsPromptRightCol";
import Container from "../components/layout/Container";
import FontsPromptLeftCol from "../components/FontsPromptLeftCol";
import Router from "next/router";
import { FONTS, KEYWORDS, NUM_QUESTIONS } from "../utils/settings";
import JoyRide from "../components/Joyride";

// backend
import axios from "axios";
import FiberScene from "../components/fiberbg/Scene";
import { useFBO } from "@react-three/drei";
const WRITE_TO_DB = true;

export default function Survey() {
  // count questions
  const [qIdx, setQIdx] = useState(0);
  const [adj, setAdj] = useState(KEYWORDS[qIdx]);
  const [kwRound, setKwRound] = useState(0);
  const [joyride, setJoyride] = useState(true);
  const [chosenFont, setChosenFont] = useState();
  const [remainingFonts, setRemainingFonts] = useState(new Set(FONTS));
  const [FFS, setFFS] = useState("");
  const [SFS, setSFS] = useState("");
  const [topCardState, setTopCardState] = useState(true);
  const [botCardState, setBotCardState] = useState(true);

  function getRandomItem() {
    let items = Array.from(remainingFonts);
    let item = items[Math.floor(Math.random() * items.length)];
    let tmp = new Set(remainingFonts);
    tmp.delete(item);

    setRemainingFonts(tmp);
    return item;
  }

  //reset full
  function getTwoRandomItems() {
    let items = Array.from(new Set(FONTS));
    let item1 = items[Math.floor(Math.random() * items.length)];
    let tmp = new Set(items);
    tmp.delete(item1);
    items = Array.from(tmp);
    let item2 = items[Math.floor(Math.random() * items.length)];
    tmp.delete(item2);
    setRemainingFonts(tmp);
    return [item1, item2];
  }

  // change keyword every 4 words
  useEffect(() => {
    setAdj(KEYWORDS[qIdx]);
    console.log(qIdx);
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

  //when each keyword round is over
  useEffect(() => {
    if (kwRound == 3) {
      setKwRound(0);
      setQIdx(qIdx + 1);
      const [font1, font2] = getTwoRandomItems();
      setFFS(font1);
      setSFS(font2);

      //animation
      setTopCardState(false);
      setBotCardState(false);
      setTimeout(() => {
        setTopCardState(true);
        setBotCardState(true);
      }, 1000);

      //store font
      localStorage.setItem(adj, chosenFont);
    }
  }, [kwRound]);

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
    // console.log("Adding data to db: ", data);

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
    // NEEDS REVISION
    if ((qIdx + 1) % 4 == 0 && qIdx !== 0) {
      await addPreferenceHandler(payload);
    }

    // go to data page
    if (qIdx + 1 > MAX_Q_IDX) {
      Router.push("datavis");
      return;
    }

    // setQIdx(qIdx + 1);
    setKwRound(kwRound + 1);
  }

  const joyrideState = () => {
    setJoyride(false);
  };

  const updateChosenFont = (font) => {
    setChosenFont(font);
  };

  return (
    <motion.main>
      <HeadComp />
      <GlobalContainer>
        <Navbar rightLink="Exit" isBlack={true} />

        {/* {localStorage.length == 0 && joyride && (
          <JoyRide joyrideState={joyrideState} />
        )} */}

        <div className="grid h-full grid-cols-2 pt-14">
          <FontsPromptLeftCol qCount={qIdx} keyword={adj} kwRound={kwRound} />
          <FontsPromptRightCol
            onclickHandler={handleClick}
            qCount={qIdx}
            keyword={adj}
            kwRound={kwRound}
            updateChosenFont={updateChosenFont}
            getRandomItem={getRandomItem}
            remainingFonts={remainingFonts}
            getTwoRandomItems={getTwoRandomItems}
            FFS={FFS}
            SFS={SFS}
            setFFS={setFFS}
            setSFS={setSFS}
            topCardState={topCardState}
            setTopCardState={setTopCardState}
            botCardState={botCardState}
            setBotCardState={setBotCardState}
          />
        </div>
        <FiberScene keyword={adj} />
      </GlobalContainer>
    </motion.main>
  );
}
