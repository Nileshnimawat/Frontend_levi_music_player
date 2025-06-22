import { Button } from "@/components/ui/button";
import { Calendar, Music, Trash2 } from "lucide-react";
import { useSelector } from "react-redux";

const PlaylistsTable = () => {
  const albums = useSelector((state) => state?.playlist?.playlists);

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
          <div key={album._id} className="grid grid-cols-12 gap-4 px-4 py-3 hover:bg-zinc-800/50">
            {/* Album Cover */}
            <div className="col-span-1 flex items-center">
              <img 
                src={album.coverImage} 
                alt={album.title} 
                className="w-10 h-10 rounded object-cover" 
              />
            </div>

            {/* Title */}
            <div className="col-span-3 flex items-center font-medium text-white">
              {album.title}
            </div>

            {/* Artist */}
            <div className="col-span-2 flex items-center text-white">
              {album.artist}
            </div>

            {/* Release Year */}
            <div className="col-span-2 flex items-center text-zinc-400">
              <Calendar className="h-4 w-4 mr-2" />
              {album.releaseYear}
            </div>

            {/* Songs Count */}
            <div className="col-span-2 flex items-center text-zinc-400">
              <Music className="h-4 w-4 mr-2" />
              {album.musics.length} songs
            </div>

            {/* Actions */}
            <div className="col-span-2 flex justify-end items-center">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => deleteAlbum(album._id)}
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