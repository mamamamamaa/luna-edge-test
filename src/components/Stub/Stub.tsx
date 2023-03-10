import { FC } from "react";

import style from "./Stub.module.css";

interface Props {
  message: string;
}

export const Stub: FC<Props> = ({ message }) => {
  return <p className={style.stub}>{message}</p>;
};
