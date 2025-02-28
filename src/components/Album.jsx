import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPlay } from 'react-icons/fa';

const Album = ({ data,setCurrentSong }) => {
  let navigate = useNavigate();

  if (!data || data.length === 0){ 
    return <div>Loading...</div>;
  }
  
  let handleNavigation = ()=>{
    navigate('/VideoPlayer');
  }



  return (
    <div className="flex flex-wrap gap-3 sm:gap-5 justify-center sm:justify-start p-3 bg-color ">
      {data.map((item) => (
        <div onDoubleClick={handleNavigation} onClick={()=>setCurrentSong(item)}
          key={item.id}
          className=" w-full h-auto sm:w-34 sm:h-[24vh]  md:w-42 md:h-[36vh]  shadow-lg rounded-2xl overflow-hidden relative group p-2 card-color ">
          {/* Album Image */}
          <img
            src={item.image}
            alt={item.title}
            className=" w-full h-auto sm:h-30 md:w-full md:h-40  rounded-2xl"
          />

          <button onClick={()=>setCurrentSong(item)}
            className="absolute bottom-13 md:bottom-26 right-4 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 bg-green-500 p-3 md:p-5 rounded-full shadow-lg">
             <FaPlay className="text-black text-sm md:text-lg" />
          </button>

          <div className="p-2">
            <h3 className="text-lg md:text-lg font-bold text-white">{item.title}</h3>
            <p className="text-sm md:text-sm text-gray-400">{item.artist}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Album;

