import React, { useState } from "react";
import { FaPlay, FaList } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentMusic, setCurrentSource } from "../../store/musicSlice";
import Footer from "@/Layouts/components/Footer";
import { useRoomSocketActions } from "@/hooks/useRoomSocketActions";

const LikedPlayList = ({ headings }) => {
  const [selectedDiv, setSelectedDiv] = useState(null);
  const dispatch = useDispatch();
       const roomId = useSelector((state) => state?.room?.currentRoomId);
    const isRoomOwner = useSelector((state) => state?.room?.isRoomOwner);
    
      const {setRoomMusic} = useRoomSocketActions();

  const likedSongsID = useSelector((state) => state?.user?.user?.liked_playlist || []);
  const allMusics = useSelector((state) => state?.music?.allMusics || []);
  const date = new Date();

  const likedSongs = allMusics.filter((music) => likedSongsID.includes(music._id));

  const handleClick = (musicId, music) => {
       if (roomId && !isRoomOwner) return;
    dispatch(setCurrentSource("liked"))
    dispatch(setCurrentMusic(music));
    setSelectedDiv(musicId);
        if(roomId && isRoomOwner) setRoomMusic(music, roomId)
  };

  return (
    <section className="flex-1 bg-color text-white rounded-xl mt-2 hide-scrollbar ">
      {/* Header Section */}
      <div className="flex items-end p-4 sm:p-7 gap-5 bg-gradient mb-3">
        <div className="bg-gradient-color">
          <img
            src={headings?.image || "/liked.png"}
            alt="Liked Songs"
            className="w-20 sm:w-40 md:w-53 h-auto rounded-lg"
          />
        </div>
        <div>
          <p className="uppercase text-l font-semibold">Playlist</p>
          <h1 className="text-2xl sm:text-5xl md:text-7xl lg:text-8xl font-extrabold">
            {headings?.title || "Liked Songs"}
          </h1>
          <p className="mt-2 text-gray-300">{likedSongs.length} songs</p>
        </div>
      </div>

      {/* Play Button & Controls */}
      <div className="flex items-center gap-4 px-8 mb-3">
        <button className="bg-green-500 p-3 md:p-4 rounded-full hover:scale-105 transition">
          <FaPlay className="text-black text-xl sm:text-2xl" />
        </button>
        <button className="text-gray-300 hover:text-white">
          <FaList className="text-2xl" />
        </button>
      </div>

      {/* PlaylistBody (only liked songs) */}
      <div className="py-6 px-2  bg-[#121212] hide-scrollbar">
        <div className="grid grid-cols-4 gap-4 items-center text-gray-300 text-sm border-b border-gray-600 pb-2 mb-2 px-5">
          <span>Title</span>
          <span>Album</span>
          <span>Date added</span>
          <span className="text-right">Duration</span>
        </div>

        {likedSongs?.map((music, idx) => (
          <div
            key={music._id}
            onClick={() => handleClick(music._id, music)}
            className={`grid grid-cols-4 gap-4 items-center py-2 mb-2 text-sm text-gray-300 hover:bg-[#2a2a2a] duration-200 rounded-lg px-5 cursor-pointer ${
              selectedDiv === music._id ? "bg-[#5a5a5a]" : ""
            }`}
          >
            <div className="flex items-start lg:items-center gap-5 flex-col lg:flex-row">
              <p>{idx+1}</p>
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
      <Footer/>
    </section>
  );
};

export default LikedPlayList;
