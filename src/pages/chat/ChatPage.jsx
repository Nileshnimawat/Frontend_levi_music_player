import { useEffect, useRef } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import ChatHeader from "./components/ChatHeader";
import UsersList from "./components/UsersList";
import MessageInput from "./components/MessageInput";
import { useSelector } from "react-redux";
import { useRoomSocket } from "@/hooks/useRoomSocket";


const formatTime = (date) => {
  return new Date(date).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

const ChatPage = () => {
  const scrollRef = useRef(null);
  const { usersInRoom, messages } = useSelector((state) => state?.room);
  const user = useSelector((state) => state?.user?.user);
  const roomId = useSelector((state) => state?.room?.currentRoomId);

  useRoomSocket();


  const handleWidth = ()=>{
    if(!roomId && window.innerWidth <= 800){
      return "grid-cols-[220px_1fr]"
    }
    else if(roomId && window.innerWidth <= 800){
      return "grid-cols-[80px_1fr]"
    }
    else{
      return "grid-cols-[80px_1fr]"
    }
  }

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <main className="h-full rounded-lg bg-gradient-to-b from-zinc-800 to-zinc-900 overflow-hidden text-white">
      <div className={`grid  lg:grid-cols-[300px_1fr] ${handleWidth() } grid-cols-[80px_1fr] h-[calc(100vh-180px)] `}>
        <UsersList />
        <div className="flex flex-col h-full  ">
          {roomId ? (
            <>
              <ChatHeader />

              {/* ✅ Messages */}
              <div className="h-[calc(100vh-371px)] relative sm:h-[calc(100vh-340px)]  flex flex-col sm:flex-row">
                <div ref={scrollRef} className="w-full p-4 space-y-4 overflow-y-auto max-h-full hide-scrollbar">
                  {messages.map((message, index) => {
                    const sender =
                      usersInRoom.find((u) => u._id === message?.user?._id) ||
                      message?.user;

                    const isCurrentUser = message?.user?._id === user?._id;

                    return (
                      <div
                        key={message?._id || message?.timestamp || index}
                        className={`flex items-start gap-3 ${
                          isCurrentUser ? "flex-row-reverse" : ""
                        }`}
                      >
                        <Avatar className="size-8">
                          <AvatarImage
                           
                            src={sender?.coverImage}
                          />
                          <AvatarFallback className="text-white bg-[#121212] lg:text-md">
                            {sender.name?.[0] || "U"}
                          </AvatarFallback>
                        </Avatar>

                        <div
                          className={`rounded-lg p-3 max-w-[70%] break-words ${
                            isCurrentUser
                              ? "bg-green-500 text-white"
                              : "bg-zinc-800 text-white"
                          }`}
                        >
                          <p className="text-sm">{message?.text}</p>
                          <span className="text-xs text-zinc-300 mt-1 block">
                            {formatTime(message?.timestamp)}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <MessageInput />
            </>
          ) : (
            <NoRoomJoined />
          )}
        </div>
      </div>
    </main>
  );
};


export default ChatPage;

import logo from "@/assets/liked.png"

const NoRoomJoined = () => (
  <div className="flex flex-col items-center justify-center h-full space-y-6">
    <img src={logo} alt="Spotify" className="size-16 animate-bounce" />
    <div className="text-center">
      <h3 className="text-zinc-300 text-lg font-medium mb-1">No room joined</h3>
      <p className="text-zinc-500 text-sm">
        Join or create a room to start chatting and listen music along with your friends at same time
      </p>
    </div>
  </div>
);
