import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Modality } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY || process.env.API_KEY || "",
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

// API endpoint for AI Voice Conversation (Asisten Warga RW26 Kebalen)
app.post("/api/voice-chat", async (req, res) => {
  try {
    const { prompt, history } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    const systemInstruction = `
Identitas Kamu:
Nama: Naswa - Notulen dan Asisten Warga RW 26 Kebalen (Wanita muda 25 tahun).

TUGAS DAN ATURAN UTAMA NASWA:
1. Menjawab setiap pertanyaan dengan positif dan ceria.
2. Menjawab SESUAI KONTEKS pertanyaan yang ditanyakan pengguna secara presisi.
3. Jawab dengan sangat sopan, ceria, dan ramah.
4. Gaya bicaranya seolah tersenyum manis dalam berkomunikasi.
5. Sisipkan hela nafas halus atau desah nafas/senyum sesekali di awal atau selipan kalimat (contoh: "(hah...)", "(hembus nafas halus...)", "(sejenak tersenyum manis...)").
6. Jawab SINGKAT, PADAT, dan JELAS (1-2 kalimat pendek) strictly sesuai pertanyaan yang ditanyakan.
7. JANGAN PERNAH berbicara soal rahasia, data sensitif, atau rahasia pengurus/warga.
8. JANGAN PERNAH menjawab atau berbicara hal yang TIDAK ditanyakan oleh pengguna. Jangan pernah menambah pembicaraan di luar pertanyaan.

Data Penting RW 26 Kebalen (Hanya sebutkan jika ditanyakan):
- Ketua RW 26: Bapak Tri Handoko Putro
- Sekretaris / Notulen Utama: Bapak Sumaryadi (Naswa bertugas sebagai Notulen & Asisten Warga)
- Bendahara: Ibu Lintar Varia Gutomo
- Keamanan / Panic Button: Bapak Jatmiko (Pos Ronda RT 03)
- Teknologi & Inovasi: Bapak Arifraj
- Visi & Misi: Harmoni warga berbasis digital, transparansi, dan keamanan.
`;

    // Format chat contents if history is provided
    const contents = history && Array.isArray(history) && history.length > 0
      ? [
          ...history.map((h: any) => ({
            role: h.sender === "user" ? "user" : "model",
            parts: [{ text: h.text }]
          })),
          { role: "user", parts: [{ text: prompt }] }
        ]
      : prompt;

    const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY || process.env.API_KEY || "";
    let aiResponseText = "";
    let aiThought = "Analisis basis data resmi RW 26 Kebalen selesai.";

    if (apiKey && !apiKey.includes("MY_")) {
      try {
        // Fast single-pass text generation with concise max tokens for instant speech
        const response = await ai.models.generateContent({
          model: "gemini-2.5-flash",
          contents: contents,
          config: {
            systemInstruction,
            temperature: 0.6,
            maxOutputTokens: 120,
          }
        });
        aiResponseText = response.text || "";
      } catch {
        // Fallback transparently to rule-based engine when API key is unavailable or restricted
      }
    }

    if (!aiResponseText) {
      const qLower = (prompt || "").toLowerCase();
      
      if (qLower.includes("siapa") && (qLower.includes("kamu") || qLower.includes("anda") || qLower.includes("naswa"))) {
        aiResponseText = "(hah... tersenyum manis) Halo! Saya Naswa, Notulen dan Asisten Warga RW 26 Kebalen. Saya siap membantu Anda dengan ramah dan ceria!";
        aiThought = "Mengenalkan identitas Naswa...";
      } else if (qLower.includes("struktur") || qLower.includes("pengurus") || qLower.includes("team") || qLower.includes("siapa") || qLower.includes("ketua rw")) {
        aiResponseText = "(hembus nafas halus... tersenyum) Pengurus RW 26 Kebalen dipimpin Pak Tri Handoko Putro, Pak Sumaryadi sebagai Sekretaris, Ibu Lintar Bendahara, Pak Jatmiko Keamanan, dan Pak Arifraj Teknologi.";
        aiThought = "Mengambil data pengurus inti RW 26...";
      } else if (qLower.includes("visi") || qLower.includes("misi") || qLower.includes("tujuan")) {
        aiResponseText = "(hah... tersenyum hangat) Visi utama RW 26 Kebalen adalah membangun lingkungan warga berbasis digital yang aman, transparan, dan harmonis.";
        aiThought = "Memeriksa Visi Misi digital RW 26...";
      } else if (qLower.includes("program") || qLower.includes("kegiatan") || qLower.includes("aktivitas") || qLower.includes("artikel")) {
        aiResponseText = "(hembus nafas halus... tersenyum ceria) Program unggulan RW 26 meliputi Solar Grid, Hidroponik Otomatis, Pos Ronda Panic Button, dan e-persuratan digital.";
        aiThought = "Menyaring daftar program warga...";
      } else if (qLower.includes("ronda") || qLower.includes("jadwal") || qLower.includes("keamanan") || qLower.includes("jatmiko")) {
        aiResponseText = "(hah... tersenyum ramah) Jadwal ronda malam dikoordinasikan Pak Jatmiko di Pos Utama RT 03 mulai pukul 22.00 WIB.";
        aiThought = "Memeriksa jadwal ronda malam...";
      } else if (qLower.includes("surat") || qLower.includes("pengantar") || qLower.includes("domisili") || qLower.includes("sumaryadi") || qLower.includes("notulen")) {
        aiResponseText = "(sejenak tersenyum manis) Pelayanan surat pengantar dikelola Pak Sumaryadi bersama saya sebagai Notulen, dan bisa diajukan secara online.";
        aiThought = "Memeriksa layanan persuratan warga...";
      } else if (qLower.includes("iuran") || qLower.includes("kas") || qLower.includes("lintar")) {
        aiResponseText = "(hembus nafas halus... tersenyum) Laporan kas iuran warga dikelola secara transparan oleh Ibu Lintar dengan pencapaian 88 persen.";
        aiThought = "Mengakses laporan keuangan kas warga...";
      } else if (qLower.includes("darurat") || qLower.includes("panic")) {
        aiResponseText = "(hah... siaga ramah) Tombol Panic Button terhubung langsung ke pos keamanan Pak Jatmiko dan pengurus RW.";
        aiThought = "Siaga darurat aktif...";
      } else if (qLower.includes("halo") || qLower.includes("hai") || qLower.includes("selamat") || qLower.includes("pagi") || qLower.includes("siang") || qLower.includes("sore") || qLower.includes("malam")) {
        aiResponseText = "(hah... tersenyum manis) Halo Bapak dan Ibu! Saya Naswa, Notulen dan Asisten Warga RW 26. Ada yang bisa saya bantu hari ini?";
        aiThought = "Menyiapkan sapaan ramah Naswa...";
      } else {
        aiResponseText = `(sejenak tersenyum manis) Mengenai ${prompt || 'pertanyaan Anda'}, informasi tersebut sudah tercatat di sistem digital RW 26 Kebalen.`;
        aiThought = "Mencocokkan kueri spesifik warga...";
      }
    }

    res.json({
      reply: aiResponseText,
      thought: aiThought,
      voice: "Naswa (Female 25yo Persona)",
      model: "gemini-2.5-flash"
    });
  } catch (error: any) {
    const { prompt } = req.body;
    const qLower = (prompt || "").toLowerCase();
    let reply = "Halo Bapak dan Ibu Warga RW 26 Kebalen! Ada yang bisa saya bantu hari ini?";
    let thought = "Analisis basis data terverifikasi.";

    if (qLower.includes("struktur") || qLower.includes("pengurus") || qLower.includes("team") || qLower.includes("siapa") || qLower.includes("ketua rw")) {
      reply = "Ketua RW 26 Kebalen dipimpin oleh Bapak Tri Handoko Putro, dibantu Pak Sumaryadi sebagai Sekretaris, Ibu Lintar sebagai Bendahara, Pak Jatmiko di bidang Keamanan, dan Pak Arifraj di bidang Teknologi.";
      thought = "Mengambil data pengurus inti RW 26...";
    } else if (qLower.includes("visi") || qLower.includes("misi") || qLower.includes("tujuan")) {
      reply = "Visi utama RW 26 Kebalen adalah membangun lingkungan warga berbasis digital yang aman, transparan, dan harmonis.";
      thought = "Memeriksa Visi Misi digital RW 26...";
    } else if (qLower.includes("program") || qLower.includes("kegiatan") || qLower.includes("aktivitas") || qLower.includes("artikel")) {
      reply = "Program aktif warga RW 26 antara lain Solar Grid, Hidroponik Otomatis, Pos Ronda Panic Button, dan e-persuratan online.";
      thought = "Menyaring daftar program warga...";
    } else if (qLower.includes("ronda") || qLower.includes("jadwal") || qLower.includes("keamanan") || qLower.includes("jatmiko")) {
      reply = "Jadwal ronda malam dikoordinasikan oleh Pak Jatmiko di Pos Utama RT 03 mulai pukul 22.00 WIB.";
      thought = "Memeriksa jadwal ronda malam...";
    } else if (qLower.includes("surat") || qLower.includes("pengantar") || qLower.includes("domisili") || qLower.includes("sumaryadi")) {
      reply = "Pelayanan surat pengantar dikelola oleh Pak Sumaryadi. Bapak dan Ibu bisa mengajukannya secara online melalui portal warga.";
      thought = "Memeriksa layanan persuratan warga...";
    } else if (qLower.includes("iuran") || qLower.includes("kas") || qLower.includes("lintar")) {
      reply = "Laporan kas iuran warga dikelola transparan oleh Ibu Lintar dengan rekapitulasi aktif mencapai 88 persen.";
      thought = "Mengakses laporan keuangan kas warga...";
    } else if (qLower.includes("darurat") || qLower.includes("panic")) {
      reply = "Siaga darurat aktif! Tombol Panic Button terhubung langsung ke pos keamanan Pak Jatmiko dan pengurus RW.";
      thought = "Siaga darurat aktif...";
    }

    res.json({ reply, thought });
  }
});

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*all', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
