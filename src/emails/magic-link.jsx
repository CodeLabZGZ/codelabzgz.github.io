import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text
} from "@react-email/components"

export const MagicLink = ({ magicLink }) => (
  <Html>
    <Head />
    <Preview>Inicia sesión con este enlace mágico.</Preview>
    <Body style={main}>
      <Container style={container}>
        <Img
          src={`${process.env.NEXT_PUBLIC_SITE_URL}/static/codelabzgz-logo.png`}
          width={48}
          height={48}
          alt="codelabzgz"
        />
        <Heading style={heading}>🪄 Tu magic link</Heading>
        <Section style={body}>
          <Text style={paragraph}>
            <Link style={link} href={magicLink}>
              👉 Haga clic aquí para iniciar sesión 👈
            </Link>
          </Text>
          <Text style={paragraph}>
            Si no lo ha solicitado, ignore este correo electrónico y pongase en
            contacto con el equipo de codelabzgz.
          </Text>
        </Section>
        <Text style={paragraph}>
          Saludos cordiales,
          <br />- El equipo de codelabzgz
        </Text>
        <Hr style={hr} />
        <Img
          src={`${process.env.NEXT_PUBLIC_SITE_URL}/static/codelabzgz-logo.png`}
          width={32}
          height={32}
          style={{
            WebkitFilter: "grayscale(100%)",
            filter: "grayscale(100%)",
            margin: "20px 0"
          }}
        />
        <Text style={footer}>codelabzgz</Text>
        <Text style={footer}>
          C. María de Luna, 1, Zaragoza, Aragón 50018, ES
        </Text>
      </Container>
    </Body>
  </Html>
)

MagicLink.PreviewProps = {
  magicLink: "https://codelabzgz.dev"
}

export default MagicLink

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif'
}

const container = {
  margin: "0 auto",
  padding: "20px 25px 48px",
  backgroundImage: 'url("/assets/raycast-bg.png")',
  backgroundPosition: "bottom",
  backgroundRepeat: "no-repeat, no-repeat"
}

const heading = {
  fontSize: "28px",
  fontWeight: "bold",
  marginTop: "48px"
}

const body = {
  margin: "24px 0"
}

const paragraph = {
  fontSize: "16px",
  lineHeight: "26px"
}

const link = {
  color: "#FF6363"
}

const hr = {
  borderColor: "#dddddd",
  marginTop: "48px"
}

const footer = {
  color: "#8898aa",
  fontSize: "12px",
  marginLeft: "4px"
}
