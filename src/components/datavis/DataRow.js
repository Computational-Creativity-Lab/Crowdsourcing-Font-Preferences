import React, { useState, useEffect } from "react";
import DataBar from "./DataBar";

const NUM_BARS = 5; // how many top choices we display

export default function DataRow(props) {
  const [sortedTypefaceNames, setSorted] = useState([]);
  const [percentages, setPercentage] = useState([]);
  const [userSelectIdx, setSelectIdx] = useState(-1);
  const [totalPercent, setTotalPercent] = useState(0);

  useEffect(() => {
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
    setPercentage(percentArr);
    setSorted(namesArr);
    // console.log("Percentages for", props.descriptor, " : ", percentArr);
    // console.log("Sorted typefaces: ", namesArr);
    const userSelect = namesArr.findIndex((a) => {
      return a === props.chosen;
    });

    setSelectIdx(userSelect);
  }, []);

  return (
    <div className="grid grid-cols-[300px_1fr] mb-4">
      {/* descriptor */}
      <div className="col-start-1">
        <h1 className="text-white text-2xl w-fit border border-solid border-white rounded-full px-4 py-2">
          {props.descriptor}
        </h1>
      </div>
      {/* chart */}
      <div className="flex flex-row inline-block col-start-2 mb-4">
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
    </div>
  );
}
