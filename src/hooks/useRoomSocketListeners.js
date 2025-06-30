import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addMessage,
  setMessages,
  setUsersInRoom,
  setCurrentRoomId,
  setIsRoomOwner,
  setRoomOwnerId,
} from "@/store/roomSlice";
import { setCurrentMusic } from "@/store/musicSlice";

export const useRoomSocketListeners = () => {
  const socket = useSelector((state) => state.socket.socket);
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!socket) return;

    socket.on("rejoined", ({ roomId, users, messages}) => {
      if (roomId) {
        dispatch(setCurrentRoomId(roomId));
        dispatch(setUsersInRoom(users || []));
        dispatch(setMessages(messages));
      }
    });

    socket.on("room_messages", (messages) => {
      dispatch(setMessages(messages));
    });

    socket.on("receive_message", (message) => {
      dispatch(addMessage(message));
    });

    socket.on("room_users", (users) => {
      dispatch(setUsersInRoom(users));
    });

    socket.on("room_owner", ({ownerId})=>{
      console.log(ownerId)
      dispatch(setRoomOwnerId(ownerId));
      dispatch(setIsRoomOwner(ownerId === user._id))
    })

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
     socket.off("rejoined");
      socket.off("room_messages");
      socket.off("receive_message");
      socket.off("room_users");
      socket.off("receive_music");
      socket.off("receive_play_pause");
      socket.off("receive-progress");
      socket.off("room_owner");

      dispatch(setCurrentRoomId(null));
    };
  }, [socket, user, dispatch]);
};
