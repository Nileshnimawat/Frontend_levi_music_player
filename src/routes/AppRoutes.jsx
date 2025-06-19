import { Routes, Route } from "react-router-dom";
import {
  MainLayout,
  Section,
  LikedPlayList,
  Login,
  Register,
  MusicUploadForm,
  CreatePlaylist,
  PlaylistViewer
} from "../utils/lib";





const AppRoutes = () => {
  return (
    <Routes>
      {/* 🔐 Auth Routes with background image */}

 
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
   


      {/* 📤 Upload + Playlist Creation */}
      <Route path="/upload" element={<MusicUploadForm />} />
      <Route path="/createPlaylist" element={<CreatePlaylist />} />

      {/* 🎵 Main Content */}
      <Route
        path="/"
        element={
          <MainLayout>
            <Section />
          </MainLayout>
        }
      />

      <Route
        path="/LikedPlayList"
        element={
          <MainLayout>
            <LikedPlayList />
          </MainLayout>
        }
      />

      <Route
        path="/playlist/:id"
        element={
          <MainLayout>
            <PlaylistViewer />
          </MainLayout>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
