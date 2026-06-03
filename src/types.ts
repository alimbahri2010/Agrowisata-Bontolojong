export interface Destination {
  id: string;
  title: string;
  description: string;
  location: string;
  difficulty: "Easy" | "Medium" | "Challenging";
  imageUrl: string;
  category: "Hill" | "Waterfall" | "Campsite" | "Sunrise Area" | "Viewpoint" | "Photo Spot";
  elevation: string;
  featured: boolean;
}

export interface HikingTrail {
  id: string;
  name: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  distance: string; // e.g., "3.5 km"
  duration: string; // e.g., "2 hours"
  elevationGain: string; // e.g., "+320m"
  guideRequired: boolean;
  trailMapUrl: string; // or styled representation status
  status: "Open" | "Closed" | "Maintenance";
  weatherCondition: string;
  description: string;
}

export interface Booking {
  id: string;
  visitorName: string;
  email: string;
  phone: string;
  activityType: "Trail Hiking" | "Camping" | "Eco-Tour" | "Photography Session";
  bookingDate: string;
  trailName?: string;
  campSiteName?: string;
  guestsCount: number;
  totalAmount: number;
  paymentStatus: "Pending" | "Paid" | "Cancelled";
  bookingStatus: "Confirmed" | "Awaiting Approval" | "Cancelled" | "Completed";
  notes?: string;
}

export interface TrailEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  imageUrl: string;
  category: "Hiking" | "Camping" | "Community" | "Photography";
  price: number;
  capacity: number;
  registeredCount: number;
}

export interface GalleryMedia {
  id: string;
  title: string;
  category: "Nature" | "Sunrise" | "Hiking" | "Camping" | "Drone Shot";
  imageUrl: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatarUrl: string;
  rating: number;
  comment: string;
  date: string;
}

export interface StaffMember {
  id: string;
  name: string;
  role: string;
  phone: string;
  status: "Active" | "Off-Duty" | "On Trail";
  shiftSchedule: string; // e.g., "Monday - Friday, Sunrise Shift"
}

export interface WeatherInfo {
  temperature: number;
  condition: "Sunny" | "Cloudy" | "Light Rain" | "Mist" | "Thunderstorm";
  humidity: number;
  windSpeed: number;
  uvIndex: string;
  alert?: string;
}

export interface SystemSettings {
  logoName: string;
  tagline: string;
  contactEmail: string;
  contactWhatsapp: string;
  openingHours: string;
  baseHikingTicketPrice: number;
  baseCampingTicketPrice: number;
  logoImageUrl?: string;
  logoShape?: string;
  // Beranda / Hero settings
  heroEstText?: string;
  heroBackgroundUrl?: string;
  heroHeightMetric?: string;
  heroTrailsMetric?: string;
  heroConservationMetric?: string;
  // Tentang Kami / About settings
  aboutImageUrl?: string;
  aboutHistoryTitle?: string;
  aboutHistoryDesc1?: string;
  aboutHistoryDesc2?: string;
  aboutMissionText?: string;
  // SOP general hours info
  sopSimaksiHours?: string;
  sopMaxAscentHours?: string;
  sopCheckoutDesc?: string;
  // Admin credentials settings
  adminUsername?: string;
  adminPassword?: string;
}
