import { useEffect } from "react";
import cookie from "react-cookies";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { LoginPage } from "../pages/login";
import { MainPage } from "../pages/main";
import { PersonalPage } from "../pages/main/personalPage";
import { DetailPage, Teach1Page, Teach2Page, Teach3Page } from "../pages/main/detailPage";

export function Routers() {
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    console.log("in");
    let token = cookie.load("jwt_token");
    if (token) {
      localStorage.setItem("token", token);
      navigate("/main");
    }
    if (
      !localStorage.getItem("token") &&
      !location.pathname.startsWith("/login")
    ) {
      console.log("in1");
      navigate("/login");
    }
  }, [navigate, location]);

  return (
    <Routes>
      <Route path="login/*" element={<LoginPage />}>
      </Route>
      <Route path="main/*" element={<MainPage />}>
        <Route path="detail/*" element={<DetailPage />} >
          <Route path="teach1" element={<Teach1Page />} />
          <Route path="teach2" element={<Teach2Page />} />
          <Route path="teach3" element={<Teach3Page />} />
        </Route>
        <Route path="mylesson" element={<></>} />
        <Route path="experiment" element={<></>} />
        <Route path="information" element={<></>} />
        <Route path="setting" element={<></>} />
      </Route>
      <Route path="personal" element={<PersonalPage />} />

      <Route
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
      />
    </Routes>
  )
}