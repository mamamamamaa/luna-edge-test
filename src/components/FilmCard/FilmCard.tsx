import { FC } from "react";
import { Film } from "@/utils/api/types";

const DEFAULT_IMAGE =
  "https://rukminim1.flixcart.com/image/416/416/krntoy80/poster/9/x/j/medium-no-wall-poster-12-18-asstore-no-original-imag5esychwbbsek.jpeg?q=70";

interface Props {
  card?: Film;
}

export const FilmCard: FC<Props> = ({ card }) => {
  // const { Title = "Unknown", Year = "Unknown", Poster = DEFAULT_IMAGE } = card;

  return (
    <>
      <article className="max-w-sm rounded overflow-hidden shadow-lg cursor-pointer hover:shadow-xl">
        <img
          className="w-full"
          src="https://m.media-amazon.com/images/M/MV5BN2EwM2I5OWMtMGQyMi00Zjg1LWJkNTctZTdjYTA4OGUwZjMyXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg"
          alt="Movie poster"
        />
        <div className="px-6 py-4">
          <h3 className="font-bold text-xl mb-2">Mad Max: Fury Road</h3>
          <h4 className="text-gray-700 text-base">Year: 2015</h4>
        </div>
      </article>
    </>
  );
};
