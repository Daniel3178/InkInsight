import { useDispatch } from "react-redux";
import { listenerMiddleware } from "../store/store.js";
import { useEffect } from "react";
import { setSearchValue1 } from "../store/searchSlice.js";
import { setSelectedBook, selectBookById } from "../store/bookDetailsSlice.js";
import { searchByNewApiAsync, setBooks } from "../store/newApiSlice.js";
import { setCurrentAvgRatingsResponse } from "../store/ratingSlice.js";
import {
  getLocalBookSelection,
  getLocalSearchParam,
  getLocalBookSelectionBookDetails,
  getLocalApiResults,
  getLocalRatingArray,
  getLocalListSelection,
} from "./localStorageGetters.js";
import {
  setCurrentBook,
  setCurrentList,
  setCurrentListPersistency,
} from "../store/listsSlice.js";

function LocalStorageConnection() {
  listenerMiddleware.startListening({
    actionCreator: setCurrentBook,
    effect: async (action, listenerApi) => {
      localStorage.setItem("bookDetails1", JSON.stringify(action.payload));
    },
  });

  listenerMiddleware.startListening({
    actionCreator: setSearchValue1,
    effect: async (action, listenerApi) => {
      localStorage.setItem("searchValue", action.payload);
    },
  });

  listenerMiddleware.startListening({
    actionCreator: selectBookById,
    effect: async (action, listenerApi) => {
      const { bookId, books } = action.payload;
      let selectedBook = null;
      if (books && bookId && books.results && books.results.length) {
        selectedBook = books.results.find((book) => book.work_id === bookId);
      }
      if (selectedBook) {
        const bookToStore = {
          bookId: bookId,
          title: selectedBook.title,
          author: selectedBook.authors,
          picture: selectedBook.published_works[0]?.cover_art_url || "",
          summary: selectedBook.summary || "No summary available",
          pages: selectedBook.page_count || 0,
          genre: selectedBook.book_type || "",
          categories: selectedBook.categories || "",
          isbn: selectedBook.canonical_isbn || "not available",
        };
        localStorage.setItem("bookDetails", JSON.stringify(bookToStore));
      }
    },
  });

  listenerMiddleware.startListening({
    actionCreator: setCurrentAvgRatingsResponse,

    effect: async (action, listenerApi) => {
      localStorage.setItem("newApiRatingArray", JSON.stringify(action.payload));
    },
  });

  listenerMiddleware.startListening({
    actionCreator: searchByNewApiAsync.fulfilled,
    effect: async (action, listenerApi) => {
      localStorage.setItem("newApiBooks", JSON.stringify(action.payload));
    },
  });

  listenerMiddleware.startListening({
    actionCreator: setCurrentList,
    effect: async (action, listenerApi) => {
      const state = listenerApi.getState();
      let index = state.bookLists.allLists.findIndex(
        (object) => object.name === action.payload
      );
      if (index !== -1) {
        localStorage.setItem(
          "currentList",
          JSON.stringify(state.bookLists.allLists[index])
        );
      }
    },
  });

  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      const searchParam = getLocalSearchParam();
      const selectedBookDetails = getLocalBookSelectionBookDetails();
      const storedBooks = getLocalApiResults();
      const arrayOfRatings = getLocalRatingArray();
      const selectedBookListSlice = getLocalBookSelection();
      const selectedList = getLocalListSelection();
      dispatch(setCurrentListPersistency(selectedList));
      dispatch(setCurrentBook(selectedBookListSlice));
      dispatch(setCurrentAvgRatingsResponse(arrayOfRatings));
      dispatch(setBooks(storedBooks));
      dispatch(setSelectedBook(selectedBookDetails));
      dispatch(setSearchValue1(searchParam));
    };
    fetchData();
  }, []);
}
export default LocalStorageConnection;
