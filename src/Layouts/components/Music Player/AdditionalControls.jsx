import React, { useState } from "react";
import {
  Heart,
  VolumeX,
  MessageSquare,
  Volume2,
  ListMusic,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toggleLikedSong } from "../../../store/userSlice";
import toast from "react-hot-toast";
import { LIKED_OR_DISLIKE } from "../../../utils/constants";
import axios from "axios";

const AdditionalControls = ({ audioRef, currentSong }) => {
  const [isMuted, setIsMuted] = useState(false);
  const dispatch = useDispatch();

  const loggedInUser = useSelector((state) => state.user.user);

  const toggleMute = () => {
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleLiked = async (id) => {
    try {
     

      const res = await axios.put(
        `${LIKED_OR_DISLIKE}/${id}`,
        {},
        { withCredentials: true,
          skipLoading: true
         }
         
      );
       dispatch(toggleLikedSong(id));

      console.log(res);
    } catch (error) {
      toast.error("Failed to update like");
      console.error(error);
    }
  };

  return (
    <div className="flex items-center space-x-2 md:space-x-4">
      {loggedInUser && (
        <Heart
          onClick={() => handleLiked(currentSong._id)}
          className={`w-6 h-6 cursor-pointer transition-colors duration-300 ${
            loggedInUser?.liked_playlist?.includes(currentSong._id)
              ? "text-red-500 fill-red-500"
              : ""
          }`}
        />
      )}
      <MessageSquare className="w-6 h-6 cursor-pointer" />
      <ListMusic className="w-6 h-6 cursor-pointer" />
      <button
        onClick={toggleMute}
        className={`p-2 rounded-full ${isMuted ? "bg-red-500" : ""}`}
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
