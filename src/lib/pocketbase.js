import PocketBase from "pocketbase"

const pb = new PocketBase(process.env.PB_API)
await pb.admins.authWithPassword(process.env.PB_USER, process.env.PB_PASS)

export default pb
