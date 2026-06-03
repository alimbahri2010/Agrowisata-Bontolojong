import { createClient } from "@supabase/supabase-js";
import { Destination, HikingTrail, Booking, TrailEvent, GalleryMedia, Testimonial, StaffMember, SystemSettings } from "../types";

// Get keys from import.meta.env or from localStorage (allows dynamically testing keys in the UI without rebuilds!)
export const getSupabaseConfig = () => {
  const envUrl = (import.meta as any).env?.VITE_SUPABASE_URL || "";
  const envKey = (import.meta as any).env?.VITE_SUPABASE_ANON_KEY || "";
  
  const savedUrl = localStorage.getItem("bontolojong_supabase_url") || "";
  const savedKey = localStorage.getItem("bontolojong_supabase_key") || "";

  return {
    url: savedUrl || envUrl,
    key: savedKey || envKey,
    isConfigured: !!(savedUrl || envUrl) && !!(savedKey || envKey),
    source: savedUrl ? "Konfigurasi UI Admin" : envUrl ? "Environment Variables (.env)" : "Belum Dikonfigurasi"
  };
};

export const initSupabaseClient = () => {
  const { url, key } = getSupabaseConfig();
  if (!url || !key) return null;
  try {
    return createClient(url, key, {
      auth: {
        persistSession: true,
        autoRefreshToken: true
      }
    });
  } catch (error) {
    console.error("Gagal inisialisasi Supabase client:", error);
    return null;
  }
};

// SQL Schema for users to run in their Supabase console
export const SUPABASE_SQL_SCHEMA = `-- ==========================================
-- SCRIPT SCHEMA SQL AGROWISATA BONTOLOJONG
-- Jalankan kode ini di SQL Editor Supabase Anda!
-- ==========================================

-- 1. Tabel System Settings
CREATE TABLE IF NOT EXISTS settings (
  id VARCHAR PRIMARY KEY DEFAULT 'global_settings',
  data JSONB NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Tabel Destinations
CREATE TABLE IF NOT EXISTS destinations (
  id VARCHAR PRIMARY KEY,
  title VARCHAR NOT NULL,
  description TEXT,
  location VARCHAR,
  difficulty VARCHAR,
  image_url TEXT,
  category VARCHAR,
  elevation VARCHAR,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Tabel Hiking Trails
CREATE TABLE IF NOT EXISTS hiking_trails (
  id VARCHAR PRIMARY KEY,
  name VARCHAR NOT NULL,
  difficulty VARCHAR,
  distance VARCHAR,
  duration VARCHAR,
  elevation_gain VARCHAR,
  guide_required BOOLEAN DEFAULT false,
  trail_map_url TEXT,
  status VARCHAR,
  weather_condition VARCHAR,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Tabel Bookings
CREATE TABLE IF NOT EXISTS bookings (
  id VARCHAR PRIMARY KEY,
  visitor_name VARCHAR NOT NULL,
  email VARCHAR NOT NULL,
  phone VARCHAR,
  activity_type VARCHAR,
  booking_date VARCHAR,
  trail_name VARCHAR,
  camp_site_name VARCHAR,
  guests_count INTEGER DEFAULT 1,
  total_amount NUMERIC DEFAULT 0,
  payment_status VARCHAR,
  booking_status VARCHAR,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. Tabel Trail Events
CREATE TABLE IF NOT EXISTS trail_events (
  id VARCHAR PRIMARY KEY,
  title VARCHAR NOT NULL,
  description TEXT,
  date VARCHAR,
  time VARCHAR,
  image_url TEXT,
  category VARCHAR,
  price NUMERIC DEFAULT 0,
  capacity INTEGER,
  registered_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. Tabel Gallery Media
CREATE TABLE IF NOT EXISTS gallery_media (
  id VARCHAR PRIMARY KEY,
  title VARCHAR,
  category VARCHAR,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 7. Tabel Testimonials
CREATE TABLE IF NOT EXISTS testimonials (
  id VARCHAR PRIMARY KEY,
  name VARCHAR NOT NULL,
  role VARCHAR,
  avatar_url TEXT,
  rating INTEGER,
  comment TEXT,
  date VARCHAR,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 8. Tabel Staff Members
CREATE TABLE IF NOT EXISTS staff_members (
  id VARCHAR PRIMARY KEY,
  name VARCHAR NOT NULL,
  role VARCHAR,
  phone VARCHAR,
  status VARCHAR,
  shift_schedule VARCHAR,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ==========================================
-- Masukkan data awal default jika tabel kosong
-- (Data akan otomatis disinkronkan saat pertama kali terhubung)
-- ==========================================
`;

