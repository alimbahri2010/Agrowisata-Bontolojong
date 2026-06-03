import { Destination, HikingTrail, Booking, TrailEvent, GalleryMedia, Testimonial, StaffMember, WeatherInfo, SystemSettings } from "./types";

export const initialDestinations: Destination[] = [
  {
    id: "dest-1",
    title: "Bukit Pinus Bontolojong",
    description: "Sudut pandang spektakuler yang dipenuhi oleh pohon pinus tinggi yang harum, kerap diselimuti kabut pagi indah yang menenangkan. Sangat cocok untuk fotografi pemandangan lanskap pegunungan.",
    location: "Lembah Punggungan Sappan",
    difficulty: "Easy",
    imageUrl: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80",
    category: "Hill",
    elevation: "1.220m dpl",
    featured: true
  },
  {
    id: "dest-2",
    title: "Gardu Pandang Sunrise Sappan Ridge",
    description: "Titik tertinggi yang mudah diakses di Bontolojong, terkenal dengan pemandangan lautan awan yang megah dan pancaran cahaya matahari terbit hangat menyinari seluruh pegunungan.",
    location: "Puncak Sisi Timur",
    difficulty: "Medium",
    imageUrl: "https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?auto=format&fit=crop&w=800&q=80",
    category: "Sunrise Area",
    elevation: "1.450m dpl",
    featured: true
  },
  {
    id: "dest-3",
    title: "Titik Pandang Batu Pelantikan",
    description: "Tebing batu bersejarah yang curam yang memberikan pemandangan vertikal ke arah hamparan kebun terasering pertanian serta ngarai hijau yang subur. Direkomendasikan untuk pendaki tingkat menengah.",
    location: "Ngarai Barat",
    difficulty: "Challenging",
    imageUrl: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80",
    category: "Viewpoint",
    elevation: "1.380m dpl",
    featured: false
  },
  {
    id: "dest-4",
    title: "Air Terjun Ngarai Cunang",
    description: "Permata tersembunyi di dasar lembah. Aliran air jernih dan sangat dingin meluncur deras dari dinding batu basalt setinggi 35 meter yang diselimuti lumut asri ke kolam renang alami berwarna zamrud.",
    location: "Sisi Selatan Jalur Air",
    difficulty: "Medium",
    imageUrl: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80",
    category: "Waterfall",
    elevation: "890m dpl",
    featured: true
  },
  {
    id: "dest-5",
    title: "Area Perkemahan Sunset Hammock",
    description: "Padang rumput sunyi berangin lambat yang dilengkapi dengan dek platform kayu, tempat api unggun aman, dan tata letak berjarak eksklusif. Sempurna untuk menikmati taburan bintang malam.",
    location: "Puncak Starry Meadows",
    difficulty: "Easy",
    imageUrl: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=800&q=80",
    category: "Campsite",
    elevation: "1.150m dpl",
    featured: false
  },
  {
    id: "dest-6",
    title: "Ayunan Pemandangan Kebun",
    description: "Ayunan pedesaan artistik yang kokoh, digantung pada dahan pohon mahoni besar, berayun bebas secara aman di atas perbukitan hijau terasering teh.",
    location: "Zona Agro Alpha",
    difficulty: "Easy",
    imageUrl: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=800&q=80",
    category: "Photo Spot",
    elevation: "1.050m dpl",
    featured: false
  }
];

