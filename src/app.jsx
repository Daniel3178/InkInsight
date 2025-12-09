import React from "react";
import { HomePagePresenter } from "./presenter/homePresenter";
import { AboutUsView } from "./view/about_us/aboutUsView";
import { BookDetailsPresenter } from "./presenter/bookDetailsPresenter";
import { ListPagePresenter } from "./presenter/listPagePresenter";
import { OneListPresenter } from "./presenter/oneListPresenter";
import { SidebarPresenter } from "./presenter/sidebarPresenter";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { SignUp } from "./presenter/signUpPresenter";
import { SignIn } from "./presenter/signInPresenter";
import HomePageMoviePresenter from "./presenter/homePageMoviePresenter";
import "./index.css";
function App() {
  return (
    <BrowserRouter>
      <div style={{ display: "flex" }}>
        <SidebarPresenter />

        <div style={{ marginLeft: 250, flexGrow: 1 }}>
          <Routes>
            <Route path="/" element={<HomePagePresenter />} />
            <Route path="/aboutUs" element={<AboutUsView />} />
            <Route path="/bookDetails" element={<BookDetailsPresenter />} />
            <Route path="/listPage" element={<ListPagePresenter />} />
            <Route path="/oneListPage" element={<OneListPresenter />} />
            <Route path="/signUp" element={<SignUp />} />
            <Route path="/signIn" element={<SignIn />} />
            <Route path="/movie" element={<HomePageMoviePresenter />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
