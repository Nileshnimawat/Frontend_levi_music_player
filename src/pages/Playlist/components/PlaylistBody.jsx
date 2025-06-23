import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentMusic } from "../../../store/musicSlice";


export const PlaylistBody = ({ setSelectedDiv, selectedDiv }) => {
  const dispatch = useDispatch();


  const date = new Date();

  let playlist = useSelector((state) => state?.music?.currentPlaylist);
    const playlistMusics = playlist?.musics;
  

  const handleClick = (musicId, music) => {
    dispatch(setCurrentMusic(music));
    setSelectedDiv(musicId);
  };

  return (
    <div className="pt-6 px-2 lg:px-5 max-h-[50vh] overflow-y-auto bg-[#121212] custom-scrollbar">
      <div className="grid grid-cols-4 gap-4 items-center text-gray-300 text-sm border-b border-gray-600 pb-2 mb-2 px-5">
        <span>Title</span>
        <span>Album</span>
        <span>Date added</span>
        <span className="text-right">Duration</span>
      </div>

      {playlistMusics?.map((music) => (
        <div
          key={music._id}
          onClick={() => handleClick(music._id, music)}
          className={`grid grid-cols-4 gap-4 items-center py-2 mb-2 text-sm text-gray-300 hover:bg-[#2a2a2a] duration-200 rounded-lg px-5 cursor-pointer ${
            selectedDiv === music._id ? "bg-[#5a5a5a]" : ""
          }`}
        >
          <div className="flex items-start lg:items-center gap-5 flex-col lg:flex-row">
            <img
              src={music?.coverImage}
              alt={music?.title}
              className="w-8 h-8 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded"
            />
            <div className="flex flex-col">
              <span className="font-semibold text-xs sm:text-sm md:text-base text-white">
                {music?.title}
              </span>
              <span className="text-xs text-gray-400">{music?.artist}</span>
            </div>
          </div>
          <span className="text-xs sm:text-sm md:text-base">
            {music?.album || "Album"}
          </span>
          <span className="text-xs sm:text-sm md:text-base">
            {music?.likedDate || date.toLocaleDateString()}
          </span>
          <span className="text-right text-xs sm:text-sm md:text-base">
            {music?.duration || "3:29"}
          </span>
        </div>
      ))}
    </div>
  );
};
