import { useSelector } from "react-redux";
import { useEffect } from "react";

export const useUpdateActivity = () => {
  const socket = useSelector((state) => state?.socket?.socket);
  const user = useSelector((state) => state?.user?.user);
  const currentMusic = useSelector((state) => state?.music?.currentMusic);

  useEffect(() => {
    if (!socket || !user) return;

    if (currentMusic && currentMusic.title && currentMusic.artist) {
      socket.emit("update_current_music", {
        userId: user._id,
        music: {
          title: currentMusic.title,
          artist: currentMusic.artist,
        },
      });
    } else {
      socket.emit("update_current_music", {
        userId: user._id,
        music: null, // sets to Idle
      });
    }
  }, [currentMusic, socket, user]);
};
