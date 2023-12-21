// BookDetailsView.js
import React from 'react';
import './bookDetailsStyle.css';
import { Link, useNavigate } from 'react-router-dom';
import StarRating from './starView';


const BookDetailsView = (props) => {

  const handleRatingChange = (newRating) => {
    if (props.isLoggedIn) {
      props.setCurrentUserRate(newRating);
    }
  };

  function openACB() {
    props.setBookToAdd(props.currentBook)
    props.openCreateListModal()
  }

  function renderAvrage() {

    if (props.promiseResolveStatus === "ready") {
      return props.currentRating.rate?.toFixed(2) || 0;
    } else {
      const fontSize = '1em';

      const loadingImageStyles = {
        fontSize,
        height: '1em',
        width: '1em',
        borderRadius: '50%',
      };
      return (
        <div className="loading-spinner-small-avrage"></div>
      );
    }
  }
  const validReviews = props.currentReviews.filter(review => review.review && review.review.trim() !== "" && review.rate !== null);
  function toCheckreviwexisted() {
    if (props.isLoggedIn) {
      const userReviewExists = validReviews.some(review => review.userId === props.userId);
      return userReviewExists;
    }
    return false;
  }
  function renderPrevReviews() {
    if (props.promiseResolveReviewStatus === "ready") {
      // console.log(toCheckreviwexisted());
      const renderStars = (review) => {
        const maxStars = 5;
        const stars = [];

        for (let i = 1; i <= maxStars; i++) {
          stars.push(
            <span
              key={i}
              className={`star${review.rate >= i ? ' filled' : ''}`}
            >
              &#9733;
            </span>
          );
        }

        return stars;
      };
      const sortedReviews = validReviews.sort((first, last) => new Date(last.time) - new Date(first.time));
      if (validReviews.length > 0) {
        return (
          <div className="older-reviews">
            {sortedReviews.map((review, index) => (
              <div key={index} className="single-review">
                <p>
                  <strong >Date and Time:</strong> {review.time}
                </p>
                <p>
                  <strong >Username:</strong> {review.name}
                </p>
                <strong>Rating:</strong> {renderStars(review)}
                <p>
                  <strong className="aligningText">Review:</strong>
                  {breakLines(review.review)}
                </p>
                {props.isLoggedIn && review.userId === props.userId && (
                  <button type="delete" onClick={() => handleDeleteReview(index)}>X</button>
                )}
              </div>
            ))}
          </div>
        );
      } else {
        // Render a message when there are no valid reviews
        return <p>No reviews available.</p>;
      }
    }
    else {
      return <div className="loading-spinner-large"></div>
    }
  }

  function breakLines(text) {
    const maxLength = 70;
    const chunks = [];

    for (let i = 0; i < text.length; i += maxLength) {
      chunks.push(text.slice(i, i + maxLength));
    }

    return chunks.map((chunk, index) => (
      <span key={index} className="aligningText">
        <div> </div>
        {chunk}
        <br />
      </span>
    ));
  }

  function handleDeleteReview(index) {
    props.handleDeletUserRating();
  }

  function renderNumberOfViwes() {
    if (props.promiseResolveStatus === "ready") {
      return props.currentRating.totalNumberOfRates || 0;
    } else {
      const fontSize = '1em';

      const loadingImageStyles = {
        fontSize,
        height: '1em',
        width: '1em',
        borderRadius: '50%',
      };
      return (
        <div className="loading-spinner-small"></div>
      );
    }
  }

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (props.isLoggedIn) {
      if (props.userReview.length < 200) {
        props.setUserRating({ rating: props.currentUserRate, review: props.userReview });
      }
      else {
        alert('Review should be 200 characters or less.')
      }
    }
    else {
      alert('please log in to submit a review or to rate!')
    }
  };

  const goToHomePage = () => {
    props.goToHomePage();
  }
  const userId = props.userId;
  return (
    <div className="bookDetails">
      <img src={props.currentBook.picture} alt="Book Cover" />
      <div className="bookInfo">
        <h2>{props.currentBook.title}</h2>
        <p>Author: {props.currentBook.author}</p>
        <p>Genre: {props.currentBook.genre}</p>
        <p>Categories: {props.currentBook.categories}</p>
        <p>
          Summary:{' '}
          {props.currentBook.summary.length > 500
            ? `${props.currentBook.summary.substring(0, 400)}...`
            : props.currentBook.summary}
        </p>
        <p>Total Pages: {props.currentBook.pages}</p>
        <p>Book ISBN: {props.currentBook.isbn} </p>
        <p>Average ratings: {renderAvrage()} / 5 stars</p>
        <p>Total number of ratings: {renderNumberOfViwes()}</p>

        {<div className="reviews-section">
          <h3>Leave a Review:</h3>
          {props.promiseResolveStatus === "ready" ? (<span className={props.isLoggedIn ? '' : 'disabled-stars'}>
            <StarRating
              initialRating={0}
              onRatingChange={(newRating) => handleRatingChange(newRating)}
              currentRating={0}
              userId={userId}
            />
          </span>) : (
            <div></div>
          )}
          {(
            <form >
              <p>{!toCheckreviwexisted() ? "Write your review:" : "Update Your Review"}</p>
              <label htmlFor="userReview"></label>
              <textarea
                id="userReview"
                name="userReview"
                value={props.userReview}
                placeholder={'Max 100 char'}
                onChange={(e) => props.setUserReview(e.target.value)}
                required
              />
              <button onClick={handleReviewSubmit} type="submit">{!toCheckreviwexisted() ? "Submit Review & Rating" : "Update Your Review"}</button>
            </form>


          )}
          <strong> Older reviews: </strong>
          {renderPrevReviews()}
        </div>}
      </div>

      <div className="actions">

        <button onClick={goToHomePage} type="backtoSearch">Back to Search</button>

        <button type="addBook" onClick={() => props.isLoggedIn ? openACB() : alert('Create Account or Login to add a book to a customizable list!')}>Add Book To List</button>
      </div>
    </div >
  );
};



export default BookDetailsView;
