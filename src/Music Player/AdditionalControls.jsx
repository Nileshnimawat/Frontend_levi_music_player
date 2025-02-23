import React, { useState } from "react";
import {
  Heart,
  VolumeX,
  MessageSquare,
  Volume2,
  ListMusic,
  Maximize2,
} from "lucide-react";

const AdditionalControls = ({ audioRef, currentSong, setLikedSongs }) => {
  const [isMuted, setIsMuted] = useState(false);
  const [liked, setliked] = useState(false);

  const toggleMute = () => {
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const getCurrentDate = () => {
    const today = new Date();
  
    const day = today.getDate();
    const month = today.toLocaleString('default', { month: 'short' }); 
    const year = today.getFullYear();
  
    return `${day} ${month} ${year}`;
  };

  const handleHeartClicked = () => {
    if (!liked) {
      setLikedSongs((prevSongs) => {
        const isAlreadyLiked = prevSongs.some(
          (song) => song.id === currentSong.id
        );
  
        if (!isAlreadyLiked) {
          const updatedSongs = [
            ...prevSongs,
            { ...currentSong, likedDate: getCurrentDate() }
          ];
          localStorage.setItem("likedSongs", JSON.stringify(updatedSongs)); 
          return updatedSongs;
        }
        setliked(true); 
  
        return prevSongs; 
      });
    } else {

      setLikedSongs((prevSongs) => {
        const updatedSongs = prevSongs.filter(
          (song) => song.id !== currentSong.id
        );
        localStorage.setItem("likedSongs", JSON.stringify(updatedSongs)); // Update localStorage
        setliked(false); 
        return updatedSongs;
      });
    }
  
    
  };
  

  return (
    <div className="flex items-center space-x-2 md:space-x-4">
      <Heart
        onClick={handleHeartClicked}
        className={`w-5 h-5 cursor-pointer ${liked ? "text-red-500" : ""}`}
      />
      <MessageSquare className="w-5 h-5 cursor-pointer" />
      <ListMusic className="w-5 h-5 cursor-pointer" />
      <button
        onClick={toggleMute}
        className={`p-2 rounded-full ${isMuted ? "bg-red-500" : ""}`}
      >
        {isMuted ? (
          <VolumeX className="w-5 h-5" />
        ) : (
          <Volume2 className="w-5 h-5" />
        )}
      </button>
      <Maximize2 className="w-5 h-5 cursor-pointer" />
    </div>
  );
};

export default AdditionalControls;
