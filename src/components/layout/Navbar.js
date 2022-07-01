import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function Navbar(props) {
  const [exitModal, setExitModal] = useState(false);
  return (
    <>
      {/* onhover background */}
      <AnimatePresence>
        {exitModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ ease: [0.16, 1, 0.3, 1], duration: 0.5 }}
            class="fixed bg-[rgba(0,0,0,.5)] backdrop-blur-sm w-full h-full z-20"
          ></motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {exitModal && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ ease: [0.16, 1, 0.3, 1], duration: 0.5 }}
            className="text-white fixed overflow-hidden right-8 top-4 px-6 text-base w-[380px] bg-[#1d202a] rounded-xl drop-shadow-2xl origin-top-right !z-30"
          >
            <p className="text-sm text-white px-1 pt-5">
              Are you sure you want to exit this page? <br/>Your work will not be
              saved.
            </p>
            <div className="grid grid-cols-2 mt-5 border-t border-solid border-[rgba(255,255,255,.2)] py-4">
              <button
                onClick={() => setExitModal(false)}
                className="h-2 text-sm pb-5 text-zinc-500 hover:text-white border-r border-solid border-[rgba(255,255,255,.2)]"
              >
                Continue quiz
              </button>
              <Link href="/">
                <button className="h-2 text-sm pb-5 text-zinc-500 hover:text-white">
                  Exit
                </button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        <motion.div
          className={`hover:cursor-default fixed w-full grid px-4 py-5 grid-cols-2 border-b border-solid z-10 ${
            props.isBlack
              ? "border-[rgba(0,0,0,.3)]"
              : "border-[rgba(255,255,255,.3)]"
          }  ${props.blackBG ? "bg-zinc-900" : ""} `}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          onMouseEnter={() => {
            if (props.setHidecursor !== undefined) {
              props.setHideCursor(true);
            }
          }}
          onMouseLeave={() => {
            if (props.setHidecursor !== undefined) {
              props.setHideCursor(false);
            }
          }}
        >
          <p
            className={`ml-1 lg:ml-4 font-light cursor-default flex justify-self-start ${
              props.isBlack ? "text-black" : "text-white"
            } `}
          >
            {`What's Your Type?`}
          </p>

          <div className="flex justify-self-end mr-1 lg:mr-4 font-light">
            <p
              onClick={() => setExitModal(!exitModal)}
              className={`cursor-pointer opacity-100 lg:opacity-80 hover:opacity-50 ${
                props.isBlack ? "text-black" : "text-white"
              }`}
            >
              {props.rightLink}
            </p>
          </div>
        </motion.div>
      </AnimatePresence>
    </>
  );
}
