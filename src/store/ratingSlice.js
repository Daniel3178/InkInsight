import { createSlice } from "@reduxjs/toolkit";
import { signInCurrentUser, signOutCurrentUser } from "./userAccountSlice";

const responseRatingSlice = createSlice({
  name: "responseRating",
  initialState: {
    isActivated: false,
    bookIdToRate: null,
    userRate: null,
    timeStamp: "",
    userReview: "",
    bookIdToReview: null,
    currentRatingResponse: {
      rate: null,
      totalNumberOfRates: null,
      userRate: null,
      userReview: null,
    },
    currentRatingBookId: null,
    bookIdsAvg: [],
    promiseResolve: "",
    promiseResolveReview: "ready",
    promiseResolveAvgRatings: "",
    currentReviewResponse: [],
    currentAvgRatingsResponse: null,
  },
  reducers: {
    setUserRating(state, action) {
      if (!state.isActivated) {
        return;
      }
      state.userRate = action.payload.rating;
      state.bookIdToRate = action.payload.bookIdToRate;
      state.userReview = action.payload.userReview;
      state.timeStamp = action.payload.timeStamp;
    },
    deleteUserRating(state, action) {
      if (!state.isActivated) {
        return;
      }
      state.userRate = null;
      state.bookIdToRate = null;
      state.userReview = null;
    },
    setCurrentBookRatingResponse(state, action) {
      state.currentRatingResponse.rate = action.payload.rate;
      state.currentRatingResponse.totalNumberOfRates =
        action.payload.totalNumberOfRates;
      state.currentRatingResponse.userRate = action.payload.userRate;
      state.promiseResolve = "ready";
    },

    setCurrentBookRatingReq(state, action) {
      if (!state.isActivated) {
        return;
      }
      if (action.payload) {
        state.currentRatingBookId = action.payload;
      }
    },
    setCurrentBookReviewReq(state, action) {
      state.bookIdToReview = action.payload;
    },
    setCurrentAvgRatingsReq(state, action) {
      state.bookIdsAvg = action.payload;
    },
    setCurrentAvgRatingsResponse(state, action) {
      state.currentAvgRatingsResponse = action.payload;
      state.promiseResolveAvgRatings = "ready";
    },
    setCurrentBookReviewResponse(state, action) {
      state.currentReviewResponse = action.payload.reviews;
      state.promiseResolveReview = "ready";
    },
    setResolvepromise(state, action) {
      state.promiseResolve = action.payload;
    },
    setResolvePromiseReview(state, action) {
      state.promiseResolveReview = action.payload;
    },
    setPromiseResolveAvgRatings(state, action) {
      state.promiseResolveAvgRatings = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signInCurrentUser, (state, action) => {
        state.isActivated = true;
      })
      .addCase(signOutCurrentUser, (state, action) => {
        state.isActivated = false;
      });
  },
});

// getters
export const getCurrentBookRatingResponse = (state) =>
  state.rating.currentRatingResponse;
export const getUserRate = (state) => state.rating.userRate;
export const getBookIdToRate = (state) => state.rating.bookIdToRate;
export const getCurrentRatingBookId = (state) =>
  state.rating.currentRatingBookId;
export const getPromiseResolve = (state) => state.rating.promiseResolve;
export const getPromiseResolveReview = (state) =>
  state.rating.promiseResolveReview;
export const getCurrentBookReviewResponse = (state) =>
  state.rating.currentReviewResponse;
export const getPromiseResolveAvgRating = (state) =>
  state.rating.promiseResolveAvgRatings;
export const getCurrentAvgRatingsResponse = (state) =>
  state.rating.currentAvgRatingsResponse;
export const getBookIdsAvg = (state) => state.rating.bookIdsAvg;
// setters
export const {
  setCurrentBookRatingResponse,
  setCurrentBookRatingReq,
  setUserRating,
  setResolvepromise,
  setCurrentBookReviewReq,
  setCurrentBookReviewResponse,
  setResolvePromiseReview,
  setCurrentAvgRatingsResponse,
  setPromiseResolveAvgRatings,
  setCurrentAvgRatingsReq,
  deleteUserRating,
} = responseRatingSlice.actions;
export const getCurrentBookRating = (state) => state.rating.currentBookRating;
export default responseRatingSlice.reducer;
