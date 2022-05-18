import { useState, useEffect, useRef } from "react";
import Router from "next/router";
import styles from "../pages/index.module.css";
import { motion } from "framer-motion";
import FontCard from "./FontCard";
import { PANGRAMS } from "../utils/settings";

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
  const {
    FFS,
    SFS,
    topCardState,
    setTopCardState,
    botCardState,
    setBotCardState,
  } = props;

  const [chosenCard, setChosenCard] = useState();
  const [textFade, startTextFade] = useState(false);

  const topIsMounted = useRef(false);
  const botIsMounted = useRef(false);

  const [pangramIdx, setPangramIdx] = useState(0);

  //RUN AT BEGINNING
  useEffect(() => {
    //if user refreshes, route them to home page to start over
    if (localStorage.length != 0) {
      Router.push("/");
    }
    const [font1, font2] = props.getTwoRandomItems();
    props.setFFS(font1);
    props.setSFS(font2);
  }, []);

  //TOP CARD CHANGE
  useEffect(() => {
    //is skipped first time
    if (!props.disable1Random) {
      if (topIsMounted.current) {
        if (topCardState) {
          props.setFFS(props.getRandomItem());
        }
      } else {
        topIsMounted.current = true;
      }
    }
  }, [topCardState]);

  //BOTTOM CARD CHANGE
  useEffect(() => {
    //is skipped first time
    if (!props.disable1Random) {
      if (botIsMounted.current) {
        if (botCardState) {
          props.setSFS(props.getRandomItem());
        }
      } else {
        botIsMounted.current = true;
      }
    }
  }, [botCardState]);

  //fade paragraph text
  const fadeText = () => {
    startTextFade(true);

    setTimeout(() => {
      //show card text again
      startTextFade(false);
    }, 500);
  };

  const handleClick = (option) => {
    //determine which card was clicked
    let chosenFont = option === 1 ? FFS : SFS;
    setChosenCard(option);
    props.updateChosenFont(chosenFont);

    props.onclickHandler({
      chosenStyle: chosenFont,
      keyword: props.keyword,
    });

    // Change pangram
    if (props.kwRound < 3) {
      if (option === 2) {
        // bottom card
        setTopCardState(false);
        setTimeout(() => {
          setTopCardState(true);
          setPangramIdx((pangramIdx + 1) % PANGRAMS.length);
        }, 500);
      } else {
        //top card is clicked
        setBotCardState(false);
        setTimeout(() => {
          setBotCardState(true);
          setPangramIdx((pangramIdx + 1) % PANGRAMS.length);
        }, 500);
      }
    } else {
      setTimeout(() => {
        setPangramIdx(pangramIdx % PANGRAMS.length);
      }, 1000);
    }
  };

  return (
    <div className="grid grid-rows-2 h-full">
      {/* <div className={styles.rightCol}> */}
      <motion.div
        className="row-span-1 px-[40px] pb-2 pt-[40px]"
        onClick={() => {
          handleClick(1);
          fadeText();
        }}
        variants={cardPop}
        animate={topCardState ? "stop" : "hide"}
      >
        <FontCard
          fontStyle={FFS}
          pangram={PANGRAMS[pangramIdx]}
          chosenCard={chosenCard}
          cardNum={1}
        />
      </motion.div>
      <motion.div
        className="row-span-2 px-[40px] pb-[40px] pt-2"
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
          pangram={PANGRAMS[pangramIdx]}
          chosenCard={chosenCard}
          cardNum={2}
        />
      </motion.div>
    </div>
  );
}
