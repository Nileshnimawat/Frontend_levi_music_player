import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  socket: null,
  onlineUsers: [],
  activities: {},
  usersInfo: {},
};

const socketSlice = createSlice({
  name: "socket",
  initialState,
  reducers: {
    setSocket: (state, action) => {
      state.socket = action.payload;
    },
    setOnlineUsers: (state, action) => {
      state.onlineUsers = action.payload;
    },
    setActivities: (state, action) => {
      state.activities = action.payload;
    },
    setUsersInfo: (state, action) => {
      state.usersInfo = action.payload;
    },
    updateActivity: (state, action) => {
      const { userId, activity } = action.payload;
      state.activities[userId] = activity;
    },
  },
});

export const {
  setSocket,
  setOnlineUsers,
  setActivities,
  setUsersInfo,
  updateActivity,
} = socketSlice.actions;

export default socketSlice.reducer;
