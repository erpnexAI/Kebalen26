import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Calendar, 
  Clock, 
  ArrowRight, 
  Filter, 
  Tag, 
  X, 
  ChevronRight, 
  BookOpen, 
  Share2 
} from "lucide-react";

interface NewsSectionProps {
  isDayMode: boolean;
}

interface Article {
  id: number;
  category: "Kegiatan" | "Pengumuman" | "Teknologi";
  title: string;
  excerpt: string;
  content: string[];
  image: string;
  date: string;
  readTime: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  tags: string[];
}

export function NewsSection({ isDayMode }: NewsSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("Semua");
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  const categories = ["Semua", "Kegiatan", "Pengumuman", "Teknologi"];

  const articles: Article[] = [
    {
      id: 1,
      category: "Teknologi",
      title: "Pemanfaatan IoT Pada Sistem Hidroponik Otomatis Kebalen 26",
      excerpt: "Bagaimana integrasi sensor kelembaban tanah dan otomasi penyiraman berbasis panel surya meningkatkan produktivitas kebun ketahanan pangan warga.",
      content: [
        "Kebalen 26 terus memperkuat identitasnya sebagai kawasan pelopor teknologi warga. Melalui inisiatif RW26 Lab, tim inovasi teknologi kami berhasil menyelesaikan instalasi sistem Internet of Things (IoT) pada area pertanian hidroponik Balai Warga.",
        "Sistem ini menggunakan mikrokontroler hemat energi yang ditenagai langsung oleh sistem panel surya 2.5 KWp yang telah terpasang sebelumnya. Sensor kelembaban tanah, temperatur, dan kadar nutrisi air mengirimkan data secara real-time ke database pusat setiap 5 menit.",
        "Dengan otomasi katup air cerdas, tanaman hidroponik hanya menerima aliran air dan nutrisi ketika parameter lingkungan menunjukkan kebutuhan yang kritis. Pendekatan presisi ini berhasil mereduksi penggunaan air hingga 40% sekaligus mempercepat siklus panen sayuran selada dan pakcoy menjadi hanya 22 hari.",
        "Ketua RW Tri Handoko Putro mengapresiasi kerja keras tim pemuda teknologi di bawah koordinasi Arifraj, ST. Mci. 'Inovasi ini membuktikan bahwa teknologi tinggi bukan hanya monopoli industri besar, melainkan instrumen yang sangat aplikatif untuk meningkatkan taraf hidup di tingkat rukun warga secara mandiri dan berkelanjutan,' ujarnya saat demonstrasi panen perdana kemarin sore."
      ],
      image: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?q=80&w=800&auto=format&fit=crop",
      date: "21 Juli 2026",
      readTime: "4 mnt baca",
      author: {
        name: "Arifraj, ST. Mci.",
        role: "Tim Teknologi & Inovasi",
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100&auto=format&fit=crop"
      },
      tags: ["IoT", "Hidroponik", "Teknologi Hijau"]
    },
    {
      id: 2,
      category: "Kegiatan",
      title: "Kerja Bakti Akbar: Penataan Jalur Evakuasi dan Penghijauan Lingkungan",
      excerpt: "Warga RW26 bahu-membahu merapikan rute evakuasi darurat, melakukan penanaman pohon pelindung, serta menguji fungsi fisik Panic Button lingkungan.",
      content: [
        "Menjaga kerukunan sosial sekaligus kesiapsiagaan lingkungan, RW26 menggelar agenda Kerja Bakti Akbar yang diikuti oleh lebih dari 150 warga dari seluruh klaster RT.",
        "Fokus utama kegiatan kali ini adalah penataan ulang jalur evakuasi darurat serta pembersihan menyeluruh pada titik kumpul utama di dekat Balai Warga. Selain merapikan dahan pohon yang menghalangi penerangan jalan, warga juga menanam 50 bibit pohon pelindung jenis ketapang kencana untuk menambah keasrian lingkungan.",
        "Di sela-sela kerja bakti, tim keamanan yang dipimpin oleh Bapak Jatmiko juga melakukan uji coba fungsionalitas sistem darurat fisik (Panic Button) yang tersebar di lima titik strategis. Pengujian ini memastikan sinyal bahaya terkirim secara instan ke pos penjagaan utama dan handphone jajaran pengurus.",
        "Sekretaris RW Bapak Sumaryadi menyatakan kepuasannya terhadap tingginya partisipasi aktif masyarakat. 'Sinergi fisik seperti kerja bakti inilah ruh dari gerakan BE.R.JU.AN.G kita. Teknologi mendukung efisiensi, tetapi kebersamaan warga adalah motor penggerak utamanya,' pungkas beliau saat menikmati jamuan makan siang bersama warga."
      ],
      image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=800&auto=format&fit=crop",
      date: "19 Juli 2026",
      readTime: "3 mnt baca",
      author: {
        name: "Sumaryadi S.IT",
        role: "Sekretaris RW",
        avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?q=80&w=100&auto=format&fit=crop"
      },
      tags: ["Kerja Bakti", "Solidaritas", "Mitigasi"]
    },
    {
      id: 3,
      category: "Pengumuman",
      title: "Laporan Transparansi Keuangan Kas Bulanan Juni 2026 Dirilis",
      excerpt: "Wujudkan akuntabilitas penuh, Bendahara RW menerbitkan rincian sirkulasi keuangan operasional, realisasi program energi surya, dan saldo kas umum warga.",
      content: [
        "Sebagai bagian dari komitmen keterbukaan informasi publik dan akuntabilitas 100%, Ibu Lintar Varia Gutomo S.E. selaku Bendahara RW resmi mempublikasikan laporan keuangan kas bulanan periode Juni 2026.",
        "Laporan mendetail ini mencakup seluruh pos pemasukan iuran swadaya warga, donasi tidak mengikat, serta rincian pengeluaran operasional pos keamanan, kebersihan, biaya perawatan solar grid, hingga alokasi dana bantuan sosial darurat warga.",
        "Saldo akhir kas umum tercatat dalam kondisi sehat dan surplus, terbantu secara signifikan oleh penghematan tagihan listrik Balai Warga pasca operasional penuh panel surya cerdas 2.5 KWp yang memangkas beban biaya bulanan hingga 35%.",
        "Warga kini dapat melihat, meneliti, dan mengunduh seluruh berkas kuitansi transaksi yang telah dipindai melalui portal RW digital secara langsung kapan saja. 'Setiap rupiah yang diamanahkan wajib dipertanggungjawabkan secara presisi. Transparansi adalah kunci kokohnya kepercayaan warga kepada pengurus,' tegas Ibu Lintar dalam keterangan tertulisnya."
      ],
      image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=800&auto=format&fit=crop",
      date: "15 Juli 2026",
      readTime: "3 mnt baca",
      author: {
        name: "Lintar Varia Gutomo S.E.",
        role: "Bendahara RW",
        avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=100&auto=format&fit=crop"
      },
      tags: ["Keuangan", "Transparansi", "Kas RW"]
    },
    {
      id: 4,
      category: "Teknologi",
      title: "Workshop Kecerdasan Buatan dan Robotika Dasar Untuk Anak-Anak RW26",
      excerpt: "Inkubasi digital sejak dini: puluhan anak-anak antusias mempelajari logika pemrograman visual dan perakitan robot pemilah sampah pintar.",
      content: [
        "Inkubator edukasi RW26 Lab kembali menyelenggarakan kelas khusus akhir pekan yang berfokus pada teknologi masa depan. Kali ini, topik yang diangkat adalah 'Pengenalan Logika AI & Robotika Ramah Anak' yang diikuti oleh 30 anak usia sekolah dasar dan menengah pertama.",
        "Menggunakan platform pemrograman blok visual yang interaktif, anak-anak diajak merancang algoritma logika sederhana guna mengontrol simulasi robot virtual untuk mengumpulkan sampah berdasarkan kategorinya.",
        "Pada sesi praktis, anak-anak bekerja kelompok merakit kit robot fisik sederhana berbasis sensor ultrasonik dan warna. Dengan bimbingan mentor muda, mereka memprogram robot tersebut agar dapat mendeteksi serta memilah sampah plastik dari sampah organik secara otomatis.",
        "Ketua RW Tri Handoko Putro menyatakan komitmen jangka panjang untuk program edukasi ini. 'Masa depan adalah milik mereka yang memahami bahasa masa depan, yaitu teknologi. Dengan mengenalkannya secara ceria dan aplikatif sejak dini, kita sedang meletakkan pondasi bagi generasi emas Kebalen 26 yang inovatif.'"
      ],
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=800&auto=format&fit=crop",
      date: "10 Juli 2026",
      readTime: "5 mnt baca",
      author: {
        name: "Arifraj, ST. Mci.",
        role: "Tim Teknologi & Inovasi",
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100&auto=format&fit=crop"
      },
      tags: ["Edukasi", "Robotika", "Kreativitas"]
    }
  ];

  const filteredArticles = selectedCategory === "Semua" 
    ? articles 
    : articles.filter(art => art.category === selectedCategory);

  return (
    <section 
      id="news" 
      className={`relative w-full py-24 sm:py-32 px-4 sm:px-8 md:px-16 overflow-hidden transition-colors duration-500 scroll-mt-20 sm:scroll-mt-24 ${
        isDayMode ? "bg-[#fcfbf9]" : "bg-[#030303]"
      }`}
    >
      {/* Background Cyber Tech Grid */}
      <div className={`absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none z-0 ${
        isDayMode ? "opacity-10" : "opacity-20"
      }`} />

      {/* Cyberpunk accent rings */}
      <div className="absolute top-1/3 right-10 w-[300px] h-[300px] bg-emerald-500/5 rounded-full filter blur-[100px] pointer-events-none z-0" />
      <div className="absolute bottom-1/3 left-10 w-[300px] h-[300px] bg-amber-500/5 rounded-full filter blur-[100px] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="mb-12 sm:mb-16">
          <div className="flex items-center gap-2 mb-3">
            <span className={`text-[10px] font-mono font-bold tracking-widest px-2.5 py-1 rounded-md border ${
              isDayMode 
                ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-700" 
                : "bg-emerald-500/5 border-emerald-500/15 text-emerald-400"
            }`}>
              [DB_SYS // BLOG_NEWS_INFORMASI]
            </span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
            <div className="lg:col-span-8 space-y-4">
              <motion.h2 
                initial={{ opacity: 0, y: 28, filter: "blur(8px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className={`text-4xl sm:text-5xl md:text-6xl font-flared font-bold italic leading-none tracking-tight ${
                  isDayMode ? "text-emerald-600" : "text-[#E1E0CC]"
                }`}
              >
                <motion.span
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
                  className="inline-block"
                >
                  Kabar Kebalen<span className="text-emerald-400 font-sans not-italic">.</span>
                </motion.span>{" "}
                <br />
                <motion.span
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
                  className="text-emerald-400 not-italic font-sans font-bold tracking-tight inline-block"
                >
                  Blog & Informasi
                </motion.span>
              </motion.h2>
              <motion.div 
                initial={{ scaleX: 0, originX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.45, ease: "easeOut" }}
                className={`h-[1px] w-32 bg-gradient-to-r ${
                  isDayMode ? "from-emerald-500/50 to-transparent" : "from-emerald-400/50 to-transparent"
                }`} 
              />
            </div>

            {/* Filter Pills right-aligned */}
            <div className="lg:col-span-4 flex flex-wrap gap-2 justify-start lg:justify-end">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-1.5 rounded-full text-xs font-sans font-medium transition-all duration-300 border ${
                    selectedCategory === cat
                      ? "bg-emerald-400 border-emerald-400 text-stone-950 shadow-[0_0_15px_rgba(16,185,129,0.3)] scale-105 font-semibold"
                      : isDayMode
                      ? "border-stone-200 bg-white text-stone-600 hover:border-emerald-500/40 hover:text-emerald-600"
                      : "border-white/10 bg-white/5 text-stone-300 hover:border-emerald-400/30 hover:text-emerald-400"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <AnimatePresence mode="popLayout">
            {filteredArticles.map((art) => {
              const accentColor = 
                art.category === "Teknologi" 
                  ? "text-emerald-400" 
                  : art.category === "Pengumuman" 
                  ? "text-amber-400" 
                  : "text-blue-400";

              const accentBorder = 
                art.category === "Teknologi" 
                  ? "hover:border-emerald-500/40" 
                  : art.category === "Pengumuman" 
                  ? "hover:border-amber-500/40" 
                  : "hover:border-blue-500/40";

              return (
                <motion.article
                  key={art.id}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5, type: "spring", stiffness: 120, damping: 18 }}
                  onClick={() => setSelectedArticle(art)}
                  className={`group relative flex flex-col justify-between h-[500px] rounded-[24px] overflow-hidden border transition-all duration-500 cursor-pointer ${
                    isDayMode 
                      ? "bg-white border-stone-200/80 shadow-[0_10px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_50px_rgba(16,185,129,0.05)]" 
                      : "bg-neutral-900/40 border-white/5 shadow-[0_15px_40px_rgba(0,0,0,0.4)] hover:shadow-[0_25px_60px_rgba(16,185,129,0.1)]"
                  } ${accentBorder}`}
                >
                  {/* Image Header with smooth zoom */}
                  <div className="relative h-[200px] w-full overflow-hidden">
                    <img 
                      src={art.image} 
                      alt={art.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] scale-100 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4 z-10">
                      <span className={`text-[9px] font-mono font-bold tracking-widest uppercase px-2.5 py-1 rounded-md bg-black/85 text-white border border-white/10`}>
                        {art.category}
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 flex flex-col justify-between flex-grow">
                    <div className="space-y-3">
                      {/* Meta Date & Time */}
                      <div className="flex items-center gap-3 text-[10px] font-mono text-stone-500">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" /> {art.date}
                        </span>
                        <span className="w-1 h-1 rounded-full bg-stone-500/40" />
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {art.readTime}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className={`text-lg font-serif font-bold tracking-tight line-clamp-2 transition-colors duration-300 ${
                        isDayMode ? "text-stone-900 group-hover:text-emerald-600" : "text-white group-hover:text-emerald-400"
                      }`}>
                        {art.title}
                      </h3>

                      {/* Excerpt */}
                      <p className={`text-xs leading-relaxed font-light line-clamp-3 ${
                        isDayMode ? "text-stone-600" : "text-stone-400"
                      }`}>
                        {art.excerpt}
                      </p>
                    </div>

                    {/* Footer Row */}
                    <div className="pt-4 border-t border-stone-500/10 flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <img 
                          src={art.author.avatar} 
                          alt={art.author.name} 
                          referrerPolicy="no-referrer"
                          className="w-7 h-7 rounded-full object-cover border border-stone-500/20"
                        />
                        <div>
                          <span className={`text-[10px] font-bold block ${
                            isDayMode ? "text-stone-800" : "text-stone-100"
                          }`}>
                            {art.author.name}
                          </span>
                          <span className="text-[8px] font-mono text-stone-500 uppercase">
                            {art.author.role}
                          </span>
                        </div>
                      </div>

                      {/* Arrow circle */}
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-300 ${
                        isDayMode 
                          ? "border-stone-200 bg-stone-50 text-stone-800 group-hover:bg-emerald-500 group-hover:border-emerald-500 group-hover:text-white" 
                          : "border-white/10 bg-white/5 text-stone-300 group-hover:bg-emerald-400 group-hover:border-emerald-400 group-hover:text-stone-950"
                      }`}>
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Detailed Article Reader Modal */}
        <AnimatePresence>
          {selectedArticle && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 select-none">
              
              {/* Blur backdrop overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedArticle(null)}
                className="absolute inset-0 bg-black/85 backdrop-blur-md"
              />

              {/* Reader Container */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                transition={{ type: "spring", duration: 0.5 }}
                className={`relative w-full max-w-3xl h-[85vh] sm:h-[80vh] rounded-[28px] overflow-hidden border flex flex-col justify-between z-10 ${
                  isDayMode ? "bg-[#fbf9f6] border-stone-200 text-stone-900" : "bg-stone-950 border-white/10 text-white"
                }`}
              >
                {/* Header Image Cover */}
                <div className="relative h-[240px] sm:h-[280px] shrink-0 w-full overflow-hidden">
                  <img 
                    src={selectedArticle.image} 
                    alt={selectedArticle.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                  
                  {/* Category Tag */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="text-[10px] font-mono font-bold tracking-widest uppercase px-3 py-1.5 rounded-md bg-emerald-500 text-stone-950">
                      {selectedArticle.category}
                    </span>
                  </div>

                  {/* Close button in top right */}
                  <button
                    onClick={() => setSelectedArticle(null)}
                    className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/80 border border-white/10 text-white hover:bg-white hover:text-stone-950 flex items-center justify-center transition-all duration-300 z-20 active:scale-90"
                    title="Close"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  {/* Title stacked over image */}
                  <div className="absolute bottom-6 left-6 right-6 z-10 text-white">
                    <div className="flex items-center gap-3 text-[10px] font-mono text-stone-300 mb-2">
                      <span>{selectedArticle.date}</span>
                      <span>•</span>
                      <span>{selectedArticle.readTime}</span>
                    </div>
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold tracking-tight leading-tight">
                      {selectedArticle.title}
                    </h2>
                  </div>
                </div>

                {/* Article Body Content Scroll Area */}
                <div className="flex-grow overflow-y-auto p-6 sm:p-8 space-y-6 scrollbar-thin scrollbar-thumb-stone-500/20">
                  {/* Author line info */}
                  <div className="flex items-center gap-4 py-3 border-b border-stone-500/10">
                    <img 
                      src={selectedArticle.author.avatar} 
                      alt={selectedArticle.author.name}
                      referrerPolicy="no-referrer"
                      className="w-10 h-10 rounded-full object-cover border border-stone-500/20"
                    />
                    <div>
                      <span className="text-xs font-bold block">
                        Ditulis oleh {selectedArticle.author.name}
                      </span>
                      <span className="text-[10px] font-mono text-stone-500 uppercase">
                        {selectedArticle.author.role}
                      </span>
                    </div>
                  </div>

                  {/* Paragraph text blocks */}
                  <div className="space-y-4 text-sm sm:text-base font-sans font-light leading-relaxed text-stone-700 dark:text-stone-300">
                    {selectedArticle.content.map((p, idx) => (
                      <p key={idx} className={isDayMode ? "text-stone-700" : "text-stone-300"}>
                        {p}
                      </p>
                    ))}
                  </div>

                  {/* Tags list */}
                  <div className="flex flex-wrap gap-2 pt-4">
                    {selectedArticle.tags.map((tag) => (
                      <span 
                        key={tag}
                        className={`text-[10px] font-mono tracking-wider px-2.5 py-1 rounded-md border flex items-center gap-1 ${
                          isDayMode 
                            ? "bg-stone-100 border-stone-200 text-stone-600" 
                            : "bg-white/5 border-white/5 text-stone-300"
                        }`}
                      >
                        <Tag className="w-2.5 h-2.5 text-emerald-400" />
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Modal Footer Controls */}
                <div className="shrink-0 p-4 border-t border-stone-500/10 flex items-center justify-between bg-stone-500/[0.02]">
                  <span className="text-[10px] font-mono text-stone-400 uppercase tracking-widest">
                    PUBLISHED // RW26 COMMUNICATIONS
                  </span>
                  
                  <button
                    onClick={() => setSelectedArticle(null)}
                    className="px-5 py-2 rounded-xl text-xs font-sans font-semibold border bg-emerald-400 text-stone-950 border-emerald-400 hover:opacity-90 active:scale-95 transition-all"
                  >
                    Tutup Artikel
                  </button>
                </div>

              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
