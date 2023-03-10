import { GetServerSidePropsContext } from "next";
import { AnyAction, ThunkMiddleware } from "@reduxjs/toolkit";

import { getFilms } from "@/utils/api";
import { ToolkitStore } from "@reduxjs/toolkit/src/configureStore";
import { Films, setError, setFilms, setQuery } from "@/redux/slices/films";

interface Props {
  ctx: GetServerSidePropsContext;
  store: ToolkitStore<
    { films: Films },
    AnyAction,
    [ThunkMiddleware<{ films: Films }, AnyAction, undefined>]
  >;
}

export const serverSideFunction = async ({ ctx, store }: Props) => {
  try {
    const { films: state } = store.getState();
    const { data, page, query } = state;
    const search = (ctx.query.searchQuery as string) || query;

    if (data.length !== 0) {
      return { props: {} };
    }

    const films = await getFilms(search, page);

    store.dispatch(setFilms(films));
    store.dispatch(setQuery(search));

    return { props: {} };
  } catch (err) {
    if (err instanceof Error) {
      store.dispatch(setError(err.message));
    }

    return { props: {} };
  }
};
