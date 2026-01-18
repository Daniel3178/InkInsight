import {
  MdAddCircleOutline,
  MdStar,
  MdImageNotSupported,
} from "react-icons/md";
import { getCoverUrl } from "../../config/apiConfig";

const HomePageView = (props) => {
  const renderBooks = (book) => {
    const bookId = book.key.replace("/works/", "");
    const authorDisplay = book.author_name
      ? book.author_name.join(", ")
      : "Unknown Author";

    const coverImage = book.cover_i
      ? getCoverUrl(book.cover_i, "M")
      : "https://www.rudidornemann.com/wp-content/uploads/2016/11/placeholder-cover.jpg";

    const index = props.booksAvgArray?.find(
      (eachBook) => eachBook.bookId === bookId,
    );
    const rating = index?.avgRate ? index.avgRate.toFixed(1) : "N/A";

    const bookClickACB = () => {
      props.getBookDetails(book.key);
      props.goToBookDetailsPage();
    };

    const addButtonClickACB = (e) => {
      e.stopPropagation();
      const myBook = {
        bookId: bookId,
        title: book.title,
        author: authorDisplay,
        genre: book.subject ? book.subject[0] : "General",
        picture:
          coverImage ||
          "https://www.rudidornemann.com/wp-content/uploads/2016/11/placeholder-cover.jpg",
        summary: "Summary available on details page",
        pages: book.number_of_pages_median || 0,
      };
      props.setBookToAdd(myBook);
      props.openPopup();
    };

    return (
      <div
        key={book.key}
        onClick={bookClickACB}
        className="group relative flex flex-col bg-slate-800 rounded-xl overflow-hidden shadow-lg border border-slate-700 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
      >
        <button
          onClick={addButtonClickACB}
          className="absolute top-3 right-3 z-10 p-2 bg-slate-900/80 text-indigo-400 rounded-full hover:bg-indigo-600 hover:text-white transition-colors backdrop-blur-sm"
          title="Add to list"
        >
          <MdAddCircleOutline size={24} />
        </button>

        <div className="relative h-64 w-full bg-slate-900 flex items-center justify-center overflow-hidden">
          {coverImage ? (
            <img
              src={coverImage}
              alt={book.title}
              className="h-full w-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
            />
          ) : (
            <div className="flex flex-col items-center text-slate-600">
              <MdImageNotSupported size={40} />
              <span className="text-xs mt-2">No Cover</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60"></div>
        </div>

        <div className="p-4 flex flex-col flex-grow justify-between">
          <div>
            <h3
              className="text-lg font-bold text-slate-100 leading-tight line-clamp-2 mb-1"
              title={book.title}
            >
              {book.title}
            </h3>
            <p className="text-sm text-slate-400 line-clamp-1">
              {authorDisplay}
            </p>
          </div>

          <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-700">
            <div className="flex items-center text-yellow-500">
              <MdStar size={18} />
              <span className="ml-1 text-sm font-medium text-slate-300">
                {rating}
              </span>
            </div>
            <span className="text-xs text-slate-500 px-2 py-1 bg-slate-900 rounded-md">
              DETAILS
            </span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 font-sans pb-20">
      <div className="w-full bg-slate-900 border-b border-slate-800 pt-10 pb-12 px-4 flex flex-col items-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400 mb-8 tracking-tight">
          Find Your Next Adventure
        </h1>

        <div className="w-full max-w-4xl bg-slate-800 p-2 md:p-3 rounded-2xl shadow-xl border border-slate-700 flex flex-col md:flex-row gap-3">
          <select
            className="bg-slate-900 text-slate-300 p-3 rounded-xl border border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all md:w-32 cursor-pointer"
            value={props.searchType}
            onChange={(e) => props.setSearchType(e.target.value)}
          >
            <option value="general">All</option>
            <option value="title">Title</option>
            <option value="author">Author</option>
          </select>

          <div className="relative flex-grow">
            <input
              className="w-full h-full bg-slate-900 text-slate-100 p-3 pl-4 rounded-xl border border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-slate-500 transition-all"
              type="search"
              placeholder={`Search by ${props.searchType}...`}
              value={props.searchInput || ""}
              onChange={(e) => props.setSearchInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") props.search();
              }}
            />
          </div>

          <button
            className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3 px-8 rounded-xl shadow-lg hover:shadow-indigo-500/30 transition-all duration-200 active:scale-95 whitespace-nowrap"
            type="button"
            onClick={() => props.search()}
          >
            Search
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        {props.apiStatus === "loading" ? (
          <div className="flex flex-col items-center justify-center mt-20 opacity-80">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-500 mb-4"></div>
            <p className="text-indigo-400 animate-pulse">Fetching books...</p>
          </div>
        ) : (
          <>
            {!props.books && (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <h2 className="text-6xl md:text-8xl font-serif font-bold text-slate-800 select-none mb-4">
                  InkInsight
                </h2>
                <p className="text-xl md:text-2xl text-slate-500 font-light italic">
                  "Empowering Your Storytelling Journey"
                </p>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
              {Array.isArray(props.books) && props.books.map(renderBooks)}
            </div>

            {Array.isArray(props.books) && props.books.length === 0 && (
              <div className="text-center py-20">
                <p className="text-2xl text-slate-400">No results found.</p>
                <p className="text-slate-500 mt-2">
                  Try adjusting your search terms.
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default HomePageView;
