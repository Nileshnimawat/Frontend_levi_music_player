import { useEffect, useState } from "react";

import UsersList from "./components/UsersList";
import ChatHeader from "./components/ChatHeader";
import MessageInput from "./components/MessageInput";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Navbar } from "@/utils/lib";

const formatTime = (date) => {
  return new Date(date).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

// Dummy user data
const dummyUser = {
  id: "current_user_123",
  fullName: "You",
  imageUrl: "https://via.placeholder.com/100",
};

// Dummy selected user and messages (simulate selecting a user later)
const dummySelectedUser = {
  clerkId: "user_456",
  fullName: "John Doe",
  imageUrl: "https://via.placeholder.com/100",
};

// Dummy messages
const dummyMessages = [
  {
    _id: "msg1",
    senderId: "current_user_123",
    content: "Hey there!",
    createdAt: new Date().toISOString(),
  },
  {
    _id: "msg2",
    senderId: "user_456",
    content: "Hello! What's up?",
    createdAt: new Date().toISOString(),
  },
];

const ChatPage = () => {
  const [user] = useState(dummyUser);
  const [selectedUser, setSelectedUser] = useState(dummySelectedUser); // You can set null initially
  const [messages, setMessages] = useState(dummyMessages);

  // Dummy fetchers
  useEffect(() => {
    // simulate fetchUsers
    console.log("Fetching users...");
  }, []);

  useEffect(() => {
    if (selectedUser) {
      // simulate fetchMessages
      console.log(`Fetching messages for ${selectedUser.clerkId}...`);
    }
  }, [selectedUser]);

  return (
    <main className="h-full rounded-lg bg-gradient-to-b from-zinc-800 to-zinc-900 overflow-hidden text-white">


      <div className="grid lg:grid-cols-[300px_1fr] grid-cols-[80px_1fr] h-[calc(100vh-180px)] ">
        <UsersList />
        <div className="flex flex-col h-full">
          {selectedUser ? (
            <>
              <ChatHeader />

              {/* Messages */}
              <ScrollArea className="h-[calc(100vh-340px)]">
                <div className="p-4 space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message._id}
                      className={`flex items-start gap-3 ${
                        message.senderId === user.id ? "flex-row-reverse" : ""
                      }`}
                    >
                      <Avatar className="size-8">
                        <AvatarImage
                          src={
                            message.senderId === user.id
                              ? user.imageUrl
                              : selectedUser.imageUrl
                          }
                        />
                      </Avatar>

                      <div
                        className={`rounded-lg p-3 max-w-[70%] ${
                          message.senderId === user.id
                            ? "bg-green-500"
                            : "bg-zinc-800"
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                        <span className="text-xs text-zinc-300 mt-1 block">
                          {formatTime(message.createdAt)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              <MessageInput />
            </>
          ) : (
            <NoConversationPlaceholder />
          )}
        </div>
      </div>
    </main>
  );
};

export default ChatPage;

const NoConversationPlaceholder = () => (
  <div className="flex flex-col items-center justify-center h-full space-y-6">
    <img src="/spotify.png" alt="Spotify" className="size-16 animate-bounce" />
    <div className="text-center">
      <h3 className="text-zinc-300 text-lg font-medium mb-1">
        No conversation selected
      </h3>
      <p className="text-zinc-500 text-sm">Choose a friend to start chatting</p>
    </div>
  </div>
);
