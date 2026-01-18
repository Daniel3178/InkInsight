import { BASE_URL, HEADER } from "../config/apiConfig";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setCurrentAvgRatingsReq } from "./ratingSlice";

export const searchByNewApiAsync = createAsyncThunk(
  "newApi/searchByNewApi",
  async ({ query, type = "general", page = 1 }, { dispatch }) => {
    let queryParam = "";
    const sanitizedQuery = encodeURIComponent(query);

    switch (type) {
      case "title":
        queryParam = `title=${sanitizedQuery}`;
        break;
      case "author":
        queryParam = `author=${sanitizedQuery}`;
        break;
      case "general":
      default:
        queryParam = `q=${sanitizedQuery}`;
        break;
    }

    const fields =
      "key,title,author_name,cover_i,first_publish_year,edition_count";
    const url = `${BASE_URL}search.json?${queryParam}&page=${page}&fields=${fields}`;

    try {
      const response = await fetch(url, HEADER);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const json = await response.json();
      const bookResults = json.docs;
      const bookIds = bookResults.map((result) =>
        result.key.replace("/works/", ""),
      );

      dispatch(setCurrentAvgRatingsReq(bookIds));

      return bookResults;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw new Error("Failed to fetch data from the API");
    }
  },
);

const responseByNewApi = createSlice({
  name: "newApi",
  initialState: {
    status: null,
    books: null,
    error: null,
  },
  reducers: {
    setBooks(state, action) {
      state.books = action.payload;
    },
    clearBooks(state) {
      state.books = null;
      state.status = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(searchByNewApiAsync.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(searchByNewApiAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.books = action.payload;
      })
      .addCase(searchByNewApiAsync.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error.message;
      });
  },
});

export const getStatusOfApi = (state) => state.newApi.status;
export const getNewBooks = (state) => state.newApi.books;
export const { setBooks, clearBooks } = responseByNewApi.actions;
export default responseByNewApi.reducer;
