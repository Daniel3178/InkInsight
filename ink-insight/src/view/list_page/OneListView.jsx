const OneListView = (props) => {
  if (props.listStatus === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-canvas">
        <div className="animate-spin h-12 w-12 border-4 border-brand-primary rounded-full border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-canvas p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex items-center gap-4">
          <button
            onClick={props.goToHomePage}
            className="flex items-center gap-1 text-text-muted hover:text-white transition-colors"
          >
            <MdArrowBack /> Back
          </button>
          <h1 className="text-3xl font-bold text-text-main">
            <span className="text-text-muted font-normal mr-2">List:</span>
            {props.currentList?.name}
          </h1>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {props.currentList?.listBooks?.map((bookObj) => (
            <div
              key={bookObj.book.bookId}
              className="group relative flex flex-col"
            >
              <div
                className="aspect-[2/3] bg-surface rounded-xl overflow-hidden shadow-lg border border-surface-highlight relative cursor-pointer"
                onClick={() => {
                  props.setCurrentBook(bookObj.book);
                  props.goToBookDetails();
                }}
              >
                <img
                  src={bookObj.book.picture}
                  alt={bookObj.book.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors"></div>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  props.removeBookFromList({
                    listName: props?.currentList?.name,
                    book: bookObj.book,
                  });
                }}
                className="absolute top-2 right-2 bg-red-600/90 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all hover:bg-red-700 shadow-lg transform hover:scale-110 z-10"
                title="Remove from list"
              >
                <MdDeleteForever size={18} />
              </button>

              <div className="mt-3">
                <h3
                  className="font-bold text-text-main text-sm md:text-base line-clamp-1"
                  title={bookObj.book.title}
                >
                  {bookObj.book.title}
                </h3>
                <p className="text-xs text-text-muted line-clamp-1">
                  {bookObj.book.author}
                </p>
              </div>
            </div>
          ))}

          <div
            onClick={props.goToHomePage}
            className="aspect-[2/3] rounded-xl border-2 border-dashed border-surface-highlight hover:border-brand-primary hover:bg-surface/50 transition-all cursor-pointer flex flex-col items-center justify-center text-text-muted hover:text-brand-light group"
          >
            <div className="p-4 bg-surface rounded-full mb-3 group-hover:bg-brand-primary group-hover:text-white transition-colors">
              <MdAdd size={32} />
            </div>
            <span className="font-bold">Add Book</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OneListView;
export { OneListView };
