import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentMusic: null,
  allMusics: [],
  likedMusics: [],
  filteredMusics: [],
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
    setFilteredMusics: (state, action) => {
      state.filteredMusics = action.payload;
    },
    likeMusic: (state, action) => {
      const music = action.payload;
      if (!state.likedMusics.find((m) => m.id === music.id)) {
        state.likedMusics.unshift({
          ...music,
          likedDate: new Date().toLocaleDateString(),
        });
      }
    },
    unlikeMusic: (state, action) => {
      const musicId = action.payload;
      state.likedMusics = state.likedMusics.filter((m) => m.id !== musicId);
    },
    clearCurrentMusic: (state) => {
      state.currentMusic = null;
    },
    setLikedMusics: (state, action) => {
      state.likedMusics = action.payload;
    },
  },
});

export const {
  setCurrentMusic,
  setAllMusics,
  likeMusic,
  unlikeMusic,
  clearCurrentMusic,
  setLikedMusics,
   setFilteredMusics
} = musicSlice.actions;

export default musicSlice.reducer;
