import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getWorkDetailsUrl,
  getAuthorDetailsUrl,
  getCoverUrl,
} from "../config/apiConfig";

export const fetchBookDetailsAsync = createAsyncThunk(
  "bookDetails/fetchBookDetails",
  async (bookId) => {
    const workUrl = getWorkDetailsUrl(bookId);
    const workResponse = await fetch(workUrl);
    const workJson = await workResponse.json();

    let authorJson = null;
    if (workJson.authors && workJson.authors.length > 0) {
      const authorKey = workJson.authors[0].author.key.replace("/authors/", "");
      const authorUrl = getAuthorDetailsUrl(authorKey);
      const authorResponse = await fetch(authorUrl);
      authorJson = await authorResponse.json();
    }

    const getDescription = (data) => {
      if (!data) return "No description available.";
      if (typeof data === "string") return data;
      return data.value || "No description available.";
    };

    return {
      title: workJson.title,
      description: getDescription(workJson.description),
      first_publish_date: workJson.first_publish_date,
      subjects: workJson.subjects
        ? workJson.subjects.slice(0, 5).join(", ")
        : "General",
      covers: workJson.covers || [],
      authorName: authorJson ? authorJson.name : "Unknown Author",
      authorBio: authorJson ? getDescription(authorJson.bio) : "",
      authorBirthDate: authorJson ? authorJson.birth_date : "",
    };
  },
);

const initialState = {
  currentBookDetails: {
    bookId: null,
    title: "",
    author: "",
    summary: "",
    authorBio: "", // New field
    subjects: "",
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
};

const bookDetailsSlice = createSlice({
  name: "bookDetails",
  initialState,
  reducers: {
    selectBookById(state, action) {
      const { bookId } = action.payload;
      state.currentBookDetails.bookId = bookId;
      state.currentBookDetails.status = "loading";
    },
    setSelectedBook(state, action) {
      state.currentBookDetails = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBookDetailsAsync.pending, (state) => {
        state.currentBookDetails.status = "loading";
      })
      .addCase(fetchBookDetailsAsync.fulfilled, (state, action) => {
        state.currentBookDetails.status = "succeeded";
        state.currentBookDetails.title = action.payload.title;
        state.currentBookDetails.summary = action.payload.description;
        state.currentBookDetails.author = action.payload.authorName;
        state.currentBookDetails.authorBio = action.payload.authorBio;
        state.currentBookDetails.genre = action.payload.subjects;

        if (action.payload.covers.length > 0) {
          state.currentBookDetails.picture = getCoverUrl(
            action.payload.covers[0],
            "L",
          );
        }
      })
      .addCase(fetchBookDetailsAsync.rejected, (state, action) => {
        state.currentBookDetails.status = "failed";
        state.currentBookDetails.error = action.error.message;
      });
  },
});

export const { selectBookById, setSelectedBook } = bookDetailsSlice.actions;
export const getBookDetailsStatus = (state) =>
  state.currBookDetails.currentBookDetails.status;
export default bookDetailsSlice.reducer;
