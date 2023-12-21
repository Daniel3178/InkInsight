import "./homePageStyle.css";
import { MdAddCircleOutline } from "react-icons/md";
const HomePageView = (props) => {


  const renderBooks = (book) => {
    const bookClickACB = () => {
      props.getBookDetails(book.work_id);
      props.goToBookDetailsPage()
      window.location.reload();
    }

    const addButtonClickACB = () => {
      const myBook = {
        bookId: book.work_id,
        title: book.title,
        author: book.authors,
        genre: book.book_type,
        picture: book.published_works[0].cover_art_url,
        summary: book.summary ? book.summary : "No summary available",
        pages: book.page_count,
        categories: book.categories,
      };
      props.setBookToAdd(myBook);
      props.openPopup();
    }

    const index = props.booksAvgArray.find(
      (eachBook) => eachBook.bookId === book.work_id
    );

    return (
      <div className="searchResultContainer">
        <div key={book.work_id} className="searchResult">
          <button
            onClick={addButtonClickACB}
            className="add-to-list-button"
            key={book.title}
          >
            <MdAddCircleOutline size={30} />
          </button>
          <div onClick={bookClickACB}>
            <div className="imageContainer">
              <img
                src={book.published_works[0].cover_art_url}
                height={"100"}
                alt={book.cover}
              />
            </div>
            <div className="textContainer">
              <div>
                <h1>{book.title}</h1>
              </div>
              <div>
                <h3>By: {book.authors}</h3>
              </div>
              <div>
                <h4 className="rating">Rating: {index !== undefined ? index.avgRate?.toFixed(2) : 0} / 5</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="homepage">
      <div className="header">
        <h1 className="searchForBook">Search For a Book!</h1>
        <div className="header-buttons">
        </div>
      </div>
      <div className="search">
        <div className="search-container">
          <input
            className="search-input"
            type="search"
            placeholder="Search book by title"
            value={props.searchInput}
            onChange={(e) => {
              props.setSearchInput(e.target.value);
            }}
          />
          <button className="buttonOfSearch" type="button" onClick={() => props.search(props.searchInput)}>
            Search
          </button>
        </div>
        <div>
          {props.apiStatus === "loading" ? (
            <img
              className="loading-image"
              src="https://i.gifer.com/origin/34/34338d26023e5515f6cc8969aa027bca.gif"
              alt="loading"
            />
          ) : (
            <><div class="fancy-text">
              <p class="ink-insight">InkInsight:</p>
              <p class="book-journey">Empowering Your Storytelling Journey</p>
            </div>
              <div className="searchResultsContainer">
                {Array.isArray(props.books) && props.books.map(renderBooks)}
              </div>

            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default HomePageView;
