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

  const handleDeletePlaylist = async (id) => {
    if (!window.confirm("Are you sure you want to delete this playlist?")) return;

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
      {/* Header */}
      <div className="flex gap-4 px-2 sm:px-4 py-3 border-b border-zinc-700 text-white font-medium">
        <div className="flex-[2]">Title</div>
        <div className="hidden sm:block flex-[2]">Artist</div>
        <div className=" flex-[2]">Release Year</div>
        <div className="flex-[2]">Songs</div>
        <div className="flex-[2] text-right">Actions</div>
      </div>

      {/* Body */}
      <div className="divide-y divide-zinc-700">
        {albums.map((album) => (
          <div
            key={album?._id}
            className="flex gap-4 px-2 sm:px-4 py-3 items-center hover:bg-zinc-800/50"
          >
            {/* Cover */}
            <div className="flex-[2] flex flex-col sm:flex-row gap-2">
              <img
                src={album?.coverImage}
                alt={album?.title}
                className="w-12 h-12 rounded object-cover"
              />

                {/* Title */}
            <div className="flex-[2] text-white text-sm">
              {album?.title}
            </div>
            </div>

          

            {/* Artist */}
            <div className="flex-[2] hidden sm:block text-white">{album?.artist}</div>

            {/* Release Year */}
            <div className="flex-[2] text-zinc-400 flex items-center">
              <Calendar className="hidden sm:block h-4 w-4 mr-2" />
             {album?.releaseYear || new Date().getFullYear()}

            </div>

            {/* Songs */}
            <div className="flex-[2] text-zinc-400 flex items-center">
              <Music className="h-4 w-4 mr-2" />
              {album?.musics?.length} songs
            </div>

            {/* Actions */}
            <div className="flex-[2] flex justify-end">
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
