import React, { useState, useEffect } from "react";
import Navbar from "../components/layout/Navbar";
import { motion, AnimatePresence } from "framer-motion";
import HeadComp from "../components/HeadComp";
import DataRow from "../components/datavis/DataRow";
import connectToMongoDB from "../utils/backend/connectDb";
import { DB_COLLECTION_NAME, FONTS, KEYWORDS_ALL } from "../utils/settings";
import MobileDataCard from "../components/datavis/MobileDataCard";
import {
  parseDBOptions,
  parseDBPreferences,
} from "../utils/backend/parseDB.module";

const DESCRIPTORS = KEYWORDS_ALL;

export default function Datavis(props) {
  /************************ DB SIDE ************************/
  // preferenceCollection stores the unfiltered db data
  const [preferenceCollection, setCollection] = useState([]);
  // filteredPreference is the actual collection of data we display in this page
  const [filteredPreference, setFiltered] = useState({});
  // we populate possible dropdown option, and keep track of the current selection
  const [locations, setLocations] = useState([]);
  const [languages, setLang] = useState([]);
  const [locationFilter, setLocationFilter] = useState("");
  const [languageFilter, setLanguageFilter] = useState("");

  /**  Initialize data we need from the db */
  useEffect(() => {
    setCollection(JSON.parse(props.dbCollection));
  }, [props.dbCollection]);

  useEffect(() => {
    if (preferenceCollection.length !== 0) {
      const [locationOptions, langOptions] =
        parseDBOptions(preferenceCollection);
      console.log("Available Options from DB:", locationOptions, langOptions);
      setLocations(locationOptions);
      setLang(langOptions);
    }
  }, [preferenceCollection]);

  useEffect(() => {
    if (locations.length != 0 && languages.length != 0) {
      console.log(
        "Setting locations and languages filters",
        locations,
        languages
      );
      setLocationFilter(locations[0].value);
      setLanguageFilter(languages[0].value);
    }
  }, [locations, languages]);

  /** Populate the data vis according to what users saw */
  const [choices, setChoices] = useState({});
  useEffect(() => {
    // store user's word selections
    // Make sure we are on client side
    if (typeof window !== "undefined") {
      var tempChoices = [];
      DESCRIPTORS.forEach((keyword) => {
        let choice = window.localStorage.getItem(keyword);
        if (choice) {
          tempChoices[keyword] = choice;
        }
      });
      setChoices(tempChoices);
    }
  }, []);

  /************************ CALL BACKS  ************************/
  /** Change the data we display according to the dropdown choice */
  const handleChange = (event, category) => {
    setValue(event.target.value);
    const newVal = event.target.value;
    console.log(category, "changed to", newVal);

    if (category === "location") {
      setLocationFilter(newVal);
    }

    if (category === "language") {
      setLanguageFilter(newVal);
    }
  };

  /** We update the data vis upon changes in filter */
  useEffect(() => {
    // Edge case when we haven't finished populating drop downs
    if (locationFilter === "" || languageFilter === "") return;

    let categories = [];
    let filters = [];

    // Non-empty filters if the current dropdown choices are not the default
    if (
      !(
        locationFilter === locations[0].value &&
        languageFilter === languages[0].value
      )
    ) {
      categories = [["location", "country_name"], "language"];
      filters = [locationFilter, languageFilter];
    }
    let [newCounter, hasSatisfy] = parseDBPreferences(
      preferenceCollection,
      categories,
      filters
    );
    if (hasSatisfy) {
      setFiltered(newCounter);
    }
  }, [
    locationFilter,
    languageFilter,
    locations,
    languages,
    preferenceCollection,
  ]);

  /************************ FRONTEND SIDE ************************/
  const [fontModal, setFontModal] = useState(false);
  // const [sortedTypefaceNames, setSorted] = useState([]);
  // const [percentages, setPercentage] = useState([]);
  const [currDescriptor, setCurrDescriptor] = useState("");

  const [globalTypeNames, setGlobalTypeNames] = useState();
  const [globalPercentages, setGlobalPercentages] = useState();
  const [globalSelectedIdx, setGlobalSelectedIdx] = useState(-1);

  const [value, setValue] = React.useState("fruit");

  const mobileBarClick = (
    descriptor,
    sortedTypefaceNames,
    percentages,
    selectedIndex
  ) => {
    setCurrDescriptor(descriptor);
    setGlobalTypeNames(sortedTypefaceNames);
    setGlobalPercentages(percentages);
    setGlobalSelectedIdx(selectedIndex);
    setFontModal(true);
  };

  return (
    <>
      <HeadComp />
      <Navbar rightLink="Exit" isBlack={false} blackBG={true} />
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
                      onChange={(e) => handleChange(e, "location")}
                    >
                      {locations.map((option) => (
                        <option value={option.value} key={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>

                    <select
                      className="bg-inherit border-b border-solid border-b-white"
                      value={value}
                      onChange={(e) => handleChange(e, "language")}
                    >
                      {languages.map((option) => (
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
              if (filteredPreference[key]) {
                return (
                  <DataRow
                    // sortedTypefaceNames={sortedTypefaceNames}
                    // setSorted={setSorted}
                    descriptor={key}
                    key={key}
                    chosen={choices[key]}
                    generalPreference={filteredPreference[key]}
                    mobileBarClick={mobileBarClick}
                    // percentages={percentages}
                    // setPercentage={setPercentage}
                  />
                );
              } else {
                return <></>;
              }
            })}
          </div>
        </div>
        <AnimatePresence>
          {fontModal && (
            <MobileDataCard
              descriptor={currDescriptor}
              globalTypeNames={globalTypeNames}
              globalPercentages={globalPercentages}
              globalSelectedIdx={globalSelectedIdx}
              setFontModal={setFontModal}
            ></MobileDataCard>
          )}
        </AnimatePresence>
      </motion.main>
    </>
  );
}

export async function getStaticProps() {
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
