import { combineReducers } from "@reduxjs/toolkit";
import postsReducer from "./postsSlice";

import { posts_api } from "../api/websocket";

export const rootReducer = combineReducers({
  post: postsReducer,
  [posts_api.reducerPath]: posts_api.reducer,
});
