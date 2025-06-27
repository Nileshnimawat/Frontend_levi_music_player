import {
  useSelector,
  useGetAllMusics,
  useGetLoggedInUser,
  useGetAllPlaylists,
  useEffect,
  useDispatch,
} from "./utils/lib";

import AppRoutes from "./routes/AppRoutes";
import Loader from "./components/layout/Loader";

import "./App.css";
import { useGetGlobalPlaylists } from "./hooks/useGetGlobalPlayLists";
import { useSocket } from "./hooks/useSocket";
import { useUpdateActivity } from "./hooks/useUpdateActivity";
import { setIsRoomOwner } from "./store/roomSlice";
import { useRoomSocketListeners } from "./hooks/useRoomSocketListeners";



function App() {
  useGetAllMusics();
  useGetLoggedInUser();
  useGetAllPlaylists();
  useGetGlobalPlaylists();
  useSocket();
  useRoomSocketListeners();

  const roomId = useSelector((state)=>state?.room?.currentRoomId);
  const dispatch = useDispatch();

  useEffect(() => {
   
  if(!roomId){
    dispatch(setIsRoomOwner(false));
  }
   
  }, [roomId])
  


  useUpdateActivity();

  const loading = useSelector((state) => state?.loading?.isLoading);

  return (
    <div className="flex flex-col h-screen scroll-smooth bg-black">
      {loading && <Loader fullScreen />}
      <AppRoutes />
    </div>
  );
}

export default App;
