import { useState, useRef, useEffect, useSelector } from "../../utils/lib";
import SongInfo from "./Music Player/SongInfo";
import AdditionalControls from "./Music Player/AdditionalControls";
import MusicControls from "./Music Player/MusicControls";


const MusicPlayer = () => {


  const audioRef = useRef(null);
  const currentMusic = useSelector((state) => state?.music?.currentMusic);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
    const roomId = useSelector((state)=>state?.room?.currentRoomId);

  useEffect(() => {
    if (audioRef.current) {
      isPlaying ? audioRef.current.play() : audioRef.current.pause();
    }
  }, [isPlaying, currentMusic]);

  if (!currentMusic) return null;

  return (
    <div
      style={{
        background: "rgba(18, 18, 18, 0.64)", 
        backdropFilter: "blur(74px)", 
        WebkitBackdropFilter: "blur(74px)", 
      }}
      className="fixed bottom-0 sm:bottom-0 left-0 right-0 bg-[#121212]  h-[145px] sm:h-[100px] text-white px-4 py-3 flex flex-col sm:flex-row items-center justify-between shadow-2xl border-t border-gray-800 z-50 "
    >
      {/* Song Info */}
      <div className="w-full sm:w-1/3 flex justify-start">
        <SongInfo currentSong={currentMusic} />
      </div>

      {/* Music Controls */}
      <div className="w-full sm:w-1/3 flex flex-col items-center ">
        <MusicControls
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          isRepeat={isRepeat}
          setIsRepeat={setIsRepeat}
          audioRef={audioRef}
          currentTime={currentTime}
          duration={duration}
          setCurrentTime={setCurrentTime}
          setDuration={setDuration}
        />
      </div>

      {/* Additional Controls */}
      <div className="w-full sm:w-1/3 flex sm:justify-end ">
        <AdditionalControls audioRef={audioRef} currentSong={currentMusic} />
      </div>
    </div>
  );
};

export default MusicPlayer;
