"use client"

import { useState } from "react"
import { Document, Page, pdfjs } from "react-pdf"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import Loading from "../components/Loading"
import 'react-pdf/dist/Page/AnnotationLayer.css';

// Set the worker source for react-pdf
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const resumeUrl = "/daniel-sauerbrun-resume.pdf"

export default function ResumePage() {
  const [numPages, setNumPages] = useState<number | null>(null)
  const [pageNumber, setPageNumber] = useState(1)

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-primary">Daniel Sauerbrun - Resume</h1>

      <Card className="bg-secondary text-secondary-foreground mb-8">
        <CardHeader>
          <CardTitle className="text-primary">Resume</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center">
            <Button variant="outline" asChild>
              <Link href={resumeUrl} target="_blank" className="button">
                Download Full Resume (PDF)
              </Link>
            </Button>
          </div>

          <div className="flex justify-center items-center mt-4 space-x-4 mb-4">
            <Button onClick={() => setPageNumber(pageNumber - 1)} disabled={pageNumber <= 1}>
              Previous
            </Button>
            <p className="text-primary">
              Page {pageNumber} of {numPages}
            </p>
            <Button
              onClick={() => setPageNumber(pageNumber + 1)}
              disabled={numPages !== null && pageNumber >= numPages}
            >
              Next
            </Button>
          </div>
          <div className="flex justify-center">
            <Document
              file={resumeUrl}
              onLoadSuccess={onDocumentLoadSuccess}
              className="max-w-full"
              loading={<Loading />}
            >
              <Page
                pageNumber={pageNumber}
                renderTextLayer={false}
                className="max-w-full"
                scale={1.5}
                loading={<Loading />}
              />
            </Document>
          </div>
          <div className="flex justify-center items-center mt-4 space-x-4">
            <Button onClick={() => setPageNumber(pageNumber - 1)} disabled={pageNumber <= 1}>
              Previous
            </Button>
            <p className="text-primary">
              Page {pageNumber} of {numPages}
            </p>
            <Button
              onClick={() => setPageNumber(pageNumber + 1)}
              disabled={numPages !== null && pageNumber >= numPages}
            >
              Next
            </Button>
          </div>
        </CardContent>
      </Card>

    </div>
  )
}

