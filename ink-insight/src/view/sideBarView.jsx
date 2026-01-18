import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { MdClose, MdLogout, MdLogin, MdPerson } from "react-icons/md";

const SidebarView = (props) => {
  const {
    sidebarOpen,
    toggleDrawer,
    allPages,
    isLoggedIn,
    username,
    handleLogout,
  } = props;

  const renderSidebar = () => {
    return (
      <>
        <div
          className={`fixed inset-0 bg-canvas/80 backdrop-blur-sm z-40 transition-opacity duration-300 ${
            sidebarOpen
              ? "opacity-100 visible"
              : "opacity-0 invisible pointer-events-none"
          }`}
          onClick={toggleDrawer(false)}
        ></div>

        <div
          className={`fixed top-0 left-0 h-full w-64 bg-surface border-r border-surface-highlight shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="h-16 flex items-center justify-between px-6 border-b border-surface-highlight">
            <span className="text-xl font-bold text-text-main">Menu</span>
            <button
              onClick={toggleDrawer(false)}
              className="text-text-muted hover:text-brand-light transition-colors"
            >
              <MdClose size={24} />
            </button>
          </div>

          <nav className="p-4 space-y-2">
            {allPages.map((page) => {
              const isProtected = page.name === "Lists Page" && !isLoggedIn;

              const itemClass = `flex items-center px-4 py-3 rounded-lg transition-all duration-200 font-medium ${
                isProtected
                  ? "text-text-muted cursor-not-allowed opacity-60 hover:bg-transparent"
                  : "text-text-secondary hover:text-text-main hover:bg-surface-highlight hover:pl-6"
              }`;

              if (isProtected) {
                return (
                  <div
                    key={page.name}
                    className={itemClass}
                    onClick={() => {
                      toggleDrawer(false)({});
                      alert("Please log in to access this page");
                    }}
                  >
                    {page.name}
                  </div>
                );
              }

              return (
                <Link
                  key={page.name}
                  to={page.path}
                  className={itemClass}
                  onClick={toggleDrawer(false)}
                >
                  {page.name}
                </Link>
              );
            })}
          </nav>
        </div>
      </>
    );
  };

  return (
    <div className="relative">
      <header className="fixed top-0 left-0 w-full h-16 bg-surface/90 backdrop-blur-md border-b border-surface-highlight z-30 flex items-center justify-between px-4 md:px-8 shadow-sm">
        <div className="flex items-center gap-4">
          <button
            onClick={toggleDrawer(true)}
            className="text-text-main hover:text-brand-light transition-colors p-2 rounded-full hover:bg-surface-highlight"
            aria-label="Open menu"
          >
            <FaBars size={24} />
          </button>
          <Link
            to="/"
            className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400 tracking-tight cursor-default select-none"
            title="My Profile"
          >
            InkInsight
          </Link>
        </div>

        <div className="flex items-center gap-4">
          {isLoggedIn ? (
            <div className="flex items-center gap-4">
              <div className="hidden md:flex flex-col items-end">
                <span className="text-xs text-text-muted">Welcome back,</span>
                <span className="text-sm font-bold text-text-main leading-none">
                  {username || "User"}
                </span>
              </div>

              <div className="h-8 w-[1px] bg-surface-highlight hidden md:block"></div>

              <Link
                to="/listPage"
                className="p-2 text-text-muted hover:text-brand-light transition-colors"
                title="My Profile"
              >
                <MdPerson size={22} />
              </Link>

              <button
                onClick={handleLogout}
                className="flex items-center gap-2 bg-surface-highlight hover:bg-red-500/10 text-text-secondary hover:text-red-400 border border-surface-highlight px-4 py-2 rounded-lg transition-all text-sm font-medium"
              >
                <span>Sign Out</span>
                <MdLogout size={16} />
              </button>
            </div>
          ) : (
            <Link
              to="/signin"
              className="flex items-center gap-2 bg-brand-primary hover:bg-brand-hover text-white px-5 py-2 rounded-lg shadow-lg shadow-brand-primary/20 transition-all active:scale-95 font-medium text-sm"
            >
              <MdLogin size={18} />
              <span>Sign In</span>
            </Link>
          )}
        </div>
      </header>

      {renderSidebar()}
      <div className="h-16 w-full"></div>
    </div>
  );
};

export { SidebarView };
