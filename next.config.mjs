import nextMDX from '@next/mdx'
import { recmaPlugins } from './mdx/recma.mjs'
import { rehypePlugins } from './mdx/rehype.mjs'
import { remarkPlugins } from './mdx/remark.mjs'

const withMDX = nextMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins,
    rehypePlugins,
    recmaPlugins,
  },
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'mdx'],
  output: "standalone",
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
}

export default withMDX(nextConfig)
