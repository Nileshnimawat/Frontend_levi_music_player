import React from "react";
const ProgressBar = ({ currentTime, duration, audioRef }) => {
    // Calculate progress percentage
    const progress = (currentTime / duration) * 100 || 0;
  
    // Seek functionality (when user clicks on the bar)
    const handleSeek = (e) => {
      const width = e.target.clientWidth;
      const clickX = e.nativeEvent.offsetX;
      const seekTime = (clickX / width) * duration;
      audioRef.current.currentTime = seekTime;
    };
  
    // Format time for display (mm:ss)
    const formatTime = (time) => {
      const minutes = Math.floor(time / 60);
      const seconds = Math.floor(time % 60);
      return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    };
  
    return (
      <div className="w-full flex items-center space-x-2">
        <span className="text-xs text-gray-400">{formatTime(currentTime)}</span>
        <div
          className="h-1 bg-gray-600 rounded-full w-95 cursor-pointer"
          onClick={handleSeek}
        >
          <div
            className="h-1 bg-green-500 rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <span className="text-xs text-gray-400">{formatTime(duration)}</span>
      </div>
    );
  };
  
  export default ProgressBar;
  