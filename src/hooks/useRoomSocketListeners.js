// hooks/useRoomSocketListeners.js
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addMessage,
  setMessages,
  setUsersInRoom,
  setCurrentRoomId,
} from "@/store/roomSlice";
import { setCurrentMusic } from "@/store/musicSlice";

export const useRoomSocketListeners = () => {
  const socket = useSelector((state) => state.socket.socket);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!socket) return;

    socket.on("room_messages", (messages) => {
      dispatch(setMessages(messages));
    });

    socket.on("receive_message", (message) => {
      dispatch(addMessage(message));
    });

    socket.on("room_users", (users) => {
      dispatch(setUsersInRoom(users));
    });

    socket.on("receive_music", ({ music }) => {
      dispatch(setCurrentMusic(music));
    });

    socket.on("receive_play_pause", ({ isPlaying }) => {
      const audio = document.getElementById("room-audio");
      if (!audio) return;
      isPlaying ? audio.play() : audio.pause();
    });
    
    socket.on("receive-progress", ({ currentTime }) => {
      const audio = document.getElementById("room-audio");
      if (audio) {
        audio.currentTime = currentTime;
      }
    });

    return () => {
      socket.off("room_messages");
      socket.off("receive_message");
      socket.off("room_users");
      socket.off("receive_music");
      socket.off("receive_play_pause");
      dispatch(setCurrentRoomId(null));
    };
  }, [socket, dispatch]);
};
