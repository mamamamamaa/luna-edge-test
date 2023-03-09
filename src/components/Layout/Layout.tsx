import { FC, ReactNode } from "react";

import { Header } from "@/components/Header/Header";
import { Footer } from "@/components/Footer/Footer";

import style from "./Layout.module.css";

export const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <>
      <Header />
      <main className={style.mainContainer}>{children}</main>
      <Footer />
    </>
  );
};
