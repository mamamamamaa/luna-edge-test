import { wrapper } from "@/redux/store";
import { NextPage } from "next";
import { getFilmById } from "@/utils/api";
import { setError, setFilmById } from "@/redux/slices/films";
import { useFilms } from "@/redux/hooks";
import { DetailsCard } from "@/components/DetailsCard/DetailsCard";
import { Stub } from "@/components/Stub/Stub";

const Details: NextPage = () => {
  const { currentFilm } = useFilms();
  return (
    <>
      {currentFilm ? (
        <DetailsCard cardInfo={currentFilm} />
      ) : (
        <Stub message="We can't find this film" />
      )}
    </>
  );
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
