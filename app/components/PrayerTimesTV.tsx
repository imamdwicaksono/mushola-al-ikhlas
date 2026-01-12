type PrayerTimesTVProps = {
  city?: string
}

async function getPrayerTimes(city: string) {
  const res = await fetch(
    `https://api.aladhan.com/v1/timingsByCity?city=${city}&country=Indonesia&method=20`,
    { next: { revalidate: 300 } } // refresh 5 menit
  )

  if (!res.ok) throw new Error('Gagal ambil jadwal')

  return res.json()
}

export default async function PrayerTimesTV({
  city = 'Jakarta',
}: PrayerTimesTVProps) {
  const data = await getPrayerTimes(city)
  const t = data.data.timings

  const rows = [
    { name: 'Subuh', time: t.Fajr },
    { name: 'Dzuhur', time: t.Dhuhr },
    { name: 'Ashar', time: t.Asr },
    { name: 'Maghrib', time: t.Maghrib },
    { name: 'Isya', time: t.Isha },
  ]

  return (
    <div style={{ marginTop: 30 }}>
      {rows.map((r) => (
        <div
          key={r.name}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '16px 32px',
            fontSize: 32,
            borderBottom: '1px solid rgba(255,255,255,.2)',
          }}
        >
          <span>{r.name}</span>
          <strong>{r.time}</strong>
        </div>
      ))}
    </div>
  )
}
