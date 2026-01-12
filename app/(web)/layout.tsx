import '../globals.css'

export const metadata = {
  title: 'Mushola Al-Ikhlas - CFX Tower',
  description: 'Website resmi Mushola Al-Ikhlas CFX Tower',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id">
      <body>
        <header
          style={{
            background:
              'linear-gradient(rgba(0,0,0,.4),rgba(0,0,0,.4)), url(/banner.jpg) center/cover',
            color: 'white',
            padding: '90px 20px',
            textAlign: 'center',
          }}
        >
          <h1 style={{ color: 'white', fontSize: 38 }}>
            Mushola Al-Ikhlas
          </h1>
          <p style={{ fontSize: 18, opacity: 0.9 }}>
            CFX Tower
          </p>
        </header>

        {children}

        <footer
          style={{
            background: '#1f7a4d',
            color: 'white',
            textAlign: 'center',
            padding: 16,
            marginTop: 40,
          }}
        >
          © 2026 Mushola Al-Ikhlas – CFX Tower
        </footer>
      </body>
    </html>
  )
}
