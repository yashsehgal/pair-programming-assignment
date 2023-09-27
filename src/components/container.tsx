import { useEffect, useState } from "react";
import { cn } from "../utils/cn"
import Sidebar from "./sidebar";
import TeamView from "./team-view";

const Container: React.FunctionComponent<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => {

  // To manage the dashboard data...
  const [dashboardData, setDashboardData] = useState<{
    "engineering": { name: string; id: string }[],
    "product": { name: string; id: string }[],
    "support": { name: string; id: string }[]
  }>({
    "engineering": [],
    "product": [],
    "support": []
  });

  // To handle the current selected team...
  const [teamView, setTeamView] = useState<TeamType>("Engineering");

  const toggleTeamView = (teamName: TeamType) => setTeamView(teamName);

  return (
    <div className={cn("main-container flex flex-row items-start justify-start gap-6")} {...props}>
      <Sidebar
        data={dashboardData}
        teamView={teamView}
        toggleTeamView={toggleTeamView}
        currentTeamView={teamView} />
      <TeamView
        teamView={teamView}
        dashboardData={dashboardData}
        setDashboardData={setDashboardData} />
    </div>
  )
}

export default Container;