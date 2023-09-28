import { nameInitials } from "../helpers/name-initials";
import { cn } from "../utils/cn"

const Sidebar: React.FunctionComponent<React.HTMLAttributes<HTMLDivElement> & any> = ({
  data,
  toggleTeamView,
  currentTeamView,
  className,
  ...props
}) => {
  return (
    <nav className={cn("h-screen w-[320px] bg-neutral-200 flex gap-6 flex-col items-stretch p-6 justify-start max-md:h-fit max-md:w-screen max-md:flex-row",
      "shadow-inner",
      className)}
      {...props}
    >
      {["Engineering", "Product", "Support"].map((team: string, index: number) => {
        return (
          <TeamOption
            teamName={team as any}
            members={data[team]}
            toggleTeamView={toggleTeamView}
            currentTeamView={currentTeamView}
            key={index}
          />
        )
      })}
    </nav>
  )
};

interface TeamOptionProps {
  teamName?: TeamType;
  members?: string[];
};

const TeamOption: React.FunctionComponent<TeamOptionProps & any> = ({
  teamName,
  currentTeamView,
  members,
  toggleTeamView
}) => {
  return (
    <button
      className={cn("h-fit w-full rounded-lg border-2 border-white bg-neutral-50 flex flex-row items-start justify-start p-4 shadow-lg",
        (currentTeamView === teamName) && "border-2 border-red-400 bg-red-100"
      )}
      id={teamName}
      onClick={() => toggleTeamView(teamName)}
    >
      <div className={cn("team-content-wrapper text-left")}>
        <h2>{teamName}</h2>
        <div className="members-avatar-wrapper mt-2">
          {members?.length === 0 && <p className="text-sm font-normal text-neutral-400 select-none">
            {"No members"}
          </p>}
          {members && <div className="flex flex-row items-center justify-start">
            {members?.map((memberName: any, index: number) => {
              console.log("member name", memberName);
              if (index < 4) {
                return (
                  <div className="w-6 h-6 flex flex-row items-center justify-center rounded-full text-xs text-neutral-100 bg-neutral-800 -mr-2"
                    key={index}
                  >
                    {nameInitials(memberName.name)}
                  </div>
                )
              }
            })}
            {/* To show if there are more than 4 members*/}
            {members?.length > 4 && <div className="w-6 h-6 flex flex-row items-center justify-center rounded-full text-sm text-neutral-500 bg-neutral-100 -mr-2"
            >
              {`+${members.length - 4}`}
            </div>}
          </div>}
        </div>
      </div>
    </button>
  )
}

export default Sidebar;