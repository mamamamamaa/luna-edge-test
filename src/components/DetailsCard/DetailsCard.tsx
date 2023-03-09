import { FC } from "react";

import { useAppDispatch } from "@/redux/hooks";
import { setSave } from "@/redux/slices/films";
import { Rating, ResponseFilmById } from "@/utils/api/types";

import style from "./DetailsCard.module.css";

interface Props {
  cardInfo: ResponseFilmById;
}

export const DetailsCard: FC<Props> = ({ cardInfo }) => {
  const {
    Poster,
    Title,
    Plot,
    Director,
    Actors,
    Genre,
    Year,
    Ratings,
    imdbID,
    Type,
  } = cardInfo;

  const dispatch = useAppDispatch();

  const extraInfo = [
    { title: "Director", value: Director },
    { title: "Actors", value: Actors },
    { title: "Genre", value: Genre },
    { title: "Year", value: Year },
  ];

  const handleSave = () =>
    dispatch(setSave({ Title, Year, imdbID, Type, Poster }));
  return (
    <>
      <div className={style.cardContainer}>
        <div className={style.imageContainer}>
          <img className="w-full" src={Poster} alt={Title} />
        </div>
        <div className={style.infoContainer}>
          <h1 className={style.title}>{Title}</h1>
          <p className={style.plot}>{Plot}</p>
          {extraInfo.map(({ value, title }, idx) => (
            <div className={style.extraInfoContainer} key={idx}>
              <p className={style.subtitle}>{title}:</p>
              <p className={style.subtitleValue}>{value}</p>
            </div>
          ))}
          <div className={style.ratingContainer}>
            <p className={style.subtitle}>Ratings:</p>
            <ul className={style.ratingList}>
              {Ratings.map((rating: Rating, index: number) => (
                <li key={index}>
                  {rating.Source}: {rating.Value}
                </li>
              ))}
            </ul>
          </div>
          <button type="button" onClick={handleSave}>
            Save to your collection
          </button>
        </div>
      </div>
    </>
  );
};
