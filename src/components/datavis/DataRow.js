import React, { useState, useEffect } from "react";
import DataBar from "./DataBar";

// let percentages = [10, 20, 30, 40, 50];
const fontList = [
  "Abril Fatface",
  "Alegreya",
  "Anonymous Pro",
  "Arvo",
  "EB Garamond",
  "Great Vibes",
  "Hind",
  "IBM Plex Sans",
  "Josefin Sans",
  "Josefin Slab",
  "Lato",
  "Libre Baskerville",
  "Lobster",
  "Montserrat",
  "Open Sans",
  "Playfair Display",
  "PT Sans",
  "PT Serif",
  "Quattrocento",
  "Roboto",
  "Roboto Slab",
  "Source Sans Pro",
  "Space Mono",
];

export default function DataRow(props) {
  let percentages = [20, 40, 20, 10, 10];
  let randomSelection = Math.floor(Math.random() * percentages.length);

  useEffect(() => {
    // console.log(props.chosenWords);
  });

  return (
    <div class="grid grid-cols-[300px_1fr] mb-4">
      {/* descriptor */}
      <div class="col-start-1">
        <h1 class="text-white text-2xl w-fit border border-solid border-white rounded-full px-4 py-2">
          {props.descriptor}
        </h1>
      </div>
      {/* chart */}
      <div class="flex flex-row inline-block col-start-2 mb-4">
        {percentages.map((percentage, index) => {
          return (
            <DataBar
              currentDescriptor={props.descriptor}
              key={index}
              index={index}
              percentage={percentage}
              randomSelection={randomSelection}
              fontList={fontList}
            ></DataBar>
          );
        })}
      </div>
    </div>
  );
}
