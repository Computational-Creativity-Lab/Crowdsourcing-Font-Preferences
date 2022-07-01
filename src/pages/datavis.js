import React, { useState, useEffect } from "react";
import Navbar from "../components/layout/Navbar";
import { motion, AnimatePresence } from "framer-motion";
import HeadComp from "../components/HeadComp";
import DataRow from "../components/datavis/DataRow";
import connectToMongoDB from "../utils/backend/connectDb";
import { DB_COLLECTION_NAME, KEYWORDS, PERSONALITIES } from "../utils/settings";
import MobileDataCard from "../components/datavis/MobileDataCard";
import {
  parseDBOptions,
  parseDBPreferences,
} from "../utils/backend/parseDB.module";
import Link from "next/link";

const DESCRIPTORS = KEYWORDS;

export default function Datavis(props) {
  /************************ BACKEND SIDE ************************/
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

  // Only gets run once when we get the db collection
  useEffect(() => {
    if (preferenceCollection.length !== 0) {
      const [locationOptions, langOptions] =
        parseDBOptions(preferenceCollection);
      // console.log("Available Options from DB:", locationOptions, langOptions);
      setLocations(locationOptions);
      setLang(langOptions);
    }
  }, [preferenceCollection]);

  // Only gets run once when we finish populating dropdown options
  useEffect(() => {
    if (locations.length != 0 && languages.length != 0) {
      // console.log(
      //   "Setting locations and languages filters",
      //   locations,
      //   languages
      // );
      setLocationFilter(locations[0].value);
      setLanguageFilter(languages[0].value);
    }
  }, [locations, languages]);

  // Only gets run once.  Populate the data vis according to what users saw in survey
  const [choices, setChoices] = useState({});
  const [noSurvey, setNoSurvey] = useState(false);
  useEffect(() => {
    // store user's word selections
    // Make sure we are on client side
    if (typeof window !== "undefined") {
      // we keep a flag to know whether if the user directly came to this page
      var didSurvey = false;
      var tempChoices = {};
      DESCRIPTORS.forEach((keyword) => {
        let choice = window.localStorage.getItem(keyword);
        if (choice) {
          tempChoices[keyword] = choice;
          didSurvey |= true;
        }
      });

      if (!didSurvey) {
        // console.log("User did not do survey.");
        setNoSurvey(true);
      }

      setChoices(tempChoices);
    }
  }, []);

  /************************ CALL BACKS  ************************/
  /** Change the data we display according to the dropdown choice */
  const handleChange = (event, category) => {
    const newVal = event.target.value;
    // console.log(category, "changed to", newVal);
    // reset the other filters to all when a filter is clicked
    if (category === "location") {
      setLocationFilter(languages[0].value);
      setLocationFilter(newVal);
    }

    if (category === "language") {
      setLocationFilter(locations[0].value);
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
    if (!(locationFilter === locations[0].value)) {
      categories.push(["location", "country_name"]);
      filters.push(locationFilter);
      // console.log("Has location filter");
    }
    if (!(languageFilter === languages[0].value)) {
      categories.push("language");
      filters.push(languageFilter);
      // console.log("Has language filter");
    }

    // Get a new collection to display according to our filters
    let [newCounter, hasSatisfy] = parseDBPreferences(
      preferenceCollection,
      categories,
      filters
    );

    // We only change if there are valid entries, which should always be true
    // since we populated the dropdown options from the db data
    if (hasSatisfy) {
      setFiltered(newCounter);
      // console.log("Update filtered data to", newCounter);
    } else {
      // console.log("NO satisfy");
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
  const [currDescriptor, setCurrDescriptor] = useState("");

  //for mobile purposes
  const [globalTypeNames, setGlobalTypeNames] = useState();
  const [globalPercentages, setGlobalPercentages] = useState();
  const [globalSelectedIdx, setGlobalSelectedIdx] = useState(-1);
  const [globalTotalPercent, setGlobalTotalPercent] = useState();
  const [top5Count, setTop5Count] = useState(0);
  const [personalityDesription, setPersonalityDescription] = useState(false);

  useEffect(() => {
    console.log(top5Count);
  }, [top5Count]);

  const updateTop5Count = () => {
    console.log("match");
    setTop5Count((top5Count = top5Count + 1));
  };

  const mobileBarClick = (
    descriptor,
    sortedTypefaceNames,
    percentages,
    selectedIndex,
    totalPercent
  ) => {
    setCurrDescriptor(descriptor);
    setGlobalTypeNames(sortedTypefaceNames);
    setGlobalPercentages(percentages);
    setGlobalSelectedIdx(selectedIndex);
    setFontModal(true);
    setGlobalTotalPercent(totalPercent);
  };

  useEffect(() => {
    // console.log(filteredPreference);
  }, [filteredPreference]);

  return (
    <>
      <HeadComp />
      <Navbar rightLink="Exit" isBlack={false} blackBG={true} />
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className=" min-h-[100vh] overflow-hidden bg-zinc-900"
      >
        <div className="p-4 font-light mt-5">
          <div className="grid md:grid-cols-2 mt-0 lg:mt-16 mb-24 md: mb-32">

              <div className="text-white mt-12 text-sm lg:ml-4 ml-1 opacity-80 inline-block lg:hidden">
                <div>
                  <label>
                    <p className="mb-2 text-xs pb-2 opacity-50">You are viewing data of</p>

                    <select
                      className="bg-inherit border-b border-solid border-b-gray-500 pb-1 mr-8 w-[150px]"
                      value={locationFilter}
                      onChange={(e) => handleChange(e, "location")}
                    >
                      {locations.map((option) => (
                        <option value={option.value} key={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>

                    <select
                      className="bg-inherit border-b border-solid border-b-gray-500 pb-1 w-[150px]"
                      value={languageFilter}
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

            <div>
              {!noSurvey && (
                <h1 className="mt-12 lg:mt-0 lg:text-6xl text-3xl text-white mb-2 lg:mb-8 lg:ml-4 ml-1">
                  {``}
                  You&apos;re a{" "}
                  <span className="underline underline-offset-4 lg:decoration-[3px] decoration-2">
                    {top5Count <= 2
                      ? "Trailblazer"
                      : top5Count >= 3 && top5Count <= 5
                      ? "Pioneer"
                      : top5Count >= 6 && top5Count <= 8
                      ? "Generalist"
                      : "Traditionalist"}
                  </span>
                </h1>
              )}
              {noSurvey && (
                <h1 className="text-5xl text-white mb-8">
                  What&apos;s your type?
                </h1>
              )}
            </div>
            <div className="text-white text-lg md: text-base">
              <p className="mt-3 md: mr-[10%] lg:ml-4 ml-1 lg:opacity-100 opacity-50">
                {!noSurvey &&
                  (top5Count <= 2
                    ? PERSONALITIES["Trailblazer"]
                    : top5Count >= 3 && top5Count <= 5
                    ? PERSONALITIES["Pioneer"]
                    : top5Count >= 6 && top5Count <= 8
                    ? PERSONALITIES["Generalist"]
                    : PERSONALITIES["Traditionalist"])}
                {noSurvey && PERSONALITIES["NoSurvey"]}
              </p>
              {noSurvey && (
                <p>
                  Click{" "}
                  <span className="underline">
                    <Link href="/survey">here</Link>
                  </span>{" "}
                  to participate in the survey.
                </p>
              )}

              <div className="mt-12 text-sm lg:ml-4 ml-1 opacity-80 hidden lg:inline-block">
                <div>
                  <label>
                    <p className="mb-2">You are viewing data of</p>

                    <select
                      className="bg-inherit border-b border-solid border-b-gray-500 pb-1 mr-8 w-[150px]"
                      value={locationFilter}
                      onChange={(e) => handleChange(e, "location")}
                    >
                      {locations.map((option) => (
                        <option value={option.value} key={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>

                    <select
                      className="bg-inherit border-b border-solid border-b-gray-500 pb-1 w-[150px]"
                      value={languageFilter}
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
          <div className="opacity-80 text-sm text-white grid lg:grid-cols-[288px_1fr] grid-cols-[1fr_1fr] border-b  border-[rgba(255,255,255,.3)] border-solid pb-4 mb-8 lg:ml-4 ml-1">
            <p>Keywords</p>
            <p>Top 5 Fonts</p>
          </div>
          <div>
            {DESCRIPTORS.map((key) => {
              if (filteredPreference[key]) {
                return (
                  <DataRow
                    descriptor={key}
                    key={key}
                    chosen={-1000} // user did not do survey so no valid choice
                    generalPreference={filteredPreference[key]}
                    mobileBarClick={mobileBarClick}
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
              globalTotalPercent={globalTotalPercent}
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

  // console.log("Disconnect from db");

  // we clean the data a bit
  let parsedCollection = preferencesCollection;
  parsedCollection.forEach((entry) => {
    if (entry["language"] === undefined || entry["language"] === null) {
      entry["language"] = "en-US";
    }
  });

  return {
    props: {
      dbCollection: JSON.stringify(parsedCollection),
    },
  };
}
