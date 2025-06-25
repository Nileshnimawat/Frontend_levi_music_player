import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";

// Dummy user and selected user
const dummyUser = {
  id: "current_user_456",
  fullName: "You",
};

const dummySelectedUser = {
  clerkId: "user_123",
  fullName: "John Doe",
};

const dummySendMessage = (receiverId, senderId, message) => {
  console.log(`Message sent to ${receiverId} from ${senderId}: ${message}`);
};

const MessageInput = () => {
  const [newMessage, setNewMessage] = useState("");

  const user = dummyUser;
  const selectedUser = dummySelectedUser;
  const sendMessage = dummySendMessage;

  const handleSend = () => {
    if (!selectedUser || !user || !newMessage.trim()) return;
    sendMessage(selectedUser.clerkId, user.id, newMessage.trim());
    setNewMessage("");
  };

  return (
    <div className="p-4 mt-auto  border-t border-zinc-800">
      <div className="flex gap-2">
        <Input
          placeholder="Type a message"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="bg-zinc-800 border-none"
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <Button size="icon" onClick={handleSend} disabled={!newMessage.trim()}>
          <Send className="size-4" />
        </Button>
      </div>
    </div>
  );
};

export default MessageInput;
