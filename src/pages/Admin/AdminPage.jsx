import React from "react";
import Header from "./components/Header";
import { Album, Music } from "lucide-react";
import DashboardStats from "./components/DashboardStats";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MusicsTabContent from "./components/MusicsTabContent";
import PlaylistsTabContent from "./components/PlaylistsTabContent";

export const AdminPage = () => {
  return (
    <div className=" bg-[#121212] text-zinc-100 p-8">
      <Header />
      <DashboardStats />

      <div className="mt-8 bg-[#1E1E1E] rounded-lg p-6">
        <Tabs defaultValue="musics" className="space-y-6">
          <TabsList className="bg-[#2A2A2A] p-1">
            <TabsTrigger
              value="musics"
              className="data-[state=active]:bg-[#3E3E3E] data-[state=active]:text-white"
            >
              <Music className="mr-2 size-4" />
              Songs Library
            </TabsTrigger>

            <TabsTrigger
              value="playlists"
              className="data-[state=active]:bg-[#3E3E3E] data-[state=active]:text-white"
            >
              <Album className="mr-2 size-4" />
              Playlists
            </TabsTrigger>
          </TabsList>

          <TabsContent value="musics">
            <MusicsTabContent />
          </TabsContent>

          <TabsContent value="playlists">
            <PlaylistsTabContent />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
