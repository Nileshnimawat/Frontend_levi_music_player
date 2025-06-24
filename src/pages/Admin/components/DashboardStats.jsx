import { Library, ListMusic, PlayCircle, Users2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useSelector } from "react-redux";
import { useStats } from "@/hooks/useStats";

const DashboardStats = () => {

const stats = useStats();
  const statsData = [
    {
      icon: ListMusic,
      label: "Total Songs",
      value: stats?.musics || 0,
      bgColor: "bg-emerald-500/10",
      iconColor: "text-emerald-500",
    },
    {
      icon: Library,
      label: "Total Playlists",
      value: stats?.playlists,
      bgColor: "bg-violet-500/10",
      iconColor: "text-violet-500",
    },
    {
      icon: Users2,
      label: "Total Artists",
      value: stats?.artists,
      bgColor: "bg-orange-500/10",
      iconColor: "text-orange-500",
    },
    {
      icon: PlayCircle,
      label: "Total Users",
      value: stats?.users,
      bgColor: "bg-sky-500/10",
      iconColor: "text-sky-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {statsData.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.label} className="bg-zinc-800/50 border-zinc-700/50 hover:bg-zinc-800/80 transition-colors">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <Icon className={`size-6 ${stat.iconColor}`} />
                </div>
                <div>
                  <p className="text-sm text-zinc-400">{stat.label}</p>
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default DashboardStats;