import { Routes, Route } from "react-router-dom";
import {
  MainLayout,
  Section,
  LikedPlayList,
  Login,
  Register,
  PlaylistViewer,
} from "../utils/lib";
import { Plane } from "lucide-react";
import { AdminPage } from "@/pages/Admin/AdminPage";
import SearchResults from "@/Layouts/components/SearchResults";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

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

      
      <Route
        path="/search"
        element={
          <MainLayout>
            <SearchResults />
          </MainLayout>
        }
      />

      <Route path="/admin" element={
         
        <AdminPage />

        } />
    </Routes>
  );
};

export default AppRoutes;
