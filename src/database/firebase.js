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
        `${PATH}/ratings/${bookId}/${state.currentUserAccount.userId}`
      );
      const referenceToBookRatingInfo = ref(
        database,
        `${PATH}/ratings/${bookId}/total`
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
                })
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
              })
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
        `${PATH}/ratings/${bookId}/`
      );

      try {
        const some = await get(referenceToBookRatings);

        if (some) {
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
                  time
                });
              }
            });
            listenApi.dispatch(
              setCurrentBookReviewResponse({
                reviews: reviewsArray,
              })
            );
          });
        } else {
          onValue(referenceToBookRatings, (snapshot) => {
            listenApi.dispatch(
              setCurrentBookReviewResponse({
                reviews: [],
              })
            );
          });
        }
      } catch (error) {
        console.error("Error fetching book rating:", error);
        dispatch(setResolvepromise("ready"));
      }
    },
  });

  listenerMiddleware.startListening({
    actionCreator: setCurrentAvgRatingsReq,
    effect: async (action, listenApi) => {
      dispatch(setPromiseResolveAvgRatings("loading"));
      const bookIds = action.payload;
      const referenceToAllRatings = ref(database, `${PATH}/ratings/`);
      try {
        const ratingsSnapshot = await get(referenceToAllRatings);

        if (ratingsSnapshot.exists()) {
          const resultArray = [];
          const ratingsArray = [];
          ratingsSnapshot.forEach((ratingSnapshot) => {
            for (let i = 0; i < bookIds.length; i++) {
              if (bookIds[i] == ratingSnapshot.key) {
                ratingsArray.push(bookIds[i]);
              }
            }
          });

          for (let i = 0; i < ratingsArray.length; i++) {
            const avgRatingPath = `${PATH}/ratings/${ratingsArray[i]}/total`;
            const avgRatingRef = ref(database, avgRatingPath);
            const avgRateSnapshot = await get(avgRatingRef);
            const avgRate = avgRateSnapshot.val();
            resultArray.push({
              avgRate: avgRate.rating,
              numberOfReviews: avgRate.numberOfReviews,
              bookId: ratingsArray[i],
            });
          }
          dispatch(setCurrentAvgRatingsResponse(resultArray));
        }
      } catch (error) {
        console.error("Error fetching array avg ratings:", error);
        dispatch(setResolvepromise("ready"));
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
        `${PATH}/ratings/${bookIdToRate}/${state.currentUserAccount.userId}`
      );
      const referenceToTotalRate = ref(
        database,
        `${PATH}/ratings/${bookIdToRate}/total`
      );
      const isNotNewRating = (await get(referenceToBookId)).exists();

      if (isNotNewRating) {
        const userPrevRate = await get(referenceToBookId)
          .then((snapshot) => {
            return snapshot.val();
          })
          .then((userRatingDetails) => {
            return userRatingDetails.rate;
          });
        set(referenceToBookId, {
          name: state.currentUserAccount.username,
          rate: userRate,
          review: userReview,
          time: timeStamp,
        });

        await get(referenceToTotalRate)
          .then((snapshot) => {
            return snapshot.val();
          })
          .then((ratingObj) => {
            if (ratingObj.numberOfReviews > 1) {
              const x =
                ratingObj.rating -
                (userPrevRate - ratingObj.rating) /
                (ratingObj.numberOfReviews - 1);
              const y =
                (x * (ratingObj.numberOfReviews - 1) + userRate) /
                ratingObj.numberOfReviews;
              set(referenceToTotalRate, {
                numberOfReviews: ratingObj.numberOfReviews,
                rating: y,
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
          .then((snapshot) => {
            return snapshot.val();
          })
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
          `${PATH}/ratings/${bookId}/${state.currentUserAccount.userId}`
        );
        const referenceToTotal = ref(
          database,
          `${PATH}/ratings/${bookId}/total`
        );
        const prevRating = await get(referenceToBook).then(
          (snapshot) => snapshot.val().rate
        );
        await get(referenceToTotal)
          .then((snapshot) => {
            return snapshot.val();
          })
          .then((ratingObj) => {
            if (ratingObj.numberOfReviews > 1) {
              const x =
                (prevRating - ratingObj.rating) /
                (ratingObj.numberOfReviews - 1);
              const y = ratingObj.rating - x;
              set(referenceToTotal, {
                numberOfReviews: ratingObj.numberOfReviews - 1,
                rating: y,
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
        const referenceToBook = ref(
          database,
          `${PATH}/users/${state.currentUserAccount.userId}/bookLists/${listName}/listBooks/${book.bookId}`
        );
        set(referenceToBook, { book: book });
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
          `${PATH}/users/${state.currentUserAccount.userId}/bookLists/${listName}/listBooks/${book.bookId}`
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
          {
            onlyOnce: true,
          }
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
          `${PATH}/users/${state.currentUserAccount.userId}/bookLists/${action.payload}`
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
          {
            onlyOnce: true,
          }
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
          `${PATH}/users/${state.currentUserAccount.userId}/bookLists/${action.payload}`
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
          {
            onlyOnce: true,
          }
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
          `${PATH}/users/${state.currentUserAccount.userId}/bookLists/${action.payload.prevName}`
        );

        const referenceToNewPath = ref(
          database,
          `${PATH}/users/${state.currentUserAccount.userId}/bookLists/${action.payload.newName}`
        );
        const isPathValid = (await get(referenceToPrevPath)).exists();
        if (isPathValid) {
          await get(referenceToPrevPath)
            .then((snapshot) => snapshot.val())
            .then((prevData) => {
              if (prevData.listBooks) {
                set(referenceToNewPath, {
                  name: action.payload.newName,
                  listBooks: prevData.listBooks,
                });
              } else {
                set(referenceToNewPath, {
                  name: action.payload.newName,
                  listBooks: null,
                });
              }
              set(referenceToPrevPath, null);
            });
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
            {
              onlyOnce: true,
            }
          );
        }
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
          })
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
          {
            onlyOnce: true,
          }
        );
      } else {
        dispatch(signOutCurrentUser());
      }
    });
  }, []);

  useEffect(() => {
    const signOutOnInactivity = async () => {
      const inactivityTimeout = setTimeout(async () => {
        dispatch(signOutCurrentUser());
        alert(
          "You have been signed out due to an inactivity timeout or you left the page"
        );
      }, 300000); 

      const resetInactivityTimer = () => {
        clearTimeout(inactivityTimeout);
        inactivityTimer();
      };

      const inactivityTimer = () => {
        document.addEventListener("mousemove", resetInactivityTimer);
        document.addEventListener("keydown", resetInactivityTimer);
        document.addEventListener("scroll", resetInactivityTimer);
      };

      inactivityTimer();

      return () => {
        document.removeEventListener("mousemove", resetInactivityTimer);
        document.removeEventListener("keydown", resetInactivityTimer);
        document.removeEventListener("scroll", resetInactivityTimer);
      };
    };

    signOutOnInactivity();
  }, []);
}

export default FirebaseConnection;
