import { Play, Pause, SkipBack, SkipForward, Repeat } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentMusic } from "@/store/musicSlice";
import ProgressBar from "./ProgressBar";

const MusicControls = ({
  audioRef,
  isPlaying,
  setIsPlaying,
  isRepeat,
  setIsRepeat,
  currentTime,
  duration,
  setCurrentTime,
  setDuration,
}) => {
  const dispatch = useDispatch();
  const allMusics = useSelector((state) => state?.music?.allMusics);
  const currentMusic = useSelector((state) => state?.music?.currentMusic);
  const currentLikedPlayList = useSelector((state) => state?.user?.user?.liked_playlist) || [];
  const currentPlaylist = useSelector((state) => state?.music?.currentPlaylist) || [];
  const currentSource = useSelector((state) => state?.music?.currentSource);



  const getCurrentSongList = () => {
    const getSongsByIds = (ids) =>
      ids.map((id) => allMusics.find((song) => song._id === id)).filter(Boolean);

    if (currentSource === "playlist") return currentPlaylist?.musics || [];
    if (currentSource === "liked") return getSongsByIds(currentLikedPlayList || []);
    return allMusics || [];
  };

  const handleNext = () => {
    const currentList = getCurrentSongList();
    const index = currentList.findIndex((song) => song?._id === currentMusic?._id);
    if (index === -1 && currentList.length > 0) {
      dispatch(setCurrentMusic(currentList[0]));
      return;
    }
    const nextIndex = (index + 1) % currentList.length;
    dispatch(setCurrentMusic(currentList[nextIndex]));
  };

  const handlePrevious = () => {
    const currentList = getCurrentSongList();
    const index = currentList.findIndex((song) => song._id === currentMusic?._id);
    if (index === -1 && currentList.length > 0) {
      dispatch(setCurrentMusic(currentList[0]));
      return;
    }
    const prevIndex = (index - 1 + currentList.length) % currentList.length;
    dispatch(setCurrentMusic(currentList[prevIndex]));
  };

  const toggleRepeat = () => {
    if (audioRef.current) {
      setIsRepeat(!isRepeat);
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
  };

  const handleAudioUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      setDuration(audioRef.current.duration);
    }
  };

  return (
    <>
      <div className="flex items-center space-x-3">
        <SkipBack onClick={handlePrevious} className="w-6 h-6 cursor-pointer" />
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full bg-white text-black shadow-lg"
        >
          {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
        </button>
        <SkipForward onClick={handleNext} className="w-6 h-6 cursor-pointer" />
        <Repeat
          onClick={toggleRepeat}
          className={`w-5 h-5 cursor-pointer transition duration-300 ${
            isRepeat ? "text-green-500 scale-110 drop-shadow-md" : "text-white"
          }`}
        />
      </div>

      {/* Audio player and progress bar inside MusicControls */}
      <audio
        ref={audioRef}
        src={currentMusic.url}
        preload="auto"
        onTimeUpdate={handleAudioUpdate}
        onEnded={() => {
          if (isRepeat && audioRef.current) {
            audioRef.current.currentTime = 0;
            audioRef.current.play();
          } else {
            handleNext(); 
          }
        }}
      />
      <ProgressBar currentTime={currentTime} duration={duration} audioRef={audioRef} />
    </>
  );
};

export default MusicControls;
