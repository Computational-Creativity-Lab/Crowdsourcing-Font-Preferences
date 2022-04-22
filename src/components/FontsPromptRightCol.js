import { useState, useEffect, Fragment } from "react";
import Router from "next/router";
import styles from "../pages/index.module.css";
import { motion } from "framer-motion";
import FontCard from "./FontCard";
import { fontList } from "../utils/settings";

const pengrams = [
  "Waltz, bad nymph, for quick jigs vex.",
  "Glib jocks quiz nymph to vex dwarf.",
  "Sphinx of black quartz, judge my vow.",
  "How vexingly quick daft zebras jump!",
  "The five boxing wizards jump quickly.",
  "Jackdaws love my big sphinx of quartz.",
  "Pack my box with five dozen liquor jugs.",
];

const remainingFonts = [];
remainingFonts.push(...fontList);

let pengramIndex = 0;

let finalistCards = {};

const cardPop = {
  hide: {
    opacity: 0,
    // x: 500,
    scale: 0.98,
    transition: {
      ease: [0.22, 1, 0.36, 1],
      duration: 1,
    },
  },
  stop: {
    // x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      ease: [0.22, 1, 0.36, 1],
      duration: 1,
    },
  },
};

export default function FontsPromptRightCol(props) {
  //mount and unmount card
  const [FFI, setFFI] = useState(Math.floor(Math.random() * fontList.length));
  const [SFI, setSFI] = useState(Math.floor(Math.random() * fontList.length));
  const [chosenCard, setChosenCard] = useState();
  const [currentPengram, setCurrentPengram] = useState(pengrams[pengramIndex]);
  const [textFade, startTextFade] = useState(false);
  const [FFS, setFFS] = useState(fontList[FFI]);
  const [SFS, setSFS] = useState(fontList[SFI]);

  const [topCardState, setTopCardState] = useState(true);
  useEffect(() => {
    if (topCardState) {
      let randomNum = Math.floor(Math.random() * remainingFonts.length);
      setFFI(randomNum);
      setFFS(fontList[FFI]);
    }
  }, [topCardState]);

  const [botCardState, setBotCardState] = useState(true);
  useEffect(() => {
    if (botCardState) {
      let randomNum = Math.floor(Math.random() * remainingFonts.length);
      setSFI(randomNum);
      setSFS(fontList[SFI]);
    }
  }, [botCardState]);

  //if user refreshes, route them to home page to start over
  useEffect(() => {
    if (localStorage.length != 0) {
      Router.push("/");
    }
  }, []);

  //fade paragraph text
  const fadeText = () => {
    startTextFade(true);

    setTimeout(() => {
      //show card text again
      startTextFade(false);

      //update font
    }, 500);
  };

  const handleClick = (option) => {
    //determine which card was clicked
    let chosenFont = option === 1 ? FFS : SFS;
    setChosenCard(option === 1 ? 1 : 2);

    props.onclickHandler({
      chosenStyle: chosenFont,
      keyword: props.keyword,
    });

    //Reset font list when a adj already had 4 responses
    if ((props.qCount + 1) % 4 == 0 && props.qCount !== 1) {
      //store responses
      localStorage.setItem(props.keyword, chosenFont);
      finalistCards[props.keyword] = chosenFont;
      console.log(finalistCards);

      remainingFonts.splice(0, remainingFonts.length);
      remainingFonts.push(...fontList);
    }

    //Remove used font from existing font list
    else {
      if (FFI <= SFI) {
        remainingFonts.splice(SFI, 1);
        remainingFonts.splice(FFI, 1);
      } else {
        remainingFonts.splice(FFI, 1);
        remainingFonts.splice(SFI, 1);
      }
    }

    // Change pengram
    // if (pengramIndex == pengrams.length - 1) {
    //   pengramIndex = 0;
    // }
    // pengramIndex++;
    // setCurrentPengram(pengrams[pengramIndex]);

    //bottom card is clicked

    if (option != 1) {
      console.log("bottom card clicked");
      setTopCardState(!topCardState);
      setTimeout(() => {
        setTopCardState(topCardState);
      }, 1000);
    } else {
      //top card is clicked
      console.log("top card clicked");
      setBotCardState(!botCardState);
      setTimeout(() => {
        setBotCardState(botCardState);
      }, 1000);
    }
  };

  return (
    <div className={styles.rightCol}>
      <motion.div
        className={styles.topRight}
        onClick={() => {
          handleClick(1);
          fadeText();
        }}
        variants={cardPop}
        animate={topCardState ? "stop" : "hide"}
      >
        <FontCard
          fontStyle={FFS}
          pengram={currentPengram}
          chosenCard={chosenCard}
          cardNum={1}
        />
      </motion.div>
      <motion.div
        className={styles.bottomRight}
        onClick={() => {
          handleClick(2);
          fadeText();
        }}
        variants={cardPop}
        animate={botCardState ? "stop" : "hide"}
      >
        <FontCard
          fontStyle={SFS}
          textFadeState={textFade}
          pengram={currentPengram}
          chosenCard={chosenCard}
          cardNum={2}
        />
      </motion.div>
    </div>
  );
}
