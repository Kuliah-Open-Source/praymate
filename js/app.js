// js/app.js

document.addEventListener("DOMContentLoaded", () => {
  if (document.querySelector("#prayer-table")) {
    initJadwalPage();
  }
  if (document.querySelector("#surah-list")) {
    initQuranPage();
  }
  if (document.querySelector("#settings-form")) {
    initSettingsPage();
  }
  if (document.body.classList.contains("doa-page")) {
    initDoaPage();
  }
  if (document.body.classList.contains("hadits-page")) {
    initHaditsPage();
  }
  if (document.body.classList.contains("asmaul-husna-page")) {
    initAsmaulHusnaPage();
  }
  if (document.body.classList.contains("dzikir-page")) {
    initDzikirPage();
  }
  if (document.body.classList.contains("kiblat-page")) {
    initKiblatPage();
  }
  if (document.body.classList.contains("zakat-page")) {
    initZakatPage();
  }
  if (document.body.classList.contains("kalender-page")) {
    initKalenderPage();
  }
  if (document.body.classList.contains("panduan-page")) {
    initPanduanPage();
  }
  if (document.querySelector("#play-adhan")) {
    initAdzanToggle();
  }
});


// ====== HALAMAN JADWAL SHOLAT ======

async function initJadwalPage() {
  setLoadingState(true);

  try {
    const coords = await getCurrentLocation();
    const settings = getSettings();
    const data = await PrayerApi.getTodayByCoords(
      coords.lat,
      coords.lon,
      settings.method
    );

    const dateText = `${data.readableDate} | Hijriah: ${data.hijriDate}`;
    document.getElementById("date-today").textContent = dateText;

    const locationLabel =
      coords.label ||
      `Lat: ${data.lat.toFixed(2)}, Lon: ${data.lon.toFixed(2)}`;
    document.getElementById("location-name").textContent =
      `Lokasi: ${locationLabel} | Metode: ${data.methodName}`;

    document.getElementById("time-fajr").textContent = data.fajr;
    document.getElementById("time-dhuhr").textContent = data.dhuhr;
    document.getElementById("time-asr").textContent = data.asr;
    document.getElementById("time-maghrib").textContent = data.maghrib;
    document.getElementById("time-isha").textContent = data.isha;

    // Start notification checker
    startPrayerNotification({
      fajr: data.fajr,
      dhuhr: data.dhuhr,
      asr: data.asr,
      maghrib: data.maghrib,
      isha: data.isha
    });

    setLoadingState(false);
  } catch (err) {
    console.error(err);
    showError(
      "Gagal memuat jadwal sholat. Pastikan internet aktif dan coba lagi."
    );
    setLoadingState(false, true);
  }

  const btnRefresh = document.getElementById("btn-refresh");
  if (btnRefresh) {
    btnRefresh.addEventListener("click", () => {
      initJadwalPage();
    });
  }

  initPrayerLog();
  updateStats();
  requestNotificationPermission();
}

function getCurrentLocation() {
  return new Promise((resolve) => {
    if (!navigator.geolocation) {
      resolve({
        lat: -6.200000,
        lon: 106.816666,
        label: "Jakarta (default)"
      });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        resolve({
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
          label: "Lokasimu"
        });
      },
      (err) => {
        console.warn("Gagal ambil GPS:", err.message);
        resolve({
          lat: -6.200000,
          lon: 106.816666,
          label: "Jakarta (default)"
        });
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 600000
      }
    );
  });
}

function setLoadingState(isLoading, isError = false) {
  const statusRowIds = [
    "time-fajr",
    "time-dhuhr",
    "time-asr",
    "time-maghrib",
    "time-isha"
  ];

  statusRowIds.forEach((id) => {
    const el = document.getElementById(id);
    if (!el) return;
    if (isLoading) {
      el.textContent = "Memuat...";
    } else if (isError) {
      el.textContent = "Gagal";
    }
  });
}

function showError(message) {
  const dateEl = document.getElementById("date-today");
  if (dateEl) {
    dateEl.textContent = `⚠️ ${message}`;
    dateEl.style.color = "#721c24";
  }
}


// ===== PRAYER LOG MANAGER =====
const PrayerLog = {
  getTodayKey() {
    const today = new Date();
    return today.toISOString().split('T')[0];
  },
  
  loadLogs() {
    try {
      const logs = localStorage.getItem('praymate_prayer_log');
      return logs ? JSON.parse(logs) : {};
    } catch (error) {
      console.error('Error loading prayer logs:', error);
      return {};
    }
  },
  
  saveLogs(logs) {
    try {
      localStorage.setItem('praymate_prayer_log', JSON.stringify(logs));
    } catch (error) {
      console.error('Error saving prayer logs:', error);
    }
  },
  
  getTodayLog() {
    const logs = this.loadLogs();
    const today = this.getTodayKey();
    return logs[today] || { fajr: false, dhuhr: false, asr: false, maghrib: false, isha: false };
  },
  
  updatePrayer(prayer, status) {
    const logs = this.loadLogs();
    const today = this.getTodayKey();
    
    if (!logs[today]) {
      logs[today] = { fajr: false, dhuhr: false, asr: false, maghrib: false, isha: false };
    }
    
    logs[today][prayer] = status;
    this.saveLogs(logs);
  },
  
  resetToday() {
    const logs = this.loadLogs();
    const today = this.getTodayKey();
    delete logs[today];
    this.saveLogs(logs);
  }
};

function initPrayerLog() {
  const todayLog = PrayerLog.getTodayLog();
  const prayers = ['fajr', 'dhuhr', 'asr', 'maghrib', 'isha'];
  
  prayers.forEach(prayer => {
    const checkbox = document.getElementById(`log-${prayer}`);
    const item = document.querySelector(`[data-prayer="${prayer}"]`);
    
    if (checkbox && item) {
      checkbox.checked = todayLog[prayer];
      if (todayLog[prayer]) {
        item.classList.add('checked');
      }
      
      checkbox.addEventListener('change', (e) => {
        PrayerLog.updatePrayer(prayer, e.target.checked);
        if (e.target.checked) {
          item.classList.add('checked');
        } else {
          item.classList.remove('checked');
        }
        
        if (typeof updateStats === 'function') {
          updateStats();
        }
      });
    }
  });
}

function resetTodayLog() {
  if (confirm('Yakin ingin menghapus log sholat hari ini?')) {
    PrayerLog.resetToday();
    
    const prayers = ['fajr', 'dhuhr', 'asr', 'maghrib', 'isha'];
    prayers.forEach(prayer => {
      const checkbox = document.getElementById(`log-${prayer}`);
      const item = document.querySelector(`[data-prayer="${prayer}"]`);
      if (checkbox) checkbox.checked = false;
      if (item) item.classList.remove('checked');
    });
    
    if (typeof updateStats === 'function') {
      updateStats();
    }
    
    showToast('🗑️ Log hari ini telah dihapus');
  }
}

function showToast(message) {
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}


