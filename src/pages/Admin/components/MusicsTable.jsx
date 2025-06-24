import { Button } from "@/components/ui/button";
import { Calendar, Trash2 } from "lucide-react";
import { useSelector } from "react-redux";

const MusicsTable = () => {
  const songs = useSelector((state) => state?.music?.allMusics);

  return (
    <div className="w-full">
      {/* Table Header */}
      <div className="flex justify-between gap-4 px-2 sm:px-4 py-3 border-b border-zinc-700 text-white font-medium">
        <div className="flex-[2]">Title</div>
        <div className="flex-[2]">Artist</div>
        <div className="flex-[2]">Release Date</div>
        <div className="flex-[1] text-right">Actions</div>
      </div>

      {/* Table Body */}
      <div className="divide-y divide-zinc-700 flex flex-col">
        {songs.map((song) => (
          <div
            key={song?._id}
            className="flex items-center gap-4 px-2 sm:px-4 py-3 hover:bg-zinc-800/50 "
          >
            {/* Title */}
            <div className="flex-[2] flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <img
                src={song?.coverImage}
                alt={song?.title}
                className="w-12 h-12  rounded object-cover"
              />
              <span className="text-white text-sm sm:font-medium">{song?.title}</span>
            </div>

            {/* Artist */}
            <div className="flex-[2] text-white text-sm sm:font-medium">{song?.artist}</div>

            {/* Release Date */}
            <div className="flex-[2] text-zinc-400 flex items-center">
              <Calendar className="h-4 w-4 hidden sm:block sm:mr-2" />
              {song.createdAt.split("T")[0]}
            </div>

            {/* Actions */}
            <div className="flex-[1] flex justify-end">
              <Button
                variant={"ghost"}
                size={"sm"}
                className="text-red-400 hover:text-red-300 hover:bg-red-400/10"
                onClick={() => deleteSong(song?._id)}
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
