import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  playlists: [],
  globalPlaylists: [],
};

const playlistSlice = createSlice({
  name: "playlist",
  initialState,
  reducers: {
    setPlaylists: (state, action) => {
      state.playlists = action.payload;
    },
    setGlobalPlaylists: (state, action) => {
      state.globalPlaylists = action.payload;
    },
    addPlaylist: (state, action) => {
      state.playlists.push(action.payload);
    },
    removePlaylist: (state, action) => {
      const playlistId = action.payload;
      state.playlists = state.playlists.filter((p) => p._id !== playlistId);
    },


  },
});

export const {
  setPlaylists,
  setGlobalPlaylists,
  addPlaylist,
  removePlaylist,
} = playlistSlice.actions;

export default playlistSlice.reducer;
