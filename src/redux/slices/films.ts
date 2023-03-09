import { HYDRATE } from "next-redux-wrapper";
import {
  AnyAction,
  createSlice,
  isAnyOf,
  PayloadAction,
} from "@reduxjs/toolkit";

import { Film, ResponseFilms } from "@/utils/api/types";
import { paginateFilms, searchFilms } from "@/redux/operaions/films";
import { findSavedFilm } from "@/utils/findSavedFilm";

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
}

const initialState: Films = {
  data: [],
  page: 1,
  maxPage: 1,
  savedFilms: [],
  error: null,
  isLoading: false,
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
    setSave(state, action: PayloadAction<{ imdbID: string }>) {
      state.error = null;

      const { imdbID } = action.payload;
      const { data } = state;
      const savedFilm = data && findSavedFilm(imdbID, data);

      if (savedFilm) {
        state.savedFilms = [...state.savedFilms, savedFilm];
      } else {
        state.error = "We can't find this film";
      }
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
        };
      })
      .addCase(
        paginateFilms.fulfilled,
        (state, action: PayloadAction<ResponseFilms | undefined>) => {
          state.isLoading = false;
          if (action.payload) {
            state.data = [...state.data, ...action.payload.Search];
            state.maxPage = Math.ceil(
              Number(action.payload.totalResults) / PAGE_LIMIT
            );
          }
        }
      )
      .addCase(
        searchFilms.fulfilled,
        (state, action: PayloadAction<ResponseFilms | undefined>) => {
          state.isLoading = false;
          if (action.payload) {
            state.data = action.payload.Search;
            state.maxPage = Math.ceil(
              Number(action.payload.totalResults) / PAGE_LIMIT
            );
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

export const { setFilms, setSave, setPage, setQuery, setError } =
  filmsSlice.actions;
export const FilmsReducer = filmsSlice.reducer;
