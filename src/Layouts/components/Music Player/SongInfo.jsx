import React from 'react'

const SongInfo = ({currentSong }) => {
  if(!currentSong) return;
  return (
    <div className={`flex items-center space-x-4 `}>
    <div className="h-10 w-10 sm:h-12 sm:w-12 md:h-16 md:w-16 bg-gray-700 rounded-xl">
      <img 
      src={currentSong.coverImage}
       alt="Artist image"
       className=' w-full h-11 sm:h-15  md:w-full md:h-full rounded-xl '
        />
    </div>
    <div>
      <h3 className="text-sm md:text-m font-semibold">{currentSong.title  }</h3>
      <p className="text-xs text-gray-400">{currentSong.artist }</p>
    </div>
  </div>
  )
}

export default SongInfo
