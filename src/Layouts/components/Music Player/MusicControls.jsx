import { Play, Pause, SkipBack, SkipForward, Repeat } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentMusic } from "@/store/musicSlice";
import ProgressBar from "./ProgressBar";
import { useRoomSocket } from "@/hooks/useRoomSocket";
import { useEffect } from "react";

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
  const allMusics = useSelector((state) => state?.music?.musics);
  const currentMusic = useSelector((state) => state?.music?.currentMusic);
  const currentLikedPlayList = useSelector((state) => state?.user?.user?.liked_playlist) || [];
  const currentPlaylist = useSelector((state) => state?.music?.currentPlaylist) || [];
  const currentSource = useSelector((state) => state?.music?.currentSource);
  const roomId = useSelector((state) => state?.room?.currentRoomId);
  const isRoomOwner = useSelector((state) => state?.room?.isRoomOwner);

  const {
    setRoomMusic,
    toggleRoomPlayPause,
    onRoomPlayPause,
  } = useRoomSocket();

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
    const nextIndex = (index + 1) % currentList.length;
    const nextMusic = currentList[nextIndex] || currentList[0];

    dispatch(setCurrentMusic(nextMusic));
    if (roomId && isRoomOwner) setRoomMusic(nextMusic, roomId);
  };

  const handlePrevious = () => {
    const currentList = getCurrentSongList();
    const index = currentList.findIndex((song) => song._id === currentMusic?._id);
    const prevIndex = (index - 1 + currentList.length) % currentList.length;
    const prevMusic = currentList[prevIndex] || currentList[0];

    dispatch(setCurrentMusic(prevMusic));
    if (roomId && isRoomOwner) setRoomMusic(prevMusic, roomId);
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

  const handlePlayPause = () => {
    if (!audioRef.current) return;

    const nextPlayState = !isPlaying;
    setIsPlaying(nextPlayState);

    if (roomId && isRoomOwner) {
      toggleRoomPlayPause(nextPlayState, roomId);
    }

    if (nextPlayState) {
      audioRef.current.play().catch(() => {});
    } else {
      audioRef.current.pause();
    }
  };

  const isInRoom = Boolean(roomId);
  const canControl = !isInRoom || isRoomOwner;

  return (
    <>
      <div className="flex items-center space-x-3">
        <SkipBack
          onClick={canControl ? handlePrevious : undefined}
          className={`w-6 h-6 transition ${
            canControl ? "cursor-pointer text-white" : "text-gray-400 cursor-not-allowed"
          }`}
        />
        <button
          onClick={canControl ? handlePlayPause : undefined}
          className={`w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full shadow-lg ${
            canControl
              ? "bg-white text-black cursor-pointer"
              : "bg-gray-500 text-white cursor-not-allowed"
          }`}
        >
          {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
        </button>
        <SkipForward
          onClick={canControl ? handleNext : undefined}
          className={`w-6 h-6 transition ${
            canControl ? "cursor-pointer text-white" : "text-gray-400 cursor-not-allowed"
          }`}
        />
        <Repeat
          onClick={toggleRepeat}
          className={`w-5 h-5 cursor-pointer transition duration-300 ${
            isRepeat ? "text-green-500 scale-110 drop-shadow-md" : "text-white"
          }`}
        />
      </div>

      <audio
        ref={audioRef}
        id="room-audio"
        src={currentMusic?.url}
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
