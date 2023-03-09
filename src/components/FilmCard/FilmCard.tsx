import { FC } from "react";
import { Film } from "@/utils/api/types";

const DEFAULT_IMAGE =
  "https://rukminim1.flixcart.com/image/416/416/krntoy80/poster/9/x/j/medium-no-wall-poster-12-18-asstore-no-original-imag5esychwbbsek.jpeg?q=70";

interface Props {
  card: Film;
}

export const FilmCard: FC<Props> = ({ card }) => {
  const { Title = "Unknown", Year = "Unknown", Poster = DEFAULT_IMAGE } = card;

  return (
    <>
      <article className="max-w-sm w-[300px] h-[500px] rounded overflow-hidden shadow-lg cursor-pointer hover:shadow-xl">
        <img className="w-[300px] h-[380px]" src={Poster} alt="Movie poster" />
        <div className="px-6 py-4">
          <h3 className="font-bold text-xl mb-2">{Title}</h3>
          <h4 className="text-gray-700 text-base">{Year}</h4>
        </div>
      </article>
    </>
  );
};
