import React, {PropsWithChildren, ReactNode} from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Page404 from "../pages/404"
import {getSuspendRouteMaker} from "@/routers/lib";

const PageSplash = React.lazy(() => import('../pages/Splash'))
const PageHome = React.lazy(() => import('../pages/home'))



function createRoutes() {
  const YologaSuspense = getSuspendRouteMaker(<>...loading</>);

  return (
    <Router>
      <Routes>
        <Route index element={
          <YologaSuspense>
            <PageSplash/>
          </YologaSuspense>
        }/>
        <Route path='/home' element={
          <YologaSuspense>
            <PageHome/>
          </YologaSuspense>
        }/>
        <Route path='*' element={
          <YologaSuspense>
            <Page404/>
          </YologaSuspense>
        }/>
      </Routes>
    </Router>
  );
}

export default createRoutes;
