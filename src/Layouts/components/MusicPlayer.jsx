import { useState, useRef, useEffect, useSelector, useDispatch  } from "../../utils/lib";
import ProgressBar from "./Music Player/ProgressBar";
import SongInfo from "./Music Player/SongInfo";
import AdditionalControls from "./Music Player/AdditionalControls";
import { Play, Pause, SkipBack, SkipForward, Shuffle, Repeat } from "lucide-react";



const MusicPlayer = () => {
  const dispatch = useDispatch();
  const currentSong = useSelector((state) => state.music.currentMusic);
  const likedSongs = useSelector((state) => state.music.likedMusics);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);

  const handleAudioUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
    setDuration(audioRef.current.duration);
  };

  useEffect(() => {
    if (audioRef.current) {
      isPlaying ? audioRef.current.play() : audioRef.current.pause();
    }
  }, [isPlaying, currentSong]);

  if (!currentSong) return ;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black text-white p-4 sm:flex md:items-center md:justify-between shadow-lg">
      <SongInfo currentSong={currentSong} />
      <div className="flex flex-col items-center space-y-2 w-70% sm:w-[35%]">
        <div className="flex items-center space-x-3">
          <Shuffle className="w-5 h-5 cursor-pointer" />
          <SkipBack onClick={() => (audioRef.current.currentTime -= 10)} className="w-6 h-6 cursor-pointer" />
          <audio
            ref={audioRef}
            src={currentSong.url}
            preload="auto"
            onTimeUpdate={handleAudioUpdate}
          />
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-8 h-8 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-white text-black shadow-lg">
            {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
          </button>
          <SkipForward onClick={() => (audioRef.current.currentTime += 10)} className="w-6 h-6 cursor-pointer" />
          <Repeat className="w-5 h-5 cursor-pointer" />
        </div>
        <ProgressBar currentTime={currentTime} duration={duration} audioRef={audioRef} />
      </div>
      <AdditionalControls audioRef={audioRef} currentSong={currentSong} />
    </div>
  );
};

export default MusicPlayer;