import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  MessageSquareQuote, 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  Search, 
  Star, 
  Heart, 
  Share2, 
  CheckCircle2, 
  X, 
  Sparkles,
  UserCheck,
  Send,
  ThumbsUp,
  MapPin,
  Calendar,
  Trophy,
  Award,
  Crown,
  Medal,
  Zap,
  Users,
  Flame,
  Check
} from "lucide-react";

interface KataWargaSectionProps {
  isDayMode: boolean;
}

export interface Testimonial {
  id: string | number;
  name: string;
  rtRole: string; // e.g. "RT 02 / Klaster Utama"
  status: string; // e.g. "Warga Terverifikasi", "Pengurus PKK", "Karang Taruna"
  avatar: string;
  category: "Digital & Layanan" | "Keamanan" | "Energi & Lingkungan" | "Sosial & Budaya";
  rating: number;
  quote: string;
  date: string;
  likes: number;
  tags: string[];
}

export interface WargaTerbaik {
  id: string;
  year: string;
  name: string;
  title: string;
  rtRole: string;
  avatar: string;
  category: string;
  quote: string;
  achievements: string[];
  impactStats: { label: string; value: string }[];
  applaudCount: number;
}

export function KataWargaSection({ isDayMode }: KataWargaSectionProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("Semua");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [likedMap, setLikedMap] = useState<Record<string | number, boolean>>({});
  const [copiedId, setCopiedId] = useState<string | number | null>(null);
  const [activeTestimonialModal, setActiveTestimonialModal] = useState<Testimonial | null>(null);
  const [notificationMsg, setNotificationMsg] = useState<string | null>(null);

  // Warga Terbaik state
  const defaultWargaTerbaik: WargaTerbaik[] = [
    {
      id: "warga-2026-utama",
      year: "2026",
      name: "Ibu Anindya Putri, S.Farm",
      title: "Pemenang Utama - Warga Terbaik Tahun 2026",
      rtRole: "RT 04 / Kebalen Green",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=300&auto=format&fit=crop",
      category: "Kesehatan, Keamanan & Pengayom Komunitas",
      quote: "Kemajuan Kebalen 26 tidak hanya diukur dari kecanggihan teknologinya, melainkan dari ketulusan warga dalam menjaga keselamatan lansia, anak-anak, dan keasrian lingkungan bersama.",
      achievements: [
        "Inisiator Pemasangan 12 Sensor Panic Button & CCTV Terintegrasi di Lorong RT 04",
        "Penggerak Program Zero Stunting & Posyandu Digital dengan layanan konsultasi gizi cepat",
        "Pelopor Program Bank Sampah Organik & Pelatihan Kompos Rumah Tangga untuk Warga"
      ],
      impactStats: [
        { label: "Titik Keamanan", value: "12 Sensor" },
        { label: "Warga Terbantu", value: "450+ Keluarga" },
        { label: "Zero Stunting", value: "100% Target" }
      ],
      applaudCount: 184
    },
    {
      id: "warga-2026-inovasi",
      year: "2026",
      name: "Bapak Hendra Gunawan",
      title: "Teladan Inovasi Lingkungan & Energi Hijau",
      rtRole: "RT 01 / Kebalen Asri",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop",
      category: "Energi Terbarukan & Ketahanan Pangan",
      quote: "Memanfaatkan sinar matahari dan IoT untuk hidroponik Balai Warga adalah bukti nyata bahwa RT/RW kecil pun bisa mandiri energi dan mandiri pangan secara berkelanjutan.",
      achievements: [
        "Penggagas Pemasangan Solar Panel 2.5 KWp Mandiri di Balai Warga RW 26",
        "Pengembang Sistem IoT Hidroponik Otomatis yang rutin membagikan panen gratis",
        "Meringankan Biaya Kas Operasional Bulanan RW sebesar 40%"
      ],
      impactStats: [
        { label: "Daya Hemat", value: "2.5 KWp" },
        { label: "Hasil Panen", value: "85 Kg/Bln" },
        { label: "Efisiensi Kas", value: "40%" }
      ],
      applaudCount: 142
    },
    {
      id: "warga-2026-pemuda",
      year: "2026",
      name: "Rizky Febrian",
      title: "Tokoh Pemuda & Pelopor AI Community",
      rtRole: "RT 02 / Klaster Utama",
      avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=300&auto=format&fit=crop",
      category: "Kepemudaan & Edukasi Digital",
      quote: "Balai Warga RW 26 kini menjadi ruang tumbuh bagi anak-anak muda untuk belajar teknologi, pemrograman, serta riset berbasis AI tanpa perlu biaya mahal.",
      achievements: [
        "Inisiator Kelas Koding & AI Gratis bagi Remaja & Karang Taruna Kebalen",
        "Koordinator Digitalisasi Administrasi Surat Pengantar RW 26",
        "Penyelenggara Turnamen e-Sports & Festival Budaya Digital Warga"
      ],
      impactStats: [
        { label: "Siswa Terlatih", value: "120+ Remaja" },
        { label: "Program Digital", value: "8 Inisiatif" },
        { label: "Partisipasi", value: "95% Pemuda" }
      ],
      applaudCount: 156
    },
    {
      id: "warga-2026-senior",
      year: "2026",
      name: "Drs. H. Bambang Subagyo",
      title: "Tokoh Senior & Pengayom Kerukunan Warga",
      rtRole: "RT 03 / Kebalen Indah",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop",
      category: "Sosial, Keagamaan & Mediasi Komunitas",
      quote: "Kerukunan antarwarga dan silaturahmi yang hangat adalah pondasi sejati kebahagiaan di Kebalen 26. Teknologi menyatukan langkah kita, namun persaudaraan yang menguatkan hati kita.",
      achievements: [
        "Ketua Forum Silaturahmi Lintas RT & Mediasi Konflik Warga RW 26",
        "Penggerak Kegiatan Gotong Royong Bulanan & Pengajian Rutin Kebalen",
        "Pelopor Program Dana Sosial Kemanusiaan & Santunan Santri & Dhuafa"
      ],
      impactStats: [
        { label: "Kegiatan Sosial", value: "24 Event/Thn" },
        { label: "Penerima Manfaat", value: "320+ Warga" },
        { label: "Kerukunan RT", value: "100% Harmoni" }
      ],
      applaudCount: 168
    }
  ];

  const [wargaTerbaikList, setWargaTerbaikList] = useState<WargaTerbaik[]>(() => {
    try {
      const saved = localStorage.getItem("rw26_warga_terbaik");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length >= 4) return parsed;
      }
    } catch (e) {
      // ignore
    }
    return defaultWargaTerbaik;
  });

  const [activeWargaIndex, setActiveWargaIndex] = useState<number>(0);
  const [hasApplaudedMap, setHasApplaudedMap] = useState<Record<string, boolean>>({});
  const [showWargaDetailModal, setShowWargaDetailModal] = useState<boolean>(false);
  const [congratulationText, setCongratulationText] = useState<string>("");
  const [congratulationsList, setCongratulationsList] = useState<{ id: number; name: string; msg: string; date: string }[]>(() => {
    try {
      const saved = localStorage.getItem("rw26_congrats_list");
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // ignore
    }
    return [
      { id: 1, name: "Bpk. Drs. H. Bambang Subagyo", msg: "Selamat kepada Ibu Anindya! Sungguh dedikasi luar biasa untuk keselamatan warga RT 04 & RW 26.", date: "22 Juli 2026" },
      { id: 2, name: "Siti Rahmawati", msg: "Sangat menginspirasi! Semoga program stunting dan panic button ini bisa terus dipertahankan.", date: "21 Juli 2026" }
    ];
  });

  // Current active Warga Terbaik
  const currentWarga = wargaTerbaikList[activeWargaIndex] || wargaTerbaikList[0];

  // Handle Applaud / Apresiasi Warga Terbaik
  const handleApplaud = (wargaId: string) => {
    const isAlready = hasApplaudedMap[wargaId];
    setHasApplaudedMap(prev => ({ ...prev, [wargaId]: !isAlready }));

    const updated = wargaTerbaikList.map(item => {
      if (item.id === wargaId) {
        return {
          ...item,
          applaudCount: isAlready ? item.applaudCount - 1 : item.applaudCount + 1
        };
      }
      return item;
    });

    setWargaTerbaikList(updated);
    try {
      localStorage.setItem("rw26_warga_terbaik", JSON.stringify(updated));
    } catch (e) {
      // ignore
    }

    if (!isAlready) {
      setNotificationMsg(`🏆 Terima kasih telah memberikan apresiasi untuk ${currentWarga.name}!`);
      setTimeout(() => setNotificationMsg(null), 3500);
    }
  };

  // Submit Congratulation Message
  const handleSendCongratulation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!congratulationText.trim()) return;

    const newCongrats = {
      id: Date.now(),
      name: "Warga RW 26",
      msg: congratulationText.trim(),
      date: new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })
    };

    const updated = [newCongrats, ...congratulationsList];
    setCongratulationsList(updated);
    try {
      localStorage.setItem("rw26_congrats_list", JSON.stringify(updated));
    } catch (e) {
      // ignore
    }

    setCongratulationText("");
    setNotificationMsg("🎉 Ucapan selamat Anda telah terkirim!");
    setTimeout(() => setNotificationMsg(null), 3500);
  };

  // Form State for adding new Testimonial
  const [formData, setFormData] = useState({
    name: "",
    rtRole: "RT 01 / RW 26",
    status: "Warga Terverifikasi",
    category: "Digital & Layanan" as Testimonial["category"],
    rating: 5,
    quote: "",
    tags: "Pelayanan, Inovasi"
  });

  // Default initial testimonials
  const initialTestimonials: Testimonial[] = [
    {
      id: 1,
      name: "Drs. H. Bambang Subagyo",
      rtRole: "RT 02 / Klaster Utama",
      status: "Tokoh Warga & Senior",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
      category: "Digital & Layanan",
      rating: 5,
      quote: "Pengurusan surat pengantar administrasi RW berbasis digital ini luar biasa mempermudah lansia dan pekerja. Tidak perlu mengantre lama, pengajuan dari handphone langsung diverifikasi cepat oleh sekretariat RW.",
      date: "22 Juli 2026",
      likes: 24,
      tags: ["DigitalRW", "PelayananCepat", "Transparan"]
    },
    {
      id: 2,
      name: "Ibu Anindya Putri, S.Farm",
      rtRole: "RT 04 / Kebalen Green",
      status: "Pengurus Posyandu & PKK",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop",
      category: "Keamanan",
      rating: 5,
      quote: "Integrasi sensor Panic Button fisik di lorong-lorong RT 04 serta CCTV terpusat membuat kami para ibu merasa sangat aman, terutama saat kepulangan kegiatan pengajian atau posyandu pada malam hari.",
      date: "20 Juli 2026",
      likes: 38,
      tags: ["KeamananMalam", "PanicButton", "CCTV24Jam"]
    },
    {
      id: 3,
      name: "Bapak Hendra Gunawan",
      rtRole: "RT 01 / Kebalen Asri",
      status: "Warga Terverifikasi",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
      category: "Energi & Lingkungan",
      rating: 5,
      quote: "Operasional Solar Panel 2.5 KWp di Balai Warga berhasil memangkas iuran operasional bulanan secara nyata. Kas RW jadi lebih sehat dan bisa dialokasikan penuh untuk kegiatan anak muda serta pemeliharaan kebun warga.",
      date: "18 Juli 2026",
      likes: 42,
      tags: ["PanelSurya", "KasRWSehat", "HematEnergi"]
    },
    {
      id: 4,
      name: "Dr. Ir. Raden Mas Sutrisno",
      rtRole: "RT 05 / Kebalen Park",
      status: "Warga Terverifikasi",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop",
      category: "Energi & Lingkungan",
      rating: 5,
      quote: "Pengembangan sistem IoT Hidroponik otomatis ditenagai panel surya di RW26 adalah percontohan Smart Village yang sangat menginspirasi. Sayuran hidroponiknya segar dan rutin membagikan hasil panen gratis untuk warga.",
      date: "15 Juli 2026",
      likes: 31,
      tags: ["IoTHidroponik", "KetahananPangan", "SmartVillage"]
    },
    {
      id: 5,
      name: "Ibu Siti Rahmawati",
      rtRole: "RT 03 / Kebalen Indah",
      status: "Pengurus Kader Kesehatan",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop",
      category: "Digital & Layanan",
      rating: 5,
      quote: "Fitur AI Voice Assistance di portal website Kebalen 26 sangat ramah pengguna. Warga tinggal bicara untuk menanyakan jadwal posyandu, jadwal ronda, atau info kas bulanan tanpa perlu kebingungan mengetik.",
      date: "12 Juli 2026",
      likes: 29,
      tags: ["AIVoice", "Aksesibel", "InovasiRW"]
    },
    {
      id: 6,
      name: "Rizky Febrian",
      rtRole: "RT 02 / Klaster Utama",
      status: "Ketua Karang Taruna RW 26",
      avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=200&auto=format&fit=crop",
      category: "Sosial & Budaya",
      rating: 5,
      quote: "Kami para pemuda sangat bangga Balai Warga dilengkapi jaringan internet fiber optik cepat dan laboratorium AI. Tempat ini jadi pusat riset, diskusi kreatif, dan tempat belajar koding anak-anak muda Kebalen.",
      date: "09 Juli 2026",
      likes: 53,
      tags: ["KarangTaruna", "PusatKreatif", "GenerasiMuda"]
    }
  ];

  const [testimonials, setTestimonials] = useState<Testimonial[]>(() => {
    try {
      const saved = localStorage.getItem("rw26_kata_warga");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error("Failed to parse saved testimonials:", e);
    }
    return initialTestimonials;
  });

  // Categories list
  const categories = ["Semua", "Digital & Layanan", "Keamanan", "Energi & Lingkungan", "Sosial & Budaya"];

  // Filtered testimonials based on category & search
  const filteredTestimonials = testimonials.filter((item) => {
    const matchesCategory = selectedCategory === "Semua" || item.category === selectedCategory;
    const matchesSearch = 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.rtRole.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.quote.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  // Handle Scroll Left / Right
  const handleScroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = scrollContainerRef.current.clientWidth * 0.75;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth"
      });
    }
  };

  // Toggle Like / Agree
  const handleLike = (id: string | number) => {
    const isLiked = likedMap[id];
    setLikedMap((prev) => ({ ...prev, [id]: !isLiked }));

    const updated = testimonials.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          likes: isLiked ? item.likes - 1 : item.likes + 1
        };
      }
      return item;
    });

    setTestimonials(updated);
    try {
      localStorage.setItem("rw26_kata_warga", JSON.stringify(updated));
    } catch (e) {
      // ignore
    }
  };

  // Handle Share / Copy Testimonial Quote
  const handleShare = (item: Testimonial) => {
    const shareText = `"${item.quote}" — ${item.name} (${item.rtRole})\n\nKata Warga Kebalen 26: https://ais-pre-hc5si5i3sxailkauc5kziw-906902293309.asia-southeast1.run.app#kata-warga`;
    navigator.clipboard.writeText(shareText);
    setCopiedId(item.id);
    setNotificationMsg("Kutipan kata warga berhasil disalin ke clipboard!");
    setTimeout(() => {
      setCopiedId(null);
      setNotificationMsg(null);
    }, 3000);
  };

  // Submit New Testimonial
  const handleSubmitNewTestimonial = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.quote.trim()) {
      alert("Mohon isi Nama Lengkap dan Pesan Kata Warga Anda.");
      return;
    }

    const tagArray = formData.tags
      .split(",")
      .map((t) => t.trim().replace(/^#/, ""))
      .filter(Boolean);

    const newEntry: Testimonial = {
      id: Date.now(),
      name: formData.name.trim(),
      rtRole: formData.rtRole.trim(),
      status: formData.status.trim() || "Warga Terverifikasi",
      avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(formData.name)}`,
      category: formData.category,
      rating: formData.rating,
      quote: formData.quote.trim(),
      date: new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }),
      likes: 1,
      tags: tagArray.length > 0 ? tagArray : ["SuaraWarga", "Kebalen26"]
    };

    const updated = [newEntry, ...testimonials];
    setTestimonials(updated);
    try {
      localStorage.setItem("rw26_kata_warga", JSON.stringify(updated));
    } catch (e) {
      console.error("Failed to save new testimonial", e);
    }

    setIsModalOpen(false);
    setFormData({
      name: "",
      rtRole: "RT 01 / RW 26",
      status: "Warga Terverifikasi",
      category: "Digital & Layanan",
      rating: 5,
      quote: "",
      tags: "Pelayanan, Inovasi"
    });

    setNotificationMsg("Terima kasih! Kata Warga Anda telah dipublikasikan.");
    setTimeout(() => setNotificationMsg(null), 4000);
  };

  return (
    <section id="kata-warga" className="relative w-full py-16 sm:py-24 px-4 sm:px-8 md:px-12 overflow-hidden transition-colors duration-500 scroll-mt-20 sm:scroll-mt-24">
      {/* Background Subtle Gradient & Glow Effects */}
      <div className={`absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full blur-[140px] pointer-events-none transition-opacity duration-500 ${
        isDayMode ? "bg-emerald-200/40 opacity-50" : "bg-emerald-900/15 opacity-60"
      }`} />
      <div className={`absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full blur-[120px] pointer-events-none transition-opacity duration-500 ${
        isDayMode ? "bg-amber-200/30 opacity-40" : "bg-stone-800/30 opacity-50"
      }`} />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold tracking-wider uppercase mb-3 border backdrop-blur-md ${
                isDayMode 
                  ? "bg-amber-500/10 border-amber-500/30 text-amber-700" 
                  : "bg-amber-500/15 border-amber-500/30 text-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.2)]"
              }`}
            >
              <Trophy className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              <span>Anugerah & Kata Warga Kebalen 26</span>
            </motion.div>

            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className={`text-3xl sm:text-5xl md:text-6xl font-sans font-bold tracking-tight ${
                isDayMode ? "text-stone-900" : "text-[#E1E0CC]"
              }`}
            >
              Kata <span className="italic font-serif text-emerald-500 underline decoration-emerald-500/30 underline-offset-8">Warga</span> & <span className="text-amber-400">Warga Terbaik</span>
            </motion.h2>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className={`mt-3 text-sm sm:text-base max-w-2xl leading-relaxed ${
                isDayMode ? "text-stone-600" : "text-[#E1E0CC]/70"
              }`}
            >
              Apresiasi autentik dari warga Kebalen 26 serta penghargaan untuk sosok warga paling berdedikasi dan berdampak nyata bagi lingkungan tahun ini.
            </motion.p>
          </div>

          {/* Action Trigger Button: Add Testimonial */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25 }}
            className="flex items-center gap-3"
          >
            <button
              onClick={() => setIsModalOpen(true)}
              className={`px-5 py-3 rounded-2xl font-semibold text-xs sm:text-sm tracking-wide flex items-center gap-2.5 transition-all duration-300 shadow-lg cursor-pointer ${
                isDayMode
                  ? "bg-emerald-600 text-white hover:bg-emerald-700 shadow-emerald-600/20 hover:scale-[1.02]"
                  : "bg-emerald-500 text-black font-bold hover:bg-emerald-400 shadow-emerald-500/30 hover:scale-[1.02]"
              }`}
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
              <span>Tulis Kata Warga</span>
            </button>
          </motion.div>
        </div>

        {/* ============================================================ */}
        {/* FEATURE: WARGA TERBAIK TAHUN INI (HERO SPOTLIGHT CARD) */}
        {/* ============================================================ */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className={`relative rounded-3xl border p-6 sm:p-8 md:p-10 mb-12 overflow-hidden transition-all duration-500 ${
            isDayMode
              ? "bg-gradient-to-br from-amber-500/10 via-white to-emerald-500/10 border-amber-500/30 shadow-xl shadow-amber-500/5"
              : "bg-gradient-to-br from-amber-950/40 via-stone-950 to-emerald-950/30 border-amber-500/40 shadow-[0_15px_50px_rgba(245,158,11,0.15)]"
          }`}
        >
          {/* Shimmer top border line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-emerald-400 to-amber-500 animate-pulse" />
          
          <div className="flex flex-col lg:flex-row items-stretch justify-between gap-8 relative z-10">
            {/* Left side: Avatar & Crown Badge */}
            <div className="flex flex-col sm:flex-row lg:flex-col items-center sm:items-start lg:items-center text-center sm:text-left lg:text-center justify-center gap-5 lg:w-1/3 flex-shrink-0">
              <div className="relative group">
                <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-amber-400 to-emerald-400 opacity-60 blur-md group-hover:opacity-100 transition-opacity duration-500" />
                <img
                  src={currentWarga.avatar}
                  alt={currentWarga.name}
                  className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-full object-cover border-4 border-amber-400/80 shadow-2xl"
                />
                <div className="absolute -top-3 -right-2 bg-gradient-to-r from-amber-400 to-amber-600 text-black p-2 rounded-full shadow-lg border-2 border-white animate-bounce">
                  <Crown className="w-5 h-5 stroke-[2.5]" />
                </div>
              </div>

              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-bold uppercase tracking-wider bg-amber-400/20 text-amber-400 border border-amber-400/40 mb-2">
                  <Medal className="w-3.5 h-3.5" />
                  <span>WARGA TERBAIK TAHUN {currentWarga.year}</span>
                </div>
                <h3 className={`text-xl sm:text-2xl font-bold font-sans ${isDayMode ? "text-stone-900" : "text-[#E1E0CC]"}`}>
                  {currentWarga.name}
                </h3>
                <p className="text-xs font-mono text-emerald-400 mt-1 font-semibold flex items-center justify-center sm:justify-start lg:justify-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {currentWarga.rtRole}
                </p>
                <p className={`text-xs mt-1.5 italic ${isDayMode ? "text-stone-500" : "text-stone-400"}`}>
                  {currentWarga.category}
                </p>
              </div>

              {/* Nominee Switcher Pills */}
              <div className="flex items-center justify-center gap-2 mt-2 w-full pt-2 border-t border-amber-500/20">
                <span className={`text-[10px] font-mono uppercase mr-1 ${isDayMode ? "text-stone-500" : "text-stone-400"}`}>Pilih Tokoh:</span>
                {wargaTerbaikList.map((item, idx) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveWargaIndex(idx)}
                    title={item.name}
                    className={`w-7 h-7 rounded-full text-xs font-mono font-bold transition-all cursor-pointer ${
                      activeWargaIndex === idx
                        ? "bg-amber-400 text-black scale-110 shadow-md shadow-amber-400/40 ring-2 ring-amber-300"
                        : isDayMode
                          ? "bg-stone-200 text-stone-700 hover:bg-stone-300"
                          : "bg-stone-800 text-stone-400 hover:bg-stone-700 hover:text-white"
                    }`}
                  >
                    #{idx + 1}
                  </button>
                ))}
              </div>
            </div>

            {/* Middle side: Main Quote & Achievements */}
            <div className="flex-1 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-amber-500/20 pt-6 lg:pt-0 lg:pl-8">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono font-bold tracking-widest uppercase text-amber-400 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4" />
                    <span>{currentWarga.title}</span>
                  </span>

                  <button
                    onClick={() => setShowWargaDetailModal(true)}
                    className="text-xs font-semibold text-emerald-400 hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>Detail Kontribusi</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Quote */}
                <blockquote className={`text-sm sm:text-base italic font-serif leading-relaxed mb-6 p-4 rounded-2xl border ${
                  isDayMode ? "bg-white/60 border-stone-200 text-stone-800" : "bg-black/30 border-white/10 text-[#E1E0CC]/90"
                }`}>
                  "{currentWarga.quote}"
                </blockquote>

                {/* Key Achievements Bullet points */}
                <div className="space-y-2.5 mb-6">
                  <h4 className={`text-xs font-mono uppercase font-bold tracking-wider ${isDayMode ? "text-stone-700" : "text-stone-300"}`}>
                    Prestasi & Kontribusi Utama:
                  </h4>
                  {currentWarga.achievements.map((ach, aIdx) => (
                    <div key={aIdx} className="flex items-start gap-2.5 text-xs sm:text-sm">
                      <div className="p-1 rounded-full bg-emerald-500/20 text-emerald-400 mt-0.5 flex-shrink-0">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                      <span className={isDayMode ? "text-stone-700" : "text-[#E1E0CC]/85"}>{ach}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Impact Metrics Row */}
              <div className="grid grid-cols-3 gap-3 pt-4 border-t border-amber-500/20">
                {currentWarga.impactStats.map((stat, sIdx) => (
                  <div key={sIdx} className={`p-3 rounded-2xl text-center border ${
                    isDayMode ? "bg-white/80 border-stone-200" : "bg-stone-900/80 border-white/10"
                  }`}>
                    <p className="text-sm sm:text-lg font-bold font-mono text-amber-400">{stat.value}</p>
                    <p className={`text-[10px] font-mono mt-0.5 ${isDayMode ? "text-stone-500" : "text-stone-400"}`}>{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right side: Interactive Appreciation Counter & Quick Congratulation Wall */}
            <div className="lg:w-72 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-amber-500/20 pt-6 lg:pt-0 lg:pl-8 flex-shrink-0">
              <div>
                <div className={`p-5 rounded-2xl text-center border mb-5 ${
                  isDayMode 
                    ? "bg-amber-50 border-amber-200 text-stone-900" 
                    : "bg-amber-950/30 border-amber-500/30 text-[#E1E0CC]"
                }`}>
                  <Trophy className="w-8 h-8 mx-auto text-amber-400 mb-2 animate-bounce" />
                  <p className="text-2xl font-mono font-bold text-amber-400">{currentWarga.applaudCount}</p>
                  <p className="text-xs font-mono text-stone-400 uppercase mt-0.5">Apresiasi Warga</p>

                  <button
                    onClick={() => handleApplaud(currentWarga.id)}
                    className={`mt-4 w-full py-2.5 px-4 rounded-xl font-bold text-xs tracking-wide flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-95 ${
                      hasApplaudedMap[currentWarga.id]
                        ? "bg-amber-400 text-black shadow-lg shadow-amber-400/30"
                        : "bg-gradient-to-r from-amber-500 to-amber-600 text-black hover:from-amber-400 hover:to-amber-500 shadow-md"
                    }`}
                  >
                    <Award className="w-4 h-4 stroke-[2.5]" />
                    <span>{hasApplaudedMap[currentWarga.id] ? "Telah Diapresiasi 🏆" : "Kirim Apresiasi 🏆"}</span>
                  </button>
                </div>

                {/* Quick Congratulation Form */}
                <form onSubmit={handleSendCongratulation} className="space-y-2">
                  <label className={`block text-[11px] font-mono font-bold uppercase ${isDayMode ? "text-stone-700" : "text-stone-300"}`}>
                    Ucapkan Selamat:
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Tulis ucapan selamat..."
                      value={congratulationText}
                      onChange={(e) => setCongratulationText(e.target.value)}
                      className={`flex-1 px-3 py-2 rounded-xl border text-xs outline-none ${
                        isDayMode 
                          ? "bg-white border-stone-300 text-stone-900 focus:border-amber-500" 
                          : "bg-stone-900 border-white/10 text-white focus:border-amber-400"
                      }`}
                    />
                    <button
                      type="submit"
                      disabled={!congratulationText.trim()}
                      className="px-3 py-2 rounded-xl bg-amber-400 text-black font-bold text-xs disabled:opacity-50 cursor-pointer hover:bg-amber-300 transition-colors"
                    >
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </form>
              </div>

              {/* Congratulation snippet */}
              <div className="mt-4 pt-3 border-t border-amber-500/20">
                <p className="text-[10px] font-mono text-stone-400 uppercase mb-1.5 flex items-center gap-1">
                  <MessageSquareQuote className="w-3 h-3 text-amber-400" />
                  <span>Ucapan Terbaru Warga:</span>
                </p>
                {congratulationsList.length > 0 && (
                  <p className={`text-xs italic line-clamp-2 ${isDayMode ? "text-stone-600" : "text-stone-300"}`}>
                    "{congratulationsList[0].msg}" <span className="font-sans font-bold not-italic">— {congratulationsList[0].name}</span>
                  </p>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Filter Bar & Search & Controls */}
        <div className={`p-4 rounded-2xl border backdrop-blur-xl mb-8 flex flex-col lg:flex-row items-center justify-between gap-4 transition-all duration-300 ${
          isDayMode
            ? "bg-white/70 border-stone-200/80 shadow-sm"
            : "bg-stone-950/60 border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
        }`}>
          {/* Category Pills */}
          <div className="flex items-center gap-2 overflow-x-auto w-full lg:w-auto pb-2 lg:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-300 cursor-pointer ${
                  selectedCategory === cat
                    ? isDayMode
                      ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/20"
                      : "bg-emerald-400 text-black font-bold shadow-md shadow-emerald-400/20"
                    : isDayMode
                      ? "bg-stone-100 text-stone-600 hover:bg-stone-200"
                      : "bg-stone-900/80 text-stone-400 hover:bg-stone-800 hover:text-stone-200 border border-white/5"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input & Horizontal Scroll Buttons */}
          <div className="flex items-center gap-3 w-full lg:w-auto justify-between lg:justify-end">
            {/* Search Input */}
            <div className={`relative flex-1 lg:w-64 flex items-center px-3.5 py-2 rounded-xl border text-xs transition-all ${
              isDayMode
                ? "bg-stone-50 border-stone-200 text-stone-800 focus-within:border-emerald-500"
                : "bg-stone-900/90 border-white/10 text-[#E1E0CC] focus-within:border-emerald-500/50"
            }`}>
              <Search className="w-3.5 h-3.5 text-stone-400 mr-2 flex-shrink-0" />
              <input
                type="text"
                placeholder="Cari warga, RT, atau topik..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent border-none outline-none w-full placeholder:text-stone-500 text-xs"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery("")}
                  className="text-stone-400 hover:text-stone-200 p-0.5"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Left & Right Chevron Carousel Controllers ("Bulir Kekiri dan Kekanan") */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                onClick={() => handleScroll("left")}
                title="Geser ke Kiri"
                className={`p-2.5 rounded-xl border backdrop-blur-md transition-all duration-300 cursor-pointer active:scale-95 ${
                  isDayMode
                    ? "bg-white border-stone-200 text-stone-700 hover:bg-stone-100 hover:text-emerald-700 shadow-sm"
                    : "bg-stone-900/90 border-white/15 text-stone-300 hover:bg-emerald-500/20 hover:text-emerald-400 hover:border-emerald-500/40"
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <button
                onClick={() => handleScroll("right")}
                title="Geser ke Kanan"
                className={`p-2.5 rounded-xl border backdrop-blur-md transition-all duration-300 cursor-pointer active:scale-95 ${
                  isDayMode
                    ? "bg-white border-stone-200 text-stone-700 hover:bg-stone-100 hover:text-emerald-700 shadow-sm"
                    : "bg-stone-900/90 border-white/15 text-stone-300 hover:bg-emerald-500/20 hover:text-emerald-400 hover:border-emerald-500/40"
                }`}
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Carousel / Cards Slider Container ("Card-nya reposid, bulir kekiri dan kekanan") */}
        <div 
          ref={scrollContainerRef}
          className="flex gap-4 sm:gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-none py-6 px-2 -mx-2 scroll-smooth"
          style={{ scrollBehavior: "smooth" }}
        >
          {filteredTestimonials.length === 0 ? (
            <div className={`w-full py-16 text-center rounded-2xl border ${
              isDayMode ? "bg-white/50 border-stone-200 text-stone-500" : "bg-stone-900/40 border-white/10 text-stone-400"
            }`}>
              <MessageSquareQuote className="w-10 h-10 mx-auto mb-3 text-stone-400 opacity-60" />
              <p className="text-sm font-medium">Tidak ada kata warga yang sesuai dengan pencarian "{searchQuery}".</p>
              <button 
                onClick={() => { setSearchQuery(""); setSelectedCategory("Semua"); }}
                className="mt-3 text-xs text-emerald-400 hover:underline font-semibold"
              >
                Tampilkan semua kata warga
              </button>
            </div>
          ) : (
            filteredTestimonials.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className={`w-[290px] sm:w-[340px] md:w-[360px] md:hover:w-[460px] flex-shrink-0 snap-start rounded-2xl sm:rounded-3xl border p-6 flex flex-col justify-between transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] relative group md:hover:z-20 md:hover:-translate-y-1.5 ${
                  isDayMode
                    ? "bg-white/90 border-stone-200/90 shadow-[0_10px_30px_rgba(0,0,0,0.04)] hover:shadow-2xl hover:border-emerald-500/50"
                    : "bg-stone-900/90 border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:border-emerald-500/50 hover:shadow-[0_20px_40px_rgba(16,185,129,0.2)]"
                }`}
              >
                {/* Top Glowing Glass Accent */}
                <div className="absolute top-0 left-8 right-8 h-[1px] bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div>
                  {/* Card Header: Avatar + Citizen Info + Rating */}
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="relative flex-shrink-0">
                        <img 
                          src={item.avatar} 
                          alt={item.name}
                          className="w-12 h-12 rounded-full object-cover border-2 border-emerald-500/50 shadow-md relative z-10"
                        />
                        <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-black p-0.5 rounded-full z-20" title="Warga Terverifikasi">
                          <CheckCircle2 className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                      </div>

                      <div>
                        <h3 className={`font-sans font-bold text-sm sm:text-base leading-snug transition-colors duration-300 ${
                          isDayMode ? "text-stone-900 group-hover:text-emerald-700" : "text-[#E1E0CC] group-hover:text-emerald-300"
                        }`}>
                          {item.name}
                        </h3>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <MapPin className="w-3 h-3 text-emerald-500 flex-shrink-0" />
                          <span className={`text-[11px] font-mono font-medium ${
                            isDayMode ? "text-stone-500" : "text-stone-400"
                          }`}>
                            {item.rtRole}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Rating Stars */}
                    <div className="flex items-center gap-0.5 bg-amber-500/10 border border-amber-500/20 px-2 py-1 rounded-lg flex-shrink-0">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span className="text-xs font-mono font-bold text-amber-400 ml-1">{item.rating}.0</span>
                    </div>
                  </div>

                  {/* Status Pill Badge */}
                  <div className="mb-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[10px] font-mono font-semibold tracking-wide uppercase ${
                      isDayMode 
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200" 
                        : "bg-emerald-950/50 text-emerald-300 border border-emerald-800/40"
                    }`}>
                      <UserCheck className="w-3 h-3 text-emerald-400" />
                      {item.status}
                    </span>
                  </div>

                  {/* Quote Message */}
                  <div className="relative mb-5">
                    <MessageSquareQuote className={`absolute -top-2 -left-2 w-8 h-8 pointer-events-none opacity-10 ${
                      isDayMode ? "text-stone-800" : "text-emerald-400"
                    }`} />
                    <p className={`text-xs sm:text-sm leading-relaxed font-serif italic relative z-10 line-clamp-4 ${
                      isDayMode ? "text-stone-700" : "text-[#E1E0CC]/85"
                    }`}>
                      "{item.quote}"
                    </p>
                    
                    {item.quote.length > 140 && (
                      <button
                        onClick={() => setActiveTestimonialModal(item)}
                        className="mt-1 text-[11px] text-emerald-400 font-semibold hover:underline cursor-pointer"
                      >
                        Baca selengkapnya...
                      </button>
                    )}
                  </div>
                </div>

                {/* Card Footer: Tags, Date & Like Action */}
                <div>
                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {item.tags.map((tag, tIdx) => (
                      <span 
                        key={tIdx}
                        className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                          isDayMode ? "bg-stone-100 text-stone-600" : "bg-stone-900 text-stone-400 border border-white/5"
                        }`}
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Divider */}
                  <div className={`h-[1px] w-full mb-3 ${isDayMode ? "bg-stone-200" : "bg-white/10"}`} />

                  {/* Actions Row */}
                  <div className="flex items-center justify-between text-xs">
                    <span className={`text-[11px] font-mono flex items-center gap-1 ${
                      isDayMode ? "text-stone-400" : "text-stone-500"
                    }`}>
                      <Calendar className="w-3 h-3" />
                      {item.date}
                    </span>

                    <div className="flex items-center gap-2">
                      {/* Share Button */}
                      <button
                        onClick={() => handleShare(item)}
                        title="Bagikan Kutipan"
                        className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                          copiedId === item.id
                            ? "bg-emerald-500 text-black border-emerald-500"
                            : isDayMode
                              ? "bg-stone-100 border-stone-200 text-stone-600 hover:bg-stone-200"
                              : "bg-stone-900 border-white/10 text-stone-400 hover:bg-stone-800 hover:text-stone-200"
                        }`}
                      >
                        <Share2 className="w-3.5 h-3.5" />
                      </button>

                      {/* Like / Apresiasi Button */}
                      <button
                        onClick={() => handleLike(item.id)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all duration-300 cursor-pointer active:scale-95 ${
                          likedMap[item.id]
                            ? "bg-rose-500/20 border-rose-500/50 text-rose-400 shadow-sm"
                            : isDayMode
                              ? "bg-stone-100 border-stone-200 text-stone-700 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200"
                              : "bg-stone-900 border-white/10 text-stone-300 hover:bg-rose-950/40 hover:text-rose-400 hover:border-rose-500/30"
                        }`}
                      >
                        <Heart className={`w-3.5 h-3.5 ${likedMap[item.id] ? "fill-rose-500 text-rose-500 animate-bounce" : ""}`} />
                        <span>{item.likes}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>

        {/* Carousel Footer Hint */}
        <div className="flex items-center justify-between mt-6 px-2">
          <p className={`text-xs font-mono flex items-center gap-2 ${isDayMode ? "text-stone-500" : "text-stone-400"}`}>
            <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            <span>Geser kartu ke kanan / kiri atau gunakan tombol panah navigasi.</span>
          </p>

          <div className="flex items-center gap-1.5">
            <span className={`text-xs font-mono font-bold ${isDayMode ? "text-stone-700" : "text-emerald-400"}`}>
              {filteredTestimonials.length}
            </span>
            <span className={`text-xs ${isDayMode ? "text-stone-400" : "text-stone-500"}`}>
              Kata Warga Dipublikasikan
            </span>
          </div>
        </div>

      </div>

      {/* Modal: Detail Warga Terbaik */}
      <AnimatePresence>
        {showWargaDetailModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className={`w-full max-w-2xl rounded-3xl border p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto ${
                isDayMode ? "bg-white border-stone-200 text-stone-900" : "bg-stone-950 border-white/15 text-[#E1E0CC]"
              }`}
            >
              <button
                onClick={() => setShowWargaDetailModal(false)}
                className={`absolute top-5 right-5 p-2 rounded-full border transition-colors cursor-pointer ${
                  isDayMode ? "bg-stone-100 text-stone-600" : "bg-stone-900 text-stone-300 border-white/10"
                }`}
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 mb-6 pb-6 border-b border-amber-500/20">
                <img 
                  src={currentWarga.avatar} 
                  alt={currentWarga.name}
                  className="w-20 h-20 rounded-full object-cover border-2 border-amber-400 shadow-xl"
                />
                <div className="text-center sm:text-left">
                  <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase bg-amber-400/20 text-amber-400 border border-amber-400/30 mb-1">
                    <Trophy className="w-3 h-3" />
                    <span>Warga Terbaik Tahun {currentWarga.year}</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold">{currentWarga.name}</h3>
                  <p className="text-xs font-mono text-emerald-400">{currentWarga.rtRole} • {currentWarga.category}</p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400 mb-2">Visi & Kata Dedikasi:</h4>
                  <p className={`text-sm italic font-serif leading-relaxed p-4 rounded-2xl border ${
                    isDayMode ? "bg-stone-50 border-stone-200 text-stone-800" : "bg-stone-900 border-white/10 text-stone-200"
                  }`}>
                    "{currentWarga.quote}"
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400 mb-3">
                    Rekam Jejak & Kontribusi Utama:
                  </h4>
                  <div className="space-y-3">
                    {currentWarga.achievements.map((ach, idx) => (
                      <div key={idx} className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-start gap-3">
                        <Award className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                        <span className="text-xs leading-relaxed">{ach}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Congratulations Wall */}
                <div>
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400 mb-3">
                    Dinding Ucapan & Apresiasi Warga ({congratulationsList.length}):
                  </h4>
                  <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                    {congratulationsList.map((c) => (
                      <div key={c.id} className={`p-3 rounded-xl border text-xs ${
                        isDayMode ? "bg-stone-100 border-stone-200" : "bg-stone-900/80 border-white/5"
                      }`}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-bold text-emerald-400">{c.name}</span>
                          <span className="text-[10px] font-mono text-stone-400">{c.date}</span>
                        </div>
                        <p className={isDayMode ? "text-stone-700" : "text-stone-300"}>{c.msg}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-amber-500/20 flex justify-end">
                <button
                  onClick={() => setShowWargaDetailModal(false)}
                  className="px-5 py-2 rounded-xl bg-amber-400 text-black font-bold text-xs cursor-pointer hover:bg-amber-300"
                >
                  Tutup
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Modal: Tulis Kata Warga */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className={`w-full max-w-xl rounded-3xl border p-6 sm:p-8 shadow-2xl relative overflow-hidden ${
                isDayMode
                  ? "bg-white border-stone-200 text-stone-900"
                  : "bg-stone-950 border-white/15 text-[#E1E0CC]"
              }`}
            >
              {/* Glowing header accent */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-600" />

              <button
                onClick={() => setIsModalOpen(false)}
                className={`absolute top-5 right-5 p-2 rounded-full border transition-colors cursor-pointer ${
                  isDayMode ? "bg-stone-100 hover:bg-stone-200 text-stone-600" : "bg-stone-900 hover:bg-stone-800 text-stone-300 border-white/10"
                }`}
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  <MessageSquareQuote className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold font-sans">Tulis Kata Warga</h3>
                  <p className={`text-xs ${isDayMode ? "text-stone-500" : "text-stone-400"}`}>
                    Bagikan pengalaman, apresiasi, atau masukan Anda untuk kemajuan RW26 Kebalen.
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmitNewTestimonial} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Nama Lengkap */}
                  <div>
                    <label className="block text-xs font-mono font-semibold uppercase mb-1.5">Nama Lengkap *</label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: Bpk. H. Ahmad Dahlan"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-xs outline-none transition-all ${
                        isDayMode
                          ? "bg-stone-50 border-stone-300 focus:border-emerald-600 text-stone-900"
                          : "bg-stone-900 border-white/10 focus:border-emerald-400 text-white"
                      }`}
                    />
                  </div>

                  {/* RT / Klaster */}
                  <div>
                    <label className="block text-xs font-mono font-semibold uppercase mb-1.5">Wilayah RT / Klaster *</label>
                    <select
                      value={formData.rtRole}
                      onChange={(e) => setFormData({ ...formData, rtRole: e.target.value })}
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-xs outline-none transition-all ${
                        isDayMode
                          ? "bg-stone-50 border-stone-300 focus:border-emerald-600 text-stone-900"
                          : "bg-stone-900 border-white/10 focus:border-emerald-400 text-white"
                      }`}
                    >
                      <option value="RT 01 / Kebalen Asri">RT 01 / Kebalen Asri</option>
                      <option value="RT 02 / Klaster Utama">RT 02 / Klaster Utama</option>
                      <option value="RT 03 / Kebalen Indah">RT 03 / Kebalen Indah</option>
                      <option value="RT 04 / Kebalen Green">RT 04 / Kebalen Green</option>
                      <option value="RT 05 / Kebalen Park">RT 05 / Kebalen Park</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Status Peran */}
                  <div>
                    <label className="block text-xs font-mono font-semibold uppercase mb-1.5">Peran / Status</label>
                    <input
                      type="text"
                      placeholder="Contoh: Warga Terverifikasi / Tokoh Pemuda"
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-xs outline-none transition-all ${
                        isDayMode
                          ? "bg-stone-50 border-stone-300 focus:border-emerald-600 text-stone-900"
                          : "bg-stone-900 border-white/10 focus:border-emerald-400 text-white"
                      }`}
                    />
                  </div>

                  {/* Kategori Topik */}
                  <div>
                    <label className="block text-xs font-mono font-semibold uppercase mb-1.5">Kategori Topik *</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value as Testimonial["category"] })}
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-xs outline-none transition-all ${
                        isDayMode
                          ? "bg-stone-50 border-stone-300 focus:border-emerald-600 text-stone-900"
                          : "bg-stone-900 border-white/10 focus:border-emerald-400 text-white"
                      }`}
                    >
                      <option value="Digital & Layanan">Digital & Layanan</option>
                      <option value="Keamanan">Keamanan</option>
                      <option value="Energi & Lingkungan">Energi & Lingkungan</option>
                      <option value="Sosial & Budaya">Sosial & Budaya</option>
                    </select>
                  </div>
                </div>

                {/* Rating selection */}
                <div>
                  <label className="block text-xs font-mono font-semibold uppercase mb-1.5">Rating Kepuasan</label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setFormData({ ...formData, rating: star })}
                        className="p-1 cursor-pointer transition-transform hover:scale-125"
                      >
                        <Star className={`w-5 h-5 ${
                          star <= formData.rating ? "fill-amber-400 text-amber-400" : "text-stone-600"
                        }`} />
                      </button>
                    ))}
                    <span className="text-xs font-mono text-amber-400 ml-2 font-bold">{formData.rating} Bintang</span>
                  </div>
                </div>

                {/* Pesan / Kata Warga */}
                <div>
                  <label className="block text-xs font-mono font-semibold uppercase mb-1.5">Pesan Testimoni / Kata Warga *</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Tuliskan pengalaman atau pesan Anda mengenai pelayanan, fasilitas, dan kegiatan di RW 26..."
                    value={formData.quote}
                    onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-xs outline-none transition-all leading-relaxed ${
                      isDayMode
                        ? "bg-stone-50 border-stone-300 focus:border-emerald-600 text-stone-900"
                        : "bg-stone-900 border-white/10 focus:border-emerald-400 text-white"
                    }`}
                  />
                </div>

                {/* Tags */}
                <div>
                  <label className="block text-xs font-mono font-semibold uppercase mb-1.5">Kata Kunci / Tagar (Pisahkan Komma)</label>
                  <input
                    type="text"
                    placeholder="Inovasi, Keamanan, Fasilitas"
                    value={formData.tags}
                    onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-xs outline-none transition-all ${
                      isDayMode
                        ? "bg-stone-50 border-stone-300 focus:border-emerald-600 text-stone-900"
                        : "bg-stone-900 border-white/10 focus:border-emerald-400 text-white"
                    }`}
                  />
                </div>

                {/* Submit Action */}
                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className={`px-4 py-2.5 rounded-xl text-xs font-semibold cursor-pointer ${
                      isDayMode ? "bg-stone-200 text-stone-700 hover:bg-stone-300" : "bg-stone-800 text-stone-300 hover:bg-stone-700"
                    }`}
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl text-xs font-bold bg-emerald-500 text-black hover:bg-emerald-400 transition-all flex items-center gap-2 cursor-pointer shadow-lg shadow-emerald-500/20"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Terbitkan Kata Warga</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Modal: Full Testimonial Detail View */}
      <AnimatePresence>
        {activeTestimonialModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className={`w-full max-w-lg rounded-3xl border p-6 sm:p-8 shadow-2xl relative ${
                isDayMode ? "bg-white border-stone-200 text-stone-900" : "bg-stone-950 border-white/15 text-[#E1E0CC]"
              }`}
            >
              <button
                onClick={() => setActiveTestimonialModal(null)}
                className={`absolute top-5 right-5 p-2 rounded-full border transition-colors cursor-pointer ${
                  isDayMode ? "bg-stone-100 text-stone-600" : "bg-stone-900 text-stone-300 border-white/10"
                }`}
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-4 mb-6">
                <img 
                  src={activeTestimonialModal.avatar} 
                  alt={activeTestimonialModal.name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-emerald-500" 
                />
                <div>
                  <h3 className="font-bold text-lg">{activeTestimonialModal.name}</h3>
                  <p className="text-xs text-emerald-400 font-mono">{activeTestimonialModal.rtRole}</p>
                  <span className="text-[10px] font-mono text-stone-400">{activeTestimonialModal.status}</span>
                </div>
              </div>

              <div className="mb-6">
                <p className="text-sm leading-relaxed font-serif italic">
                  "{activeTestimonialModal.quote}"
                </p>
              </div>

              <div className="flex items-center justify-between text-xs pt-4 border-t border-white/10">
                <span className="font-mono text-stone-400">{activeTestimonialModal.date}</span>
                <button
                  onClick={() => {
                    handleLike(activeTestimonialModal.id);
                  }}
                  className="px-4 py-2 rounded-xl bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30 flex items-center gap-1.5 cursor-pointer"
                >
                  <ThumbsUp className="w-4 h-4" />
                  <span>Apresiasi ({activeTestimonialModal.likes})</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Toast Notification */}
      <AnimatePresence>
        {notificationMsg && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-2xl bg-black/90 text-amber-300 border border-amber-500/40 backdrop-blur-xl shadow-2xl flex items-center gap-2.5 text-xs font-semibold"
          >
            <Trophy className="w-4 h-4 text-amber-400 flex-shrink-0 animate-bounce" />
            <span>{notificationMsg}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

