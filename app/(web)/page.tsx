import PrayerTimes from '../components/PrayerTimes'

export default function HomePage() {
  return (
    <main className="container">

      <section className="grid">
        <div className="card">
          <h2>📰 Berita & Pengumuman</h2>

          <div className="item">
            <strong>Kajian Rutin Ba’da Maghrib</strong><br />
            Setiap Selasa & Kamis
          </div>

          <div className="item">
            <strong>Infak Renovasi Mushola</strong><br />
            Terima kasih atas partisipasi jamaah
          </div>
        </div>

        {/* Jadwal Shalat dari API */}
        <PrayerTimes city="Jakarta" />
      </section>

      {/* Jadwal Kajian */}
      <section className="card" style={{ marginTop: 20 }}>
        <h2>📚 Jadwal Kajian</h2>

        <div className="item">
          <strong>Rabu, 10 Januari 2026</strong><br />
          Tema: Keutamaan Shalat<br />
          Ustadz Ahmad Fauzi
        </div>
      </section>

      {/* Jadwal Jumat */}
      <section className="card" style={{ marginTop: 20 }}>
        <h2>🕌 Jadwal Shalat Jumat</h2>

        <div className="item">
          <strong>Jumat, 12 Januari 2026</strong><br />
          Khatib: Ustadz Ali Rahman<br />
          Imam: Ustadz Hasan
        </div>
      </section>

    </main>
  )
}
