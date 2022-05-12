import { FONTS, KEYWORDS_ALL } from "../settings";

const DB_DEBUG = false;

// Takes in two arrays of the filter categories and the chosen filter
// Returns an object of ranked fonts for different keywords
export const parseDBPreferences = (
  preferenceCollection,
  filterCategories,
  filters
) => {
  if (preferenceCollection === null || preferenceCollection === undefined) {
    console.log("Invalid input to parseDBPreferences");
    return [{}, false];
  }

  const empty_filter = filterCategories.length === 0 || filters.length === 0;

  // init counter
  let counters = {};
  KEYWORDS_ALL.forEach((d) => {
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

export const parseDBOptions = (preferenceCollection) => {
  if (preferenceCollection === null || preferenceCollection === undefined) {
    console.log("Invalid input to parseDBOptions");
    return [[], []];
  }
  // we get all possible options for location and language
  let locationOptions = {};
  let langOptions = {};

  preferenceCollection.forEach((p) => {
    let locationOp = p["location"]["country_name"];
    let langOp = p["language"];

    // prevents undefined case
    if (locationOp) {
      locationOptions[locationOp] = 0;
    }
    if (langOp) {
      langOptions[langOp] = 0;
    }
  });
  return [Object.keys(locationOptions), Object.keys(langOptions)];
};
