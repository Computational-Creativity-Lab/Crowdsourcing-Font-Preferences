import { FONTS, KEYWORDS } from "../settings";

const DB_DEBUG = true;

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
  KEYWORDS.forEach((d) => {
    counters[d] = {};
    FONTS.forEach((f) => {
      counters[d][f] = 0;
    });
  });

  // go through original db collection and make a filtered copy
  let hasSatisfy = empty_filter; // if no entry satisfies, we signify the caller
  let filteredCollection = preferenceCollection.filter((pref) => {
    let satisfy = true;

    // for each entry in db collection, we check for all the filters
    filterCategories.forEach((category, index) => {
      if (typeof category === "string") {
        satisfy &= pref[category] === filters[index];
      } else {
        satisfy &= pref[category[0]][category[1]] === filters[index];
      }
    });

    hasSatisfy |= satisfy;
    return satisfy;
  });

  // collect scores
  filteredCollection.forEach((pref) => {
    if (counters[pref.keyword]) {
      counters[pref.keyword][pref.font]++;
    }
  });

  // we clean up counter's entry where there are no data points
  let keys = Object.keys(counters);
  for (let i = 0; i < keys.length; i++) {
    let sum = 0;
    FONTS.forEach((f) => {
      sum += counters[keys[i]][f];
    });

    if (sum === 0) {
      // no data point for the current keyword
      console.log("No data point for", keys[i]);
      counters[keys[i]] = undefined;
    }
  }

  if (DB_DEBUG) {
    console.log("Filtered collection", filteredCollection);
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

  let locationSelect = Object.keys(locationOptions).map((k) => {
    return {
      value: k,
      label: k,
    };
  });
  let langSelect = Object.keys(langOptions).map((k) => {
    return {
      value: k,
      label: k,
    };
  });

  // we add the view all options
  locationSelect.unshift({ value: "All Countries", label: "All Countries" });
  langSelect.unshift({ value: "All Languages", label: "All Languages" });

  return [locationSelect, langSelect];
};
