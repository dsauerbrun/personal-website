import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <section className="mb-12">
        <h1 className="text-4xl font-bold mb-4 text-primary">Welcome to My Personal Website</h1>
        <p className="text-xl text-primary">
          Hi, I'm [Your Name]. I'm a [Your Profession] passionate about [Your Interests].
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-semibold mb-4 text-primary">About Me</h2>
        <Card className="bg-secondary text-secondary-foreground">
          <CardHeader>
            <CardTitle className="text-primary">A Brief Introduction</CardTitle>
            <CardDescription>Get to know me better</CardDescription>
          </CardHeader>
          <CardContent>
            <p>[Write a brief paragraph about yourself, your background, and your professional interests.]</p>
          </CardContent>
        </Card>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-semibold mb-4 text-primary">My Work</h2>
        <Card className="bg-secondary text-secondary-foreground">
          <CardHeader>
            <CardTitle className="text-primary">Professional Experience</CardTitle>
            <CardDescription>A glimpse into my career</CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              I have experience in [Your Key Skills/Technologies]. I've worked on projects ranging from [Type of
              Projects].
            </p>
            <Button className="mt-4" variant="outline" asChild>
              <Link href="/resume">View My Full Resume</Link>
            </Button>
          </CardContent>
        </Card>
      </section>

      <section>
        <h2 className="text-3xl font-semibold mb-4 text-primary">Connect With Me</h2>
        <div className="flex flex-wrap gap-4">
          <Button variant="outline" asChild>
            <Link href="https://github.com/yourusername" target="_blank">
              GitHub
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="https://linkedin.com/in/yourusername" target="_blank">
              LinkedIn
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="https://twitter.com/yourusername" target="_blank">
              Twitter
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}

