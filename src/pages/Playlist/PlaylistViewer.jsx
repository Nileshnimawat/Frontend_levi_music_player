import React, {useState } from "react";
import { PlaylistHeader } from "./components/PlaylistHeader";
import { PlaylistBody } from "./components/PlaylistBody";
import { useGetPlaylistByID } from "@/hooks/useGetPlaylistByID";
import { useParams } from "react-router-dom";

const PlaylistViewer = () => {

  const {id} = useParams();
  const [selectedDiv, setSelectedDiv] = useState(null);
  const playlist = useGetPlaylistByID(id);



  return (
    <section className="flex-1 text-white rounded-xl mt-2 overflow-y-auto hide-scrollbar h-[75vh]" >
      {/* Playlist Header */}
      <PlaylistHeader    selectedDiv={selectedDiv} setSelectedDiv={setSelectedDiv}/>

      {/* playlist body */}
       <PlaylistBody  selectedDiv={selectedDiv}  setSelectedDiv={setSelectedDiv}/>
    </section>
  );
};

export default PlaylistViewer;
