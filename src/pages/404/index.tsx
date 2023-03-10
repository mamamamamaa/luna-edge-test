import { ButtonBack } from "@/components/ButtonBack/ButtonBack";

import style from "./404.module.css";

export default function FourOhFour() {
  return (
    <div className={style.notFoundContainer}>
      <h1 className={style.notFoundHeader}>404 - Page Not Found</h1>
      <ButtonBack iconSize={40}>
        <span className={style.buttonBackText}>Go Back</span>
      </ButtonBack>
    </div>
  );
}
