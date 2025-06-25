import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Dummy data for now — replace with real props or store later
const dummySelectedUser = {
    fullName: "John Doe",
    clerkId: "user_123",
    imageUrl: "https://via.placeholder.com/150",
};

const dummyOnlineUsers = new Set(["user_123"]);

const ChatHeader = () => {
    const selectedUser = dummySelectedUser;
    const onlineUsers = dummyOnlineUsers;

    if (!selectedUser) return null;

    return (
        <div className='p-4 border-b border-zinc-800'>
            <div className='flex items-center gap-3'>
                <Avatar>
                    <AvatarImage src={selectedUser.imageUrl} />
                    <AvatarFallback>{selectedUser.fullName[0]}</AvatarFallback>
                </Avatar>
                <div>
                    <h2 className='font-medium'>{selectedUser.fullName}</h2>
                    <p className='text-sm text-zinc-400'>
                        {onlineUsers.has(selectedUser.clerkId) ? "Online" : "Offline"}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ChatHeader;