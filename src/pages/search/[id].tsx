import { wrapper } from "@/redux/store";
import { NextPage } from "next";
import { getFilmById } from "@/utils/api";
import { setError, setFilmById } from "@/redux/slices/films";
import { useFilms } from "@/redux/hooks";
import { Rating } from "@/utils/api/types";

const Details: NextPage = () => {
  const { currentFilm } = useFilms();
  return (
    <>
      {currentFilm ? (
        <div className="flex flex-col md:flex-row justify-center items-center">
          <div className="md:w-1/2 p-4">
            <img
              className="w-full"
              src={currentFilm.Poster}
              alt={currentFilm.Title}
            />
          </div>
          <div className="md:w-1/2 p-4">
            <h1 className="text-4xl font-bold mb-2">{currentFilm.Title}</h1>
            <p className="text-gray-600 text-lg mb-4">{currentFilm.Plot}</p>
            <div className="mb-4">
              <p className="font-bold inline-block mr-2">Director:</p>
              <p className="inline-block">{currentFilm.Director}</p>
            </div>
            <div className="mb-4">
              <p className="font-bold inline-block mr-2">Actors:</p>
              <p className="inline-block">{currentFilm.Actors}</p>
            </div>
            <div className="mb-4">
              <p className="font-bold inline-block mr-2">Genre:</p>
              <p className="inline-block">{currentFilm.Genre}</p>
            </div>
            <div className="mb-4">
              <p className="font-bold inline-block mr-2">Year:</p>
              <p className="inline-block">{currentFilm.Year}</p>
            </div>
            <div className="mb-4 flex">
              <p className="font-bold inline-block mr-2">Ratings:</p>
              <ul className="inline-block list-disc ml-4">
                {currentFilm.Ratings.map((rating: Rating, index: number) => (
                  <li key={index}>
                    {rating.Source}: {rating.Value}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <p>We can't find this film</p>
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