// Helper types to map interface keys to postgres snake_case columns
export const mapDestinationToDB = (d: Destination) => ({
  id: d.id,
  title: d.title,
  description: d.description,
  location: d.location,
  difficulty: d.difficulty,
  image_url: d.imageUrl,
  category: d.category,
  elevation: d.elevation,
  featured: d.featured
});

export const mapDestinationFromDB = (row: any): Destination => ({
  id: row.id,
  title: row.title,
  description: row.description || "",
  location: row.location || "",
  difficulty: row.difficulty as Destination["difficulty"],
  imageUrl: row.image_url || "",
  category: row.category as Destination["category"],
  elevation: row.elevation || "",
  featured: !!row.featured
});

export const mapTrailToDB = (t: HikingTrail) => ({
  id: t.id,
  name: t.name,
  difficulty: t.difficulty,
  distance: t.distance,
  duration: t.duration,
  elevation_gain: t.elevationGain,
  guide_required: t.guideRequired,
  trail_map_url: t.trailMapUrl,
  status: t.status,
  weather_condition: t.weatherCondition,
  description: t.description
});

export const mapTrailFromDB = (row: any): HikingTrail => ({
  id: row.id,
  name: row.name,
  difficulty: row.difficulty as HikingTrail["difficulty"],
  distance: row.distance || "",
  duration: row.duration || "",
  elevationGain: row.elevation_gain || "",
  guideRequired: !!row.guide_required,
  trailMapUrl: row.trail_map_url || "",
  status: row.status as HikingTrail["status"],
  weatherCondition: row.weather_condition || "",
  description: row.description || ""
});

export const mapBookingToDB = (b: Booking) => ({
  id: b.id,
  visitor_name: b.visitorName,
  email: b.email,
  phone: b.phone,
  activity_type: b.activityType,
  booking_date: b.bookingDate,
  trail_name: b.trailName,
  camp_site_name: b.campSiteName,
  guests_count: b.guestsCount,
  total_amount: b.totalAmount,
  payment_status: b.paymentStatus,
  booking_status: b.bookingStatus,
  notes: b.notes
});

export const mapBookingFromDB = (row: any): Booking => ({
  id: row.id,
  visitorName: row.visitor_name,
  email: row.email,
  phone: row.phone || "",
  activityType: row.activity_type as Booking["activityType"],
  bookingDate: row.booking_date || "",
  trailName: row.trail_name,
  campSiteName: row.camp_site_name,
  guestsCount: Number(row.guests_count || 1),
  totalAmount: Number(row.total_amount || 0),
  paymentStatus: row.payment_status as Booking["paymentStatus"],
  bookingStatus: row.booking_status as Booking["bookingStatus"],
  notes: row.notes || ""
});

export const mapEventToDB = (e: TrailEvent) => ({
  id: e.id,
  title: e.title,
  description: e.description,
  date: e.date,
  time: e.time,
  image_url: e.imageUrl,
  category: e.category,
  price: e.price,
  capacity: e.capacity,
  registered_count: e.registeredCount
});

export const mapEventFromDB = (row: any): TrailEvent => ({
  id: row.id,
  title: row.title,
  description: row.description || "",
  date: row.date || "",
  time: row.time || "",
  imageUrl: row.image_url || "",
  category: row.category as TrailEvent["category"],
  price: Number(row.price || 0),
  capacity: Number(row.capacity || 0),
  registeredCount: Number(row.registered_count || 0)
});

export const mapGalleryToDB = (g: GalleryMedia) => ({
  id: g.id,
  title: g.title,
  category: g.category,
  image_url: g.imageUrl
});

export const mapGalleryFromDB = (row: any): GalleryMedia => ({
  id: row.id,
  title: row.title || "",
  category: row.category as GalleryMedia["category"],
  imageUrl: row.image_url || ""
});

export const mapTestimonialToDB = (t: Testimonial) => ({
  id: t.id,
  name: t.name,
  role: t.role,
  avatar_url: t.avatarUrl,
  rating: t.rating,
  comment: t.comment,
  date: t.date
});

export const mapTestimonialFromDB = (row: any): Testimonial => ({
  id: row.id,
  name: row.name,
  role: row.role || "Pengunjung",
  avatarUrl: row.avatar_url || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80",
  rating: Number(row.rating || 5),
  comment: row.comment || "",
  date: row.date || ""
});

