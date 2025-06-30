import { useSelector } from "react-redux";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Users, Music } from "lucide-react";
import { HeadphonesIcon } from "lucide-react";
import { useEffect } from "react";

const RightSideBar = () => {
  const loggedInUser = useSelector((state) => state?.user?.user);


    
  const usersInfo = useSelector((state) => state?.socket?.usersInfo || {});
  const onlineUsers = useSelector((state) => state?.socket?.onlineUsers || []);
  const activities = useSelector((state) => state?.socket?.activities || {});


   
if (!onlineUsers || onlineUsers?.length === 1) 
   return <LoginPrompt loggedInUser={loggedInUser}/>

  if (!loggedInUser) return <LoginPrompt />;



  return (
    <div
      className="min-h-screen h-full flex flex-col py-2" 
      style={{
        background: "rgba(18, 18, 18, 0.30)",
        backdropFilter: "blur(74px)",
        WebkitBackdropFilter: "blur(74px)",
      }}
    >
      <div className="p-2 sm:p-4 flex justify-between items-center border-b border-zinc-800">
        <div className="flex items-center gap-2">
          <Users className="size-5 shrink-0 text-white" />
          <h2 className="font-semibold text-white text-xs sm:text:sm md:text-lg lg:text-xl">
            What they're listening to
          </h2>
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="py-2 sm:p-4 space-y-4">
          {Object.entries(usersInfo).map(([userId, user]) => {
            // console.log(userId, user);
            //if (userId === loggedInUser._id) return null;

            const activity = activities[userId];
            const isOnline = onlineUsers?.includes(userId);
            const isPlaying = activity?.status === "Playing";

            return (
              <div
                key={userId}
                className="cursor-pointer hover:bg-zinc-800/50 p-3 rounded-md transition-colors group"
              >
                <div className="flex items-start gap-3">
                  <div className="relative">
                    <Avatar className="size-10 border border-zinc-800">
                      <AvatarImage src={user?.coverImage} alt={user?.name} />
                      <AvatarFallback>{user?.name[0]}</AvatarFallback>
                    </Avatar>
                    <div
                      className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-zinc-900 
                      ${isOnline ? "bg-green-500" : "bg-zinc-500"}`}
                      aria-hidden="true"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm text-white">
                        {user.name}
                      </span>
                      {isPlaying && (
                        <Music className="size-3.5 text-emerald-400 shrink-0" />
                      )}
                    </div>

                    {isPlaying ? (
                      <div className="mt-1">
                        <div className="text-sm text-white font-medium truncate">
                          {activity?.title}
                        </div>
                        <div className="text-xs text-zinc-400 truncate">
                          {activity?.artist}
                        </div>
                      </div>
                    ) : (
                      <div className="mt-1 text-xs text-zinc-400">Idle</div>
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

const LoginPrompt = ({loggedInUser}) => (
  
  <div className="h-full min-h-screen flex flex-col items-center justify-center p-6 text-center space-y-4">
    <div className="relative">
      <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-sky-500 rounded-full blur-lg opacity-75 animate-pulse" />
      <div className="relative bg-zinc-900 rounded-full p-4">
        <HeadphonesIcon className="size-8 text-emerald-400" />
      </div>
    </div>
    <div className="space-y-2 max-w-[250px]">
      <h3 className="text-lg font-semibold text-white">
        See What Friends Are Playing
      </h3>
   { !loggedInUser &&  <p className="text-sm text-zinc-400">
        Login to discover what music your friends are enjoying right now
      </p>
      }
         { <p className="text-sm text-zinc-400">
        Currently no friends is online
      </p>
      }
    </div>
  </div>
);
