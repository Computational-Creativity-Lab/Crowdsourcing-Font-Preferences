import React, { useState, useEffect } from "react";

// let percentages = [10, 20, 30, 40, 50];

export default function DataRow(props) {
  let percentages = [20, 40, 20, 10, 10];
  let randomSelection = Math.floor(Math.random() * percentages.length);
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
          console.log(percentage);

          return (
            <div
              class={`${
                index == randomSelection
                  ? `bg-white hover:opacity-[.9]`
                  : `bg-[rgba(230,230,255,.25)] hover:bg-[rgba(230,230,255,.3)]`
              } flex flex-col border-solid border-[#ffffff00] border px-4 py-4 rounded-full ease-in-out transition-all hover:cursor-pointer`}
              style={{ width: `${percentage}%` }}
            >
              <p class="text-black font-semibold">Roboto</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
