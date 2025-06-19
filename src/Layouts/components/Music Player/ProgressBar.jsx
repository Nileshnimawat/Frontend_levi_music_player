import React, { useRef } from "react";

const ProgressBar = ({ currentTime, duration, audioRef }) => {
  const sliderRef = useRef(null);

  const handleSeek = () => {
    const seekValue = sliderRef.current.value;
    audioRef.current.currentTime = (seekValue / 100) * duration;
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div className="w-full md:w-full flex items-center space-x-2">
      <span className="text-xs text-gray-400">{formatTime(currentTime)}</span>

      <input
        ref={sliderRef}
        type="range"
        min="0"
        max="100"
        value={(currentTime / duration) * 100 || 0}
        onChange={handleSeek}
        className="w-full h-1 rounded-lg bg-gray-600 cursor-pointer accent-green-500"
      />

      <span className="text-xs text-gray-400">{formatTime(duration)}</span>
    </div>
  );
};

export default ProgressBar;
