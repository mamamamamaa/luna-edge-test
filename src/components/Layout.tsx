import { FC, ReactNode } from "react";
import { Header } from "@/components/Header/Header";

export const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};
