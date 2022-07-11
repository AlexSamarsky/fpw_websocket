import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Post {
  id: number;
  title: string;
  text: string;
}

// const addPost = createAction<Post>("posts/add");

const postsSlice = createSlice({
  name: "posts",
  initialState: { posts: [] as Post[] },
  reducers: {
    addPost: (state, action: PayloadAction<Post>) => {
      state.posts.push(action.payload);
    },
  },
});

export default postsSlice.reducer;

export const { addPost } = postsSlice.actions;
