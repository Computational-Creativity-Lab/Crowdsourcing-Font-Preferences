import { NUM_QUESTIONS } from "../utils/settings";

export default function FontsPromptLeftCol(props) {
  return (
    <div className="grid grid-template-rows-2 px-4 py-4">
      <div>
        <h2 className="text-2xl lg:text-4xl pb-3 md:pb-5">
          {" "}
          Choose a font that feels...
        </h2>
        <h1 className="text-5xl lg:text-8xl inline-block border-solid border-2 border-black rounded-full px-4 py-2 md:px-8 md:py-3">
          {props.keyword}
        </h1>
      </div>
      <div className="justify-items-center justify-end flex flex-col">
        <h3 className="text-2xl lg:text-4xl pb-4 ">
          Q{props.qCount + 1}/{NUM_QUESTIONS}
        </h3>
        <div className="flex flex-row gap-4">
          <div
            className={`${
              props.kwRound >= 0
                ? "bg-slate-900"
                : "border border-solid border-black"
            } w-4 h-4 rounded-full`}
          ></div>
          <div
            className={`${
              props.kwRound >= 1
                ? "bg-slate-900"
                : "border border-solid border-black"
            } w-4 h-4 rounded-full`}
          ></div>
          <div
            className={`${
              props.kwRound >= 2
                ? "bg-slate-900"
                : "border border-solid border-black"
            } w-4 h-4 rounded-full`}
          ></div>
          <div
            className={`${
              props.kwRound >= 3
                ? "bg-slate-900"
                : "border border-solid border-black"
            } w-4 h-4 rounded-full`}
          ></div>
        </div>
      </div>
    </div>
  );
}
