// js/quranApi.js
// Modul untuk ambil data Al-Qur'an: daftar surah dan detail surah.
// Menggunakan API: https://api.quran.gading.dev

const QuranApi = (() => {
  const BASE = "https://api.quran.gading.dev";

  async function request(path) {
    const res = await fetch(`${BASE}${path}`);
    if (!res.ok) {
      throw new Error("Gagal mengambil data Al-Qur'an");
    }
    const json = await res.json();
    return json;
  }

  return {
    // Ambil semua surah
    async getSurahList() {
      // GET /surah
      const data = await request("/surah");
      // Struktur API: { data: [ ...surah ] }
      return data.data || [];
    },

    // Ambil detail satu surah beserta ayat
    async getSurah(surahNumber) {
      // GET /surah/{number}
      const data = await request(`/surah/${surahNumber}`);
      // Struktur API: { data: { ... } }
      return data.data || {};
    }
  };
})();
