import { FC, ReactNode } from "react";
import { Header } from "@/components/Header/Header";

export const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <>
      <Header />
      <main className="h-screen px-4 mx-auto lg:max-w-7xl md:px-8 text-gray-700">
        {children}
      </main>
      <footer className="bg-white shadow flex justify-center items-center flex-col p-5">
        <p className="text-center w-96 text-gray-700">
          Thank you for visiting our movie site.
        </p>
        <p>We hope you enjoyed browsing our selection of films.</p>
        <p>Stay tuned for new releases and updates.</p>
      </footer>
    </>
  );
};
