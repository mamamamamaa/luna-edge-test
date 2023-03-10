import { FC } from "react";
import Link from "next/link";

import style from "./Logo.module.css";

export const Logo: FC = () => {
  return (
    <Link href="/">
      <h2 className={style.logo}>FILMS</h2>
    </Link>
  );
};
