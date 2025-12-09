// listPageView.js
import './listPageStyle.css';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';

const ListPageView = (props) => {

  const openACB = () => {
    props.openCreateListModal()
  }



  const RenderAllList = ({ list }) => {
    const sliderId = `slider-${list.name}`;
    const slideLeft = () => {
      var slider = document.getElementById(sliderId);
      slider.scrollLeft = slider.scrollLeft - 500;
    };

    const slideRight = () => {
      var slider = document.getElementById(sliderId);
      slider.scrollLeft = slider.scrollLeft + 500;
    };

    const editACB = () => {
      props.setListToEdit(list);
      props.openEditModal();
    };

    const loadingName = () => {
      if (list.name) {
        return <div>{list.name}</div>;
      } else {

        const loadingImageStyles = {
          fontSize: '1em',
          height: '1em',
          width: '1em',
          borderRadius: '50%',
        };
        return (
          <img
            className="loading-image"
            src="https://i.gifer.com/origin/34/34338d26023e5515f6cc8969aa027bca.gif"
            alt="loading"
            style={loadingImageStyles}
          />
        );
      }
    }

    const bookDetailsACB = (item) => {
      props.setCurrentBook(item.book);
      props.goToBookDetails();
      window.location.reload();
    }
    const listNameClickACB = () => {
      props.SetCurrentList(list.name)
      props.goToOneListPage();

    }

    const addBookClickACB = () => {
      props.goToHomePage()
    }

    const isBookEmptyCB = () => {
      return list.listBooks.length === 0;
    }





    return (
      <div>
        <div key={list.name} className="list-item">
          <div className="list-header">
            <div>
              <button onClick={listNameClickACB}>{loadingName()}</button>
            </div>
            <div className="edit-icon" onClick={editACB}>
              &#9998;
            </div>
          </div>


        </div>

        <span className="main-scrollBar">
          <MdChevronLeft className="my-scrollbar-left" onClick={slideLeft} />
          <div
            id={sliderId}
            className="my-slider"
          >
            {isBookEmptyCB() ? (
              <button className="my-element2" onClick={addBookClickACB}>
                Add Books
              </button>) : (
              list.listBooks.map((item, index) => (
                <img
                  className="my-element"
                  onClick={() => bookDetailsACB(item)}
                  src={item.book.picture}
                  alt="/"
                  key={index}
                />
              ))
            )}
          </div>
          <MdChevronRight className="my-scrollbar-right" onClick={slideRight} />

        </span>
      </div>

    )
  }



  if (props.listStatus !== "loading") {
    return (
      <div className="container">


        <div className="list-container">
          <h2 className="allLists">All Lists</h2>
          {props.lists.map((list) => (
            <RenderAllList key={list.name} list={list} />
          ))}

        </div>

        <button className="create-buttonn" type="CREATE" onClick={() => props.isLoggedIn ? openACB() : alert('Create Account or Login!')}>Create List</button>
        <div className="box">
          <div className="fas fa-quote-left fa2"></div>
          <div className="text">
            <i className="fas fa-quote-right fa1"></i>
            <div>
              <h3>- George R.R. Martin</h3>
              <p className="text-inner">
                "A reader lives a thousand lives before he dies, said Jojen. The man who never reads lives only one."
              </p>
            </div>
          </div>
        </div>


      </div>
    );
  }
  else {
    return (
      <img
        className="loading-image"
        src="https://i.gifer.com/origin/34/34338d26023e5515f6cc8969aa027bca.gif"
        alt="loading"
      />
    )
  }
};

export default ListPageView;