export const initialHikingTrails: HikingTrail[] = [
  {
    id: "trail-1",
    name: "Pine Forest Walk",
    difficulty: "Beginner",
    distance: "2,4 km",
    duration: "1,5 Jam",
    elevationGain: "110 m",
    guideRequired: false,
    trailMapUrl: "M 10 90 Q 30 70 50 80 T 90 20",
    status: "Open",
    weatherCondition: "Cerah, Angin Sejuk",
    description: "Jalur santai menyusuri saluran air pertanian bersejarah dan berjalan di bawah keteduhan perkebunan pinus rindang. Sangat cocok untuk anak-anak, lansia, atau fotografer."
  },
  {
    id: "trail-2",
    name: "Sappan Ridge Sunrise Quest",
    difficulty: "Intermediate",
    distance: "4,8 km",
    duration: "3,0 Jam",
    elevationGain: "380 m",
    guideRequired: true,
    trailMapUrl: "M 10 90 C 30 80, 50 50, 70 60 S 80 30, 95 10",
    status: "Open",
    weatherCondition: "Kabut Pagi Tipis",
    description: "Pendakian bukit yang mantap dan menyuguhkan lanskap spektakuler. Meliputi jalur kerikil berkelok dan beberapa akar pohon. Waktu mulai disarankan pukul 04:00 pagi untuk mengejar sunrise luar biasa."
  },
  {
    id: "trail-3",
    name: "Batu Pelantikan Crest Trail",
    difficulty: "Advanced",
    distance: "7,2 km",
    duration: "5,5 Jam",
    elevationGain: "620 m",
    guideRequired: true,
    trailMapUrl: "M 10 95 C 10 60, 40 40, 50 60 S 80 10, 95 5",
    status: "Maintenance",
    weatherCondition: "Berkabut & Lembap",
    description: "Rute menyusuri punggungan puncak terjal dengan jurang vertikal tinggi di sisinya. Melibatkan tali bantu pada tanjakan tanah licin. Dihadiahi sudut pandang spektakuler menyembul di atas lautan awan aktif."
  }
];

export const initialEvents: TrailEvent[] = [
  {
    id: "event-1",
    title: "Kemah Pengamatan Hujan Meteor",
    description: "Acara berkemah semalam di bawah puncak keindahan Hujan Meteor Lyrid tahunan. Termasuk sesi bincang panduan teleskop, teh herbal hangat, dan iringan musik akustik api unggun malam.",
    date: "2026-06-15",
    time: "18:00 - 05:00 (+1 WITA)",
    imageUrl: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&q=80",
    category: "Camping",
    price: 15,
    capacity: 35,
    registeredCount: 28
  },
  {
    id: "event-2",
    title: "Masterclass Fotografi Golden Hour",
    description: "Bergabunglah bersama para fotografer lanskap hijau dalam pendakian ke Batu Pelantikan di waktu senja. Pelajari teknik pencahayaan, pembingkaian alam, dan strategi memotret gumpalan awan.",
    date: "2026-06-22",
    time: "15:30 - 18:30 WITA",
    imageUrl: "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&w=800&q=80",
    category: "Photography",
    price: 25,
    capacity: 15,
    registeredCount: 11
  },
  {
    id: "event-3",
    title: "Aksi Bersih Jalur Konservasi Hijau Bontolojong",
    description: "Pendakian kelompok komunitas sukarela yang didedikasikan untuk membersihkan sampah jalur hutan organik, menabur benih bunga liar, dan memperkuat tanggul tanah penahan longsor.",
    date: "2026-07-05",
    time: "08:00 - 13:00 WITA",
    imageUrl: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80",
    category: "Community",
    price: 0,
    capacity: 100,
    registeredCount: 47
  }
];

export const initialGallery: GalleryMedia[] = [
  {
    id: "gal-1",
    title: "Kabut tebal menyelimuti terasering teh fajar",
    category: "Nature",
    imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "gal-2",
    title: "Lautan awan putih di puncak Sappan Ridge",
    category: "Sunrise",
    imageUrl: "https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "gal-3",
    title: "Menanjak jalur berbatu terjal Batu Pelantikan",
    category: "Hiking",
    imageUrl: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "gal-4",
    title: "Langit kosmik bertabur bintang di atas area perkemahan",
    category: "Camping",
    imageUrl: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "gal-5",
    title: "Perspektif udara kawasan hijau Bukit Pinus",
    category: "Drone Shot",
    imageUrl: "https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "gal-6",
    title: "Aliran air murni berwarna zamrud di tebing Cunang",
    category: "Nature",
    imageUrl: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80"
  }
];

