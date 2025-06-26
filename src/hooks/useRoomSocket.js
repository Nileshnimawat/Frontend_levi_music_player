// hooks/useRoomSocket.js
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMessage, setMessages, setUsersInRoom } from "@/store/roomSlice";
import { setCurrentMusic } from "@/store/musicSlice";
import { setIsRoomOwner } from "@/store/roomSlice";

export const useRoomSocket = () => {
  const socket = useSelector((state) => state.socket.socket);
  const user = useSelector((state) => state.user.user);
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
      console.log("🎧 New music received:", music);

      dispatch(setCurrentMusic(music));
    });

    socket.on("receive_play_pause", ({ isPlaying }) => {
      const audio = document.getElementById("room-audio");
      if (!audio) return;
      if (isPlaying) audio.play();
      else audio.pause();
    });

    return () => {
      socket.off("room_messages");
      socket.off("receive_message");
      socket.off("room_users");
      socket.off("receive_music");
      socket.off("receive_play_pause");
    };
  }, [socket, dispatch]);


  const setRoomMusic = (music, roomId) => {
    if (socket && roomId && music) {
      socket.emit("send_music", { roomId, music });
    }
  };
  const toggleRoomPlayPause = (isPlaying, roomId) => {
    if (socket && roomId) {
      socket.emit("toggle_play_pause", { isPlaying, roomId });
    }
  };
  

  const syncProgress = (currentTime, roomId) => {
    socket?.emit("sync-progress", { roomId, currentTime });
  };



  const onReceiveProgress = (callback) => {
    socket?.on("receive-progress", ({ currentTime }) => {
      callback(currentTime);
    });
  };

  const leaveRoom = (roomId) => {
    if (!socket || !roomId) return;
    socket.emit("leave_room", roomId);
  };
  const sendMessage = ({ roomId, text }) => {
    if (!socket || !user) return;

    socket.emit("send_message", {
      roomId,
      message: {
        user: {
          _id: user._id,
          name: user.name,
          coverImage: user.coverImage,
        },
        text,
      },
    });
  };
const createRoom = (callback) => {
  if (!socket) return;
  socket.emit("create_room", (roomId) => {
    dispatch(setIsRoomOwner(true)); 
    if (callback) callback(roomId);
  });
};

const joinRoom = (roomId, user) => {
  if (!socket) return;

  socket.emit("join_room", { roomId, user });
};

  return {
    joinRoom,
    leaveRoom,
    sendMessage,
    createRoom,
    setRoomMusic,
    toggleRoomPlayPause,
    onReceiveProgress,
    syncProgress,
  };
};
