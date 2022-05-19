import HeadComp from "../components/HeadComp";
import GlobalContainer from "../components/layout/GlobalContainer";
import { motion } from "framer-motion";
import FiberScene from "../components/fiberbg/Scene";
import { useState } from "react";
import Navbar from "../components/layout/Navbar";
import { KEYWORDS } from "../utils/settings";

export default function TestGradient() {
  const [adj, setAdj] = useState(KEYWORDS[0]);
  function handleChange(event) {
    setAdj(event.target.value);
  }
  return (
    <motion.main>
      <HeadComp />
      <GlobalContainer>
        <Navbar rightLink="Exit" isBlack={true} />
        <div className="grid grid-cols-1 grid-rows-[1fr_2fr] md:grid-rows-1 md:grid-cols-6 pt-14">
          <select
            className="bg-inherit border-b border-solid border-b-white"
            value={adj}
            onChange={handleChange}
          >
            {KEYWORDS.map((key) => (
              <option value={key} key={key}>
                {key}
              </option>
            ))}
          </select>{" "}
        </div>
        <FiberScene keyword={adj} />
      </GlobalContainer>
    </motion.main>
  );
}