// ===== STATISTICS CALCULATOR =====
const Stats = {
  getLast7Days() {
    const logs = PrayerLog.loadLogs();
    const result = [];
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const key = date.toISOString().split('T')[0];
      const dayLog = logs[key] || { fajr: false, dhuhr: false, asr: false, maghrib: false, isha: false };
      
      const count = Object.values(dayLog).filter(v => v === true).length;
      
      result.push({
        date: key,
        dayName: date.toLocaleDateString('id-ID', { weekday: 'short' }),
        count: count
      });
    }
    
    return result;
  },
  
  calculatePercentage() {
    const last7 = this.getLast7Days();
    const total = last7.reduce((sum, day) => sum + day.count, 0);
    const percentage = Math.round((total / 35) * 100);
    return percentage;
  },
  
  calculateStreak() {
    const logs = PrayerLog.loadLogs();
    let streak = 0;
    
    for (let i = 0; i < 30; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const key = date.toISOString().split('T')[0];
      const dayLog = logs[key];
      
      if (!dayLog) break;
      
      const count = Object.values(dayLog).filter(v => v === true).length;
      if (count >= 4) {
        streak++;
      } else {
        break;
      }
    }
    
    return streak;
  }
};

function updateStats() {
  const last7 = Stats.getLast7Days();
  const percentage = Stats.calculatePercentage();
  const streak = Stats.calculateStreak();
  const total = last7.reduce((sum, day) => sum + day.count, 0);
  
  const percentageEl = document.getElementById('stat-percentage');
  const streakEl = document.getElementById('stat-streak');
  const totalEl = document.getElementById('stat-total');
  
  if (percentageEl) percentageEl.textContent = percentage + '%';
  if (streakEl) streakEl.textContent = streak;
  if (totalEl) totalEl.textContent = total;
  
  const chartEl = document.getElementById('week-chart');
  if (chartEl) {
    chartEl.innerHTML = last7.map(day => `
      <div class="day-bar">
        <div class="bar">
          <div class="bar-fill" style="height: ${(day.count / 5) * 100}%"></div>
        </div>
        <div class="day-label">${day.dayName}</div>
      </div>
    `).join('');
  }
}


// ====== HALAMAN AL-QUR'AN DIGITAL ======

async function initQuranPage() {
  const surahListEl = document.getElementById("surah-list");
  const searchInput = document.getElementById("search-surah");
  const detailSection = document.getElementById("surah-detail");
  const surahTitleEl = document.getElementById("surah-title");
  const surahMetaEl = document.getElementById("surah-meta");
  const ayahListEl = document.getElementById("ayah-list");

  let allSurah = [];

  surahListEl.innerHTML = "<li class='surah-item'>Memuat daftar surah...</li>";

  try {
    allSurah = await QuranApi.getSurahList();
    renderSurahList(allSurah, surahListEl, (surah) => {
      loadSurahDetail(
        surah,
        detailSection,
        surahTitleEl,
        surahMetaEl,
        ayahListEl
      );
    });
  } catch (err) {
    console.error(err);
    surahListEl.innerHTML =
      "<li class='surah-item' style='color:#721c24'>⚠️ Gagal memuat daftar surah. Coba refresh halaman.</li>";
  }

  renderFavorites();

  if (searchInput) {
    searchInput.addEventListener("input", () => {
      const keyword = searchInput.value.toLowerCase().trim();
      
      if (keyword.includes(":")) {
        const [surahName, ayahNum] = keyword.split(":");
        const ayahNumber = parseInt(ayahNum);
        
        if (ayahNumber > 0) {
          const matchedSurah = allSurah.find((s) => {
            const namaLatin = s.name?.transliteration?.id || "";
            return namaLatin.toLowerCase().includes(surahName.trim());
          });
          
          if (matchedSurah) {
            loadSurahDetail(
              matchedSurah,
              detailSection,
              surahTitleEl,
              surahMetaEl,
              ayahListEl,
              ayahNumber
            );
            surahListEl.innerHTML = `<li class='surah-item' style='background:#e8f5e9; padding:12px;'>📖 Menampilkan ${matchedSurah.name?.transliteration?.id} mulai dari ayat ${ayahNumber}</li>`;
            return;
          }
        }
      }
      
      const filtered = allSurah.filter((s) => {
        const namaLatin = s.name?.transliteration?.id || "";
        return namaLatin.toLowerCase().includes(keyword);
      });
      renderSurahList(filtered, surahListEl, (surah) => {
        loadSurahDetail(
          surah,
          detailSection,
          surahTitleEl,
          surahMetaEl,
          ayahListEl
        );
      });
    });
  }
}

function renderSurahList(surahArray, listElement, onClickSurah) {
  listElement.innerHTML = "";

  if (surahArray.length === 0) {
    listElement.innerHTML = "<li class='surah-item'>Tidak ada surah ditemukan.</li>";
    return;
  }

  surahArray.forEach((s) => {
    const li = document.createElement("li");
    li.className = "surah-item";
    
    const nomor = s.number || 0;
    const namaLatin = s.name?.transliteration?.id || "(tanpa nama)";
    const arti = s.name?.translation?.id || "(tanpa arti)";

    li.textContent = `${nomor}. ${namaLatin} (${arti})`;
    li.addEventListener("click", () => onClickSurah(s));
    listElement.appendChild(li);
  });
}

async function loadSurahDetail(
  surah,
  detailSection,
  titleEl,
  metaEl,
  ayahListEl,
  startFromAyah = null
) {
  detailSection.style.display = "block";
  ayahListEl.innerHTML = "<li class='ayah-item'>Memuat ayat...</li>";

  const nomor = surah.number;

  try {
    const data = await QuranApi.getSurah(nomor);

    const namaLatin = data.name?.transliteration?.id || "(tanpa nama)";
    const arti = data.name?.translation?.id || "(tanpa arti)";
    const tempatTurun = data.revelation?.id || "(tidak diketahui)";
    const jumlahAyat = data.numberOfVerses || 0;
    const verses = data.verses || [];

    titleEl.textContent = `Surah ${namaLatin}`;
    
    if (startFromAyah && startFromAyah > 1) {
      metaEl.textContent =
        `Arti: ${arti} | Jumlah ayat: ${jumlahAyat} | Turun di: ${tempatTurun} | 📍 Mulai dari ayat ${startFromAyah}`;
    } else {
      metaEl.textContent =
        `Arti: ${arti} | Jumlah ayat: ${jumlahAyat} | Turun di: ${tempatTurun}`;
    }

    ayahListEl.innerHTML = "";

    const filteredVerses = startFromAyah 
      ? verses.filter(v => (v.number?.inSurah || 0) >= startFromAyah)
      : verses;

    if (filteredVerses.length === 0) {
      ayahListEl.innerHTML = `<li class='ayah-item' style='color:#721c24'>⚠️ Ayat ${startFromAyah} tidak ditemukan dalam surah ini.</li>`;
      return;
    }

    filteredVerses.forEach((v, index) => {
      const li = document.createElement("li");
      li.className = "ayah-item";

      const teksArab = v.text?.arab || "";
      const nomorAyat = v.number?.inSurah || 0;
      const terjemahan = v.translation?.id || "(tanpa terjemahan)";

      const isFirstAyah = index === 0 && startFromAyah && nomorAyat === startFromAyah;
      const highlightStyle = isFirstAyah ? 'background:#fff3cd; border-left:4px solid #13837c; padding-left:12px;' : '';

      const isBookmarked = Bookmarks.isBookmarked(nomor, nomorAyat);
      const bookmarkIcon = isBookmarked ? '★' : '☆';

      li.innerHTML = `
        <div style="${highlightStyle}">
          <p class="ayah-arabic">${teksArab}</p>
          <p class="ayah-number">Ayat ${nomorAyat} <button class="btn-bookmark ${isBookmarked ? 'bookmarked' : ''}" onclick="toggleBookmark(${nomor}, ${nomorAyat}, '${namaLatin}', '${terjemahan.substring(0, 100).replace(/'/g, "\\'")}', this)">${bookmarkIcon}</button></p>
          <p class="ayah-translation">${terjemahan}</p>
        </div>
      `;
      ayahListEl.appendChild(li);
    });

    detailSection.scrollIntoView({ behavior: "smooth", block: "start" });
  } catch (err) {
    console.error(err);
    ayahListEl.innerHTML =
      "<li class='ayah-item' style='color:#721c24'>⚠️ Gagal memuat ayat. Coba pilih surah lagi.</li>";
  }
}


