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
import { WorkPage } from "../pages/main/workPage";

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
      <Route path="login/*" element={<LoginPage/>}>
      </Route>
      <Route path="main/*" element={<MainPage/>}>
        <Route path="personal" element={<PersonalPage />} />
        <Route path="work" element={<WorkPage />} />
      </Route>

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