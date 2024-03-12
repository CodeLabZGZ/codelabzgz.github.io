import * as cheerio from 'cheerio'

import { Feed } from 'feed'
import assert from 'assert'

export async function GET(req: Request) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL

  if (!siteUrl) {
    throw Error('Missing NEXT_PUBLIC_SITE_URL environment variable')
  }

  const author = {
    name: 'Joe Davola',
    email: 'crazy.joe@example.com',
  }

  const feed = new Feed({
    title: 'Commit',
    description: 'Open-source Git client for macOS minimalists',
    author,
    id: siteUrl,
    link: siteUrl,
    image: `${siteUrl}/favicon.ico`,
    favicon: `${siteUrl}/favicon.ico`,
    copyright: `All rights reserved ${new Date().getFullYear()}`,
    feedLinks: {
      rss2: `${siteUrl}/feed.xml`,
    },
  })

  const html = await (await fetch(new URL('/', req.url))).text()
  const $ = cheerio.load(html)

  $('article').each(function () {
    const id = $(this).attr('id')
    assert(typeof id === 'string')

    const url = `${siteUrl}/#${id}`
    const heading = $(this).find('h2').first()
    const title = heading.text()
    const date = $(this).find('time').first().attr('datetime')

    // Tidy content
    heading.remove()
    $(this).find('h3 svg').remove()

    const content = $(this).find('[data-mdx-content]').first().html()

    assert(typeof title === 'string')
    assert(typeof date === 'string')
    assert(typeof content === 'string')

    feed.addItem({
      title,
      id: url,
      link: url,
      content,
      author: [author],
      contributor: [author],
      date: new Date(date),
    })
  })

  return new Response(feed.rss2(), {
    status: 200,
    headers: {
      'content-type': 'application/xml',
      'cache-control': 's-maxage=31556952',
    },
  })
}
