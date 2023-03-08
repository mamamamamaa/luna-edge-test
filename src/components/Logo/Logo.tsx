import style from "./Logo.module.css";
import Link from "next/link";
import { FC } from "react";

export const Logo: FC = () => {
  return (
    <Link href="/">
      <h2 className={style.logo}>FILMS</h2>
    </Link>
  );
};
