import { FC } from "react";

import style from "./Footer.module.css";

export const Footer: FC = () => {
  return (
    <footer className={style.footer}>
      <p>&copy; 2023 My Movie Site. All rights reserved.</p>
    </footer>
  );
};
