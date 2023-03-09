import { FC, useEffect, useState } from "react";

import { RouteLinks } from "@/components/RouteLinks/RouteLinks";
import { Logo } from "@/components/Logo/Logo";
import { MobileMenu } from "@/components/MobileMenu/MobileMenu";

import style from "./Header.module.css";
import { toast, Toaster } from "react-hot-toast";
import { useFilms } from "@/redux/hooks";

export const Header: FC = () => {
  const { error } = useFilms();
  const [navbar, setNavbar] = useState<boolean>(false);

  const handleOpen = () => setNavbar((prevState) => !prevState);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  return (
    <header className="w-full bg-white shadow">
      <Toaster />
      <div className={style.headerContainer}>
        <div>
          <div className={style.appBarMenu}>
            <Logo />
            <MobileMenu handleOpen={handleOpen} isNavbar={navbar} />
          </div>
        </div>
        <div>
          <RouteLinks isNavbar={navbar} />
        </div>
      </div>
    </header>
  );
};
