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
            class="fixed bg-[rgba(0,0,0,.8)] backdrop-blur-sm w-full h-full z-20"
            onClick={() => setExitModal(false)}
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
            className="fixed overflow-hidden right-4 top-4 text-base w-[300px] bg-zinc-900 rounded-xl drop-shadow-2xl origin-top-right !z-30 border border-solid border-zinc-800"
          >
            <p className="text-white  px-4 pt-4">
              Are you sure you want to exit this page? Your work will not be
              saved.
            </p>
            <div className="grid grid-cols-2 mt-4 border-t border-solid border-zinc-800">
              <button
                onClick={() => setExitModal(false)}
                className="p-4 hover:bg-[rgba(255,255,255,.05)] text-white border-r border-solid border-zinc-800"
              >
                Go back
              </button>
              <Link href="/">
                <button className="p-4 hover:bg-[rgba(255,0,0,.1)] text-[rgba(255,20,20)]">
                  Exit
                </button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        <motion.div
          className={`fixed w-full grid px-4 py-5 grid-cols-2 border-b border-solid z-10 ${
            props.isBlack ? "border-zinc-500" : "border-zinc-800"
          }  ${props.blackBG ? "bg-black" : ""} `}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          // onMouseLeave={() => setExitModal(false)}
          onMouseEnter={() => {
            if (props.cursorActive !== undefined) {
              props.setCursorActive(false);
            }
          }}
          onMouseLeave={() => {
            if (props.cursorActive !== undefined) {
              props.setCursorActive(true);
            }
          }}
        >
          <p
            className={`cursor-default flex justify-self-start ${
              props.isBlack ? "text-black" : "text-white"
            } `}
          >
            {`What's Your Type?`}
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
          </div>
        </motion.div>
      </AnimatePresence>
    </>
  );
}
