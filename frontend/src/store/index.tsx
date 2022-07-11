import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "../reducers/rootReducer";

import { posts_api } from "../api/websocket";

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(posts_api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
