import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Venus, Mars } from "lucide-react";
import { PiUsersThree } from "react-icons/pi";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import { Link } from "react-router-dom";

const survey_results = [
  { name: "Tidak sesuai", respondents: 10 },
  { name: "Tidak sempurna", respondents: 30 },
  { name: "Cukup sempurna", respondents: 70 },
  { name: "Tidak memuaskan", respondents: 220 },
  { name: "Cukup memuaskan", respondents: 380 },
  { name: "Cukup puas", respondents: 180 },
  { name: "Sangat memuaskan", respondents: 280 },
  { name: "Sangat puas", respondents: 70 },
];

export default function HasilSurveiPage() {
  const stats = [
    { icon: PiUsersThree, label: "Responden", value: "6.000" },
    { icon: Mars, label: "Laki – Laki", value: "3.500" },
    { icon: Venus, label: "Perempuan", value: "2.500" },
  ];
  const ikm_score = 79.81;
  const survey_period = "25 September – 30 Oktober 2025";

  return (
    <main className="min-h-screen bg-background pt-20">
      <Header />

      <div className="container mx-auto px-4 py-12">
        {/* Judul */}
        <h1 className="text-4xl font-bold text-center mb-2 text-primary">Survey Kepuasan Masyarakat</h1>
        <p className="text-center text-body2 mb-8">Hasil Survey Kepuasan Masyarakat</p>
        <div className="flex justify-center">
          <Link to="/survei">
            <button className="flex border border-primary bg-primary text-card-bg px-4 py-2 rounded-lg hover:bg-secondary hover:text-body mb-5">Isi Survei</button>
          </Link>
        </div>

        {/* Chart Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="md:col-span-3">
            <h2 className="text-2xl font-bold mb-6 text-primary">Hasil Survey Kepuasan Masyarakat</h2>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={survey_results}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" angle={-45} textAnchor="end" height={120} tick={{ fontSize: 12 }} />
                <YAxis />
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
                <Bar dataKey="respondents" fill="#6482AD" name="Jumlah Responden" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Statistik */}
          <div className="flex flex-col gap-4">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="bg-card-bg rounded-xl shadow-md p-4 flex items-center gap-4">
                  <div className="p-3 flex items-center justify-center shrink-0">
                    <Icon className="w-12 h-12 text-primary" />
                  </div>
                  <div className="flex flex-col">
                    <p className="text-3xl font-bold text-body2 leading-none">{stat.value}</p>
                    <p className="text-sm text-body2/80 mt-1">{stat.label}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Nilai IKM */}
        <div className="bg-card-bg p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow mb-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-sm text-body2 mb-2">Nilai Indeks Kepuasan Masyarakat (IKM) :</p>
              <p className="text-5xl font-bold text-primary">{ikm_score}</p>
            </div>
            <div>
              <p className="text-sm text-body2 mb-1">Periode Survey :</p>
              <p className="font-semibold text-body2">{survey_period}</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
