import { PropsWithChildren, useEffect } from "react";
import Router from "routers";
import AppReadyContext from "store/context/app.ready";

function handleResize() {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
}

export default function Layout({ children }: PropsWithChildren) {
  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <header></header>
      <main>
        <AppReadyContext.Consumer>
          {(value) => value && <Router />}
        </AppReadyContext.Consumer>
      </main>
      <footer></footer>
    </>
  );
}
