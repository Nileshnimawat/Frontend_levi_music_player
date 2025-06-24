import React from "react";
import { useDispatch } from "react-redux";
import { FaPlay } from "react-icons/fa";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import {  setCurrentPlaylist, setCurrentSource } from "../../../store/musicSlice";
import { useNavigate } from "react-router-dom";


const AlbumCarousel = ({ data, title}) => {
  if(!data ) return;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlePlay = (item) => {
    dispatch(setCurrentSource("playlist"));
    dispatch(setCurrentPlaylist(item))
    navigate(`/playlist/${item._id}`)
  };

  const responsive = {
    desktop: { 
      breakpoint: { max: 3000, min: 1024 }, 
      items: 6,
      partialVisibilityGutter: 20
    },
    tablet: { 
      breakpoint: { max: 1024, min: 768 }, 
      items: 4,
      partialVisibilityGutter: 15
    },
    mobile: { 
      breakpoint: { max: 768, min: 0 }, 
      items: 3,
      partialVisibilityGutter: 10
    },
  };

  return (
    <div className="py-4 mt-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">{title}</h2>
        <button className="text-sm text-green-500 hover:text-white transition">
          See All
        </button>
      </div>
      
      <Carousel
        responsive={responsive}
        infinite={false}
        autoPlay={false}
        draggable
        swipeable
        keyBoardControl
        arrows
        containerClass="carousel-container"
        itemClass="carousel-item"
      >
        {data?.map((item) => (
          <div
            key={item?._id}
            className="relative group cursor-pointer p-2"
            onClick={()=>handlePlay(item)}
          >
            <div className="relative rounded-lg overflow-hidden">
              <img
                src={item?.coverImage }
                alt={item?.title}
                className="w-full aspect-square object-cover"
              />
            </div>
            <div className="mt-2 px-1">
              <h3 className="text-sm font-semibold line-clamp-1">{item?.title}</h3>
              <p className="text-xs text-gray-400 line-clamp-1">
                {item?.releasedYear || '2023'} - {item?.category || 'Album'}
              </p>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default AlbumCarousel;
