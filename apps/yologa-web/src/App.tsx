/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import { RecoilRoot } from "recoil";
import { IntlProvider } from "react-intl";
import { Global } from "@emotion/react";

import reset from "./styles/reset";
import Router from "./routers";
import LoadingLayer from "./layouts/LoadingLayer";

function App() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!ready) {
      setTimeout(() => {
        setReady(true);
      }, 500);
    }
  });

  return (
    <IntlProvider locale={"ko-KR"}>
      <RecoilRoot>
        <Global styles={reset} />
        <LoadingLayer isOpened={!ready} />
        {ready ? <Router /> : <></>}
      </RecoilRoot>
    </IntlProvider>
  );
}

export default App;
