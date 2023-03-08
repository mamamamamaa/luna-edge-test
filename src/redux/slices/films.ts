import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/redux/store";
import { Film, ResponseFilms } from "@/utils/api/types";
import { HYDRATE } from "next-redux-wrapper";

export interface Films {
  data: Film[] | null;
  savedFilms: Film[] | null;
  totalResults: number | null;
}

const initialState: Films = {
  data: null,
  totalResults: null,
  savedFilms: null,
};

export const filmsSlice = createSlice({
  name: "films",
  initialState,
  reducers: {
    setFilms(state, action: PayloadAction<ResponseFilms>) {
      state.data = action.payload.Search;
      state.totalResults = Number(action.payload.totalResults);
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

export const { setFilms } = filmsSlice.actions;
export const FilmsReducer = filmsSlice.reducer;
