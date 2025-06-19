import { useEffect, useDispatch, useLocation, MusicPlayer, useSelector, useGetAllMusics
  ,useGetLoggedInUser, useGetAllPlaylists
 } from "./utils/lib";

import AppRoutes from "./routes/AppRoutes";


import "./App.css";

function App() {
  useGetAllMusics();
  useGetLoggedInUser();
  useGetAllPlaylists();
  const location = useLocation();
  const dispatch = useDispatch();

  const paths =  "/login" || "/register"
  const path  = location.pathname !== paths
  const currentMusic = useSelector((state) => state.music.currentMusic);

  return (
    <div className="flex flex-col h-screen scroll-smooth">
      <AppRoutes />
      
    </div>
  );
}

export default App;
