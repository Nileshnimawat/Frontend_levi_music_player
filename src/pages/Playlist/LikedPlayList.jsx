import React, { useState } from "react";
import { FaPlay, FaList } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentMusic } from "../../store/musicSlice";
import { PlaylistBody } from "./components/PlaylistBody";

const LikedPlayList = ({ headings }) => {
  const [selectedDiv, setSelectedDiv] = useState(null);
  const dispatch = useDispatch();
  const likedIds = useSelector((state) => state?.user?.user?.liked_playlist) || [];
  const allMusics = useSelector((state) => state?.music?.allMusics);
  const date = new Date();
  const likedSongs = useSelector((state) => {
    const likedIds = state?.user?.user?.liked_playlist;
    const allSongs = state?.music?.allMusics;

    return likedIds
      .map((id) => allSongs.find((song) => song._id === id))
      .filter(Boolean);
  });

  const handleClick = (index, song) => {
    dispatch(setCurrentMusic(song));
    setSelectedDiv(index);
  };

  return (
    <section className="flex-1 bg-color text-white rounded-xl mt-2 overflow-y-auto custom-scrollbar h-[75vh]">
      {/* Header Section */}
      <div className="flex items-end p-4 sm:p-7 gap-5 bg-gradient mb-3 ">
        <div className={`${"bg-gradient-color"} `}>
          <img
            src={`${headings ? headings.image : "/liked.png"}`}
            alt="artist name"
            className="w-20 sm:w-40 md:w-53 h-auto  rounded-lg"
          />
        </div>
        <div>
          <p className="uppercase text-l font-semibold">Playlist</p>
          <h1 className=" text-2xl sm:text-5xl md:text-7xl lg:text-8xl font-extrabold">{`${
            headings ? headings.title : "Liked Songs"
          }`}</h1>
          <p className="mt-2 text-gray-300">{likedSongs.length}</p>
        </div>
      </div>

      {/* Play Button & Controls */}
      <div className="flex items-center gap-4 px-8">
        <button className="bg-green-500 p-3 md:p-4 rounded-full hover:scale-105 transition">
          <FaPlay className="text-black text-xl sm:text-2xl" />
        </button>
        <button className="text-gray-300 hover:text-white">
          <FaList className="text-2xl" />
        </button>
      </div>

      {/* playlist body */}
      <PlaylistBody
        selectedDiv={selectedDiv}
        setSelectedDiv={setSelectedDiv}
        musics={likedSongs}
      />
    </section>
  );
};

export default LikedPlayList;
