import HeadComp from "../components/HeadComp";
import GlobalContainer from "../components/layout/GlobalContainer";
import { motion } from "framer-motion";
import FiberScene from "../components/fiberbg/Scene";
import { useState } from "react";
import Navbar from "../components/layout/Navbar";
import { KEYWORDS, WAVE_INTENSITY } from "../utils/settings";

export default function TestGradient() {
  const [adj, setAdj] = useState(KEYWORDS[0]);
  const [waveIntensity, setWave] = useState(WAVE_INTENSITY);
  function handleChange(event) {
    setAdj(event.target.value);
  }

  function handleIntensitySlider(event) {
    console.log(event.target.value);
    setWave(event.target.value / 100.0);
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
          <input
            type="range"
            min="1"
            max="500"
            value={waveIntensity * 100}
            className="slider"
            id="waveSlider"
            onInput={handleIntensitySlider}
          />
          <label htmlFor="waveSlider">wave intensity: {waveIntensity} </label>
        </div>
        <FiberScene keyword={adj} waveIntensity={waveIntensity} />
      </GlobalContainer>
    </motion.main>
  );
}
