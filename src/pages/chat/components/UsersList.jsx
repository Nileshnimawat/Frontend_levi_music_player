import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRoomSocket } from "@/hooks/useRoomSocket";
import {
  setCurrentRoomId,
  resetRoom,
} from "@/store/roomSlice";

import { setIsRoomOwner } from "@/store/roomSlice";

const UsersList = () => {
  const dispatch = useDispatch();
  const socket = useSelector((state) => state?.socket?.socket);
  const { currentRoomId, usersInRoom } = useSelector((state) => state.room);
  const currentUser = useSelector((state) => state?.user?.user);

  const [inputRoomId, setInputRoomId] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { joinRoom, leaveRoom, createRoom } = useRoomSocket();

  const handleJoinRoom = () => {
    if (!inputRoomId.trim() || !currentUser) return;
    setIsLoading(true);
    dispatch(setCurrentRoomId(inputRoomId.trim()));
    joinRoom(inputRoomId.trim(), currentUser);
    setIsLoading(false);
  };

  const handleCreateRoom = () => {
    if (!socket || !currentUser) return;
    setIsLoading(true);

    createRoom((roomId) => {
      dispatch(setCurrentRoomId(roomId));
       dispatch(setIsRoomOwner(true)); 
      joinRoom(roomId, currentUser);
      setIsLoading(false);
    });
  };

  const handleLeaveRoom = () => {
    leaveRoom(currentRoomId);
    dispatch(resetRoom());
    dispatch(setIsRoomOwner(false));
  };

  const UsersListSkeleton = () =>
    Array?.from({ length: 4 }).map((_, i) => (
      <div
        key={i}
        className="flex items-center gap-3 p-3 rounded-lg animate-pulse"
      >
        <div className="h-12 w-12 rounded-full bg-zinc-800" />
        <div className="flex-1 hidden lg:block">
          <div className="h-4 w-24 bg-zinc-800 rounded mb-2" />
          <div className="h-3 w-32 bg-zinc-800 rounded" />
        </div>
      </div>
    ));

  if (!currentRoomId) {
    return (
      <div className="border-r border-zinc-800 flex flex-col items-center justify-center h-full p-4 gap-4">
        <div className="text-xl font-semibold">Join or Create a Chat Room</div>

        <div className="flex gap-2 w-full max-w-md">
          <Input
            placeholder="Enter Room ID"
            value={inputRoomId}
            onChange={(e) => setInputRoomId(e.target.value)}
            className="bg-zinc-800 border-none"
          />
          <Button
            onClick={handleJoinRoom}
            disabled={!inputRoomId.trim() || isLoading}
          >
            {isLoading ? "Joining..." : "Join"}
          </Button>
        </div>

        <div className="text-zinc-400">- OR -</div>

        <Button onClick={handleCreateRoom} disabled={isLoading}>
          {isLoading ? "Creating..." : "Create New Room"}
        </Button>
      </div>
    );
  }

  return (
    <div className="border-r border-zinc-800">
      <div className="flex flex-col h-full">
        <div className="p-4 border-b border-zinc-800">
          <div className="flex justify-between items-center">
            <span className="font-semibold">Room: {currentRoomId}</span>
            <Button variant="ghost" size="sm" onClick={handleLeaveRoom}>
              Leave Room
            </Button>
          </div>
        </div>

        <ScrollArea className="h-[calc(100vh-280px)]">
          <div className="space-y-2 p-4">
            {isLoading ? (
              <UsersListSkeleton />
            ) : (
              usersInRoom.map((user) => (
                <div
                  key={user._id}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-zinc-800/50 transition-colors"
                >
                  <div className="relative">
                    <Avatar className="size-8 md:size-12">
                      <AvatarImage src={user?.coverImage} />
                      <AvatarFallback className={"text-white bg-[#121212] lg:text-xl"}>{user?.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full ring-2 ring-zinc-900 bg-green-500" />
                  </div>

                  <div className="flex-1 hidden lg:block">
                    <span className="font-medium truncate">
                      {user?.name}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default UsersList;
