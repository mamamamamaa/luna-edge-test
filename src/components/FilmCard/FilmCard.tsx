import { FC } from "react";
import { Film } from "@/utils/api/types";

import style from "./FilmCard.module.css";

const DEFAULT_IMAGE =
  "https://rukminim1.flixcart.com/image/416/416/krntoy80/poster/9/x/j/medium-no-wall-poster-12-18-asstore-no-original-imag5esychwbbsek.jpeg?q=70";

const truncateString = (str: string, num: number = 40): string =>
  str.length <= num ? str : str.substring(0, num) + "...";

interface Props {
  card: Film;
}

export const FilmCard: FC<Props> = ({ card }) => {
  const { Title = "Unknown", Year = "Unknown", Poster } = card;

  const truncateTitle = truncateString(Title);
  const imageURL = Poster === "N/A" ? DEFAULT_IMAGE : Poster;

  return (
    <>
      <article className={style.cardContainer}>
        <img className={style.image} src={imageURL} alt="Movie poster" />
        <div className={style.infoContainer}>
          <h3 className={style.title}>{truncateTitle}</h3>
          <h4 className={style.year}>{Year}</h4>
        </div>
      </article>
    </>
  );
};
