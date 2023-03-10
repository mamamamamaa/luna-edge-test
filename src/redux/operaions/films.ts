import axios from "axios";
import getConfig from "next/config";

import { RootState } from "@/redux/store";
import { ResponseFilms } from "@/utils/api/types";
import { createAsyncThunk } from "@reduxjs/toolkit";

const { publicRuntimeConfig } = getConfig();
const { BASE_URL: URL, API_KEY: KEY } = publicRuntimeConfig;

export const paginateFilms = createAsyncThunk<
  ResponseFilms | undefined,
  number
>("films/paginate", async (page: number = 1, thunkAPI) => {
  const { films } = thunkAPI.getState() as RootState;
  const { query } = films as { query: string };

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
