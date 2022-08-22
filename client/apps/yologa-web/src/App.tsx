import {RecoilRoot} from "recoil";
import {IntlProvider} from "react-intl";
import {Global} from "@emotion/react";
import Layout from "@/layouts/Layout";

import reset from "./styles/reset";

function App() {
  return (
    <IntlProvider locale={"ko-KR"}>
      <RecoilRoot>
        <Global styles={reset}/>
        <Layout/>
      </RecoilRoot>
    </IntlProvider>
  );
}

export default App;
