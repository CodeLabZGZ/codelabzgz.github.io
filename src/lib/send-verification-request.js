import { MagicLink } from "@/emails/magic-link"
import { resend } from "@/lib/resend"

export async function sendVerificationRequest(params) {
  const { identifier, url, provider, theme } = params
  const { host } = new URL(url)

  try {
    const data = await resend.emails.send({
      from: provider.from,
      to: [identifier],
      subject: `Log in to ${host}`,
      text: text({ url, host }),
      react: MagicLink({ magicLink: url })
    })
    return { success: true, data }
  } catch (error) {
    throw new Error(
      "No se ha podido enviar el correo electrónico de verificación."
    )
  }
}

function text({ url, host }) {
  return `Sign in to ${host}\n${url}\n\n`
}
