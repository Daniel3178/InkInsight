import './editPopUpStyle.css';
import {renameListCreteria} from "../../utilities/regex"

function EditListView(props){
  const setRenameACB = (event) => {
    props.setRename(event.target.value)
  }

  const CloseACB = () => {
    props.closeEditModal()
  }

  const deleteListACB = () => {
    props.deleteList(props.listToEdit.name)
    props.closeEditModal()
  }

  const renameACB = () => {
    let myObj = {
      rename: props.rename,
      listToEdit: props.listToEdit,
      allLists: props.allLists
    }
    let newObj = renameListCreteria(myObj);

    if (newObj.isNameValid) {
      let renameObject = {
        prevName: props.listToEdit.name,
        newName: newObj.newName,
      };
      props.renameList(renameObject);
      props.closeEditModal();
    }
    props.setRename('');
  };
  




    return(
      <div className="modal">
        <div className="modal-content">
          <button onClick={CloseACB} className="close-button">×</button>

          <div className="rename-section">
          <h3>Edit List: {props.listToEdit.name}</h3>
            <input placeholder="Enter new name" onChange={setRenameACB} />
            <button className="rename-button" onClick={renameACB}>
              Rename
            </button>
          </div>

          <div className="remove-section">
            
            <button onClick={deleteListACB} className="delete-btn">
              Remove List
            </button>
          </div>
        </div>
      </div>
  )
}

export default EditListView;