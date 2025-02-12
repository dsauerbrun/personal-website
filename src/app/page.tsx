import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <section className="mb-12">
        <p className="text-xl text-primary">
          Hi, I'm Daniel. I'm a software developer passionate about building scalable applications and learning new technologies.
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
            <p>I first started programming when I was 13 years old. I was hanging out in IRC chat rooms and playing A LOT of Starcraft: Brood War.
               I really wanted to make a fan site for Starcraft and some of the technical people in the chat rooms volunteered to teach me. I built the crappiest looking website you'd have ever seen, even by early 2000's standards, but I was hooked!</p>
            <br />
            <p>Fast forward 20 years and I've worked at a number of early stage startups which taught me how to wear many hats as well as more 
              established/public companies which taught me how to work in larger organizations.
               I have a passion for building scalable applications and learning new technologies. 
               I also enjoy mentoring junior developers and sharing knowledge with the community.</p>

            <br /> 
            <p>Beyond my passion for software, I have spent a chunk of my life rock climbing. 
              On weekends you can typically find me climbing locally in the Flatirons or Clear Creek Canyon.
              For my vacations you'll usually find me on some European limestone. I love to travel and typically combine my vacations with climbing trips.
              On that note, I created a website, <a href="https://www.climbcation.com/" target="_blank">climbcation.com</a> to help people plan their vacations to world class climbing destinations.</p>

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
            I am a seasoned software engineer with over a decade of experience designing and developing scalable systems and robust applications. 
            My expertise spans technologies like TypeScript, Go, Kafka, Kubernetes, and React, allowing me to deliver impactful solutions and modernize legacy systems.
            </p>
            <br />
            <p>
            Most recently, at Opendoor, I led the development of a React-based micro frontend framework which was adopted rapidly leading to a more effective ecosystem of tooling, 
            contributed to high-performance Golang microservices, and led the migration of services to AWS EKS. I also spent a good chunk of my time working closely with adjacent teams' staff engineers to ensure seamless integration across engineering groups.
            </p>
            <br />
            <p>
            Earlier in my career, I helped build backend systems that could handle bursty traffic. As a full-stack developer at FulcrumPro and ChatLingual, I got hands-on with everything from building ERP systems to launching MVPs, tackling challenges across the stack. I love digging into tough problems and finding practical, scalable solutions that make life easier for both teams and users.
            </p>
            <Button className="mt-4 button" variant="outline" asChild>
              <Link href="/resume">View My Full Resume</Link>
            </Button>
          </CardContent>
        </Card>
      </section>

      <section>
        <h2 className="text-3xl font-semibold mb-4 text-primary">Connect With Me</h2>
        <div className="flex flex-wrap gap-4">
          <Button variant="outline" asChild className="button">
            <Link href="https://github.com/dsauerbrun" target="_blank">
              GitHub
            </Link>
          </Button>
          <Button variant="outline" asChild className="button">
            <Link href="https://linkedin.com/in/dsauerbrun" target="_blank">
              LinkedIn
            </Link>
          </Button>
          <Button variant="outline" asChild className="button">
            <Link href="mailto:dsauerbrun@gmail.com" target="_blank">
              dsauerbrun@gmail.com
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}

