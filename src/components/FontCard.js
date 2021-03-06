import { motion, AnimatePresence } from "framer-motion";

export default function FontCard({ fontStyle, pangram, chosenCard, cardNum }) {
  return (
    <AnimatePresence>
      <motion.div
        // ${chosenCard == cardNum ? "border border-solid border-white" : ""}
        className={`
           h-full bg-black flex rounded-2xl items-center relative justify-center select-none hover:cursor-pointer`}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{
          ease: [0.16, 1, 0.3, 1],
          duration: 1,
          delay: cardNum - 1 * 10,
        }}
        whileHover={{
          scale: 1.02,
          boxShadow: "0px 0px 35px rgba(0, 0, 0, 0.2)",
        }}
        whileTap={{
          scale: 0.99,
          boxShadow: "0px 0px 35px rgba(0, 0, 0, 0.2)",
        }}
      >
        <p className="absolute block top-4 lg:top-8 font-light text-slate-50 opacity-50 text-sm">{fontStyle}</p>
        <h3
          className="text-3xl md:text-5xl text-white block text-center px-5 "
          style={{ fontFamily: `${fontStyle}` }}
        >
          {pangram}
        </h3>
      </motion.div>
    </AnimatePresence>
  );
}
