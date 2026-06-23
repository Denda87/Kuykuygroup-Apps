import AdminPageShell from "@/components/AdminPageShell";

const services = [
  { id: 1, name: "Express",  duration: "45 mnt",       price: "Rp 330.000",           status: "Aktif", bookings: 0 },
  { id: 2, name: "Kuy",      duration: "60 / 90 mnt",  price: "Rp 400.000 / 430.000", status: "Aktif", bookings: 0 },
  { id: 3, name: "Exclume",  duration: "90 mnt",       price: "Rp 550.000",           status: "Aktif", bookings: 0 },
  { id: 4, name: "DShoot",   duration: "120 mnt",      price: "Rp 650.000",           status: "Aktif", bookings: 0 },
];

export default function LayananPage() {
  return (
    <AdminPageShell title="Layanan Spa">
      <div className="rounded-xl overflow-hidden" style={{ border: "1px solid #D4AF3730" }}>
        <div className="px-5 py-3 flex items-center justify-between" style={{ background: "#D4AF3710", borderBottom: "1px solid #D4AF3720" }}>
          <h3 className="font-bold text-xs tracking-widest" style={{ color: "#D4AF37" }}>DAFTAR LAYANAN</h3>
          <button className="px-4 py-1.5 rounded-lg text-black text-xs font-bold" style={{ background: "linear-gradient(135deg,#C9A84C,#D4AF37)" }}>+ Tambah Layanan</button>
        </div>
        <table className="w-full text-xs">
          <thead>
            <tr style={{ borderBottom: "1px solid #D4AF3718", background: "#1a1800" }}>
              {["#", "Nama Layanan", "Durasi", "Harga", "Total Booking", "Status", "Aksi"].map((h) => (
                <th key={h} className="px-4 py-3 text-left text-gray-500 uppercase" style={{ fontSize: 9 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {services.map((s, i) => (
              <tr
                key={s.id}
                style={{ borderBottom: "1px solid #D4AF3710", background: i % 2 === 0 ? "#141200" : "#111000" }}
                className="hover:bg-[#D4AF3710]"
              >
                <td className="px-4 py-4 text-gray-600">{s.id}</td>
                <td className="px-4 py-4 text-gray-200 font-bold tracking-wide">{s.name}</td>
                <td className="px-4 py-4 text-gray-500">{s.duration}</td>
                <td className="px-4 py-4 font-bold" style={{ color: "#D4AF37" }}>{s.price}</td>
                <td className="px-4 py-4 text-gray-400">{s.bookings}x</td>
                <td className="px-4 py-4">
                  <span
                    className="px-2 py-0.5 rounded-full font-bold text-black"
                    style={{ fontSize: 9, background: s.status === "Aktif" ? "#D4AF37" : "#555" }}
                  >
                    {s.status}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <button className="text-[#D4AF37] hover:opacity-70 text-xs">Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Ringkasan harga */}
      <div className="mt-6 rounded-xl p-5" style={{ background: "#0e0c07", border: "1px solid #D4AF3720" }}>
        <h3 className="text-xs font-bold tracking-widest mb-4" style={{ color: "#D4AF37" }}>RINGKASAN PAKET</h3>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {services.map((s) => (
            <div key={s.id} className="rounded-lg p-4 text-center" style={{ background: "#13110c", border: "1px solid #D4AF3718" }}>
              <div className="font-black text-base mb-1" style={{ color: "#D4AF37" }}>{s.name}</div>
              <div className="text-gray-400 text-xs mb-2">{s.duration}</div>
              <div className="font-bold text-white text-xs leading-relaxed">{s.price}</div>
            </div>
          ))}
        </div>
      </div>
    </AdminPageShell>
  );
}