export const initialTestimonials: Testimonial[] = [
  {
    id: "test-1",
    name: "Ahmad Gunawan",
    role: "Pencinta Alam Pegunungan",
    avatarUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80",
    rating: 5,
    comment: "Bontolojong melebihi semua ekspektasi saya. Sensasi menyaksikan sunrise dari Sappan Ridge bagaikan berdiri di tepi pemandangan surga. Ekowisata berstandar internasional!",
    date: "2026-05-12"
  },
  {
    id: "test-2",
    name: "Jessica Lauren",
    role: "Blogger Perjalanan & Fotografer",
    avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
    rating: 5,
    comment: "Saya jatuh cinta dengan keasrian Bukit Pinus dan Air Terjun Cunang. Jalurnya terdokumentasi dengan rapi, ranger kehutanan sangat mengutamakan keselamatan, dan lokasi perkemahan sangat terjaga kebersihannya.",
    date: "2026-05-20"
  },
  {
    id: "test-3",
    name: "Rian Hidayat",
    role: "Pecinta Kemah Keluarga",
    avatarUrl: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=150&q=80",
    rating: 4,
    comment: "Jalan santai di Hutan Pinus sangat ramah bagi anak-anak saya, serta pemesanan platform dek kayu di Starry Meadows berjalan sangat cepat secara online. Administrasi lokal yang sangat rapi.",
    date: "2026-05-24"
  }
];

export const initialStaff: StaffMember[] = [
  {
    id: "staff-1",
    name: "Wawan 'Ranger' Riadi",
    role: "Pemandu Utama",
    phone: "+62 821-4455-9011",
    status: "On Trail",
    shiftSchedule: "Setiap Hari, 04:00 - 12:00 WITA (Koordinator Fajar)"
  },
  {
    id: "staff-2",
    name: "Siti Rahma",
    role: "Administrator",
    phone: "+62 821-4455-9012",
    status: "Active",
    shiftSchedule: "Senin - Jumat, 08:00 - 17:00 WITA"
  },
  {
    id: "staff-3",
    name: "Andi Saputra",
    role: "Ranger Kehutanan",
    phone: "+62 821-4455-9013",
    status: "Off-Duty",
    shiftSchedule: "Sabtu - Rabu, 18:00 - 03:00 WITA (Patroli Malam)"
  },
  {
    id: "staff-4",
    name: "Budi Santoso",
    role: "Pemandu Junior",
    phone: "+62 821-4455-9014",
    status: "Active",
    shiftSchedule: "Kamis - Selasa, 07:00 - 16:00 WITA (Penjaga Air Terjun)"
  }
];

export const initialBookings: Booking[] = [
  {
    id: "B-202611",
    visitorName: "Budi Hartono",
    email: "budi@example.com",
    phone: "081234567890",
    activityType: "Trail Hiking",
    bookingDate: "2026-05-30",
    trailName: "Sappan Ridge Sunrise Quest",
    guestsCount: 2,
    totalAmount: 30,
    paymentStatus: "Paid",
    bookingStatus: "Confirmed",
    notes: "Meminta bantuan pemandu & sewa tongkat hiking"
  },
  {
    id: "B-202612",
    visitorName: "Andi Wijaya",
    email: "andi@example.com",
    phone: "08119988221",
    activityType: "Camping",
    bookingDate: "2026-06-01",
    campSiteName: "Sunset Hammock Camping Area",
    guestsCount: 4,
    totalAmount: 45,
    paymentStatus: "Paid",
    bookingStatus: "Awaiting Approval",
    notes: "Membawa set baterai portabel untuk keperluan pemotretan astrologi malam."
  },
  {
    id: "B-202613",
    visitorName: "Dewi Lestari",
    email: "dewi.l@example.com",
    phone: "08552233441",
    activityType: "Eco-Tour",
    bookingDate: "2026-05-31",
    guestsCount: 1,
    totalAmount: 12,
    paymentStatus: "Pending",
    bookingStatus: "Awaiting Approval",
    notes: "Mengecek keindahan terasering bunga"
  },
  {
    id: "B-202614",
    visitorName: "Yusuf Kalla Jr.",
    email: "yusuf@example.com",
    phone: "0823459987",
    activityType: "Photography Session",
    bookingDate: "2026-06-04",
    guestsCount: 3,
    totalAmount: 35,
    paymentStatus: "Paid",
    bookingStatus: "Confirmed"
  },
  {
    id: "B-202615",
    visitorName: "Rani Handayani",
    email: "rani@example.com",
    phone: "08987654321",
    activityType: "Trail Hiking",
    bookingDate: "2026-05-25",
    trailName: "Pine Forest Walk",
    guestsCount: 5,
    totalAmount: 50,
    paymentStatus: "Paid",
    bookingStatus: "Completed"
  }
];

