import { HomePagePresenter } from "./presenter/homePresenter";
import { AboutUsView } from "./view/about_us/aboutUsView";
import { BookDetailsPresenter } from "./presenter/bookDetailsPresenter";
import { ListPagePresenter } from "./presenter/listPagePresenter";
import { OneListPresenter } from "./presenter/oneListPresenter";
import { SidebarPresenter } from "./presenter/sidebarPresenter";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { SignUp } from "./presenter/signUpPresenter";
import { SignIn } from "./presenter/signInPresenter";

function App() {
  return (
    <BrowserRouter>
      <SidebarPresenter />
      <Routes>
        <Route path="/" element={<HomePagePresenter />} />
        <Route path="/aboutUs" element={<AboutUsView />} />
        <Route path="/bookDetails" element={<BookDetailsPresenter />} />
        <Route path="/listPage" element={<ListPagePresenter />} />
        <Route path="/oneListPage" element={<OneListPresenter />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/signIn" element={<SignIn />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
