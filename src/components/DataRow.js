import React, { useState, useEffect } from "react";

export default function DataRow( props) {

  return (
    <>
      <hr class="border-solid border-white w-full"></hr>
      <div class='flex gap-[48px] mb-4'>
        {/* descriptor */}
          <h1 class='text-white text-4xl h-fit border-solid border-white rounded-full px-4 py-2 mt-3'>{props.descriptor}</h1>
          {/* chart */}
          <div class='flex flex-row inline-block pt-3 w-full'>
            <div class='flex flex-col w-[40%] '>
              <p class='flex text-white justify-center pb-2'>Hello</p>
              <div class='inline-block bg-[#EA6161] p-2 rounded-full border-solid border-[#ffffff00] hover:border-white'></div>
            </div>
            <div class='flex flex-col w-[30%]'>
              <p class='flex text-white justify-center pb-2'>Hello</p>
              <div class='inline-block bg-[#ffffff30] p-2 rounded-full border-solid border-[#ffffff00] hover:border-white'></div>
            </div>
            <div class='flex flex-col w-[10%]'>
              <p class='flex text-white justify-center pb-2'>Hello</p>
              <div class='inline-block bg-[#ffffff30] p-2 rounded-full border-solid border-[#ffffff00] hover:border-white'></div>
            </div>
            <div class='flex flex-col w-[10%]'>
              <p class='flex text-white justify-center pb-2'>Hello</p>
              <div class='inline-block bg-[#ffffff30] p-2 rounded-full border-solid border-[#ffffff00] hover:border-white'></div>
            </div>
            <div class='flex flex-col w-[10%]'>
              <p class='flex text-white justify-center pb-2'>Hello</p>
              <div class='inline-block bg-[#ffffff30] p-2 rounded-full border-solid border-[#ffffff00] hover:border-white'></div>
            </div>
        </div>
      </div>
      </>
  );
}
