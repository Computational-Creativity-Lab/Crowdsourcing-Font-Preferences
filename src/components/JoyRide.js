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
      className="absolute top-0 w-full h-full  bg-[rgba(0,0,0,.5)]"
    >
      <div>
        <div className="absolute rounded-xl drop-shadow-2xl max-w-[800px] w-[90%] bg-zinc-900 z-20 left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]">
          <div className="px-8 pt-8">
            <p className="leading-8 text-3xl text-zinc-100 mb-10">
              Select the font that best matches each{" "}
              <span className="pb-1 px-4 border border-solid border-zinc-100 rounded-full">
                Keyword
              </span>
            </p>
            <div className="text-white grid grid-cols-2 h-auto gap-8">
              <div className="flex flex-col">
                <p className="text-base">
                  {`Whatever font you choose will remain. The unselected one will
                  change. You’ll have four chances to decide on the best match
                  for that keyword. After four rounds, the font that remains
                  will be your selection and you’ll move on to a new keyword.`}
                </p>
              </div>

              <div className="w-full h-auto">
                <Lottie options={onboardingAnimSettings} />
              </div>
            </div>
          </div>
          <button
            onClick={() => {
              Router.push("/survey");
            }}
            className="w-full px-2 py-6 hover:bg-[rgba(255,255,255,.05)] border-t border-solid border-[rgba(255,255,255,.2)] text-white mt-8"
          >
            Begin
          </button>
        </div>
      </div>
    </motion.div>
  );
}