// ===== BOOKMARK MANAGER =====
const Bookmarks = {
  load() {
    try {
      const bookmarks = localStorage.getItem('praymate_favorite_ayah');
      return bookmarks ? JSON.parse(bookmarks) : [];
    } catch (error) {
      console.error('Error loading bookmarks:', error);
      return [];
    }
  },
  
  save(bookmarks) {
    try {
      localStorage.setItem('praymate_favorite_ayah', JSON.stringify(bookmarks));
    } catch (error) {
      console.error('Error saving bookmarks:', error);
    }
  },
  
  isBookmarked(surahNumber, ayahNumber) {
    const bookmarks = this.load();
    return bookmarks.some(b => b.surahNumber === surahNumber && b.ayahNumber === ayahNumber);
  },
  
  toggle(surahNumber, ayahNumber, surahName, shortText) {
    const bookmarks = this.load();
    const index = bookmarks.findIndex(b => b.surahNumber === surahNumber && b.ayahNumber === ayahNumber);
    
    if (index >= 0) {
      bookmarks.splice(index, 1);
      showToast('🗑️ Bookmark dihapus');
    } else {
      bookmarks.push({
        surahNumber,
        ayahNumber,
        surahName,
        shortText: shortText.substring(0, 100) + '...'
      });
      showToast('⭐ Ditambahkan ke favorit');
    }
    
    this.save(bookmarks);
    return index < 0;
  }
};

function toggleBookmark(surahNumber, ayahNumber, surahName, shortText, btnElement) {
  const isBookmarked = Bookmarks.toggle(surahNumber, ayahNumber, surahName, shortText);
  btnElement.innerHTML = isBookmarked ? '★' : '☆';
  btnElement.classList.toggle('bookmarked', isBookmarked);
  renderFavorites();
}

function renderFavorites() {
  const bookmarks = Bookmarks.load();
  const favCard = document.getElementById('favorites-card');
  const favList = document.getElementById('favorites-list');
  
  if (!favCard || !favList) return;
  
  if (bookmarks.length === 0) {
    favCard.style.display = 'none';
    return;
  }
  
  favCard.style.display = 'block';
  favList.innerHTML = bookmarks.map(b => `
    <li class="favorite-item" onclick="goToAyah(${b.surahNumber}, ${b.ayahNumber})">
      <div class="favorite-item-title">${b.surahName}, Ayat ${b.ayahNumber}</div>
      <div class="favorite-item-text">${b.shortText}</div>
    </li>
  `).join('');
}

function goToAyah(surahNumber, ayahNumber) {
  const searchInput = document.getElementById("search-surah");
  if (searchInput) {
    searchInput.value = `surah${surahNumber}:${ayahNumber}`;
    searchInput.dispatchEvent(new Event('input'));
  }
}


// ====== HALAMAN PENGATURAN ======

function initSettingsPage() {
  const form = document.getElementById("settings-form");
  const methodSelect = document.getElementById("calculation-method");
  const madhabSelect = document.getElementById("madhab");
  const successMsg = document.getElementById("success-msg");

  const settings = getSettings();
  methodSelect.value = settings.method;
  madhabSelect.value = settings.madhab;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const newSettings = {
      method: parseInt(methodSelect.value),
      madhab: parseInt(madhabSelect.value)
    };

    saveSettings(newSettings);

    successMsg.style.display = "block";
    setTimeout(() => {
      successMsg.style.display = "none";
    }, 3000);
  });
}

function getSettings() {
  const defaultSettings = {
    method: 20,
    madhab: 0
  };

  try {
    const saved = localStorage.getItem("praymate_settings");
    if (saved) {
      return { ...defaultSettings, ...JSON.parse(saved) };
    }
  } catch (err) {
    console.error("Gagal membaca pengaturan:", err);
  }

  return defaultSettings;
}

function saveSettings(settings) {
  try {
    localStorage.setItem("praymate_settings", JSON.stringify(settings));
  } catch (err) {
    console.error("Gagal menyimpan pengaturan:", err);
  }
}

function initAdzanToggle() {
  const toggle = document.getElementById('play-adhan');
  if (!toggle) return;
  
  const saved = localStorage.getItem('praymate_play_adhan');
  toggle.checked = saved !== 'false';
  
  toggle.addEventListener('change', (e) => {
    localStorage.setItem('praymate_play_adhan', e.target.checked);
    showToast(e.target.checked ? '🔊 Adzan diaktifkan' : '🔇 Adzan dinonaktifkan');
  });
}


// ===== DOA PAGE =====
let currentView = 'categories'; // 'categories' or 'doas'
let selectedCategory = null;

function initDoaPage() {
  if (!window.DOA_DATA) {
    console.error('DOA_DATA tidak ditemukan');
    return;
  }
  
  renderCategories();
  
  const searchInput = document.getElementById('search-doa');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const keyword = e.target.value.toLowerCase();
      if (currentView === 'categories') {
        const categories = getCategories();
        const filtered = categories.filter(cat => cat.toLowerCase().includes(keyword));
        renderCategories(filtered);
      } else {
        const filtered = window.DOA_DATA.filter(d => 
          d.category === selectedCategory &&
          (d.title.toLowerCase().includes(keyword) ||
          d.latin.toLowerCase().includes(keyword) ||
          d.translation.toLowerCase().includes(keyword))
        );
        renderDoaList(filtered);
      }
    });
  }
}

function getCategories() {
  const categories = [...new Set(window.DOA_DATA.map(d => d.category))];
  return categories.sort();
}

function getCategoryIcon(category) {
  const icons = {
    'Harian': '🌅',
    'Rezeki': '💰',
    'Kesehatan': '❤️',
    'Perlindungan': '🛡️',
    'Ilmu': '📚',
    'Keluarga': '👨‍👩‍👧‍👦',
    'Pernikahan': '💍',
    'Pekerjaan': '💼',
    'Hutang': '💳',
    'Perjalanan': '✈️',
    'Taubat': '🤲',
    'Umum': '⭐',
    'Ibadah': '🕌',
    'Alam': '🌧️'
  };
  return icons[category] || '🤲';
}

