import { FaSpotify, FaSearch } from "react-icons/fa";
import { IoHomeSharp } from "react-icons/io5";
import { FaBars } from "react-icons/fa";


import { useDispatch, useSelector,
  NavLink, useEffect, useState,toast
 } from "../../utils/lib";
import { setFilteredMusics } from "../../store/musicSlice";


import axios from "axios";
import {LOGOUT} from "../../utils/constants"

import { setUser } from "../../store/userSlice";

import { setCurrentMusic } from "../../store/musicSlice";

import logo from "../../assets/rounded.jpg"
import { persistor } from "@/store/store";

export default function Navbar({ isOpen, setIsOpen }) {
  const [query, setQuery] = useState("");
  const allMusics = useSelector((state) => state.music.allMusics);
  const dispatch = useDispatch();
  let loggedInUser = useSelector((state) => state.user.user);

  useEffect(() => {
    if (query.trim() === "") {
      dispatch(setFilteredMusics(allMusics));
      return;
    }

    const data = allMusics.filter(
      (music) =>
        music.title.toLowerCase().includes(query.toLowerCase()) ||
        music.artist.toLowerCase().includes(query.toLowerCase())
    );

    dispatch(setFilteredMusics(data));
  }, [query]);


  const handleLogout = async()=>{
    try {
      const res = await axios.post(LOGOUT,{},{
        withCredentials: true
      })
      console.log(res)
      if(res && res.data){
        toast.success(res.data.message);
      dispatch(setUser(null));
       dispatch(setCurrentMusic(null));
      persistor.purge(); 
      } 
      
      //loggedInUser = null;
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <nav className="flex items-center gap-2 md:gap-5 bg-black text-white px-2 sm:px-6 py-2  text-base w-full ">
      {/* Left Section */}
      <div className="flex items-center gap-2 sm:gap-6 lg:gap-6 xl:gap-5 w-screen ">
        <button
          className="text-white p-3 lg:hidden focus:outline-none card-color rounded-full hover:bg-gray-700 transition"
          onClick={() => setIsOpen(!isOpen)}
        > 

          <FaBars className=" text-xs md:text-2xl" />
          
        </button>
        
        <div className="p-2 bg-color rounded-full">
          <IoHomeSharp className="text-xl sm:text-3xl cursor-pointer hover:text-gray-300 hover:scale-105 transition duration-200" />
        </div>

        <div className="relative">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="What do you want to play?"
            className="bg-gray-800 text-white text-sm sm:text-base rounded-full pl-8  sm:pl-10 pr-4 py-2.5 w-full sm:w-[60vh] md:w-[80vh] lg:w-80 xl:w-100 focus:outline-none focus:ring-2 focus:ring-gray-500"
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex w-70 items-center  justify-between mt-1 sm:mt-1 text-xs sm:text-base  sm:justify-between md:justify-evenly gap-0 sm:gap-1 md:gap-2 lg:gap-4 xl:gap-6">
        {!loggedInUser && (
          <NavLink
            to={"/register"}
            className="text-gray-400 hover:text-white hover:scale-105 transition duration-200"
          >
            Sign up
          </NavLink>
        )}
        {!loggedInUser && (
          <NavLink
            to={"/login"}
            className="bg-white text-black text-sm sm:text-base px-3 py-2 sm:px-8 sm:py-3 rounded-full  hover:scale-105 transition duration-200"
          >
            Log in
          </NavLink>
        )}

        {loggedInUser && (
          <NavLink
            to={"/"}
            onClick={handleLogout}
            className="bg-white text-black text-sm sm:text-base px-3 py-2 sm:px-8 sm:py-3 rounded-full  hover:scale-105 transition duration-200"
          >
            Log out
          </NavLink>
        )}
      </div>
    </nav>
  );
}
