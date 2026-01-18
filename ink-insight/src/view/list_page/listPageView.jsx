import {
  MdChevronLeft,
  MdChevronRight,
  MdEdit,
  MdOutlineLibraryAdd,
} from "react-icons/md";

const ListPageView = (props) => {
  const RenderAllList = ({ list }) => {
    const sliderId = `slider-${list.name}`;

    const slide = (offset) => {
      const slider = document.getElementById(sliderId);
      if (slider) slider.scrollBy({ left: offset, behavior: "smooth" });
    };

    const isBookEmpty = list.listBooks.length === 0;

    return (
      <div className="mb-10 animate-fade-in-up">
        <div className="flex items-center justify-between px-2 mb-3">
          <button
            onClick={() => {
              props.SetCurrentList(list.name);
              props.goToOneListPage();
            }}
            className="text-xl md:text-2xl font-bold text-text-main hover:text-brand-light transition-colors text-left"
          >
            {list.name || "Untitled List"}
          </button>
          <button
            onClick={() => {
              props.setListToEdit(list);
              props.openEditModal();
            }}
            className="p-2 text-text-muted hover:text-brand-light hover:bg-surface-highlight rounded-full transition-colors"
            title="Edit List"
          >
            <MdEdit size={20} />
          </button>
        </div>

        <div className="relative group">
          {!isBookEmpty && (
            <button
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/60 hover:bg-brand-primary text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all backdrop-blur-sm -ml-4"
              onClick={() => slide(-500)}
            >
              <MdChevronLeft size={30} />
            </button>
          )}

          <div
            id={sliderId}
            className="flex overflow-x-scroll scrollbar-hide space-x-4 pb-4 px-2 scroll-smooth snap-x"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }} // Hide scrollbar standard/IE
          >
            {isBookEmpty ? (
              <div className="w-full h-48 bg-surface/50 border-2 border-dashed border-surface-highlight rounded-xl flex flex-col items-center justify-center text-text-muted">
                <p className="mb-3 italic">This list is empty</p>
                <button
                  onClick={props.goToHomePage}
                  className="flex items-center gap-2 bg-surface-highlight hover:bg-brand-primary hover:text-white px-4 py-2 rounded-lg transition-colors font-medium text-sm"
                >
                  <MdOutlineLibraryAdd /> Add Books
                </button>
              </div>
            ) : (
              list.listBooks.map((item, index) => (
                <div
                  key={index}
                  onClick={() => {
                    props.setCurrentBook(item.book);
                    props.goToBookDetails();
                  }}
                  className="min-w-[140px] w-[140px] md:min-w-[160px] md:w-[160px] snap-start cursor-pointer transition-transform hover:-translate-y-2 duration-300"
                >
                  <div className="aspect-[2/3] rounded-lg overflow-hidden shadow-lg border border-surface-highlight relative">
                    <img
                      src={
                        item.book.picture ||
                        "https://via.placeholder.com/150x200?text=No+Image"
                      }
                      alt={item.book.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors"></div>
                  </div>
                  <h4 className="mt-2 text-sm font-medium text-text-secondary truncate">
                    {item.book.title}
                  </h4>
                </div>
              ))
            )}
          </div>

          {!isBookEmpty && (
            <button
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/60 hover:bg-brand-primary text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all backdrop-blur-sm -mr-4"
              onClick={() => slide(500)}
            >
              <MdChevronRight size={30} />
            </button>
          )}
        </div>
      </div>
    );
  };

  if (props.listStatus === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-canvas">
        <div className="animate-spin h-12 w-12 border-4 border-brand-primary rounded-full border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-canvas text-text-main p-4 md:p-8 pb-24">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 border-b border-surface-highlight pb-6">
          <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400 mb-4 md:mb-0">
            My Collections
          </h2>
          <button
            onClick={() =>
              props.isLoggedIn
                ? props.openCreateListModal()
                : alert("Create Account or Login!")
            }
            className="flex items-center gap-2 bg-brand-primary hover:bg-brand-hover text-white px-6 py-3 rounded-xl shadow-lg shadow-brand-primary/20 transition-all active:scale-95 font-bold"
          >
            <MdOutlineLibraryAdd size={22} /> Create New List
          </button>
        </div>

        <div>
          {props.lists.map((list) => (
            <RenderAllList key={list.name} list={list} />
          ))}
        </div>

        <div className="mt-16 max-w-3xl mx-auto">
          <div className="bg-surface relative rounded-2xl p-8 shadow-xl border border-surface-highlight">
            <span className="text-6xl text-brand-primary/20 font-serif absolute top-4 left-4">
              “
            </span>
            <p className="text-xl md:text-2xl font-serif text-text-secondary italic text-center relative z-10 leading-relaxed">
              A reader lives a thousand lives before he dies. The man who never
              reads lives only one.
            </p>
            <div className="mt-4 text-center">
              <span className="text-brand-light font-bold uppercase tracking-widest text-sm">
                — George R.R. Martin
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ListPageView;
