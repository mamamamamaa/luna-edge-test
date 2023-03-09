import axios from "axios";
import { ResponseFilms } from "@/utils/api/types";

const { BASE_URL: URL, API_KEY: KEY } = process.env;

export const getFilms = async (search: string) => {
  const { data } = await axios.get<ResponseFilms>(
    `${URL}?apikey=${KEY}&s=${search}`
  );
  return data;
};
