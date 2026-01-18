import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BookDetailsView from "../view/book_details/bookDetailsView";
import { useNavigate, useLocation } from "react-router-dom";
import PopupView from "../view/list_page/PopupView";
import { whichPath, verifyRatingCriteria } from "../utilities/utilities.js";
import { getCurrentDateTime } from "../utilities/utilities";
import {
  fetchBookDetailsAsync,
  getBookDetailsStatus,
} from "../store/bookDetailsSlice";

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

  // Selectors
  const bookDetialsCurrentBook = useSelector(
    (state) => state.currBookDetails.currentBookDetails,
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
  const bookDetailsStatus = useSelector(getBookDetailsStatus);

  // Local State
  const [listToCreateName, SetListToCreateName] = useState("");
  const [userReview, setUserReview] = useState("");
  const [currentUserRate, setCurrentUserRate] = useState(0);
  const [isCreateListOpen, setCreateListOpen] = useState(false);
  const [bookToAdd, setBookToAdd] = useState({});

  // Determine which book to show based on navigation source
  const currentBook = whichPath({
    location: location,
    bookDetialsCurrentBook: bookDetialsCurrentBook,
    listCurrentBook: listCurrentBook,
  });

  // Redirect if no book is found in state
  useEffect(() => {
    if (!currentBook?.bookId) {
      navigate("/");
    }
  }, [currentBook, navigate]);

  useEffect(() => {
    if (currentBook?.bookId) {
      dispatch(setCurrentBookRatingReq(currentBook.bookId));
      dispatch(setCurrentBookReviewReq(currentBook.bookId));
      dispatch(fetchBookDetailsAsync(currentBook.bookId));
    }
  }, [currentBook?.bookId, dispatch]);

  // Fetch ratings/reviews when bookId changes
  useEffect(() => {
    if (currentBook?.bookId) {
      dispatch(setCurrentBookRatingReq(currentBook.bookId));
      dispatch(setCurrentBookReviewReq(currentBook.bookId));
    }
  }, [currentBook?.bookId, dispatch]);

  const openCreateListModal = () => {
    setCreateListOpen(true);
  };

  const handleCloseClickACB = () => {
    setCreateListOpen(false);
  };

  const handleAddBookClickACB = (bookToAddObject) => {
    dispatch(addBookToList(bookToAddObject));
  };

  const handleCreateNewListACB = (listName) => {
    dispatch(createNewList(listName));
  };

  const handleUserRating = (ratingData) => {
    const verify = verifyRatingCriteria({
      isLoggedIn: isLoggedIn,
      rating: ratingData.rating,
      review: ratingData.review,
    });

    const formattedDateTime = getCurrentDateTime();

    if (verify && currentBook.bookId) {
      dispatch(
        setUserRating({
          bookIdToRate: currentBook.bookId,
          userRate: ratingData.rating,
          userReview: ratingData.review,
          timeStamp: formattedDateTime,
        }),
      );
      // Optional: Clear local input after submission
      setUserReview("");
      alert("Your rating and review have been submitted!");
    } else if (!isLoggedIn) {
      alert("Please log in to leave a review.");
    }
  };

  const handleDeletUserRating = () => {
    if (currentBook.bookId) {
      dispatch(deleteUserRating(currentBook.bookId));
      setUserReview(""); // Clear local state
      setCurrentUserRate(0);
    }
  };

  const handleGoToHomePage = () => {
    navigate("/", { state: "/bookDetails" });
  };

  return (
    <div>
      {currentBook?.bookId && (
        <BookDetailsView
          bookDetailsStatus={bookDetailsStatus}
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
      )}

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
