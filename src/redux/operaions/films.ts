import { createAsyncThunk } from "@reduxjs/toolkit";
import { ResponseFilms } from "@/utils/api/types";
import { RootState } from "@/redux/store";
import { setPage, setQuery } from "@/redux/slices/films";
import axios from "axios";
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();
const { BASE_URL: URL, API_KEY: KEY } = publicRuntimeConfig;

export const paginateFilms = createAsyncThunk<
  ResponseFilms | undefined,
  number
>("films/paginate", async (page: number = 1, thunkAPI) => {
  const { dispatch } = thunkAPI;
  const { films } = thunkAPI.getState() as RootState;
  const { query } = films as { query: string };

  dispatch(setPage(page + 1));

  try {
    const { data } = await axios.get<ResponseFilms>(
      `${URL}?apikey=${KEY}&s=${query}&page=${page}`
    );
    return data;
  } catch (err) {
    if (err instanceof Error) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
});

export const searchFilms = createAsyncThunk<ResponseFilms | undefined, string>(
  "films/search",
  async (search: string, thunkAPI) => {
    const { dispatch } = thunkAPI;
    dispatch(setQuery(search));

    try {
      const { data } = await axios.get<ResponseFilms>(
        `${URL}?apikey=${KEY}&s=${search}`
      );
      return data;
    } catch (err) {
      if (err instanceof Error) {
        return thunkAPI.rejectWithValue(err.message);
      }
    }
  }
);
