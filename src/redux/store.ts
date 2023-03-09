import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { FilmsReducer } from "@/redux/slices/films";
import { createWrapper } from "next-redux-wrapper";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

export function makeStore() {
  const isServer = typeof window === "undefined";
  if (isServer) {
    return configureStore({
      reducer: {
        films: FilmsReducer,
      },
    });
  } else {
    const persistConfig = {
      key: "nextjs",
      whitelist: ["savedFilms"], // make sure it does not clash with server keys
      storage,
    };

    const persistedReducer = persistReducer(persistConfig, FilmsReducer);

    const store = configureStore({
      reducer: {
        films: persistedReducer,
      },
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          immutableCheck: false,
          serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
          },
        }),
    });

    //@ts-ignore
    store.__persistor = persistStore(store);
    return store;
  }
}

export const store = makeStore();

export type RootStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<RootStore["getState"]>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export const wrapper = createWrapper<RootStore>(makeStore);
