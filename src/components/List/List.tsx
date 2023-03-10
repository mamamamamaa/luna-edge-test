import { FC } from "react";
import Link from "next/link";

import { Film } from "@/utils/api/types";
import { Stub } from "@/components/Stub/Stub";
import { FilmCard } from "@/components/FilmCard/FilmCard";

import style from "./List.module.css";

interface Props {
  films: Film[] | [];
}

export const List: FC<Props> = ({ films }) => {
  return (
    <>
      {films.length > 0 ? (
        <ul className={style.filmList}>
          {films.map((film) => (
            <li key={film.imdbID}>
              <Link href={`/details/${film.imdbID}`}>
                <FilmCard card={film} />
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <Stub message="Nothing found" />
      )}
    </>
  );
};
