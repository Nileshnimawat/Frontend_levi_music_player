// store/roomSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentRoomId: null,
  messages: [],
  usersInRoom: [],
};

const roomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {
    setCurrentRoomId: (state, action) => {
      state.currentRoomId = action.payload;
    },
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    setUsersInRoom: (state, action) => {
      state.usersInRoom = action.payload;
    },
    resetRoom: (state) => {
      state.currentRoomId = null;
      state.messages = [];
      state.usersInRoom = [];
    },
  },
});

export const {
  setCurrentRoomId,
  setMessages,
  addMessage,
  setUsersInRoom,
  resetRoom,
} = roomSlice.actions;

export default roomSlice.reducer;
