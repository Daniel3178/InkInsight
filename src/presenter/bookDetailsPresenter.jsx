import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BookDetailsView from "../view/book_details/bookDetailsView";
import { useNavigate, useLocation } from "react-router-dom";
import PopupView from "../view/list_page/PopupView";
import { whichPath, verifyRatingCriteria } from "../utilities/utilities.js";
import { getCurrentDateTime } from "../utilities/utilities"

import {
  getUsername,
  getUserId,
  getIsLoggedIn,
} from "../store/userAccountSlice";

import {
  getCurrentBookRatingResponse,
  setCurrentBookRatingReq,
  getCurrentBookReviewResponse,
  setUserRating,
  getPromiseResolveReview,
  setCurrentBookReviewReq,
  getPromiseResolve,
  deleteUserRating,
  setResolvePromiseReview
} from "../store/ratingSlice";

import {
  getLists,
  addBookToList,
  getCurrentBook,
  createNewList,
} from "../store/listsSlice";



const BookDetailsPresenter = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const bookDetialsCurrentBook = useSelector(
    (state) => state.currBookDetails.currentBookDetails
  );
  const listCurrentBook = useSelector(getCurrentBook);
  const allListsInStore = useSelector(getLists);
  const promiseResolveStatus = useSelector(getPromiseResolve);
  const promiseResolveReviewStatus = useSelector(getPromiseResolveReview);
  const username = useSelector(getUsername);
  const userId = useSelector(getUserId);
  const ratingResponse = useSelector(getCurrentBookRatingResponse);
  const reviewResponse = useSelector(getCurrentBookReviewResponse);
  const isLoggedIn = useSelector(getIsLoggedIn);

  const [listToCreateName, SetListToCreateName] = useState("");
  const [userReview, setUserReview] = useState("");
  const [currentUserRate, setCurrentUserRate] = useState("");
  const [isCreateListOpen, setCreateListOpen] = useState(false);
  const [bookToAdd, setBookToAdd] = useState({});

  const currentBook = whichPath({
    location: location,
    bookDetialsCurrentBook: bookDetialsCurrentBook,
    listCurrentBook: listCurrentBook,
  });

  function handleAddBookClickACB(bookToAddObject) {
    dispatch(addBookToList(bookToAddObject));
  }

  useEffect(() => {
    if (currentBook?.bookId) {
      dispatch(setCurrentBookRatingReq(currentBook.bookId));
      dispatch(setCurrentBookReviewReq(currentBook.bookId));
    }
  }, [currentBook?.bookId]);

  if (!currentBook?.bookId) {
    navigate('/');
  }

  const openCreateListModal = () => {
    setCreateListOpen(true);
  };

  const handleCloseClickACB = () => {
    setCreateListOpen(false);
  };

  const handleUserRating = (rating) => {
    const verify = verifyRatingCriteria({
      isLoggedIn: isLoggedIn,
      rating: rating.rating,
      review: rating.review,
    });
    const formattedDateTime = getCurrentDateTime();
    if (verify && currentBook.bookId && rating !== null && rating !== 0) {
      dispatch(
        setUserRating({
          bookIdToRate: currentBook.bookId,
          userRate: rating.rating,
          userReview: rating.review,
          timeStamp: formattedDateTime,
        })
      );
      alert("Your rating and review have been submitted!");
    }
    //dispatch(setResolvePromiseReview("loading"));
  };

  function handleCreateNewListACB(listName) {
    dispatch(createNewList(listName));
  }

  const handleDeletUserRating = () => {
    if (currentBook.bookId) {
      dispatch(deleteUserRating(currentBook.bookId));
    }
  };

  const handleGoToHomePage = () => {
    navigate("/", { state: "/bookDetails" });
  }

  return (
    <div>
      {currentBook?.bookId ? (
        <BookDetailsView
          currentBook={currentBook}
          isLoggedIn={isLoggedIn}
          currentRating={ratingResponse}
          currentReviews={reviewResponse}
          setUserRating={handleUserRating}
          openCreateListModal={openCreateListModal}
          setBookToAdd={setBookToAdd}
          userId={userId}
          promiseResolveStatus={promiseResolveStatus}
          userReview={userReview}
          setUserReview={setUserReview}
          currentUserRate={currentUserRate}
          setCurrentUserRate={setCurrentUserRate}
          promiseResolveReviewStatus={promiseResolveReviewStatus}
          username={username}
          handleDeletUserRating={handleDeletUserRating}
          goToHomePage={handleGoToHomePage}
        />
      ) : null}

      {isCreateListOpen && (
        <PopupView
          closePopUp={handleCloseClickACB}
          createNewList={handleCreateNewListACB}
          addBookToList={handleAddBookClickACB}
          ListName={listToCreateName}
          SetListToCreateName={SetListToCreateName}
          allLists={allListsInStore}
          bookToAdd={bookToAdd}
        />
      )}
    </div>
  );
};

export { BookDetailsPresenter };
