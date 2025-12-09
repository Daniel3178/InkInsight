import { configureStore, createListenerMiddleware } from "@reduxjs/toolkit";
import userAccountReducer from "./userAccountSlice";
import bookDetailsSliceReducer from "./bookDetailsSlice";
import searchSlice from "./searchSlice";
import newApiSliceReduce from "./newApiSlice";
import {
  getLocalApiResults,
  getLocalRatingArray,
} from "../database/localStorageGetters";
import ratingSliceReducer from "./ratingSlice";
import listsReducer from "./listsSlice";

export const listenerMiddleware = createListenerMiddleware();
const savedBooks = getLocalApiResults();
const savedRatings = getLocalRatingArray();
export const store = configureStore({
  reducer: {
    newApi: newApiSliceReduce,
    currentUserAccount: userAccountReducer,
    currBookDetails: bookDetailsSliceReducer,
    rating: ratingSliceReducer,
    search: searchSlice,
    bookLists: listsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(listenerMiddleware.middleware),
  loading: {
    newApi: {
      books: savedBooks,
      currentAvgRatingsResponse: savedRatings,
    },
  },
});
