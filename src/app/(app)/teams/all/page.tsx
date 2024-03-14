import { TeamCard } from "@/components/app/team-card"
import { auth } from "@clerk/nextjs/server";

function merge<T>(
  array1: T[],
  array2: T[],
  key: keyof T
): T[] {
  return array1.map(a1 => {
    const obj = array2.find(a2 => a2[key] === a1[key])
    return { ...a1, ...obj }
  }).sort((a, b) => {
    const rolesOrder = { 'admin': 3, 'member': 2, null: 1 };
    const roleA = rolesOrder[a.role];
    const roleB = rolesOrder[b.role];
    
    // Si el valor es nulo, lo colocamos al final
    if (roleA === undefined) return 1;
    if (roleB === undefined) return -1;
  
    // Ordenamos en orden inverso según los valores definidos en rolesOrder
    return roleB - roleA;
  });
}

export default async function Page() {
  const { userId } = auth()

  let { data: teams } = await fetch('https://api.clerk.com/v1/organizations/', {
    headers: { "Authorization": `Bearer ${process.env.CLERK_SECRET_KEY}` }
  }).then(res => res.json())

  const myTeams = await fetch(`https://api.clerk.com/v1/users/${userId}/organization_memberships`, {
    headers: { "Authorization": `Bearer ${process.env.CLERK_SECRET_KEY}` }
  }).then(async (res) => {
      const {data} = await res.json()
      return data.map(({role, organization}) => ({
        id: organization.id,
        logo: organization.logo_url,
        name: organization.name,
        motto: organization.public_metadata.motto,
        role: role.replace('org:', ''),
        players: organization.public_metadata.players,
        challenges: organization.public_metadata.challenges
      }))
    })

  teams = merge(teams, myTeams, "id");

  return (
    <div>
      <TeamCard teams={teams} />
    </div>
  )
}
