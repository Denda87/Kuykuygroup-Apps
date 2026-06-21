"use client";
import { useState } from "react";
import Logo from "@/components/Logo";
import { useRouter } from "next/navigation";
import { ChevronLeft, Users, Save } from "lucide-react";

const serviceOptions = ["Massage", "Facial", "Hot Stone", "Manicure & Pedicure"];

export default function AbsensiPage() {
  const router = useRouter();
  const [jumlah, setJumlah] = useState("");
  const [jenis, setJenis] = useState("Massage");
  const [total, setTotal] = useState(3);
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const n = parseInt(jumlah) || 0;
    setTotal(t => t + n);
    setSaved(true);
    setJumlah("");
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="px-4 py-6">
      {/* Header */}
      <div className="flex items-center mb-6">
        <button onClick={() => router.back()} className="text-[#C9A84C] mr-4"><ChevronLeft size={24} /></button>
        <div className="flex-1 flex flex-col items-center">
          <Logo size={48} />
          <p className="text-[#C9A84C] text-xs font-bold tracking-[0.3em] mt-1">ABSENSI</p>
        </div>
        <div className="w-8" />
      </div>

      <form onSubmit={handleSave} className="space-y-4">
        <div className="bg-[#111] rounded-xl p-4 border border-[#C9A84C22]">
          <label className="text-gray-400 text-sm block mb-2">Jumlah Customer</label>
          <div className="flex items-center gap-3">
            <Users size={18} color="#C9A84C" />
            <input
              type="number"
              min="0"
              placeholder="0"
              value={jumlah}
              onChange={e => setJumlah(e.target.value)}
              className="flex-1 bg-transparent text-white text-lg font-bold focus:outline-none placeholder-gray-700"
              required
            />
          </div>
          <div className="h-px bg-[#C9A84C33] mt-3" />
          <div className="flex justify-end">
            <span className="text-[#C9A84C] font-bold text-xl">{jumlah || 0}</span>
          </div>
        </div>

        <div className="bg-[#111] rounded-xl p-4 border border-[#C9A84C22]">
          <label className="text-gray-400 text-sm block mb-2">Jenis Layanan</label>
          <div className="flex items-center justify-between">
            <select
              value={jenis}
              onChange={e => setJenis(e.target.value)}
              className="flex-1 bg-transparent text-white font-semibold focus:outline-none"
            >
              {serviceOptions.map(s => <option key={s} value={s} className="bg-[#111]">{s}</option>)}
            </select>
            <ChevronLeft size={16} className="rotate-180 text-gray-600" />
          </div>
        </div>

        <button type="submit" className="gold-btn w-full py-4 rounded-xl text-black font-bold tracking-widest flex items-center justify-center gap-2">
          <Save size={18} /> SIMPAN
        </button>

        {saved && <p className="text-green-400 text-center text-sm">Data berhasil disimpan!</p>}
      </form>

      {/* Total */}
      <div className="mt-8 bg-[#111] rounded-xl p-5 border border-[#C9A84C22]">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-sm">Total Hari Ini:</p>
            <p className="text-white font-bold text-2xl mt-1">{total} <span className="text-gray-500 text-base font-normal">Customer</span></p>
          </div>
          <div className="w-14 h-14 rounded-full border-2 border-[#C9A84C] flex items-center justify-center">
            <span className="text-[#C9A84C] font-bold text-xl">{total}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
