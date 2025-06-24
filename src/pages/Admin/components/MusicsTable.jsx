import { Button } from "@/components/ui/button";
import { Calendar, Trash2 } from "lucide-react";
import { useSelector } from "react-redux";

const MusicsTable = () => {
  const songs = useSelector((state) => state?.music?.allMusics);

  return (
    <div className="w-full">
      {/* Table Header */}
      <div className="grid grid-cols-12 gap-4 px-4 py-3 border-b border-zinc-700">
        <div className="col-span-1"></div>
        <div className="col-span-3 font-medium text-white">Title</div>
        <div className="col-span-3 font-medium text-white">Artist</div>
        <div className="col-span-3 font-medium text-white">Release Date</div>
        <div className="col-span-2 text-right font-medium text-white">Actions</div>
      </div>

      {/* Table Body */}
      <div className="divide-y divide-zinc-700">
        {songs.map((song) => (
          <div key={song._id} className="grid grid-cols-12 gap-4 px-4 py-3 hover:bg-zinc-800/50">
            {/* Cover Image */}
            <div className="col-span-1 flex items-center">
              <img 
                src={song?.coverImage} 
                alt={song.title} 
                className="size-10 rounded object-cover" 
              />
            </div>

            {/* Title */}
            <div className="col-span-3 flex items-center font-medium text-white">
              {song.title}
            </div>

            {/* Artist */}
            <div className="col-span-3 flex items-center text-white">
              {song.artist}
            </div>

            {/* Release Date */}
            <div className="col-span-3 flex items-center text-zinc-400">
              <Calendar className="h-4 w-4 mr-2" />
              {song.createdAt.split("T")[0]}
            </div>

            {/* Actions */}
            <div className="col-span-2 flex justify-end items-center">
              <Button
                variant={"ghost"}
                size={"sm"}
                className="text-red-400 hover:text-red-300 hover:bg-red-400/10"
                onClick={() => deleteSong(song._id)}
              >
                <Trash2 className="size-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MusicsTable;