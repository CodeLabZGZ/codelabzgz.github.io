import Discord from "next-auth/providers/discord"
import GitHub from "next-auth/providers/github"

export default config = {
  providers: [Discord, GitHub]
}
