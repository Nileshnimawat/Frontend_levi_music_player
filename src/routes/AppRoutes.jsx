import { Routes, Route } from "react-router-dom";
import {
  MainLayout,
  Section,
  LikedPlayList,
  Login,
  Register,
  PlaylistViewer,
} from "../utils/lib";
import { AdminPage } from "@/pages/Admin/AdminPage";
import SearchResults from "@/Layouts/components/SearchResults";
import ProtectedRoute from "./ProtectedRoutes";
import ChatPage from "@/pages/chat/ChatPage";

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
          <ProtectedRoute>
            <MainLayout>
              <LikedPlayList />
            </MainLayout>
          </ProtectedRoute>
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

      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminPage />
          </ProtectedRoute>
        }
      />

        <Route
        path="/room"
        element={
          <ProtectedRoute>
            <MainLayout>
            <ChatPage />
            </MainLayout>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
