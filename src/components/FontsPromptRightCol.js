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

let firstFontStyle = fontList[Math.floor(Math.random() * fontList.length)];
let secondFontStyle = fontList[Math.floor(Math.random() * fontList.length)];

const cardFlip = {
  flip: {
    scale: 1.03,
    transition: {
      // duration: 0.5,
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

  const handleClick = (option) => {
    const chosenFont = option === 1 ? currentTopStyle : currentBotStyle;
    console.log(chosenFont);

    props.onclickHandler({
      chosenStyle: chosenFont,
    });

    // Front end flip card

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

    firstFontStyle = fontList[Math.floor(Math.random() * fontList.length)];
    secondFontStyle = fontList[Math.floor(Math.random() * fontList.length)];
  };

  return (
    <div className={styles.rightCol}>
      {/* {topCardState && ( */}
      <Fragment>
        <motion.div
          className={styles.topRight}
          onClick={() => handleClick(1)}
          variants={cardFlip}
          animate={topCardState ? "stop" : "flip"}
        >
          <FontCard fontStyle={firstFontStyle} />
        </motion.div>
        <motion.div
          className={styles.bottomRight}
          onClick={() => handleClick(2)}
          variants={cardFlip}
          animate={botCardState ? "stop" : "flip"}
        >
          <FontCard fontStyle={secondFontStyle} />
        </motion.div>
      </Fragment>
      {/* )} */}
    </div>
  );
}
