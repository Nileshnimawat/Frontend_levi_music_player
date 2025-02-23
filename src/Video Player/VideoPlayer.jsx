import React, { useRef, useState } from "react";
import { Play, Pause, Volume2, VolumeX, Maximize2, Minimize2, FastForward, Rewind } from "lucide-react";

const VideoPlayer = ({ currentSong }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);

  if (!currentSong) return null;

  const togglePlay = () => {
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };


  const toggleMute = () => {
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleProgress = () => {
    const percentage = (videoRef.current.currentTime / videoRef.current.duration) * 100;
    setProgress(percentage);
  };


  const toggleFullScreen = () => {
    if (!isFullScreen) {
      videoRef.current.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
    setIsFullScreen(!isFullScreen);
  };

  const changeSpeed = () => {
    const newSpeed = playbackSpeed === 2 ? 0.5 : playbackSpeed + 0.5;
    videoRef.current.playbackRate = newSpeed;
    setPlaybackSpeed(newSpeed);
  };

  return (
    <div className="flex flex-col items-start  bg-color p-3 rounded-xl shadow-lg  lg:w-[68%] lg:h-[90%]">
      <video
        ref={videoRef}
        src={currentSong.video}
       // controls={false}
        autoPlay={isPlaying}
        onTimeUpdate={handleProgress}
        className="w-full max-w-5xl rounded-4xl shadow-xl "
        controls preload="auto"
      >
        Your browser does not support the video tag.
      </video>
    
       {/* Progress Bar */}
       {/* <input
        type="range"
        value={progress}
        onChange={handleSeek}
        className="w-full  max-w-5xl mt-1.5  h-1.5 bg-gray-900 rounded-lg cursor-pointer"
      /> */}


     <div className="flex sm:w-full justify-between">

      {/* Video Details */}
      <div>
      <h3 className=" text-xl sm:text-2xl md:text-3xl text-white mt-3">{currentSong.title}</h3>
      <p className="text-md sm:text-xl text-white mt-2">{currentSong.artist}</p>
      </div>
     


       {/* Controls */}
       <div className="flex items-center gap-2 md:gap-5 mt-4">
        <Rewind onClick={() => (videoRef.current.currentTime -= 10)} className="text-white cursor-pointer" />
        <button onClick={togglePlay} className="p-2 bg-white rounded-full">
          {isPlaying ? <Pause className="w-4 h-4 md:w-6 md:h-6" /> : <Play className="w-6 h-6" />}
        </button>
        <FastForward onClick={() => (videoRef.current.currentTime += 10)} className="text-white cursor-pointer" />


        <button onClick={toggleMute} className={`p-2 rounded-full ${isMuted ? "bg-red-500" : "bg-white"}`}>
          {isMuted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
        </button>
        <button onClick={toggleFullScreen} className="p-2 bg-white rounded-full">
          {isFullScreen ? <Minimize2 className="w-6 h-6" /> : <Maximize2 className="w-6 h-6" />}
        </button>
        {/* <button onClick={changeSpeed} className="px-3 py-1 bg-gray-700 text-white rounded-lg">
          {playbackSpeed}x
        </button> */}
      </div>

     </div>

     
    </div>
  );
};

export default VideoPlayer;
