"use client";
import { useState } from "react";
import { Save } from "lucide-react";
import GoldHeader from "@/components/GoldHeader";

export default function AbsensiPage() {
  const [customers, setCustomers] = useState(3);
  const [service, setService] = useState("Massage");
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="pb-2">
      <GoldHeader title="ABSENSI" />

      <div className="px-4 space-y-3">
        <div className="rounded-2xl p-6" style={{background: "linear-gradient(135deg, #1a1a0d, #161616)", border: "1px solid #D4AF3730"}}>
          <div className="space-y-5">
            <div>
              <label className="block text-xs text-[#D4AF37] mb-2 tracking-widest uppercase">Jumlah Customer</label>
              <div className="flex items-center gap-3">
                <button onClick={() => setCustomers(Math.max(0, customers-1))} className="w-10 h-10 rounded-xl text-[#D4AF37] text-xl font-bold" style={{background: "#D4AF3720", border: "1px solid #D4AF3740"}}>-</button>
                <div className="flex-1 text-center text-3xl font-bold font-serif" style={{color: "#D4AF37"}}>{customers}</div>
                <button onClick={() => setCustomers(Math.min(20, customers+1))} className="w-10 h-10 rounded-xl text-[#D4AF37] text-xl font-bold" style={{background: "#D4AF3720", border: "1px solid #D4AF3740"}}>+</button>
              </div>
            </div>
            <div>
              <label className="block text-xs text-[#D4AF37] mb-2 tracking-widest uppercase">Jenis Layanan</label>
              <select
                value={service}
                onChange={e => setService(e.target.value)}
                className="w-full px-4 py-4 rounded-2xl text-white text-sm focus:outline-none"
                style={{background: "#0d0d0d", border: "1px solid #D4AF3740"}}
              >
                <option value="Massage">Massage</option>
                <option value="Facial">Facial</option>
                <option value="Hot Stone">Hot Stone</option>
                <option value="Manicure">Manicure</option>
              </select>
            </div>
            <button
              onClick={handleSave}
              className="w-full py-4 font-bold text-black rounded-2xl text-sm uppercase tracking-widest flex items-center justify-center gap-2"
              style={{background: "linear-gradient(135deg, #C9A84C, #D4AF37, #B8960C)", boxShadow: "0 4px 20px #D4AF3740"}}
            >
              <Save size={16} />
              {saved ? "TERSIMPAN!" : "SIMPAN"}
            </button>
          </div>
        </div>

        <div className="rounded-2xl p-5" style={{background: "linear-gradient(135deg, #1a1a0d, #161616)", border: "1px solid #D4AF3730"}}>
          <p className="text-gray-500 text-xs tracking-wider mb-1">Total Hari Ini:</p>
          <div className="text-3xl font-bold font-serif" style={{color: "#D4AF37"}}>{customers} <span className="text-gray-500 text-xl">Customer</span></div>
          <p className="text-gray-600 text-xs mt-2">Layanan: {service}</p>
        </div>
      </div>
    </div>
  );
}
