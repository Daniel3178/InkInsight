import { database, auth } from "../config/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import {
  setCurrentBookRatingReq,
  setUserRating,
  setCurrentBookRatingResponse,
  setResolvepromise,
  setCurrentBookReviewResponse,
  setCurrentBookReviewReq,
  setResolvePromiseReview,
  setCurrentAvgRatingsReq,
  setPromiseResolveAvgRatings,
  setCurrentAvgRatingsResponse,
  deleteUserRating,
} from "../store/ratingSlice";
import {
  deleteList,
  createNewList,
  RemoveBookFromList,
  addBookToList,
  setAllList,
  setStatus,
  renameList,
} from "../store/listsSlice";
import { useEffect } from "react";
import {
  signInCurrentUser,
  signOutCurrentUser,
} from "../store/userAccountSlice";
import { onValue, ref, set, get, remove } from "firebase/database";
import { listenerMiddleware } from "../store/store";

function FirebaseConnection() {
  const PATH = "inkInsight";
  const dispatch = useDispatch();

  function persistenceToModel(data) {
    if (data) {
      const dataToLists = Object.values(data.bookLists).map((eachList) => {
        if (eachList.listBooks) {
          return {
            name: eachList.name,
            listBooks: Object.values(eachList.listBooks),
          };
        } else {
          return { name: eachList.name, listBooks: [] };
        }
      });
      dispatch(setAllList(dataToLists));
    }
  }

  listenerMiddleware.startListening({
    actionCreator: setCurrentBookRatingReq,
    effect: async (action, listenApi) => {
      const bookId = action.payload;
      const state = listenApi.getState();
      const referenceToBookIdUser = ref(
        database,
        `${PATH}/ratings/${bookId}/${state.currentUserAccount.userId}`,
      );
      const referenceToBookRatingInfo = ref(
        database,
        `${PATH}/ratings/${bookId}/total`,
      );

      try {
        if (state.currentUserAccount.userId) {
          onValue(referenceToBookIdUser, (snapshot) => {
            const bookRatingUserfor = snapshot.val();
            listenApi.dispatch(setCurrentBookRatingResponse({}));

            onValue(referenceToBookRatingInfo, (snapshot) => {
              const bookRatingTotalInfo = snapshot.val();
              listenApi.dispatch(
                setCurrentBookRatingResponse({
                  rate: bookRatingTotalInfo ? bookRatingTotalInfo.rating : null,
                  totalNumberOfRates: bookRatingTotalInfo
                    ? bookRatingTotalInfo.numberOfReviews
                    : null,
                  userRate: bookRatingUserfor ? bookRatingUserfor.rate : null,
                }),
              );
            });
          });
        } else {
          onValue(referenceToBookRatingInfo, (snapshot) => {
            const bookRatingTotalInfo = snapshot.val();
            listenApi.dispatch(
              setCurrentBookRatingResponse({
                rate: bookRatingTotalInfo ? bookRatingTotalInfo.rating : null,
                totalNumberOfRates: bookRatingTotalInfo
                  ? bookRatingTotalInfo.numberOfReviews
                  : null,
              }),
            );
          });
        }
      } catch (error) {
        console.error("Error fetching book rating:", error);
      }
    },
  });

  listenerMiddleware.startListening({
    actionCreator: setCurrentBookReviewReq,
    effect: async (action, listenApi) => {
      dispatch(setResolvePromiseReview("loading"));
      const bookId = action.payload;
      const referenceToBookRatings = ref(
        database,
        `${PATH}/ratings/${bookId}/`,
      );

      try {
        const snapshot = await get(referenceToBookRatings);

        if (snapshot.exists()) {
          onValue(referenceToBookRatings, (snapshot) => {
            const reviewsArray = [];
            snapshot.forEach((userSnapshot) => {
              const userId = userSnapshot.key;
              if (userId !== "total") {
                const { name, review, rate, time } = userSnapshot.val();
                reviewsArray.push({
                  userId,
                  name,
                  review,
                  rate,
                  time,
                });
              }
            });
            listenApi.dispatch(
              setCurrentBookReviewResponse({
                reviews: reviewsArray,
              }),
            );
          });
        } else {
          // No ratings exist yet
          listenApi.dispatch(
            setCurrentBookReviewResponse({
              reviews: [],
            }),
          );
        }
      } catch (error) {
        console.error("Error fetching book reviews:", error);
        dispatch(setResolvepromise("ready"));
      }
    },
  });

  listenerMiddleware.startListening({
    actionCreator: setCurrentAvgRatingsReq,
    effect: async (action, listenApi) => {
      dispatch(setPromiseResolveAvgRatings("loading"));
      const bookIds = action.payload; // Expecting array of "OL..." IDs

      try {
        const promises = bookIds.map(async (bookId) => {
          const ratingRef = ref(database, `${PATH}/ratings/${bookId}/total`);
          const snapshot = await get(ratingRef);
          if (snapshot.exists()) {
            const val = snapshot.val();
            return {
              bookId: bookId,
              avgRate: val.rating,
              numberOfReviews: val.numberOfReviews,
            };
          }
          return null; // Return null if no rating exists
        });

        const results = await Promise.all(promises);
        const validResults = results.filter((item) => item !== null);

        dispatch(setCurrentAvgRatingsResponse(validResults));
      } catch (error) {
        console.error("Error fetching array avg ratings:", error);
        dispatch(setPromiseResolveAvgRatings("ready")); // Or "error"
      }
    },
  });

  listenerMiddleware.startListening({
    actionCreator: setUserRating,
    effect: async (action, listenApi) => {
      const { bookIdToRate, userRate, userReview, timeStamp } = action.payload;
      const state = listenApi.getState();
      const referenceToBookId = ref(
        database,
        `${PATH}/ratings/${bookIdToRate}/${state.currentUserAccount.userId}`,
      );
      const referenceToTotalRate = ref(
        database,
        `${PATH}/ratings/${bookIdToRate}/total`,
      );

      const isNotNewRating = (await get(referenceToBookId)).exists();

      if (isNotNewRating) {
        const userPrevRate = await get(referenceToBookId)
          .then((snapshot) => snapshot.val())
          .then((userRatingDetails) => userRatingDetails.rate);

        set(referenceToBookId, {
          name: state.currentUserAccount.username,
          rate: userRate,
          review: userReview,
          time: timeStamp,
        });

        await get(referenceToTotalRate)
          .then((snapshot) => snapshot.val())
          .then((ratingObj) => {
            if (ratingObj && ratingObj.numberOfReviews > 1) {
              // Mathematical adjustment for removing old rate and adding new one
              const currentTotalScore =
                ratingObj.rating * ratingObj.numberOfReviews;
              const newTotalScore = currentTotalScore - userPrevRate + userRate;
              const newAverage = newTotalScore / ratingObj.numberOfReviews;

              set(referenceToTotalRate, {
                numberOfReviews: ratingObj.numberOfReviews,
                rating: newAverage,
              });
            } else {
              set(referenceToTotalRate, {
                numberOfReviews: 1,
                rating: userRate,
              });
            }
          });
      } else {
        set(referenceToBookId, {
          name: state.currentUserAccount.username,
          rate: userRate,
          review: userReview,
          time: timeStamp,
        });

        await get(referenceToTotalRate)
          .then((snapshot) => snapshot.val())
          .then((ratingObj) => {
            if (ratingObj) {
              const currentNumberOfReviews = ratingObj.numberOfReviews + 1;
              const newRating =
                (ratingObj.numberOfReviews * ratingObj.rating + userRate) /
                currentNumberOfReviews;
              set(referenceToTotalRate, {
                numberOfReviews: currentNumberOfReviews,
                rating: newRating,
              });
            } else {
              set(referenceToTotalRate, {
                numberOfReviews: 1,
                rating: userRate,
              });
            }
          });
        listenApi.dispatch(setCurrentBookRatingReq(bookIdToRate));
        listenApi.dispatch(setCurrentBookReviewReq(bookIdToRate));
      }
    },
  });

  listenerMiddleware.startListening({
    actionCreator: deleteUserRating,
    effect: async (action, listenerApi) => {
      const state = listenerApi.getState();
      const bookId = action.payload;
      if (state.currentUserAccount.userId) {
        const referenceToBook = ref(
          database,
          `${PATH}/ratings/${bookId}/${state.currentUserAccount.userId}`,
        );
        const referenceToTotal = ref(
          database,
          `${PATH}/ratings/${bookId}/total`,
        );

        const snapshot = await get(referenceToBook);
        if (!snapshot.exists()) return; // Safety check

        const prevRating = snapshot.val().rate;

        await get(referenceToTotal)
          .then((snapshot) => snapshot.val())
          .then((ratingObj) => {
            if (ratingObj.numberOfReviews > 1) {
              const currentTotalScore =
                ratingObj.rating * ratingObj.numberOfReviews;
              const newTotalScore = currentTotalScore - prevRating;
              const newAverage =
                newTotalScore / (ratingObj.numberOfReviews - 1);

              set(referenceToTotal, {
                numberOfReviews: ratingObj.numberOfReviews - 1,
                rating: newAverage,
              });
            } else {
              set(referenceToTotal, null);
            }
          });
        remove(referenceToBook);
      }
      listenerApi.dispatch(setCurrentBookRatingReq(bookId));
      listenerApi.dispatch(setCurrentBookReviewReq(bookId));
    },
  });

  listenerMiddleware.startListening({
    actionCreator: addBookToList,
    effect: async (action, listenerApi) => {
      const state = listenerApi.getState();
      if (state.currentUserAccount.userId) {
        const { listName, book } = action.payload;
        const cleanBook = {
          bookId: book.bookId || "unknown",
          title: book.title || "Untitled",
          author: book.author || "Unknown",
          picture: book.picture || "",
          genre: book.genre || "General",
          summary: book.summary || "",
          pages: book.pages || 0,
          isbn: book.isbn || "", // Optional
        };

        const referenceToBook = ref(
          database,
          `${PATH}/users/${state.currentUserAccount.userId}/bookLists/${listName}/listBooks/${cleanBook.bookId}`,
        );
        set(referenceToBook, { book: cleanBook });
      }
    },
  });

  listenerMiddleware.startListening({
    actionCreator: RemoveBookFromList,
    effect: async (action, listenerApi) => {
      const state = listenerApi.getState();
      if (state.currentUserAccount.userId) {
        const { listName, book } = action.payload;
        const referenceToBook = ref(
          database,
          `${PATH}/users/${state.currentUserAccount.userId}/bookLists/${listName}/listBooks/${book.bookId}`,
        );
        set(referenceToBook, null);

        onValue(
          ref(database, `${PATH}/users/${state.currentUserAccount.userId}`),
          (snapshot) => {
            dispatch(setStatus("loading"));
            const dataBookLists = snapshot.val();
            if (dataBookLists) {
              persistenceToModel(dataBookLists);
            }
          },
          { onlyOnce: true },
        );
      }
    },
  });

  listenerMiddleware.startListening({
    actionCreator: createNewList,
    effect: async (action, listenerApi) => {
      const state = listenerApi.getState();
      if (state.currentUserAccount.userId) {
        const referenceToList = ref(
          database,
          `${PATH}/users/${state.currentUserAccount.userId}/bookLists/${action.payload}`,
        );
        set(referenceToList, { name: action.payload, listBooks: [] });

        onValue(
          ref(database, `${PATH}/users/${state.currentUserAccount.userId}`),
          (snapshot) => {
            dispatch(setStatus("loading"));
            const dataBookLists = snapshot.val();
            if (dataBookLists) {
              persistenceToModel(dataBookLists);
            }
          },
          { onlyOnce: true },
        );
      }
    },
  });

  listenerMiddleware.startListening({
    actionCreator: deleteList,
    effect: async (action, listenerApi) => {
      const state = listenerApi.getState();
      if (state.currentUserAccount.userId) {
        const referenceToList = ref(
          database,
          `${PATH}/users/${state.currentUserAccount.userId}/bookLists/${action.payload}`,
        );
        set(referenceToList, null);

        onValue(
          ref(database, `${PATH}/users/${state.currentUserAccount.userId}`),
          (snapshot) => {
            dispatch(setStatus("loading"));
            const dataBookLists = snapshot.val();
            if (dataBookLists) {
              persistenceToModel(dataBookLists);
            } else {
              dispatch(setAllList([]));
            }
          },
          { onlyOnce: true },
        );
      }
    },
  });

  listenerMiddleware.startListening({
    actionCreator: renameList,
    effect: async (action, listenerApi) => {
      const state = listenerApi.getState();
      if (state.currentUserAccount.userId) {
        const referenceToPrevPath = ref(
          database,
          `${PATH}/users/${state.currentUserAccount.userId}/bookLists/${action.payload.prevName}`,
        );

        const referenceToNewPath = ref(
          database,
          `${PATH}/users/${state.currentUserAccount.userId}/bookLists/${action.payload.newName}`,
        );

        const snapshot = await get(referenceToPrevPath);
        if (snapshot.exists()) {
          const prevData = snapshot.val();

          set(referenceToNewPath, {
            name: action.payload.newName,
            listBooks: prevData.listBooks || null,
          });

          set(referenceToPrevPath, null);
        }

        onValue(
          ref(database, `${PATH}/users/${state.currentUserAccount.userId}`),
          (snapshot) => {
            dispatch(setStatus("loading"));
            const dataBookLists = snapshot.val();
            if (dataBookLists) {
              persistenceToModel(dataBookLists);
            } else {
              dispatch(setAllList([]));
            }
          },
          { onlyOnce: true },
        );
      }
    },
  });

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const userId = user.uid;
        dispatch(
          signInCurrentUser({
            username: user.displayName,
            email: user.email,
            userId: user.uid,
          }),
        );
        onValue(
          ref(database, `${PATH}/users/${userId}`),
          (snapshot) => {
            dispatch(setStatus("loading"));
            const dataBookLists = snapshot.val();
            if (dataBookLists) {
              persistenceToModel(dataBookLists);
            } else {
              dispatch(setStatus("ready"));
            }
          },
          { onlyOnce: true },
        );
      } else {
        dispatch(signOutCurrentUser());
      }
    });
  }, []);

  // Inactivity Timer
  useEffect(() => {
    const signOutOnInactivity = async () => {
      let inactivityTimeout;

      const resetInactivityTimer = () => {
        clearTimeout(inactivityTimeout);
        inactivityTimeout = setTimeout(() => {
          dispatch(signOutCurrentUser());
          alert("You have been signed out due to inactivity.");
        }, 300000); // 5 minutes
      };

      document.addEventListener("mousemove", resetInactivityTimer);
      document.addEventListener("keydown", resetInactivityTimer);
      document.addEventListener("scroll", resetInactivityTimer);

      // Start initial timer
      resetInactivityTimer();

      return () => {
        document.removeEventListener("mousemove", resetInactivityTimer);
        document.removeEventListener("keydown", resetInactivityTimer);
        document.removeEventListener("scroll", resetInactivityTimer);
        clearTimeout(inactivityTimeout);
      };
    };

    signOutOnInactivity();
  }, []);

  return null;
}

export default FirebaseConnection;
