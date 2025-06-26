import { useEffect } from "react";
import { io } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import {
  setSocket,
  setOnlineUsers,
  setActivities,
  setUsersInfo,
  updateActivity,
} from "@/store/socketSlice";

export const useSocket = () => {
  const dispatch = useDispatch();
  const socket = useSelector((state) => state?.socket?.socket);
  const user = useSelector((state) => state?.user?.user);

  useEffect(() => {
    if (user) {
      const newSocket = io(import.meta.env.VITE_SOCKET_URL, {
        withCredentials: true,
        transports: ["polling", "websocket"],
        query: { userId: user._id },
      });

      dispatch(setSocket(newSocket));

      newSocket.emit("user_connected", {
        _id: user._id,
        name: user.name,
        coverImage: user.coverImage,
      });

     

      newSocket.on("activities", (activitiesArray) => {
        const activityMap = Object.fromEntries(activitiesArray);
        dispatch(setActivities(activityMap));
      });

      newSocket.on("users_info", (usersInfoArray) => {
        const usersMap = Object.fromEntries(usersInfoArray);
        dispatch(setUsersInfo(usersMap));
      });

      newSocket.on("activity_updated", ({ userId, activity }) => {
        dispatch(updateActivity({ userId, activity }));
      });

      newSocket.on("user_disconnected", (userId) => {
        dispatch(updateActivity({ userId, activity: { status: "Idle" } }));
      });

      return () => {
        newSocket.disconnect();
        dispatch(setSocket(null));
      };
    }

    if (!user && socket) {
      socket.disconnect();
      dispatch(setSocket(null));
      
    }
  }, [user]);


  useEffect(() => {
    if(!user || !socket) return;
     socket.on("users_online", (onlineUserIds) => {
        dispatch(setOnlineUsers(onlineUserIds));
      });
  
    return () => {
      socket.off("users_online")
    }
  }, [user, socket, dispatch])
  
};
