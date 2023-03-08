import { Film } from "@/utils/api/types";

export const findSavedFilm = (id: string, films: Film[]): Film | null => {
  return films.find((film) => film.imdbID === id) || null;
};
