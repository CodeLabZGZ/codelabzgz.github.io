import * as mdxComponents from "@/components/landing/mdx"

export function useMDXComponents (components) {
  return {
    ...components,
    ...mdxComponents
  }
}
