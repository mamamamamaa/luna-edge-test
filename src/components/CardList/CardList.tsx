import { FC } from "react";

import { useAppDispatch, useFilms } from "@/redux/hooks";
import { paginateFilms } from "@/redux/operaions/films";
import { List } from "@/components/List/List";

import style from "./CardList.module.css";

export const CardList: FC = () => {
  const dispatch = useAppDispatch();
  const { films, page, maxPage, isLoading } = useFilms();

  const handleLoadMore = () => {
    if (page <= maxPage && !isLoading) {
      // @ts-ignore
      dispatch(paginateFilms(page));
    }
  };

  return (
    <>
      <List films={films} />
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
