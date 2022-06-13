import { RecoilRoot } from "recoil";
import { IntlProvider } from "react-intl";
import { Global } from "@emotion/react";
import reset from "./styles/reset";
import Router from "./routers";

function App() {
  return (
    <IntlProvider locale={"ko-KR"}>
      <RecoilRoot>
        <Global styles={reset} />
        <Router />
      </RecoilRoot>
    </IntlProvider>
  );
}

export default App;
