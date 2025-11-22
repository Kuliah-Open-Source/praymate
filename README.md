# PrayMate

**PrayMate** adalah aplikasi pengingat sholat dan Al-Qur'an digital yang membantu pengguna dalam menjalankan ibadah harian. Aplikasi ini dirancang sebagai web app yang ringan, responsif, dan mudah digunakan.

## 🌟 Fitur Utama

### 1. Jadwal Sholat Harian
- Menampilkan waktu sholat 5 waktu (Subuh, Dzuhur, Ashar, Maghrib, Isya)
- Deteksi lokasi otomatis menggunakan GPS
- Fallback ke lokasi Jakarta jika GPS tidak tersedia
- Menampilkan tanggal Masehi dan Hijriah
- Informasi metode perhitungan yang digunakan
- ✅ **Prayer Log Harian** - Checkbox untuk tracking sholat
- ✅ **Statistik 7 Hari** - Persentase, streak, dan bar chart

### 2. Al-Qur'an Digital
- Daftar lengkap 114 surah
- Pencarian surah berdasarkan nama
- Tampilan ayat dalam teks Arab
- Terjemahan bahasa Indonesia
- Informasi lengkap setiap surah (arti, jumlah ayat, tempat turun)
- ✅ **Bookmark Ayat** - Simpan ayat favorit dengan tombol ⭐
- ✅ **Pencarian Ayat Spesifik** - Format: `surah:ayat` (contoh: `baqarah:255`)

### 3. Doa Harian
- ✅ 6 doa harian lengkap (bangun tidur, sebelum tidur, keluar/masuk rumah, makan)
- ✅ Accordion style dengan teks Arab, Latin, dan Terjemahan
- ✅ Search doa berdasarkan keyword

