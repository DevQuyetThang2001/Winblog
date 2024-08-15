import "./App.css";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import BlogPage from "./pages/BlogPage";
import ContactPage from "./pages/ContactPage";
import Header from "./inc/Header";
import NotFoundPage from "./pages/NotFoundPage";
import RegisterPage from "./pages/RegisterPage";
import SignInPage from "./pages/SignInPage";
import PostDetails from "./pages/PostDetails";
import DashboardLayOut from "./pages/manager/DashboardLayOut";
import DashboardPage from "./pages/manager/DashboardPage";
import PostManage from "./pages/manager/PostManage";
import PostAddNew from "./pages/manager/PostAddNew";
import AddBanner from "./pages/manager/AddBanner";

function App() {
  return (
    <div className="container"> 
      <Routes>
        <Route path="/" element={<Header></Header>}>
          <Route path="/" element={<HomePage></HomePage>}></Route>
          <Route path="/contact" element={<ContactPage></ContactPage>}></Route>
          <Route path="/blog" element={<BlogPage></BlogPage>}></Route>
          <Route path="/:slug" element={<PostDetails></PostDetails>}></Route>
        </Route>
        <Route path="*" element={<NotFoundPage></NotFoundPage>}></Route>
        <Route path="/register" element={<RegisterPage></RegisterPage>}></Route>
        <Route path="/sign-in" element={<SignInPage></SignInPage>}></Route>
        <Route element={<DashboardLayOut></DashboardLayOut>}>
          <Route
            path="/dashboard"
            element={<DashboardPage></DashboardPage>}
          ></Route>
          <Route path="/manage/posts" element={<PostManage></PostManage>}></Route>
          <Route path="/manage/add-post" element={<PostAddNew></PostAddNew>} ></Route>
          <Route path="/manage/add-banner" element={<AddBanner></AddBanner>} ></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
