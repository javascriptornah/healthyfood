import "../styles/globals.scss";
import "../styles/nprogress.css";
import Layout from "../components/Layout";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { useState, createContext } from "react";
import NProgress from "nprogress";
import Router from "next/router";
import { Analytics } from "@vercel/analytics/react";
export const AppContext = createContext();

Router.events.on("routeChangeStart", (url) => {
  console.log(`Loading: ${url}`);
  NProgress.start();
});
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

function MyApp({ Component, pageProps }) {
  const [context, setContext] = useState({ name: "k" });

  return (
    <AppContext.Provider value={[context, setContext]}>
      <Layout>
        <Component {...pageProps} />
        <Analytics />
      </Layout>
    </AppContext.Provider>
  );
}

export default MyApp;
