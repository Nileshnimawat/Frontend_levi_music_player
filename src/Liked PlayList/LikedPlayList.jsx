import React from "react";
import { FaPlay, FaList } from "react-icons/fa";
import '../components/scrollbar.css'

const LikedPlayList = ({ songs , setCurrentSong }) => {
  return (
    <section className="flex-1 bg-color text-white rounded-xl mt-2 overflow-y-auto custom-scrollbar h-[75vh]">
      {/* Header Section */}
      <div className="flex items-end p-7 gap-6 bg-gradient mb-3 ">
        <div className="bg-gradient-color">
          <img src="/liked.png" alt="" className="w-53 h-auto  rounded-lg" />
        </div>
        <div>
          <p className="uppercase text-l font-semibold">Playlist</p>
          <h1 className="text-8xl font-extrabold">Liked Songs</h1>
          <p className="mt-2 text-gray-300">{songs.length}</p>
        </div>
      </div>

      {/* Play Button & Controls */}
      <div className="flex items-center gap-4 px-8">
        <button className="bg-green-500 p-4 rounded-full hover:scale-105 transition">
          <FaPlay className="text-black text-2xl" />
        </button>
        <button className="text-gray-300 hover:text-white">
          <FaList className="text-2xl" />
        </button>
      </div>

      {/* Songs List */}
      <div className="mt-6 px-8 " style={{ maxHeight: "50vh" }}>
        <div className="grid grid-cols-4 text-gray-400 text-sm border-b border-gray-600 pb-2 mb-2">
          <span>Title</span>
          <span>Album</span>
          <span>Date added</span>
          <span className="text-right">Duration</span>
        </div>

      
        {songs &&
          songs.map((song) => (
            <div
              onClick={()=>setCurrentSong(song)}
              key={song.id}
              className="grid grid-cols-4 items-center py-2 mb-2 text-sm text-gray-300 hover:bg-gray-800  rounded-lg px-2"
            >
              {/* <span>{index + 1}</span> */}
              <div className="flex items-center gap-4">
                <img
                  src={song.image}
                  alt={song.title}
                  className="w-16 h-16 rounded"
                />

                <div className=" flex flex-col">
                  <span className="font-semibold text-xm text-white">{song.title}</span>
                  <span className="text-xs text-gray-400">{song.artist}</span>
                </div>

              </div>
              <span className="text-xm">{"song album"}</span>
              <span>{song.likedDate}</span>
              <span className="text-right">{"3 : 00"}</span>
            </div>
          ))}


        </div>
    </section>
  );
};

export default LikedPlayList;
