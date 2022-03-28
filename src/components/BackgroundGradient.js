const colorPairs = {
  Authoritative: "green",
  Caring: "blue",
  Casual: "red",
  Cheerful: "yellow",
  Coarse: "orange",
  Conservative: "pink",
  Dry: "white",
  Edgy: "gray",
  Ethusiastic: "teal",
  Formal: "magenta",
  Frank: "green",
  Friendly: "blue",
  Fun: "red",
  Funny: "black",
}

export default function BackgroundGradient({ keyword }) {
  let bgColor = "green";
  if (keyword == "Caring") {
    bgColor = "blue";
  } else if (keyword == "Casual") {
    bgColor = "purple";
  } else {
    bgColor = "red";
  }

  return (
    <div
      className={"absolute w-screen h-screen z-[-1]"}
      style={{backgroundColor: colorPairs[keyword]}}
    >
    </div>
  );
}
