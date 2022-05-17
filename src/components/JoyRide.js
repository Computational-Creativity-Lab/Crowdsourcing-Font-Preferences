import { motion, AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import Router from "next/router";
import Lottie from "react-lottie";
import onboardAnim from "../../public/onboarding-animation.json";

const onboardingAnimSettings = {
  loop: true,
  autoplay: true,
  animationData: onboardAnim,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

export default function JoyRide(props) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ ease: [0.16, 1, 0.3, 1], duration: 2 }}
      className="fixed top-0 left-0 w-full h-full  bg-[rgba(0,0,0,.5)] z-20"
    >
      <div className="flex items-center justify-center h-full">
        <motion.div
          initial={{ translateY: 40 }}
          animate={{ translateY: 0 }}
          transition={{ ease: [0.16, 1, 0.3, 1], duration: 1 }}
          className="rounded-xl drop-shadow-2xl  overflow-hidden overflow-y-auto max-w-[800px] w-[90%] max-h-[95%] bg-zinc-900"
        >
          <div className="px-8 pt-8">
            <p className="leading-10 text-2xl md:text-3xl text-zinc-100 mb-10">
              Select the font that best matches each{" "}
              <span className="py-1 px-3 md:px-4 border border-solid border-zinc-100 rounded-full">
                Keyword
              </span>
            </p>
            <div className="text-white grid md:grid-cols-2 h-auto gap-8">
              <div className="flex flex-col">
                <p className="text-base">
                  {`Whatever font you choose will remain. The unselected one will
                  change. You’ll have four chances to decide on the best match
                  for that keyword. After four rounds, the font that remains
                  will be your selection and you’ll move on to a new keyword.`}
                </p>
              </div>

              <Lottie
                className="w-full h-auto"
                options={onboardingAnimSettings}
              />
            </div>
          </div>
          <button
            onClick={() => {
              Router.push("/survey");
            }}
            className="bottom-0 w-full px-2 py-6 hover:bg-[rgba(255,255,255,.05)] border-t border-solid border-[rgba(255,255,255,.2)] text-white mt-8"
          >
            Begin
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}
