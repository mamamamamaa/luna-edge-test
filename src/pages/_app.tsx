import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { wrapper } from "@/redux/store";
import { Layout } from "@/components/Layout/Layout";

function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default wrapper.withRedux(App);
