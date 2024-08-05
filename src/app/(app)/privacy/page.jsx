const privacyPolicy = {
  lastUpdated: "2024-08-05",
  contact: {
    name: "CodeLabZgz",
    address: "C. María de Luna, 1, Zaragoza, Aragón 50018, ES",
    building: "Edificio Ada Byron",
    email: "codelabzgz@unizar.es"
  },
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL
}

export default function Page() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-6">
      <h1 className="mb-4 text-3xl font-bold">Política de Privacidad</h1>
      <p className="mb-4">
        <strong>Última actualización:</strong> {privacyPolicy.lastUpdated}
      </p>
      <p className="mb-4">
        En <strong>{privacyPolicy.contact.name}</strong>, valoramos tu
        privacidad y nos comprometemos a proteger tu información personal. Esta
        Política de Privacidad describe cómo recopilamos, utilizamos y
        compartimos tu información cuando visitas nuestro sitio web{" "}
        {privacyPolicy.siteUrl}.
      </p>
      <h2 className="mb-4 mt-6 text-2xl font-semibold">
        1. Información que Recopilamos
      </h2>
      <ul className="mb-4 list-inside list-disc">
        <li>
          <strong>Información Personal:</strong> Podemos recopilar información
          personal, como tu nombre, dirección de correo electrónico y cualquier
          otra información que decidas proporcionarnos a través de formularios
          de registro o contacto.
        </li>
        <li>
          <strong>Información de Navegación:</strong> Recopilamos
          automáticamente información sobre tu dispositivo y tu uso del sitio
          web, incluyendo tu dirección IP, tipo de navegador, páginas visitadas
          y tiempo de visita, a través de cookies y tecnologías similares.
        </li>
      </ul>
      <h2 className="mb-4 mt-6 text-2xl font-semibold">
        2. Uso de la Información
      </h2>
      <p className="mb-4">Utilizamos la información recopilada para:</p>
      <ul className="mb-4 list-inside list-disc">
        <li>Proporcionar y mejorar nuestros servicios.</li>
        <li>Personalizar tu experiencia en el sitio web.</li>
        <li>
          Comunicarnos contigo, responder a tus consultas y enviar información
          relevante.
        </li>
        <li>Analizar el tráfico del sitio web y entender cómo se utiliza.</li>
      </ul>
      <h2 className="mb-4 mt-6 text-2xl font-semibold">
        3. Uso de Cookies y Tecnologías Similares
      </h2>
      <p className="mb-4">
        Nuestro sitio web utiliza cookies para gestionar las sesiones de usuario
        y para servicios de análisis proporcionados por Cloudflare y Vercel. Las
        cookies nos ayudan a:
      </p>
      <ul className="mb-4 list-inside list-disc">
        <li>Mantenerte conectado en el sitio.</li>
        <li>Recopilar datos analíticos para mejorar nuestros servicios.</li>
      </ul>
      <h2 className="mb-4 mt-6 text-2xl font-semibold">
        4. Compartir Información
      </h2>
      <p className="mb-4">
        No vendemos ni alquilamos tu información personal a terceros. Podemos
        compartir tu información con:
      </p>
      <ul className="mb-4 list-inside list-disc">
        <li>
          Proveedores de servicios externos que nos ayudan a operar nuestro
          sitio web y prestar nuestros servicios.
        </li>
        <li>
          Autoridades legales si es requerido por ley o para proteger nuestros
          derechos.
        </li>
      </ul>
      <h2 className="mb-4 mt-6 text-2xl font-semibold">
        5. Seguridad de la Información
      </h2>
      <p className="mb-4">
        Implementamos medidas de seguridad para proteger tu información personal
        contra accesos no autorizados, alteración, divulgación o destrucción.
      </p>
      <h2 className="mb-4 mt-6 text-2xl font-semibold">6. Tus Derechos</h2>
      <p className="mb-4">
        Tienes derecho a acceder, corregir, actualizar o eliminar tu información
        personal. Para ejercer estos derechos, puedes contactarnos en{" "}
        <a
          href={`mailto:${privacyPolicy.contact.email}`}
          className="text-blue-500 hover:underline"
        >
          {privacyPolicy.contact.email}
        </a>
        .
      </p>
      <h2 className="mb-4 mt-6 text-2xl font-semibold">
        7. Cambios a esta Política de Privacidad
      </h2>
      <p className="mb-4">
        Nos reservamos el derecho de actualizar esta Política de Privacidad en
        cualquier momento. Te notificaremos cualquier cambio publicando la nueva
        política en nuestro sitio web.
      </p>
      <h2 className="mb-4 mt-6 text-2xl font-semibold">8. Contacto</h2>
      <p className="mb-4">
        Si tienes preguntas o inquietudes sobre esta Política de Privacidad,
        contáctanos en:
      </p>
      <p>
        <strong>{privacyPolicy.contact.name}</strong>
        <br />
        {privacyPolicy.contact.address}
        <br />
        {privacyPolicy.contact.building}
        <br />
        <a
          href={`mailto:${privacyPolicy.contact.email}`}
          className="text-blue-500 hover:underline"
        >
          {privacyPolicy.contact.email}
        </a>
      </p>
    </div>
  )
}
