# Test Panduan Sholat

## Cara Test:

1. Buka `panduan-sholat.html` di browser
2. Buka Console (F12)
3. Cek apakah ada error
4. Cek apakah data muncul

## Expected Result:

### Tab Panduan Wudhu (Default):
- Niat Wudhu (Opsional) - dengan catatan
- 9 Langkah wudhu dengan bacaan Arab, Latin, Arti
- Doa setelah wudhu

### Tab Tata Cara Sholat:
- 11 Rukun sholat dengan bacaan lengkap
- Doa setelah sholat (4 item)

## Troubleshooting:

### Jika Kosong:
1. Cek Console - ada error?
2. Cek apakah `PanduanData` ter-load: ketik `window.PanduanData` di console
3. Cek apakah `initPanduanPage()` dipanggil: lihat log "initPanduanPage called"

### Jika Data Tidak Muncul:
1. Hard refresh: Ctrl+Shift+R (Windows) atau Cmd+Shift+R (Mac)
2. Clear cache browser
3. Cek urutan script di HTML:
   - theme.js
   - panduanSholatData.js
   - app.js

## File yang Terlibat:

- `panduan-sholat.html` - HTML structure
- `js/panduanSholatData.js` - Data wudhu & sholat
- `js/app.js` - Fungsi render
- `css/style.css` - Styling

## Status:

✅ Data sudah lengkap
✅ Export sudah benar
✅ Fungsi render sudah ada
✅ HTML sudah benar

**Seharusnya sudah berfungsi!**
