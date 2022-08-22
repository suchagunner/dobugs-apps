import { PropsWithChildren, useEffect } from "react";
import Router from "routers";
import useMobileBrowserResize from "../hooks/useMobileBrowserResize";

export default function Layout({ children }: PropsWithChildren) {
  useMobileBrowserResize();

  return (
    <>
      <header></header>
      <main>
          <Router />
      </main>
      <footer></footer>
    </>
  );
}
