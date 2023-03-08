import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/redux/store";
import { Film, ResponseFilms } from "@/utils/api/types";
import { HYDRATE } from "next-redux-wrapper";
import { findSavedFilm } from "@/utils/findSavedFilm";

export interface Films {
  data: Film[] | [];
  savedFilms: Film[] | [];
  totalResults: number | null;
  error: string | null;
}

const initialState: Films = {
  data: [],
  totalResults: null,
  savedFilms: [],
  error: null,
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
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.films,
      };
    },
  },
});

export const { setFilms, setSave, setError } = filmsSlice.actions;
export const FilmsReducer = filmsSlice.reducer;
