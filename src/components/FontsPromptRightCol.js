import { useState, useEffect, Fragment } from "react";
import styles from "../pages/index.module.css";
import { motion } from "framer-motion";
import FontCard from "./FontCard";

// dummy data
const currentTopStyle = "Roboto";
const currentBotStyle = "Alegreya";

const pengrams = [
  "Waltz, bad nymph, for quick jigs vex.",
  "Glib jocks quiz nymph to vex dwarf.",
  "Sphinx of black quartz, judge my vow.",
  "How vexingly quick daft zebras jump!",
  "The five boxing wizards jump quickly.",
  "Jackdaws love my big sphinx of quartz.",
  "Pack my box with five dozen liquor jugs.",
];


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

const remainingFonts = [];
remainingFonts.push(...fontList);


let pengramIndex = 0;
let currentPengram = pengrams[pengramIndex];

let firstFontIndex = Math.floor(Math.random() * fontList.length); 
let secondFontIndex = Math.floor(Math.random() * fontList.length);
let firstFontStyle = fontList[firstFontIndex];
let secondFontStyle = fontList[secondFontIndex];

//elastic card animation
const cardPop = {
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



    //Reset font list when a adj already had 4 responses
    if(props.qCount % 4 == 0 && props.qCount !== 0){
      remainingFonts.splice(0,remainingFonts.length);
      remainingFonts.push(...fontList);
      console.log(remainingFonts.length);
    }
    //Remove used font from existing font list
    else{
      if(firstFontIndex <= secondFontIndex){
        console.log(remainingFonts[firstFontIndex]);
        console.log(remainingFonts[secondFontIndex]);
        remainingFonts.splice(secondFontIndex, 1);
        remainingFonts.splice(firstFontIndex, 1);

      }

      else{
        console.log(remainingFonts[firstFontIndex]);
        console.log(remainingFonts[secondFontIndex]);
        remainingFonts.splice(firstFontIndex, 1);
        remainingFonts.splice(secondFontIndex, 1);
      }
    }

    console.log(remainingFonts);
    console.log(remainingFonts.length);

    // Randomize font
    firstFontIndex = Math.floor(Math.random() * remainingFonts.length);
    secondFontIndex = Math.floor(Math.random() * remainingFonts.length);
    firstFontStyle = fontList[firstFontIndex];
    secondFontStyle = fontList[secondFontIndex];


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
          variants={cardPop}
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
          variants={cardPop}
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
