import './createListStyle.css';
import {createListCreteria} from "../../utilities/regex"



const CreateListPopUpView = (props) => {

    const setListNameACB = (event) => {
        props.SetListToCreateName(event.target.value)
    }


    const createListACB = () => {
        let myObj = {
          listName: props.ListName,
          allLists: props.allLists
        }
        let newObj = createListCreteria(myObj);
        if (newObj.isNameValid) {
          props.createNewList(newObj.listName);
          props.onClose();
        } 
        props.SetListToCreateName('');
    };
      

    const CloseACB = () => {
        props.onClose()
    }

    return(
        <div className="modal-create">
            <div className="modal-content-create">
                <button onClick={CloseACB} className="close-btn-create">
                    X
                </button>
                <h3>Create a New List</h3>
                <div className="create-list-container">
                    <input
                        placeholder="Enter list name"
                        onChange={setListNameACB}
                    />
                    <button className="create-button" onClick={createListACB}>
                        Create
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CreateListPopUpView;