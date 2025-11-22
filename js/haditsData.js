// Database Hadits Shahih - 40+ Hadits dari Bukhari & Muslim
window.HADITS_DATA = [
  // Kategori: Iman
  {id: 1, category: "Iman", title: "Rukun Islam", arabic: "بُنِيَ الْإِسْلَامُ عَلَى خَمْسٍ: شَهَادَةِ أَنْ لَا إِلَهَ إِلَّا اللَّهُ وَأَنَّ مُحَمَّدًا رَسُولُ اللَّهِ، وَإِقَامِ الصَّلَاةِ، وَإِيتَاءِ الزَّكَاةِ، وَالْحَجِّ، وَصَوْمِ رَمَضَانَ", translation: "Islam dibangun atas lima perkara: bersaksi bahwa tidak ada tuhan selain Allah dan Muhammad adalah utusan Allah, mendirikan shalat, menunaikan zakat, haji, dan puasa Ramadhan.", riwayat: "HR. Bukhari & Muslim"},
  {id: 2, category: "Iman", title: "Rukun Iman", arabic: "أَنْ تُؤْمِنَ بِاللَّهِ وَمَلَائِكَتِهِ وَكُتُبِهِ وَرُسُلِهِ وَالْيَوْمِ الْآخِرِ وَتُؤْمِنَ بِالْقَدَرِ خَيْرِهِ وَشَرِّهِ", translation: "Iman adalah engkau beriman kepada Allah, malaikat-Nya, kitab-kitab-Nya, rasul-rasul-Nya, hari akhir, dan beriman kepada takdir baik dan buruknya.", riwayat: "HR. Muslim"},
  {id: 3, category: "Iman", title: "Iman Bertambah dan Berkurang", arabic: "الْإِيمَانُ بِضْعٌ وَسَبْعُونَ شُعْبَةً، فَأَفْضَلُهَا قَوْلُ لَا إِلَهَ إِلَّا اللَّهُ، وَأَدْنَاهَا إِمَاطَةُ الْأَذَى عَنْ الطَّرِيقِ", translation: "Iman itu ada tujuh puluh lebih cabang. Yang paling utama adalah ucapan La ilaha illallah, dan yang paling rendah adalah menyingkirkan gangguan dari jalan.", riwayat: "HR. Muslim"},
  
  // Kategori: Ibadah
  {id: 4, category: "Ibadah", title: "Keutamaan Shalat", arabic: "الصَّلَاةُ نُورٌ", translation: "Shalat adalah cahaya.", riwayat: "HR. Muslim"},
  {id: 5, category: "Ibadah", title: "Shalat Berjamaah", arabic: "صَلَاةُ الْجَمَاعَةِ تَفْضُلُ صَلَاةَ الْفَذِّ بِسَبْعٍ وَعِشْرِينَ دَرَجَةً", translation: "Shalat berjamaah lebih utama daripada shalat sendirian dengan dua puluh tujuh derajat.", riwayat: "HR. Bukhari & Muslim"},
  {id: 6, category: "Ibadah", title: "Puasa Ramadhan", arabic: "مَنْ صَامَ رَمَضَانَ إِيمَانًا وَاحْتِسَابًا غُفِرَ لَهُ مَا تَقَدَّمَ مِنْ ذَنْبِهِ", translation: "Barangsiapa berpuasa Ramadhan karena iman dan mengharap pahala, maka diampuni dosa-dosanya yang telah lalu.", riwayat: "HR. Bukhari & Muslim"},
  {id: 7, category: "Ibadah", title: "Keutamaan Zakat", arabic: "الصَّدَقَةُ تُطْفِئُ الْخَطِيئَةَ كَمَا يُطْفِئُ الْمَاءُ النَّارَ", translation: "Sedekah dapat menghapus dosa sebagaimana air memadamkan api.", riwayat: "HR. Tirmidzi"},
  {id: 8, category: "Ibadah", title: "Membaca Al-Qur'an", arabic: "خَيْرُكُمْ مَنْ تَعَلَّمَ الْقُرْآنَ وَعَلَّمَهُ", translation: "Sebaik-baik kalian adalah yang mempelajari Al-Qur'an dan mengajarkannya.", riwayat: "HR. Bukhari"},
  {id: 9, category: "Ibadah", title: "Dzikir Pagi Petang", arabic: "مَنْ قَالَ: سُبْحَانَ اللَّهِ وَبِحَمْدِهِ، فِي يَوْمٍ مِائَةَ مَرَّةٍ، حُطَّتْ خَطَايَاهُ وَإِنْ كَانَتْ مِثْلَ زَبَدِ الْبَحْرِ", translation: "Barangsiapa mengucapkan Subhanallah wa bihamdihi seratus kali dalam sehari, maka dihapuslah kesalahannya walaupun sebanyak buih di lautan.", riwayat: "HR. Bukhari & Muslim"},
  
  // Kategori: Akhlak
  {id: 10, category: "Akhlak", title: "Akhlak Mulia", arabic: "إِنَّمَا بُعِثْتُ لِأُتَمِّمَ مَكَارِمَ الْأَخْلَاقِ", translation: "Sesungguhnya aku diutus untuk menyempurnakan akhlak yang mulia.", riwayat: "HR. Ahmad"},
  {id: 11, category: "Akhlak", title: "Senyum adalah Sedekah", arabic: "تَبَسُّمُكَ فِي وَجْهِ أَخِيكَ صَدَقَةٌ", translation: "Senyummu di hadapan saudaramu adalah sedekah.", riwayat: "HR. Tirmidzi"},
  {id: 12, category: "Akhlak", title: "Jangan Marah", arabic: "لَا تَغْضَبْ", translation: "Jangan marah.", riwayat: "HR. Bukhari"},
  {id: 13, category: "Akhlak", title: "Berbuat Baik", arabic: "الْمُؤْمِنُ الَّذِي يُخَالِطُ النَّاسَ وَيَصْبِرُ عَلَى أَذَاهُمْ خَيْرٌ مِنْ الَّذِي لَا يُخَالِطُ النَّاسَ وَلَا يَصْبِرُ عَلَى أَذَاهُمْ", translation: "Mukmin yang bergaul dengan manusia dan bersabar atas gangguan mereka lebih baik daripada yang tidak bergaul dan tidak sabar.", riwayat: "HR. Tirmidzi"},
  {id: 14, category: "Akhlak", title: "Menjaga Lisan", arabic: "مَنْ كَانَ يُؤْمِنُ بِاللَّهِ وَالْيَوْمِ الْآخِرِ فَلْيَقُلْ خَيْرًا أَوْ لِيَصْمُتْ", translation: "Barangsiapa beriman kepada Allah dan hari akhir, hendaklah ia berkata baik atau diam.", riwayat: "HR. Bukhari & Muslim"},
  
  // Kategori: Muamalah
  {id: 15, category: "Muamalah", title: "Jual Beli yang Jujur", arabic: "التَّاجِرُ الصَّدُوقُ الْأَمِينُ مَعَ النَّبِيِّينَ وَالصِّدِّيقِينَ وَالشُّهَدَاءِ", translation: "Pedagang yang jujur dan amanah bersama para nabi, shiddiqin, dan syuhada.", riwayat: "HR. Tirmidzi"},
  {id: 16, category: "Muamalah", title: "Larangan Riba", arabic: "الرِّبَا سَبْعُونَ حُوبًا، أَيْسَرُهَا أَنْ يَنْكِحَ الرَّجُلُ أُمَّهُ", translation: "Riba itu ada tujuh puluh macam dosa, yang paling ringan seperti seseorang menikahi ibunya sendiri.", riwayat: "HR. Ibnu Majah"},
  {id: 17, category: "Muamalah", title: "Membayar Hutang", arabic: "مَطْلُ الْغَنِيِّ ظُلْمٌ", translation: "Menunda pembayaran hutang bagi orang yang mampu adalah kezaliman.", riwayat: "HR. Bukhari & Muslim"},
  {id: 18, category: "Muamalah", title: "Bekerja dengan Tangan", arabic: "مَا أَكَلَ أَحَدٌ طَعَامًا قَطُّ خَيْرًا مِنْ أَنْ يَأْكُلَ مِنْ عَمَلِ يَدِهِ", translation: "Tidaklah seseorang memakan makanan yang lebih baik daripada hasil usaha tangannya sendiri.", riwayat: "HR. Bukhari"},
  
  // Kategori: Keluarga
  {id: 19, category: "Keluarga", title: "Berbakti kepada Orang Tua", arabic: "رِضَا اللَّهِ فِي رِضَا الْوَالِدِ، وَسَخَطُ اللَّهِ فِي سَخَطِ الْوَالِدِ", translation: "Ridha Allah tergantung pada ridha orang tua, dan murka Allah tergantung pada murka orang tua.", riwayat: "HR. Tirmidzi"},
  {id: 20, category: "Keluarga", title: "Kasih Sayang kepada Anak", arabic: "لَيْسَ مِنَّا مَنْ لَمْ يَرْحَمْ صَغِيرَنَا وَيُوَقِّرْ كَبِيرَنَا", translation: "Bukan termasuk golongan kami orang yang tidak menyayangi yang muda dan tidak menghormati yang tua.", riwayat: "HR. Tirmidzi"},
  {id: 21, category: "Keluarga", title: "Sebaik-baik Suami", arabic: "خَيْرُكُمْ خَيْرُكُمْ لِأَهْلِهِ، وَأَنَا خَيْرُكُمْ لِأَهْلِي", translation: "Sebaik-baik kalian adalah yang paling baik kepada keluarganya, dan aku adalah yang paling baik kepada keluargaku.", riwayat: "HR. Tirmidzi"},
  {id: 22, category: "Keluarga", title: "Silaturahmi", arabic: "مَنْ سَرَّهُ أَنْ يُبْسَطَ لَهُ فِي رِزْقِهِ، وَأَنْ يُنْسَأَ لَهُ فِي أَثَرِهِ، فَلْيَصِلْ رَحِمَهُ", translation: "Barangsiapa ingin dilapangkan rezekinya dan dipanjangkan umurnya, hendaklah ia menyambung silaturahmi.", riwayat: "HR. Bukhari & Muslim"},
  
  // Kategori: Ilmu
  {id: 23, category: "Ilmu", title: "Menuntut Ilmu", arabic: "طَلَبُ الْعِلْمِ فَرِيضَةٌ عَلَى كُلِّ مُسْلِمٍ", translation: "Menuntut ilmu adalah kewajiban bagi setiap muslim.", riwayat: "HR. Ibnu Majah"},
  {id: 24, category: "Ilmu", title: "Keutamaan Mengajar", arabic: "إِذَا مَاتَ الْإِنْسَانُ انْقَطَعَ عَمَلُهُ إِلَّا مِنْ ثَلَاثٍ: صَدَقَةٍ جَارِيَةٍ، أَوْ عِلْمٍ يُنْتَفَعُ بِهِ، أَوْ وَلَدٍ صَالِحٍ يَدْعُو لَهُ", translation: "Jika manusia meninggal, terputuslah amalnya kecuali tiga: sedekah jariyah, ilmu yang bermanfaat, atau anak saleh yang mendoakan.", riwayat: "HR. Muslim"},
  {id: 25, category: "Ilmu", title: "Jalan Menuju Surga", arabic: "مَنْ سَلَكَ طَرِيقًا يَلْتَمِسُ فِيهِ عِلْمًا سَهَّلَ اللَّهُ لَهُ طَرِيقًا إِلَى الْجَنَّةِ", translation: "Barangsiapa menempuh jalan untuk mencari ilmu, Allah akan memudahkan baginya jalan menuju surga.", riwayat: "HR. Muslim"},
  
  // Kategori: Rezeki
  {id: 26, category: "Rezeki", title: "Tawakal kepada Allah", arabic: "لَوْ أَنَّكُمْ تَوَكَّلْتُمْ عَلَى اللَّهِ حَقَّ تَوَكُّلِهِ لَرَزَقَكُمْ كَمَا يَرْزُقُ الطَّيْرَ", translation: "Seandainya kalian bertawakal kepada Allah dengan sebenar-benarnya, niscaya Allah akan memberi rezeki sebagaimana Dia memberi rezeki kepada burung.", riwayat: "HR. Tirmidzi"},
  {id: 27, category: "Rezeki", title: "Sedekah Tidak Mengurangi Harta", arabic: "مَا نَقَصَتْ صَدَقَةٌ مِنْ مَالٍ", translation: "Sedekah tidak akan mengurangi harta.", riwayat: "HR. Muslim"},
  {id: 28, category: "Rezeki", title: "Istighfar Membuka Pintu Rezeki", arabic: "مَنْ لَزِمَ الِاسْتِغْفَارَ جَعَلَ اللَّهُ لَهُ مِنْ كُلِّ ضِيقٍ مَخْرَجًا، وَمِنْ كُلِّ هَمٍّ فَرَجًا، وَرَزَقَهُ مِنْ حَيْثُ لَا يَحْتَسِبُ", translation: "Barangsiapa yang istiqomah beristighfar, Allah akan memberikan jalan keluar dari setiap kesempitan, kelapangan dari setiap kesusahan, dan rezeki dari arah yang tidak disangka.", riwayat: "HR. Abu Dawud"},
  
  // Kategori: Kesabaran
  {id: 29, category: "Kesabaran", title: "Ujian bagi Mukmin", arabic: "عَجَبًا لِأَمْرِ الْمُؤْمِنِ، إِنَّ أَمْرَهُ كُلَّهُ خَيْرٌ، وَلَيْسَ ذَاكَ لِأَحَدٍ إِلَّا لِلْمُؤْمِنِ", translation: "Sungguh menakjubkan urusan seorang mukmin, semua urusannya adalah baik. Dan itu tidak ada kecuali bagi mukmin.", riwayat: "HR. Muslim"},
  {id: 30, category: "Kesabaran", title: "Sabar adalah Cahaya", arabic: "الصَّبْرُ ضِيَاءٌ", translation: "Kesabaran adalah cahaya.", riwayat: "HR. Muslim"},
  
  // Kategori: Taubat
  {id: 31, category: "Taubat", title: "Allah Menerima Taubat", arabic: "إِنَّ اللَّهَ يَقْبَلُ تَوْبَةَ الْعَبْدِ مَا لَمْ يُغَرْغِرْ", translation: "Sesungguhnya Allah menerima taubat hamba selama belum sampai di tenggorokan (ajal).", riwayat: "HR. Tirmidzi"},
  {id: 32, category: "Taubat", title: "Bertaubat Sebelum Terlambat", arabic: "كُلُّ ابْنِ آدَمَ خَطَّاءٌ، وَخَيْرُ الْخَطَّائِينَ التَّوَّابُونَ", translation: "Setiap anak Adam pasti berbuat salah, dan sebaik-baik orang yang bersalah adalah yang bertaubat.", riwayat: "HR. Tirmidzi"},
  
  // Kategori: Kematian
  {id: 33, category: "Kematian", title: "Mengingat Mati", arabic: "أَكْثِرُوا ذِكْرَ هَاذِمِ اللَّذَّاتِ", translation: "Perbanyaklah mengingat pemutus kelezatan (kematian).", riwayat: "HR. Tirmidzi"},
  {id: 34, category: "Kematian", title: "Amal Setelah Mati", arabic: "إِذَا مَاتَ الْإِنْسَانُ انْقَطَعَ عَمَلُهُ إِلَّا مِنْ ثَلَاثٍ", translation: "Jika manusia meninggal, terputuslah amalnya kecuali dari tiga perkara.", riwayat: "HR. Muslim"},
  
  // Kategori: Surga & Neraka
  {id: 35, category: "Surga", title: "Jalan Menuju Surga", arabic: "الْجَنَّةُ تَحْتَ ظِلَالِ السُّيُوفِ", translation: "Surga berada di bawah naungan pedang (jihad).", riwayat: "HR. Bukhari"},
  {id: 36, category: "Surga", title: "Penghuni Surga", arabic: "لَا يَدْخُلُ الْجَنَّةَ مَنْ كَانَ فِي قَلْبِهِ مِثْقَالُ ذَرَّةٍ مِنْ كِبْرٍ", translation: "Tidak akan masuk surga orang yang di hatinya terdapat kesombongan seberat biji sawi.", riwayat: "HR. Muslim"},
  
  // Kategori: Doa
  {id: 37, category: "Doa", title: "Doa adalah Ibadah", arabic: "الدُّعَاءُ هُوَ الْعِبَادَةُ", translation: "Doa adalah ibadah.", riwayat: "HR. Tirmidzi"},
  {id: 38, category: "Doa", title: "Waktu Mustajab", arabic: "أَقْرَبُ مَا يَكُونُ الْعَبْدُ مِنْ رَبِّهِ وَهُوَ سَاجِدٌ، فَأَكْثِرُوا الدُّعَاءَ", translation: "Saat paling dekat seorang hamba dengan Tuhannya adalah ketika sujud, maka perbanyaklah doa.", riwayat: "HR. Muslim"},
  
  // Kategori: Umum
  {id: 39, category: "Umum", title: "Niat dalam Beramal", arabic: "إِنَّمَا الْأَعْمَالُ بِالنِّيَّاتِ", translation: "Sesungguhnya setiap amalan tergantung niatnya.", riwayat: "HR. Bukhari & Muslim"},
  {id: 40, category: "Umum", title: "Meninggalkan yang Meragukan", arabic: "دَعْ مَا يَرِيبُكَ إِلَى مَا لَا يَرِيبُكَ", translation: "Tinggalkan apa yang meragukanmu kepada apa yang tidak meragukanmu.", riwayat: "HR. Tirmidzi"},
  {id: 41, category: "Umum", title: "Menjaga Amanah", arabic: "لَا إِيمَانَ لِمَنْ لَا أَمَانَةَ لَهُ", translation: "Tidak ada iman bagi orang yang tidak memiliki amanah.", riwayat: "HR. Ahmad"},
  {id: 42, category: "Umum", title: "Cinta Tanah Air", arabic: "حُبُّ الْوَطَنِ مِنَ الْإِيمَانِ", translation: "Cinta tanah air adalah bagian dari iman.", riwayat: "Hadits Populer"}
];
