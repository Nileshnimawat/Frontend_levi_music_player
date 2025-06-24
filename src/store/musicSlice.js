import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentMusic: null,
  allMusics: [],
  currentPlaylist: [],
  currentSource: null,
  Musics:[]
};

const musicSlice = createSlice({
  name: "music",
  initialState,
  reducers: {
    setCurrentMusic: (state, action) => {
      state.currentMusic = action.payload;
    },
    setAllMusics: (state, action) => {
      state.allMusics = action.payload;
    },
    setMusics:(state, action)=>{
      state.musics = action.payload;
    },


    clearCurrentMusic: (state) => {
      state.currentMusic = null;
    },

    setCurrentPlaylist: (state, action) => {
      state.currentPlaylist = action.payload;
    },
    setCurrentSource: (state, action) => {
      state.currentSource = action.payload;
    },
  },
});

export const {
  setCurrentMusic,
  setAllMusics,
  clearCurrentMusic,
  setMusics,
  setCurrentPlaylist,
  setCurrentSource,
} = musicSlice.actions;

export default musicSlice.reducer;
