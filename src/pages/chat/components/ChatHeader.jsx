import { Users } from "lucide-react";
import { useSelector } from "react-redux";

const ChatHeader = () => {
  const roomId = useSelector((state) => state?.room?.currentRoomId);
  const usersInRoom = useSelector((state) => state?.room?.usersInRoom);

  return (
    <div className="p-4 border-b border-zinc-800">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Room ID: {roomId}</h2>
          <p className="text-sm text-zinc-400">
            {usersInRoom?.length} {usersInRoom?.length === 1 ? "person" : "people"} online
          </p>
        </div>

        <Users className="text-zinc-400" />
      </div>
    </div>
  );
};

export default ChatHeader;
