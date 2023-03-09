import { FC } from "react";
import { FilmCard } from "@/components/FilmCard/FilmCard";
import { Searchbar } from "@/components/Searchbar/Searchbar";
import { SearchPageHeading } from "@/components/SearchPageHeading/SearchPageHeading";
import { GetServerSideProps } from "next";
import { wrapper } from "@/redux/store";
import { getFilms } from "@/utils/api";
import { setError, setFilms } from "@/redux/slices/films";
import { log } from "util";

const Search: FC = () => {
  return (
    <div className="flex flex-col gap-14">
      <SearchPageHeading />
      <Searchbar />
      <FilmCard />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async (ctx) => {
    try {
      const { films: state } = store.getState();
      const { query } = state;

      // const films = await getFilms(query);
      // store.dispatch(setFilms(films));

      return { props: {} };
    } catch (err) {
      if (err instanceof Error) {
        store.dispatch(setError(err.message));
      }

      return { props: {} };
    }
  });

export default Search;
