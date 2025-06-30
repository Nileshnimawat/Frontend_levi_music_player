import React, { useState } from "react";
import { Heart, VolumeX, Volume2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toggleLikedSong } from "../../../store/userSlice";
import toast from "react-hot-toast";
import { LIKED_OR_DISLIKE } from "../../../utils/constants";
import axios from "axios";
import { Slider } from "@/components/ui/slider"; // <-- ShadCN Slider

const AdditionalControls = ({ audioRef, currentSong }) => {
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.7); // default 100%
  const dispatch = useDispatch();

  const loggedInUser = useSelector((state) => state?.user?.user);

  const toggleMute = () => {
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    audioRef.current.muted = newMuted;
  };

  const handleVolumeChange = (valueArray) => {
    const newVolume = valueArray[0];
    setVolume(newVolume);
    audioRef.current.volume = newVolume;
    if (audioRef.current.muted && newVolume > 0) {
      setIsMuted(false);
      audioRef.current.muted = false;
    }
  };

  const handleLiked = async (id) => {
    try {
      const res = await axios.put(
        `${LIKED_OR_DISLIKE}/${id}`,
        {},
        {
          withCredentials: true,
          skipLoading: true,
        }
      );
      toast.success(res.data.message);
      dispatch(toggleLikedSong(id));
    } catch (error) {
      toast.error("Failed to update like");
      console.error(error);
    }
  };

  return (
    <div className="flex items-center space-x-3 md:space-x-4 ">
      {loggedInUser && (
        <Heart
          onClick={() => handleLiked(currentSong._id)}
          className={`w-6 h-6 cursor-pointer transition-colors duration-300 ${
            loggedInUser?.liked_playlist?.includes(currentSong?._id)
              ? "text-red-500 fill-red-500"
              : ""
          }`}
        />
      )}

       
        <Slider
          defaultValue={[volume]}
          value={[volume]}
          onValueChange={handleVolumeChange}
          min={0}
          max={1}
          step={0.01}
          className="w-30"
        />
  
      <button
        onClick={toggleMute}
        className={`p-2 rounded-full`}
      >
        {isMuted ? (
          <VolumeX className="w-6 h-6" />
        ) : (
          <Volume2 className="w-6 h-6" />
        )}
      </button>
    </div>
  );
};

export default AdditionalControls;
