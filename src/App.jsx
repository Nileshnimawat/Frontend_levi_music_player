import { useEffect, useDispatch, useLocation, MusicPlayer, useSelector, useGetAllMusics
  ,useGetLoggedInUser, useGetAllPlaylists,
  Toaster
 } from "./utils/lib";

import AppRoutes from "./routes/AppRoutes";
import Loader from "./components/layout/Loader"; 


import "./App.css";

function App() {
  useGetAllMusics();
  useGetLoggedInUser();
  useGetAllPlaylists();
  const location = useLocation();
  const dispatch = useDispatch();
const loading = useSelector((state) => state.loading.isLoading);
  const paths =  "/login" || "/register"
  const path  = location.pathname !== paths
  const currentMusic = useSelector((state) => state.music.currentMusic);

  return (
    <div className="flex flex-col h-screen scroll-smooth">
        {loading && <Loader fullScreen />}
      <AppRoutes />
      
    </div>
  );
}

export default App;
