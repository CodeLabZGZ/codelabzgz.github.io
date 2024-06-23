import { mdxAnnotations } from 'mdx-annotations'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import remarkUnwrapImages from 'remark-unwrap-images'

export const remarkPlugins = [
  mdxAnnotations.remark,
  remarkGfm,
  remarkUnwrapImages,
  remarkMath,
]
