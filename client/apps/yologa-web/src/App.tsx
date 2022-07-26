import { useEffect, useState } from "react";
import { RecoilRoot } from "recoil";
import { IntlProvider } from "react-intl";
import { Global } from "@emotion/react";
import AppReadyContext from "store/context/app.ready";
import Layout from "layouts/Layout";

import reset from "./styles/reset";
import LoadingLayer from "./components/commons/LoadingLayer";

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
      <AppReadyContext.Provider value={ready}>
        <RecoilRoot>
          <Global styles={reset} />
          <LoadingLayer isOpened={!ready} />
          <Layout />
        </RecoilRoot>
      </AppReadyContext.Provider>
    </IntlProvider>
  );
}

export default App;
