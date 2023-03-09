import { wrapper } from "@/redux/store";
import { NextPage } from "next";
import { getFilmById, getFilms } from "@/utils/api";
import { setError, setFilmById, setFilms } from "@/redux/slices/films";

const Details: NextPage = () => {
  return <>Here</>;
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (ctx) => {
    try {
      const { id } = ctx.query;
      const { films } = store.getState();
      const { currentFilm } = films;

      if (currentFilm?.imdbID === id) {
        return { props: {} };
      }

      const filmById = await getFilmById(id as string);
      store.dispatch(setFilmById(filmById));

      return { props: {} };
    } catch (err) {
      if (err instanceof Error) {
        store.dispatch(setError(err.message));
      }

      return { props: {} };
    }
  }
);

export default Details;
