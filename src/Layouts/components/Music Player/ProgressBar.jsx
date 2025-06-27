import { useRoomSocketActions } from "@/hooks/useRoomSocketActions";
import React, { useRef } from "react";
import { useSelector } from "react-redux";

const ProgressBar = ({ currentTime, duration, audioRef }) => {
  const sliderRef = useRef(null);
  const { syncProgress } = useRoomSocketActions();

  const roomId = useSelector((state) => state.room.currentRoomId);
  const isRoomOwner = useSelector((state) => state.room.isRoomOwner);

  const handleSeek = () => {
     if (roomId && !isRoomOwner) return;

    if (!audioRef?.current || !sliderRef?.current) return;
   
    const seekValue = sliderRef.current.value;
    const newTime = (seekValue / 100) * duration;

    audioRef.current.currentTime = newTime;

    if (isRoomOwner && roomId) {
      syncProgress(newTime, roomId);
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div className="w-full md:w-full flex items-center space-x-2 pt-1">
      <span className="text-xs text-gray-400">{formatTime(currentTime)}</span>

      <input
        ref={sliderRef}
        type="range"
        min="0"
        max="100"
        value={(currentTime / duration) * 100 || 0}
        onChange={handleSeek}
        className="w-full h-1 rounded-lg bg-gray-600 cursor-pointer accent-white"
      />

      <span className="text-xs text-gray-400">{formatTime(duration)}</span>
    </div>
  );
};

export default ProgressBar;
