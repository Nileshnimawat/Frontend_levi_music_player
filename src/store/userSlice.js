import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },

    toggleLikedSong: (state, action) => {
      const songId = action.payload;
      const exists = state.user?.liked_playlist?.includes(songId);

      if (exists) {
        state.user.liked_playlist = state.user.liked_playlist.filter(
          (id) => id !== songId
        );
      } else {
        state.user.liked_playlist = [songId, ...state.user.liked_playlist];
      }
    },
  },
});

export const { setUser, toggleLikedSong, toggleTriggerLike } =
  userSlice.actions;

export default userSlice.reducer;
