import React from 'react'
import { useSelector } from 'react-redux';

const SongInfo = () => {
  const currentSong = useSelector((state)=>state.music.currentMusic);
  if(!currentSong) return;
  return (
    <div className={`flex items-center space-x-4 `}>
    <div className="h-10 w-10 sm:h-11 sm:w-11 md:h-13 md:w-13 2xl:h-14 2xl:w-14 bg-gray-700 rounded-xl">
      <img 
      src={currentSong?.coverImage}
       alt="Artist image"
       className=' w-full h-auto sm:h-auto  md:w-full md:h-full rounded-xl '
        />
    </div>
    <div>
      <h3 className="text-sm md:text-m font-semibold">{currentSong?.title  }</h3>
      <p className="text-xs text-gray-400">{currentSong?.artist }</p>
    </div>
  </div>
  )
}

export default SongInfo
