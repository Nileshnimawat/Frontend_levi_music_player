// store/roomSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentRoomId: null,
  messages: [],
  usersInRoom: [],
  isRoomOwner: false,
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
    setIsRoomOwner: (state, action) => {
  state.isRoomOwner = action.payload;
}
  },
});

export const {
  setCurrentRoomId,
  setMessages,
  addMessage,
  setUsersInRoom,
  resetRoom,
  setIsRoomOwner
} = roomSlice.actions;

export default roomSlice.reducer;
