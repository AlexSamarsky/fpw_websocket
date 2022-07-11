import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { Post } from "../reducers/postsSlice";

var socket: WebSocket;

export function getSocket() {
  if (!socket) {
    socket = new WebSocket("ws://0.0.0.0:3003");
  }
  return socket;
}

export const posts_api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "http://0.0.0.0:3003/" }),
  reducerPath: "ws_posts",
  endpoints: (build) => ({
    getPosts: build.query<Post[], void>({
      queryFn: () => ({ data: [] }),
      async onCacheEntryAdded(
        arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) {
        const ws = getSocket();
        try {
          await cacheDataLoaded;
          const listener = (event: MessageEvent) => {
            try {
              const data = JSON.parse(event.data);
              updateCachedData((draft) => {
                draft.push(data);
              });
            } catch {}
          };
          ws.addEventListener("message", listener);
        } catch {}
        await cacheEntryRemoved;
        ws.close();
      },
    }),
    newPost: build.mutation<Post, Post>({
      query: (data) => ({
        url: "news",
        method: "POST",
        body: data,
        mode: "no-cors",
      }),
    }),
  }),
});

export const { useGetPostsQuery, useNewPostMutation } = posts_api;
