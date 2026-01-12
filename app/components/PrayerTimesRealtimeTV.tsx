'use client'

import { useEffect, useRef, useState } from 'react'

type PrayerTimes = {
  Fajr: string
  Dhuhr: string
  Asr: string
  Maghrib: string
  Isha: string
}

const IQOMAH_DURATION: Record<string, number> = {
  Fajr: 10,
  Dhuhr: 10,
  Asr: 10,
  Maghrib: 5,
  Isha: 10,
}

export default function PrayerTimesRealtimeTV({
  city = 'Jakarta',
}: {
  city?: string
}) {
  const [times, setTimes] = useState<PrayerTimes | null>(null)
  const [now, setNow] = useState(new Date())

  const [activePrayer, setActivePrayer] = useState<string | null>(null)
  const [countdown, setCountdown] = useState<number | null>(null)
  const [mode, setMode] = useState<'NORMAL' | 'ADZAN' | 'IQOMAH'>('NORMAL')

  const audioRef = useRef<HTMLAudioElement>(null)
  const playedRef = useRef<Record<string, boolean>>({})
  const iqomahTimerRef = useRef<NodeJS.Timeout | null>(null)

  // =========================
  // FETCH JADWAL (1x)
  // =========================
  useEffect(() => {
    fetch(
      `https://api.aladhan.com/v1/timingsByCity?city=${city}&country=Indonesia&method=20`
    )
      .then((r) => r.json())
      .then((d) => setTimes(d.data.timings))
  }, [city])

  // =========================
  // JAM REALTIME
  // =========================
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(t)
  }, [])

  // =========================
  // TRIGGER ADZAN
  // =========================
  useEffect(() => {
    if (!times || mode !== 'NORMAL') return

    const current = now.toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    })

    Object.entries(times).forEach(([name, time]) => {
      if (time === current && !playedRef.current[name]) {
        playedRef.current[name] = true
        setActivePrayer(name)
        setMode('ADZAN')

        audioRef.current?.play()

        // Setelah adzan (2 menit) → IQOMAH
        setTimeout(() => {
          setMode('IQOMAH')
          setCountdown(IQOMAH_DURATION[name] * 60)
        }, 120000)
      }
    })
  }, [now, times, mode])

  // =========================
  // COUNTDOWN IQOMAH
  // =========================
  useEffect(() => {
    if (mode !== 'IQOMAH' || countdown === null) return

    iqomahTimerRef.current = setInterval(() => {
      setCountdown((c) => {
        if (c === null || c <= 1) {
          clearInterval(iqomahTimerRef.current!)
          setMode('NORMAL')
          return null
        }
        return c - 1
      })
    }, 1000)

    return () => {
      if (iqomahTimerRef.current)
        clearInterval(iqomahTimerRef.current)
    }
  }, [mode, countdown])

  if (!times) return <p>Loading...</p>

  // =========================
  // FORMAT
  // =========================
  const formatCountdown = (sec: number) => {
    const m = Math.floor(sec / 60)
    const s = sec % 60
    return `${m.toString().padStart(2, '0')}:${s
      .toString()
      .padStart(2, '0')}`
  }

  // =========================
  // MODE ADZAN
  // =========================
  if (mode === 'ADZAN') {
    return (
      <>
        <audio ref={audioRef} src="/adzan.mp3" />

        <div className="fade-in pulse" style={{ textAlign: 'center', marginTop: 80 }}>
          <h1 style={{ fontSize: 64, letterSpacing: 6 }}>
            ADZAN BERKUMANDANG
          </h1>
          <h2 style={{ fontSize: 36, marginTop: 20 }}>
            {activePrayer}
          </h2>
          <p style={{ fontSize: 28, opacity: 0.85, marginTop: 40 }}>
            Mohon bersiap melaksanakan shalat
          </p>
        </div>
      </>
    )
  }

  // =========================
  // MODE IQOMAH
  // =========================
  if (mode === 'IQOMAH' && countdown !== null) {
    return (
      <div className="zoom-in" style={{ textAlign: 'center', marginTop: 80 }}>
        <h1 style={{ fontSize: 56, letterSpacing: 4 }}>
          MENUJU IQOMAH
        </h1>

        <div className="countdown pulse">
          {formatCountdown(countdown)}
        </div>

        <h2 style={{ fontSize: 32, opacity: 0.85 }}>
          Mohon rapikan shaf
        </h2>
      </div>
    )
  }

  // =========================
  // MODE NORMAL
  // =========================
  const rows = [
    { label: 'Subuh', key: 'Fajr' },
    { label: 'Dzuhur', key: 'Dhuhr' },
    { label: 'Ashar', key: 'Asr' },
    { label: 'Maghrib', key: 'Maghrib' },
    { label: 'Isya', key: 'Isha' },
  ]

  return (
    <>
      <audio ref={audioRef} src="/adzan.mp3" />

      <div style={{ marginTop: 30 }}>
        {rows.map((r) => (
          <div
            key={r.key}
            className="prayer-row"
          >
            <span>{r.label}</span>
            <strong>{times[r.key as keyof PrayerTimes]}</strong>
          </div>
        ))}
      </div>
    </>
  )
}
