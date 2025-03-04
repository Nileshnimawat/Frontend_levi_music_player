import { useState } from "react";
import { IoHomeSharp, IoSearch } from "react-icons/io5";
import { FaPlus, FaBars} from "react-icons/fa";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
import SongInfo from "../Music Player/SongInfo";

export default function Sidebar({ location, likedSongs, isOpen, setIsOpen }) {
  let navigate = useNavigate();
 
  let handleNavigation = ()=>{
    navigate('/');
  }

  const currentSong = [
    {
      image: "/liked.png",
      title: "Liked Songs",
      artist: likedSongs.length
    },
    {
      image: "/images/arijit/ArijitSingh.png",
      title: "Arijit Singh ",
      artist: "PlayList"
    },
    {
      image: "/images/AP_Dhillon.png",
      title: "AP Dhillon",
      artist: "PlayList"
    }
  ];

  return (
    <div
      className={`mt-2   pr-2 rounded-2xl ${
        location.pathname === "/VideoPlayer" ? "h-[90vh]" : "h-[75vh]"
      }`}
    >
      <div className= {`flex relative ${isOpen ? "h-full" : ""}`}>
        {/* Sidebar */}
        <aside
          className={` bg-color  text-white h-[80%] p-5 flex flex-col transition-all duration-300 rounded-xl min-h-full
             ${isOpen ? "w-screen md:w-105" : "hidden items-center sm:block  sm:w-16 md:w-22 sm:opacity-100  "}`}
        >
          {/* Toggle Button */}
          <div className="flex justify-start mb-3 ">
            <button
              className="text-white p-3 focus:outline-none card-color rounded-full hover:bg-gray-700 transition"
              onClick={() => setIsOpen(!isOpen)}
            >
              <FaBars className=" text-md md:text-2xl" />
            </button>
          </div>

          {/* Navigation Links */}
          <div className={`flex flex-col gap-3 border-b border-gray-600 pb-3 ${!isOpen ? "items-center": ""} `}>
            <button onClick={handleNavigation} className="flex items-center gap-3 text-lg hover:scale-105 transition duration-200">
              <IoHomeSharp className=" text-lg md:text-2xl" /> {isOpen && "Home"}
            </button>
            <button onClick={()=>navigate('/VideoPlayer')}
            className="flex items-center gap-3 text-lg hover:scale-105 transition duration-200">
              <IoSearch className=" text-lg md:text-2xl" /> {isOpen && "VideoPlayer"}
            </button>

          </div>

          {/* Library Section */}
          <div
            className={`flex justify-between items-center mt-3 mb-2   ${
              isOpen ? "flex-row" : "flex-col"
            }  `}
          >
            {isOpen && (
              <button className="hover:text-white transition">
                <FaPlus className="text-xl" />
              </button>
            )}
          </div>

          {/* Playlist & Podcasts */}
          <div
            className={`flex flex-col gap-4 mt-2  overflow-y-auto custom-scrollbar ${
              isOpen ? "block" : "hidden"
            }`}
          >
             <button onClick={()=>navigate('/LikedPlayList')}
            className="flex  gap-3 w-full pl-2 hover:scale-105 duration-200 ">
             <SongInfo currentSong={currentSong[0]} ></SongInfo>
            </button>

            <button onClick={()=>navigate('/ArijitSingh')}
            className="flex  gap-3 w-full pl-2 hover:scale-105 duration-200 ">
             <SongInfo currentSong={currentSong[1]} ></SongInfo>
            </button>

            <button onClick={()=>navigate('/AP_Dhillon')}
            className="flex  gap-3 w-full pl-2 hover:scale-105 duration-200 ">
             <SongInfo currentSong={currentSong[2]} ></SongInfo>
            </button>

            <div className="card-color p-4 rounded-lg  ">
              <p className="font-semibold text-xm md:text-xl">Create your first playlist</p>
              <p className="text-xs md:text-sm text-gray-400">It's easy, we'll help you</p>
              <button className="mt-2 bg-white text-black px-4 py-2 rounded-full font-semibold hover:scale-105 transition duration-200">
                Create playlist
              </button>
            </div>

            <div className="card-color p-4 rounded-lg">
              <p className="font-semibold text-xm md:text-xl">
                Let's find some podcasts to follow
              </p>
              <p className="text-xs md:text-sm text-gray-400">
                We'll keep you updated on new episodes
              </p>
              <button className="mt-2 bg-white text-black px-4 py-2 rounded-full font-semibold hover:scale-105 transition duration-200">
                Browse podcasts
              </button>
            </div>
          </div>
          <Footer isOpen={isOpen} />
        </aside>
      </div>
    </div>
  );
}
