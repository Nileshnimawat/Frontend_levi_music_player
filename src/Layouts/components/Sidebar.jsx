import { RiHome5Fill } from "react-icons/ri";
import { FaPlus, FaBars } from "react-icons/fa";
import { PiPlaylistBold } from "react-icons/pi";
import { FaUpload } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import liked from "/liked.png";
import reactsvg from "../../assets/react.svg";
import {
  setCurrentPlaylist,
  setCurrentSource,
} from "@/store/musicSlice";



import AddPlayListDialog from "@/pages/Admin/components/AddPlayListDialog";

export default function Sidebar({ isOpen, setIsOpen }) {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const loggedInUser = useSelector((state) => state.user.user);
  const likedSongs = useSelector((state) => state.music.likedMusics);
  const allPlaylists = useSelector((state) => state.playlist.playlists);
  const likedPlaylistIds =
    useSelector((state) => state.user.user.liked_playlist) || [];

  const currentSong = likedSongs?.[0];

  const handleNavigation = () => {
    navigate("/");
  };

  const handlePlaylist = (playlist) => {
    dispatch(setCurrentPlaylist(playlist));
    dispatch(setCurrentSource("playlist"));
    navigate(`/playlist/${playlist._id}`);
  };

  const handleLikedPlaylist = () => {
    dispatch(setCurrentSource("liked"));
    navigate("/LikedPlayList");
  };

  return (
    <div className=" pr-2 rounded-md h-full bg-[#212121] text-gray-400 ">
      <div className="flex relative overflow-y-auto hide-scrollbar h-full">
        <aside
          className={`text-whiteflex flex-col transition-all duration-300 rounded-xl min-h-full ${
            isOpen
              ? "w-screen md:w-[270px]  p-5 "
              : "hidden items-center sm:block sm:w-16 md:w-20 p-2 pt-5 sm:opacity-100"
          }`}
        >
          {/* Toggle Button */}
          <div
            className={`flex justify-between mb-3 ${!isOpen ? "lg:ml-2" : ""}`}
          >
            <button
              className="text-white p-3 focus:outline-none bg-zinc-800 rounded-full hover:bg-gray-700 transition"
              onClick={() => setIsOpen(!isOpen)}
            >
              <FaBars className="text-md md:text-2xl" />
            </button>
          </div>

          <div
            className={`flex flex-col gap-1 border-b border-gray-600 pb-3 w-full ${
              !isOpen ? "items-center" : "items-start"
            }`}
          >
            {/* Home */}
            <button
              onClick={handleNavigation}
              className="flex items-center gap-4 px-4 py-2 w-full hover:border-r-green-500 hover:border-r-8  transition duration-200 rounded-md text-gray-300"
            >
              <div className="w-6 min-w-[24px] flex justify-center">
                <RiHome5Fill className="text-2xl hover:text-[#1DB954]" />
              </div>
              {isOpen && <span className="text-lg">Home</span>}
            </button>

            {/* Playlists */}
            <button
              onClick={handleNavigation}
              className="flex items-center gap-4 px-4 py-2 w-full hover:bg-[#1db9541a] transition duration-200 rounded-md text-gray-300"
            >
              <div className="w-6 min-w-[24px] flex justify-center">
                <PiPlaylistBold className="text-2xl" />
              </div>
              {isOpen && <span className="text-lg">Playlists</span>}
            </button>
          </div>

          {/* Liked Playlist & User Playlists */}
          <div
            className={`flex flex-col gap-1 h-full overflow-y-auto hide-scrollbar ${
              isOpen ? "block" : ""
            }`}
          >
            {/* === Library Section Header === */}
            {isOpen && (
              <h2 className="text-sm text-gray-400 font-semibold uppercase px-3 pt-4">
                Your Library
              </h2>
            )}

            {/* === Liked Playlist === */}
            {loggedInUser && (
              <button
                onClick={handleLikedPlaylist}
                className="flex gap-2 w-full pl-3 pr-2 py-2 hover:bg-[#1F1F1F] rounded-md transition duration-200 items-center"
              >
                <img
                  src={liked}
                  alt="Liked Playlist"
                  className={`w-10 h-10 object-cover ${
                    !isOpen ? "rounded-xl" : "rounded-md"
                  }`}
                />
                {isOpen && (
                  <div className="flex flex-col items-start">
                    <p className="text-sm font-semibold  truncate">
                      Liked Playlist
                    </p>
                    <p className="text-xs  text-gray-400 truncate">
                      {likedPlaylistIds.length} songs
                    </p>
                  </div>
                )}
              </button>
            )}

            {/* === Playlists Section Header === */}
            {isOpen && (
              <div className="flex items-center justify-between px-3 mt-1">
                <h2 className="text-sm text-gray-400 font-semibold uppercase">
                  Playlists
                </h2>

                <AddPlayListDialog />
              </div>
            )}

            {/* === User Playlists === */}
            <div className="flex flex-col gap-1  px-2">
              {loggedInUser &&
                allPlaylists?.length > 0 &&
                allPlaylists.map((playlist) => (
                  <button
                    key={playlist._id}
                    onClick={() => handlePlaylist(playlist)}
                    className="flex gap-3 items-start justify-start w-full hover:bg-[#1F1F1F] px-1 py-2 rounded-md transition"
                  >
                    <img
                      src={playlist.coverImage || reactsvg}
                      alt={playlist.title}
                      className={`w-10 h-10 object-cover ${
                        isOpen ? "rounded-xl" : "rounded-md"
                      }`}
                    />
                    {isOpen && (
                      <div className="flex flex-col items-start">
                        <p className="text-sm font-semibold  truncate">
                          {playlist.title}
                        </p>
                        <p className="text-xs text-gray-400 truncate">
                          {playlist.musics?.length || 0} songs
                        </p>
                      </div>
                    )}
                  </button>
                ))}

              {/* === No Playlist Message === */}
              {loggedInUser && allPlaylists?.length === 0 && (
                <p className="text-sm text-gray-400 px-3 mt-2">
                  No playlists found.
                </p>
              )}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
