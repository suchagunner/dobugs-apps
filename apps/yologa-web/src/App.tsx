import { RecoilRoot } from "recoil";
import { IntlProvider } from "react-intl";
import Router from "./routers";

function App() {
  return (
    <IntlProvider locale={"ko-KR"}>
      <RecoilRoot>
        <Router />
      </RecoilRoot>
    </IntlProvider>
  );
}

export default App;
