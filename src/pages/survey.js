import React, { useState, useEffect } from "react";
import Navbar from "../components/layout/Navbar";
import { motion, AnimatePresence } from "framer-motion";
import HeadComp from "../components/HeadComp";
import GlobalContainer from "../components/layout/GlobalContainer";
import FontsPromptRightCol from "../components/FontsPromptRightCol";
import FontsPromptLeftCol from "../components/FontsPromptLeftCol";
import Router from "next/router";
import { FONTS, KEYWORDS, NUM_QUESTIONS } from "../utils/settings";

const MAX_Q_IDX = NUM_QUESTIONS - 1;

// backend
import axios from "axios";
import FiberScene from "../components/fiberbg/Scene";
import getFirstBrowserLanguage from "../utils/backend/getLanguage.module";
const WRITE_TO_DB = true;

// pengram
const pengrams = [
  "Algorithms",
  "Background",
  "Binoculars",
  "Birthplace",
  "Blueprints",
  "Clipboards",
  "Cornflakes",
  "Educations",
  "Flamingoes",
  "Importance",
  "Journalism",
  "Lifeguards",
  "Microwaves",
  "Documentary",
  "Personality",
  "Regulations",
  "Speculation",
  "Workmanship",
  "Housewarming",
  "Xylographers",
];

export default function Survey() {
  // count questions
  const [qIdx, setQIdx] = useState(0);
  const [adj, setAdj] = useState(KEYWORDS[qIdx]);
  const [kwRound, setKwRound] = useState(0);
  const [chosenFont, setChosenFont] = useState();
  const [remainingFonts, setRemainingFonts] = useState(new Set(FONTS));
  const [FFS, setFFS] = useState("");
  const [SFS, setSFS] = useState("");
  const [topCardState, setTopCardState] = useState(true);
  const [botCardState, setBotCardState] = useState(true);
  const [pengramIndex, setPengramIndex] = useState(0);
  const [currentPengram, setCurrentPengram] = useState(pengrams[pengramIndex]);

  const [disable1Random, setDisable1Random] = useState(false);

  useEffect(() => {
    console.log(pengramIndex, currentPengram);
  }, [currentPengram, pengramIndex]);

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
    let tmp = new Set(items);

    //remove first item
    let item1 = items[Math.floor(Math.random() * items.length)];
    tmp.delete(item1);
    items = Array.from(tmp);

    //remove second item
    let item2 = items[Math.floor(Math.random() * items.length)];
    tmp.delete(item2);

    setRemainingFonts(tmp);
    return [item1, item2];
  }

  // change keyword every 4 words
  useEffect(() => {
    setAdj(KEYWORDS[qIdx]);
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

  //KEYWORD ROUND IS OVER
  useEffect(() => {
    if (kwRound == 4) {
      setKwRound(0);
      if (qIdx + 1 > MAX_Q_IDX) {
        Router.push("datavis");
      } else {
        setQIdx(qIdx + 1);
        const [font1, font2] = getTwoRandomItems();

        setDisable1Random(true);

        //animation
        setTopCardState(false);
        setBotCardState(false);
        setTimeout(() => {
          setTopCardState(true);
          setBotCardState(true);
          setFFS(font1);
          setSFS(font2);
        }, 1000);
        setTimeout(() => {
          setDisable1Random(false);
        }, 1200);
      }

      //store font
      localStorage.setItem(adj, chosenFont);
    }
  }, [kwRound, adj, chosenFont, qIdx]);

  async function addPreferenceHandler(payload) {
    if (!WRITE_TO_DB) return;

    const location =
      locationData.country_code === "US"
        ? { country_name: locationData.country_name, state: locationData.state }
        : { country_name: locationData.country_name };
    const time = Date().toLocaleString();
    const language = getFirstBrowserLanguage();
    const data = {
      font: payload.chosenStyle,
      keyword: payload.keyword,
      location: location,
      time: time,
      language: language,
    };

    await fetch("/api/new-preference", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  async function handleClick(payload) {
    // NEEDS REVISION
    if ((kwRound + 1) % 4 == 0 && kwRound !== 0) {
      await addPreferenceHandler(payload);
    }

    // setQIdx(qIdx + 1);
    setKwRound(kwRound + 1);
  }

  const updateChosenFont = (font) => {
    setChosenFont(font);
  };

  return (
    <motion.main>
      <HeadComp />
      <GlobalContainer>
        <Navbar rightLink="Exit" isBlack={true} />

        <div className="grid h-full grid-cols-1 grid-rows-[1fr_2fr] md:grid-rows-1 md:grid-cols-2 pt-14">
          <FontsPromptLeftCol qCount={qIdx} keyword={adj} kwRound={kwRound} />
          <FontsPromptRightCol
            pengramIndex={pengramIndex}
            setPengramIndex={setPengramIndex}
            pengrams={pengrams}
            currentPengram={currentPengram}
            setCurrentPengram={setCurrentPengram}
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
            disable1Random={disable1Random}
          />
        </div>
        <FiberScene keyword={adj} />
      </GlobalContainer>
    </motion.main>
  );
}
