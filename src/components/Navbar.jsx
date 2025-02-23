import { FaSpotify, FaSearch } from "react-icons/fa";
import { IoHomeSharp } from "react-icons/io5";
import { Routes, Route,  useLocation } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between bg-black text-white px-6 py-2 text-base  ">
      {/* Left Section */}
      <div className="flex items-center gap-5">
        <FaSpotify className="text-4xl hover:text-green-400 hover:scale-105 transition duration-200" />
        <div className="p-2 bg-color rounded-full">
        <IoHomeSharp className="text-3xl cursor-pointer hover:text-gray-300 hover:scale-105 transition duration-200" />
        </div>
       
        <div className="relative">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
          <input
            type="text"
            placeholder="What do you want to play?"
            className="bg-gray-800 text-white text-base rounded-full pl-10 pr-4 py-2.5 w-100 focus:outline-none focus:ring-2 focus:ring-gray-500"
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-6 text-base">
        <button className="text-gray-400 hover:text-white hover:scale-105 transition duration-200">Premium</button>
        <button className="text-gray-400 hover:text-white hover:scale-105 transition duration-200">Support</button>
        <button className="text-gray-400 hover:text-white hover:scale-105 transition duration-200">Download</button>
        <span className="text-gray-600">|</span>
        <button className="text-gray-400 hover:text-white hover:scale-105 transition duration-200">Install App</button>
        <button className="text-gray-400 hover:text-white hover:scale-105 transition duration-200">Sign up</button>
        <button className="bg-white text-black text-base px-8 py-3 rounded-full  hover:scale-105 transition duration-200">Log in</button>
      </div>

    </nav>
  );
}


