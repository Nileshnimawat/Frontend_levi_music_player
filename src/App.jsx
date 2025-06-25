import {
  useSelector,
  useGetAllMusics,
  useGetLoggedInUser,
  useGetAllPlaylists,
  useEffect,
} from "./utils/lib";

import AppRoutes from "./routes/AppRoutes";
import Loader from "./components/layout/Loader";

import io from "socket.io-client"

import "./App.css";
import { useGetGlobalPlaylists } from "./hooks/useGetGlobalPlayLists";
import { useSocket } from "./hooks/useSocket";
import { useUpdateActivity } from "./hooks/useUpdateActivity";

function App() {
  useGetAllMusics();
  useGetLoggedInUser();
  useGetAllPlaylists();
  useGetGlobalPlaylists();
  useSocket();
  useUpdateActivity();

  const loading = useSelector((state) => state?.loading?.isLoading);
  const LoggedInUser = useSelector((state)=>state?.user?.user);



  return (
    <div className="flex flex-col h-screen scroll-smooth bg-black">
      {loading && <Loader fullScreen />}
      <AppRoutes />
    </div>
  );
}

export default App;
