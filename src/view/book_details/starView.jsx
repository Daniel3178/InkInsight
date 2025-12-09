import React, { useState } from 'react';
import "./bookDetailsStyle.css"
const StarRating = ({ initialRating, onRatingChange, currentRating, userId }) => {

    const [rating, setRating] = useState(initialRating || 0);

    const handleStarClick = (selectedRating) => {
        if (userId) {
            setRating(selectedRating);
            onRatingChange(selectedRating);
        } else {
            alert('Please log in to leave a rating.');
            onRatingChange(0);
        }
    };

    const renderStars = () => {
        const maxStars = 5;
        const stars = [];

        for (let i = 1; i <= maxStars; i++) {
            stars.push(
                <span
                    key={i}
                    onClick={() => handleStarClick(i)}
                    className={`star${rating >= i ? ' filled' : ''}`}
                >
                    &#9733;
                </span>
            );
        }

        return stars;
    };

    return <div className="starRating">{renderStars()}</div>;
};

export default StarRating;
