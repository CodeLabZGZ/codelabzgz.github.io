import JoinRequest from "./join-request"
import TeamDetails from "./team-details"
import TeamPlayers from "./team-players"
import TeamSettings from "./team-settings"

export default function Page() {
  return (
    <div>
      {false && <TeamDetails/>}
      {true && <TeamPlayers/>}
      {false && <TeamSettings/>}
      {false && <JoinRequest/>}
    </div>
  )
}
