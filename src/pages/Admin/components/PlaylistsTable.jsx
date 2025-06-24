import { Button } from "@/components/ui/button";
import { Calendar, Music, Trash2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { DELETE_PLAYLIST } from "@/utils/constants";
import axios from "axios";
import toast from "react-hot-toast";
import { removePlaylist } from "@/store/playlistSlice";
import { useNavigate } from "react-router-dom";


const PlaylistsTable = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const albums = useSelector((state) => state?.playlist?.globalPlaylists);

  const  handleDeletePlaylist = async (id) => {
    if (!window.confirm("Are you sure you want to delete this playlist?"))
      return;

    try {
      const res = await axios.delete(`${DELETE_PLAYLIST}/${id}`, {
        withCredentials: true,
      });
      dispatch(removePlaylist(id));
      toast.success(res.data.message || "Playlist deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete playlist");
      console.error(error);
    }
  };

  return (
    <div className="w-full">
      {/* Table Header */}
      <div className="grid grid-cols-12 gap-4 px-4 py-3 border-b border-zinc-700">
        <div className="col-span-1"></div>
        <div className="col-span-3 font-medium text-white">Title</div>
        <div className="col-span-2 font-medium text-white">Artist</div>
        <div className="col-span-2 font-medium text-white">Release Year</div>
        <div className="col-span-2 font-medium text-white">Songs</div>
        <div className="col-span-2 text-right font-medium text-white">Actions</div>
      </div>

      {/* Table Body */}
      <div className="divide-y divide-zinc-700">
        {albums.map((album) => (
          <div key={album?._id} className="grid grid-cols-12 gap-4 px-4 py-3 hover:bg-zinc-800/50">
            {/* Album Cover */}
            <div className="col-span-1 flex items-center">
              <img 
                src={album?.coverImage} 
                alt={album?.title} 
                className="w-10 h-10 rounded object-cover" 
              />
            </div>

            {/* Title */}
            <div className="col-span-3 flex items-center font-medium text-white">
              {album?.title}
            </div>

            {/* Artist */}
            <div className="col-span-2 flex items-center text-white">
              {album?.artist}
            </div>

            {/* Release Year */}
            <div className="col-span-2 flex items-center text-zinc-400">
              <Calendar className="h-4 w-4 mr-2" />
              {album?.releaseYear}
            </div>

            {/* Songs Count */}
            <div className="col-span-2 flex items-center text-zinc-400">
              <Music className="h-4 w-4 mr-2" />
              {album?.musics?.length} songs
            </div>

            {/* Actions */}
            <div className="col-span-2 flex justify-end items-center">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleDeletePlaylist(album._id)}
                className="text-red-400 hover:text-red-300 hover:bg-red-400/10"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlaylistsTable;