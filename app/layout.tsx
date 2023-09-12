import './globals.css'

export const metadata = {
	title: 'AI/ML Assignments Portal',
	description: 'AI and ML Course Assignments Portal',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
	  <html lang="en">
      <body>
        <main className="flex flex-col items-center min-h-screen bg-background">
          {children}
        </main>
      </body>
    </html>
  )
}
