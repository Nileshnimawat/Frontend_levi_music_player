import Navbar from "./components/NavBar";
import Sidebar from "./components/Sidebar";
import Section from "./components/Section";
import "./App.css";
import albumData from './components/api/musicApi.json'; 
import { useState,useEffect } from "react";
import MusicPlayer from "./Music Player/MusicPlayer";
import { Routes, Route,  useLocation } from "react-router-dom";
import SectionVideo from "./Video Player/SectionVideo"
import LikedPlayList from "./Liked PlayList/LikedPlayList";


function App() {


  const location = useLocation(); // Hook to get current route

  const [currentSong, setCurrentSong] = useState(null);
  const [likedSongs, setLikedSongs] = useState([]);



useEffect(() => {
  let songs = JSON.parse(localStorage.getItem("spotify-album"));
  if(songs){
   setCurrentSong(songs);
  }

}, [])

useEffect(() => {
  const storedSongs = JSON.parse(localStorage.getItem("likedSongs"));
  if (storedSongs) {
    setLikedSongs(storedSongs);
  }
}, []);

useEffect(() => {
  if(currentSong != null){
    localStorage.setItem("spotify-album",JSON.stringify(currentSong));
  }

}, [currentSong])


  return (
    <div className="flex flex-col h-screen scroll-smooth">
      <Navbar />
      <div className="flex flex-grow bg-black">
        <Sidebar location={location} likedSongs={likedSongs}/>
        <Routes>
        <Route
            path="/"
            element={<Section data={albumData} setCurrentSong={setCurrentSong}  />}
          />
            <Route
            path="/videoPlayer"
            element={<SectionVideo currentSong={currentSong} data={albumData} setCurrentSong={setCurrentSong} />}
          />
          <Route
            path="/LikedPlayList"
            element={<LikedPlayList songs={likedSongs} setCurrentSong={setCurrentSong}/>}
          />

          </Routes>

      </div>
      {location.pathname !== "/VideoPlayer" && <MusicPlayer currentSong={currentSong} setLikedSongs={setLikedSongs} />}

    </div>

    
  );
}

export default App;
