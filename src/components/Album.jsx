import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaPlay, FaList } from 'react-icons/fa';

const Album = ({ data,setCurrentSong }) => {
  let navigate = useNavigate();
  if (!data || data.length === 0) {
    return <div>Loading...</div>;
  }

  let handleNavigation = ()=>{
    navigate('/VideoPlayer');
  }

  return (
    <div className="flex flex-wrap gap-3 sm:gap-5 justify-start p-3 bg-color ">
      {data.map((item) => (
        <div onDoubleClick={handleNavigation} onClick={()=>setCurrentSong(item)}
          key={item.id}
          className=" w-20 h-[17vh] sm:w-34 sm:h-[24vh]  md:w-42 md:h-[36vh] shadow-lg rounded-2xl overflow-hidden relative group p-2 card-color "
        >
          {/* Album Image */}
          <img
            src={item.image}
            alt={item.title}
            className=" w-full h-15 sm:h-30 md:w-full md:h-40 object-cover rounded-2xl"
          />

          {/* Play Button - Higher Above Title on Hover */}
          <button onClick={()=>setCurrentSong(item)}
            className="absolute bottom-13 md:bottom-26 right-4 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 bg-green-500 p-3 md:p-5 rounded-full shadow-lg"
          >
             <FaPlay className="text-black text-sm md:text-lg" />
          </button>

          {/* Album Details */}
          <div className="p-2">
            <h3 className="text-[9px] md:text-lg font-bold text-white">{item.title}</h3>
            <p className="text-[7px] md:text-sm text-gray-400">{item.artist}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Album;

