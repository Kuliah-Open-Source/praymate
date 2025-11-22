// Data Panduan Wudhu dan Sholat Lengkap
// Bismillah

const PanduanData = {
  wudhu: {
    title: "Tata Cara Wudhu",
    niat: {
      title: "Niat Wudhu (Opsional)",
      note: "Nabi ﷺ tidak mengajarkan niat lisan. Cukup niat di hati untuk berwudhu karena Allah.",
      arabic: "نَوَيْتُ الْوُضُوْءَ لِرَفْعِ الْحَدَثِ اْلاَصْغَرِ فَرْضًا ِللهِ تَعَالَى",
      latin: "Nawaitul wudhuu-a lirof'il hadatsil ashghori fardhol lillaahi ta'aala",
      arti: "Saya niat berwudhu untuk menghilangkan hadats kecil, fardhu karena Allah Ta'ala"
    },
    langkah: [
      {
        no: 1,
        nama: "Membaca Basmalah",
        arabic: "بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ",
        latin: "Bismillahir rahmaanir rahiim",
        arti: "Dengan nama Allah Yang Maha Pengasih lagi Maha Penyayang",
        cara: "Bacakan basmalah sebelum memulai wudhu"
      },
      {
        no: 2,
        nama: "Membasuh Kedua Telapak Tangan",
        cara: "Basuh kedua telapak tangan hingga pergelangan tangan sebanyak 3 kali"
      },
      {
        no: 3,
        nama: "Berkumur-kumur",
        cara: "Berkumur-kumur dengan air sebanyak 3 kali, pastikan air sampai ke seluruh mulut"
      },
      {
        no: 4,
        nama: "Menghirup Air ke Hidung",
        cara: "Hirup air ke dalam hidung lalu keluarkan sebanyak 3 kali"
      },
      {
        no: 5,
        nama: "Membasuh Muka",
        cara: "Basuh seluruh wajah dari dahi hingga dagu, dari telinga kanan ke telinga kiri sebanyak 3 kali"
      },
      {
        no: 6,
        nama: "Membasuh Kedua Tangan",
        cara: "Basuh tangan kanan dari ujung jari hingga siku sebanyak 3 kali, lalu tangan kiri dengan cara yang sama"
      },
      {
        no: 7,
        nama: "Mengusap Kepala",
        cara: "Usap kepala dengan tangan basah dari depan ke belakang lalu kembali ke depan sebanyak 1 kali"
      },
      {
        no: 8,
        nama: "Mengusap Kedua Telinga",
        cara: "Usap bagian dalam telinga dengan jari telunjuk dan bagian luar dengan ibu jari sebanyak 1 kali"
      },
      {
        no: 9,
        nama: "Membasuh Kedua Kaki",
        cara: "Basuh kaki kanan dari ujung jari hingga mata kaki sebanyak 3 kali, lalu kaki kiri dengan cara yang sama"
      }
    ],
    doaSetelah: {
      title: "Doa Setelah Wudhu",
      arabic: "أَشْهَدُ أَنْ لاَ إِلَهَ إِلاَّ اللهُ وَحْدَهُ لاَ شَرِيْكَ لَهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُوْلُهُ، اَللّٰهُمَّ اجْعَلْنِيْ مِنَ التَّوَّابِيْنَ وَاجْعَلْنِيْ مِنَ الْمُتَطَهِّرِيْنَ",
      latin: "Asyhadu an laa ilaaha illallahu wahdahu laa syariikalahu wa asyhadu anna Muhammadan 'abduhu wa rasuuluhu. Allahumma-j'alnii minat-tawwaabiina waj'alnii minal-mutathohiriina",
      arti: "Aku bersaksi bahwa tidak ada tuhan selain Allah Yang Maha Esa, tidak ada sekutu bagi-Nya. Dan aku bersaksi bahwa Muhammad adalah hamba dan utusan-Nya. Ya Allah, jadikanlah aku termasuk orang-orang yang bertaubat dan jadikanlah aku termasuk orang-orang yang bersuci"
    }
  },
  
  sholat: {
    title: "Tata Cara Sholat",
    rukun: [
      {
        no: 1,
        nama: "Niat",
        penjelasan: "Niat di dalam hati untuk melakukan sholat tertentu karena Allah"
      },
      {
        no: 2,
        nama: "Berdiri Bagi yang Mampu",
        penjelasan: "Berdiri tegak menghadap kiblat (bagi yang mampu)"
      },
      {
        no: 3,
        nama: "Takbiratul Ihram",
        arabic: "اَللهُ أَكْبَرُ",
        latin: "Allahu Akbar",
        arti: "Allah Maha Besar",
        penjelasan: "Mengangkat kedua tangan sejajar telinga sambil mengucapkan takbir"
      },
      {
        no: 4,
        nama: "Membaca Surah Al-Fatihah",
        arabic: "بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ\nاَلْحَمْدُ ِللهِ رَبِّ الْعٰلَمِيْنَۙ\nالرَّحْمٰنِ الرَّحِيْمِۙ\nمٰلِكِ يَوْمِ الدِّيْنِۗ\nاِيَّاكَ نَعْبُدُ وَاِيَّاكَ نَسْتَعِيْنُۗ\nاِهْدِنَا الصِّرَاطَ الْمُسْتَقِيْمَۙ\nصِرَاطَ الَّذِيْنَ اَنْعَمْتَ عَلَيْهِمْ ەۙ غَيْرِ الْمَغْضُوْبِ عَلَيْهِمْ وَلَا الضَّاۤلِّيْنَ",
        latin: "Bismillahir rahmaanir rahiim. Alhamdulillahi rabbil 'aalamiin. Ar-rahmaanir rahiim. Maaliki yaumiddiin. Iyyaaka na'budu wa iyyaaka nasta'iin. Ihdinash shiraathal mustaqiim. Shiraathal ladziina an'amta 'alaihim ghairil maghdhuubi 'alaihim waladh dhaallliin",
        arti: "Dengan nama Allah Yang Maha Pengasih lagi Maha Penyayang. Segala puji bagi Allah, Tuhan semesta alam. Yang Maha Pengasih lagi Maha Penyayang. Pemilik hari pembalasan. Hanya kepada-Mu kami menyembah dan hanya kepada-Mu kami memohon pertolongan. Tunjukilah kami jalan yang lurus. Yaitu jalan orang-orang yang telah Engkau beri nikmat, bukan jalan mereka yang dimurkai dan bukan pula jalan mereka yang sesat",
        penjelasan: "Wajib dibaca di setiap rakaat"
      },
      {
        no: 5,
        nama: "Ruku'",
        bacaan: {
          arabic: "سُبْحَانَ رَبِّيَ الْعَظِيْمِ وَبِحَمْدِهِ (3x)",
          latin: "Subhaana rabbiyal 'azhiimi wa bihamdih (3x)",
          arti: "Maha Suci Tuhanku Yang Maha Agung dan dengan memuji-Nya"
        },
        penjelasan: "Membungkuk dengan punggung lurus, tangan di lutut"
      },
      {
        no: 6,
        nama: "I'tidal",
        bacaan: {
          arabic: "سَمِعَ اللهُ لِمَنْ حَمِدَهُ",
          latin: "Sami'allahu liman hamidah",
          arti: "Allah mendengar orang yang memuji-Nya"
        },
        bacaanSetelah: {
          arabic: "رَبَّنَا وَلَكَ الْحَمْدُ",
          latin: "Rabbanaa wa lakal hamdu",
          arti: "Ya Tuhan kami, bagi-Mu segala puji"
        },
        penjelasan: "Berdiri tegak kembali setelah ruku'"
      },
      {
        no: 7,
        nama: "Sujud",
        bacaan: {
          arabic: "سُبْحَانَ رَبِّيَ اْلاَعْلَى وَبِحَمْدِهِ (3x)",
          latin: "Subhaana rabbiyal a'laa wa bihamdih (3x)",
          arti: "Maha Suci Tuhanku Yang Maha Tinggi dan dengan memuji-Nya"
        },
        penjelasan: "Sujud dengan 7 anggota badan: dahi, hidung, kedua telapak tangan, kedua lutut, dan ujung jari kaki. Dilakukan 2 kali setiap rakaat"
      },
      {
        no: 8,
        nama: "Duduk di Antara Dua Sujud",
        bacaan: {
          arabic: "رَبِّ اغْفِرْلِيْ وَارْحَمْنِيْ وَاجْبُرْنِيْ وَارْفَعْنِيْ وَارْزُقْنِيْ وَاهْدِنِيْ وَعَافِنِيْ وَاعْفُ عَنِّيْ",
          latin: "Rabbighfir lii warhamnii wajburnii warfa'nii warzuqnii wahdinii wa'aafinii wa'fu 'annii",
          arti: "Ya Tuhanku, ampunilah aku, kasihanilah aku, cukupkanlah aku, tinggikanlah aku, berilah rezeki kepadaku, berilah aku petunjuk, berilah kesehatan kepadaku, dan maafkanlah aku"
        },
        penjelasan: "Duduk sejenak di antara dua sujud"
      },
      {
        no: 9,
        nama: "Duduk Tasyahud Awal",
        bacaan: {
          arabic: "اَلتَّحِيَّاتُ الْمُبَارَكَاتُ الصَّلَوَاتُ الطَّيِّبَاتُ ِللهِ، اَلسَّلاَمُ عَلَيْكَ اَيُّهَا النَّبِيُّ وَرَحْمَةُ اللهِ وَبَرَكَاتُهُ، اَلسَّلاَمُ عَلَيْنَا وَعَلَى عِبَادِاللهِ الصَّالِحِيْنَ، أَشْهَدُ اَنْ لاَ إِلَهَ إِلاَّ اللهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا رَسُوْلُ اللهِ",
          latin: "Attahiyyaatul mubaarakaatush sholawaatuth thoyyibaatu lillah. Assalaamu 'alaika ayyuhan nabiyyu wa rahmatullahi wa barakaatuh. Assalaamu 'alainaa wa 'alaa 'ibaadillahish shaalihiin. Asyhadu an laa ilaaha illallah wa asyhadu anna Muhammadan rasuulullah",
          arti: "Segala penghormatan, keberkahan, shalawat dan kebaikan hanya bagi Allah. Semoga kesejahteraan tercurah kepadamu wahai Nabi, demikian pula rahmat Allah dan keberkahan-Nya. Semoga kesejahteraan tercurah kepada kami dan hamba-hamba Allah yang shalih. Aku bersaksi bahwa tidak ada tuhan selain Allah dan aku bersaksi bahwa Muhammad adalah utusan Allah"
        },
        penjelasan: "Dibaca pada rakaat ke-2 untuk sholat yang lebih dari 2 rakaat"
      },
      {
        no: 10,
        nama: "Duduk Tasyahud Akhir",
        bacaan: {
          tasyahud: "Sama dengan tasyahud awal",
          sholawat: {
            arabic: "اَللّٰهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ، كَمَا صَلَّيْتَ عَلَى إِبْرَاهِيْمَ وَعَلَى آلِ إِبْرَاهِيْمَ، إِنَّكَ حَمِيْدٌ مَجِيْدٌ. اَللّٰهُمَّ بَارِكْ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ، كَمَا بَارَكْتَ عَلَى إِبْرَاهِيْمَ وَعَلَى آلِ إِبْرَاهِيْمَ، إِنَّكَ حَمِيْدٌ مَجِيْدٌ",
            latin: "Allahumma sholli 'alaa Muhammad wa 'alaa aali Muhammad, kamaa shollaita 'alaa Ibraahiim wa 'alaa aali Ibraahiim, innaka hamiidun majiid. Allahumma baarik 'alaa Muhammad wa 'alaa aali Muhammad, kamaa baarokta 'alaa Ibraahiim wa 'alaa aali Ibraahiim, innaka hamiidun majiid",
            arti: "Ya Allah, limpahkanlah rahmat kepada Nabi Muhammad dan keluarganya, sebagaimana Engkau telah melimpahkan rahmat kepada Ibrahim dan keluarganya. Sesungguhnya Engkau Maha Terpuji lagi Maha Agung. Ya Allah, limpahkanlah berkah kepada Nabi Muhammad dan keluarganya, sebagaimana Engkau telah melimpahkan berkah kepada Ibrahim dan keluarganya. Sesungguhnya Engkau Maha Terpuji lagi Maha Agung"
          }
        },
        penjelasan: "Dibaca pada rakaat terakhir sebelum salam"
      },
      {
        no: 11,
        nama: "Salam",
        bacaan: {
          arabic: "اَلسَّلاَمُ عَلَيْكُمْ وَرَحْمَةُ اللهِ (kanan)\nاَلسَّلاَمُ عَلَيْكُمْ وَرَحْمَةُ اللهِ (kiri)",
          latin: "Assalaamu'alaikum warahmatullah (kanan)\nAssalaamu'alaikum warahmatullah (kiri)",
          arti: "Semoga kesejahteraan dan rahmat Allah tercurah kepada kalian"
        },
        penjelasan: "Menoleh ke kanan lalu ke kiri sambil mengucapkan salam"
      }
    ],
    doaSetelah: {
      title: "Doa Setelah Sholat",
      items: [
        {
          nama: "Istighfar (3x)",
          arabic: "أَسْتَغْفِرُ اللهَ الْعَظِيْمَ (3x)",
          latin: "Astaghfirullaahal 'azhiim (3x)",
          arti: "Aku memohon ampun kepada Allah Yang Maha Agung"
        },
        {
          nama: "Doa Penutup",
          arabic: "اَللّٰهُمَّ أَنْتَ السَّلاَمُ وَمِنْكَ السَّلاَمُ، تَبَارَكْتَ يَا ذَا الْجَلاَلِ وَاْلإِكْرَامِ",
          latin: "Allahumma antassalaam wa minkassalaam, tabaarokta yaa dzal jalaali wal ikroom",
          arti: "Ya Allah, Engkau adalah keselamatan, dan dari-Mu keselamatan. Maha Suci Engkau, wahai Dzat Yang Memiliki Keagungan dan Kemuliaan"
        },
        {
          nama: "Tasbih, Tahmid, Takbir",
          arabic: "سُبْحَانَ اللهِ (33x)\nاَلْحَمْدُ ِللهِ (33x)\nاَللهُ أَكْبَرُ (33x)",
          latin: "Subhanallah (33x)\nAlhamdulillah (33x)\nAllahu Akbar (33x)",
          arti: "Maha Suci Allah\nSegala puji bagi Allah\nAllah Maha Besar"
        },
        {
          nama: "Penutup (1x)",
          arabic: "لاَ إِلَهَ إِلاَّ اللهُ وَحْدَهُ لاَ شَرِيْكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيْرٌ",
          latin: "Laa ilaaha illallahu wahdahu laa syariikalah, lahul mulku walahul hamdu wahuwa 'alaa kulli syai-in qodiir",
          arti: "Tidak ada tuhan selain Allah Yang Maha Esa, tidak ada sekutu bagi-Nya. Bagi-Nya kerajaan dan bagi-Nya segala pujian. Dan Dia Maha Kuasa atas segala sesuatu"
        }
      ]
    }
  }
};

// Export ke global scope untuk browser
window.PanduanData = PanduanData;

// Export untuk Node.js (jika diperlukan)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = PanduanData;
}
