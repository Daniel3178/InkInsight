import { useDispatch, useSelector } from "react-redux";
import OneListView from "../view/list_page/OneListView";
import { useNavigate } from "react-router-dom";
import {
  setCurrentBook,
  RemoveBookFromList,
  getCurrentList,
  getListStatus,
} from "../store/listsSlice";

const OneListPresenter = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currentList = useSelector(getCurrentList);
  const listStatus = useSelector(getListStatus);

  const handleGoToBookDetails = () => {
    navigate("/bookDetails", { state: "/oneListPage" });
  }

  const handleGoToHomePage = () => {
    navigate("/");
  }

  const handleRemoveClickACB = (currentList) => {
    dispatch(RemoveBookFromList(currentList));
  }

  const handleBookClickACB = (bookObject) => {
    dispatch(setCurrentBook(bookObject));
  }

  return (
    <div>
      <OneListView
        currentList={currentList}
        removeBookFromList={handleRemoveClickACB}
        setCurrentBook={handleBookClickACB}
        goToBookDetails={handleGoToBookDetails}
        goToHomePage={handleGoToHomePage}
        listStatus={listStatus}
      />
    </div>
  );
}

export { OneListPresenter };
