import { nameInitials } from "../helpers/name-initials";

const TeamView: React.FunctionComponent<any> = ({ teamView, dashboardData, setDashboardData }) => {

  const loadDataFromLocalStorage = () => {

  };

  const saveDataToTeam = (memberName: string) => {
    let _data: any[] = [];
    if (!JSON.parse(localStorage.getItem(teamView) as any)) {
      _data = [];
    } else {
      _data = JSON.parse(localStorage.getItem(teamView) as any);
    };

    _data.push({
      name: memberName,
      id: Math.floor(Math.random() * 10 ** 4)
    });

    // saving in the storage
    localStorage.setItem(teamView, JSON.stringify(_data));
    // saving into state
    setDashboardData({
      ...dashboardData,
      [teamView]: _data
    })
  };

  const handleRemoval = (id: any) => {
    let _newData = [...dashboardData[teamView]];
    _newData = _newData.filter((member) => {
      if (member.id !== id) {
        return member;
      }
    });
    setDashboardData({
      ...dashboardData,
      [teamView]: _newData
    });
    localStorage.setItem(teamView, JSON.stringify(_newData));
  }

  return (
    <div className="team-view p-6 pr-12 w-full">
      <h1 className="text-xl font-medium">{teamView + " Team"}</h1>
      <button className="mt-6 w-fit ml-auto block rounded-lg p-4 bg-gradient-to-t from-neutral-900 to-neutral-700 font-medium text-sm text-neutral-100 shadow-xl hover:shadow active:shadow-sm active:scale-95 transition-all"
        onClick={() => {
          // Take new member input
          const newMember = window.prompt("Enter new member name");
          if (!newMember) return;

          saveDataToTeam(newMember as string);
        }}
      >
        Add new member
      </button>

      <div className="members-list mt-24">
        {dashboardData[teamView]?.map((teamMember: any, index: number) => {
          return (
            <div key={index} className="w-full flex flex-row items-center justify-between p-4 border-b border-neutral-300">
              <div className="flex flex-row items-center justify-start gap-4">
                <div className="w-12 h-12 flex flex-row items-center justify-center rounded-full text-lg text-neutral-100 bg-neutral-800">
                  {nameInitials(teamMember.name)}
                </div>
                {teamMember.name}
              </div>
              <button className="text-red-500"
                onClick={() => handleRemoval(teamMember.id)}
              >
                Remove
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
};

export default TeamView;