import React, { useState, useEffect } from "react";
import Navbar from "../components/layout/Navbar";
import { motion, AnimatePresence } from "framer-motion";
import HeadComp from "../components/HeadComp";
import DataRow from "../components/datavis/DataRow";
import connectToMongoDB from "../utils/backend/connectDb";
import { DB_COLLECTION_NAME, FONTS, KEYWORDS_ALL } from "../utils/settings";

const descriptors = KEYWORDS_ALL;
const DB_DEBUG = true;

export default function Datavis(props) {
  const preferenceCollection = JSON.parse(props.dbCollection);
  const [generalPreference, setGeneral] = useState({});
  const countryOptions = [
    { label: "All countries", value: "all countries" },
    { label: "USA", value: "USA" },
    { label: "China", value: "China" },
    { label: "France", value: "France" },
  ];
  const langOptions = [
    { label: "All languages", value: "All language" },
    { label: "English", value: "English" },
    { label: "Chinese", value: "Chinese" },
    { label: "French", value: "French" },
    { label: "German", value: "German" },
  ];

  const [value, setValue] = React.useState("fruit");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  /** DB Data */
  useEffect(() => {
    // Rank most popular fonts by going through all entries in the database
    let counters = {};
    descriptors.forEach((d) => {
      counters[d] = {};
      FONTS.forEach((f) => {
        counters[d][f] = 0;
      });
    });
    preferenceCollection.forEach((pref) => {
      counters[pref.keyword][pref.font]++;
    });

    if (DB_DEBUG) {
      console.log("Collection", preferenceCollection);
    }

    setGeneral(counters);
  }, []);

  /** User Data */
  const [choices, setChoices] = useState({});
  useEffect(() => {
    //store user's word selections
    // Make sure we are on client side
    if (typeof window !== "undefined") {
      var tempChoices = [];
      descriptors.forEach((keyword) => {
        let choice = window.localStorage.getItem(keyword);
        if (choice) {
          tempChoices[keyword] = choice;
        }
      });
      // console.log("Choices:", tempChoices);
      setChoices(tempChoices);
    }
  }, []);

  return (
    <>
      <HeadComp></HeadComp>
      <Navbar rightLink="Exit" isBlack={false} />
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-black min-h-[100vh] overflow-hidden"
      >
        <div className="p-4">
          <div className="grid md:grid-cols-2 mt-16 mb-24 md:mb-48">
            <div>
              <h1 className="text-5xl text-white mb-8">
                {``}
                You&apos;re a <span className="underline">Traditionalist</span>
              </h1>
            </div>
            <div className="text-white text-lg">
              <p className=" mt-3 md:mr-[10%]">
                You follow the crowd on some fonts, but forge your own path on
                others. Overall, you matched with 50% of other responses. You
                have a preference for types and you tend to stay away from{" "}
              </p>

              <div className="mt-12">
                <div>
                  <label>
                    <p className="mb-2">You are viewing data of</p>

                    <select
                      className="bg-inherit border-b border-solid border-b-white mr-8 "
                      value={value}
                      onChange={handleChange}
                    >
                      {countryOptions.map((option) => (
                        <option value={option.value} key={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>

                    <select
                      className="bg-inherit border-b border-solid border-b-white"
                      value={value}
                      onChange={handleChange}
                    >
                      {langOptions.map((option) => (
                        <option value={option.value} key={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="text-white grid md:grid-cols-[300px_1fr] grid-cols-[3fr_5fr] border-b  border-[rgba(255,255,255,.3)] border-solid pb-4 mb-8">
            <p>Keywords</p>
            <p>Top 5 Fonts</p>
          </div>
          <div>
            {Object.keys(choices).map((key) => {
              console.log(choices);
              return (
                <DataRow
                  descriptor={key}
                  key={key}
                  chosen={choices[key]}
                  generalPreference={generalPreference[key]}
                />
              );
            })}
          </div>
        </div>
      </motion.main>
    </>
  );
}

export async function getStaticProps(context) {
  const client = await connectToMongoDB();
  const db = client.db();

  let preferencesCollection = await db
    .collection(DB_COLLECTION_NAME)
    .find()
    .toArray();

  client.close();

  console.log("Disconnect from db");

  return {
    props: {
      dbCollection: JSON.stringify(preferencesCollection),
    },
  };
}
