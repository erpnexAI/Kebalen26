import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Instagram, 
  Facebook, 
  Linkedin, 
  Youtube, 
  Send, 
  CheckCircle2, 
  ExternalLink, 
  MessageSquare,
  Clock,
  Sparkles,
  ShieldCheck,
  Code2,
  Award,
  Building2,
  Users
} from "lucide-react";

interface ContactSectionProps {
  isDayMode: boolean;
}

export function ContactSection({ isDayMode }: ContactSectionProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "Layanan & Administrasi RW",
    message: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.message) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "Layanan & Administrasi RW",
        message: ""
      });
      setTimeout(() => setSubmitted(false), 5000);
    }, 1000);
  };

  const socialLinks = [
    {
      name: "Instagram",
      icon: Instagram,
      url: "https://instagram.com/rw26kebalen",
      handle: "@rw26kebalen",
      color: "hover:text-pink-500 hover:border-pink-500/40 hover:bg-pink-500/10"
    },
    {
      name: "Facebook",
      icon: Facebook,
      url: "https://facebook.com/rw26kebalen",
      handle: "RW 26 Kebalen",
      color: "hover:text-blue-500 hover:border-blue-500/40 hover:bg-blue-500/10"
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      url: "https://linkedin.com/company/rw26kebalen",
      handle: "RW 26 Kebalen Official",
      color: "hover:text-sky-500 hover:border-sky-500/40 hover:bg-sky-500/10"
    },
    {
      name: "YouTube",
      icon: Youtube,
      url: "https://youtube.com/@rw26kebalen",
      handle: "Kebalen 26 Channel",
      color: "hover:text-red-500 hover:border-red-500/40 hover:bg-red-500/10"
    }
  ];

  return (
    <footer id="contact" className="relative w-full pt-16 sm:pt-24 pb-12 px-4 sm:px-8 md:px-12 overflow-hidden transition-colors duration-500 border-t border-white/10 scroll-mt-20 sm:scroll-mt-24">
      {/* Background Accent Glows */}
      <div className={`absolute top-0 right-1/3 w-[500px] h-[500px] rounded-full blur-[150px] pointer-events-none transition-opacity duration-500 ${
        isDayMode ? "bg-emerald-200/30 opacity-40" : "bg-emerald-950/20 opacity-50"
      }`} />
      <div className={`absolute bottom-10 left-10 w-[350px] h-[350px] rounded-full blur-[130px] pointer-events-none transition-opacity duration-500 ${
        isDayMode ? "bg-teal-200/30 opacity-30" : "bg-teal-950/20 opacity-40"
      }`} />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold tracking-wider uppercase mb-3 border backdrop-blur-md ${
              isDayMode 
                ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-700" 
                : "bg-emerald-500/15 border-emerald-500/30 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.2)]"
            }`}
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Hubungi Sekretariat & Pengurus</span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className={`text-3xl sm:text-5xl font-sans font-bold tracking-tight ${
              isDayMode ? "text-stone-900" : "text-[#E1E0CC]"
            }`}
          >
            Contact <span className="italic font-serif text-emerald-500 underline decoration-emerald-500/30 underline-offset-8">Us</span>
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className={`mt-3 text-sm sm:text-base leading-relaxed ${
              isDayMode ? "text-stone-600" : "text-[#E1E0CC]/70"
            }`}
          >
            Layanan administrasi digital, informasi lokasi balai warga, jejaring media sosial, dan kanal pengaduan terpadu warga RW 26 Kebalen.
          </motion.p>
        </div>

        {/* Main 2-Column Grid: Left (Logo RW 26) & Right (Address, Email, Socials & Message Form) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 items-start">
          
          {/* ================= LEFT SIDE: LOGO RW 26 & EMBLEM CARD ================= */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 h-full flex flex-col justify-between"
          >
            <div className={`p-8 sm:p-10 rounded-3xl border backdrop-blur-2xl text-center relative overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] md:hover:scale-[1.01] ${
              isDayMode
                ? "bg-white/95 border-stone-200 shadow-xl shadow-stone-200/60"
                : "bg-stone-950/90 border-white/10 shadow-2xl"
            }`}>
              {/* Vibrant Ambient Glows - Clear & Bright */}
              <div className="absolute -top-12 -left-12 w-48 h-48 bg-emerald-500/25 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-teal-500/25 rounded-full blur-3xl pointer-events-none" />

              {/* Verified Badge Header */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-mono uppercase tracking-widest mb-6">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Official Community Seal</span>
              </div>

              {/* RW 26 LOGO / EMBLEM DESIGN */}
              <div className="relative mx-auto w-36 h-36 sm:w-44 sm:h-44 my-2 flex items-center justify-center">
                {/* Outer Rotating Glowing Ring */}
                <div className="absolute inset-0 rounded-full border-2 border-dashed border-emerald-500/40 animate-[spin_25s_linear_infinite]" />
                <div className="absolute inset-2 rounded-full border border-white/20" />

                {/* Inner Crest Shield - Pure CSS native transition */}
                <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl bg-gradient-to-tr from-emerald-950 via-stone-900 to-emerald-800 border-2 border-emerald-400/50 shadow-[0_0_35px_rgba(16,185,129,0.35)] flex flex-col items-center justify-center p-3 transform rotate-45 md:hover:rotate-0 transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group cursor-pointer">
                  <div className="transform -rotate-45 md:group-hover:rotate-0 transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] flex flex-col items-center">
                    <Building2 className="w-8 h-8 text-emerald-400 mb-0.5" />
                    <span className="font-mono font-black text-2xl sm:text-3xl text-white tracking-wider leading-none">
                      RW<span className="text-emerald-400">26</span>
                    </span>
                    <span className="text-[9px] font-mono text-emerald-300 uppercase tracking-widest mt-1">
                      KEBALEN
                    </span>
                  </div>
                </div>
              </div>

              {/* Organization Titles & Tagline */}
              <div className="mt-6 space-y-2">
                <h3 className={`text-2xl font-bold font-sans tracking-tight ${isDayMode ? "text-stone-900" : "text-white"}`}>
                  RW 26 KEBALEN
                </h3>
                <p className="text-xs font-mono uppercase text-emerald-500 font-semibold tracking-wider">
                  Rukun Warga 26 • Kelurahan Kebalen
                </p>
                <p className={`text-xs max-w-sm mx-auto leading-relaxed pt-2 ${isDayMode ? "text-stone-600" : "text-stone-400"}`}>
                  "Satu Tekad, Sejahtera Bersama" — Pelopor Kampung Digital, Inovatif, & Harmonis di Kecamatan Babelan, Kabupaten Bekasi.
                </p>
              </div>

              {/* Community Stats Highlights */}
              <div className="grid grid-cols-3 gap-2 mt-8 pt-6 border-t border-white/10">
                <div className="p-2.5 rounded-2xl bg-stone-900/40 border border-white/5 transition-transform duration-300 ease-out md:hover:scale-105">
                  <p className="text-emerald-400 font-bold font-mono text-sm sm:text-base">08 RT</p>
                  <p className="text-[10px] text-stone-400">Wilayah RT</p>
                </div>
                <div className="p-2.5 rounded-2xl bg-stone-900/40 border border-white/5 transition-transform duration-300 ease-out md:hover:scale-105">
                  <p className="text-amber-400 font-bold font-mono text-sm sm:text-base">1.4K+</p>
                  <p className="text-[10px] text-stone-400">Total Warga</p>
                </div>
                <div className="p-2.5 rounded-2xl bg-stone-900/40 border border-white/5 transition-transform duration-300 ease-out md:hover:scale-105">
                  <p className="text-sky-400 font-bold font-mono text-sm sm:text-base">24/7</p>
                  <p className="text-[10px] text-stone-400">Pelayanan</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ================= RIGHT SIDE: ADDRESS, EMAIL, SOCIAL MEDIA & MESSAGE FORM ================= */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7 space-y-6"
          >
            {/* Top Right Box: Contact Info (Address, Telephone, Email) */}
            <div className={`p-6 sm:p-7 rounded-3xl border backdrop-blur-xl transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] md:hover:scale-[1.01] ${
              isDayMode
                ? "bg-white/95 border-stone-200 shadow-lg shadow-stone-200/50"
                : "bg-stone-950/90 border-white/10 shadow-2xl"
            }`}>
              {/* Address */}
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3.5 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex-shrink-0 transition-transform duration-300 md:hover:scale-110">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className={`font-bold text-base sm:text-lg ${isDayMode ? "text-stone-900" : "text-[#E1E0CC]"}`}>
                    Alamat Sekretariat & Balai Warga
                  </h4>
                  <p className={`text-xs sm:text-sm mt-1 leading-relaxed ${isDayMode ? "text-stone-600" : "text-[#E1E0CC]/75"}`}>
                    Gedung Balai Warga RW 26, Jl. Kebalen Raya No. 26, Kel. Kebalen, Kec. Babelan, Kabupaten Bekasi, Jawa Barat 17610
                  </p>
                </div>
              </div>

              {/* Telephone & Email Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-white/10">
                {/* Telephone */}
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <p className={`text-[10px] font-mono uppercase ${isDayMode ? "text-stone-400" : "text-stone-500"}`}>Telepon / WhatsApp</p>
                    <a 
                      href="https://wa.me/6281234567890" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className={`text-xs font-bold font-mono hover:text-emerald-400 transition-colors ${isDayMode ? "text-stone-800" : "text-stone-200"}`}
                    >
                      +62 812-3456-7890
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <p className={`text-[10px] font-mono uppercase ${isDayMode ? "text-stone-400" : "text-stone-500"}`}>Email Resmi</p>
                    <a 
                      href="mailto:sekretariat@rw26kebalen.id" 
                      className={`text-xs font-bold font-mono hover:text-emerald-400 transition-colors ${isDayMode ? "text-stone-800" : "text-stone-200"}`}
                    >
                      sekretariat@rw26kebalen.id
                    </a>
                  </div>
                </div>
              </div>

              {/* Service Hours Note */}
              <div className={`mt-5 p-3 rounded-2xl border flex items-center gap-3 ${
                isDayMode ? "bg-stone-50 border-stone-200 text-stone-700" : "bg-stone-900/60 border-white/5 text-stone-300"
              }`}>
                <Clock className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <p className="text-xs">
                  <span className="font-bold">Jam Layanan Tatap Muka:</span> Senin – Sabtu (08.00 – 20.00 WIB)
                </p>
              </div>
            </div>

            {/* Middle Right Box: Social Media Channels (Instagram, Facebook, LinkedIn, YouTube) */}
            <div className={`p-6 sm:p-7 rounded-3xl border backdrop-blur-xl transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] md:hover:scale-[1.01] ${
              isDayMode
                ? "bg-white/95 border-stone-200 shadow-lg shadow-stone-200/50"
                : "bg-stone-950/90 border-white/10 shadow-2xl"
            }`}>
              <h4 className={`font-bold text-base sm:text-lg mb-4 flex items-center justify-between ${isDayMode ? "text-stone-900" : "text-[#E1E0CC]"}`}>
                <span>Media Sosial Resmi RW 26</span>
                <Sparkles className="w-4 h-4 text-emerald-400" />
              </h4>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {socialLinks.map((social) => {
                  const IconComp = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-3 rounded-2xl border transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] flex flex-col items-center text-center group cursor-pointer md:hover:scale-105 md:hover:-translate-y-1 ${
                        isDayMode 
                          ? "bg-stone-50/90 border-stone-200 text-stone-700 hover:bg-white hover:border-emerald-500/40 hover:shadow-md" 
                          : "bg-stone-900/80 border-white/10 text-stone-300 hover:bg-stone-800/90 hover:border-emerald-500/40 hover:shadow-lg hover:shadow-emerald-950/30"
                      } ${social.color}`}
                    >
                      <div className="p-2.5 rounded-xl bg-black/20 text-current mb-2 transition-transform duration-300 ease-out md:group-hover:scale-110">
                        <IconComp className="w-5 h-5" />
                      </div>
                      <p className="text-xs font-bold leading-tight flex items-center gap-0.5">
                        <span>{social.name}</span>
                        <ExternalLink className="w-2.5 h-2.5 opacity-0 md:group-hover:opacity-100 transition-opacity duration-300" />
                      </p>
                      <p className="text-[10px] font-mono text-stone-400 truncate w-full mt-0.5">{social.handle}</p>
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Bottom Right Box: Quick Message / Aspirasi Form */}
            <div className={`p-6 sm:p-7 rounded-3xl border backdrop-blur-xl transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] relative overflow-hidden md:hover:scale-[1.01] ${
              isDayMode
                ? "bg-white/95 border-stone-200 shadow-xl shadow-stone-200/60"
                : "bg-stone-950/90 border-white/10 shadow-2xl"
            }`}>
              <div className="flex items-center gap-3 mb-5">
                <div className="p-2.5 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <h4 className={`font-bold text-base sm:text-lg ${isDayMode ? "text-stone-900" : "text-[#E1E0CC]"}`}>
                    Kirim Pesan / Aspirasi Warga
                  </h4>
                  <p className={`text-xs ${isDayMode ? "text-stone-500" : "text-stone-400"}`}>
                    Langsung terhubung dengan sistem layanan terpadu Sekretariat RW 26.
                  </p>
                </div>
              </div>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={`p-6 rounded-2xl text-center border my-4 ${
                    isDayMode ? "bg-emerald-50 border-emerald-200 text-emerald-900" : "bg-emerald-950/40 border-emerald-500/40 text-emerald-200"
                  }`}
                >
                  <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto mb-2 animate-bounce" />
                  <h5 className="font-bold text-base mb-1">Pesan Berhasil Terkirim!</h5>
                  <p className="text-xs leading-relaxed">
                    Terima kasih telah menghubungi Sekretariat RW 26 Kebalen. Pengurus kami akan segera merespons.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className={`block text-[10px] font-mono font-semibold uppercase mb-1 ${isDayMode ? "text-stone-700" : "text-stone-300"}`}>
                        Nama Lengkap *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Nama Anda..."
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className={`w-full px-3.5 py-2.5 rounded-xl border text-xs outline-none transition-all ${
                          isDayMode
                            ? "bg-stone-50 border-stone-300 focus:border-emerald-600 focus:bg-white text-stone-900"
                            : "bg-stone-900 border-white/10 focus:border-emerald-400 focus:bg-stone-900 text-white"
                        }`}
                      />
                    </div>

                    <div>
                      <label className={`block text-[10px] font-mono font-semibold uppercase mb-1 ${isDayMode ? "text-stone-700" : "text-stone-300"}`}>
                        Nomor WhatsApp
                      </label>
                      <input
                        type="tel"
                        placeholder="0812-xxxx-xxxx"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className={`w-full px-3.5 py-2.5 rounded-xl border text-xs outline-none transition-all ${
                          isDayMode
                            ? "bg-stone-50 border-stone-300 focus:border-emerald-600 focus:bg-white text-stone-900"
                            : "bg-stone-900 border-white/10 focus:border-emerald-400 focus:bg-stone-900 text-white"
                        }`}
                      />
                    </div>
                  </div>

                  <div>
                    <label className={`block text-[10px] font-mono font-semibold uppercase mb-1 ${isDayMode ? "text-stone-700" : "text-stone-300"}`}>
                      Isi Pesan / Aspirasi *
                    </label>
                    <textarea
                      required
                      rows={3}
                      placeholder="Tuliskan pesan, saran, atau pertanyaan Anda..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-xs outline-none transition-all leading-relaxed ${
                        isDayMode
                          ? "bg-stone-50 border-stone-300 focus:border-emerald-600 focus:bg-white text-stone-900"
                          : "bg-stone-900 border-white/10 focus:border-emerald-400 focus:bg-stone-900 text-white"
                      }`}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-3 px-5 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-lg cursor-pointer ${
                      isDayMode
                        ? "bg-emerald-600 text-white hover:bg-emerald-700 shadow-emerald-600/20"
                        : "bg-emerald-500 text-black hover:bg-emerald-400 shadow-emerald-500/30"
                    }`}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                        Sending...
                      </span>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5 stroke-[2.5]" />
                        <span>Kirim Pesan ke Pengurus</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

          </motion.div>
        </div>

        {/* ================= BOTTOM BAR: COPYRIGHT & POWERED BY NEXAPPS ================= */}
        <div className={`pt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono ${
          isDayMode ? "border-stone-200 text-stone-500" : "border-white/10 text-stone-400"
        }`}>
          <div>
            <p>© 2026 RW 26 Kebalen. Hak Cipta Dilindungi Undang-Undang.</p>
            <p className="text-[10px] opacity-75 mt-0.5">Sistem Portal Inovasi Smart Village & Layanan Komunitas Digital Terpadu.</p>
          </div>

          {/* DEVELOPER ATTRIBUTION NOTE AS REQUESTED */}
          <div className="flex items-center gap-2 px-4 py-2.5 rounded-2xl border backdrop-blur-md bg-stone-900/90 border-emerald-500/40 text-emerald-300 shadow-xl group transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] md:hover:scale-105 md:hover:border-emerald-400">
            <Code2 className="w-4 h-4 text-emerald-400 md:group-hover:rotate-12 transition-transform duration-300" />
            <span className="text-[11px] text-stone-300">Developer of this application:</span>
            <a 
              href="https://instagram.com/erpnexapps" 
              target="_blank" 
              rel="noopener noreferrer"
              className="font-bold text-amber-300 hover:text-amber-200 underline decoration-amber-300/40 underline-offset-4 flex items-center gap-1.5 transition-colors"
            >
              <span>Powered by Nexapps</span>
              <Instagram className="w-3.5 h-3.5 inline text-pink-400" />
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}

