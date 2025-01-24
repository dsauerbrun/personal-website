import "./globals.css"
import "./styles/custom.css" // Add this line
import { Inter } from "next/font/google"
import Header from "./components/Header"
import Footer from "./components/Footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Daniel Sauerbrun",
  description: "Personal website of Daniel Sauerbrun",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} dark`}>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">{children}</main>
        </div>
      </body>
    </html>
  )
}

