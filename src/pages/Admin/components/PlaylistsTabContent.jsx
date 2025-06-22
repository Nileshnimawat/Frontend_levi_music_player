import { Library } from "lucide-react";
import PlaylistsTable from "./PlaylistsTable";
import AddPlaylistDialog from "./AddPlayListDialog";

const PlaylistsTabContent = () => {
  return (
    <div className="  text-white rounded-lg">
      {/* Header Section */}
      <div className="p-6 pb-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="flex items-center gap-2 text-xl font-semibold">
              <Library className="h-5 w-5 text-violet-500" />
              Albums Library
            </h2>
            <p className="text-sm text-zinc-400">Manage your album collection</p>
          </div>
          <AddPlaylistDialog name={"Add Playlist"} isGlobal={true} />
        </div>
      </div>

      {/* Content Section */}
      <div className="px-6 pb-6">
        <PlaylistsTable />
      </div>
    </div>
  );
};

export default PlaylistsTabContent;