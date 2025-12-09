import { BASE_URL, options } from "../config/apiConfig";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setCurrentAvgRatingsReq } from "./ratingSlice";

// TODO: Add filter options as needed
// https://developer.themoviedb.org/reference/discover-movie

export const searchByNewApiAsync = createAsyncThunk(
  "tmdbApi/discoverMovies",
  async (filterOptions, { dispatch }) => {
    const url = `${BASE_URL}/discover/movie?include_adult
=true`;
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const json = await response.json();
      console.log("Fetched data:", json);
      const bookIds = json.results.map((result) => result.work_id);
      dispatch(setCurrentAvgRatingsReq(bookIds));
      return json;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw new Error("Failed to fetch data from the API");
    }
  }
);

const responseByNewApi = createSlice({
  name: "newApi",
  initialState: {
    status: null,
    books: null,
  },
  reducers: {
    setBooks(state, action) {
      state.books = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(searchByNewApiAsync.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(searchByNewApiAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        if (action.payload) {
          state.books = action.payload;
        }
      })
      .addCase(searchByNewApiAsync.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error.message;
      });
  },
});
export const getStatusOfApi = (state) => state.newApi.status;
export const getNewBooks = (state) => state.newApi.books;
export const { setBooks } = responseByNewApi.actions;
export default responseByNewApi.reducer;
