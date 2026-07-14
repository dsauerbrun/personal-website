import Link from "next/link"
import { getAllWritings } from "@/lib/writing"

export default function WritingPage() {
  const writings = getAllWritings()

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-primary">Writing</h1>
      <ul>
        {writings.map((w) => (
          <li
            key={w.slug}
            className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4 py-3 border-b border-border"
          >
            <span className="text-sm text-muted-foreground sm:w-32 shrink-0">
              {w.date}
            </span>
            <Link href={`/writing/${w.slug}`} className="text-lg text-primary">
              {w.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
