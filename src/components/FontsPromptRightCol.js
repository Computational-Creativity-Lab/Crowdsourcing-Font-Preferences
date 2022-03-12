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
  flip: { rotateY: "90deg", transition: { duration: 0.5 } },
  stop: { rotateY: "0deg", transition: { duration: 0.5 } },
};

export default function FontsPromptRightCol(props) {
  //mount and unmount card
  const [cardState, setCardState] = useState(true);

  // useEffect(() => {
  //   //reappear
  //   if (!cardState) {
  //     setTimeout(() => {
  //       setCardState(!cardState);
  //       if (cardState) {
  //         firstFontStyle =
  //           fontList[Math.floor(Math.random() * fontList.length)];
  //         secondFontStyle =
  //           fontList[Math.floor(Math.random() * fontList.length)];
  //       }
  //     }, 1000);
  //   }
  // }, [cardState]);

  const handleClick = (option) => {
    const chosenFont = option === 1 ? currentTopStyle : currentBotStyle;
    console.log(chosenFont);

    props.onclickHandler({
      chosenStyle: chosenFont,
    });

    // Front end flip card
    setCardState(!cardState);
    setTimeout(() => {
      setCardState(cardState);
      firstFontStyle = fontList[Math.floor(Math.random() * fontList.length)];
      secondFontStyle = fontList[Math.floor(Math.random() * fontList.length)];
    }, 1000);
  };

  return (
    <div className={styles.rightCol}>
      {/* {cardState && ( */}
      <Fragment>
        <motion.div
          className={styles.topRight}
          onClick={() => handleClick(1)}
          variants={cardFlip}
          animate={!cardState ? "flip" : "stop"}
        >
          <FontCard fontStyle={firstFontStyle} />
        </motion.div>
        <motion.div
          className={styles.bottomRight}
          onClick={() => handleClick(2)}
          variants={cardFlip}
          animate={!cardState ? "flip" : "stop"}
        >
          <FontCard fontStyle={secondFontStyle} />
        </motion.div>
      </Fragment>
      {/* )} */}
    </div>
  );
}
