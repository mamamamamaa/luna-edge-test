import { FC, MouseEventHandler } from "react";
import style from "@/components/Header/Header.module.css";
import { RxCross2, RxHamburgerMenu } from "react-icons/rx";

interface Props {
  isNavbar: boolean;
  handleOpen: MouseEventHandler<HTMLButtonElement>;
}

export const MobileMenu: FC<Props> = ({ isNavbar, handleOpen }) => {
  return (
    <div className="md:hidden">
      <button className={style.burgerMenu} onClick={handleOpen}>
        {isNavbar ? <RxCross2 size={30} /> : <RxHamburgerMenu size={30} />}
      </button>
    </div>
  );
};
