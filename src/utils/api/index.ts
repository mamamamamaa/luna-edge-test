import axios from "axios";
import { ResponseFilmById, ResponseFilms } from "@/utils/api/types";

const { BASE_URL: URL, API_KEY: KEY } = process.env;

export const getFilms = async (search: string) => {
  const { data } = await axios.get<ResponseFilms>(
    `${URL}?apikey=${KEY}&s=${search}`
  );
  return data;
};

export const getFilmById = async (id: string) => {
  const { data } = await axios.get<ResponseFilmById>(
    `${URL}?apikey=${KEY}&i=${id}`
  );
  return data;
};