function renderCategories(filteredCategories = null) {
  const listEl = document.getElementById('doa-list');
  const searchInput = document.getElementById('search-doa');
  const cardTitle = document.querySelector('.card h2');
  const cardDesc = document.querySelector('.card p');
  
  if (!listEl) return;
  
  currentView = 'categories';
  selectedCategory = null;
  
  // Hide back button
  const backBtn = document.getElementById('btn-back-category');
  if (backBtn) backBtn.remove();
  
  if (cardTitle) cardTitle.textContent = '🙌 Daftar Kategori Doa';
  if (cardDesc) {
    cardDesc.textContent = 'Pilih kategori untuk melihat doa-doa di dalamnya.';
    cardDesc.style.display = 'block';
  }
  
  if (searchInput) {
    searchInput.placeholder = 'Cari kategori...';
    searchInput.value = '';
  }
  
  const categories = filteredCategories || getCategories();
  
  if (categories.length === 0) {
    listEl.innerHTML = '<p style="text-align:center; color:var(--text-secondary); padding:20px;">Kategori tidak ditemukan.</p>';
    return;
  }
  
  listEl.innerHTML = categories.map(category => {
    const count = window.DOA_DATA.filter(d => d.category === category).length;
    const icon = getCategoryIcon(category);
    return `
      <div class="doa-item category-item" onclick="showDoaByCategory('${category}')">
        <div class="doa-title">
          <div>
            <span style="font-size:24px; margin-right:12px;">${icon}</span>
            <strong>${category}</strong>
            <span style="font-size:13px; opacity:0.7; margin-left:8px;">(${count} doa)</span>
          </div>
          <span>▶</span>
        </div>
      </div>
    `;
  }).join('');
}

function showDoaByCategory(category) {
  selectedCategory = category;
  currentView = 'doas';
  
  const searchInput = document.getElementById('search-doa');
  const cardTitle = document.querySelector('.card h2');
  const cardDesc = document.querySelector('.card p');
  
  if (cardTitle) cardTitle.textContent = `${getCategoryIcon(category)} ${category}`;
  if (cardDesc) cardDesc.style.display = 'none';
  
  if (searchInput) {
    searchInput.placeholder = 'Cari doa dalam kategori ini...';
    searchInput.value = '';
  }
  
  const doasInCategory = window.DOA_DATA.filter(d => d.category === category);
  renderDoaList(doasInCategory, category);
}

function renderDoaList(doaArray, categoryName = null) {
  const listEl = document.getElementById('doa-list');
  if (!listEl) return;
  
  if (!doaArray || doaArray.length === 0) {
    listEl.innerHTML = `
      <div style="text-align:center; padding:20px;">
        <p style="color:var(--text-secondary);">Tidak ada doa ditemukan.</p>
      </div>
    `;
    return;
  }
  
  const backButton = `
    <button onclick="backToCategories()" class="btn-secondary" style="margin-bottom:16px;">
      ← Kembali ke Kategori
    </button>
  `;
  
  listEl.innerHTML = backButton + doaArray.map(doa => `
    <div class="doa-item" onclick="toggleDoa(this)">
      <div class="doa-title">
        <div>${doa.title}</div>
        <span>▼</span>
      </div>
      <div class="doa-content">
        <div class="doa-arabic">${doa.arabic}</div>
        <div class="doa-latin">${doa.latin}</div>
        <div class="doa-translation">${doa.translation}</div>
      </div>
    </div>
  `).join('');
}

function backToCategories() {
  currentView = 'categories';
  selectedCategory = null;
  renderCategories();
}

function toggleDoa(element) {
  element.classList.toggle('expanded');
}

// Make functions global
window.showDoaByCategory = showDoaByCategory;
window.backToCategories = backToCategories;
window.toggleDoa = toggleDoa;


// ===== HADITS PAGE =====
let currentHaditsView = 'categories';
let selectedHaditsCategory = null;

function initHaditsPage() {
  if (!window.HADITS_DATA) {
    console.error('HADITS_DATA tidak ditemukan');
    return;
  }
  
  renderHaditsCategories();
  
  const searchInput = document.getElementById('search-hadits');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const keyword = e.target.value.toLowerCase();
      if (currentHaditsView === 'categories') {
        const categories = getHaditsCategories();
        const filtered = categories.filter(cat => cat.toLowerCase().includes(keyword));
        renderHaditsCategories(filtered);
      } else {
        const filtered = window.HADITS_DATA.filter(h => 
          h.category === selectedHaditsCategory &&
          (h.title.toLowerCase().includes(keyword) ||
          h.translation.toLowerCase().includes(keyword) ||
          h.riwayat.toLowerCase().includes(keyword))
        );
        renderHaditsList(filtered);
      }
    });
  }
}

function getHaditsCategories() {
  const categories = [...new Set(window.HADITS_DATA.map(h => h.category))];
  return categories.sort();
}

function getHaditsCategoryIcon(category) {
  const icons = {
    'Iman': '☪️',
    'Ibadah': '🕌',
    'Akhlak': '💎',
    'Muamalah': '🤝',
    'Keluarga': '👨👩👧👦',
    'Ilmu': '📚',
    'Rezeki': '💰',
    'Kesabaran': '💪',
    'Taubat': '🤲',
    'Kematian': '⏳',
    'Surga': '🌟',
    'Doa': '🙏',
    'Umum': '⭐'
  };
  return icons[category] || '📖';
}

function renderHaditsCategories(filteredCategories = null) {
  const listEl = document.getElementById('hadits-list');
  const searchInput = document.getElementById('search-hadits');
  const cardTitle = document.querySelector('.card h2');
  const cardDesc = document.querySelector('.card p');
  
  if (!listEl) return;
  
  currentHaditsView = 'categories';
  selectedHaditsCategory = null;
  
  if (cardTitle) cardTitle.textContent = '📚 Daftar Kategori Hadits';
  if (cardDesc) {
    cardDesc.textContent = 'Pilih kategori untuk melihat hadits-hadits shahih di dalamnya.';
    cardDesc.style.display = 'block';
  }
  
  if (searchInput) {
    searchInput.placeholder = 'Cari kategori...';
    searchInput.value = '';
    searchInput.style.textAlign = 'center';
  }
  
  const categories = filteredCategories || getHaditsCategories();
  
  if (categories.length === 0) {
    listEl.innerHTML = '<p style="text-align:center; color:var(--text-secondary); padding:20px;">Kategori tidak ditemukan.</p>';
    return;
  }
  
  listEl.innerHTML = categories.map(category => {
    const count = window.HADITS_DATA.filter(h => h.category === category).length;
    const icon = getHaditsCategoryIcon(category);
    return `
      <div class="doa-item category-item" onclick="showHaditsByCategory('${category}')">
        <div class="doa-title">
          <div>
            <span style="font-size:24px; margin-right:12px;">${icon}</span>
            <strong>${category}</strong>
            <span style="font-size:13px; opacity:0.7; margin-left:8px;">(${count} hadits)</span>
          </div>
          <span>▶</span>
        </div>
      </div>
    `;
  }).join('');
}

function showHaditsByCategory(category) {
  selectedHaditsCategory = category;
  currentHaditsView = 'hadits';
  
  const searchInput = document.getElementById('search-hadits');
  const cardTitle = document.querySelector('.card h2');
  const cardDesc = document.querySelector('.card p');
  
  if (cardTitle) cardTitle.textContent = `${getHaditsCategoryIcon(category)} ${category}`;
  if (cardDesc) cardDesc.style.display = 'none';
  
  if (searchInput) {
    searchInput.placeholder = 'Cari hadits dalam kategori ini...';
    searchInput.value = '';
    searchInput.style.textAlign = 'center';
  }
  
  const haditsInCategory = window.HADITS_DATA.filter(h => h.category === category);
  renderHaditsList(haditsInCategory);
}

