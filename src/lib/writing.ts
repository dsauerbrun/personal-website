import fs from "fs"
import path from "path"
import matter from "gray-matter"

const WRITING_DIR = path.join(process.cwd(), "content/writing")

export interface WritingMeta {
  slug: string
  title: string
  date: string
}

export function getAllWritings(): WritingMeta[] {
  const files = fs.readdirSync(WRITING_DIR).filter((file) => file.endsWith(".mdx"))

  const writings = files.map((file) => {
    const slug = file.replace(/\.mdx$/, "")
    const source = fs.readFileSync(path.join(WRITING_DIR, file), "utf8")
    const { data } = matter(source)
    return { slug, title: data.title as string, date: data.date as string }
  })

  return writings.sort((a, b) => b.date.localeCompare(a.date))
}

export function getWritingSource(slug: string): string {
  return fs.readFileSync(path.join(WRITING_DIR, `${slug}.mdx`), "utf8")
}
