import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentBookDetails: {
    bookId: null,
    title: "",
    author: "",
    genre: "",
    picture: "",
    summary: "",
    pages: 0,
    categories: "",
    isbn: "",
  },
};

const bookDetailsSlice = createSlice({
  name: "bookDetails",
  initialState: initialState,
  reducers: {
    selectBookById(state, action) {
      const { bookId, books } = action.payload;
      let selectedBook = null;
      if (books && bookId && books.results && books.results.length) {
        selectedBook = books.results.find((book) => book.work_id === bookId);
      }

      if (selectedBook) {
        state.currentBookDetails.bookId = bookId;
        state.currentBookDetails.title = selectedBook.title;
        state.currentBookDetails.author = selectedBook.authors;
        state.currentBookDetails.picture =
          selectedBook.published_works[0]?.cover_art_url || "";
        state.currentBookDetails.summary =
          selectedBook.summary || "No summary available";
        state.currentBookDetails.pages = selectedBook.page_count || 0;
        state.currentBookDetails.genre = selectedBook.book_type || "";
        state.currentBookDetails.categories = selectedBook.categories || "";
        state.currentBookDetails.isbn =
          selectedBook.canonical_isbn || "not available";
      }
    },

    setSelectedBook(state, action){
      state.currentBookDetails = action.payload;
    }
  },
});

export const { selectBookById,setSelectedBook } = bookDetailsSlice.actions;
export const getCurrBookID = (state) => state.currBookDetails.bookId;
export default bookDetailsSlice.reducer;
