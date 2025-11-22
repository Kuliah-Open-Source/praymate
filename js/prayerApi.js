// js/prayerApi.js
// Modul ambil jadwal sholat dari Aladhan API

const PrayerApi = (() => {
  const BASE = "https://api.aladhan.com/v1";

  async function request(url) {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Gagal fetch: ${res.status} ${res.statusText}`);
    }
    const json = await res.json();
    if (json.code !== 200) {
      throw new Error("Response API tidak OK");
    }
    return json.data;
  }

  return {
    /**
     * Ambil jadwal sholat hari ini berdasarkan koordinat
     * @param {number} lat
     * @param {number} lon
     * @param {number} method - metode perhitungan (default 5=Egyptian, dll)
     */
    async getTodayByCoords(lat, lon, method = 5) {
      // Aladhan butuh UNIX timestamp (detik)
      const timestamp = Math.floor(Date.now() / 1000);

      const url = `${BASE}/timings/${timestamp}?latitude=${lat}&longitude=${lon}&method=${method}`;

      const data = await request(url);

      // Struktur dari docs Aladhan: data.timings.Fajr, Dhuhr, Asr, Maghrib, Isha
      return {
        fajr: data.timings.Fajr,
        dhuhr: data.timings.Dhuhr,
        asr: data.timings.Asr,
        maghrib: data.timings.Maghrib,
        isha: data.timings.Isha,
        readableDate: data.date.readable,
        hijriDate: data.date.hijri.date,
        timezone: data.meta.timezone,
        methodName: data.meta.method.name,
        lat,
        lon
      };
    }
  };
})();
