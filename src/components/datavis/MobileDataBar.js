export default function MobileDataBar(props) {
  return (
    <div
      onClick={() =>
        props.mobileBarClick(
          props.descriptor,
          props.sortedTypefaceNames,
          props.percentages,
          props.userSelectIdx,
          props.totalPercent
        )
      }
      className="cursor-pointer md:hidden relative flex items-center w-full bg-[#2B2C32] rounded-full overflow-hidden"
    >
      <p className=" ml-4 text-black font-medium min-w-[48px] z-10">
        {props.userSelectIdx == -1
          ? "Other"
          : localStorage.getItem(props.descriptor)}{" "}
        <span className="ml-3">
          {props.userSelectIdx == -1
            ? 100 - props.totalPercent
            : props.percentages[props.userSelectIdx]}
          %
        </span>
      </p>
      <img
        className="absolute top-0 left-0 h-full rounded-full bg-red-400"
        style={{
          width: `${
            props.userSelectIdx == -1
              ? 100 - props.totalPercent
              : props.percentages[props.userSelectIdx]
          }%`,
        }}
        src={`/textures/${props.descriptor}.png`}
      ></img>
    </div>
  );
}