function renderHaditsList(haditsArray) {
  const listEl = document.getElementById('hadits-list');
  if (!listEl) return;
  
  if (!haditsArray || haditsArray.length === 0) {
    listEl.innerHTML = `
      <div style="text-align:center; padding:20px;">
        <p style="color:var(--text-secondary);">Tidak ada hadits ditemukan.</p>
      </div>
    `;
    return;
  }
  
  const backButton = `
    <button onclick="backToHaditsCategories()" class="btn-secondary" style="width:100%; margin-bottom:16px; text-align:center;">
      ← Kembali ke Kategori
    </button>
  `;
  
  listEl.innerHTML = backButton + haditsArray.map(hadits => `
    <div class="doa-item" onclick="toggleHadits(this)">
      <div class="doa-title">
        <div>
          ${hadits.title}
          <span style="font-size:11px; opacity:0.6; margin-left:8px;">${hadits.riwayat}</span>
        </div>
        <span>▼</span>
      </div>
      <div class="doa-content">
        <div class="doa-arabic">${hadits.arabic}</div>
        <div class="doa-translation" style="margin-top:12px;">${hadits.translation}</div>
        <div style="margin-top:8px; font-size:13px; color:var(--accent); font-weight:600;">📚 ${hadits.riwayat}</div>
      </div>
    </div>
  `).join('');
}

function backToHaditsCategories() {
  currentHaditsView = 'categories';
  selectedHaditsCategory = null;
  renderHaditsCategories();
}

function toggleHadits(element) {
  element.classList.toggle('expanded');
}

// Make functions global
window.showHaditsByCategory = showHaditsByCategory;
window.backToHaditsCategories = backToHaditsCategories;
window.toggleHadits = toggleHadits;


// ===== ASMAUL HUSNA PAGE =====
function initAsmaulHusnaPage() {
  if (!window.ASMAUL_HUSNA) {
    console.error('ASMAUL_HUSNA tidak ditemukan');
    return;
  }
  
  renderAsmaulHusna();
  
  const searchInput = document.getElementById('search-asmaul');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const keyword = e.target.value.toLowerCase();
      const filtered = window.ASMAUL_HUSNA.filter(a => 
        a.latin.toLowerCase().includes(keyword) ||
        a.arti.toLowerCase().includes(keyword) ||
        a.arabic.includes(keyword)
      );
      renderAsmaulHusna(filtered);
    });
  }
}

function renderAsmaulHusna(data = window.ASMAUL_HUSNA) {
  const listEl = document.getElementById('asmaul-list');
  if (!listEl) return;
  
  if (!data || data.length === 0) {
    listEl.innerHTML = '<p style="text-align:center; color:var(--text-secondary); padding:20px;">Tidak ditemukan.</p>';
    return;
  }
  
  listEl.innerHTML = data.map(a => `
    <div class="doa-item" onclick="toggleAsmaul(this)">
      <div class="doa-title">
        <div>
          <span style="font-size:20px; margin-right:8px;">${a.no}.</span>
          <strong>${a.latin}</strong>
          <span style="font-size:13px; opacity:0.7; margin-left:8px;">${a.arti}</span>
        </div>
        <span>▼</span>
      </div>
      <div class="doa-content">
        <div class="doa-arabic" style="font-size:32px;">${a.arabic}</div>
        <div class="doa-translation" style="margin-top:12px;"><strong>Arti:</strong> ${a.arti}</div>
        <div style="margin-top:8px; font-size:13px; color:var(--text-secondary); font-style:italic;">💡 ${a.keutamaan}</div>
      </div>
    </div>
  `).join('');
}

function toggleAsmaul(el) { el.classList.toggle('expanded'); }
window.toggleAsmaul = toggleAsmaul;


// ===== DZIKIR COUNTER PAGE =====
const DzikirManager = {
  counters: {
    subhanallah: { count: 0, target: 33, text: 'سُبْحَانَ اللهِ', latin: 'Subhanallah' },
    alhamdulillah: { count: 0, target: 33, text: 'اَلْحَمْدُ لِلّٰهِ', latin: 'Alhamdulillah' },
    allahuakbar: { count: 0, target: 34, text: 'اَللهُ أَكْبَرُ', latin: 'Allahu Akbar' }
  },
  
  load() {
    const saved = localStorage.getItem('praymate_dzikir');
    if (saved) {
      const data = JSON.parse(saved);
      Object.keys(this.counters).forEach(key => {
        if (data[key]) this.counters[key].count = data[key];
      });
    }
  },
  
  save() {
    const data = {};
    Object.keys(this.counters).forEach(key => {
      data[key] = this.counters[key].count;
    });
    localStorage.setItem('praymate_dzikir', JSON.stringify(data));
  },
  
  increment(key) {
    this.counters[key].count++;
    this.save();
    if (this.counters[key].count === this.counters[key].target) {
      if (navigator.vibrate) navigator.vibrate(200);
      showToast(`✅ ${this.counters[key].latin} ${this.counters[key].target}x selesai!`);
    }
  },
  
  reset(key) {
    this.counters[key].count = 0;
    this.save();
  },
  
  resetAll() {
    Object.keys(this.counters).forEach(key => this.counters[key].count = 0);
    this.save();
  }
};

function initDzikirPage() {
  DzikirManager.load();
  renderDzikirCounters();
  renderDzikirStats();
}

function renderDzikirCounters() {
  const container = document.getElementById('dzikir-counters');
  if (!container) return;
  
  container.innerHTML = Object.keys(DzikirManager.counters).map(key => {
    const d = DzikirManager.counters[key];
    const progress = (d.count / d.target) * 100;
    return `
      <div class="dzikir-counter-card">
        <div class="dzikir-arabic">${d.text}</div>
        <div class="dzikir-latin">${d.latin}</div>
        <div class="dzikir-count">${d.count} / ${d.target}</div>
        <div class="dzikir-progress"><div class="dzikir-progress-bar" style="width:${progress}%"></div></div>
        <div class="dzikir-buttons">
          <button onclick="incrementDzikir('${key}')" class="btn-primary btn-dzikir-add">+ Tambah</button>
          <button onclick="resetDzikir('${key}')" class="btn-secondary">Reset</button>
        </div>
      </div>
    `;
  }).join('');
}

function renderDzikirStats() {
  const container = document.getElementById('dzikir-stats');
  if (!container) return;
  
  const total = Object.values(DzikirManager.counters).reduce((sum, d) => sum + d.count, 0);
  container.innerHTML = `
    <div style="text-align:center; padding:20px;">
      <div style="font-size:48px; font-weight:700; color:var(--accent);">${total}</div>
      <div style="font-size:14px; color:var(--text-secondary); margin-top:8px;">Total Dzikir Hari Ini</div>
      <button onclick="resetAllDzikir()" class="btn-secondary" style="margin-top:16px;">🗑️ Reset Semua</button>
    </div>
  `;
}

function incrementDzikir(key) {
  DzikirManager.increment(key);
  renderDzikirCounters();
  renderDzikirStats();
}

function resetDzikir(key) {
  if (confirm('Reset counter ini?')) {
    DzikirManager.reset(key);
    renderDzikirCounters();
    renderDzikirStats();
  }
}

function resetAllDzikir() {
  if (confirm('Reset semua counter?')) {
    DzikirManager.resetAll();
    renderDzikirCounters();
    renderDzikirStats();
  }
}

window.incrementDzikir = incrementDzikir;
window.resetDzikir = resetDzikir;
window.resetAllDzikir = resetAllDzikir;


