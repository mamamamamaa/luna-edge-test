import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useFilms = () => {
  const films = useAppSelector((state: RootState) => state.films.data);
  const savedFilms = useAppSelector(
    (state: RootState) => state.films.savedFilms
  );
  const page = useAppSelector((state: RootState) => state.films.page);
  const maxPage = useAppSelector((state: RootState) => state.films.maxPage);
  const error = useAppSelector((state: RootState) => state.films.error);
  const isLoading = useAppSelector((state: RootState) => state.films.isLoading);

  return {
    error,
    isLoading,
    films,
    savedFilms,
    page,
    maxPage,
  };
};
