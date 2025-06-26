// hooks/useRoomSocket.js
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addMessage,
  setMessages,
  setUsersInRoom,
} from "@/store/roomSlice";

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

    return () => {
      socket.off("room_messages");
      socket.off("receive_message");
      socket.off("room_users");
    };
  }, [socket, dispatch]);



  const joinRoom = (roomId, user) => {
    if (!socket) return;
    socket.emit("join_room", { roomId, user });
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
      if (callback) callback(roomId);
    });
  };

  return {
    joinRoom,
    leaveRoom,
    sendMessage,
    createRoom,
  };
};
