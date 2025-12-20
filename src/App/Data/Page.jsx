import React, { useState, useEffect, useMemo } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell, LabelList, ResponsiveContainer } from "recharts";
import { Venus, Mars, User2, IdCard } from "lucide-react";
import { PiUsersThree } from "react-icons/pi";
import { FaCross, FaChurch, FaStarAndCrescent, FaVihara } from "react-icons/fa";
import { MdTempleBuddhist } from "react-icons/md";
// Impor supabase client
import { supabase } from "../../SupabaseClients.jsx";
import image1 from "../../assets/background.jpg";

// --- Definisi Helper & Konstanta (Sama seperti sebelumnya) ---
const getAgeGroup = (umur) => {
  if (umur >= 0 && umur <= 10) return "0-10";
  if (umur >= 11 && umur <= 20) return "11-20";
  if (umur >= 21 && umur <= 30) return "21-30";
  if (umur >= 31 && umur <= 40) return "31-40";
  if (umur >= 41 && umur <= 50) return "41-50";
  if (umur >= 51 && umur <= 60) return "51-60";
  if (umur >= 61 && umur <= 70) return "61-70";
  if (umur >= 71) return "71-80";
  return "Tidak Diketahui";
};

const AGE_GROUPS_ORDER = ["0-10", "11-20", "21-30", "31-40", "41-50", "51-60", "61-70", "71-80"];
const PENDIDIKAN_ORDER = ["Tidak Sekolah", "SD", "SMP", "SMA", "D3", "S1", "S2 atau S3"];
const AGAMA_ICONS = {
  Islam: <FaStarAndCrescent className="w-8 h-8 md:w-12 md:h-12 text-secondary" />,
  Katolik: <FaCross className="w-8 h-8 md:w-12 md:h-12 text-secondary" />,
  Kristen: <FaChurch className="w-8 h-8 md:w-12 md:h-12 text-secondary" />,
  Buddha: <MdTempleBuddhist className="w-8 h-8 md:w-12 md:h-12 text-secondary" />,
  Hindu: <FaVihara className="w-8 h-8 md:w-12 md:h-12 text-secondary" />,
  "Lain-lain": <PiUsersThree className="w-8 h-8 md:w-12 md:h-12 text-secondary" />,
};

