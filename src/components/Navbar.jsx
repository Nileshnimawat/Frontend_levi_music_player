import { FaSpotify, FaSearch } from "react-icons/fa";
import { IoHomeSharp } from "react-icons/io5";
import { FaBars } from "react-icons/fa";

export default function Navbar({ isOpen, setIsOpen }) {
  return (
    <nav className="flex items-center gap-2 md:gap-5 bg-black text-white px-2 sm:px-6 py-2  text-base w-full ">
      {/* Left Section */}
      <div className="flex items-center gap-2 sm:gap-6 lg:gap-6 xl:gap-5 w-screen ">
        <button
          className="text-white p-3 focus:outline-none card-color rounded-full hover:bg-gray-700 transition"
          onClick={() => setIsOpen(!isOpen)}>
          <FaBars className=" text-xs md:text-2xl" />
        </button>
        <FaSpotify className="text-xl sm:text-4xl hover:text-green-400 hover:scale-105 transition duration-200" />
        <div className="p-2 bg-color rounded-full">
          <IoHomeSharp className="text-xl sm:text-3xl cursor-pointer hover:text-gray-300 hover:scale-105 transition duration-200" />
        </div>

        <div className="relative">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
          <input
            type="text"
            placeholder="What do you want to play?"
            className="bg-gray-800 text-white text-sm sm:text-base rounded-full pl-8  sm:pl-10 pr-4 py-2.5 w-full sm:w-[60vh] md:w-[80vh] lg:w-80 xl:w-100 focus:outline-none focus:ring-2 focus:ring-gray-500"
          />
        </div>
      </div>

      {/* Right Section */}
      {/* <div className="flex items-center  justify-between mt-1 sm:mt-1 text-xs sm:text-base  sm:justify-between md:justify-evenly gap-0 sm:gap-1 md:gap-2 lg:gap-4 xl:gap-6">
          <button className="text-gray-400 hover:text-white hover:scale-105 transition duration-200">Premium</button>
        <button className="text-gray-400 hover:text-white hover:scale-105 transition duration-200">Support</button>
         <button className="text-gray-400 hover:text-white hover:scale-105 transition duration-200">Download</button> 
        <span className="text-gray-600">|</span>
        <button className="text-gray-400 hover:text-white hover:scale-105 transition duration-200">Sign up</button>
        <button className="bg-white text-black text-sm sm:text-base px-3 py-2 sm:px-8 sm:py-3 rounded-full  hover:scale-105 transition duration-200">Log in</button> 
      </div>
    */}
    </nav>
  );
}
