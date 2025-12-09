import "./popUpStyle.css";
import { createListCreteria } from "../../utilities/regex"

const PopupView = (props) => {
  const setListNameACB = (event) => {
    props.SetListToCreateName(event.target.value);
  }

  const renderListNames = (list) => {


    const addBookBotton = () => {
      let indexOfCurrentList = props.allLists.findIndex((object) => object.name === list.name);
      const isBookExist = props.allLists[indexOfCurrentList].listBooks?.some(bookobj => bookobj.book.bookId === props.bookToAdd.bookId);
      if (!isBookExist) {
        return (
          <button className="dropbtn1" onClick={addToList}>+</button>
        )
      }
      if (isBookExist) {
        return (
          <button className="dropbtn1" disabled>+</button>
        )
      }
    }

    const addToList = () => {
      let addBookObject = {
        listName: list.name,
        book: props.bookToAdd,
      };
      props.addBookToList(addBookObject);
      props.closePopUp();
    }


    return (
      <div key={list.id} className="list-item">
        <div className="button-container">
          {addBookBotton()}
        </div>
        <div className="list-nameX">{list.name}</div>
      </div>
    );
  }


  const createListACB = () => {
    let myObj = {
      listName: props.ListName,
      allLists: props.allLists
    }
    let newObj = createListCreteria(myObj);
    if (newObj.isNameValid) {
      props.createNewList(newObj.listName);
    }
    props.SetListToCreateName('');
  };



  const CloseACB = () => {
    props.closePopUp();
  }

  return (
    <div className="modal1">
      <div className="modal-content1">
        <div className="list-names">
          {props?.allLists?.map(renderListNames)}
        </div>
        <input value={props.valueOfInput} onChange={setListNameACB} placeholder="Enter new list name" />
        <button className="create-button1" onClick={createListACB}>
          create new list
        </button>
        <button className="close-button1" onClick={CloseACB}>
          close
        </button>
      </div>
    </div>
  );
}

export default PopupView;
