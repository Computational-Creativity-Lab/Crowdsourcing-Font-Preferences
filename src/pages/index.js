import React, { useState } from "react";
import Navbar from "../components/layout/Navbar";
import { motion, AnimatePresence } from "framer-motion";
import HeadComp from "../components/HeadComp";
import GlobalContainer from "../components/layout/GlobalContainer";
import FontsPromptRightCol from "../components/FontsPromptRightCol";
import Container from "../components/layout/Container";
import FontsPromptLeftCol from "../components/FontsPromptLeftCol";

// dummy data
const keyword = "Playful";

export default function Home() {
  //count questions
  const [qCount, setQCount] = useState(0);

  async function addPreferenceHandler(payload) {
    const response = await fetch("/api/new-preference", {
      method: "POST",
      body: JSON.stringify({ font: payload.chosenStyle, keyword: keyword }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
  }

  async function handleClick(payload) {
    console.log("clicked, data:", payload);

    setQCount(qCount + 1);
    addPreferenceHandler(payload);
  }

  return (
    <motion.main
    // initial={{ opacity: 0 }} animate={{ opacity: 1 }}
    >
      <HeadComp />
      <GlobalContainer>
        <Navbar />
        <Container>
          <FontsPromptLeftCol qCount={qCount} keyword={keyword} />
          <FontsPromptRightCol onclickHandler={handleClick} />
        </Container>
      </GlobalContainer>
    </motion.main>
  );
}
