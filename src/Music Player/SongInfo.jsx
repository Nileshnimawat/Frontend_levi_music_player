import React from 'react'

const SongInfo = ({currentSong }) => {
  if(!currentSong) return;
  return (
    <div className={`flex items-center space-x-4 `}>
    <div className="h-16 w-16 bg-gray-700 rounded-xl">
      <img 
      src={currentSong.image}
       alt="Artist image"
       className='w-full h-full rounded-xl '
        />
    </div>
    <div>
      <h3 className="text-m font-semibold">{currentSong.title  }</h3>
      <p className="text-xs text-gray-400">{currentSong.artist }</p>
    </div>
  </div>
  )
}

export default SongInfo
