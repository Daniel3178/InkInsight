import "./oneListStyle.css";

const OneListView = (props) => {
  const addBookClickACB = () => {
    props.goToHomePage()
  }

  const renderAllBooks = () => {
    const renderEachBook = (bookObj) => {

      const bookClickACB = () => {
        props.setCurrentBook(bookObj.book);
        props.goToBookDetails();
        window.location.reload();
      }

      const deleteBookClickACB = () => {
        const removeObject = {
          listName: props?.currentList?.name,
          book: bookObj.book,
        };
        props.removeBookFromList(removeObject);
      }

      return (

        <div className="box2" key={bookObj.book.bookId}>
          <div className="close-icon" onClick={deleteBookClickACB}>
            X
          </div>
          <div onClick={bookClickACB}>
            <img
              src={bookObj.book.picture}
              alt="Book"
              className="book-image"
            />
            <div className="text-cont" id={bookObj.book.title}>
              <h1>{bookObj.book.title}</h1>
              <br />
              <div>{bookObj.book.author}</div>
            </div>
          </div>
        </div>

      );

    }


    return (
      <div>
        <div className="container2">
          {props.currentList?.listBooks?.map(renderEachBook)}
        </div>
      </div>
    );
  }
  if (props.listStatus !== "loading") {
    return (
      <div>

        <p className="list-name" key={props.currentList.name}>
          List name is: {props?.currentList?.name}
        </p>
        {renderAllBooks()}
        <div onClick={addBookClickACB}>
          <div className="box2" id="box">
            <div className="add-book2">+ Add Book</div>
          </div>
        </div>
      </div>
    );
  }
  else {
    return (<img
      className="loading-image"
      src="https://i.gifer.com/origin/34/34338d26023e5515f6cc8969aa027bca.gif"
      alt="loading"
    />)
  }
}

export default OneListView;
