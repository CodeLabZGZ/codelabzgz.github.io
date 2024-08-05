const termsAndConditions = {
  lastUpdated: "2024-08-05",
  contact: {
    name: "CodeLabZgz",
    address: "C. María de Luna, 1, Zaragoza, Aragón 50018, ES",
    building: "Edificio Ada Byron",
    email: "codelabzgz@unizar.es"
  },
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL,
  jurisdiction: "España"
}

export default function Page() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-6">
      <h1 className="mb-4 text-3xl font-bold">Términos y Condiciones</h1>
      <p className="mb-4">
        <strong>Última actualización:</strong> {termsAndConditions.lastUpdated}
      </p>
      <p>
        Bienvenido a <strong>{termsAndConditions.contact.name}</strong>. Al
        acceder y utilizar nuestro sitio web {termsAndConditions.siteUrl},
        aceptas cumplir con los siguientes Términos y Condiciones.
      </p>
      <h2 className="mb-4 mt-6 text-2xl font-semibold">
        1. Aceptación de los Términos
      </h2>
      <p className="mb-4">
        Al utilizar nuestro sitio web, aceptas estos Términos y Condiciones y te
        comprometes a cumplir con ellos. Si no estás de acuerdo, no utilices
        nuestro sitio.
      </p>
      <h2 className="mb-4 mt-6 text-2xl font-semibold">2. Uso del Sitio Web</h2>
      <ul className="mb-4 list-inside list-disc">
        <li>
          <strong>Elegibilidad:</strong> Debes tener al menos [Edad Mínima] años
          para utilizar nuestro sitio web.
        </li>
        <li>
          <strong>Cuenta de Usuario:</strong> Puedes necesitar crear una cuenta
          para acceder a ciertas funciones. Eres responsable de mantener la
          confidencialidad de tu cuenta y contraseña.
        </li>
        <li>
          <strong>Conducta Prohibida:</strong> No puedes usar el sitio para
          actividades ilegales, publicar contenido ofensivo o infringir los
          derechos de otros.
        </li>
      </ul>
      <h2 className="mb-4 mt-6 text-2xl font-semibold">
        3. Propiedad Intelectual
      </h2>
      <p className="mb-4">
        Todo el contenido y materiales disponibles en el sitio web, incluyendo
        textos, gráficos, logotipos, y software, son propiedad de{" "}
        {termsAndConditions.contact.name} y están protegidos por leyes de
        propiedad intelectual.
      </p>
      <h2 className="mb-4 mt-6 text-2xl font-semibold">
        4. Enlaces a Terceros
      </h2>
      <p className="mb-4">
        Nuestro sitio puede contener enlaces a sitios web de terceros. No somos
        responsables del contenido o prácticas de privacidad de esos sitios.
      </p>
      <h2 className="mb-4 mt-6 text-2xl font-semibold">
        5. Limitación de Responsabilidad
      </h2>
      <p className="mb-4">
        {termsAndConditions.contact.name} no será responsable de daños directos,
        indirectos, incidentales, especiales o consecuentes que resulten del uso
        o la incapacidad de uso del sitio.
      </p>
      <h2 className="mb-4 mt-6 text-2xl font-semibold">
        6. Modificaciones a los Términos
      </h2>
      <p className="mb-4">
        Nos reservamos el derecho de modificar estos Términos y Condiciones en
        cualquier momento. Las modificaciones serán efectivas al publicarlas en
        el sitio. Tu uso continuado del sitio implica la aceptación de los
        términos modificados.
      </p>
      <h2 className="mb-4 mt-6 text-2xl font-semibold">7. Ley Aplicable</h2>
      <p className="mb-4">
        Estos Términos y Condiciones se regirán e interpretarán de acuerdo con
        las leyes de {termsAndConditions.jurisdiction}.
      </p>
      <h2 className="mb-4 mt-6 text-2xl font-semibold">8. Contacto</h2>
      <p className="mb-4">
        Si tienes preguntas o inquietudes sobre estos Términos y Condiciones,
        contáctanos en:
      </p>
      <p>
        <strong>{termsAndConditions.contact.name}</strong>
        <br />
        {termsAndConditions.contact.address}
        <br />
        {termsAndConditions.contact.building}
        <br />
        <a
          href={`mailto:${termsAndConditions.contact.email}`}
          className="text-blue-500 hover:underline"
        >
          {termsAndConditions.contact.email}
        </a>
      </p>
    </div>
  )
}
