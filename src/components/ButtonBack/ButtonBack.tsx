import { FC, ReactNode } from "react";
import { useRouter } from "next/router";
import { BiArrowBack } from "react-icons/bi";

import style from "./ButtonBack.module.css";

interface Props {
  children?: ReactNode;
  iconSize?: number;
}

export const ButtonBack: FC<Props> = ({ children, iconSize = 30 }) => {
  const router = useRouter();

  const handleBack = () => router.back();
  return (
    <button type="button" className={style.button} onClick={handleBack}>
      <BiArrowBack size={iconSize} />
      {children}
    </button>
  );
};
