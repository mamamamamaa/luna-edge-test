import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useFilms = () => {
  const films = useAppSelector((state: RootState) => state.films.data);
  const savedFilms = useAppSelector(
    (state: RootState) => state.films.savedFilms
  );
  const totalResults = useAppSelector(
    (state: RootState) => state.films.totalResults
  );

  return {
    films,
    savedFilms,
    totalResults,
  };
};
