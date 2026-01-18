export const EditListView = (props) => {
  const setRenameACB = (event) => props.setRename(event.target.value);

  const deleteListACB = () => {
    if (
      window.confirm(
        `Are you sure you want to delete "${props.listToEdit.name}"?`,
      )
    ) {
      props.deleteList(props.listToEdit.name);
      props.closeEditModal();
    }
  };

  const renameACB = () => {
    let myObj = {
      rename: props.rename,
      listToEdit: props.listToEdit,
      allLists: props.allLists,
    };
    let newObj = renameListCreteria(myObj);

    if (newObj.isNameValid) {
      props.renameList({
        prevName: props.listToEdit.name,
        newName: newObj.newName,
      });
      props.closeEditModal();
    }
    props.setRename("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-canvas/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md bg-surface border border-surface-highlight rounded-2xl shadow-2xl p-6">
        <button
          onClick={props.closeEditModal}
          className="absolute top-4 right-4 text-text-muted hover:text-text-main transition-colors"
        >
          <MdClose size={24} />
        </button>

        <h3 className="text-xl font-bold text-text-main mb-6">
          Edit List:{" "}
          <span className="text-brand-light">{props.listToEdit.name}</span>
        </h3>

        <div className="space-y-6">
          {/* Rename Section */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-text-muted uppercase">
              Rename List
            </label>
            <div className="flex gap-2">
              <input
                className="flex-1 p-3 bg-canvas border border-surface-highlight rounded-xl text-text-main placeholder-text-muted focus:ring-2 focus:ring-brand-primary outline-none"
                placeholder="Enter new name"
                onChange={setRenameACB}
              />
              <button
                className="px-4 py-3 bg-brand-primary hover:bg-brand-hover text-white font-medium rounded-xl transition-colors"
                onClick={renameACB}
              >
                Rename
              </button>
            </div>
          </div>

          <div className="border-t border-surface-highlight my-4"></div>

          {/* Delete Section */}
          <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 flex flex-col items-center text-center">
            <p className="text-sm text-red-200 mb-3">
              Deleting a list cannot be undone.
            </p>
            <button
              onClick={deleteListACB}
              className="flex items-center gap-2 px-6 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-colors w-full justify-center"
            >
              <MdDeleteOutline size={20} /> Remove List
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default EditListView;
