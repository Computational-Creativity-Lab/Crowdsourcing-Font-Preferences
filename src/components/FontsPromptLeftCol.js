import { NUM_QUESTIONS } from "../utils/settings";

export default function FontsPromptLeftCol(props) {
  return (
    <div className="grid grid-template-rows-2 px-4 py-4 ml-0 lg:ml-4 font-light">
      <div>
        <h2 className="text-2xl lg:text-5xl pb-3 md:pb-5 mt-0 lg:mt-6">
          {" "}
          Choose a font that feels
        </h2>
        <h1 className="text-6xl lg:text-7xl inline-block border-solid border border-black rounded-full px-4 py-2 md:px-8 md:py-3">
          {props.keyword}
        </h1>
      </div>
      <div className="fixed bottom-6 lg:static flex justify-between lg:justify-start items-end flex-row flex-nowrap mb:0 lg:mb-4 w-[calc(100%-2rem)]">
        <div className="w-20 mr-0 lg:mr-2 ">
          <h3 className="text-lg lg:text-3xl">
              Q{props.qCount + 1}/{NUM_QUESTIONS}
          </h3>
        </div>
        <div className="flex flex-row gap-1 w-15 pb-2 lg:pb-3">
          <div
            className={`${
              props.kwRound >= 0
                ? "bg-slate-900"
                : "border border-solid border-black"
            } w-3 h-3 rounded-full`}
          ></div>
          <div
            className={`${
              props.kwRound >= 1
                ? "bg-slate-900"
                : "border border-solid border-black"
            } w-3 h-3 rounded-full`}
          ></div>
          <div
            className={`${
              props.kwRound >= 2
                ? "bg-slate-900"
                : "border border-solid border-black"
            } w-3 h-3 rounded-full`}
          ></div>
          <div
            className={`${
              props.kwRound >= 3
                ? "bg-slate-900"
                : "border border-solid border-black"
            } w-3 h-3 rounded-full`}
          ></div>
        </div>
      </div>
    </div>
  );
}
