import React, { useState, useEffect } from "react";
import Navbar from "../components/layout/Navbar";
import { motion, AnimatePresence } from "framer-motion";
import HeadComp from "../components/HeadComp";
import DataRow from "../components/datavis/DataRow";
import connectToMongoDB from "../utils/backend/connectDb";
import {
  COUNTRY_OPTIONS,
  DB_COLLECTION_NAME,
  FONTS,
  KEYWORDS_ALL,
  LANG_OPTIONS,
} from "../utils/settings";
import MobileDataCard from "../components/datavis/MobileDataCard";

const DESCRIPTORS = KEYWORDS_ALL;
const DB_DEBUG = true;

export default function Datavis(props) {
  // DB Side
  const preferenceCollection = JSON.parse(props.dbCollection);
  const [filteredPreference, setFiltered] = useState({});
  const [locationFilter, setLocationFilter] = useState(
    COUNTRY_OPTIONS[0].value
  );
  const [languageFilter, setLanguageFilter] = useState(LANG_OPTIONS[0].value);

  // Client side (?)
  const [fontModal, setFontModal] = useState(false);
  // const [sortedTypefaceNames, setSorted] = useState([]);
  // const [percentages, setPercentage] = useState([]);
  const [currDescriptor, setCurrDescriptor] = useState("");

  const [globalTypeNames, setGlobalTypeNames] = useState();
  const [globalPercentages, setGlobalPercentages] = useState();
  const [globalSelectedIdx, setGlobalSelectedIdx] = useState(-1);

  const [value, setValue] = React.useState("fruit");

  // Takes in two arrays of the filter categories and the chosen filter
  // Returns an object of ranked fonts for different keywords
  const parseDBPreferences = (filterCategories, filters) => {
    const empty_filter = filterCategories.length === 0 || filters.length === 0;

    // init counter
    let counters = {};
    DESCRIPTORS.forEach((d) => {
      counters[d] = {};
      FONTS.forEach((f) => {
        counters[d][f] = 0;
      });
    });

    // go through original db collection and make a filtered copy
    let hasSatisfy = empty_filter; // if no entry satisfies, we signify the caller
    let filteredCollection = preferenceCollection.filter((pref) => {
      let satisfy = true;
      filterCategories.forEach((category, index) => {
        if (typeof category === "string") {
          satisfy &= pref[category] === filters[index];
        } else {
          // must be a length 2 array
          // console.log(
          //   pref[category[0]][category[1]] === filters[index],
          //   pref[category[0]][category[1]],
          //   filters[index]
          // );
          satisfy &= pref[category[0]][category[1]] === filters[index];
        }
        hasSatisfy |= satisfy;
      });

      return satisfy;
    });

    // collect scores
    filteredCollection.forEach((pref) => {
      counters[pref.keyword][pref.font]++;
    });

    if (DB_DEBUG) {
      console.log(filteredCollection);
    }

    return [counters, hasSatisfy];
  };

  /** Change the data we display according to the dropdown choice */
  const handleChange = (event, category) => {
    setValue(event.target.value);
    const newVal = event.target.value;
    // console.log(category, "changed to", newVal);

    if (category === "location") {
      setLocationFilter(newVal);
    }

    if (category === "language") {
      setLanguageFilter(newVal);
    }
  };

  /** We update the data vis upon changes in filter */
  useEffect(() => {
    let categories = [];
    let filters = [];

    // Non-empty filters if the current dropdown choices are not the default
    if (
      !(
        locationFilter === COUNTRY_OPTIONS[0].value &&
        languageFilter === LANG_OPTIONS[0].value
      )
    ) {
      categories = [["location", "country_name"], "language"];
      filters = [locationFilter, languageFilter];
    }
    let [newCounter, hasSatisfy] = parseDBPreferences(categories, filters);
    if (hasSatisfy) {
      setFiltered(newCounter);
    } else {
      // TODO: display different screen or warning for this case
      // console.log("Current filter has no valid entry");
    }
  }, [locationFilter, languageFilter]);

  /** User Data */
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
                      {COUNTRY_OPTIONS.map((option) => (
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
                      {LANG_OPTIONS.map((option) => (
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

export async function getStaticProps(context) {
  const client = await connectToMongoDB();
  const db = client.db();

  let preferencesCollection = await db
    .collection(DB_COLLECTION_NAME)
    .find()
    .toArray();

  client.close();

  // console.log("Disconnect from db");

  return {
    props: {
      dbCollection: JSON.stringify(preferencesCollection),
    },
  };
}
