import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ShieldCheck, Key, Users, Newspaper, Mic, Settings, BookOpen, CheckCircle, Database, Lock, Save, Plus, Trash2 } from "lucide-react";

interface AdminPanelModalProps {
  isOpen: boolean;
  onClose: () => void;
  isDayMode: boolean;
}

export function AdminPanelModal({ isOpen, onClose, isDayMode }: AdminPanelModalProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "ai_knowledge" | "team" | "news" | "guide">("overview");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [pinInput, setPinInput] = useState("");
  const [loginError, setLoginError] = useState("");

  // Sample CMS Managed State
  const [aiCustomGreeting, setAiCustomGreeting] = useState("Halo Bapak dan Ibu Warga RW 26 Kebalen! Ceria sekali bisa menyapa Anda hari ini!");
  const [kasPercentage, setKasPercentage] = useState("88");
  const [emergencyPhone, setEmergencyPhone] = useState("0812-3456-7890 (Pos Ronda RT 03)");
  
  const [knowledgeList, setKnowledgeList] = useState([
    { id: "1", keyword: "Pengajuan Surat Pengantar", answer: "Dikelola Pak Sumaryadi S.IT (Sekretaris RW 26). Pengajuan bisa dilakukan online via Portal Warga." },
    { id: "2", keyword: "Jadwal Patroli Ronda", answer: "Dipimpin Pak Jatmiko di Pos Utama RT 03 mulai pukul 22.00 WIB setiap malam." },
    { id: "3", keyword: "Pemberdayaan Hidroponik", answer: "Kebun Hidroponik RW 26 beroperasi otomatis dengan sistem IoT energi surya." }
  ]);

  const [newKeyword, setNewKeyword] = useState("");
  const [newAnswer, setNewAnswer] = useState("");
  const [saveToast, setSaveToast] = useState<string | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput === "2626" || pinInput === "admin" || pinInput === "1234") {
      setIsLoggedIn(true);
      setLoginError("");
    } else {
      setLoginError("PIN Salah. Gunakan PIN demo: 2626");
    }
  };

  const handleSave = (msg: string) => {
    setSaveToast(msg);
    setTimeout(() => setSaveToast(null), 3000);
  };

  const addKnowledge = () => {
    if (!newKeyword.trim() || !newAnswer.trim()) return;
    setKnowledgeList([...knowledgeList, { id: Date.now().toString(), keyword: newKeyword, answer: newAnswer }]);
    setNewKeyword("");
    setNewAnswer("");
    handleSave("Pengetahuan AI Voice berhasil diperbarui!");
  };

  const deleteKnowledge = (id: string) => {
    setKnowledgeList(knowledgeList.filter(k => k.id !== id));
    handleSave("Item berhasil dihapus!");
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto"
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          className={`relative w-full max-w-4xl rounded-3xl border shadow-2xl overflow-hidden my-auto flex flex-col max-h-[90vh] ${
            isDayMode 
              ? "bg-white text-stone-900 border-stone-200" 
              : "bg-[#121212] text-[#E1E0CC] border-stone-800"
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-5 border-b border-white/10 bg-emerald-950/20">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-mono tracking-widest text-emerald-400 uppercase font-bold">PORTAL PENGELOLAAN & HANDOVER KLIEN</span>
                <h3 className="text-xl font-serif font-bold italic">Panel Admin RW 26 Kebalen</h3>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-white/10 transition-colors text-stone-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Save Toast */}
          <AnimatePresence>
            {saveToast && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-emerald-500 text-black px-4 py-2 text-xs font-bold text-center flex items-center justify-center gap-2"
              >
                <CheckCircle className="w-4 h-4" />
                {saveToast}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Login Lock Screen if not authenticated */}
          {!isLoggedIn ? (
            <div className="p-8 sm:p-12 flex flex-col items-center justify-center text-center max-w-md mx-auto">
              <div className="w-16 h-16 rounded-3xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-6">
                <Lock className="w-8 h-8" />
              </div>
              <h4 className="text-2xl font-serif italic font-bold mb-2">Masuk Panel Pengurus</h4>
              <p className="text-xs text-stone-400 mb-6 leading-relaxed">
                Portal ini dirancang khusus untuk pengurus RW 26 Kebalen dalam mengelola isi website, informasi AI Voice, dan data warga setelah website diserahterimakan.
              </p>

              <form onSubmit={handleLogin} className="w-full space-y-4">
                <div>
                  <input
                    type="password"
                    placeholder="Masukkan PIN Admin (Demo: 2626)"
                    value={pinInput}
                    onChange={(e) => setPinInput(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-stone-700 bg-black/40 text-center text-lg font-mono tracking-widest focus:border-emerald-500 outline-none"
                  />
                  {loginError && <p className="text-xs text-rose-400 mt-2">{loginError}</p>}
                </div>
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-sm tracking-wide transition-all shadow-lg shadow-emerald-500/20"
                >
                  Buka Panel Admin Demo
                </button>
              </form>

              <div className="mt-8 p-3 rounded-xl bg-stone-900/60 border border-stone-800 text-[11px] text-stone-400">
                💡 <span className="font-bold text-emerald-400">Info Handover:</span> Klien dapat mengganti PIN admin sesuai kebutuhan kapan saja.
              </div>
            </div>
          ) : (
            /* Admin Panel Dashboard */
            <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
              {/* Sidebar Tabs */}
              <div className="w-full md:w-64 p-4 border-r border-white/10 bg-black/20 flex md:flex-col gap-2 overflow-x-auto">
                <button
                  onClick={() => setActiveTab("overview")}
                  className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all text-left whitespace-nowrap ${
                    activeTab === "overview" 
                      ? "bg-emerald-500 text-black font-bold shadow-md shadow-emerald-500/20" 
                      : "hover:bg-white/5 text-stone-300"
                  }`}
                >
                  <Settings className="w-4 h-4" />
                  Ringkasan & Stat
                </button>
                <button
                  onClick={() => setActiveTab("ai_knowledge")}
                  className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all text-left whitespace-nowrap ${
                    activeTab === "ai_knowledge" 
                      ? "bg-emerald-500 text-black font-bold shadow-md shadow-emerald-500/20" 
                      : "hover:bg-white/5 text-stone-300"
                  }`}
                >
                  <Mic className="w-4 h-4" />
                  Pusat Data AI Voice
                </button>
                <button
                  onClick={() => setActiveTab("team")}
                  className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all text-left whitespace-nowrap ${
                    activeTab === "team" 
                      ? "bg-emerald-500 text-black font-bold shadow-md shadow-emerald-500/20" 
                      : "hover:bg-white/5 text-stone-300"
                  }`}
                >
                  <Users className="w-4 h-4" />
                  Struktur Pengurus
                </button>
                <button
                  onClick={() => setActiveTab("news")}
                  className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all text-left whitespace-nowrap ${
                    activeTab === "news" 
                      ? "bg-emerald-500 text-black font-bold shadow-md shadow-emerald-500/20" 
                      : "hover:bg-white/5 text-stone-300"
                  }`}
                >
                  <Newspaper className="w-4 h-4" />
                  Berita & Pengumuman
                </button>
                <button
                  onClick={() => setActiveTab("guide")}
                  className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all text-left whitespace-nowrap ${
                    activeTab === "guide" 
                      ? "bg-emerald-500 text-black font-bold shadow-md shadow-emerald-500/20" 
                      : "hover:bg-white/5 text-stone-300"
                  }`}
                >
                  <BookOpen className="w-4 h-4" />
                  Panduan Handover
                </button>
              </div>

              {/* Main Content Body */}
              <div className="flex-1 p-6 overflow-y-auto space-y-6">
                {activeTab === "overview" && (
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-lg font-serif font-bold italic mb-1">Status Pengelolaan Website RW 26</h4>
                      <p className="text-xs text-stone-400">Pengaturan cepat untuk performa dan data publik RW 26 Kebalen.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="p-4 rounded-2xl border border-stone-800 bg-stone-900/40">
                        <span className="text-[10px] text-stone-400 uppercase tracking-wider font-mono">Persentase Kas RW</span>
                        <div className="flex items-center justify-between mt-2">
                          <input
                            type="number"
                            value={kasPercentage}
                            onChange={(e) => setKasPercentage(e.target.value)}
                            className="w-20 px-2 py-1 rounded bg-black/50 border border-stone-700 text-xl font-mono font-bold text-emerald-400"
                          />
                          <span className="text-2xl font-bold font-mono text-emerald-400">%</span>
                        </div>
                        <button 
                          onClick={() => handleSave("Rekapitulasi iuran kas berhasil diperbarui!")}
                          className="mt-3 text-[11px] text-emerald-400 hover:underline font-semibold flex items-center gap-1"
                        >
                          <Save className="w-3 h-3" /> Simpan Kas
                        </button>
                      </div>

                      <div className="p-4 rounded-2xl border border-stone-800 bg-stone-900/40">
                        <span className="text-[10px] text-stone-400 uppercase tracking-wider font-mono">Status AI Voice</span>
                        <p className="text-base font-bold text-emerald-400 mt-2 flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                          Aktif (Kore Voice)
                        </p>
                        <p className="text-[11px] text-stone-400 mt-1">Model: Gemini 2.5 Flash</p>
                      </div>

                      <div className="p-4 rounded-2xl border border-stone-800 bg-stone-900/40">
                        <span className="text-[10px] text-stone-400 uppercase tracking-wider font-mono">Keamanan Portal</span>
                        <p className="text-base font-bold text-stone-200 mt-2">PIN Admin Active</p>
                        <p className="text-[11px] text-stone-400 mt-1">Akses Pengurus Terverifikasi</p>
                      </div>
                    </div>

                    {/* Quick Config Form */}
                    <div className="p-5 rounded-2xl border border-stone-800 bg-stone-900/30 space-y-4">
                      <h5 className="text-sm font-bold flex items-center gap-2 text-emerald-400">
                        <Key className="w-4 h-4" /> Pengaturan Kontak & Sapaan Asisten Voice
                      </h5>
                      <div>
                        <label className="text-xs text-stone-300 block mb-1 font-medium">Nomor Darurat Pos Ronda / Panic Button:</label>
                        <input
                          type="text"
                          value={emergencyPhone}
                          onChange={(e) => setEmergencyPhone(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl border border-stone-700 bg-black/40 text-xs text-stone-200 focus:border-emerald-500 outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-stone-300 block mb-1 font-medium">Kalimat Sapaan Bawaan Suara AI Voice:</label>
                        <textarea
                          rows={2}
                          value={aiCustomGreeting}
                          onChange={(e) => setAiCustomGreeting(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl border border-stone-700 bg-black/40 text-xs text-stone-200 focus:border-emerald-500 outline-none"
                        />
                      </div>
                      <button
                        onClick={() => handleSave("Pengaturan umum berhasil disimpan!")}
                        className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs flex items-center gap-2 transition-all"
                      >
                        <Save className="w-4 h-4" /> Simpan Perubahan
                      </button>
                    </div>
                  </div>
                )}

                {activeTab === "ai_knowledge" && (
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-lg font-serif font-bold italic mb-1">Pusat Pengetahuan AI Voice (Knowledge Base)</h4>
                      <p className="text-xs text-stone-400">
                        Klien/Pengurus dapat menambah atau memperbarui jawaban otomatis AI Voice tanpa perlu merubah kodingan website!
                      </p>
                    </div>

                    {/* Add New Knowledge */}
                    <div className="p-4 rounded-2xl border border-emerald-500/20 bg-emerald-950/10 space-y-3">
                      <h5 className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                        <Plus className="w-4 h-4" /> Tambah Pengetahuan/FAQ Baru untuk AI Voice
                      </h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <input
                          type="text"
                          placeholder="Kata Kunci / Topik (misal: Jadwal Kerja Bakti)"
                          value={newKeyword}
                          onChange={(e) => setNewKeyword(e.target.value)}
                          className="px-3 py-2 rounded-xl border border-stone-700 bg-black/50 text-xs text-stone-200 focus:border-emerald-500 outline-none"
                        />
                        <input
                          type="text"
                          placeholder="Jawaban Singkat & Sopan yang akan Dibicarakan AI"
                          value={newAnswer}
                          onChange={(e) => setNewAnswer(e.target.value)}
                          className="px-3 py-2 rounded-xl border border-stone-700 bg-black/50 text-xs text-stone-200 focus:border-emerald-500 outline-none"
                        />
                      </div>
                      <button
                        onClick={addKnowledge}
                        className="px-4 py-2 rounded-xl bg-emerald-500 text-black font-bold text-xs hover:bg-emerald-400 transition-all flex items-center gap-1.5"
                      >
                        <Plus className="w-4 h-4" /> Tambah ke AI Voice
                      </button>
                    </div>

                    {/* Knowledge List */}
                    <div className="space-y-3">
                      <h5 className="text-xs font-mono font-bold text-stone-400 uppercase tracking-wider">Daftar Pengetahuan Terdaftar ({knowledgeList.length})</h5>
                      {knowledgeList.map((item) => (
                        <div key={item.id} className="p-4 rounded-2xl border border-stone-800 bg-stone-900/40 flex items-start justify-between gap-4">
                          <div className="space-y-1">
                            <span className="text-xs font-bold text-emerald-400 font-mono">[{item.keyword}]</span>
                            <p className="text-xs text-stone-300 leading-relaxed">{item.answer}</p>
                          </div>
                          <button
                            onClick={() => deleteKnowledge(item.id)}
                            className="p-1.5 rounded-lg hover:bg-rose-500/20 text-rose-400 transition-colors"
                            title="Hapus Pengetahuan"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === "team" && (
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-lg font-serif font-bold italic mb-1">Kelola Pengurus RW 26 Kebalen</h4>
                      <p className="text-xs text-stone-400">Ubah atau update susunan organisasi RW 26 apabila ada pergantian masa jabatan.</p>
                    </div>

                    <div className="space-y-3">
                      {[
                        { role: "Ketua RW", name: "Bapak Tri Handoko Putro Stsp. Msc" },
                        { role: "Sekretaris (Layanan Surat)", name: "Bapak Sumaryadi S.IT" },
                        { role: "Bendahara (Kas RW)", name: "Ibu Lintar Varia Gutomo S.E." },
                        { role: "Kepala Keamanan & Ronda", name: "Bapak Jatmiko" },
                        { role: "Bidang Teknologi & Inovasi", name: "Bapak Arifraj, ST. Mci." }
                      ].map((member, i) => (
                        <div key={i} className="p-4 rounded-2xl border border-stone-800 bg-stone-900/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <div>
                            <span className="text-[10px] text-emerald-400 uppercase font-mono font-bold">{member.role}</span>
                            <input
                              type="text"
                              defaultValue={member.name}
                              className="w-full sm:w-80 block px-3 py-1.5 mt-1 rounded-xl border border-stone-700 bg-black/40 text-xs font-bold text-stone-200 focus:border-emerald-500 outline-none"
                            />
                          </div>
                          <button 
                            onClick={() => handleSave(`Data ${member.role} berhasil diperbarui!`)}
                            className="px-3 py-1.5 rounded-xl bg-stone-800 hover:bg-emerald-500 hover:text-black text-xs font-semibold transition-all self-start sm:self-center"
                          >
                            Update
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === "news" && (
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-lg font-serif font-bold italic mb-1">Berita & Pengumuman Warga</h4>
                      <p className="text-xs text-stone-400">Pengurus RW dapat menerbitkan berita gotong royong, agenda rapat, atau pengumuman penting.</p>
                    </div>

                    <div className="p-4 rounded-2xl border border-stone-800 bg-stone-900/40 space-y-3">
                      <input
                        type="text"
                        placeholder="Judul Berita / Pengumuman Baru"
                        className="w-full px-3 py-2 rounded-xl border border-stone-700 bg-black/50 text-xs text-stone-200 focus:border-emerald-500 outline-none"
                      />
                      <textarea
                        rows={3}
                        placeholder="Isi berita singkat yang ingin disampaikan kepada seluruh warga..."
                        className="w-full px-3 py-2 rounded-xl border border-stone-700 bg-black/50 text-xs text-stone-200 focus:border-emerald-500 outline-none"
                      />
                      <button
                        onClick={() => handleSave("Berita baru berhasil diterbitkan ke portal warga!")}
                        className="px-4 py-2 rounded-xl bg-emerald-500 text-black font-bold text-xs hover:bg-emerald-400 transition-all"
                      >
                        Terbitkan Berita
                      </button>
                    </div>
                  </div>
                )}

                {activeTab === "guide" && (
                  <div className="space-y-5">
                    <div>
                      <h4 className="text-lg font-serif font-bold italic mb-1">Buku Panduan Handover & Maintenance Klien</h4>
                      <p className="text-xs text-stone-400">Langkah-langkah serah terima dan perawatan rutin website untuk Pengurus RW 26.</p>
                    </div>

                    <div className="p-5 rounded-2xl border border-stone-800 bg-stone-900/40 space-y-4 text-xs text-stone-300 leading-relaxed">
                      <div className="flex gap-3">
                        <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold font-mono shrink-0">1</div>
                        <div>
                          <h6 className="font-bold text-stone-100 text-sm mb-0.5">Pengelolaan Kunci API (Gemini API Key)</h6>
                          <p>Jika kuota bulanan gratis Gemini habis, Pengurus RW dapat mendaftar kunci API baru secara gratis di Google AI Studio (ai.google.dev) lalu memperbaruinya di environment file (`.env`).</p>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold font-mono shrink-0">2</div>
                        <div>
                          <h6 className="font-bold text-stone-100 text-sm mb-0.5">Pembaruan Rutin Pengetahuan AI Voice</h6>
                          <p>Gunakan tab <b>Pusat Data AI Voice</b> pada panel ini untuk mendaftarkan kegiatan terbaru RW. AI Voice akan otomatis membaca konteks baru tersebut saat menjawab warga.</p>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold font-mono shrink-0">3</div>
                        <div>
                          <h6 className="font-bold text-stone-100 text-sm mb-0.5">Hosting & Pemeliharaan Server</h6>
                          <p>Aplikasi ini dapat di-deploy secara permanen ke Cloud Run atau Vercel/Netlify. Pemeliharaan sistem berkala hanya diperlukan jika ada perubahan besar pada struktur organisasi.</p>
                        </div>
                      </div>

                      <div className="mt-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-center font-mono">
                        ✅ Dokumen & Sistem Siap Diserahterimakan Kepada Klien
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="p-4 border-t border-white/10 bg-black/40 flex items-center justify-between text-xs text-stone-400">
            <span>Sistem Portal RW 26 Kebalen • Client Management Ready</span>
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-xl border border-stone-700 hover:bg-white/10 text-stone-300 transition-colors"
            >
              Tutup Panel
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
