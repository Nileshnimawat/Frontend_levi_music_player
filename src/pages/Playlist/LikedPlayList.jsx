import React, { useState } from "react";
import { FaPlay, FaList } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentMusic } from "../../store/musicSlice";

const LikedPlayList = ({ headings }) => {
  const [selectedDiv, setSelectedDiv] = useState(null);
  const dispatch = useDispatch();
  const likedIds = useSelector((state)=>state.user.user.liked_playlist) || [];
  const allMusics = useSelector((state) => state.music.allMusics); 
  const date = new Date();
 const likedSongs = allMusics?.filter((music)=>likedIds.includes(music._id));
  const handleClick = (index, song) => {
    dispatch(setCurrentMusic(song));
    setSelectedDiv(index);
  };

  return (
    <section className="flex-1 bg-color text-white rounded-xl mt-2 overflow-y-auto custom-scrollbar h-[75vh]">
      {/* Header Section */}
      <div className="flex items-end p-4 sm:p-7 gap-5 bg-gradient mb-3 ">
        <div className={`${ "bg-gradient-color"} `}>
          <img 
          src={`${headings? headings.image : "/liked.png"}`} alt="artist name" 
          className="w-20 sm:w-40 md:w-53 h-auto  rounded-lg" />
        </div>
        <div>
          <p className="uppercase text-l font-semibold">Playlist</p>
          <h1 className=" text-2xl sm:text-5xl md:text-7xl lg:text-8xl font-extrabold">{`${headings? headings.title : "Liked Songs"}`}</h1>
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

      {/* Songs List */}
      <div className="mt-6 px-2 lg:px-8 " style={{ maxHeight: "50vh" }}>
        <div className="grid grid-cols-4 md:gap-4 text-gray-400 text-sm border-b border-gray-600 pb-2 mb-2">
          <span>Title</span>
          <span>Album</span>
          <span>Date added</span>
          <span className="text-right">Duration</span>
        </div>

        {likedSongs &&
          likedSongs.map((song) => (
            <div
              onClick={()=>handleClick(song._id,song)}
              key={song._id}
              className={`grid grid-cols-4 md:gap-4 items-center py-2 mb-2 text-sm text-gray-300 hover:bg-blue-900 duration-200  rounded-lg px-2 ${selectedDiv === song._id? "bg-blue-900": ""}`}
            >
              <div className="flex items-start lg:items-center gap-5 flex-col lg:flex-row">
                <img
                  src={song.coverImage}
                  alt={song.title}
                  className=" w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 rounded"
                />
                <div className=" flex flex-col">
                  <span className="font-semibold text-xs sm:text-xm md:text-base text-white">{song.title}</span>
                  <span className="text-xs text-gray-400">{song.artist}</span>
                </div>
              </div>
              <span className="text-xs sm:text-xm md:text-base">{`${song.album ? song.album: "Album"}`}</span>
              <span className="text-xs sm:text-xm md:text-base">{`${song.likedDate ? song.likedDate : date.toLocaleDateString()} `}</span>
              <span className="text-right sm:text-xm md:text-base">{`${song.duration ? song.duration : "3:29"}`}</span>
            </div>
          ))}
        </div>
    </section>
  );
};

export default LikedPlayList;