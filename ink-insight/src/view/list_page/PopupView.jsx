import { MdClose, MdAdd, MdCheck } from "react-icons/md";
import { createListCreteria } from "../../utilities/regex";
const PopupView = (props) => {
  const createListACB = () => {
    let newObj = createListCreteria({
      listName: props.ListName,
      allLists: props.allLists,
    });
    if (newObj.isNameValid) props.createNewList(newObj.listName);
    props.SetListToCreateName("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-canvas/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-sm bg-surface border border-surface-highlight rounded-2xl shadow-2xl flex flex-col max-h-[80vh]">
        <div className="p-4 border-b border-surface-highlight flex justify-between items-center">
          <h3 className="font-bold text-text-main">Add to List...</h3>
          <button onClick={props.closePopUp}>
            <MdClose size={24} className="text-text-muted hover:text-white" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {props.allLists?.map((list) => {
            const isBookExist = list.listBooks?.some(
              (obj) => obj.book.bookId === props.bookToAdd.bookId,
            );

            return (
              <div
                key={list.name}
                className="flex items-center justify-between p-3 rounded-lg hover:bg-surface-highlight group transition-colors"
              >
                <span className="text-text-secondary font-medium truncate pr-4">
                  {list.name}
                </span>
                {isBookExist ? (
                  <span className="text-brand-primary flex items-center gap-1 text-xs font-bold px-2 py-1 bg-brand-primary/10 rounded">
                    <MdCheck /> Added
                  </span>
                ) : (
                  <button
                    onClick={() => {
                      props.addBookToList({
                        listName: list.name,
                        book: props.bookToAdd,
                      });
                      props.closePopUp();
                    }}
                    className="p-2 bg-surface-highlight group-hover:bg-brand-primary text-white rounded-full transition-colors"
                  >
                    <MdAdd size={18} />
                  </button>
                )}
              </div>
            );
          })}
        </div>

        <div className="p-4 border-t border-surface-highlight bg-canvas/50 rounded-b-2xl">
          <div className="text-xs font-bold text-text-muted uppercase mb-2">
            Create New List
          </div>
          <div className="flex gap-2">
            <input
              className="flex-1 p-2 text-sm bg-surface border border-surface-highlight rounded-lg text-text-main focus:ring-1 focus:ring-brand-primary outline-none"
              value={props.valueOfInput}
              onChange={(e) => props.SetListToCreateName(e.target.value)}
              placeholder="New list name..."
            />
            <button
              onClick={createListACB}
              className="bg-brand-primary hover:bg-brand-hover text-white px-3 rounded-lg text-sm font-bold"
            >
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PopupView;
