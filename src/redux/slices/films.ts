import { HYDRATE } from "next-redux-wrapper";
import {
  AnyAction,
  createSlice,
  isAnyOf,
  PayloadAction,
} from "@reduxjs/toolkit";

import { Film, ResponseFilmById, ResponseFilms } from "@/utils/api/types";
import { paginateFilms, searchFilms } from "@/redux/operaions/films";

const BASE_QUERY = "the act";
const PAGE_LIMIT = 10;

const extraActions = [paginateFilms, searchFilms];

export interface Films {
  data: Film[] | [];
  savedFilms: Film[] | [];
  error: string | null;
  isLoading: boolean;
  query: string;
  page: number;
  maxPage: number;
  currentFilm: ResponseFilmById | null;
}

const initialState: Films = {
  data: [],
  page: 1,
  maxPage: 1,
  savedFilms: [],
  error: null,
  isLoading: false,
  currentFilm: null,
  query: BASE_QUERY,
};

export const filmsSlice = createSlice({
  name: "films",
  initialState,
  reducers: {
    setFilms(state, action: PayloadAction<ResponseFilms>) {
      state.error = null;

      state.data = action.payload.Search;
      state.maxPage = Math.ceil(
        Number(action.payload.totalResults) / PAGE_LIMIT
      );
      state.page += 1;
    },
    setFilmById(state, action: PayloadAction<ResponseFilmById>) {
      state.error = null;
      state.currentFilm = action.payload;
    },
    setSave(state, action: PayloadAction<Film | null>) {
      state.error = null;

      const filmToSave = action.payload;
      const isAlreadySave = state.savedFilms.find(
        ({ imdbID }) => imdbID === filmToSave?.imdbID
      );

      if (filmToSave && !isAlreadySave) {
        state.savedFilms = [...state.savedFilms, filmToSave];
      } else {
        state.error = "We can't find this film, or it's already saved";
      }
    },
    deleteFromSaved(state, action: PayloadAction<string>) {
      const id = action.payload;
      state.savedFilms = state.savedFilms.filter(({ imdbID }) => imdbID !== id);
    },
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
    setQuery(state, action: PayloadAction<string>) {
      state.query = action.payload;
    },
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(HYDRATE, (state, action: AnyAction) => {
        return {
          ...state,
          ...action.payload.films,
          savedFilms: state.savedFilms,
        };
      })
      .addCase(
        paginateFilms.fulfilled,
        (state, action: PayloadAction<ResponseFilms | undefined>) => {
          state.isLoading = false;
          if (action.payload && action.payload.Search) {
            state.data = [...state.data, ...action.payload.Search];
            state.maxPage = Math.ceil(
              Number(action.payload.totalResults) / PAGE_LIMIT
            );
          } else {
            state.error = "Movies for this query are over";
          }
        }
      )
      .addCase(
        searchFilms.fulfilled,
        (state, action: PayloadAction<ResponseFilms | undefined>) => {
          state.isLoading = false;
          if (action.payload && action.payload.Search) {
            state.data = action.payload.Search;
            state.maxPage = Math.ceil(
              Number(action.payload.totalResults) / PAGE_LIMIT
            );
          } else {
            state.error = "Movie not found";
          }
        }
      )
      .addMatcher(
        isAnyOf(...extraActions.map((action) => action.pending)),
        (state) => {
          state.isLoading = true;
          state.error = null;
        }
      )
      .addMatcher(
        isAnyOf(...extraActions.map((action) => action.rejected)),
        (state, action) => {
          state.isLoading = false;
          state.error = action.payload as string;
        }
      ),
});

export const {
  setFilms,
  setSave,
  setFilmById,
  deleteFromSaved,
  setPage,
  setQuery,
  setError,
} = filmsSlice.actions;
export const FilmsReducer = filmsSlice.reducer;
