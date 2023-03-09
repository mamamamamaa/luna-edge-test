import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { wrapper } from "@/redux/store";
import { Layout } from "@/components/Layout/Layout";
import { ReactReduxContext } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

function App({ Component, pageProps }: AppProps) {
  return (
    <ReactReduxContext.Consumer>
      {({ store }) => (
        // @ts-ignore
        <PersistGate persistor={store.__persistor}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </PersistGate>
      )}
    </ReactReduxContext.Consumer>
  );
}

export default wrapper.withRedux(App);
