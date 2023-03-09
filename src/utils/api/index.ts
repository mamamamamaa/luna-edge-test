import axios from "axios";
import { ResponseFilms } from "@/utils/api/types";

const { BASE_URL, API_KEY } = process.env;

export const instance = axios.create({
  baseURL: BASE_URL,
});

export const getFilms = async (search: string) => {
  const { data } = await instance.get<ResponseFilms>(
    `?apikey=${API_KEY}&s=${search}`
  );
  return data;
};
