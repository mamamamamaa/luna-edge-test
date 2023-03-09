import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "@/utils/api";
import { ResponseFilms } from "@/utils/api/types";
import { RootState, RootStore } from "@/redux/store";
import { setQuery } from "@/redux/slices/films";

const { API_KEY } = process.env;

export const paginateFilms = createAsyncThunk(
  "films/paginate",
  async (page: number = 1, thunkAPI) => {
    const { films } = thunkAPI.getState() as RootState;
    const { query } = films as { query: string };

    try {
      const { data } = await instance.get<ResponseFilms>(
        `?apikey=${API_KEY}&s=${query}&page=${page}`
      );
      return data;
    } catch (err) {
      if (err instanceof Error) {
        return thunkAPI.rejectWithValue(err.message);
      }
    }
  }
);

export const searchFilms = createAsyncThunk(
  "films/search",
  async (search: string, thunkAPI) => {
    const { dispatch } = thunkAPI;
    dispatch(setQuery(search));

    try {
      const { data } = await instance.get<ResponseFilms>(
        `?apikey=${API_KEY}&s=${search}`
      );
      return data;
    } catch (err) {
      if (err instanceof Error) {
        return thunkAPI.rejectWithValue(err.message);
      }
    }
  }
);
