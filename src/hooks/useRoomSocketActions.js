import { useSelector, useDispatch } from "react-redux";
import { setIsRoomOwner, setCurrentRoomId, setRoomOwnerId } from "@/store/roomSlice";
import { useEffect } from "react";

export const useRoomSocketActions = () => {
  const socket = useSelector((state) => state.socket.socket);
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

   useEffect(() => {
    if (!socket) return;
    socket.emit("try_reconnect");
  }, [socket, user]);

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
      dispatch(setCurrentRoomId(roomId));
      if (callback) callback(roomId);
    });
  };

  const joinRoom = (roomId) => {
    if (!socket || !user) return;
    socket.emit("join_room", { roomId, user });
    dispatch(setCurrentRoomId(roomId));
  };

  const leaveRoom = (roomId) => {
    if (!socket || !roomId) return;
    socket.emit("leave_room", {roomId, userId : user._id});
 
    dispatch(setCurrentRoomId(null));
    dispatch(setRoomOwnerId(null));
    dispatch(setIsRoomOwner(false));
  };

  const setRoomMusic = (music, roomId) => {
    if (!socket || !roomId || !music) return;
    socket.emit("send_music", { roomId, music });
  };

  const toggleRoomPlayPause = (isPlaying, roomId) => {
    if (!socket || !roomId) return;
    socket.emit("toggle_play_pause", { isPlaying, roomId });
  };

  const syncProgress = (currentTime, roomId) => {
    if (!socket || !roomId) return;
    socket.emit("sync-progress", { roomId, currentTime });
  };

  return {
    sendMessage,
    createRoom,
    joinRoom,
    leaveRoom,
    setRoomMusic,
    toggleRoomPlayPause,
    syncProgress,
  };
};
