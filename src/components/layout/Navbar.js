import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function Navbar(props) {
  const [exitModal, setExitModal] = useState(false);
  return (
    <>
      <AnimatePresence>
        {exitModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ ease: [0.16, 1, 0.3, 1], duration: 0.5 }}
            class="absolute bg-[rgba(255,255,255,.2)] backdrop-blur-sm w-full h-full z-10"
          ></motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        <motion.div
          className={`fixed w-full grid px-4 py-5 grid-cols-2 border-b sm:border-solid z-10 ${
            props.isBlack
              ? "border-[rgba(0,0,0,.3)]"
              : "border-[rgba(255,255,255,.3)]"
          }`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          onMouseLeave={() => setExitModal(false)}
        >
          <p
            className={`cursor-default flex justify-self-start ${
              props.isBlack ? "text-black" : "text-white"
            }`}
          >
            Font Preference
          </p>

          <div className="flex justify-self-end">
            <p
              onClick={() => setExitModal(!exitModal)}
              className={`cursor-pointer  hover:opacity-50 ${
                props.isBlack ? "text-black" : "text-white"
              }`}
            >
              {props.rightLink}
            </p>
            <AnimatePresence>
              {exitModal && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ ease: [0.16, 1, 0.3, 1], duration: 0.5 }}
                  className="absolute right-2 top-12 text-base bg-white w-[300px] bg-zinc-900 rounded-xl p-4 drop-shadow-2xl origin-top-right"
                >
                  <p className="text-white">
                    Are you sure you want to exit this page? Your work will not
                    be saved.
                  </p>
                  <div class="grid grid-cols-2 gap-2 mt-4">
                    <button
                      onClick={() => setExitModal(false)}
                      class="p-2 bg-[rgba(255,255,255,.05)] rounded-full text-white"
                    >
                      Go back
                    </button>
                    <Link href="/">
                      <button class="p-2 bg-[rgba(255,0,0,.1)] rounded-full text-[rgba(255,20,20)]">
                        Exit
                      </button>
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </AnimatePresence>
    </>
  );
}
