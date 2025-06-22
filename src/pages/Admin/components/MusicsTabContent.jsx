import { Music } from "lucide-react";
import AddMusicDialog from "./AddMusicDialog";
import SongsTable from "./MusicsTable";

const MusicsTabContent = () => {
  return (
    <div className="rounded-lg">
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="flex items-center gap-2 text-xl font-semibold">
              <Music className="size-5 text-emerald-500" />
              Songs Library
            </h2>
            <p className="text-sm text-gray-400">Manage your music tracks</p>
          </div>
          <AddMusicDialog />
        </div>
      </div>
      <div className="px-6 pb-6">
        <SongsTable />
      </div>
    </div>
  );
};

export default MusicsTabContent;