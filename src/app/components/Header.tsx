import Link from "next/link"

export default function Header() {
  return (
    <header className="bg-secondary text-secondary-foreground">
      <nav className="container mx-auto px-4 py-6">
        <ul className="flex space-x-4">
          <li>
            <Link href="/" className="hover:text-primary">
              Home
            </Link>
          </li>
          <li>
            <Link href="/#about" className="hover:text-primary">
              About
            </Link>
          </li>
          <li>
            <Link href="/resume" className="hover:text-primary">
              Resume
            </Link>
          </li>
          <li>
            <Link href="/#connect" className="hover:text-primary">
              Connect
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}
