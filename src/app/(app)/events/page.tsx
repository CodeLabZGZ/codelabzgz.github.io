import Joined from "./joined";
import OnGoing from "./ongoing";
import Past from "./past";
import UpComming from "./upcoming";

export default async function Page() {
  return (
    <div>
      {true && <OnGoing />}
      {false && <UpComming />}
      {false && <Joined />}
      {false && <Past />}
    </div>
  )
}