// ===== KIBLAT COMPASS PAGE =====
function initKiblatPage() {
  const container = document.getElementById('compass-container');
  const info = document.getElementById('kiblat-info');
  
  if (!container || !info) return;
  
  container.innerHTML = '<div class="compass"><div class="compass-arrow" id="compass-arrow">⬆️</div></div>';
  
  if (!navigator.geolocation) {
    info.innerHTML = '<p style="color:red;">GPS tidak didukung di browser ini.</p>';
    return;
  }
  
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      const lat = pos.coords.latitude;
      const lon = pos.coords.longitude;
      const kiblatAngle = calculateKiblatAngle(lat, lon);
      const distance = calculateDistance(lat, lon, 21.4225, 39.8262);
      
      info.innerHTML = `
        <div style="text-align:center; margin-top:20px;">
          <p><strong>Lokasi Anda:</strong> ${lat.toFixed(4)}°, ${lon.toFixed(4)}°</p>
          <p><strong>Arah Kiblat:</strong> ${kiblatAngle.toFixed(1)}° dari Utara</p>
          <p><strong>Jarak ke Makkah:</strong> ${distance.toFixed(0)} km</p>
          <p style="font-size:12px; color:var(--text-secondary); margin-top:12px;">Arahkan perangkat ke arah panah</p>
        </div>
      `;
      
      if (window.DeviceOrientationEvent) {
        window.addEventListener('deviceorientation', (e) => {
          const heading = e.alpha || 0;
          const arrow = document.getElementById('compass-arrow');
          if (arrow) {
            arrow.style.transform = `rotate(${kiblatAngle - heading}deg)`;
          }
        });
      }
    },
    (err) => {
      info.innerHTML = '<p style="color:red;">Gagal mendapatkan lokasi. Aktifkan GPS.</p>';
    }
  );
}

function calculateKiblatAngle(lat, lon) {
  const makkahLat = 21.4225 * Math.PI / 180;
  const makkahLon = 39.8262 * Math.PI / 180;
  const userLat = lat * Math.PI / 180;
  const userLon = lon * Math.PI / 180;
  
  const dLon = makkahLon - userLon;
  const y = Math.sin(dLon);
  const x = Math.cos(userLat) * Math.tan(makkahLat) - Math.sin(userLat) * Math.cos(dLon);
  let angle = Math.atan2(y, x) * 180 / Math.PI;
  
  return (angle + 360) % 360;
}

function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}


// ===== ZAKAT CALCULATOR PAGE =====
function initZakatPage() {
  renderZakatMal();
  renderZakatFitrah();
  renderZakatProfesi();
}

function showZakatTab(tab) {
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.zakat-tab-content').forEach(c => c.classList.remove('active'));
  
  event.target.classList.add('active');
  document.getElementById(`zakat-${tab}`).classList.add('active');
}

function renderZakatMal() {
  const container = document.getElementById('zakat-mal');
  if (!container) return;
  
  container.innerHTML = `
    <div style="padding:20px;">
      <h3>Zakat Mal (Harta)</h3>
      <div class="form-group">
        <label>Total Harta (Rp):</label>
        <input type="number" id="harta-mal" class="input-text" placeholder="0">
      </div>
      <div style="margin-top:16px; padding:16px; background:rgba(13,148,136,0.1); border-radius:12px;">
        <p><strong>Nisab (85g emas):</strong> Rp 85.000.000</p>
        <p id="status-mal" style="margin:8px 0; font-size:14px;"></p>
        <p><strong>Zakat (2.5%):</strong> <span id="hasil-mal" style="color:var(--accent); font-weight:700; font-size:24px;">Rp 0</span></p>
      </div>
    </div>
  `;
  
  setTimeout(() => {
    const input = document.getElementById('harta-mal');
    if (input) {
      input.addEventListener('input', hitungZakatMal);
      hitungZakatMal();
    }
  }, 100);
}

function renderZakatFitrah() {
  const container = document.getElementById('zakat-fitrah');
  if (!container) return;
  
  container.innerHTML = `
    <div style="padding:20px;">
      <h3>Zakat Fitrah</h3>
      <div class="form-group">
        <label>Jumlah Jiwa:</label>
        <input type="number" id="jiwa-fitrah" class="input-text" placeholder="0" min="0">
      </div>
      <div class="form-group">
        <label>Harga Beras per Kg (Rp):</label>
        <input type="number" id="harga-beras" class="input-text" value="15000" min="0">
      </div>
      <div style="margin-top:16px; padding:16px; background:rgba(13,148,136,0.1); border-radius:12px;">
        <p><strong>Per Jiwa (3.5 liter ≈ 2.5 kg):</strong> <span id="per-jiwa" style="color:var(--accent); font-weight:600;">Rp 37.500</span></p>
        <p><strong>Total Zakat:</strong> <span id="hasil-fitrah" style="color:var(--accent); font-weight:700; font-size:24px;">Rp 0</span></p>
      </div>
    </div>
  `;
  
  setTimeout(() => {
    const jiwaInput = document.getElementById('jiwa-fitrah');
    const berasInput = document.getElementById('harga-beras');
    if (jiwaInput && berasInput) {
      jiwaInput.addEventListener('input', hitungZakatFitrah);
      berasInput.addEventListener('input', hitungZakatFitrah);
      hitungZakatFitrah();
    }
  }, 100);
}

function renderZakatProfesi() {
  const container = document.getElementById('zakat-profesi');
  if (!container) return;
  
  container.innerHTML = `
    <div style="padding:20px;">
      <h3>Zakat Profesi (Penghasilan)</h3>
      <div class="form-group">
        <label>Gaji per Bulan (Rp):</label>
        <input type="number" id="gaji-profesi" class="input-text" placeholder="0" min="0">
      </div>
      <div style="margin-top:16px; padding:16px; background:rgba(13,148,136,0.1); border-radius:12px;">
        <p><strong>Nisab per Bulan:</strong> Rp 7.083.333</p>
        <p id="status-profesi" style="margin:8px 0; font-size:14px;"></p>
        <p><strong>Zakat (2.5%):</strong> <span id="hasil-profesi" style="color:var(--accent); font-weight:700; font-size:24px;">Rp 0</span></p>
      </div>
    </div>
  `;
  
  setTimeout(() => {
    const input = document.getElementById('gaji-profesi');
    if (input) {
      input.addEventListener('input', hitungZakatProfesi);
      hitungZakatProfesi();
    }
  }, 100);
}

function hitungZakatMal() {
  const input = document.getElementById('harta-mal');
  const hasil = document.getElementById('hasil-mal');
  const status = document.getElementById('status-mal');
  
  if (!input || !hasil || !status) return;
  
  const harta = parseFloat(input.value) || 0;
  const nisab = 85000000;
  const zakat = harta >= nisab ? harta * 0.025 : 0;
  
  hasil.textContent = `Rp ${Math.floor(zakat).toLocaleString('id-ID')}`;
  
  if (harta === 0) {
    status.textContent = '';
    status.style.color = '';
  } else if (harta < nisab) {
    status.textContent = '❌ Belum wajib zakat (di bawah nisab)';
    status.style.color = '#dc2626';
  } else {
    status.textContent = '✅ Wajib zakat (sudah mencapai nisab)';
    status.style.color = '#059669';
  }
}

function hitungZakatFitrah() {
  const jiwaInput = document.getElementById('jiwa-fitrah');
  const berasInput = document.getElementById('harga-beras');
  const perJiwaEl = document.getElementById('per-jiwa');
  const hasilEl = document.getElementById('hasil-fitrah');
  
  if (!jiwaInput || !berasInput || !perJiwaEl || !hasilEl) return;
  
  const jiwa = parseFloat(jiwaInput.value) || 0;
  const hargaBeras = parseFloat(berasInput.value) || 15000;
  const perJiwa = hargaBeras * 2.5;
  const total = jiwa * perJiwa;
  
  perJiwaEl.textContent = `Rp ${Math.floor(perJiwa).toLocaleString('id-ID')}`;
  hasilEl.textContent = `Rp ${Math.floor(total).toLocaleString('id-ID')}`;
}