export const initialWeather: WeatherInfo = {
  temperature: 21,
  condition: "Cloudy",
  humidity: 78,
  windSpeed: 12,
  uvIndex: "Low",
  alert: "Terdapat kabut malam tipis di rute Sunrise, koordinasi pemandu sangat disarankan."
};

export const initialSystemSettings: SystemSettings = {
  logoName: "AGROWISATA BONTOLOJONG",
  tagline: "EXPLORE NATURE • FEEL THE ADVENTURE",
  contactEmail: "info@bontolojong-adventure.com",
  contactWhatsapp: "+62 821-4455-9011",
  openingHours: "Buka Setiap Hari 24 Jam (Area Camping), Pusat Pengunjung: 05:00 - 18:00 WITA",
  baseHikingTicketPrice: 10,
  baseCampingTicketPrice: 15,
  logoImageUrl: "",
  logoShape: "mountain",
  // Beranda Settings
  heroEstText: "EST. 2024 • SULAWESI SELATAN",
  heroBackgroundUrl: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1920&q=80",
  heroHeightMetric: "1.450m",
  heroTrailsMetric: "3+ Jalur",
  heroConservationMetric: "100%",
  // Tentang Kami Settings
  aboutImageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
  aboutHistoryTitle: "Kisah Agrowisata Bontolojong",
  aboutHistoryDesc1: "Terletak di punggungan bukit pertanian dataran tinggi Gowa, **Agrowisata Bontolojong** memadukan petualangan pegunungan yang asri dengan warisan budidaya hortikultura lokal. Inisiatif berbasis pemberdayaan masyarakat ini bertekad melindungi kelestarian hutan asli sekaligus menawarkan wisata ramah lingkungan.",
  aboutHistoryDesc2: "Ketika Anda menyusuri jalur pendakian atau berkemah di bawah konstelasi bintang, kunjungan Anda langsung mendukung mata pencaharian para ranger pelindung hutan, petani buah lokal, dan masyarakat setempat. Setiap jejak Anda adalah langkah pelestarian bumi.",
  aboutMissionText: "Misi Konservasi Alam: Menanam 10.000 bibit pohon mahoni dan teh di sepanjang punggungan bukit penyangga dalam tiga tahun ke depan, sembari mengedukasi kebijakan zero-waste bagi semua pendaki.",
  // SOP Info
  sopSimaksiHours: "07.00 - 17.30 WITA",
  sopMaxAscentHours: "15.00 WITA",
  sopCheckoutDesc: "Wajib Check-Out dan melapor kembali setelah turun dari gunung guna validasi sampah & pendata keselamatan.",
  // Default Credentials requested
  adminUsername: "admin",
  adminPassword: "bontolojong"
};

