import { FC } from "react";
import Link from "next/link";

import style from "./RouteLinks.module.css";

interface Props {
  isNavbar: boolean;
}

interface Links {
  name: string;
  to: string;
}

const routeLinks: readonly Links[] = [
  { name: "Search", to: "/search" },
  { name: "Saved", to: "/saved" },
];

export const RouteLinks: FC<Props> = ({ isNavbar }) => {
  return (
    <nav className={`${style.navigation} ${isNavbar ? "block" : "hidden"}`}>
      <ul className={style.navigationList}>
        {routeLinks.map(({ name, to }, idx) => (
          <li key={idx} className={style.listItem}>
            <Link href={to}>{name}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
