import { motion, AnimatePresence } from "framer-motion";

export default function FontCard(props) {
  return (
    <AnimatePresence>
      <motion.div
        class={`${
          props.chosenCard == props.cardNum
            ? "border border-solid border-white"
            : ""
        } h-full bg-black flex rounded-3xl items-center relative justify-center select-none hover:scale-[1.005] hover:cursor-pointer active:scale-[.99] hover:shadow-[0_25px_35px_rgba(0,0,0,.2)] duration-200`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{
          default: { duration: 0.1 },
        }}
      >
        <p class="absolute block top-5 text-slate-50">{props.fontStyle}</p>
        <h3
          class="text-xl md:text-4xl text-white block text-center px-5 "
          style={{ fontFamily: `${props.fontStyle}` }}
        >
          {props.pengram}
        </h3>
      </motion.div>
    </AnimatePresence>
  );
}
