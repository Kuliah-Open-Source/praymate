# 🔔 Panduan Testing Notifikasi Adzan

## Cara Kerja Notifikasi

Sistem notifikasi PrayMate bekerja dengan:
1. **Auto-check setiap 30 detik** - Memeriksa apakah waktu saat ini cocok dengan jadwal sholat
2. **Browser Notification API** - Menampilkan notifikasi native OS
3. **Audio Adzan** - Memutar suara adzan (jika file tersedia)
4. **Prevent Duplicate** - Mencegah notifikasi berulang di hari yang sama

## Langkah Testing

### 1. Aktifkan Notifikasi

1. Buka aplikasi PrayMate
2. Klik menu **Pengaturan**
3. Klik tombol **🔔 Aktifkan Notifikasi**
4. Browser akan meminta permission → Klik **Allow/Izinkan**
5. Status button berubah menjadi **✅ Notifikasi Aktif**

### 2. Pastikan Jadwal Sholat Sudah Dimuat

1. Kembali ke halaman **Jadwal Sholat**
2. Pastikan waktu sholat sudah tampil (Subuh, Dzuhur, Ashar, Maghrib, Isya)
3. Jika belum, klik tombol **⟳ Muat Ulang Jadwal**

### 3. Testing Notifikasi (Metode Manual)

Karena notifikasi hanya muncul saat waktu sholat tiba, ada 2 cara testing:

#### Metode A: Tunggu Waktu Sholat Berikutnya
- Lihat countdown di halaman Jadwal Sholat
- Tunggu hingga countdown mencapai 00:00:00
- Notifikasi akan muncul otomatis

#### Metode B: Ubah Waktu Sistem (Testing Cepat)
1. Buka **Date & Time Settings** di komputer/HP
2. Ubah waktu sistem ke 1-2 menit sebelum waktu sholat
   - Contoh: Jika Dzuhur jam 12:00, set waktu ke 11:59
3. Tunggu 1-2 menit
4. Notifikasi akan muncul saat waktu cocok

### 4. Verifikasi Notifikasi

Saat notifikasi muncul, pastikan:
- ✅ Notifikasi muncul di pojok kanan bawah (Windows) atau atas (Mac/Android)
- ✅ Judul: "🕌 Waktu [Nama Sholat]"
- ✅ Isi: "Saatnya menunaikan sholat [Nama]. Waktu: [HH:MM]"
- ✅ Icon PrayMate tampil
- ✅ Suara adzan terdengar (jika file audio tersedia)
- ✅ Klik notifikasi → aplikasi focus

### 5. Testing Prevent Duplicate

1. Setelah notifikasi muncul, tunggu 1 menit
2. Notifikasi TIDAK akan muncul lagi untuk sholat yang sama di hari yang sama
3. Notifikasi akan reset otomatis di hari berikutnya

## Troubleshooting

### Notifikasi Tidak Muncul

**Penyebab 1: Permission Ditolak**
- Solusi: Buka Settings browser → Site Settings → Notifications → Izinkan untuk localhost/domain

**Penyebab 2: Browser Tidak Mendukung**
- Solusi: Gunakan Chrome, Firefox, Edge, atau Safari versi terbaru

**Penyebab 3: Jadwal Sholat Belum Dimuat**
- Solusi: Buka halaman Jadwal Sholat → Klik "Muat Ulang Jadwal"

**Penyebab 4: Tab Tidak Aktif Terlalu Lama**
- Solusi: Buka tab PrayMate sebentar untuk "wake up" script

**Penyebab 5: Waktu Sistem Tidak Akurat**
- Solusi: Sinkronkan waktu sistem dengan internet

### Suara Adzan Tidak Terdengar

**Penyebab 1: File Audio Tidak Ada**
- Solusi: Download file MP3 adzan → Rename ke `adhan_short.mp3` → Letakkan di `assets/audio/`

