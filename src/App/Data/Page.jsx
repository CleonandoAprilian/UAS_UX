import React, { useState, useEffect, useMemo } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell, LabelList, ResponsiveContainer } from "recharts";
import { Venus, Mars, User2, IdCard } from "lucide-react";
import { PiUsersThree } from "react-icons/pi";
import { FaCross, FaChurch, FaStarAndCrescent, FaVihara } from "react-icons/fa";
import { MdTempleBuddhist } from "react-icons/md";
// Impor supabase client yang baru dibuat/diperbaiki
import { supabase } from "../../SupabaseClients.jsx";
import image1 from "../../assets/background.jpg";

// Definisi Usia untuk Pengelompokan
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

// Urutan Usia yang Terstandardisasi
const AGE_GROUPS_ORDER = ["0-10", "11-20", "21-30", "31-40", "41-50", "51-60", "61-70", "71-80"];
const PENDIDIKAN_ORDER = ["Tidak Sekolah", "SD", "SMP", "SMA", "D3", "S1", "S2 atau S3"];
const AGAMA_ICONS = {
  Islam: <FaStarAndCrescent className="w-12 h-12 text-secondary" />,
  Katolik: <FaCross className="w-12 h-12 text-secondary" />,
  Kristen: <FaChurch className="w-12 h-12 text-secondary" />,
  Buddha: <MdTempleBuddhist className="w-12 h-12 text-secondary" />,
  Hindu: <FaVihara className="w-12 h-12 text-secondary" />,
  "Lain-lain": <PiUsersThree className="w-12 h-12 text-secondary" />,
};

