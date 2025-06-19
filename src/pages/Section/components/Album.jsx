import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPlay } from 'react-icons/fa';
import { setCurrentMusic } from "../../../store/musicSlice";
import { useDispatch, useSelector } from "react-redux";


const Album = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const filteredMusics = useSelector((state) => state.music.filteredMusics);
  const allMusics = useSelector((state) => state.music.allMusics);
  let data = (filteredMusics && filteredMusics.length > 0) ? filteredMusics : allMusics;

  

  if (!data || data.length === 0) {
    return <div>Loading...</div>;
  }


  return (
    <div className="flex flex-wrap gap-3 sm:gap-5 justify-center sm:justify-start p-4 bg-color ">
      {data.map((item) => (
        <div
          
          onClick={() => dispatch(setCurrentMusic(item))}
          key={item._id}
          className="w-full h-auto sm:w-34 sm:h-[24vh] md:w-42 md:h-[35vh] shadow-lg rounded-2xl overflow-hidden relative group p-2 card-color"
        >
          <img
            src={item?.coverImage}
            alt={item.title}
            className="w-full h-auto sm:h-30 md:w-full md:h-40 rounded-2xl"
          />

          <button
            onClick={() => dispatch(setCurrentMusic(item))}
            className="absolute bottom-12 md:bottom-20 right-4 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 bg-green-500 p-3 md:p-5 rounded-full shadow-lg"
          >
            <FaPlay className="text-black text-sm md:text-lg" />
          </button>

          <div className="p-2 overflow-hidden">
            <h3 className="text-sm md:text-sm font-bold text-white">{item.title}</h3>
            <p className="text-sm md:text-sm text-gray-400">{item.artist}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Album;
