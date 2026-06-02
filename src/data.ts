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
  logoShape: "mountain"
};
