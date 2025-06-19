import { IoHomeSharp, IoSearch } from "react-icons/io5";
import { FaPlus, FaBars } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import liked from "/liked.png";
import reactsvg from "../../assets/react.svg";

export default function Sidebar({isOpen, setIsOpen}) {
  const navigate = useNavigate();
  const location = useLocation();


  const loggedInUser = useSelector((state) => state.user.user);
  const likedSongs = useSelector((state) => state.music.likedMusics);
  const allPlaylists = useSelector((state) => state.playlist.playlists);

  const currentSong = likedSongs?.[0]; // Showing first liked song if any

  const handleNavigation = () => {
    navigate("/");
  };

  return (
    <div className="mt-2 pr-2 rounded-2xl h-full">
      <div
        className={`flex relative overflow-y-auto hide-scrollbar ${
          isOpen ? "h-full" : "h-full"
        }`}
      >
        <aside
          className={`bg-zinc-900 text-white p-5 flex flex-col transition-all duration-300 rounded-xl min-h-full ${
            isOpen
              ? "w-screen md:w-80"
              : "hidden items-center sm:block sm:w-16 md:w-25 sm:opacity-100"
          }`}
        >
          {/* Toggle Button */}
          <div className={`flex justify-start mb-3 ${!isOpen ? "lg:ml-2" : ""}`}>
            <button
              className="text-white p-3 focus:outline-none bg-zinc-800 rounded-full hover:bg-gray-700 transition"
              onClick={() => setIsOpen(!isOpen)}
            >
              <FaBars className="text-md md:text-2xl" />
            </button>
          </div>

          {/* Navigation Links */}
          <div
            className={`flex flex-col gap-3 border-b border-gray-600 pb-3 ${
              !isOpen ? "items-center" : ""
            }`}
          >
            <button
              onClick={handleNavigation}
              className="flex items-center gap-3 text-lg hover:scale-105 transition duration-200"
            >
              <IoHomeSharp className="text-lg md:text-2xl" />
              {isOpen && "Home"}
            </button>
            {loggedInUser && (
              <button
                onClick={() => navigate("/upload")}
                className="flex items-center gap-3 text-lg hover:scale-105 transition duration-200"
              >
                <IoSearch className="text-lg md:text-2xl" />
                {isOpen && "Upload Music"}
              </button>
            )}
          </div>

          {/* Library Header */}
          <div
            className={`flex justify-between items-center mt-3 mb-2 ${
              isOpen ? "flex-row" : "flex-col"
            }`}
          >
            {isOpen && loggedInUser &&  (
              <button
                onClick={() => navigate("/createplaylist")}
                className="hover:scale-103 transition flex gap-1 border-2 rounded-full p-2 items-center"
              >
                <FaPlus className="text-xl" /> 
                <p className="text-base"> {isOpen && "Create"}</p>
              </button>
            )}
          </div>

          {/* Liked Playlist & User Playlists */}
          <div
            className={`flex flex-col gap-5 mt-2 h-full overflow-y-auto hide-scrollbar ${
              isOpen ? "block" : ""
            }`}
          >
            {/* Liked Playlist */}
            {loggedInUser && (
              <button
                onClick={() => navigate("/LikedPlayList")}
                className="flex gap-3 w-full pl-2 hover:scale-105 duration-200 items-center"
              >
                <img
                  src={currentSong?.coverImage || liked}
                  alt={currentSong?.title || "Liked PlayList"}
                  className={`w-12 h-auto object-cover ${
                    !isOpen ? "rounded-full" : "rounded-md"
                  }`}
                />
                {isOpen && (
                  <div className="flex flex-col">
                    <p className="text-sm font-semibold text-white truncate">
                      {currentSong?.title || "Liked PlayList"}
                    </p>
                    <p className="text-xs text-gray-400 truncate">
                      {loggedInUser?.liked_playlist?.length || 0} songs
                    </p>
                  </div>
                )}
              </button>
            )}

            {/* User Playlists */}
            {loggedInUser &&
              allPlaylists?.length > 0 &&
              allPlaylists.map((playlist) => (
                <button
                  key={playlist._id}
                  onClick={() => navigate(`/playlist/${playlist._id}`)}
                  className="flex gap-3 w-full pl-2 hover:scale-105 duration-200 items-center"
                >
                  <img
                    src={playlist.coverImage || reactsvg}
                    alt={playlist.title}
                    className={`w-12 h-auto object-cover ${
                      isOpen ? "rounded-full" : "rounded-md"
                    }`}
                  />
                  {isOpen && (
                    <div className="flex flex-col">
                      <p className="text-sm font-semibold text-white truncate">
                        {playlist.title}
                      </p>
                      <p className="text-xs text-gray-400 truncate">
                        {playlist.musics?.length || 0} songs
                      </p>
                    </div>
                  )}
                </button>
              ))}

            {/* No Playlist Fallback */}
            {loggedInUser && allPlaylists?.length === 0 && (
              <p className="text-sm text-gray-400 px-2">No playlists found.</p>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
