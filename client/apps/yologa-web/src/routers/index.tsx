import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import PageHome from "../pages/home";
import PageSplash from "../pages/Splash";
import PageSpaces from "../pages/spaces";
import Page404 from "../pages/404";
// const PageHome = React.lazy(() => import("../pages/Home"));

function createRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={PageSplash && <PageSplash />}></Route>
        <Route path="/home" element={PageHome && <PageHome />}></Route>
        <Route path="/spaces" element={PageSpaces && <PageSpaces />}></Route>
        <Route path="*" element={Page404 && <Page404 />}></Route>
      </Routes>
    </Router>
  );
}

export default createRoutes;

// const Login = React.lazy(() => import('./views/Pages/Login'));
// <Route exact path="/login" name="Login Page" render={props => <Login {...props}/>} />
