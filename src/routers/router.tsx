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
import { DetailPage, Teach1Page, Teach2Page, Teach3Page } from "../pages/main/detailPage";

export function Routers() {
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
      navigate("/main/detail");
    
  }, [navigate, location]);

  return (
    <Routes>
      {/* <Route path="login/*" element={<LoginPage />}/> */}
      <Route path="main/*" element={<MainPage />}>
        <Route path="detail/*" element={<DetailPage />} >
          <Route path="teach1" element={<Teach1Page />} />
          <Route path="teach2" element={<Teach2Page />} />
          <Route path="teach3" element={<Teach3Page />} />
        </Route>
        <Route path="mysecret" element={<></>} />
        <Route path="secretshare" element={<></>} />
        <Route path="information" element={<></>} />
        <Route path="setting" element={<></>} />
      </Route>
      <Route path="personal/*" element={<PersonalPage />} >
        <Route path="personalInfo" element={<Teach1Page />} />
        <Route path="setFriendsUser" element={<Teach2Page />} />
        <Route path="3" element={<Teach3Page />} />
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