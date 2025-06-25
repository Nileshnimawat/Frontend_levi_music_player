import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const UsersList = () => {
  // Room state
  const [hasJoinedRoom, setHasJoinedRoom] = useState(false);
  const [roomId, setRoomId] = useState("");
  
  // Users state
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const onlineUsers = new Set();

  // Dummy users data - will be populated after joining room
  const dummyUsers = [
    {
      _id: "1",
      fullName: "Alice Smith",
      clerkId: "user_1",
      imageUrl: "https://via.placeholder.com/100",
    },
    {
      _id: "2",
      fullName: "Bob Johnson",
      clerkId: "user_2",
      imageUrl: "https://via.placeholder.com/100",
    },
  ];

  const handleJoinRoom = () => {
    if (roomId.trim()) {
      setIsLoading(true);
      // Simulate API call to join room
      setTimeout(() => {
        setHasJoinedRoom(true);
        setUsers(dummyUsers);
        setIsLoading(false);
      }, 1000);
    }
  };

  const handleCreateRoom = () => {
    setIsLoading(true);
    // Simulate API call to create room
    setTimeout(() => {
      const newRoomId = Math.random().toString(36).substring(2, 8);
      setRoomId(newRoomId);
      setHasJoinedRoom(true);
      setUsers(dummyUsers);
      setIsLoading(false);
    }, 1000);
  };

  const UsersListSkeleton = () => {
    return Array.from({ length: 4 }).map((_, i) => (
      <div key={i} className='flex items-center justify-center lg:justify-start gap-3 p-3 rounded-lg animate-pulse'>
        <div className='h-12 w-12 rounded-full bg-zinc-800' />
        <div className='flex-1 lg:block hidden'>
          <div className='h-4 w-24 bg-zinc-800 rounded mb-2' />
          <div className='h-3 w-32 bg-zinc-800 rounded' />
        </div>
      </div>
    ));
  };

  if (!hasJoinedRoom) {
    return (
      <div className="border-r border-zinc-800 flex flex-col items-center justify-center h-full p-4 gap-4">
        <div className="text-xl font-semibold">Join or Create a Chat Room</div>
        
        <div className="flex gap-2 w-full max-w-md">
          <Input
            placeholder="Enter Room ID"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            className="bg-zinc-800 border-none"
          />
          <Button 
            onClick={handleJoinRoom} 
            disabled={!roomId.trim() || isLoading}
          >
            {isLoading ? "Joining..." : "Join Room"}
          </Button>
        </div>
        
        <div className="text-zinc-400">- OR -</div>
        
        <Button 
          onClick={handleCreateRoom}
          disabled={isLoading}
        >
          {isLoading ? "Creating..." : "Create New Room"}
        </Button>
      </div>
    );
  }

  return (
    <div className="border-r border-2  border-zinc-800">
      <div className="flex flex-col h-full">
        <div className="p-4 border-b border-zinc-800">
          <div className="flex justify-between items-center">
            <span className="font-semibold">Room: {roomId}</span>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setHasJoinedRoom(false)}
            >
              Leave Room
            </Button>
          </div>
        </div>
        
        <ScrollArea className="h-[calc(100vh-280px)]">
          <div className="space-y-2 p-4">
            {isLoading ? (
              <UsersListSkeleton />
            ) : (
              users.map((user) => (
                <div
                  key={user._id}
                  onClick={() => setSelectedUser(user)}
                  className={`flex items-center justify-center lg:justify-start gap-3 p-3 
                    rounded-lg cursor-pointer transition-colors
                    ${
                      selectedUser?.clerkId === user.clerkId
                        ? "bg-zinc-800"
                        : "hover:bg-zinc-800/50"
                    }`}
                >
                  <div className="relative">
                    <Avatar className="size-8 md:size-12">
                      <AvatarImage src={user.imageUrl} />
                      <AvatarFallback>{user.fullName[0]}</AvatarFallback>
                    </Avatar>
                    <div
                      className={`absolute bottom-0 right-0 h-3 w-3 rounded-full ring-2 ring-zinc-900
                        ${
                          onlineUsers.has(user.clerkId)
                            ? "bg-green-500"
                            : "bg-zinc-500"
                        }`}
                    />
                  </div>

                  <div className="flex-1 min-w-0 lg:block hidden">
                    <span className="font-medium truncate">{user.fullName}</span>
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