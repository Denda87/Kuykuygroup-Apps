"use client";
import Link from "next/link";
import Logo from "@/components/Logo";
import { MapPin, Phone, Mail, Star, ChevronRight } from "lucide-react";

const services = [
  { icon: "🌿", label: "Pijat\nAromaterapi" },
  { icon: "💎", label: "Perawatan\nWajah Premium" },
  { icon: "🪨", label: "Pijat\nBatu Panas" },
  { icon: "💅", label: "Manikur\n& Pedikur" },
];

const menu = [
  { name: "Pijat Aromaterapi", desc: "Perawatan relaksasi dengan minyak esensial pilihan terbaik.", price: "IDR 120.000", duration: "60/90 menit" },
  { name: "Pijat Batu Panas", desc: "Terapi batu vulkanik panas meredakan ketegangan otot.", price: "IDR 275.000", duration: "60/90 menit" },
  { name: "Pijat Premium Wajah", desc: "Perawatan intensif untuk kecantikan dan kesehatan wajah.", price: "IDR 250.000", duration: "60/90 menit" },
  { name: "Manikur & Pedikur", desc: "Perawatan kuku tangan dan kaki dengan produk premium.", price: "IDR 255.000", duration: "60/90 menit" },
];

const testimonials = [
  { name: "Rina S.", role: "Pelanggan Setia", text: "Pelayanan luar biasa! Therapist sangat profesional dan ramah. Saya selalu kembali ke Kuykuy Spa." },
  { name: "Doni P.", role: "Pelanggan", text: "Suasana mewah dan nyaman. Pijat batu panasnya benar-benar membantu menghilangkan pegal-pegal." },
  { name: "Laila M.", role: "Member Premium", text: "Best spa experience in Jabodetabek! Perawatan wajahnya membuat kulit saya jauh lebih cerah." },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-[#0a0a0a]/95 backdrop-blur border-b border-[#C9A84C22]">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Logo size={42} />
            <span className="font-bold text-lg" style={{ background: "linear-gradient(135deg, #E8C96A, #C9A84C)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              KUYKUY GROUP
            </span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm text-gray-300">
            {[["Home","#home"],["Tentang Kami","#tentang-kami"],["Layanan Spa","#layanan-spa"],["Menu Pijat","#menu-pijat"],["Lokasi Cabang","#lokasi-cabang"],["Kontak","#kontak"]].map(([label, href]) => (
              <a key={label} href={href} className="hover:text-[#C9A84C] transition-colors">{label}</a>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login" className="text-sm text-[#C9A84C] border border-[#C9A84C] px-3 py-1.5 rounded hover:bg-[#C9A84C] hover:text-black transition-all">Staff Login</Link>
            <a href="#kontak" className="gold-btn text-sm px-4 py-2 rounded">Pesan Sekarang</a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section id="home" className="relative min-h-screen flex items-center pt-20">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#1a1200] via-[#0a0a0a] to-[#0a0a0a]" />
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-10" style={{ background: "radial-gradient(circle, #C9A84C, transparent)" }} />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="h-px w-12 bg-[#C9A84C]" />
              <span className="text-[#C9A84C] text-sm font-semibold tracking-widest uppercase">Premium Spa & Wellness</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
              TEMUKAN<br />
              <span style={{ background: "linear-gradient(135deg, #E8C96A, #C9A84C)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>KETENANGAN</span><br />
              SEJATI DI<br />KUYKUY SPA
            </h1>
            <p className="text-gray-400 text-lg mb-8">Pelayanan Mewah, Pengalaman Tak Terlupakan</p>
            <div className="flex gap-4 flex-wrap">
              <a href="#menu-pijat" className="gold-btn px-8 py-3 rounded-lg text-sm">Lihat Menu</a>
              <a href="#tentang-kami" className="border border-[#C9A84C55] text-[#C9A84C] px-8 py-3 rounded-lg text-sm hover:bg-[#C9A84C11] transition-all">Tentang Kami</a>
            </div>
          </div>
          <div className="hidden md:flex justify-center">
            <div className="w-80 h-80 rounded-full border-2 border-[#C9A84C33] flex items-center justify-center">
              <div className="w-64 h-64 rounded-full border border-[#C9A84C55] flex items-center justify-center">
                <Logo size={160} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="layanan-spa" className="py-20 bg-[#0d0d0d]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold mb-3" style={{ background: "linear-gradient(135deg, #E8C96A, #C9A84C)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>LAYANAN KAMI</h2>
            <p className="text-gray-500">Pilihan perawatan terbaik untuk kesehatan dan kecantikan Anda</p>
          </div>
          <div className="flex flex-wrap justify-center gap-10">
            {services.map((s, i) => (
              <div key={i} className="flex flex-col items-center gap-4">
                <div className="w-36 h-36 rounded-full flex flex-col items-center justify-center border-4 border-[#C9A84C]"
                  style={{ background: "linear-gradient(135deg, #2a1f00, #1a1300)" }}>
                  <span className="text-4xl">{s.icon}</span>
                </div>
                <p className="text-center text-sm font-semibold text-[#C9A84C] uppercase tracking-wide whitespace-pre-line">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Menu + Lokasi */}
      <section id="menu-pijat" className="py-20">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16">
          <div>
            <h2 className="text-2xl font-bold mb-8" style={{ background: "linear-gradient(135deg, #E8C96A, #C9A84C)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>MENU PIJAT</h2>
            <div className="space-y-6">
              {menu.map((item, i) => (
                <div key={i} className="flex justify-between items-start border-b border-[#C9A84C22] pb-4">
                  <div className="flex-1">
                    <p className="font-semibold text-white">{item.name}</p>
                    <p className="text-gray-500 text-sm mt-1">{item.desc}</p>
                    <p className="text-gray-600 text-xs mt-1">{item.duration}</p>
                  </div>
                  <span className="text-[#C9A84C] font-bold whitespace-nowrap ml-4">{item.price}</span>
                </div>
              ))}
            </div>
          </div>
          <div id="lokasi-cabang">
            <h2 className="text-2xl font-bold mb-8" style={{ background: "linear-gradient(135deg, #E8C96A, #C9A84C)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>LOKASI CABANG</h2>
            <div className="bg-[#1a1a1a] rounded-xl overflow-hidden border border-[#C9A84C22] mb-6">
              <div className="h-48 bg-[#222] flex items-center justify-center">
                <div className="text-center">
                  <MapPin size={40} className="text-red-500 mx-auto mb-2" />
                  <p className="text-gray-500 text-sm">Peta Lokasi Kuykuy Spa</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              {[
                { name: "Kuykuy Spa – Depok", addr: "Jl. Margonda Raya No. 25, Depok, Jabodetabek", phone: "0513-8802-3738" },
                { name: "Kuykuy Spa – Bekasi", addr: "Jl. Ahmad Yani No. 10, Bekasi, Jabodetabek", phone: "0513-8802-3739" },
              ].map((b) => (
                <div key={b.name} className="bg-[#111] rounded-lg p-4 border border-[#C9A84C22]">
                  <p className="font-semibold text-[#C9A84C] mb-1">{b.name}</p>
                  <p className="text-gray-400 text-sm flex items-start gap-2"><MapPin size={14} className="mt-0.5 shrink-0" />{b.addr}</p>
                  <p className="text-gray-400 text-sm flex items-center gap-2 mt-1"><Phone size={14} />{b.phone}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tentang */}
      <section id="tentang-kami" className="py-20 bg-[#0d0d0d]">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div className="flex justify-center">
            <div className="w-64 h-64 rounded-full border-2 border-[#C9A84C44] flex items-center justify-center">
              <Logo size={180} />
            </div>
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-6" style={{ background: "linear-gradient(135deg, #E8C96A, #C9A84C)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>TENTANG KUYKUY GROUP</h2>
            <p className="text-gray-400 leading-relaxed mb-4">Kuykuy Group mengutamakan kemitraan yang saling menguntungkan dengan menjunjung tinggi kualitas, hygiene, profesionalisasi, dan transparansi; kami memotivasi therapist kami untuk memberikan kinerja terbaik mereka.</p>
            <p className="text-gray-400 leading-relaxed mb-6">Kuykuy Group memastikan kualitas dan kesenangan hadir untuk kemantapan therapist kami, menunjukkan diri sesuai standar terbaik untuk memberikan pengalaman tak terlupakan bagi setiap pelanggan.</p>
            <div className="grid grid-cols-3 gap-4 mt-8">
              {[["50+","Therapist"],["2","Cabang"],["1000+","Pelanggan"]].map(([num, label]) => (
                <div key={label} className="text-center p-4 bg-[#111] rounded-lg border border-[#C9A84C22]">
                  <p className="text-2xl font-bold text-[#C9A84C]">{num}</p>
                  <p className="text-gray-500 text-sm">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonial" className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-14" style={{ background: "linear-gradient(135deg, #E8C96A, #C9A84C)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>TESTIMONIAL & TEAM</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-[#111] rounded-xl p-6 border border-[#C9A84C22]">
                <div className="flex gap-1 mb-4">{[...Array(5)].map((_,j) => <Star key={j} size={14} fill="#C9A84C" color="#C9A84C" />)}</div>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#C9A84C22] flex items-center justify-center text-[#C9A84C] font-bold">{t.name[0]}</div>
                  <div>
                    <p className="font-semibold text-sm">{t.name}</p>
                    <p className="text-gray-600 text-xs">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-16 grid md:grid-cols-2 gap-8 items-center bg-[#111] rounded-2xl p-8 border border-[#C9A84C22]">
            <div>
              <h3 className="text-xl font-bold mb-4 text-[#C9A84C]">KEMITRAAN & SOLUSI STAFF</h3>
              <p className="text-gray-400 text-sm leading-relaxed">Kuykuy Group menggunakan teknologi terkini untuk mengelola kualitas kinerja therapist, mengoptimalkan layanan pelanggan, dan pengelolaan staff secara efisien di setiap cabang.</p>
              <Link href="/login" className="inline-flex items-center gap-2 mt-4 text-[#C9A84C] text-sm font-semibold hover:underline">
                Masuk ke Staff App <ChevronRight size={16} />
              </Link>
            </div>
            <div className="bg-[#0a0a0a] rounded-xl p-6 border border-[#C9A84C33]">
              <p className="text-xs text-gray-500 mb-3 font-mono">KUYKUY STAFF APP</p>
              <div className="space-y-2">
                {["Dashboard Kinerja Real-time","Absensi Digital","Target & Monitoring","Laporan Bulanan"].map(f => (
                  <div key={f} className="flex items-center gap-2 text-sm text-gray-300">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#C9A84C]" />{f}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="kontak" className="bg-[#050505] border-t border-[#C9A84C22] py-12">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Logo size={48} />
              <div>
                <p className="font-bold text-[#C9A84C]">KUYKUY GROUP</p>
                <p className="text-gray-600 text-xs">Spa & Wellness</p>
              </div>
            </div>
            <p className="text-gray-500 text-sm">© 2022 - Kuykuy Group</p>
            <p className="text-gray-700 text-xs mt-1">kuykuygroup.com</p>
          </div>
          <div>
            <h4 className="text-[#C9A84C] font-semibold mb-4">KONTAK</h4>
            <div className="space-y-2 text-sm text-gray-400">
              <p className="flex items-start gap-2"><MapPin size={14} className="mt-0.5 shrink-0" />231 Ares Street, Rutum Malita, Saloit Strum, Jabodetabek</p>
              <p className="flex items-center gap-2"><Phone size={14} />0812-8803-3738</p>
              <p className="flex items-center gap-2"><Mail size={14} />mailn@kuykuygroup.com</p>
            </div>
          </div>
          <div>
            <h4 className="text-[#C9A84C] font-semibold mb-4">IKUTI KAMI</h4>
            <div className="flex gap-3">
              {["FB","IG","TW","TT"].map(s => (
                <div key={s} className="w-10 h-10 rounded-full border border-[#C9A84C44] flex items-center justify-center text-[#C9A84C] text-xs font-bold hover:bg-[#C9A84C22] cursor-pointer">{s}</div>
              ))}
            </div>
            <a href="#kontak" className="gold-btn px-6 py-2.5 rounded-lg text-sm block text-center w-max mt-6">Pesan Sekarang</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
