import '../globals.css'

export default function TvLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id">
      <body
        style={{
          margin: 0,
          overflow: 'hidden',
          background: 'black',
        }}
      >
        {children}
      </body>
    </html>
  )
}
