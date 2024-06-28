import Discord from "next-auth/providers/discord"
import GitHub from "next-auth/providers/github"

const config = {
  providers: [Discord, GitHub]
}

export default config
