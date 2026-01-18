import { MdClose } from "react-icons/md";
import { createListCreteria } from "../../utilities/regex";

export const CreateListPopUpView = (props) => {
  const setListNameACB = (event) =>
    props.SetListToCreateName(event.target.value);

  const createListACB = () => {
    let myObj = { listName: props.ListName, allLists: props.allLists };
    let newObj = createListCreteria(myObj);
    if (newObj.isNameValid) {
      props.createNewList(newObj.listName);
      props.onClose();
    }
    props.SetListToCreateName("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-canvas/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md bg-surface border border-surface-highlight rounded-2xl shadow-2xl p-6">
        <button
          onClick={props.onClose}
          className="absolute top-4 right-4 text-text-muted hover:text-text-main transition-colors"
        >
          <MdClose size={24} />
        </button>

        <h3 className="text-xl font-bold text-text-main mb-6">
          Create a New List
        </h3>

        <div className="flex flex-col gap-4">
          <input
            className="w-full p-3 bg-canvas border border-surface-highlight rounded-xl text-text-main placeholder-text-muted focus:ring-2 focus:ring-brand-primary outline-none transition-all"
            placeholder="Enter list name"
            onChange={setListNameACB}
            autoFocus
          />
          <button
            className="w-full py-3 bg-brand-primary hover:bg-brand-hover text-white font-bold rounded-xl shadow-lg transition-transform active:scale-95"
            onClick={createListACB}
          >
            Create List
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateListPopUpView;