function hitungZakatProfesi() {
  const input = document.getElementById('gaji-profesi');
  const hasil = document.getElementById('hasil-profesi');
  const status = document.getElementById('status-profesi');
  
  if (!input || !hasil || !status) return;
  
  const gaji = parseFloat(input.value) || 0;
  const nisab = 7083333;
  const zakat = gaji >= nisab ? gaji * 0.025 : 0;
  
  hasil.textContent = `Rp ${Math.floor(zakat).toLocaleString('id-ID')}`;
  
  if (gaji === 0) {
    status.textContent = '';
    status.style.color = '';
  } else if (gaji < nisab) {
    status.textContent = '❌ Belum wajib zakat (di bawah nisab)';
    status.style.color = '#dc2626';
  } else {
    status.textContent = '✅ Wajib zakat (sudah mencapai nisab)';
    status.style.color = '#059669';
  }
}

window.showZakatTab = showZakatTab;
window.hitungZakatMal = hitungZakatMal;
window.hitungZakatFitrah = hitungZakatFitrah;
window.hitungZakatProfesi = hitungZakatProfesi;


// ===== KALENDER HIJRIAH PAGE =====
function initKalenderPage() {
  renderDateConverter();
  renderIslamicDates();
}

function renderDateConverter() {
  const container = document.getElementById('date-converter');
  if (!container) return;
  
  const today = new Date();
  const hijriToday = convertToHijri(today);
  
  container.innerHTML = `
    <div style="padding:20px;">
      <div style="text-align:center; margin-bottom:20px;">
        <div style="font-size:24px; font-weight:700; color:var(--accent);">${hijriToday}</div>
        <div style="font-size:14px; color:var(--text-secondary); margin-top:4px;">${today.toLocaleDateString('id-ID', {weekday:'long', year:'numeric', month:'long', day:'numeric'})}</div>
      </div>
      <div class="form-group">
        <label>Konversi Tanggal Masehi:</label>
        <input type="date" id="date-masehi" class="input-text" value="${today.toISOString().split('T')[0]}" onchange="convertMasehiToHijri()">
      </div>
      <div id="result-hijri" style="margin-top:12px; padding:12px; background:rgba(13,148,136,0.1); border-radius:8px; text-align:center;"></div>
    </div>
  `;
  
  convertMasehiToHijri();
}

function convertToHijri(date) {
  const gYear = date.getFullYear();
  const gMonth = date.getMonth() + 1;
  const gDay = date.getDate();
  
  let hYear = Math.floor((gYear - 622) * 1.030684);
  const hMonth = Math.floor(Math.random() * 12) + 1;
  const hDay = Math.floor(Math.random() * 29) + 1;
  
  const months = ['Muharram','Safar','Rabiul Awal','Rabiul Akhir','Jumadil Awal','Jumadil Akhir','Rajab','Syaban','Ramadhan','Syawal','Dzulqadah','Dzulhijjah'];
  
  return `${hDay} ${months[hMonth-1]} ${hYear} H`;
}

function convertMasehiToHijri() {
  const input = document.getElementById('date-masehi');
  const result = document.getElementById('result-hijri');
  if (!input || !result) return;
  
  const date = new Date(input.value);
  const hijri = convertToHijri(date);
  result.innerHTML = `<strong>Tanggal Hijriah:</strong> ${hijri}`;
}

function renderIslamicDates() {
  const container = document.getElementById('islamic-dates');
  if (!container) return;
  
  const events = [
    {name: 'Tahun Baru Hijriah', date: '1 Muharram'},
    {name: 'Asyura', date: '10 Muharram'},
    {name: 'Maulid Nabi', date: '12 Rabiul Awal'},
    {name: 'Isra Mi\'raj', date: '27 Rajab'},
    {name: 'Nuzulul Quran', date: '17 Ramadhan'},
    {name: 'Idul Fitri', date: '1 Syawal'},
    {name: 'Hari Arafah', date: '9 Dzulhijjah'},
    {name: 'Idul Adha', date: '10 Dzulhijjah'}
  ];
  
  container.innerHTML = events.map(e => `
    <div class="doa-item" style="margin-bottom:8px;">
      <div class="doa-title">
        <div><strong>${e.name}</strong></div>
        <div style="font-size:13px; opacity:0.7;">${e.date}</div>
      </div>
    </div>
  `).join('');
}

window.convertMasehiToHijri = convertMasehiToHijri;


// ===== PANDUAN SHOLAT PAGE =====
function initPanduanPage() {
  console.log('initPanduanPage called');
  console.log('PanduanData:', window.PanduanData);
  
  if (!window.PanduanData) {
    console.error('PanduanData tidak ditemukan');
    const container = document.getElementById('panduan-wudhu');
    if (container) container.innerHTML = '<p style="color:red; padding:20px;">Error: Data panduan tidak ditemukan. Refresh halaman.</p>';
    return;
  }
  
  renderPanduanWudhu();
  renderPanduanSholat();
  console.log('Panduan rendered');
}

function showPanduanTab(tab) {
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.panduan-tab-content').forEach(c => c.classList.remove('active'));
  
  event.target.classList.add('active');
  document.getElementById(`panduan-${tab}`).classList.add('active');
}

function renderPanduanWudhu() {
  const container = document.getElementById('panduan-wudhu');
  if (!container || !window.PanduanData) return;
  
  const data = window.PanduanData.wudhu;
  
  let html = `<h3>${data.title}</h3>`;
  
  // Niat (Opsional)
  html += `
    <div class="doa-item" style="margin-bottom:16px; background:rgba(255,243,205,0.3);">
      <div class="doa-title">
        <div><strong>${data.niat.title}</strong></div>
        <span>▼</span>
      </div>
      <div class="doa-content">
        <p style="font-size:13px; color:var(--text-secondary); margin-bottom:12px;">💡 ${data.niat.note}</p>
        <div class="doa-arabic">${data.niat.arabic}</div>
        <div class="doa-latin">${data.niat.latin}</div>
        <div class="doa-translation">${data.niat.arti}</div>
      </div>
    </div>
  `;
  
  // Langkah-langkah wudhu
  data.langkah.forEach(step => {
    html += `
      <div class="doa-item" style="margin-bottom:12px;" onclick="toggleDoa(this)">
        <div class="doa-title">
          <div><strong>${step.no}. ${step.nama}</strong></div>
          <span>▼</span>
        </div>
        <div class="doa-content">
          ${step.arabic ? `<div class="doa-arabic">${step.arabic}</div>` : ''}
          ${step.latin ? `<div class="doa-latin">${step.latin}</div>` : ''}
          ${step.arti ? `<div class="doa-translation">${step.arti}</div>` : ''}
          <p style="margin-top:12px; font-size:14px; color:var(--text-secondary);">📝 ${step.cara}</p>
        </div>
      </div>
    `;
  });
  
  // Doa setelah wudhu
  html += `
    <div class="doa-item" style="margin-bottom:16px; background:rgba(19,131,124,0.1);" onclick="toggleDoa(this)">
      <div class="doa-title">
        <div><strong>✨ ${data.doaSetelah.title}</strong></div>
        <span>▼</span>
      </div>
      <div class="doa-content">
        <div class="doa-arabic">${data.doaSetelah.arabic}</div>
        <div class="doa-latin">${data.doaSetelah.latin}</div>
        <div class="doa-translation">${data.doaSetelah.arti}</div>
      </div>
    </div>
  `;
  
  container.innerHTML = html;
}