// Fungsi Helper untuk menghitung Umur (sederhana)
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

        if (error) {
          throw new Error(error.message);
        }

        setDataPendudukMentah(data);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Gagal memuat data kependudukan. Pastikan koneksi dan RLS Policy SELECT sudah benar.");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  // --- 2. Proses Data menggunakan useMemo (Agar efisien) ---
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
      // ---- 1. Jenis Kelamin ----
      const jk = p.jenis_kelamin?.toLowerCase();
      if (jk === "laki-laki") counts.lakiLaki++;
      else if (jk === "perempuan") counts.perempuan++;

      // ---- 2. Hitung KK Unik ----
      if (p.no_kk) {
        uniqueKK.add(p.no_kk.toString());
      }

      // ---- 3. Hitung Usia ----
      const age = calculateAge(p.tanggal_lahir);
      if (age !== null) {
        const group = getAgeGroup(age);

        if (jk === "laki-laki") counts.usiaLaki[group]++;
        else if (jk === "perempuan") counts.usiaPerempuan[group]++;
      }

      // ---- 4. Hitungan Dusun ----
      if (p.dusun) {
        const d = p.dusun.trim();
        counts.dusun[d] = (counts.dusun[d] || 0) + 1;
      }

      // ---- 5. Hitungan Pendidikan ----
      if (p.pendidikan) {
        counts.pendidikan[p.pendidikan] = (counts.pendidikan[p.pendidikan] || 0) + 1;
      }

      // ---- 6. Hitungan Agama ----
      if (p.agama) {
        counts.agama[p.agama] = (counts.agama[p.agama] || 0) + 1;
      }
    });

    // total kk unik
    counts.totalKK = uniqueKK.size;

    // === Transformasi Data ===

    const totalPenduduk = dataPendudukMentah.length;

    const transformedDataPenduduk = [
      { icon: <User2 className="w-10 h-10 text-secondary" />, name: "Penduduk", jumlah: totalPenduduk },
      { icon: <Venus className="w-10 h-10 text-secondary" />, name: "Perempuan", jumlah: counts.perempuan },
      { icon: <Mars className="w-10 h-10 text-secondary" />, name: "Laki-Laki", jumlah: counts.lakiLaki },
      { icon: <IdCard className="w-10 h-10 text-secondary" />, name: "Kepala Keluarga", jumlah: counts.totalKK },
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
      <main className="min-h-screen bg-background pt-34 flex items-center justify-center">
        <p className="text-xl font-medium text-primary">Memuat data dari Supabase...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-background pt-34 flex items-center justify-center">
        <p className="text-xl font-medium text-red-600">Error: {error}</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background pt-34">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Judul */}
        <h1 className="text-4xl font-bold text-center mb-10 text-primary">Infografis dan Anggaran Kalurahan Sidoarum</h1>

        {/* Intro Section */}
        <div className="grid md:grid-cols-2 gap-6 mb-16 items-center">
          <div className="bg-card-bg p-6 rounded-xl shadow-inner mb-6">
            <p className="text-primary2 font-medium text-justify">
              Website Kalurahan Sidoarum menampilkan profil kependudukan yang detail, mencakup berbagai karakteristik demografi, serta rincian anggaran untuk pengumpulan data dan program pembangunan, guna menjamin transparansi dan
              akuntabilitas.
            </p>
          </div>
          <img
            src={image1}
            alt="Kantor Kalurahan"
            className="rounded-xl shadow-md object-cover w-full h-64"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://placehold.co/600x400/3b82f6/ffffff?text=Placeholder+Kantor";
            }}
          />
        </div>

        {/* Jumlah Penduduk */}
        <h2 className="text-4xl font-semibold text-center text-primary mb-8">Jumlah Penduduk dan Kepala Keluarga</h2>
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-card-bg p-6 rounded-xl shadow-md">
            <h3 className="font-semibold mb-4">Grafik Kependudukan</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dataPenduduk}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip
                  labelStyle={{
                    color: "#6482AD",
                    fontWeight: "bold",
                  }}
                />
                <Bar dataKey="jumlah" fill="#6482AD" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="p-6 flex flex-col items-center justify-center grid grid-cols-2 gap-4">
            {dataPenduduk.map((d, i) => (
              <div key={i} className="bg-card-bg rounded-lg shadow p-4 text-center flex flex-col items-center justify-center">
                <div className="flex items-start gap-3 mb-4">
                  <div className="p-3 flex items-center justify-center ">{d.icon}</div>
                  <div className="flex flex-col">
                    <p className="text-2xl font-bold text-primary2">{d.jumlah.toLocaleString()}</p>
                    <p className="text-body2">{d.name}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Berdasarkan Usia */}
        <h2 className="text-4xl font-semibold text-center text-primary mb-8">Penduduk Berdasarkan Usia</h2>
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Laki-laki (mirror kiri) */}
          <div className="bg-card-bg p-6 rounded-xl shadow-md">
            <h3 className="text-center font-medium mb-2 text-primary">Laki-laki</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart layout="vertical" data={dataUsiaLaki} margin={{ top: 10, right: 30, left: 20, bottom: 10 }}>
                {/* Batang ke kiri */}
                <XAxis type="number" reversed />
                {/* Sumbu Y di kanan */}
                <YAxis dataKey="usia" type="category" orientation="right" axisLine={false} tickLine={false} tick={{ textAnchor: "start" }} />
                <Tooltip
                  labelStyle={{
                    color: "#6482AD",
                    fontWeight: "bold",
                  }}
                  itemStyle={{
                    color: "#6482AD",
                    fontWeight: "medium",
                  }}
                />
                {/* Label jumlah di sisi kanan batang */}
                <Bar dataKey="jumlah" barSize={18}>
                  {dataUsiaLaki.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={index % 2 === 0 ? "#60a5fa" : "#1978b3ff"} // selang-seling
                    />
                  ))}
                  <LabelList dataKey="jumlah" position="right" fill="#1e3a8a" fontSize={12} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Perempuan (label kanan) */}
          <div className="bg-card-bg p-6 rounded-xl shadow-md">
            <h3 className="text-center font-medium mb-2 text-primary">Perempuan</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart layout="vertical" data={dataUsiaPerempuan} margin={{ top: 10, right: 20, left: 0, bottom: 10 }}>
                <XAxis type="number" />
                <YAxis dataKey="usia" type="category" axisLine={false} tickLine={false} />
                <Tooltip
                  labelStyle={{
                    color: "#6482AD",
                    fontWeight: "bold",
                  }}
                  itemStyle={{
                    color: "#6482AD",
                    fontWeight: "medium",
                  }}
                />

                <Bar dataKey="jumlah" barSize={18}>
                  {dataUsiaPerempuan.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={index % 2 === 0 ? "#f9a8d4" : "#f472b6"} // selang-seling
                    />
                  ))}
                  <LabelList dataKey="jumlah" position="right" fill="#9d174d" fontSize={12} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Berdasarkan Dusun */}
        <h2 className="text-4xl font-semibold text-center text-primary mb-8">Berdasarkan Dusun</h2>
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-12 items-center">
          <div className="p-6">
            <ResponsiveContainer width="100%" height={400}>
              <PieChart>
                <Pie
                  data={dataDusun}
                  dataKey="value"
                  outerRadius={175}
                  labelLine={false} // LabelLine dihilangkan
                  label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                >
                  {dataDusun.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="bg-card-bg w-75 h-75 p-6 rounded-xl shadow-md">
            <h3 className="font-semibold mb-3 text-primary">Keterangan</h3>
            <ul className="list-disc pl-5 text-muted-foreground">
              {dataDusun.map((d, i) => (
                <li key={i}>
                  <span style={{ color: COLORS[i % COLORS.length], fontWeight: "bold" }}>●</span>
                  &nbsp;{d.name} : {d.value} Jiwa
                </li>
              ))}
              {dataDusun.length === 0 && <li className="text-red-500">Data dusun tidak ditemukan.</li>}
            </ul>
          </div>
        </div>

        {/* Berdasarkan Pendidikan */}
        <h2 className="text-4xl font-semibold text-center text-primary mb-8">Berdasarkan Pendidikan</h2>
        <div className="bg-card-bg p-6 rounded-xl shadow-md mb-16">
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={dataPendidikan}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip
                labelStyle={{
                  color: "#6482AD",
                  fontWeight: "bold",
                }}
              />
              <Bar dataKey="jumlah" fill="#6482AD" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Berdasarkan Agama */}
        <h2 className="text-4xl font-semibold text-center text-primary mb-8">Berdasarkan Agama</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20 sm:px-8 lg:px-30 ">
          {dataAgama.map((a, i) => (
            <div key={i} className="bg-card-bg rounded-xl shadow p-6 flex items-center gap-5 transition-shadow hover:shadow-md">
              <div className="flex justify-center mb-2">{a.icon}</div>
              <div className="text-left">
                <p className="text-3xl font-bold text-secondary">{a.jumlah.toLocaleString()}</p>
                <p className="text-secondary font-medium text-sm">{a.nama}</p>
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
