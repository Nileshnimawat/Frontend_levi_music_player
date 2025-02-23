import React from 'react'
import PlayList from './PlayList'
import VideoPlayer from './VideoPlayer'

const SectionVideo = ({
    currentSong,
    data,
    setCurrentSong
}) => {
  return (
    <>
    <div className='lg:flex w-full lg:h-[90vh] mt-2 bg-color rounded-2xl'> 
        <VideoPlayer currentSong={currentSong} />
    <PlayList data={data} setCurrentSong={setCurrentSong}/>
    </div>
  
    </>
  )
}

export default SectionVideo