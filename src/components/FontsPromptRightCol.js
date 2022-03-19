import { useState, useEffect, Fragment } from "react";
import styles from "../pages/index.module.css";
import { motion } from "framer-motion";
import FontCard from "./FontCard";

// dummy data
const currentTopStyle = "Roboto";
const currentBotStyle = "Alegreya";

const fontList = [
  "Abril Fatface",
  "Alegreya",
  "Anonymous Pro",
  "Arvo",
  "EB Garamond",
  "Great Vibes",
  "Hind",
  "IBM Plex Sans",
  "Josefin Sans",
  "Josefin Slab",
  "Lato",
  "Libre Baskerville",
  "Lobster",
  "Montserrat",
  "Open Sans",
  "Playfair Display",
  "PT Sans",
  "PT Serif",
  "Quattrocento",
  "Roboto",
  "Roboto Slab",
  "Source Sans Pro",
  "Space Mono",
];

const pengrams = [
  "Waltz, bad nymph, for quick jigs vex.",
  "Glib jocks quiz nymph to vex dwarf.",
  "Sphinx of black quartz, judge my vow.",
  "How vexingly quick daft zebras jump!",
  "The five boxing wizards jump quickly.",
  "Jackdaws love my big sphinx of quartz.",
  "Pack my box with five dozen liquor jugs.",
];

let pengramIndex = 0;
let currentPengram = pengrams[pengramIndex];
let firstFontStyle = fontList[Math.floor(Math.random() * fontList.length)];
let secondFontStyle = fontList[Math.floor(Math.random() * fontList.length)];

//elastic card animation
const cardFlip = {
  flip: {
    scale: 1.03,
    transition: {
      type: "spring",
      bounce: 0.5,
    },
  },
  stop: {
    scale: 1,
  },
};

export default function FontsPromptRightCol(props) {
  //mount and unmount card
  const [topCardState, setTopCardState] = useState(true);
  const [botCardState, setBotCardState] = useState(true);
  const [textFade, startTextFade] = useState(false);
  // useEffect(() => {
  //   //reappear
  //   if (!topCardState) {
  //     setTimeout(() => {
  //       setTopCardState(!topCardState);
  //       if (topCardState) {
  //         firstFontStyle =
  //           fontList[Math.floor(Math.random() * fontList.length)];
  //         secondFontStyle =
  //           fontList[Math.floor(Math.random() * fontList.length)];
  //       }
  //     }, 1000);
  //   }
  // }, [topCardState]);

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
    const chosenFont = option === 1 ? currentTopStyle : currentBotStyle;
    props.onclickHandler({
      chosenStyle: chosenFont,
    });

    // Change font
    firstFontStyle = fontList[Math.floor(Math.random() * fontList.length)];
    secondFontStyle = fontList[Math.floor(Math.random() * fontList.length)];

    // Change pengram
    if (pengramIndex == pengrams.length - 1) {
      pengramIndex = 0;
    }
    pengramIndex++;
    currentPengram = pengrams[pengramIndex];

    if (option === 1) {
      setTopCardState(!topCardState);
      setTimeout(() => {
        setTopCardState(topCardState);
      }, 80);
    } else {
      setBotCardState(!botCardState);
      setTimeout(() => {
        setBotCardState(botCardState);
      }, 80);
    }
  };

  return (
    <div className={styles.rightCol}>
      {/* {topCardState && ( */}
      <Fragment>
        <motion.div
          className={styles.topRight}
          onClick={() => {
            handleClick(1);
            fadeText();
          }}
          variants={cardFlip}
          animate={topCardState ? "stop" : "flip"}
        >
          <FontCard
            fontStyle={firstFontStyle}
            textFadeState={textFade}
            pengram={currentPengram}
          />
        </motion.div>
        <motion.div
          className={styles.bottomRight}
          onClick={() => {
            handleClick(2);
            fadeText();
          }}
          variants={cardFlip}
          animate={botCardState ? "stop" : "flip"}
        >
          <FontCard
            fontStyle={secondFontStyle}
            textFadeState={textFade}
            pengram={currentPengram}
          />
        </motion.div>
      </Fragment>
      {/* )} */}
    </div>
  );
}
