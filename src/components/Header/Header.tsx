import { FC, useState } from "react";

import { RouteLinks } from "@/components/RouteLinks/RouteLinks";
import { Logo } from "@/components/Logo/Logo";
import { MobileMenu } from "@/components/MobileMenu/MobileMenu";

import style from "./Header.module.css";

export const Header: FC = () => {
  const [navbar, setNavbar] = useState<boolean>(false);

  const handleOpen = () => setNavbar((prevState) => !prevState);

  return (
    <header className="w-full bg-white shadow">
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
