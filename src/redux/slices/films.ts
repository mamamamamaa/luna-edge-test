import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/redux/store";
import { Film, ResponseFilms } from "@/utils/api/types";

export interface Films {
  data: Film[] | null;
  totalResults: number | null;
}

const initialState: Films = {
  data: null,
  totalResults: null,
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
});

export const { setFilms } = filmsSlice.actions;

export const selectFilmsData = (state: RootState) => state.films.data;

export const FilmsReducer = filmsSlice.reducer;
