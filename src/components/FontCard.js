import { motion, AnimatePresence } from "framer-motion";

export default function FontCard({ fontStyle, pengram, chosenCard, cardNum }) {
  return (
    <AnimatePresence>
      <motion.div
        // ${chosenCard == cardNum ? "border border-solid border-white" : ""}
        className={`
           h-full bg-black flex rounded-3xl items-center relative justify-center select-none hover:cursor-pointer`}
        // } h-full bg-black flex rounded-3xl items-center relative justify-center select-none hover:scale-[1.005] hover:cursor-pointer active:scale-[.99] hover:shadow-[0_25px_35px_rgba(0,0,0,.2)] duration-200`}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{
          ease: [0.16, 1, 0.3, 1],
          duration: 1,
          delay: cardNum - 1 * 10,
        }}
        whileHover={{
          scale: 1.005,
          boxShadow: "0px 0px 35px rgba(0, 0, 0, 0.2)",
        }}
        whileTap={{
          scale: 0.99,
          boxShadow: "0px 0px 35px rgba(0, 0, 0, 0.2)",
        }}
      >
        <p className="absolute block top-5 text-slate-50">{fontStyle}</p>
        <h3
          className="text-xl md:text-4xl text-white block text-center px-5 "
          style={{ fontFamily: `${fontStyle}` }}
        >
          {pengram}
        </h3>
      </motion.div>
    </AnimatePresence>
  );
}
