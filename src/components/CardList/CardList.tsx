import { FC } from "react";
import { useAppDispatch, useFilms } from "@/redux/hooks";
import { FilmCard } from "@/components/FilmCard/FilmCard";
import { paginateFilms } from "@/redux/operaions/films";

import style from "./CardList.module.css";
import Link from "next/link";

export const CardList: FC = () => {
  const dispatch = useAppDispatch();
  const { films, page, maxPage, isLoading } = useFilms();

  const handleLoadMore = () => {
    if (page <= maxPage && !isLoading) {
      dispatch(paginateFilms(page));
    }
  };

  return (
    <>
      <ul className={style.filmList}>
        {films.length > 0 &&
          films.map((film) => (
            <li key={film.imdbID}>
              <Link href={`/details/${film.imdbID}`}>
                <FilmCard card={film} />
              </Link>
            </li>
          ))}
      </ul>
      <button
        className={style.loadMore}
        disabled={isLoading}
        onClick={handleLoadMore}
      >
        {isLoading ? "Loading..." : "Load more"}
      </button>
    </>
  );
};
