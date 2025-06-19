import React, { useState } from "react";
import { FaPlay, FaList, FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { setCurrentMusic } from "../../store/musicSlice";
import toast from "react-hot-toast";
import axios from "axios";
import {
  ADD_MUSIC_TO_PLAYLIST,
  DELETE_PLAYLIST,
  REMOVE_MUSIC_FROM_PLAYLIST,
} from "../../utils/constants";
import { addSongToPlaylist, removePlaylist, removeSongFromPlaylist } from "../../store/playlistSlice";
import reactsvg from "../../assets/react.svg";
const PlaylistViewer = () => {
  const [selectedDiv, setSelectedDiv] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const allPlaylists = useSelector((state) => state.playlist.playlists);
  const allMusics = useSelector((state) => state.music.allMusics);
  const currentMusic = useSelector((state) => state.music.currentMusic);
  const playlist = allPlaylists.find((p) => p._id === id);
  const date = new Date();

  const playlistMusics = allMusics?.filter((music) =>
    playlist?.musics?.includes(music._id)
  );

  const handleClick = (musicId, music) => {
    dispatch(setCurrentMusic(music));
    setSelectedDiv(musicId);
  };

  const handleDeletePlaylist = async () => {
    if (!window.confirm("Are you sure you want to delete this playlist?")) return;

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

    if (playlist.musics.includes(currentMusic._id)) {
      return toast.error("Music already exists in playlist!");
    }

    try {
      const res = await axios.post(
        `${ADD_MUSIC_TO_PLAYLIST}/${playlist._id}`,
        { musicId: currentMusic._id },
        { withCredentials: true }
      );
      console.log(res);
      if(res.data){
      toast.success(res.data.message || "Music added to playlist!");
      dispatch(addSongToPlaylist({ playlistId: playlist._id, music: currentMusic }));
      }

    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add music");
      console.error(error);
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
      if(res.data){
      toast.success(res.data.message || "Music removed from playlist");
      dispatch(removeSongFromPlaylist({ playlistId: playlist._id,  musicId: selectedDiv }));
      setSelectedDiv(null);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to remove music");
      console.error(error);
    }
  };

  return (
    <section className="flex-1 bg-color text-white rounded-xl mt-2 overflow-y-auto custom-scrollbar h-[75vh]">
      <div className="flex items-end p-4 sm:p-7 gap-5 bg-gradient mb-3">
        <div className="bg-gradient-color">
          <img
            src={playlist?.coverImage || reactsvg}
            alt={playlist?.title || "Playlist"}
            className="w-20 sm:w-40 md:w-53 h-auto rounded-lg"
          />
        </div>
        <div className="flex-1">
          <p className="uppercase text-l font-semibold">Playlist</p>
          <h1 className="text-2xl sm:text-5xl md:text-7xl lg:text-8xl font-extrabold">
            {playlist?.title || "Unknown Playlist"}
          </h1>
          <p className="mt-2 text-gray-300">
            {playlistMusics?.length || 0} musics
          </p>
        </div>
      </div>

      <div className="flex justify-between">
        <div className="flex items-center gap-4 px-8">
          <button className="bg-green-500 p-3 md:p-4 rounded-full hover:scale-105 transition">
            <FaPlay className="text-black text-xl sm:text-2xl" />
          </button>
          <button className="text-gray-300 hover:text-white">
            <FaList className="text-2xl" />
          </button>
          <button
            onClick={handleAddMusic}
            className="border px-4 py-2 rounded text-white hover:bg-white hover:text-black transition"
          >
            ➕ Add Music
          </button>
          {selectedDiv && (
            <button
              onClick={handleRemoveMusic}
              className="border px-4 py-2 rounded text-white hover:bg-red-600 hover:text-white transition"
            >
              🗑 Remove Music
            </button>
          )}
        </div>

        <button
          onClick={handleDeletePlaylist}
          className="border px-4 mr-6 rounded hover:text-white transition"
        >
          <FaTrash className="inline m-auto" />
        </button>
      </div>

      <div className="mt-6 px-2 lg:px-8" style={{ maxHeight: "50vh" }}>
        <div className="grid grid-cols-4 md:gap-4 text-gray-400 text-sm border-b border-gray-600 pb-2 mb-2">
          <span>Title</span>
          <span>Album</span>
          <span>Date added</span>
          <span className="text-right">Duration</span>
        </div>

        {playlistMusics?.map((music) => (
          <div
            onClick={() => handleClick(music._id, music)}
            key={music._id}
            className={`grid grid-cols-4 md:gap-4 items-center py-2 mb-2 text-sm text-gray-300 hover:bg-blue-900 duration-200 rounded-lg px-2 ${
              selectedDiv === music._id ? "bg-blue-900" : ""
            }`}
          >
            <div className="flex items-start lg:items-center gap-5 flex-col lg:flex-row">
              <img
                src={music?.coverImage}
                alt={music?.title}
                className="w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 rounded"
              />
              <div className="flex flex-col">
                <span className="font-semibold text-xs sm:text-xm md:text-base text-white">
                  {music?.title}
                </span>
                <span className="text-xs text-gray-400">{music?.artist}</span>
              </div>
            </div>
            <span className="text-xs sm:text-xm md:text-base">
              {music?.album || "Album"}
            </span>
            <span className="text-xs sm:text-xm md:text-base">
              {music?.likedDate || date.toLocaleDateString()}
            </span>
            <span className="text-right sm:text-xm md:text-base">
              {music?.duration || "3:29"}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PlaylistViewer;
