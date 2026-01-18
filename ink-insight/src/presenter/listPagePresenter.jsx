import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getIsLoggedIn } from "../store/userAccountSlice";

import {
  getLists,
  setCurrentList,
  deleteList,
  getListStatus,
  createNewList,
  renameList,
  setCurrentBook,
} from "../store/listsSlice";
import ListPageView from "../view/list_page/listPageView";

import CreateListPopUpView from "../view/list_page/createListView";
import EditListView from "../view/list_page/EditView";

const ListPagePresenter = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const listStatus = useSelector(getListStatus);
  const allListsInStore = useSelector(getLists);
  const isLoggedIn = useSelector(getIsLoggedIn);

  const [rename, setRename] = useState("");
  const [listToEdit, setListToEdit] = useState("");
  const [isCreateListOpen, setCreateListOpen] = useState(false);
  const [isEditListOpen, setEditListOpen] = useState(false);
  const [listToCreateName, SetListToCreateName] = useState("");

  const handleGoToBookDetails = () => {
    navigate("/bookDetails", { state: "/listPage" });
  };
  const handleGoToHomePage = () => {
    navigate("/", { state: "/listPage" });
  };

  const handleGoToOneListPage = () => {
    navigate("/oneListPage", { state: "/listPage" });
  };

  const handleRenameListACB = (renameObject) => {
    dispatch(renameList(renameObject));
  };

  const handleBookClickACB = (bookObject) => {
    dispatch(setCurrentBook(bookObject));
  };

  const handleListClickACB = (listName) => {
    dispatch(setCurrentList(listName));
  };

  const handleDeleteClickACB = (listName) => {
    dispatch(deleteList(listName));
  };

  const openCreateListModalACB = () => {
    if (!isEditListOpen) {
      setCreateListOpen(true);
    }
  };

  const closeCreateListModalACB = () => {
    setCreateListOpen(false);
  };

  const openEditModalACB = () => {
    if (!isCreateListOpen) {
      setEditListOpen(true);
    }
  };

  const closeEditModalACB = () => {
    setEditListOpen(false);
  };

  const handleCreateNewListACB = (listName) => {
    dispatch(createNewList(listName));
  };

  return (
    <div>
      <ListPageView
        lists={allListsInStore}
        SetCurrentList={handleListClickACB}
        openCreateListModal={openCreateListModalACB}
        isLoggedIn={isLoggedIn}
        openEditModal={openEditModalACB}
        setListToEdit={setListToEdit}
        setCurrentBook={handleBookClickACB}
        goToBookDetails={handleGoToBookDetails}
        goToOneListPage={handleGoToOneListPage}
        goToHomePage={handleGoToHomePage}
        listStatus={listStatus}
      />

      {isCreateListOpen && (
        <CreateListPopUpView
          onClose={closeCreateListModalACB}
          createNewList={handleCreateNewListACB}
          ListName={listToCreateName}
          SetListToCreateName={SetListToCreateName}
          allLists={allListsInStore}
        />
      )}

      {isEditListOpen && (
        <EditListView
          closeEditModal={closeEditModalACB}
          renameList={handleRenameListACB}
          rename={rename}
          setRename={setRename}
          listToEdit={listToEdit}
          deleteList={handleDeleteClickACB}
          allLists={allListsInStore}
        />
      )}
    </div>
  );
};

export { ListPagePresenter };