const calculateAge = (dob) => {
  if (!dob) return null;
  const birthDate = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

export default function DataPage() {
  const [dataPendudukMentah, setDataPendudukMentah] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // --- 1. Ambil Data dari Supabase ---
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);
      try {
        if (!supabase) throw new Error("Supabase client not initialized.");
        const { data, error } = await supabase.from("penduduk").select("nama_lengkap, jenis_kelamin, tanggal_lahir, agama, dusun, pendidikan, no_kk");

        if (error) throw new Error(error.message);
        setDataPendudukMentah(data);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Gagal memuat data kependudukan.");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // --- 2. Proses Data (useMemo) ---
  const { dataPenduduk, dataUsiaLaki, dataUsiaPerempuan, dataDusun, dataPendidikan, dataAgama } = useMemo(() => {
    const counts = {
      lakiLaki: 0,
      perempuan: 0,
      totalKK: 0,
      usiaLaki: AGE_GROUPS_ORDER.reduce((acc, g) => ({ ...acc, [g]: 0 }), {}),
      usiaPerempuan: AGE_GROUPS_ORDER.reduce((acc, g) => ({ ...acc, [g]: 0 }), {}),
      dusun: {},
      pendidikan: PENDIDIKAN_ORDER.reduce((acc, p) => ({ ...acc, [p]: 0 }), {}),
      agama: {},
    };

    const uniqueKK = new Set();

    dataPendudukMentah.forEach((p) => {
      const jk = p.jenis_kelamin?.toLowerCase();
      if (jk === "laki-laki") counts.lakiLaki++;
      else if (jk === "perempuan") counts.perempuan++;

      if (p.no_kk) uniqueKK.add(p.no_kk.toString());

      const age = calculateAge(p.tanggal_lahir);
      if (age !== null) {
        const group = getAgeGroup(age);
        if (jk === "laki-laki") counts.usiaLaki[group]++;
        else if (jk === "perempuan") counts.usiaPerempuan[group]++;
      }

      if (p.dusun) {
        const d = p.dusun.trim();
        counts.dusun[d] = (counts.dusun[d] || 0) + 1;
      }
      if (p.pendidikan) {
        counts.pendidikan[p.pendidikan] = (counts.pendidikan[p.pendidikan] || 0) + 1;
      }
      if (p.agama) {
        counts.agama[p.agama] = (counts.agama[p.agama] || 0) + 1;
      }
    });

    counts.totalKK = uniqueKK.size;
    const totalPenduduk = dataPendudukMentah.length;

    const transformedDataPenduduk = [
      { icon: <User2 className="w-8 h-8 md:w-10 md:h-10 text-secondary" />, name: "Penduduk", jumlah: totalPenduduk },
      { icon: <Venus className="w-8 h-8 md:w-10 md:h-10 text-secondary" />, name: "Perempuan", jumlah: counts.perempuan },
      { icon: <Mars className="w-8 h-8 md:w-10 md:h-10 text-secondary" />, name: "Laki-Laki", jumlah: counts.lakiLaki },
      { icon: <IdCard className="w-8 h-8 md:w-10 md:h-10 text-secondary" />, name: "Kepala Keluarga", jumlah: counts.totalKK },
    ];

    const transformedDataUsiaLaki = AGE_GROUPS_ORDER.map((u) => ({ usia: u, jumlah: counts.usiaLaki[u] })).filter((d) => d.jumlah > 0);
    const transformedDataUsiaPerempuan = AGE_GROUPS_ORDER.map((u) => ({ usia: u, jumlah: counts.usiaPerempuan[u] })).filter((d) => d.jumlah > 0);
    const transformedDataDusun = Object.entries(counts.dusun).map(([name, value]) => ({ name, value }));
    const transformedDataPendidikan = PENDIDIKAN_ORDER.map((name) => ({ name, jumlah: counts.pendidikan[name] })).filter((d) => d.jumlah > 0);
    const transformedDataAgama = Object.entries(counts.agama).map(([nama, jumlah]) => ({
      icon: AGAMA_ICONS[nama] || AGAMA_ICONS["Lain-lain"],
      nama,
      jumlah,
    }));

    return {
      dataPenduduk: transformedDataPenduduk,
      dataUsiaLaki: transformedDataUsiaLaki.reverse(),
      dataUsiaPerempuan: transformedDataUsiaPerempuan.reverse(),
      dataDusun: transformedDataDusun,
      dataPendidikan: transformedDataPendidikan,
      dataAgama: transformedDataAgama,
    };
  }, [dataPendudukMentah]);

  const COLORS = ["#3b82f6", "#60a5fa", "#93c5fd", "#a5b4fc", "#c4b5fd", "#818cf8", "#6366f1", "#4f46e5"];

  if (loading) {
    return (
      <main className="min-h-screen bg-background pt-24 md:pt-34 flex items-center justify-center">
        <p className="text-xl font-medium text-primary">Memuat data dari Supabase...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-background pt-24 md:pt-34 flex items-center justify-center">
        <p className="text-xl font-medium text-red-600 px-4 text-center">Error: {error}</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background pt-24 md:pt-34 pb-10">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Judul */}
        <h1 className="text-2xl md:text-4xl font-bold text-center mb-8 md:mb-10 text-primary">Infografis dan Anggaran Kalurahan Sidoarum</h1>

        {/* Intro Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 md:mb-16 items-center">
          <div className="bg-card-bg p-4 md:p-6 rounded-xl shadow-inner order-2 md:order-1">
            <p className="text-primary2 font-medium text-justify text-sm md:text-base">
              Website Kalurahan Sidoarum menampilkan profil kependudukan yang detail, mencakup berbagai karakteristik demografi, serta rincian anggaran untuk pengumpulan data dan program pembangunan, guna menjamin transparansi dan
              akuntabilitas.
            </p>
          </div>
          <div className="order-1 md:order-2">
            <img
              src={image1}
              alt="Kantor Kalurahan"
              className="rounded-xl shadow-md object-cover w-full h-48 md:h-64"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://placehold.co/600x400/3b82f6/ffffff?text=Placeholder+Kantor";
              }}
            />
          </div>
        </div>

        {/* Jumlah Penduduk */}
        <h2 className="text-2xl md:text-4xl font-semibold text-center text-primary mb-6 md:mb-8">Jumlah Penduduk dan Kepala Keluarga</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 md:mb-16">
          <div className="bg-card-bg p-4 md:p-6 rounded-xl shadow-md">
            <h3 className="font-semibold mb-4 text-center md:text-left">Grafik Kependudukan</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dataPenduduk}>
                <XAxis dataKey="name" interval={0} tick={{ fontSize: 10 }} />
                <YAxis />
                <Tooltip labelStyle={{ color: "#6482AD", fontWeight: "bold" }} />
                <Bar dataKey="jumlah" fill="#6482AD" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Kartu Statistik */}
          <div className="grid grid-cols-2 gap-3 md:gap-4 content-center">
            {dataPenduduk.map((d, i) => (
              <div key={i} className="bg-card-bg rounded-lg shadow p-3 md:p-4 text-center flex flex-col items-center justify-center">
                <div className="flex flex-col md:flex-row items-center gap-2 md:gap-3 mb-2 md:mb-4">
                  <div className="p-2 flex items-center justify-center">{d.icon}</div>
                  <div className="flex flex-col">
                    <p className="text-xl md:text-2xl font-bold text-primary2">{d.jumlah.toLocaleString()}</p>
                    <p className="text-xs md:text-body2 text-muted-foreground">{d.name}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Berdasarkan Usia */}
        <h2 className="text-2xl md:text-4xl font-semibold text-center text-primary mb-6 md:mb-8">Penduduk Berdasarkan Usia</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 md:mb-16">
          {/* Laki-laki */}
          <div className="bg-card-bg p-4 md:p-6 rounded-xl shadow-md">
            <h3 className="text-center font-medium mb-2 text-primary">Laki-laki</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart layout="vertical" data={dataUsiaLaki} margin={{ top: 10, right: 30, left: 10, bottom: 10 }}>
                <XAxis type="number" reversed hide />
                <YAxis dataKey="usia" type="category" orientation="right" axisLine={false} tickLine={false} tick={{ textAnchor: "start", fontSize: 12 }} />
                <Tooltip labelStyle={{ color: "#6482AD", fontWeight: "bold" }} />
                <Bar dataKey="jumlah" barSize={18}>
                  {dataUsiaLaki.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index % 2 === 0 ? "#60a5fa" : "#1978b3ff"} />
                  ))}
                  <LabelList dataKey="jumlah" position="left" fill="#1e3a8a" fontSize={12} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Perempuan */}
          <div className="bg-card-bg p-4 md:p-6 rounded-xl shadow-md">
            <h3 className="text-center font-medium mb-2 text-primary">Perempuan</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart layout="vertical" data={dataUsiaPerempuan} margin={{ top: 10, right: 20, left: 0, bottom: 10 }}>
                <XAxis type="number" hide />
                <YAxis dataKey="usia" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                <Tooltip labelStyle={{ color: "#6482AD", fontWeight: "bold" }} />
                <Bar dataKey="jumlah" barSize={18}>
                  {dataUsiaPerempuan.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index % 2 === 0 ? "#f9a8d4" : "#f472b6"} />
                  ))}
                  <LabelList dataKey="jumlah" position="right" fill="#9d174d" fontSize={12} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Berdasarkan Dusun */}
        <h2 className="text-2xl md:text-4xl font-semibold text-center text-primary mb-6 md:mb-8">Berdasarkan Dusun</h2>
        <div className="flex flex-col lg:grid lg:grid-cols-[2fr_1fr] gap-8 lg:gap-12 items-center mb-16">
          <div className="w-full h-[300px] md:h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={dataDusun} dataKey="value" outerRadius="80%" labelLine={false} label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}>
                  {dataDusun.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Legenda Dusun - Lebar Full di Mobile */}
          <div className="bg-card-bg w-full lg:w-auto p-4 md:p-6 rounded-xl shadow-md">
            <h3 className="font-semibold mb-3 text-primary text-center lg:text-left">Keterangan</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2 text-muted-foreground text-sm md:text-base">
              {dataDusun.map((d, i) => (
                <li key={i} className="flex items-center">
                  <span style={{ color: COLORS[i % COLORS.length], fontWeight: "bold", fontSize: "1.2rem", marginRight: "8px" }}>●</span>
                  {d.name} : <span className="font-semibold ml-1">{d.value}</span> Jiwa
                </li>
              ))}
              {dataDusun.length === 0 && <li className="text-red-500">Data dusun tidak ditemukan.</li>}
            </ul>
          </div>
        </div>

        {/* Berdasarkan Pendidikan */}
        <h2 className="text-2xl md:text-4xl font-semibold text-center text-primary mb-6 md:mb-8">Berdasarkan Pendidikan</h2>
        <div className="bg-card-bg p-4 md:p-6 rounded-xl shadow-md mb-12 md:mb-16">
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={dataPendidikan} margin={{ bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" />
              {/* Rotasi label di mobile agar terbaca */}
              <XAxis dataKey="name" interval={0} angle={-20} textAnchor="end" height={60} tick={{ fontSize: 12 }} />
              <YAxis />
              <Tooltip labelStyle={{ color: "#6482AD", fontWeight: "bold" }} />
              <Bar dataKey="jumlah" fill="#6482AD" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Berdasarkan Agama */}
        <h2 className="text-2xl md:text-4xl font-semibold text-center text-primary mb-6 md:mb-8">Berdasarkan Agama</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-20 sm:px-8 lg:px-30">
          {dataAgama.map((a, i) => (
            <div key={i} className="bg-card-bg rounded-xl shadow p-4 md:p-6 flex items-center gap-4 md:gap-5 transition-shadow hover:shadow-md">
              <div className="flex justify-center shrink-0">{a.icon}</div>
              <div className="text-left overflow-hidden">
                <p className="text-2xl md:text-3xl font-bold text-secondary truncate">{a.jumlah.toLocaleString()}</p>
                <p className="text-secondary font-medium text-xs md:text-sm truncate">{a.nama}</p>
              </div>
            </div>
          ))}
          {dataAgama.length === 0 && <div className="md:col-span-3 text-center p-4 text-red-500 bg-red-50 rounded-lg">Data agama tidak ditemukan.</div>}
        </div>
      </div>

      <Footer />
    </main>
  );
}
