import { createSlice } from "@reduxjs/toolkit";

// initial state stored globally - data globally accessible, negates the need to pass props and states down to components
const initialState = {
  // dark/light mode
  mode: "light",
  // auth information
  user: null,
  token: null,
  // includes all posts
  posts: [],
};

export const authSlice = createSlice({
  // auth workflow
  name: "auth",
  // passing initial state into initial state
  initialState,
  // actions/function that modify the global state
  reducers: {
    // changing between light and dark mode
    setMode: (state) => {
      // if state.mode = light, then change to dark, if it is = dark then change to light
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    // action - set the payload (params or arguments for the func)
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    setFriends: (state, action) => {
      if (state.user) {
        state.user.friends = action.payload.friends;
      } else {
        console.error("user's friends non-existent");
      }
    },
    setFeed: (state, action) => {
      state.posts = action.payload.posts;
    },
    setPost: (state, action) => {
      const updatedPosts = state.posts.map((post) => {
        if (post._id === action.payload.post._id) return action.payload.post;
        return post;
      });
      state.posts = updatedPosts;
    },
  },
});

export const { setMode, setLogin, setLogout, setFriends, setFeed, setPost } =
  authSlice.actions;
export default authSlice.reducer;
