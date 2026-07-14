import { notFound } from "next/navigation"
import { compileMDX } from "next-mdx-remote/rsc"
import rehypeSlug from "rehype-slug"
import { getAllWritings, getWritingSource } from "@/lib/writing"

interface Frontmatter {
  title: string
  date: string
}

export function generateStaticParams() {
  return getAllWritings().map((w) => ({ slug: w.slug }))
}

export default async function WritingArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  let source: string
  try {
    source = getWritingSource(slug)
  } catch {
    notFound()
  }

  const { content, frontmatter } = await compileMDX<Frontmatter>({
    source,
    options: {
      parseFrontmatter: true,
      mdxOptions: { rehypePlugins: [rehypeSlug] },
    },
  })

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-4xl font-bold mb-2 text-primary">{frontmatter.title}</h1>
      <p className="text-sm text-muted-foreground mb-8">{frontmatter.date}</p>
      <article className="prose prose-invert max-w-none [&_pre]:bg-secondary">{content}</article>
    </div>
  )
}
