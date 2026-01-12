type PrayerTimesProps = {
  city?: string
}

async function getPrayerTimes(city: string) {
  const res = await fetch(
    `https://api.aladhan.com/v1/timingsByCity?city=${city}&country=Indonesia&method=20`,
    { next: { revalidate: 3600 } } // cache 1 jam
  )

  if (!res.ok) {
    throw new Error('Gagal mengambil jadwal shalat')
  }

  return res.json()
}

export default async function PrayerTimes({
  city = 'Jakarta',
}: PrayerTimesProps) {
  const data = await getPrayerTimes(city)
  const times = data.data.timings

  return (
    <div className="card">
      <h2>🕋 Jadwal Shalat</h2>

      <p>Subuh : {times.Fajr}</p>
      <p>Dzuhur : {times.Dhuhr}</p>
      <p>Ashar : {times.Asr}</p>
      <p>Maghrib : {times.Maghrib}</p>
      <p>Isya : {times.Isha}</p>

      <small style={{ opacity: 0.6 }}>
        Sumber: Aladhan API
      </small>
    </div>
  )
}