export const mapStaffToDB = (s: StaffMember) => ({
  id: s.id,
  name: s.name,
  role: s.role,
  phone: s.phone,
  status: s.status,
  shift_schedule: s.shiftSchedule
});

export const mapStaffFromDB = (row: any): StaffMember => ({
  id: row.id,
  name: row.name,
  role: row.role || "Junior Guide",
  phone: row.phone || "",
  status: row.status as StaffMember["status"],
  shiftSchedule: row.shift_schedule || ""
});

// Sync Operations Class
export class SupabaseManager {
  private client = initSupabaseClient();

  constructor() {
    this.client = initSupabaseClient();
  }

  reinit() {
    this.client = initSupabaseClient();
    return !!this.client;
  }

  isConnected() {
    return !!this.client;
  }

  // Upload an image file (or base64 string) to Supabase Storage Bucket, fallback returns standard URL or base64 itself
  async uploadImage(fileOrBase64: string | File, bucketName: string = "bontolojong-assets"): Promise<string> {
    if (!this.client) throw new Error("Supabase tidak aktif.");
    
    // If it's a base64 string, we try to upload to Supabase or return it if bucket/auth fails
    if (typeof fileOrBase64 === "string") {
      if (!fileOrBase64.startsWith("data:")) return fileOrBase64; // It is already a remote URL
      
      try {
        // Base64 format: data:image/png;base64,iVBORw0KGgoAAAANS...
        const mimeType = fileOrBase64.split(";")[0].split(":")[1];
        const base64Data = fileOrBase64.split(",")[1];
        const binaryData = atob(base64Data);
        const array = [];
        for (let i = 0; i < binaryData.length; i++) {
          array.push(binaryData.charCodeAt(i));
        }
        const fileContent = new Uint8Array(array);
        const fileName = `upload_${Date.now()}.${mimeType.split("/")[1] || "png"}`;

        const { data, error } = await this.client.storage
          .from(bucketName)
          .upload(fileName, fileContent.buffer, {
            contentType: mimeType,
            upsert: true
          });

        if (error) {
          console.warn("Storage upload error (mungkin Bucket belum di-create):", error.message);
          return fileOrBase64; // Fallback to base64 string directly
        }

        const { data: urlData } = this.client.storage.from(bucketName).getPublicUrl(fileName);
        return urlData.publicUrl || fileOrBase64;
      } catch (err) {
        console.warn("Gagal upload base64 ke Storage, gunakan base64 inline:", err);
        return fileOrBase64;
      }
    }

    // Handing File directly (from browser dropzone)
    try {
      const ext = fileOrBase64.name.split(".").pop();
      const fileName = `${Date.now()}_bg.${ext}`;
      const { data, error } = await this.client.storage
        .from(bucketName)
        .upload(fileName, fileOrBase64, {
          upsert: true
        });

      if (error) throw error;
      const { data: urlData } = this.client.storage.from(bucketName).getPublicUrl(fileName);
      return urlData.publicUrl;
    } catch (e: any) {
      console.warn("Gagal upload File ke Supabase Storage, fallback ke Local File Reader:", e);
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (ev) => resolve(ev.target?.result as string);
        reader.readAsDataURL(fileOrBase64);
      });
    }
  }

  // --- SYSTEM SETTINGS ---
  async loadSettings(): Promise<SystemSettings | null> {
    if (!this.client) return null;
    try {
      const { data, error } = await this.client
        .from("settings")
        .select("data")
        .eq("id", "global_settings")
        .single();
      
      if (error) {
        if (error.code === "PGRST116") return null; // No rows found
        throw error;
      }
      return data.data as SystemSettings;
    } catch (e) {
      console.error("Gagal memuat pengaturan dari Supabase:", e);
      throw e;
    }
  }

  async saveSettings(settings: SystemSettings): Promise<void> {
    if (!this.client) return;
    try {
      const { error } = await this.client
        .from("settings")
        .upsert({ id: "global_settings", data: settings }, { onConflict: "id" });
      if (error) throw error;
    } catch (e) {
      console.error("Gagal menyimpan pengaturan ke Supabase:", e);
      throw e;
    }
  }

  // --- DESTINATIONS ---
  async loadDestinations(): Promise<Destination[]> {
    if (!this.client) return [];
    const { data, error } = await this.client
      .from("destinations")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw error;
    return (data || []).map(mapDestinationFromDB);
  }

  async upsertDestination(dest: Destination): Promise<void> {
    if (!this.client) return;
    const { error } = await this.client
      .from("destinations")
      .upsert(mapDestinationToDB(dest));
    if (error) throw error;
  }

  async deleteDestination(id: string): Promise<void> {
    if (!this.client) return;
    const { error } = await this.client.from("destinations").delete().eq("id", id);
    if (error) throw error;
  }

  // --- HIKING TRAILS ---
  async loadTrails(): Promise<HikingTrail[]> {
    if (!this.client) return [];
    const { data, error } = await this.client
      .from("hiking_trails")
      .select("*")
      .order("created_at", { ascending: true });
    if (error) throw error;
    return (data || []).map(mapTrailFromDB);
  }

  async upsertTrail(trail: HikingTrail): Promise<void> {
    if (!this.client) return;
    const { error } = await this.client
      .from("hiking_trails")
      .upsert(mapTrailToDB(trail));
    if (error) throw error;
  }

  async deleteTrail(id: string): Promise<void> {
    if (!this.client) return;
    const { error } = await this.client.from("hiking_trails").delete().eq("id", id);
    if (error) throw error;
  }

  // --- BOOKINGS ---
  async loadBookings(): Promise<Booking[]> {
    if (!this.client) return [];
    const { data, error } = await this.client
      .from("bookings")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw error;
    return (data || []).map(mapBookingFromDB);
  }

  async upsertBooking(booking: Booking): Promise<void> {
    if (!this.client) return;
    const { error } = await this.client
      .from("bookings")
      .upsert(mapBookingToDB(booking));
    if (error) throw error;
  }

  async deleteBooking(id: string): Promise<void> {
    if (!this.client) return;
    const { error } = await this.client.from("bookings").delete().eq("id", id);
    if (error) throw error;
  }

  // --- TRAIL EVENTS ---
  async loadEvents(): Promise<TrailEvent[]> {
    if (!this.client) return [];
    const { data, error } = await this.client
      .from("trail_events")
      .select("*")
      .order("created_at", { ascending: true });
    if (error) throw error;
    return (data || []).map(mapEventFromDB);
  }

  async upsertEvent(event: TrailEvent): Promise<void> {
    if (!this.client) return;
    const { error } = await this.client
      .from("trail_events")
      .upsert(mapEventToDB(event));
    if (error) throw error;
  }

  async deleteEvent(id: string): Promise<void> {
    if (!this.client) return;
    const { error } = await this.client.from("trail_events").delete().eq("id", id);
    if (error) throw error;
  }

  // --- GALLERY MEDIA ---
  async loadGallery(): Promise<GalleryMedia[]> {
    if (!this.client) return [];
    const { data, error } = await this.client
      .from("gallery_media")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw error;
    return (data || []).map(mapGalleryFromDB);
  }

  async upsertGallery(media: GalleryMedia): Promise<void> {
    if (!this.client) return;
    const { error } = await this.client
      .from("gallery_media")
      .upsert(mapGalleryToDB(media));
    if (error) throw error;
  }

  async deleteGallery(id: string): Promise<void> {
    if (!this.client) return;
    const { error } = await this.client.from("gallery_media").delete().eq("id", id);
    if (error) throw error;
  }

  // --- TESTIMONIALS ---
  async loadTestimonials(): Promise<Testimonial[]> {
    if (!this.client) return [];
    const { data, error } = await this.client
      .from("testimonials")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw error;
    return (data || []).map(mapTestimonialFromDB);
  }

  async upsertTestimonial(testi: Testimonial): Promise<void> {
    if (!this.client) return;
    const { error } = await this.client
      .from("testimonials")
      .upsert(mapTestimonialToDB(testi));
    if (error) throw error;
  }

  async deleteTestimonial(id: string): Promise<void> {
    if (!this.client) return;
    const { error } = await this.client.from("testimonials").delete().eq("id", id);
    if (error) throw error;
  }

  // --- STAFF MEMBERS ---
  async loadStaff(): Promise<StaffMember[]> {
    if (!this.client) return [];
    const { data, error } = await this.client
      .from("staff_members")
      .select("*")
      .order("created_at", { ascending: true });
    if (error) throw error;
    return (data || []).map(mapStaffFromDB);
  }

  async upsertStaff(staff: StaffMember): Promise<void> {
    if (!this.client) return;
    const { error } = await this.client
      .from("staff_members")
      .upsert(mapStaffToDB(staff));
    if (error) throw error;
  }

  async deleteStaff(id: string): Promise<void> {
    if (!this.client) return;
    const { error } = await this.client.from("staff_members").delete().eq("id", id);
    if (error) throw error;
  }
}

export const supabaseManager = new SupabaseManager();
