import { createSlice } from "@reduxjs/toolkit";
import { signInCurrentUser, signOutCurrentUser } from "./userAccountSlice";
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
const listSlice = createSlice({
  name: "Lists",
  initialState: {
    allLists: [],
    currentList: {},
    isActivated: false,
    status: "loading",
    currentBook: initialState,
    bookToAddID: null,
    ListToCreateName: null,
  },

  reducers: {
    addBookToList(state, action) {
      if (!state.isActivated) {
        alert("please sign in, to add a book to your personalized lists!");
        return;
      }

      let index = state?.allLists?.findIndex(
        (object) => object?.name === action.payload?.listName
      );

      if (action.payload.listName && index !== -1 && action.payload.book) {
        state.allLists[index].listBooks = state.allLists[index].listBooks || [];

        const isBookExist = state.allLists[index].listBooks.some(
          (bookObj) => bookObj.book.bookId === action.payload.book.bookId
        );

        if (!isBookExist) {
          const newBook = { book: action.payload.book };
          state.allLists[index].listBooks.push(newBook);
        } else {
          alert("Book already exists in this list!.");
        }
      }
    },

    RemoveBookFromList(state, action) {
      if (!state.isActivated) {
        alert("please sign in to remove a book from a list");
        return;
      }
      let index = state.allLists.findIndex(
        (object) => object.name === action.payload.listName
      );
      const indexOfCurrentList = state.currentList.listBooks.findIndex(
        (book) => book.book.bookId === action.payload.book.bookId
      );

      if (indexOfCurrentList !== -1) {
        state.currentList.listBooks.splice(indexOfCurrentList, 1);
      }

      function shouldWeKeepBookCB(BookObject) {
        return BookObject.bookId !== action.payload.book.bookId;
      }

      state.allLists[index].listBooks =
        state.allLists[index].listBooks.filter(shouldWeKeepBookCB);
    },

    createNewList(state, action) {
      if (!state.isActivated) {
        alert("please sign in to create a customizable list!");
        return;
      }

      const newListName = action.payload;
      const isDuplicate = state.allLists.some(
        (list) => list.name === newListName
      );

      if (isDuplicate) {
        alert(`List with name '${newListName}' already exists.`);
        return;
      }

      const newList = {
        name: newListName,
        listBooks: [],
      };

      state.allLists = [...state.allLists, newList];
    },
    deleteList(state, action) {
      if (!state.isActivated) {
        alert("please sign in to delete a list!");
        return;
      }
      function shouldWeKeepListCB(list) {
        return list.listName !== action.payload;
      }
      state.allLists = state.allLists.filter(shouldWeKeepListCB);
    },

    renameList(state, action) {
      if (!state.isActivated) {
        alert("please sign in to remove a book from a list!");
        return;
      }
      let index = state.allLists.findIndex(
        (object) => object.listName === action.payload.prevName
      );
      if (index !== -1) {
        state.allLists[index].name = action.payload.newName;
      }
    },

    setAllList(state, action) {
      state.allLists = action.payload;
      state.status = "ready";
    },

    setCurrentList(state, action) {
      let index = state.allLists.findIndex(
        (object) => object.name === action.payload
      );
      if (index !== -1) {
        state.currentList = state.allLists[index];
      }
    },
    setCurrentListPersistency(state, action){
      state.currentList = action.payload;
    },

    setBookToAdd(state, action) {
      state.bookToAddID = action.payload;
    },

    setListToCreateName(state, action) {
      state.ListToCreateName = action.payload;
    },

    setCurrentBook(state, action) {
      state.currentBook = action.payload;
    },

    setStatus(state, action) {
      state.status = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signInCurrentUser, (state, action) => {
        state.isActivated = true;
      })
      .addCase(signOutCurrentUser, (state, action) => {
        state.isActivated = false;
        state.allLists = [];
      });
  },
});

export const getLists = (state) => state.bookLists.allLists;
export const getCurrentList = (state) => state.bookLists.currentList;
export const getListStatus = (state) => state.bookLists.status;
export const getBookToAddID = (state) => state.bookLists.bookToAddID;
export const getListToCreateName = (state) => state.bookLists.listToCreateName;
export const getCurrentBook = (state) => state.bookLists.currentBook;

export const {
  setCurrentListPersistency,
  setAllList,
  setBookToAdd,
  setCurrentList,
  setListToCreateName,
  deleteList,
  createNewList,
  RemoveBookFromList,
  addBookToList,
  renameList,
  setCurrentBook,
  setStatus,
} = listSlice.actions;
export default listSlice.reducer;