export const initialSopGears = [
  {
    id: "gear-1",
    name: "Tas Carrier/Daypack",
    desc: "Tas pendakian yang ergonomis untuk membawa logistik secara aman.",
    tag: "Wajib"
  },
  {
    id: "gear-2",
    name: "Jaket Pelindung Dingin",
    desc: "Melindungi tubuh dari suhu beku ekstrem dataran tinggi Bontolojong.",
    tag: "Wajib"
  },
  {
    id: "gear-3",
    name: "Sepatu Gunung",
    desc: "Sepatu dengan grip kuat di medan berbatu, licin, dan berlumpur.",
    tag: "Sangat Disarankan"
  },
  {
    id: "gear-4",
    name: "Jas Hujan",
    desc: "Sedia payung sebelum hujan; cuaca pegunungan dapat berubah sangat cepat.",
    tag: "Wajib"
  },
  {
    id: "gear-5",
    name: "Senter/Headlamp",
    desc: "Penerangan utama saat mendaki malam hari atau melakukan sunrise trek.",
    tag: "Wajib"
  },
  {
    id: "gear-6",
    name: "Air Minum & Logistik",
    desc: "Sediaan makanan berkalori tinggi & air yang cukup selama ekspedisi.",
    tag: "Cukup & Wajib"
  },
  {
    id: "gear-7",
    name: "Obat-obatan Pribadi",
    desc: "Peralatan medis pribadi untuk pertolongan pertama mandiri.",
    tag: "Pribadi"
  },
  {
    id: "gear-8",
    name: "Kantong Sampah",
    desc: "Wadah penampungan sampah bawaan pribadi untuk dibawa turun kembali.",
    tag: "MUTLAK WAJIB"
  },
  {
    id: "gear-9",
    name: "Flysheet / Shelter",
    desc: "Lembaran kanopi pendukung pelindung angin kencang dan rembesan air.",
    tag: "Sangat Dianjurkan"
  },
  {
    id: "gear-10",
    name: "Emergency Blanket",
    desc: "Selimut foil thermal penahan panas tubuh agar terhindar dari hipotermia.",
    tag: "Hipotermia Guard"
  }
];

export const initialSopGeneralRules = [
  {
    id: "rule-1",
    num: "01",
    title: "Wajib Registrasi Sebelum Pendakian",
    desc: "Setiap pendaki wajib mendaftarkan diri secara sah dan resmi melalui loket gerbang masuk atau sistem online Agrowisata Bontolojong."
  },
  {
    id: "rule-2",
    num: "02",
    title: "Mengisi Data Lengkap Pengunjung",
    desc: "Memberikan informasi identitas riil serta mencantumkan nomor kontak darurat keluarga terdekat yang dapat dihubungi sewaktu-waktu."
  },
  {
    id: "rule-3",
    num: "03",
    title: "Sehat Jasmani dan Rohani",
    desc: "Pendaki harus dalam kondisi prima, memiliki stamina yang memadai, dan tidak memiliki riwayat medis berat yang berbahaya di ketinggian."
  },
  {
    id: "rule-4",
    num: "04",
    title: "Minimal Rombongan 2 Orang",
    desc: "Sangat tidak disarankan melakukan pendakian solo (solo hiking) demi menjaga keselamatan dan saling memantau kondisi di lapangan."
  },
  {
    id: "rule-5",
    num: "05",
    title: "Wajib Mengikuti Safety Briefing",
    desc: "Mendengarkan arahan dari petugas pemandu wisata / ranger mengenai kondisi jalur terkini, cuaca, serta aturan konservasi alam."
  },
  {
    id: "rule-6",
    num: "06",
    title: "Wajib Check-In & Check-Out",
    desc: "Melakukan proses absensi masuk saat mendaki dan wajib melapor kembali saat sudah turun guna memantau jumlah pendaki aktif."
  }
];

