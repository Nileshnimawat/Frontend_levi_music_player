import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  playlists: [], // array of playlists
};

const playlistSlice = createSlice({
  name: "playlist",
  initialState,
  reducers: {
    setPlaylists: (state, action) => {
      state.playlists = action.payload;
    },
    addPlaylist: (state, action) => {
      state.playlists.push(action.payload);
    },
    removePlaylist: (state, action) => {
      const playlistId = action.payload;
      state.playlists = state.playlists.filter((p) => p._id !== playlistId);
    },

    addSongToPlaylist: (state, action) => {
      const { playlistId, music } = action.payload;
      const playlist = state.playlists.find((p) => p._id === playlistId);
      if (playlist && !playlist.musics.find((s) => s._id === music._id)) {
        playlist.musics.push(music._id);
      }
    },
    removeSongFromPlaylist: (state, action) => {
      const { playlistId, musicId } = action.payload;
      const playlist = state.playlists.find((p) => p._id === playlistId);
      if (playlist) {
        playlist.musics = playlist.musics.filter((music) => music !== musicId);
      }
    },
  },
});

export const {
  setPlaylists,
  addPlaylist,
  removePlaylist,
  addSongToPlaylist,
  removeSongFromPlaylist,
} = playlistSlice.actions;

export default playlistSlice.reducer;