### 4. Pengaturan
- Pilihan metode perhitungan jadwal sholat (20+ metode internasional)
- Pilihan madhab (Syafi'i/Hanafi) untuk waktu Ashar
- ✅ Toggle suara adzan
- ✅ **Notifikasi Adzan Otomatis** - Browser notification saat waktu sholat
- Pengaturan tersimpan secara lokal di browser

### 5. PWA (Progressive Web App)
- ✅ Installable di Android/PC
- ✅ Offline support dengan service worker
- ✅ Fast loading dengan cache strategy

## 🛠️ Teknologi yang Digunakan

- **HTML5** - Struktur halaman
- **CSS3** - Neo-glassmorphism design, animated gradients
- **JavaScript (ES6+)** - Logic aplikasi, modular architecture
- **Aladhan API** - Data jadwal sholat ([api.aladhan.com](https://api.aladhan.com))
- **Quran API** - Data Al-Qur'an ([api.quran.gading.dev](https://api.quran.gading.dev))
- **LocalStorage** - Penyimpanan data lokal (settings, logs, bookmarks)
- **Service Worker** - Offline capability dan caching
- **Web Manifest** - PWA installable

## 📁 Struktur Proyek

```
AAATUGAS UTS OPEN SOURCE/
├── index.html              # Halaman beranda
├── jadwal.html             # Halaman jadwal sholat + prayer log + stats
├── quran.html              # Halaman Al-Qur'an + bookmarks
├── doa.html                # Halaman doa harian (NEW)
├── settings.html           # Halaman pengaturan + adzan toggle
├── manifest.webmanifest    # PWA manifest (NEW)
├── service-worker.js       # Service worker untuk offline (NEW)
├── css/
│   └── style.css           # Styling lengkap (glassmorphism, dark mode)
├── js/
│   ├── app.js              # Logic utama + PrayerLog + Stats + Bookmarks
│   ├── prayerApi.js        # Modul API jadwal sholat
│   ├── quranApi.js         # Modul API Al-Qur'an
│   ├── theme.js            # Theme management (dark/light)
│   └── doaData.js          # Data doa harian (NEW)
├── README.md               # Dokumentasi utama
├── CHANGELOG.md            # Daftar perubahan (NEW)
├── TESTING_GUIDE.md        # Panduan testing (NEW)
└── ADVANCED_FEATURES_GUIDE.md  # Dokumentasi teknis
```

## 🚀 Cara Menjalankan

### Metode 1: Langsung di Browser
1. Buka file `index.html` menggunakan browser modern (Chrome, Firefox, Edge, Safari)
2. Pastikan koneksi internet aktif untuk mengakses API

### Metode 2: Menggunakan Live Server (Rekomendasi)
1. Install ekstensi **Live Server** di VS Code
2. Klik kanan pada `index.html`
3. Pilih "Open with Live Server"
4. Aplikasi akan terbuka di `http://localhost:5500`

### Metode 3: Menggunakan Python HTTP Server
```bash
# Python 3
python -m http.server 8000

# Buka browser ke http://localhost:8000
```

## 📱 Fitur Responsif

Aplikasi ini dioptimalkan untuk berbagai ukuran layar:
- Desktop (> 800px)
- Tablet (600px - 800px)
- Mobile (< 600px)

## ✅ Fitur yang Sudah Diimplementasikan

- ✅ Prayer habit tracker dengan checkbox
- ✅ Statistik 7 hari (persentase, streak, bar chart)
- ✅ Bookmark ayat Al-Qur'an
- ✅ Pencarian ayat spesifik (format: surah:ayat)
- ✅ Doa harian dengan accordion
- ✅ **Notifikasi adzan otomatis** (browser notification + sound)
- ✅ PWA installable dan offline support
- ✅ Dark/Light theme toggle (zero-blink)
- ✅ Neo-glassmorphism UI design
- ✅ Islamic pattern background
- ✅ Mobile responsive

## ✅ Fitur Panduan Sholat (NEW!)

### Panduan Wudhu Lengkap
- ✅ Niat wudhu (opsional - sesuai sunnah)
- ✅ 9 langkah wudhu detail dengan bacaan Arab, Latin, Arti
- ✅ Doa setelah wudhu
- ✅ Catatan: Nabi ﷺ tidak mengajarkan niat lisan, cukup niat di hati

### Panduan Sholat Lengkap
- ✅ 11 rukun sholat dengan bacaan lengkap
- ✅ Takbiratul Ihram, Al-Fatihah, Ruku', I'tidal, Sujud
- ✅ Tasyahud Awal & Akhir dengan Sholawat
- ✅ Doa setelah sholat (Istighfar, Tasbih, Tahmid, Takbir)
- ✅ Semua bacaan dalam Arab, Latin, dan Terjemahan Indonesia

## 🔮 Pengembangan Masa Depan

Untuk versi Android native:
- Widget jadwal sholat di home screen
- Kiblat compass dengan sensor
- Dzikir counter dengan haptic feedback
- Audio adzan lengkap (saat ini placeholder)
- Tafsir ayat
- Export/import data
- Sync antar device
- Notifikasi reminder sebelum waktu sholat

## 🗄️ Konsep Database (untuk versi Android)

### Tabel yang Direncanakan:

**user_settings**
- id, method, madhab, notification_enabled, sound_enabled

**locations**
- id, name, latitude, longitude, timezone, is_default

**prayer_times**
- id, location_id, date, fajr, dhuhr, asr, maghrib, isha

**quran_surah**
- id, number, name_arabic, name_latin, translation, revelation_place, ayah_count

**quran_ayah**
- id, surah_id, ayah_number, text_arabic, text_indonesian

**reading_progress**
- id, surah_id, ayah_id, last_read_date

**notification_log**
- id, prayer_name, scheduled_time, delivered_time, status

## 📤 Push ke GitHub

Untuk meng-upload proyek ini ke GitHub:

```bash
# 1. Inisialisasi Git (jika belum)
git init

# 2. Tambahkan semua file
git add .

# 3. Commit pertama
git commit -m "Initial commit: PrayMate - Aplikasi Pengingat Sholat & Al-Qur'an"

# 4. Tambahkan remote repository
git remote add origin https://github.com/username/praymate-app.git

# 5. Push ke GitHub
git push -u origin main
```

## 👨‍💻 Pengembang

Proyek ini dikembangkan sebagai tugas kuliah Pemrograman Open Source.

## 📄 Lisensi

Proyek ini dibuat untuk keperluan edukasi dan ibadah. Silakan digunakan dan dikembangkan lebih lanjut.

---

**PrayMate** - Teman ibadah harianmu 🤲
