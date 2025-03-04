import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Section from "./components/Section";
import "./App.css";
import albumData from "./components/api/musicApi.json";
import { useState, useEffect } from "react";
import MusicPlayer from "./Music Player/MusicPlayer";
import { Routes, Route, useLocation } from "react-router-dom";
import SectionVideo from "./Video Player/SectionVideo";
import LikedPlayList from "./Liked PlayList/LikedPlayList";
import Artist from "./components/api/Artist.json";
import TheArtist from "./components/api/PlayList.json";
function App() {
  const location = useLocation(); 

  const [currentSong, setCurrentSong] = useState(null);
  const [likedSongs, setLikedSongs] = useState([]);
  const [isOpen, setIsOpen] = useState(false);


  useEffect(() => {
    let songs = JSON.parse(localStorage.getItem("spotify-album"));
    if (songs) {
      setCurrentSong(songs);
    }
  }, []);

  useEffect(() => {
    const storedSongs = JSON.parse(localStorage.getItem("likedSongs"));
    if (storedSongs) {
      setLikedSongs(storedSongs);
    }
  }, []);

  useEffect(() => {
    if (currentSong != null) {
      localStorage.setItem("spotify-album", JSON.stringify(currentSong));
    }
  }, [currentSong]);

  return (
    <div className="flex flex-col h-screen scroll-smooth">
      <Navbar isOpen={isOpen} setIsOpen={setIsOpen}/>
      <div className="flex flex-grow bg-black">
        <Sidebar location={location} likedSongs={likedSongs} isOpen={isOpen} setIsOpen={setIsOpen} />
        <Routes>
          <Route
            path="/"
            element={
              <Section data={albumData} setCurrentSong={setCurrentSong} />
            }
          />
          <Route
            path="/videoPlayer"
            element={
              <SectionVideo
                currentSong={currentSong}
                data={albumData}
                setCurrentSong={setCurrentSong}
              />
            }
          />
          <Route
            path="/LikedPlayList"
            element={
              <LikedPlayList
                songs={likedSongs}
                setCurrentSong={setCurrentSong}
                name="Liked Songs"
              />
            }
          />
          <Route
            path="/ArijitSingh"
            element={
              <LikedPlayList
                songs={Artist.Arijit}
                setCurrentSong={setCurrentSong}
                headings = {TheArtist[0]}

              />
            }
          />
          <Route
            path="/AP_Dhillon"
            element={
              <LikedPlayList
                songs={Artist.AP_Dhillon}
                setCurrentSong={setCurrentSong}
                headings = {TheArtist[1]}
              />
            }
          />
        </Routes>
      </div>
      {location.pathname !== "/VideoPlayer" && (
        <MusicPlayer currentSong={currentSong} setLikedSongs={setLikedSongs} likedSongs={likedSongs} />
      )}
    </div>
  );
}

export default App;
