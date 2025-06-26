import { useState } from "react";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import { useRoomSocket } from "@/hooks/useRoomSocket";

const MessageInput = () => {
  const [newMessage, setNewMessage] = useState("");
  const { sendMessage } = useRoomSocket();

  const user = useSelector((state) => state?.user?.user);
  const roomId = useSelector((state) => state?.room?.currentRoomId);

 const handleSend = () => {
  const trimmed = newMessage.trim();
  if (!trimmed || !roomId || !user?._id) return;


  sendMessage({
    roomId,
    text: trimmed,
  });

  setNewMessage("");
};

  return (
    <div className="p-2.5 sm:p-4 sm:mt-auto border-t border-zinc-800 bg-zinc-900">
      <div className="flex sm:gap-2 items-center">
        <Input
          placeholder="Type a message"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="bg-zinc-800 border-none flex-1"
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <Button size="icon" onClick={handleSend} disabled={!newMessage.trim()}>
          <Send className="size-5" />
        </Button>
      </div>
    </div>
  );
};

export default MessageInput;
