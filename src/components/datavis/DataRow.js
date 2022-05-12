import React, { useState, useEffect } from "react";
import DataBar from "./DataBar";
import MobileDataBar from "./MobileDataBar";

const NUM_BARS = 5; // how many top choices we display

export default function DataRow(props) {
  const [userSelectIdx, setSelectIdx] = useState(-1);
  const [totalPercent, setTotalPercent] = useState(0);
  const [percentages, setPercentage] = useState([]);
  const [sortedTypefaceNames, setSorted] = useState([]);
  // const { sortedTypefaceNames, setSorted } = props;

  useEffect(() => {
    if (
      props.generalPreference === null ||
      props.generalPreference === undefined
    )
      return;

    // sort general preferences into a list of high to low popularity
    let scorePairs = [];
    let countSum = 0;
    Object.keys(props.generalPreference).forEach((k) => {
      let pair = {
        typeface: k,
        count: props.generalPreference[k],
      };
      scorePairs.push(pair);
      countSum += pair.count;
    });

    // sort into high to low
    scorePairs.sort(function compareFn(a, b) {
      return b.count - a.count;
    });

    // console.log(scorePairs);

    // populate percentage array
    let percentArr = [];
    let totalPercentLocal = 0;
    let namesArr = [];
    for (let i = 0; i < NUM_BARS; i++) {
      let curScore = Math.round((scorePairs[i].count / countSum) * 100);
      percentArr.push(curScore);
      totalPercentLocal += curScore;
      namesArr.push(scorePairs[i].typeface);
    }
    namesArr.push("Other");
    percentArr.push(100 - totalPercentLocal);
    setTotalPercent(totalPercentLocal);

    //seem to only be running once
    setPercentage(percentArr);
    setSorted(namesArr);

    const userSelect = namesArr.findIndex((a) => {
      return a === props.chosen;
    });

    setSelectIdx(userSelect);

    // console.log(props.descriptor, percentArr);
  }, [props.generalPreference, props.chosen]);

  return (
    <div className="grid md:grid-cols-[300px_1fr] grid-cols-[3fr_5fr] mb-4">
      {/* descriptor */}
      <div className="col-start-1">
        <h1 className="text-white text-2xl w-fit border border-solid border-white rounded-full px-4 py-2">
          {props.descriptor}
        </h1>
      </div>
      {/* bar graph */}
      <div className="hidden md:flex flex-row col-start-2 mb-4">
        {percentages.map((percentage, index) => {
          return (
            <DataBar
              currentDescriptor={props.descriptor}
              key={index}
              index={index}
              fontName={sortedTypefaceNames[index]}
              percentage={percentage}
              otherPercent={100 - totalPercent}
              allPercentages={percentages}
              userSelected={userSelectIdx}
              fontList={sortedTypefaceNames}
            />
          );
        })}
      </div>
      <MobileDataBar
        descriptor={props.descriptor}
        userSelectIdx={userSelectIdx}
        totalPercent={totalPercent}
        percentages={percentages}
        mobileBarClick={props.mobileBarClick}
        sortedTypefaceNames={sortedTypefaceNames}
      ></MobileDataBar>
    </div>
  );
}
