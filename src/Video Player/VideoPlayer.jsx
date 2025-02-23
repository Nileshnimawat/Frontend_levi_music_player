import React, { useRef, useState } from "react";
const VideoPlayer = ({ currentSong }) => {
  const videoRef = useRef(null);
  return (
    <div className="flex flex-col items-start  bg-color p-3 rounded-xl shadow-lg  lg:w-[68%] lg:h-[90%]">
      <video
        ref={videoRef}
        src={currentSong.video}
        autoPlay={true}
        className="w-full h-auto max-w-5xl rounded-4xl shadow-xl "
        controls
        preload="auto"
      >
        Your browser does not support the video tag.
      </video>
      <div className="flex sm:w-full justify-between">
        {/* Video Details */}
        <div>
          <h3 className=" text-xl sm:text-2xl md:text-3xl text-white mt-3">
            {currentSong.title}
          </h3>
          <p className="text-md sm:text-xl text-white mt-2">
            {currentSong.artist}
          </p>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
