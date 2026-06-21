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
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div>
      <GoldHeader title="ABSENSI" />
      <div className="px-4 py-4 flex flex-col gap-3">

        <div className="rounded-2xl p-5" style={{ background: "linear-gradient(135deg,#1a1800,#161616)", border: "1px solid #D4AF3735" }}>
          <div className="flex flex-col gap-5">
            {/* Jumlah Customer */}
            <div>
              <label className="block text-xs text-gray-400 mb-3 tracking-wider">Jumlah Customer</label>
              <div className="flex items-center justify-between rounded-xl px-4 py-3" style={{ background: "#0d0d0d", border: "1px solid #D4AF3730" }}>
                <button
                  onClick={() => setCustomers(Math.max(0, customers - 1))}
                  className="w-9 h-9 rounded-lg font-bold text-xl"
                  style={{ background: "#D4AF3720", color: "#D4AF37", border: "1px solid #D4AF3740" }}
                >
                  -
                </button>
                <span className="font-serif font-bold text-3xl" style={{ color: "#D4AF37" }}>{customers}</span>
                <button
                  onClick={() => setCustomers(Math.min(20, customers + 1))}
                  className="w-9 h-9 rounded-lg font-bold text-xl"
                  style={{ background: "#D4AF3720", color: "#D4AF37", border: "1px solid #D4AF3740" }}
                >
                  +
                </button>
              </div>
            </div>

            {/* Jenis Layanan */}
            <div>
              <label className="block text-xs text-gray-400 mb-2 tracking-wider">Jenis Layanan</label>
              <div className="flex items-center justify-between rounded-xl px-4 py-3" style={{ background: "#0d0d0d", border: "1px solid #D4AF3730" }}>
                <select
                  value={service}
                  onChange={e => setService(e.target.value)}
                  className="flex-1 bg-transparent text-white text-sm focus:outline-none"
                >
                  <option value="Massage">Massage</option>
                  <option value="Facial">Facial</option>
                  <option value="Hot Stone">Hot Stone</option>
                  <option value="Manicure">Manicure</option>
                </select>
                <span className="text-gray-600 text-xs ml-2">›</span>
              </div>
            </div>

            {/* SIMPAN */}
            <button
              onClick={handleSave}
              className="w-full py-4 font-bold text-black rounded-2xl text-sm uppercase tracking-[0.2em] flex items-center justify-center gap-2"
              style={{ background: "linear-gradient(135deg,#C9A84C,#f5e070,#B8960C)", boxShadow: "0 4px 20px #D4AF3740" }}
            >
              <Save size={16} />
              {saved ? "TERSIMPAN! ✓" : "SIMPAN"}
            </button>
          </div>
        </div>

        {/* Total */}
        <div className="rounded-2xl p-4" style={{ background: "linear-gradient(135deg,#1a1800,#161616)", border: "1px solid #D4AF3735" }}>
          <p className="text-gray-500 text-xs tracking-wider mb-1">Total Hari Ini:</p>
          <p className="font-serif font-bold text-3xl" style={{ color: "#D4AF37" }}>
            {customers} <span className="text-gray-500 text-xl">Customer</span>
          </p>
        </div>

      </div>
    </div>
  );
}
