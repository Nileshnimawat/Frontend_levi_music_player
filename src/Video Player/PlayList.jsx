import React from "react";
import { FaPlay } from "react-icons/fa";
import { useState } from "react";
import "../components/scrollbar.css";
import SongInfo from "../Music Player/SongInfo";

const PlayList = ({ data, setCurrentSong }) => {

  const [selectedDiv, setSelectedDiv] = useState(null); // Track selected div

  const handleClick = (index,song) => {
    setCurrentSong(song)
    setSelectedDiv(index); // Update selected div
  };

  return (
    <div className=" mx-auto mt-2 p-1 lg:p-4 bg-color text-white rounded-2xl shadow-lg w-full lg:max-w-2xl lg:w-[32%] lg:h-[90%]">
      {/* Header Section */}
      <div className="flex items-center space-x-4 mb-4">
        <button className="bg-green-500 p-4 rounded-full hover:scale-105 transition">
          <FaPlay className="text-black text-xl" />
        </button>
        <h2 className="text-2xl font-bold">PlayList</h2>
      </div>

      {/* Popular Songs List */}
      <h3 className="text-xl font-semibold mb-4">Popular</h3>
      <div className="bg-color rounded-xl p-1 items-center gap-2 overflow-y-auto custom-scrollbar h-[85%] ">
        {data.map((song) => (
          <div
            key={song.id}
            onClick={() => handleClick(song.id, song)}
            className={` p-2 rounded-xl w-full mb-3 hover:scale-105 transition duration-200 ${selectedDiv === song.id? "bg-blue-950" : "card-color" }`}
          >
            <SongInfo currentSong={song} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlayList;
