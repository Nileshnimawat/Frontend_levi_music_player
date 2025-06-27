import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaHeadphones, FaClock } from "react-icons/fa";
import {
  setAllMusics,
  setCurrentMusic,
  setCurrentSource,
  setMusics,
} from "@/store/musicSlice";
import { useRoomSocketActions } from "@/hooks/useRoomSocketActions";

const SongList = ({ data }) => {
   const roomId = useSelector((state) => state?.room?.currentRoomId);
  const isRoomOwner = useSelector((state) => state?.room?.isRoomOwner);

  const {setRoomMusic} = useRoomSocketActions();

  if (!data) {
    return <div>No songs available.</div>;
  }
  const dispatch = useDispatch();
  useEffect(() => {
   dispatch(setMusics(data))
   
  }, [data])
  
  dispatch(setMusics(data));

  const handlePlay = (item) => {
    dispatch(setCurrentSource("all"));
    dispatch(setCurrentMusic(item));
     if (roomId && isRoomOwner) setRoomMusic(item, roomId);
  };

  return (
    <div className="mt-2 sm:px-4 ">
      {data?.map((item, idx) => (
        <div
          key={item._id}
          onClick={() => handlePlay(item)}
          className="flex h-[70px] justify-between items-center py-3 px-3 rounded-md cursor-pointer transition relative group"
        >
          {/* Blur background on hover */}
          <div
            className="absolute inset-0 rounded-md opacity-0 group-hover:opacity-100 transition duration-300"
            style={{
              background: "rgba(255, 255, 255, 0.05)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
              zIndex: 0,
            }}
          ></div>

          {/* Foreground content */}
          <div className="flex items-center gap-4 relative z-10">
            <span className="text-gray-400 w-4">{idx + 1}</span>
            <img
              src={item?.coverImage}
              alt=""
              className="w-12 h-12 rounded-sm object-cover"
            />
            <div>
              <p className="font-semibold text-white">{item?.title}</p>
              <p className="text-xs text-gray-400">{item?.artist}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-gray-400 text-sm relative z-10">
            <FaHeadphones />
            <FaClock />
            <span>{item.duration || "3:45"}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SongList;
