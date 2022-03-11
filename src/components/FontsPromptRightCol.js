import { useState, useEffect, Fragment } from "react";
import styles from "../pages/index.module.css";
import { motion } from "framer-motion";
import FontCard from "./FontCard";

export default function FontsPromptRightCol(props) {
  //mount and unmount card
  const [cardState, setCardState] = useState(true);

  useEffect(() => {
    console.log(cardState);

    //remount
    if (!cardState) {
      setTimeout(() => {
        //your code to be executed after 1 second
        setCardState(!cardState);
      }, 1000);
    }
  }, [cardState]);

  const handleClick = () => {
    setCardState(!cardState);
    props.onclickHandler();
  };

  return (
    <div className={styles.rightCol}>
      {cardState && (
        <Fragment>
          <motion.div className={styles.topRight} onClick={handleClick}>
            <FontCard />
          </motion.div>
          <motion.div className={styles.bottomRight} onClick={handleClick}>
            <FontCard />
          </motion.div>
        </Fragment>
      )}
    </div>
  );
}
