import React, { useState, useEffect } from "react";

export default function DataRow(props) {
  return (
    <>
      <hr class="border-solid border-white w-full"></hr>
      <div class="flex justify-between mb-4">
        {/* descriptor */}
        <div class='min-w-[200px]'>
          <h1 class="text-white text-4xl w-fit border border-solid border-white rounded-full px-4 py-2 mt-3">
            {props.descriptor}
          </h1>
        </div>
        {/* chart */}
        <div class="ml-12 flex flex-row inline-block pt-3 w-[80vw]">
          <div class="flex flex-col w-[40%] ">
            <p class="flex text-white justify-center pb-2">Hello</p>
            <div class="inline-block bg-[#EA6161] p-2 rounded-full border-solid border-[#ffffff00] border hover:border-white"></div>
          </div>
          <div class="flex flex-col w-[30%]">
            <p class="flex text-white justify-center pb-2">Hello</p>
            <div class="inline-block bg-[#ffffff30] p-2 rounded-full border-solid border-[#ffffff00] border hover:border-white"></div>
          </div>
          <div class="flex flex-col w-[10%]">
            <p class="flex text-white justify-center pb-2">Hello</p>
            <div class="inline-block bg-[#ffffff30] p-2 rounded-full border-solid border-[#ffffff00] border hover:border-white"></div>
          </div>
          <div class="flex flex-col w-[10%]">
            <p class="flex text-white justify-center pb-2">Hello</p>
            <div class="inline-block bg-[#ffffff30] p-2 rounded-full border-solid border-[#ffffff00] border hover:border-white"></div>
          </div>
          <div class="flex flex-col w-[10%]">
            <p class="flex text-white justify-center pb-2">Hello</p>
            <div class="inline-block bg-[#ffffff30] p-2 rounded-full border-solid border-[#ffffff00] border hover:border-white"></div>
          </div>
        </div>
      </div>
    </>
  );
}
