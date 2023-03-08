import axios from "axios";
import { ResponseFilms } from "@/utils/api/types";

const { BASE_URL, API_KEY } = process.env;

const instance = axios.create({
  baseURL: BASE_URL,
});

export const getFilms = async (page = 1, search = "Fury") => {
  const { data } = await instance.get<ResponseFilms>(
    `?apikey=${API_KEY}&s=${search}&page=${page}`
  );
  return data;
};
