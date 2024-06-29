# codelabzgz.github.io

[![node](https://img.shields.io/badge/node-18.x-blue)](https://nodejs.org/en/download)
[![npm](https://img.shields.io/badge/npm-10.x-blue)](https://www.npmjs.com/)

[![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white)](https://eslint.org/)
[![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)

## Getting started

To get started, first install the dependencies with npm:

```bash
npm i
```

Next, rename the `.env.example` file to `.env` and set the environment variables. Then start the development server.

```bash
npm run dev
```

### Run for a development environment

```bash
git clone -b develop --depth 1 https://github.com/CodeLabZGZ/codelabzgz.github.io.git
npm i
npm run dev
```

### Run for a production environment

> [!IMPORTANT]
> For production deployment do not forget to launch judge0. [Instructions](https://github.com/judge0/judge0/blob/master/CHANGELOG.md#deployment-procedure)

```bash
docker build -t codelab:latest .
```

```bash
docker run -p 3000:3000 --env-file .env codelab:latest
```

---

```bash
docker compose up -d
```

---

```bash
make start
```

## Customizing

We've tried to build this template exactly the same way we'd build it if it we were building a real website, so there's no weird configuration files or global variables like you might see in a product that has been built as a "theme" rather than as an actual site.

Instead, you make changes by just opening the files you want to change, and changing whatever it is you want to change.

We'll cover a lot of the fundamentals here to help you get going quickly, but at the end of the day the whole codebase is yours and you should feel free to edit everything directly as much as you need to.

### Project structure

The template is built as a pretty standard Next.js website, but using the `src` folder so things like the `app` directory are located at `./src/app` instead of being top-level.

#### Folder structure

- `app`: Place where the main structure and code that follows every page of the application is stored.
- `components`: Reusable code snippets that are used throughout all of the pages
- `stores`: Encapsulates a global state that can be accessed from anywhere in the application (we use [zustand](https://zustand-demo.pmnd.rs/) to manage global states).
- `hooks`: Encapsulates small pieces of code that represent a certain type of logic.
- `lib`: Chaos property, stores here functionalities that do not have to do with the rest of the mentioned sections.
- `public`: Static content that is publicly accessible
- `styles`: Contains the styles of the application. Override or new styles in [`tailwind.config.js`](tailwind.config.js).

#### Naming convention

- camelCase for variable names and object properties (e.g: exampleExample)
- PascalCase for type names and classes (e.g: ExampleExample)
- kebab-case for module names (e.g: example-example)

### Hero content

The main hero section for the site that includes your logo, headline, description, and links are all located in `./src/components/Intro.tsx`.

### Adding changelog entries

All of the changelog entries are stored in one big `./src/app/page.mdx` file. We were inspired to set it up this way by how projects commonly maintain plaintext `CHANGELOG` files, and thought it would be cool to parse this sort of format and turn it into a nicely designed site.

Each changelog entry should be separated by a horizontal rule (`---`) and should include an `<h2>` with a date, specified as an [MDX annotation](https://github.com/bradlc/mdx-annotations):

```md
---

![](@/images/your-screenshot.png)

## My new changelog entry {{ date: '2023-04-06T00:00Z' }}

Your content...
```

### RSS feed

The site uses a [route handler](https://nextjs.org/docs/app/building-your-application/routing/router-handlers) to automatically generate an RSS feed at run time based on the rendered home page.

You can edit the metadata for the feed (like the title and description) in `./src/app/feed.xml/route.ts`.

Make sure to set your `NEXT_PUBLIC_SITE_URL` environment variable as the RSS feed needs this to generate the correct links for each entry.

## License

This site template is a commercial product and is licensed under the [Tailwind UI license](https://tailwindui.com/license).

## Learn more

To learn more about the technologies used in this site template, see the following resources:

- [Tailwind CSS](https://tailwindcss.com/docs) - the official Tailwind CSS documentation
- [Next.js](https://nextjs.org/docs) - the official Next.js documentation
- [Motion One](https://motion.dev/) - the official Motion One documentation
- [MDX](https://mdxjs.com/) - the official MDX documentation

## Maintenance & Update to latest

```bash
npm install -g npm-check-updates
ncu
```
