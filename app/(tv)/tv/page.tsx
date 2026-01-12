'use client'

import { useEffect, useState } from 'react'
import PrayerTimesRealtimeTV from '../../components/PrayerTimesRealtimeTV'

export default function TvPage() {
  const [now, setNow] = useState(new Date())

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(t)
  }, [])

  return (
    <div className="tv-bg" style={{ height: '100vh', padding: 40 }}>
      
      {/* HEADER */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 30,
        }}
      >
        <h1 className="text-3d-glow text-3d">
          Mushola Al-Ikhlas
        </h1>

        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: 64, color: '#ffd369' }}>
            {now.toLocaleTimeString('id-ID')}
          </div>
          <div style={{ fontSize: 22 }}>
            {now.toLocaleDateString('id-ID', {
              weekday: 'long',
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </div>
        </div>
      </div>

      {/* GRID UTAMA */}
      <div className="tv-grid">
        
        {/* ① WAKTU SHALAT + IQOMAH */}
        <div className="tv-card">
          <div className="section-title">
            🕌 Waktu Shalat
          </div>

          <PrayerTimesRealtimeTV city="Jakarta" />
        </div>

        {/* ② KAJIAN MINGGU INI */}
        <div className="tv-card">
          <div className="section-title">
            📚 Kajian Minggu Ini
          </div>

          <div style={{ fontSize: 26, lineHeight: 1.6 }}>
            <p>
              <strong>Senin</strong><br />
              Tafsir Al-Qur'an<br />
              Ust. Ahmad Fauzi
            </p>

            <p>
              <strong>Rabu</strong><br />
              Fiqih Shalat<br />
              Ust. Muhammad Rizki
            </p>

            <p>
              <strong>Sabtu</strong><br />
              Akhlak Muslim<br />
              Ust. Ali Rahman
            </p>
          </div>
        </div>
      </div>

      {/* ③ TEMA JUMAT */}
      <div
        className="tv-card"
        style={{
          marginTop: 32,
          textAlign: 'center',
        }}
      >
        <div className="section-title">
          🕌 Tema Shalat Jumat Minggu Ini
        </div>

        <h2 style={{ fontSize: 40 }}>
          “Keutamaan Menjaga Shalat Berjamaah”
        </h2>

        <p style={{ fontSize: 26, opacity: 0.85 }}>
          Khatib: Ustadz Abdul Hakim
        </p>
      </div>
    </div>
  )
}
