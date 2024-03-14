import { TeamCard } from "@/components/app/team-card"
import { auth } from "@clerk/nextjs/server";

export default async function Page() {
  const { userId } = auth()

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
      })).sort((a, b) => {
        const rolesOrder = { 'admin': 2, 'member': 1 };
        return rolesOrder[b.role] - rolesOrder[a.role];
      });
    })

  return (
    <div>
      <TeamCard teams={myTeams} />
    </div>
  )
}
