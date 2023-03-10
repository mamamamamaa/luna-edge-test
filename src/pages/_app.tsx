import "@/styles/globals.css";

import Head from "next/head";
import type { AppProps } from "next/app";

import { wrapper } from "@/redux/store";
import { ReactReduxContext } from "react-redux";
import { Layout } from "@/components/Layout/Layout";
import { PersistGate } from "redux-persist/integration/react";

function App({ Component, pageProps }: AppProps) {
  return (
    <ReactReduxContext.Consumer>
      {({ store }) => (
        // @ts-ignore
        <PersistGate persistor={store.__persistor}>
          <Layout>
            <Head>
              <title>Films</title>
              <link rel="shortcut icon" href="/favicon.ico" />
            </Head>
            <Component {...pageProps} />
          </Layout>
        </PersistGate>
      )}
    </ReactReduxContext.Consumer>
  );
}

export default wrapper.withRedux(App);
