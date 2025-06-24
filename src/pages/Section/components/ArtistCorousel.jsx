import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useNavigate } from "react-router-dom";

const ArtistCarousel = ({ data }) => {
  const navigate = useNavigate();
  const responsive = {
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 1 },
    tablet: { breakpoint: { max: 1024, min: 640 }, items: 1 },
    mobile: { breakpoint: { max: 640, min: 0 }, items: 1 },
  };

  return (
    <Carousel
      responsive={responsive}
      infinite={true}
      draggable
      swipeable={true}
      arrows
      autoPlay={true}
  
      containerClass="rounded-xl overflow-hidden"
      itemClass="px-2"
    >
      {data.map((artist, index) => (
        <div onClick={()=>navigate(`playlist/${artist._id}`)}
         key={index} className="relative rounded-xl overflow-hidden">
          <img
            src={artist?.coverImage}
            alt={artist.title}
            className="w-screen h-[270px] sm:h-[350px] xl:h-[370px]  object-cover"
          />
          <div className="absolute bottom-5 left-5">
            <p className="text-sm text-blue-500">Verified Artist</p>
            <h1 className="text-3xl font-bold">{artist?.title}</h1>
            <p className="text-gray-300 text-sm font-bold">
              {artist?.listeners?.toLocaleString()} monthly listeners
            </p>
            <div className="flex gap-3 mt-3">
              <button className="bg-green-500 px-5 py-2 rounded-full text-black font-semibold">
                PLAY
              </button>
            </div>
          </div>
        </div>
      ))}
    </Carousel>
  );
};

export default ArtistCarousel;
