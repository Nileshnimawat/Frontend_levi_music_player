import { useEffect, useDispatch, useLocation, MusicPlayer, useSelector, useGetAllMusics
  ,useGetLoggedInUser, useGetAllPlaylists,
  Toaster,
  useNavigate
 } from "./utils/lib";

import AppRoutes from "./routes/AppRoutes";
import Loader from "./components/layout/Loader"; 


import "./App.css";

function App() {
  useGetAllMusics();
  useGetLoggedInUser();
  useGetAllPlaylists();
  const location = useLocation();
  const navigate = useNavigate();
const loading = useSelector((state) => state.loading.isLoading);
  const loggedInUser = useSelector((state)=>state.user.user);

    const isPublicRoute =
    location.pathname === "/" ||
    location.pathname === "/login" ||
    location.pathname === "/register";

  useEffect(() => {
    if (!loggedInUser && !isPublicRoute) {
      navigate("/");
    }
  }, [loggedInUser, location.pathname, navigate]);

  return (
    <div className="flex flex-col h-screen scroll-smooth bg-black">
        {loading && <Loader fullScreen />}
      <AppRoutes />
      
    </div>
  );
}

export default App;
