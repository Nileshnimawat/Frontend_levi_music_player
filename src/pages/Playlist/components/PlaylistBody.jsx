import { useDispatch, useSelector } from "react-redux";
import { setCurrentMusic } from "../../../store/musicSlice";
import SongList from "@/pages/Section/components/SongList";


export const PlaylistBody = ({ setSelectedDiv, selectedDiv }) => {
  const dispatch = useDispatch();


  const date = new Date();

  let playlist = useSelector((state) => state?.music?.currentPlaylist);
    const playlistMusics = playlist?.musics;
  

  const handleClick = (musicId, music) => {
    dispatch(setCurrentMusic(music));
    setSelectedDiv(musicId);
  };

  

    
  return (
    <div  
     className="py-6 lg:px-2 min-h-[400px]   bg-[#121212] hide-scrollbar">
      <div className="grid grid-cols-4 gap-4 items-center text-gray-300 text-sm border-b border-gray-600 pb-2 mb-2 px-5">
        <span>Title</span>
        <span>Album</span>
        <span>Date added</span>
        <span className="text-right">Duration</span>
      </div>

      {playlistMusics?.map((music, idx) => (
        <div
          key={music._id}
          onClick={() => handleClick(music._id, music)}
          className={`grid grid-cols-4 gap-4 items-center py-2 mb-2 text-sm text-gray-300 hover:bg-[#2a2a2a] duration-200 rounded-lg px-5 cursor-pointer ${
            selectedDiv === music._id ? "bg-[#5a5a5a]" : ""
          }`}
        >
          <div className="flex items-start lg:items-center gap-2 sm:gap-5 flex-col lg:flex-row">
            <p className="hidden sm:block">{idx+1}</p>
            <img
              src={music?.coverImage}
              alt={music?.title}
              className="w-12 h-12 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded"
            />
            <div className="flex flex-col ">
              <span className="font-semibold text-xs sm:text-sm md:text-base text-white">
                {music?.title}
              </span>
              <span className="hidden sm:block text-xs text-gray-400">{music?.artist}</span>
            </div>
          </div>
          <span className="text-xs sm:text-sm md:text-base">
            {music?.album || "Album"}
          </span>
          <span className="text-xs sm:block sm:text-sm md:text-base">
            {music?.likedDate || date.toLocaleDateString()}
          </span>
          <span className="text-right text-xs sm:text-sm md:text-base">
            {music?.duration || "3:29"}
          </span>
        </div>
      ))}
      {/* <SongList data={playlistMusics}/> */}
      

    </div>
  );
};
