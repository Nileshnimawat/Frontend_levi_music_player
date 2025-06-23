import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { FaPlay, FaList, FaTrash } from "react-icons/fa";
import {
  ADD_MUSIC_TO_PLAYLIST,
  DELETE_PLAYLIST,
  REMOVE_MUSIC_FROM_PLAYLIST,
} from "../../../utils/constants";
import {
  addSongToPlaylist,
  removePlaylist,
  removeSongFromPlaylist,
} from "../../../store/playlistSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import reactLogo from "@/assets/react.svg";
import { getSpotifyStyleGradient } from "../getRandomGradient";

export const PlaylistHeader = ({ selectedDiv, setSelectedDiv }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const currentMusic = useSelector((state) => state?.music?.currentMusic);
  const loggedInUser = useSelector((state)=>state?.user?.user);

  const playlist = useSelector((state)=>state?.music?.currentPlaylist);

  const [gradientBackground, setGradientBackground] = useState("#181818");

  useEffect(() => {
    const fetchGradient = async () => {
      const imageToUse = playlist?.coverImage || reactLogo;
      const gradient = await getSpotifyStyleGradient(imageToUse);
      setGradientBackground(gradient);
    };

    fetchGradient();
  }, [playlist?.coverImage]);

  const handleDeletePlaylist = async () => {
    if (!window.confirm("Are you sure you want to delete this playlist?"))
      return;

    try {
      const res = await axios.delete(`${DELETE_PLAYLIST}/${playlist._id}`, {
        withCredentials: true,
      });
      dispatch(removePlaylist(id));
      toast.success(res.data.message || "Playlist deleted successfully!");
      navigate("/");
    } catch (error) {
      toast.error("Failed to delete playlist");
      console.error(error);
    }
  };

  const handleAddMusic = async () => {
    if (!currentMusic || !currentMusic._id) {
      return toast.error("No music selected!");
    }

    if (playlist?.musics?.includes(currentMusic?._id)) {
      return toast.error("Music already exists in playlist!");
    }

    try {
      const res = await axios.post(
        `${ADD_MUSIC_TO_PLAYLIST}/${playlist._id}`,
        { musicId: currentMusic._id },
        { withCredentials: true }
      );
      dispatch(
        addSongToPlaylist({ playlistId: playlist._id, music: currentMusic })
      );
      toast.success(res.data.message || "Music added to playlist!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add music");
    }
  };

  const handleRemoveMusic = async () => {
    if (!selectedDiv) return toast.error("No music selected!");

    try {
      const res = await axios.put(
        `${REMOVE_MUSIC_FROM_PLAYLIST}/${playlist._id}`,
        { musicId: selectedDiv },
        { withCredentials: true }
      );
      dispatch(
        removeSongFromPlaylist({
          playlistId: playlist._id,
          musicId: selectedDiv,
        })
      );
      setSelectedDiv(null);
      toast.success(res.data.message || "Music removed from playlist");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to remove music");
    }
  };

  return (
    <>
      <div
        style={{
          background: gradientBackground,
          transition: "background 0.6s ease-in-out",
          backdropFilter: "blur(40px)",
          WebkitBackdropFilter: "blur(40px)",
        }}
        className="flex items-end p-4 sm:p-7 gap-5 rounded-lg pb-5 z-10"
      >
        <div className="p-1 rounded-lg">
          <img
            src={playlist?.coverImage || reactLogo}
            alt={playlist?.title}
            className="w-20 sm:w-40 md:w-53 h-auto rounded-lg"
          />
        </div>
        <div className="flex-1">
          <p className="uppercase text-l font-semibold">Playlist</p>
          <h1 className="text-2xl sm:text-5xl md:text-7xl lg:text-8xl font-extrabold">
            {playlist?.title}
          </h1>
          <p className="mt-2 text-gray-300">{playlist?.musics?.length} musics</p>
        </div>
      </div>

      {/* Controls */}
      <div className="flex justify-between items-center px-6 py-6 bg-[#121212]">
        <div className="flex items-center gap-4">
          <button className="bg-green-500 p-3 md:p-4 rounded-full hover:scale-105 transition">
            <FaPlay className="text-black text-xl sm:text-2xl" />
          </button>
          <button className="text-gray-300 hover:text-white">
            <FaList className="text-2xl" />
          </button>

         {loggedInUser && <button
            onClick={handleAddMusic}
            className="border px-4 py-2 rounded hover:bg-white hover:text-black transition"
          >
            ➕ Add
          </button>
         }

          {loggedInUser && selectedDiv && (
            <button
              onClick={handleRemoveMusic}
              className="border px-4 py-2 rounded hover:bg-red-600 hover:text-white transition"
            >
              🗑 Remove
            </button>
          )}
        </div>

        <button
          onClick={handleDeletePlaylist}
          className="border p-2 rounded hover:text-white transition"
        >
          <FaTrash />
        </button>
      </div>
    </>
  );
};
