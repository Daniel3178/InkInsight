import { useState } from "react";

const StarRating = ({ initialRating, onRatingChange, userId }) => {
  const [hover, setHover] = useState(0);
  const [rating, setRating] = useState(initialRating || 0);

  const handleStarClick = (selectedRating) => {
    if (userId) {
      setRating(selectedRating);
      onRatingChange(selectedRating);
    } else {
      alert("Please log in to leave a rating.");
      onRatingChange(0);
    }
  };

  return (
    <div className="flex items-center space-x-1">
      {[...Array(5)].map((_, index) => {
        const ratingValue = index + 1;
        return (
          <button
            type="button"
            key={ratingValue}
            className={`text-2xl transition-colors duration-200 focus:outline-none ${
              ratingValue <= (hover || rating)
                ? "text-status-rating scale-110" // Gold/Yellow
                : "text-surface-highlight" // Dark Grey
            }`}
            onClick={() => handleStarClick(ratingValue)}
            onMouseEnter={() => setHover(ratingValue)}
            onMouseLeave={() => setHover(0)}
            aria-label={`Rate ${ratingValue} stars`}
          >
            &#9733;
          </button>
        );
      })}
    </div>
  );
};

export default StarRating;
