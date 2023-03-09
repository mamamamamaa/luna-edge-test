import {
  AnyAction,
  createSlice,
  isAnyOf,
  PayloadAction,
} from "@reduxjs/toolkit";
import { Film, ResponseFilms } from "@/utils/api/types";
import { HYDRATE } from "next-redux-wrapper";
import { findSavedFilm } from "@/utils/findSavedFilm";
import { paginateFilms, searchFilms } from "@/redux/operaions/films";

const BASE_QUERY = "Fury";

const extraActions = [paginateFilms, searchFilms];

export interface Films {
  data: Film[] | [];
  savedFilms: Film[] | [];
  totalResults: number | null;
  error: string | null;
  isLoading: boolean;
  query: string;
}

const initialState: Films = {
  data: [],
  totalResults: null,
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
      state.totalResults = Number(action.payload.totalResults);
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
            state.totalResults = Number(action.payload.totalResults);
          }
        }
      )
      .addCase(
        searchFilms.fulfilled,
        (state, action: PayloadAction<ResponseFilms | undefined>) => {
          state.isLoading = false;
          if (action.payload) {
            state.data = action.payload.Search;
            state.totalResults = Number(action.payload.totalResults);
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

export const { setFilms, setSave, setQuery, setError } = filmsSlice.actions;
export const FilmsReducer = filmsSlice.reducer;
