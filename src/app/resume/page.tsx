import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function ResumePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-primary">My Resume</h1>

      <Card className="bg-secondary text-secondary-foreground mb-8">
        <CardHeader>
          <CardTitle className="text-primary">Professional Experience</CardTitle>
          <CardDescription>A summary of my work history</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Senior Developer</strong> at TechCorp (2020-Present)
              <p>Led development of cloud-based solutions, improving system efficiency by 40%.</p>
            </li>
            <li>
              <strong>Full Stack Developer</strong> at WebSolutions Inc. (2017-2020)
              <p>Developed and maintained multiple client websites using React and Node.js.</p>
            </li>
            <li>
              <strong>Junior Developer</strong> at StartupXYZ (2015-2017)
              <p>Assisted in the development of mobile applications using React Native.</p>
            </li>
          </ul>
        </CardContent>
      </Card>

      <Card className="bg-secondary text-secondary-foreground mb-8">
        <CardHeader>
          <CardTitle className="text-primary">Education</CardTitle>
          <CardDescription>My academic background</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Master of Science in Computer Science</strong>
              <p>University of Technology, Graduated 2015</p>
            </li>
            <li>
              <strong>Bachelor of Science in Software Engineering</strong>
              <p>State University, Graduated 2013</p>
            </li>
          </ul>
        </CardContent>
      </Card>

      <Card className="bg-secondary text-secondary-foreground mb-8">
        <CardHeader>
          <CardTitle className="text-primary">Skills</CardTitle>
          <CardDescription>Technical proficiencies</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-5 space-y-2">
            <li>JavaScript, TypeScript, React, Next.js, Node.js</li>
            <li>HTML5, CSS3, Tailwind CSS</li>
            <li>Git, CI/CD, Docker</li>
            <li>AWS, Google Cloud Platform</li>
            <li>Agile methodologies, Scrum</li>
          </ul>
        </CardContent>
      </Card>

      <div className="flex justify-center">
        <Button variant="outline" asChild>
          <Link href="/resume.pdf" target="_blank">
            Download Full Resume (PDF)
          </Link>
        </Button>
      </div>
    </div>
  )
}

