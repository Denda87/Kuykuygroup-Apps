"use client";
import { useState } from "react";
import { getUser, logout } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { Phone, TrendingUp, Award, LogOut, Edit2, Camera, Settings, ChevronRight, MapPin, Briefcase } from "lucide-react";
import GoldHeader from "@/components/GoldHeader";
import Link from "next/link";

export default function ProfilePage() {
  const router = useRouter();
  const user = getUser();
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState(user?.name || "Staff");
  const [imgError, setImgError] = useState(false);

  const jobRole = user?.jobRole || "Staff";
  const branch = user?.branch || "—";
  const isTherapist = jobRole === "Therapist";
  const initial = name.charAt(0).toUpperCase();

  return (
    <div style={{ background: "#08070a", minHeight: "100vh", paddingBottom: 100 }}>
      <GoldHeader title="PROFILE" />
      <div className="px-4 py-5 flex flex-col gap-4">

        {/* Foto & Nama */}
        <div className="rounded-2xl p-6 text-center relative" style={{ background: "linear-gradient(135deg,#1e1800,#141000,#1a1400)", border: "1px solid #D4AF3745" }}>
          <button
            onClick={() => setEditMode(!editMode)}
            className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center"
            style={{ background: "#D4AF3720", border: "1px solid #D4AF3740" }}
          >
            <Edit2 size={14} color="#D4AF37" />
          </button>

          {/* Avatar besar */}
          <div className="relative inline-block mb-5">
            <div
              className="flex items-center justify-center font-bold font-serif"
              style={{
                width: 140, height: 140, borderRadius: "50%",
                background: imgError || true
                  ? "linear-gradient(135deg,#C9A84C,#f5e070,#D4AF37,#B8960C)"
                  : undefined,
                boxShadow: "0 0 40px #D4AF3770, 0 0 80px #D4AF3730",
                border: "4px solid #D4AF37",
                fontSize: 60, color: "#000",
              }}
            >
              {initial}
            </div>
            <button
              className="absolute bottom-1 right-1 w-10 h-10 rounded-full flex items-center justify-center"
              style={{ background: "linear-gradient(135deg,#C9A84C,#D4AF37)", boxShadow: "0 2px 10px #D4AF3760" }}
            >
              <Camera size={17} color="#000" />
            </button>
          </div>

          {editMode ? (
            <input
              value={name}
              onChange={e => setName(e.target.value)}
              className="bg-transparent text-center text-2xl font-bold font-serif text-white border-b focus:outline-none w-full mb-2"
              style={{ borderColor: "#D4AF37" }}
            />
          ) : (
            <h2 className="font-serif text-2xl font-bold text-white mb-1">{name}</h2>
          )}

          {/* Badge jabatan */}
          <div className="flex gap-2 justify-center flex-wrap mt-3">
            <span
              className="px-4 py-1.5 rounded-full text-sm font-bold"
              style={{ background: "linear-gradient(135deg,#C9A84C,#D4AF37,#B8960C)", color: "#000", boxShadow: "0 2px 10px #D4AF3750" }}
            >
              {jobRole}
            </span>
          </div>

          <div className="flex items-center justify-center gap-1.5 mt-3">
            <MapPin size={12} color="#D4AF3780" />
            <span style={{ color: "#888", fontSize: 12 }}>{branch}</span>
          </div>

          {editMode && (
            <button
              onClick={() => setEditMode(false)}
              className="mt-5 px-8 py-2.5 rounded-xl text-sm font-bold text-black"
              style={{ background: "linear-gradient(135deg,#C9A84C,#D4AF37)" }}
            >
              SIMPAN PERUBAHAN
            </button>
          )}
        </div>

        {/* Info Cards */}
        <div className="flex flex-col gap-2">
          {([
            { icon: Phone, label: "Nomor HP", value: "+62 812-3356-7890" },
            { icon: Briefcase, label: "Jabatan", value: jobRole },
            { icon: MapPin, label: "Cabang", value: branch },
            ...(isTherapist ? [
              { icon: TrendingUp, label: "Total Hari Ini", value: "3 Customer" },
              { icon: Award, label: "Performa Bulanan", value: "85 Customer" },
            ] : []),
          ] as const).map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-center gap-4 rounded-2xl p-4" style={{ background: "linear-gradient(135deg,#141000,#111)", border: "1px solid #D4AF3728" }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: "#D4AF3718" }}>
                <Icon size={17} color="#D4AF37" />
              </div>
              <div className="flex-1">
                <p className="text-gray-600 text-xs">{label}</p>
                <p className="text-white font-semibold text-sm mt-0.5">{value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Settings */}
        <Link href="/staff/settings" className="flex items-center gap-4 rounded-2xl p-4" style={{ background: "linear-gradient(135deg,#141000,#111)", border: "1px solid #D4AF3728", textDecoration: "none" }}>
          <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: "#D4AF3718" }}>
            <Settings size={17} color="#D4AF37" />
          </div>
          <div className="flex-1">
            <p className="text-gray-600 text-xs">Pengaturan</p>
            <p className="text-white font-semibold text-sm mt-0.5">Akun &amp; Notifikasi</p>
          </div>
          <ChevronRight size={16} color="#444" />
        </Link>

        {/* Logout */}
        <button
          onClick={() => { logout(); router.push("/login"); }}
          className="w-full py-4 font-bold text-black rounded-2xl text-sm uppercase tracking-[0.25em] flex items-center justify-center gap-2 mt-1"
          style={{ background: "linear-gradient(135deg,#C9A84C 0%,#f5e070 40%,#D4AF37 60%,#B8960C 100%)", boxShadow: "0 6px 24px #D4AF3750" }}
        >
          <LogOut size={16} />
          LOGOUT
        </button>

      </div>
    </div>
  );
}
