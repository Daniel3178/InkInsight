import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import HomePageView from "../view/home_page/homePageView";
import { getValue, setSearchValue1 } from "../store/searchSlice";
import { selectBookById } from "../store/bookDetailsSlice";
import PopupView from "../view/list_page/PopupView";
import { useNavigate } from "react-router-dom";


import {
  searchByNewApiAsync,
  getNewBooks,
  getStatusOfApi,
} from "../store/newApiSlice";

import {
  getPromiseResolveAvgRating,
  getCurrentAvgRatingsResponse,
} from "../store/ratingSlice";

import {
  getLists,
  addBookToList,
  getListStatus,
  createNewList,
} from "../store/listsSlice";

const HomePagePresenter = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const books = useSelector(getNewBooks);
  const searchInput = useSelector(getValue);
  const avgArrayStatus = useSelector(getPromiseResolveAvgRating);
  const avgRatingsResponse = useSelector(getCurrentAvgRatingsResponse);
  const apiStatus = useSelector(getStatusOfApi);
  const listStatus = useSelector(getListStatus);
  const allListsInStore = useSelector(getLists);
  const [bookToAdd, setBookToAdd] = useState({});

  const [listToCreateName, SetListToCreateName] = useState("");
  const [isCreateListOpen, setIsCreateListOpen] = useState(false);

  const setSearchInput = (name) => {
    dispatch(setSearchValue1(name));
  }

  const clearBuffer = () => {
    SetListToCreateName("");
  }
  const openCreateListModal = () => {
    setIsCreateListOpen(true);
  };

  const handleClosePopupClickACB = () => {
    setIsCreateListOpen(false);
  };

  const handleBookClickACB = (detailID) => {
    dispatch(selectBookById({ bookId: detailID, books: books }));
  };

  const handleSearchClickACB = (searchParam) => {
    dispatch(searchByNewApiAsync(searchParam));
  };

  const handleCreateNewListACB = (listName) => {
    dispatch(createNewList(listName));
    clearBuffer();
  }

  const handleAddBookClickACB = (bookToAddObject) => {
    dispatch(addBookToList(bookToAddObject));
  }

  const handleGoToBookDetailsPage = () => {
    navigate("/bookDetails", { state: "/" });
  }

  return (
    <div>

      <HomePageView
        search={handleSearchClickACB}
        getBookDetails={handleBookClickACB}
        openPopup={openCreateListModal}
        goToBookDetailsPage={handleGoToBookDetailsPage}
        books={books?.results}
        setBookToAdd={setBookToAdd}
        apiStatus={apiStatus}
        booksPromiseStatus={avgArrayStatus}
        booksAvgArray={avgRatingsResponse}
        setSearchInput={setSearchInput}
        searchInput={searchInput}
      />
      {isCreateListOpen && (
        <PopupView
          closePopUp={handleClosePopupClickACB}
          createNewList={handleCreateNewListACB}
          addBookToList={handleAddBookClickACB}
          ListName={listToCreateName}
          SetListToCreateName={SetListToCreateName}
          allLists={allListsInStore}
          listStatus={listStatus}
          bookToAdd={bookToAdd}
          valueOfInput={listToCreateName}
        />
      )}
    </div>
  );
}

export { HomePagePresenter };
