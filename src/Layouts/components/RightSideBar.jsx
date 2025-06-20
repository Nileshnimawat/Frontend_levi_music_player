import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { HeadphonesIcon, Music, Users } from "lucide-react";
import { useSelector } from "react-redux";

const RightSideBar = () => {
  const [users, setUsers] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState(new Set());
  const [userActivities, setUserActivities] = useState(new Map());
  const loggedInUser = useSelector((state)=>state.user.user)// Replace with actual login logic

  useEffect(() => {
    // Simulated fetch - replace with real API call
    const dummyUsers = [
      {
        id: "1",
        fullName: "John Doe",
        imageUrl: "https://i.pravatar.cc/100?img=1",
      },
      {
        id: "2",
        fullName: "Jane Smith",
        imageUrl: "https://i.pravatar.cc/100?img=2",
      },
    ];

    const dummyOnline = new Set(["1", "2"]);
    const dummyActivities = new Map([
      ["1", "Playing Shape of You by Ed Sheeran"],
      ["2", "Idle"],
    ]);

    setUsers(dummyUsers);
    setOnlineUsers(dummyOnline);
    setUserActivities(dummyActivities);
  }, []);

  if (!loggedInUser) return <LoginPrompt />;
   if (loggedInUser) return <LoginPrompt />;

  return (
    <div className='h-full bg-zinc-900 rounded-lg flex flex-col mt-2'>
      <div className='p-4 flex justify-between items-center border-b border-zinc-800'>
        <div className='flex items-center gap-2'>
          <Users className='size-5 shrink-0 bg-white' />
          <h2 className='font-semibold text-white'>What they're listening to</h2>
        </div>
      </div>

      <ScrollArea className='flex-1'>
        <div className='p-4 space-y-4'>
          {users.map((user) => {
            const activity = userActivities.get(user.id);
            const isPlaying = activity && activity !== "Idle";

            return (
              <div
                key={user.id}
                className='cursor-pointer hover:bg-zinc-800/50 p-3 rounded-md transition-colors group'
              >
                <div className='flex items-start gap-3'>
                  <div className='relative'>
                    <Avatar className='size-10 border border-zinc-800'>
                      <AvatarImage src={user.imageUrl} alt={user.fullName} />
                      <AvatarFallback>{user.fullName[0]}</AvatarFallback>
                    </Avatar>
                    <div
                      className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-zinc-900 
                      ${onlineUsers.has(user.id) ? "bg-green-500" : "bg-zinc-500"}`}
                      aria-hidden='true'
                    />
                  </div>

                  <div className='flex-1 min-w-0'>
                    <div className='flex items-center gap-2'>
                      <span className='font-medium text-sm text-white'>{user.fullName}</span>
                      {isPlaying && <Music className='size-3.5 text-emerald-400 shrink-0' />}
                    </div>

                    {isPlaying ? (
                      <div className='mt-1'>
                        <div className='mt-1 text-sm text-white font-medium truncate'>
                          {activity.replace("Playing ", "").split(" by ")[0]}
                        </div>
                        <div className='text-xs text-zinc-400 truncate'>
                          {activity.split(" by ")[1]}
                        </div>
                      </div>
                    ) : (
                      <div className='mt-1 text-xs text-zinc-400'>Idle</div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
};

export default RightSideBar;

const LoginPrompt = () => (
  <div className='h-full flex flex-col items-center justify-center p-6 text-center space-y-4'>
    <div className='relative'>
      <div className='absolute -inset-1 bg-gradient-to-r from-emerald-500 to-sky-500 rounded-full blur-lg opacity-75 animate-pulse' />
      <div className='relative bg-zinc-900 rounded-full p-4'>
        <HeadphonesIcon className='size-8 text-emerald-400' />
      </div>
    </div>
    <div className='space-y-2 max-w-[250px]'>
      <h3 className='text-lg font-semibold text-white'>See What Friends Are Playing</h3>
      <p className='text-sm text-zinc-400'>
        Login to discover what music your friends are enjoying right now
      </p>
    </div>
  </div>
);
