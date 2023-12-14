import { useEffect } from "react";
// import cookie from "react-cookies";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
// import { LoginPage } from "../pages/login";
import { MainPage } from "../pages/main";
import { PersonalPage } from "../pages/personInfo";
import { DetailPage } from "../pages/main/detailPage";
import { LoginPage } from "../pages/admin/adminLogin";
import { loadavg } from "os";
import { AdminMainPage, MainContent } from "../pages/admin";
import { ArticleManagerPage } from "../pages/admin/articlePublish";
import { ArticlePage } from "../pages/main/articlePage";
import { ArticleEdit } from "../pages/admin/articleEdit";
import { CommentManagerPage } from "../pages/admin/commentEdit";

export function Routers() {
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    console.log(location.pathname);
    if (!location.pathname.startsWith("/admin")) {
      navigate("/main/detail", { state: { className: "" } });
    } else if (location.pathname.startsWith("/admin/main")) {
      navigate("/admin/main/article");
    } else if (location.pathname.startsWith("/admin")) {
      navigate("/admin/login");
    }
  }, []);

  return (
    <Routes>
      {/* <Route path="login/*" element={<LoginPage />}/> */}
      <Route path="main/*" element={<MainPage />}>
        <Route path="detail" element={<DetailPage />} />
        <Route path="classify" element={<>分类</>} />
        <Route path="filed" element={<>归档</>} />
        <Route path="about" element={<>关于</>} />
        <Route path="friendLink" element={<>友情链接</>} />
        <Route path="article" element={<ArticlePage />} />
      </Route>
      {/* <Route path="personal/*" element={<PersonalPage />}>
        <Route path="personalInfo" element={<Teach1Page />} />
        <Route path="setFriendsUser" element={<Teach2Page />} />
        <Route path="3" element={<Teach3Page />} />
      </Route> */}
      <Route path="admin/*" element={<AdminMainPage />}>
        <Route path="login" element={<LoginPage />} />
        <Route path="main/*" element={<MainContent />}>
          <Route path="article/*" element={<ArticleManagerPage />} />
          <Route path="comment" element={<CommentManagerPage />} />
          <Route path="3" element={<>nothing</>} />
        </Route>
      </Route>
      <Route path="setting" element={<>设置</>} />
      {/* <Route
        index
        element={
          <Navigate
            to={
              localStorage.getItem("token") === null
                ? "/login"
                : "/main"
            }
            replace
          />
        }
      /> */}
    </Routes>
  );
}
