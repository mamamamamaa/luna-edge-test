import { wrapper } from "@/redux/store";
import { NextPage } from "next";
import { getFilmById } from "@/utils/api";
import { setError, setFilmById } from "@/redux/slices/films";
import { useFilms } from "@/redux/hooks";
import { Rating } from "@/utils/api/types";
import { DetailsCard } from "@/components/DetailsCard/DetailsCard";

const Details: NextPage = () => {
  const { currentFilm } = useFilms();
  return (
    <>
      {currentFilm ? (
        <DetailsCard cardInfo={currentFilm} />
      ) : (
        <p className="text-center text-5xl font-bold mb-2">
          We can't find this film
        </p>
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
