import { type Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Codelab',
  description:
    'Codelab es una asociación de estudiantes de Informática de la EINA en Zaragoza que organiza eventos de alto nivel, hackatones, meetups y mucho más. Fue creada por y para estudiantes con el objetivo de fomentar el networking.',
  alternates: {
    types: {
      'application/rss+xml': `${process.env.NEXT_PUBLIC_SITE_URL}/feed.xml`,
    },
  },
}