**Penyebab 2: Toggle Adzan Dimatikan**
- Solusi: Buka Settings → Aktifkan toggle "🔊 Putar nada adzan"

**Penyebab 3: Volume Browser/Sistem Mute**
- Solusi: Cek volume browser dan sistem operasi

## Testing di Berbagai Browser

### Chrome/Edge (Recommended)
- ✅ Notifikasi berfungsi sempurna
- ✅ Suara berfungsi
- ✅ Background tab berfungsi

### Firefox
- ✅ Notifikasi berfungsi
- ⚠️ Suara mungkin diblokir (autoplay policy)
- Solusi: Klik "Allow audio" saat prompt muncul

### Safari (Mac/iOS)
- ✅ Notifikasi berfungsi
- ⚠️ Perlu user interaction untuk audio
- ⚠️ iOS: Notifikasi hanya saat tab aktif

### Mobile Browser
- ✅ Chrome Android: Berfungsi sempurna
- ⚠️ Safari iOS: Terbatas (tab harus aktif)
- 💡 Tip: Install sebagai PWA untuk hasil terbaik

## Testing PWA (Progressive Web App)

1. Install aplikasi sebagai PWA:
   - Chrome: Klik ikon install di address bar
   - Edge: Klik ikon install
   - Android: "Add to Home Screen"

2. Buka aplikasi dari home screen/desktop

3. Notifikasi akan berfungsi lebih baik karena:
   - Standalone window
   - Background sync lebih stabil
   - Tidak terpengaruh tab browser lain

## Checklist Testing Lengkap

- [ ] Permission request muncul
- [ ] Permission granted
- [ ] Status button update ke "Notifikasi Aktif"
- [ ] Jadwal sholat sudah dimuat
- [ ] Notifikasi muncul saat waktu Subuh
- [ ] Notifikasi muncul saat waktu Dzuhur
- [ ] Notifikasi muncul saat waktu Ashar
- [ ] Notifikasi muncul saat waktu Maghrib
- [ ] Notifikasi muncul saat waktu Isya
- [ ] Suara adzan terdengar
- [ ] Klik notifikasi → aplikasi focus
- [ ] Notifikasi tidak duplikat di hari yang sama
- [ ] Notifikasi reset di hari berikutnya
- [ ] Berfungsi saat tab tidak aktif
- [ ] Berfungsi saat browser minimize

## Tips Penggunaan

1. **Biarkan Tab Terbuka** - Untuk hasil terbaik, biarkan tab PrayMate terbuka di background
2. **Install sebagai PWA** - Notifikasi lebih stabil
3. **Aktifkan Auto-start** - Set browser untuk auto-start saat boot (opsional)
4. **Cek Permission** - Pastikan permission tidak expired/revoked

## Catatan Teknis

- **Check Interval**: 30 detik (efisien untuk battery)
- **Notification Tag**: `prayer-time-[nama]` (prevent duplicate)
- **Storage Key**: `praymate_prayer_times` (localStorage)
- **Audio Path**: `assets/audio/adhan_short.mp3`
- **Icon Path**: `icons/icon-192.png`

## Limitasi Browser

- **Autoplay Policy**: Beberapa browser memblokir audio autoplay
- **Background Throttling**: Browser mungkin throttle script di background tab
- **iOS Safari**: Notifikasi terbatas saat tab tidak aktif
- **HTTPS Required**: Beberapa fitur butuh HTTPS di production

## Rekomendasi Production

Untuk deployment production (bukan localhost):
1. Gunakan HTTPS (wajib untuk notification API)
2. Register service worker untuk background sync
3. Gunakan Push API untuk notifikasi lebih reliable
4. Tambahkan notification sound fallback

---

**Status: ✅ Siap Digunakan**

Notifikasi adzan sudah berfungsi dengan baik di localhost.
Untuk production, deploy ke HTTPS hosting untuk hasil optimal.

Bismillah, semoga bermanfaat! 🤲
