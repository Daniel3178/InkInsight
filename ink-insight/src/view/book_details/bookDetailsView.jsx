import StarRating from "./starView";
import {
  MdOutlineBookmarkAdd,
  MdArrowBack,
  MdDeleteOutline,
  MdPerson,
} from "react-icons/md";

const BookDetailsView = (props) => {
  const { currentBook, isLoggedIn, userId } = props;
  const handleRatingChange = (newRating) => {
    if (isLoggedIn) props.setCurrentUserRate(newRating);
  };

  const openAddToListModal = () => {
    props.setBookToAdd(currentBook);
    props.openCreateListModal();
  };

  const validReviews = props.currentReviews.filter(
    (r) => r.review && r.review.trim() !== "" && r.rate !== null,
  );

  const userHasReviewed =
    isLoggedIn && validReviews.some((r) => r.userId === userId);

  // Static stars for displaying existing reviews
  const renderStaticStars = (rating) => {
    return (
      <div className="flex text-status-rating">
        {[...Array(5)].map((_, i) => (
          <span
            key={i}
            className={
              i < rating ? "opacity-100" : "opacity-20 text-text-muted"
            }
          >
            &#9733;
          </span>
        ))}
      </div>
    );
  };

  const renderAverageRating = () => {
    if (props.promiseResolveStatus === "loading") {
      return (
        <div className="animate-spin h-5 w-5 border-2 border-brand-primary rounded-full border-t-transparent"></div>
      );
    }
    const rate = props.currentRating.rate;
    return rate ? rate.toFixed(1) : "N/A";
  };

  const renderReviewsList = () => {
    if (props.promiseResolveReviewStatus !== "ready") {
      return (
        <div className="flex justify-center py-10">
          <div className="animate-spin h-10 w-10 border-4 border-brand-primary rounded-full border-t-transparent"></div>
        </div>
      );
    }

    if (validReviews.length === 0) {
      return (
        <div className="text-center py-10 bg-surface/50 rounded-xl border border-dashed border-surface-highlight">
          <p className="text-text-muted italic">
            No reviews yet. Be the first to share your thoughts!
          </p>
        </div>
      );
    }

    const sortedReviews = [...validReviews].sort(
      (a, b) => new Date(b.time) - new Date(a.time),
    );

    return (
      <div className="space-y-4">
        {sortedReviews.map((review, index) => (
          <div
            key={index}
            className="bg-surface p-5 rounded-xl border border-surface-highlight shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-canvas rounded-full flex items-center justify-center text-text-muted border border-surface-highlight">
                  <MdPerson size={20} />
                </div>
                <div>
                  <span className="block font-bold text-text-main text-sm">
                    {review.name || "Anonymous"}
                  </span>
                  <span className="block text-xs text-text-muted">
                    {review.time}
                  </span>
                </div>
              </div>
              {renderStaticStars(review.rate)}
            </div>

            <p className="text-text-secondary text-sm leading-relaxed whitespace-pre-line border-l-2 border-brand-light/30 pl-3">
              {review.review}
            </p>

            {isLoggedIn && review.userId === userId && (
              <div className="mt-4 flex justify-end">
                <button
                  className="flex items-center gap-1 text-xs text-red-400 hover:text-red-300 transition-colors"
                  onClick={() => props.handleDeletUserRating(index)}
                >
                  <MdDeleteOutline size={16} /> Delete Review
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!isLoggedIn) return alert("Please log in to submit a review.");
    if (props.userReview.length > 500)
      return alert("Review should be 500 characters or less.");

    props.setUserRating({
      rating: props.currentUserRate,
      review: props.userReview,
    });
  };

  // --- Main Render ---
  return (
    <div className="min-h-screen bg-canvas text-text-main pb-20">
      <div className="sticky top-0 z-40 bg-canvas/80 backdrop-blur-md border-b border-surface-highlight px-4 py-4">
        <div className="max-w-7xl mx-auto">
          <button
            className="flex items-center text-text-secondary hover:text-brand-light transition-colors font-medium"
            onClick={props.goToHomePage}
          >
            <MdArrowBack className="mr-2 text-xl" /> Back to Search
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        {props.bookDetailsStatus == "loading" ? (
          <div className="flex flex-col items-center justify-center mt-20 opacity-80">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-500 mb-4"></div>
            <p className="text-indigo-400 animate-pulse">Fetching books...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-4 flex flex-col gap-6">
              <div className="relative group perspective">
                <div className="relative rounded-lg shadow-2xl overflow-hidden bg-surface-highlight border-4 border-surface">
                  <img
                    src={
                      currentBook.picture ||
                      "https://www.rudidornemann.com/wp-content/uploads/2016/11/placeholder-cover.jpg"
                    }
                    alt={currentBook.title}
                    className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>

              <button
                className={`w-full py-4 rounded-xl flex items-center justify-center gap-2 font-bold text-white shadow-lg shadow-brand-primary/20 transition-all active:scale-95 ${
                  isLoggedIn
                    ? "bg-brand-primary hover:bg-brand-hover cursor-pointer"
                    : "bg-surface-highlight text-text-muted cursor-not-allowed"
                }`}
                onClick={
                  isLoggedIn
                    ? openAddToListModal
                    : () => alert("Please login to create lists.")
                }
              >
                <MdOutlineBookmarkAdd size={24} />
                {isLoggedIn ? "Add to My List" : "Login to Add"}
              </button>
            </div>

            <div className="lg:col-span-8 flex flex-col">
              <div className="border-b border-surface-highlight pb-6 mb-6">
                <h1 className="text-3xl md:text-5xl font-bold text-text-main leading-tight mb-2">
                  {currentBook.title}
                </h1>
                <h2 className="text-xl text-brand-light font-medium">
                  By {currentBook.author}
                </h2>
                {currentBook.authorBio && (
                  <p className="mt-2 text-sm text-text-muted transition-all">
                    {currentBook.authorBio}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-surface p-3 rounded-lg text-center border border-surface-highlight">
                  <span className="block text-xs text-text-muted uppercase tracking-wider">
                    Rating
                  </span>
                  <div className="flex items-center justify-center gap-1 text-xl font-bold text-text-main mt-1">
                    {renderAverageRating()}{" "}
                    <span className="text-status-rating text-base">
                      &#9733;
                    </span>
                  </div>
                </div>
                <div className="bg-surface p-3 rounded-lg text-center border border-surface-highlight">
                  <span className="block text-xs text-text-muted uppercase tracking-wider">
                    Pages
                  </span>
                  <span className="block text-xl font-bold text-text-main mt-1">
                    {currentBook.pages || "N/A"}
                  </span>
                </div>
                <div className="bg-surface p-3 rounded-lg text-center border border-surface-highlight">
                  <span className="block text-xs text-text-muted uppercase tracking-wider">
                    Year
                  </span>
                  <span className="block text-xl font-bold text-text-main mt-1">
                    {currentBook.first_publish_year || "N/A"}
                  </span>
                </div>
                <div className="bg-surface p-3 rounded-lg text-center border border-surface-highlight">
                  <span className="block text-xs text-text-muted uppercase tracking-wider">
                    Genre
                  </span>
                  <span
                    className="block text-sm font-bold text-text-main mt-2 truncate px-1"
                    title={currentBook.genre}
                  >
                    {currentBook.genre || "General"}
                  </span>
                </div>
              </div>

              <div className="mb-10">
                <h3 className="text-lg font-bold text-text-main mb-3 border-l-4 border-brand-primary pl-3">
                  Synopsis
                </h3>
                <p className="text-text-secondary leading-relaxed text-lg font-light">
                  {props.status === "loading"
                    ? "Loading details..."
                    : currentBook.summary || "No description available."}
                </p>
              </div>

              <div className="bg-surface rounded-2xl p-6 md:p-8 border border-surface-highlight mb-10">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-text-main">
                    Community Reviews
                  </h3>
                  <span className="text-sm text-text-muted">
                    {props.currentRating.totalNumberOfRates || 0} Total Ratings
                  </span>
                </div>

                {isLoggedIn ? (
                  <div className="bg-canvas/50 p-5 rounded-xl border border-surface-highlight/50">
                    <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
                      <span className="font-medium text-text-secondary">
                        {userHasReviewed
                          ? "Update your rating:"
                          : "Rate this book:"}
                      </span>
                      <StarRating
                        initialRating={props.currentUserRate}
                        onRatingChange={handleRatingChange}
                        currentRating={props.currentUserRate}
                        userId={userId}
                      />
                    </div>
                    <form onSubmit={handleReviewSubmit}>
                      <textarea
                        className="w-full bg-surface border border-surface-highlight rounded-lg p-3 text-text-main placeholder-text-muted focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all outline-none resize-none"
                        value={props.userReview}
                        onChange={(e) => props.setUserReview(e.target.value)}
                        placeholder="What did you think? Share your opinion..."
                        rows={4}
                        required
                      />
                      <div className="mt-3 flex justify-end">
                        <button
                          type="submit"
                          className="bg-brand-primary hover:bg-brand-hover text-white font-medium py-2 px-6 rounded-lg transition-colors shadow-lg"
                        >
                          {userHasReviewed ? "Update Review" : "Post Review"}
                        </button>
                      </div>
                    </form>
                  </div>
                ) : (
                  <div className="text-center p-6 bg-canvas/30 rounded-xl border border-dashed border-surface-highlight">
                    <p className="text-text-muted">
                      Please{" "}
                      <button
                        onClick={props.goToSignIn}
                        className="text-brand-light underline hover:text-brand-hover font-medium"
                      >
                        Log In
                      </button>{" "}
                      to rate and review this book.
                    </p>
                  </div>
                )}
              </div>

              {/* 4. Previous Reviews List */}
              <div className="mb-10">
                <h3 className="text-lg font-bold text-text-main mb-4">
                  Recent Reviews
                </h3>
                {renderReviewsList()}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookDetailsView;