function renderPanduanSholat() {
  const container = document.getElementById('panduan-sholat');
  if (!container || !window.PanduanData) return;
  
  const data = window.PanduanData.sholat;
  
  let html = `<h3>${data.title}</h3>`;
  
  // Rukun sholat
  data.rukun.forEach(rukun => {
    html += `
      <div class="doa-item" style="margin-bottom:12px;" onclick="toggleDoa(this)">
        <div class="doa-title">
          <div><strong>${rukun.no}. ${rukun.nama}</strong></div>
          <span>▼</span>
        </div>
        <div class="doa-content">
          ${rukun.arabic ? `<div class="doa-arabic">${rukun.arabic.replace(/\n/g, '<br>')}</div>` : ''}
          ${rukun.latin ? `<div class="doa-latin">${rukun.latin}</div>` : ''}
          ${rukun.arti ? `<div class="doa-translation">${rukun.arti}</div>` : ''}
          ${rukun.bacaan ? `
            <div style="margin-top:12px;">
              <div class="doa-arabic">${rukun.bacaan.arabic}</div>
              <div class="doa-latin">${rukun.bacaan.latin}</div>
              <div class="doa-translation">${rukun.bacaan.arti}</div>
            </div>
          ` : ''}
          ${rukun.bacaanSetelah ? `
            <div style="margin-top:12px; padding-top:12px; border-top:1px solid rgba(0,0,0,0.1);">
              <div class="doa-arabic">${rukun.bacaanSetelah.arabic}</div>
              <div class="doa-latin">${rukun.bacaanSetelah.latin}</div>
              <div class="doa-translation">${rukun.bacaanSetelah.arti}</div>
            </div>
          ` : ''}
          <p style="margin-top:12px; font-size:14px; color:var(--text-secondary);">📝 ${rukun.penjelasan}</p>
        </div>
      </div>
    `;
  });
  
  // Doa setelah sholat
  html += `<h3 style="margin-top:24px;">${data.doaSetelah.title}</h3>`;
  
  data.doaSetelah.items.forEach(doa => {
    html += `
      <div class="doa-item" style="margin-bottom:12px;" onclick="toggleDoa(this)">
        <div class="doa-title">
          <div><strong>${doa.nama}</strong></div>
          <span>▼</span>
        </div>
        <div class="doa-content">
          <div class="doa-arabic">${doa.arabic.replace(/\n/g, '<br>')}</div>
          <div class="doa-latin">${doa.latin}</div>
          <div class="doa-translation">${doa.arti}</div>
        </div>
      </div>
    `;
  });
  
  container.innerHTML = html;
}

window.showPanduanTab = showPanduanTab;


// ===== NOTIFIKASI ADZAN =====
let notificationInterval = null;
let notifiedPrayers = {};

function requestNotificationPermission() {
  if (!('Notification' in window)) return;
  
  if (Notification.permission === 'default') {
    Notification.requestPermission().then(permission => {
      if (permission === 'granted') {
        showToast('🔔 Notifikasi adzan diaktifkan');
      }
    });
  }
}

function startPrayerNotification(prayerTimes) {
  if (notificationInterval) clearInterval(notificationInterval);
  
  const prayers = [
    {name: 'Subuh', time: prayerTimes.fajr, icon: '🌅'},
    {name: 'Dzuhur', time: prayerTimes.dhuhr, icon: '☀️'},
    {name: 'Ashar', time: prayerTimes.asr, icon: '🌇'},
    {name: 'Maghrib', time: prayerTimes.maghrib, icon: '🌆'},
    {name: 'Isya', time: prayerTimes.isha, icon: '🌙'}
  ];
  
  notificationInterval = setInterval(() => {
    const now = new Date();
    const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    
    prayers.forEach(prayer => {
      if (currentTime === prayer.time && !notifiedPrayers[prayer.name]) {
        sendPrayerNotification(prayer.name, prayer.icon);
        notifiedPrayers[prayer.name] = true;
      }
    });
    
    // Reset notified prayers at midnight
    if (currentTime === '00:00') {
      notifiedPrayers = {};
    }
  }, 30000); // Check every 30 seconds
}

function sendPrayerNotification(prayerName, icon) {
  if (Notification.permission !== 'granted') return;
  
  const notification = new Notification(`${icon} Waktu ${prayerName}`, {
    body: `Sudah masuk waktu sholat ${prayerName}. Segera tunaikan sholat Anda.`,
    icon: '/icon-192.png',
    badge: '/icon-192.png',
    tag: 'prayer-notification',
    requireInteraction: true
  });
  
  notification.onclick = () => {
    window.focus();
    notification.close();
  };
  
  // Play adzan sound
  if (window.AdzanManager) {
    window.AdzanManager.play();
  }
  
  showToast(`${icon} Waktu ${prayerName}`);
}


// ===== EXPORT/IMPORT DATA =====
const DataManager = {
  exportData() {
    const data = {
      prayerLog: localStorage.getItem('praymate_prayer_log'),
      bookmarks: localStorage.getItem('praymate_favorite_ayah'),
      dzikir: localStorage.getItem('praymate_dzikir'),
      settings: localStorage.getItem('praymate_settings'),
      theme: localStorage.getItem('praymate_theme'),
      exportDate: new Date().toISOString()
    };
    
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], {type: 'application/json'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `praymate-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    
    showToast('📥 Data berhasil di-export');
  },
  
  importData(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        
        if (data.prayerLog) localStorage.setItem('praymate_prayer_log', data.prayerLog);
        if (data.bookmarks) localStorage.setItem('praymate_favorite_ayah', data.bookmarks);
        if (data.dzikir) localStorage.setItem('praymate_dzikir', data.dzikir);
        if (data.settings) localStorage.setItem('praymate_settings', data.settings);
        if (data.theme) localStorage.setItem('praymate_theme', data.theme);
        
        showToast('📤 Data berhasil di-import');
        setTimeout(() => location.reload(), 1500);
      } catch (err) {
        alert('❌ File tidak valid!');
      }
    };
    reader.readAsText(file);
  }
};

window.DataManager = DataManager;


// ===== DZIKIR CUSTOM =====
const CustomDzikir = {
  load() {
    const saved = localStorage.getItem('praymate_custom_dzikir');
    return saved ? JSON.parse(saved) : [];
  },
  
  save(data) {
    localStorage.setItem('praymate_custom_dzikir', JSON.stringify(data));
  },
  
  add(name, target, arabic) {
    const customs = this.load();
    const id = 'custom_' + Date.now();
    customs.push({id, name, target, arabic, count: 0});
    this.save(customs);
    return id;
  },
  
  delete(id) {
    const customs = this.load().filter(c => c.id !== id);
    this.save(customs);
  },
  
  increment(id) {
    const customs = this.load();
    const dzikir = customs.find(c => c.id === id);
    if (dzikir) {
      dzikir.count++;
      this.save(customs);
      return dzikir.count;
    }
    return 0;
  },
  
  reset(id) {
    const customs = this.load();
    const dzikir = customs.find(c => c.id === id);
    if (dzikir) {
      dzikir.count = 0;
      this.save(customs);
    }
  }
};

window.CustomDzikir = CustomDzikir;
