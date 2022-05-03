import { useState, useEffect, useRef } from "react";
import Router from "next/router";
import styles from "../pages/index.module.css";
import { motion } from "framer-motion";
import FontCard from "./FontCard";
import { FONTS } from "../utils/settings";

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

  const {
    FFS,
    SFS,
    topCardState,
    setTopCardState,
    botCardState,
    setBotCardState,
  } = props;

  //const [FFI, setFFI] = useState(Math.floor(Math.random() * FONTS.length));
  //const [SFI, setSFI] = useState(Math.floor(Math.random() * FONTS.length));
  const [chosenCard, setChosenCard] = useState();
  const [currentPengram, setCurrentPengram] = useState(pengrams[pengramIndex]);
  const [textFade, startTextFade] = useState(false);

  // const [topCardState, setTopCardState] = useState(true);
  // const [botCardState, setBotCardState] = useState(true);
  const topIsMounted = useRef(false);
  const botIsMounted = useRef(false);

  useEffect(() => {
    //don't do this first time
    if (topIsMounted.current) {
      if (topCardState) {
        props.setFFS(props.getRandomItem());
        // console.log("randomizing top");
      }
    } else {
      topIsMounted.current = true;
    }
    console.log(topCardState);
  }, [topCardState]);

  useEffect(() => {
    if (botIsMounted.current) {
      if (botCardState) {
        props.setSFS(props.getRandomItem());
        // console.log("randomizing bot");
      }
    } else {
      botIsMounted.current = true;
    }
    console.log(botCardState);
  }, [botCardState]);

  //if user refreshes, route them to home page to start over
  useEffect(() => {
    if (localStorage.length != 0) {
      Router.push("/");
    }
    const [font1, font2] = props.getTwoRandomItems();
    props.setFFS(font1);
    props.setSFS(font2);
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
    props.updateChosenFont(chosenFont);

    props.onclickHandler({
      chosenStyle: chosenFont,
      keyword: props.keyword,
    });

    // Change pengram
    // if (pengramIndex == pengrams.length - 1) {
    //   pengramIndex = 0;
    // }
    // pengramIndex++;
    // setCurrentPengram(pengrams[pengramIndex]);

    if (props.kwRound < 2) {
      console.log();
      if (option != 1) {
        setTopCardState(false);
        setTimeout(() => {
          setTopCardState(true);
        }, 1000);
      } else {
        //top card is clicked
        setBotCardState(false);
        setTimeout(() => {
          setBotCardState(true);
        }, 1000);
      }
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
