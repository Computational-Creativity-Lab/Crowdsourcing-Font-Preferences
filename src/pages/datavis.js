import React, { useState, useEffect } from "react";
import Navbar from "../components/layout/Navbar";
import { motion, AnimatePresence } from "framer-motion";
import HeadComp from "../components/HeadComp";
import BackgroundGradient from "../components/BackgroundGradient";
import DataRow from "../components/datavis/DataRow";
import connectToMongoDB from "../utils/backend/connectDb";
import { fontList, keywords } from "../utils/settings";

const descriptors = keywords;

const DB_DEBUG = true;

export default function Datavis(props) {
  const preferenceCollection = JSON.parse(props.dbCollection);
  /** DB Data */
  useEffect(() => {
    if (DB_DEBUG) {
      console.log("pcollection", preferenceCollection);
      console.log("Length", preferenceCollection.length);
    }

    // Rank most popular fonts by going through all entries in the database
    // Populate counter
    let counters = {};
    descriptors.forEach((d) => {
      counters[d] = {};
      fontList.forEach((f) => {
        counters[d][f] = 0;
      });
    });
    preferenceCollection.forEach((pref) => {
      counters[pref.keyword][pref.font]++;
    });

    console.log(counters);
  }, []);

  /** User Data */
  const [choices, setChoices] = useState([]);
  useEffect(() => {
    //store user's word selections
    // Make sure we are on client side
    if (typeof window !== "undefined") {
      var tempChoices = [];
      descriptors.forEach((keyword) => {
        tempChoices.push(window.localStorage.getItem(keyword));
      });
      console.log("Choices:", tempChoices);
      setChoices(tempChoices);
    }
  }, []);

  return (
    <motion.main className="bg-black min-h-[100vh] overflow-hidden">
      <HeadComp></HeadComp>
      <Navbar isBlack={false}></Navbar>
      <div className="p-4">
        <div className=" grid grid-cols-2 mt-16 mb-48">
          <div>
            <h1 className="text-5xl text-white">
              You're a <span className="underline">Traditionalist</span>
            </h1>
          </div>
          <p className="text-white text-lg mt-3 mr-[10%]">
            You follow the crowd on some fonts, but forge your own path on
            others. Overall, you matched with 50% of other responses. You have a
            preference for types and you tend to stay away from{" "}
          </p>
        </div>
        <div className="text-white grid grid-cols-[300px_1fr] border-b  border-[rgba(255,255,255,.3)] border-solid pb-4 mb-8">
          <p>Keywords</p>
          <p>Top 5 Fonts</p>
        </div>
        <div>
          {choices.map((choice, i) => (
            <DataRow descriptor={descriptors[i]} chosen={choice} />
          ))}
        </div>
      </div>
      <BackgroundGradient></BackgroundGradient>
    </motion.main>
  );
}

export async function getStaticProps(context) {
  // fetch data for a single meet up

  const client = await connectToMongoDB();
  const db = client.db();

  let preferencesCollection = await db
    .collection("preferences-test")
    .find()
    .toArray();

  client.close();

  console.log("Disconnect from db ");

  return {
    props: {
      dbCollection: JSON.stringify(preferencesCollection),
    },
  };
}
