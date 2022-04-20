import { useState, useEffect, Fragment } from "react";
import styles from "../pages/index.module.css";
import { motion } from "framer-motion";
import FontCard from "./FontCard";

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

let chosenCard;
let finalistCards = {};

const cardPop = {
  flip: {
    opacity: 0,
    x: 500,
    scale: 0.95,
    transition: {
      ease: [0.83, 0, 0.17, 1],
      duration: 1,
    },
  },
  stop: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      ease: [0.83, 0, 0.17, 1],
      duration: 1,
    },
  },
};

export default function FontsPromptRightCol(props) {
  //mount and unmount card
  const [FFI, setFFI] = useState(Math.floor(Math.random() * fontList.length));
  const [SFI, setSFI] = useState(Math.floor(Math.random() * fontList.length));

  const [currentPengram, setCurrentPengram] = useState(pengrams[pengramIndex]);
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
  const [textFade, startTextFade] = useState(false);
  const [FFS, setFFS] = useState(fontList[FFI]);
  const [SFS, setSFS] = useState(fontList[SFI]);

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
    chosenCard = option === 1 ? 1 : 2;

    props.onclickHandler({
      chosenStyle: chosenFont,
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
          animate={botCardState ? "stop" : "flip"}
        >
          <FontCard
            fontStyle={SFS}
            textFadeState={textFade}
            pengram={currentPengram}
            chosenCard={chosenCard}
            cardNum={2}
          />
        </motion.div>
      </Fragment>
      {/* )} */}
    </div>
  );
}
