import {
  useSelector,
  useGetAllMusics,
  useGetLoggedInUser,
  useGetAllPlaylists,
} from "./utils/lib";

import AppRoutes from "./routes/AppRoutes";
import Loader from "./components/layout/Loader";

import "./App.css";
import { useGetGlobalPlaylists } from "./hooks/useGetGlobalPlayLists";

function App() {
  useGetAllMusics();
  useGetLoggedInUser();
  useGetAllPlaylists();
  useGetGlobalPlaylists();

  const loading = useSelector((state) => state?.loading?.isLoading);

  return (
    <div className="flex flex-col h-screen scroll-smooth bg-black">
      {loading && <Loader fullScreen />}
      <AppRoutes />
    </div>
  );
}

export default App;