export const initialSopWasteRules = [
  {
    id: "waste-1",
    title: "Membawa Turun Sampah Sendiri",
    desc: "Semua logistik makanan/minuman berkemah yang berpotensi menyisakan sampah wajib ditampung kembali ke dalam trash bag milik Anda.",
    action: "Wajib Bawa Turun"
  },
  {
    id: "waste-2",
    title: "Dilarang Meninggalkan Sampah di Jalur",
    desc: "Sama sekali tidak diperbolehkan membuang, mengubur, atau menyembunyikan sampah plastik di punggungan maupun di puncak gunung.",
    action: "Nol Toleransi Plastik"
  },
  {
    id: "waste-3",
    title: "Inspeksi Sampah Check-Out",
    desc: "Petugas pos loket bawah akan mencocokkan jumlah sampah bawaan Anda dengan estimasi daftar logistik Anda saat pendaftaran pertama.",
    action: "Pembersihan Terverifikasi"
  },
  {
    id: "waste-4",
    title: "Prinsip Utama Pendaki Lestari",
    desc: "Memegang teguh filosofi: 'Apa yang dibawa naik ke atas, harus dan wajib hukumnya untuk dibawa turun kembali ke bawah'.",
    action: "Golden Rule"
  }
];

export const initialSopEthicsRules = [
  {
    id: "ethics-1",
    title: "Dilarang Merusak Tanaman & Fasilitas",
    desc: "Dilarang mematahkan ranting, memetik bunga liar, melakukan corat-coret (vandalisme), atau merusak pos-pos peristirahatan umum.",
    iconName: "Ban"
  },
  {
    id: "ethics-2",
    title: "Dilarang Membuat Api Unggun Tanpa Izin",
    desc: "Api unggun liar berisiko memicu kebakaran kawasan hutan pinus kering. Wajib mematuhi anjuran pembuatan api ramah lingkungan.",
    iconName: "Flame"
  },
  {
    id: "ethics-3",
    title: "Dilarang Membawa Minuman Keras & Narkoba",
    desc: "Minuman beralkohol membahayakan keselamatan diri sendiri karena merusak kesadaran, serta mengganggu lingkungan sosial sesama pendaki.",
    iconName: "Ban"
  },
  {
    id: "ethics-4",
    title: "Wajib Menjaga Etika & Ketertiban",
    desc: "Menghormati kearifan lokal warga sekitar, berbicara sopan, tidak menyetel musik kencang (speaker bluetooth) yang merusak ketenangan hutan.",
    iconName: "HeartHandshake"
  },
  {
    id: "ethics-5",
    title: "Keselamatan di Atas Puncak",
    desc: "Ingatlah bahwa kepulangan Anda dengan selamat di rumah berkumpul bersama keluarga jauh lebih bernilai dari sekadar pencapaian puncak gunung.",
    iconName: "ShieldAlert"
  }
];

export const initialSopPenalties = [
  {
    id: "penalty-1",
    level: "Tingkat I",
    name: "Teguran Tertulis / Lisan",
    desc: "Diberikan kepada pendaki yang melakukan pelanggaran minor awal seputar kelalaian etika ringan.",
    color: "border-amber-200 bg-amber-50/50 text-amber-900"
  },
  {
    id: "penalty-2",
    level: "Tingkat II",
    name: "Larangan Melanjutkan Pendakian",
    desc: "Bagi rombongan yang membawa perlengkapan kurang kramah lingkungan atau terbukti melalaikan aspek keselamatan keselamatan dasar.",
    color: "border-orange-200 bg-orange-50/50 text-orange-900"
  },
  {
    id: "penalty-3",
    level: "Tingkat III",
    name: "Blacklist Sementara / Permanen",
    desc: "Berlaku keras untuk pendaki yang terbukti membuang sampah sembarangan di gunung, merusak fasilitas agrowisata secara sengaja.",
    color: "border-rose-200 bg-rose-50/50 text-rose-900"
  },
  {
    id: "penalty-4",
    level: "Tingkat IV",
    name: "Sanksi Kebijakan Pengelola & Hukum",
    desc: "Tindakan hukum formal atau denda administratif berat demi memulihkan kerusakan ekosistem agrowisata Bontolojong.",
    color: "border-red-300 bg-red-50/70 text-red-950 font-bold"
  }
];
