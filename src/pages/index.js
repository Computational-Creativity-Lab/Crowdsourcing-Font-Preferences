import React, { useState } from "react";
import Navbar from "../components/layout/Navbar";
import { motion, AnimatePresence } from "framer-motion";
import HeadComp from "../components/HeadComp";
import GlobalContainer from "../components/layout/GlobalContainer";
import FontsPromptRightCol from "../components/FontsPromptRightCol";
import Container from "../components/layout/Container";
import FontsPromptLeftCol from "../components/FontsPromptLeftCol";

export default function Home() {
  //count questions
  const [qCount, setQCount] = useState(0);

  const handleQCount = () => {
    setQCount(qCount + 1);
    console.log("clicked");
  };

  async function handleClick() {
    handleQCount();
  }

  return (
    <motion.main
    // initial={{ opacity: 0 }} animate={{ opacity: 1 }}
    >
      <HeadComp />
      <GlobalContainer>
        <Navbar />
        <Container>
          <FontsPromptLeftCol qCount={qCount} />
          <FontsPromptRightCol onclickHandler={handleClick} />
        </Container>
      </GlobalContainer>
    </motion.main>
  );
}
