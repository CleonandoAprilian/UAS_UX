import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell, LabelList, ResponsiveContainer } from "recharts";
import { Venus, Mars, User2, IdCard } from "lucide-react";
import { PiUsersThree } from "react-icons/pi";
import { FaCross, FaChurch, FaStarAndCrescent, FaVihara } from "react-icons/fa";
import { MdTempleBuddhist } from "react-icons/md";
import image1 from "../../assets/background.jpg";

export default function DataPage() {
  // --- DATA DUMMY ---
  const dataPenduduk = [
    { icon: <User2 className="w-10 h-10 text-secondary" />, name: "Penduduk", jumlah: 6000 },
    { icon: <Venus className="w-10 h-10 text-secondary" />, name: "Perempuan", jumlah: 2500 },
    { icon: <Mars className="w-10 h-10 text-secondary" />, name: "Laki-Laki", jumlah: 3500 },
    { icon: <IdCard className="w-10 h-10 text-secondary" />, name: "Kepala Keluarga", jumlah: 1000 },
  ];

  const dataUsiaLaki = [
    { usia: "71-80", jumlah: 40 },
    { usia: "61-70", jumlah: 130 },
    { usia: "51-60", jumlah: 200 },
    { usia: "41-50", jumlah: 280 },
    { usia: "31-40", jumlah: 310 },
    { usia: "21-30", jumlah: 390 },
    { usia: "11-20", jumlah: 430 },
    { usia: "0-10", jumlah: 400 },
  ];

  const dataUsiaPerempuan = [
    { usia: "71-80", jumlah: 20 },
    { usia: "61-70", jumlah: 34 },
    { usia: "51-60", jumlah: 108 },
    { usia: "41-50", jumlah: 234 },
    { usia: "31-40", jumlah: 300 },
    { usia: "21-30", jumlah: 390 },
    { usia: "11-20", jumlah: 440 },
    { usia: "0-10", jumlah: 460 },
  ];

  const dataDusun = [
    { name: "Bantulan", value: 102 },
    { name: "Beji", value: 102 },
    { name: "Cokrokebon", value: 102 },
    { name: "Cokrokonteng", value: 102 },
    { name: "Kramat", value: 102 },
    { name: "Potrowangsan", value: 102 },
    { name: "Sebaran", value: 102 },
    { name: "Tangkilaan", value: 102 },
  ];

  const dataPendidikan = [
    { name: "Tidak Sekolah", jumlah: 50 },
    { name: "SD", jumlah: 120 },
    { name: "SMP", jumlah: 250 },
    { name: "SMA", jumlah: 500 },
    { name: "D3", jumlah: 300 },
    { name: "S1", jumlah: 480 },
    { name: "S2 atau S3", jumlah: 90 },
  ];

  const dataAgama = [
    { icon: <FaStarAndCrescent className="w-12 h-12 text-secondary" />, nama: "Islam", jumlah: 2500 },
    { icon: <FaCross className="w-12 h-12 text-secondary" />, nama: "Katolik", jumlah: 3500 },
    { icon: <FaChurch className="w-12 h-12 text-secondary" />, nama: "Kristen", jumlah: 3500 },
    { icon: <MdTempleBuddhist className="w-12 h-12 text-secondary" />, nama: "Buddha", jumlah: 3500 },
    { icon: <FaVihara className="w-12 h-12 text-secondary" />, nama: "Hindu", jumlah: 3500 },
    { icon: <PiUsersThree className="w-12 h-12 text-secondary" />, nama: "Lain-lain", jumlah: 3500 },
  ];

  const COLORS = ["#3b82f6", "#60a5fa", "#93c5fd", "#a5b4fc", "#c4b5fd", "#818cf8", "#6366f1", "#4f46e5"];

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
          <img src={image1} alt="Kantor Kalurahan" className="rounded-xl shadow-md object-cover w-full h-64" />
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
                    color: "#6482AD", // Masukkan warna yang kamu mau (misal: Merah Warning)
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
                    color: "#6482AD", // Masukkan warna yang kamu mau (misal: Merah Warning)
                    fontWeight: "bold",
                  }}
                  itemStyle={{
                    color: "#6482AD", // Masukkan warna yang kamu mau (misal: Merah Warning)
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
                    color: "#6482AD", // Masukkan warna yang kamu mau (misal: Merah Warning)
                    fontWeight: "bold",
                  }}
                  itemStyle={{
                    color: "#6482AD", // Masukkan warna yang kamu mau (misal: Merah Warning)
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
                <Pie data={dataDusun} dataKey="value" outerRadius={175} label={(entry) => entry.name}>
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
                  {d.name} : {d.value} Jiwa
                </li>
              ))}
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
                  color: "#6482AD", // Masukkan warna yang kamu mau (misal: Merah Warning)
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
                <p className="text-3xl font-bold text-secondary">{a.jumlah}</p>
                <p className="text-secondary font-medium text-sm">{a.nama}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </main>
  );
}
