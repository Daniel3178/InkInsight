import { useState } from "react";
import { getUsername } from "../store/userAccountSlice";
import { useSelector } from "react-redux";
import { ALL_PAGES, SETTING_PAGES } from "../utilities/utilities";
import { SidebarView } from "../view/sideBarView";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebaseConfig";

const SidebarPresenter = () => {
  const username = useSelector(getUsername);
  const isLoggedIn = username !== null;
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleSettingsOpenClick = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleSettingsCloseClick = () => {
    setAnchorElUser(null);
  };

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setSidebarOpen(open);
  };

  const handleSignOutACB = () => {
    if (isLoggedIn === true) {
      signOut(auth)
        .then(() => {
          alert(`You've successfully signed out!`);
          navigate("/");
        })
        .catch((err) => {});
    } else {
      alert("You are already signed out!");
    }
  };

  return (
    <SidebarView
      sidebarOpen={sidebarOpen}
      username={username}
      anchorElUser={anchorElUser}
      handleSettingsOpenClick={handleSettingsOpenClick}
      handleSettingsCloseClick={handleSettingsCloseClick}
      toggleDrawer={toggleDrawer}
      settingsPages={SETTING_PAGES}
      allPages={ALL_PAGES}
      isLoggedIn={isLoggedIn}
      handleLogout={handleSignOutACB}
    />
  );
};

export { SidebarPresenter };
