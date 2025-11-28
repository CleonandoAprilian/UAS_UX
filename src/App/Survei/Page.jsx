import React, { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Link } from "react-router-dom";

const survey_questions = [
  {
    id: 1,
    question: "Bagaimana pendapat Saudara tentang kesesuaian persyaratan pelayanan dengan jenis pelayanannya?",
    options: ["Tidak Sesuai", "Kurang Sesuai", "Sesuai", "Sangat Sesuai"],
  },
  {
    id: 2,
    question: "Bagaimana pemahaman Saudara tentang kemudahan prosedur pelayanan di unit ini?",
    options: ["Tidak Mudah", "Kurang Mudah", "Mudah", "Sangat Mudah"],
  },
  {
    id: 3,
    question: "Bagaimana pendapat Saudara tentang kecepatan waktu dalam memberikan pelayanan?",
    options: ["Tidak", "Kurang", "Baik", "Sangat Baik"],
  },
  {
    id: 4,
    question: "Bagaimana pendapat Saudara tentang kejelasan biaya/tarif dalam pelayanan?",
    options: ["Sangat Mahal", "Cukup Mahal", "Murah", "Gratis"],
  },
  {
    id: 5,
    question: "Bagaimana pendapat Saudara tentang kesejahteraan produk pelayanan dengan hasil yang diberikan?",
    options: ["Tidak", "Kurang", "Baik", "Sangat Baik"],
  },
  {
    id: 6,
    question: "Bagaimana pendapat Saudara tentang kompetensi/kemampuan petugas dalam pelayanan?",
    options: ["Tidak Kompeten", "Kurang Kompeten", "Kompeten", "Sangat Kompeten"],
  },
  {
    id: 7,
    question: "Bagaimana pendapat Saudara tentang perilaku petugas dalam pelayanan (kesopanan & keramahan)?",
    options: ["Tidak Sopan dan Ramah", "Kurang Sopan dan Ramah", "Sopan dan Ramah", "Sangat Sopan dan Ramah"],
  },
  {
    id: 8,
    question: "Bagaimana pendapat Saudara tentang kualitas sarana dan prasarana?",
    options: ["Buruk", "Cukup", "Baik", "Sangat Baik"],
  },
  {
    id: 9,
    question: "Bagaimana pendapat Saudara tentang penanganan pengaduan pengguna layanan?",
    options: ["Tidak ada", "Ada Tapi Tidak Berfungsi", "Berfungsi kurang Maksimal", "Dikelola dengan Baik"],
  },
];

export default function SurveiPage() {
  const [formData, setFormData] = useState({
    jenis_layanan: "",
    umur: "",
    jenis_kelamin: "",
    pendidikan: "",
    pekerjaan: "",
    answers: {},
    saran: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Terima kasih telah mengisi survei kepuasan masyarakat!");
  };

  return (
    <main className="min-h-screen bg-gray-50 pt-20">
      <Header />

      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center mb-2 text-primary">Survei Kepuasan Masyarakat</h1>
        <p className="text-center text-gray-500 mb-12">Terima kasih telah berkontribusi dalam meningkatkan kualitas layanan publik</p>

        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md">
          {/* Data Diri */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-6 text-primary">Data Diri</h2>
            <div className="space-y-4">
              {/* Jenis Layanan */}
              <div>
                <label className="block text-sm font-semibold mb-2">Jenis Layanan:</label>
                <select value={formData.jenis_layanan} onChange={(e) => setFormData({ ...formData, jenis_layanan: e.target.value })} className="w-full px-4 py-2 border rounded-lg">
                  <option value="">- Pilih jenis layanan -</option>
                  <option>Layanan Administratif</option>
                  <option>Layanan Sosial</option>
                  <option>Layanan Teknis</option>
                </select>
              </div>

              {/* Umur */}
              <div>
                <label className="block text-sm font-semibold mb-2">Umur:</label>
                <input type="number" value={formData.umur} onChange={(e) => setFormData({ ...formData, umur: e.target.value })} placeholder="Masukkan umur Anda" className="w-full px-4 py-2 border rounded-lg" />
              </div>

              {/* Jenis Kelamin */}
              <div>
                <label className="block text-sm font-semibold mb-2">Jenis Kelamin:</label>
                <div className="space-y-2">
                  {["Laki-Laki", "Perempuan"].map((option) => (
                    <div key={option} className="flex items-center">
                      <input type="radio" id={option} name="jenis_kelamin" value={option} checked={formData.jenis_kelamin === option} onChange={(e) => setFormData({ ...formData, jenis_kelamin: e.target.value })} className="mr-2" />
                      <label htmlFor={option} className="text-sm cursor-pointer">
                        {option}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pendidikan */}
              <div>
                <label className="block text-sm font-semibold mb-2">Pendidikan Terakhir:</label>
                <select value={formData.pendidikan} onChange={(e) => setFormData({ ...formData, pendidikan: e.target.value })} className="w-full px-4 py-2 border rounded-lg">
                  <option value="">Pilih pendidikan</option>
                  <option>Tidak sekolah</option>
                  <option>Tidak Tamat SD/Sederajat</option>
                  <option>Tamat SD/Sederajat</option>
                  <option>Tamat SMP/Sederajat</option>
                  <option>Tamat SMU/Sederajat</option>
                  <option>Tamat D1, D2 atau D3</option>
                  <option>Tamat S1, S2, S3</option>
                </select>
              </div>

              {/* Pekerjaan */}
              <div>
                <label className="block text-sm font-semibold mb-2">Pekerjaan:</label>
                <input type="text" value={formData.pekerjaan} onChange={(e) => setFormData({ ...formData, pekerjaan: e.target.value })} placeholder="Masukkan pekerjaan Anda" className="w-full px-4 py-2 border rounded-lg" />
              </div>
            </div>
          </div>

          {/* Pertanyaan Survei */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-6 text-blue-600">Unsur Pelayanan</h2>
            <div className="space-y-6">
              {survey_questions.map((q) => (
                <div key={q.id} className="pb-6 border-b border-gray-200 last:border-b-0">
                  <p className="font-semibold text-sm mb-3">{q.question}</p>
                  <div className="space-y-2">
                    {q.options.map((option) => (
                      <div key={option} className="flex items-center">
                        <input
                          type="radio"
                          id={`q${q.id}-${option}`}
                          name={`question${q.id}`}
                          value={option}
                          checked={formData.answers[q.id] === option}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              answers: { ...formData.answers, [q.id]: e.target.value },
                            })
                          }
                          className="mr-2"
                        />
                        <label htmlFor={`q${q.id}-${option}`} className="text-sm cursor-pointer">
                          {option}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Saran */}
          <div className="mb-8">
            <label className="block text-sm font-semibold mb-2">Saran dan Masukan:</label>
            <textarea value={formData.saran} onChange={(e) => setFormData({ ...formData, saran: e.target.value })} className="w-full px-4 py-2 border rounded-lg h-24" placeholder="Tuliskan saran dan masukan Anda" />
          </div>

          {/* Tombol Submit */}
          <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition">
            Kirim
          </button>
        </form>

        {/* Link Hasil Survei */}
        <div className="text-center mt-12">
          <p className="text-gray-500 mb-4">Lihat hasil survei</p>
          <Link to="/survei/hasil">
            <button className="border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-100">Lihat Hasil Survei</button>
          </Link>
        </div>
      </div>

      <Footer />
    </main>
  );
}
