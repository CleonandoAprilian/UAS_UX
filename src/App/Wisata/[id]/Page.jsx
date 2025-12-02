import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Footer from "../../../components/Footer";
import { MapPin, PhoneCall, Clock, ChevronLeft, Star } from "lucide-react";
import { supabase } from "../../../SupabaseClients"; // Pastikan path ini benar

// Konfigurasi Icon & Label (Disesuaikan dengan nama kolom DB: snake_case)
const infoCards = [
  { icon: Clock, key: "operating_hours", label: "Jam Operasional" },
  { icon: MapPin, key: "address", label: "Alamat Lengkap" },
  { icon: PhoneCall, key: "contact", label: "Contact Person" },
];

export default function PotensiDetailPage() {
  const { id } = useParams();
  const [potensi, setPotensi] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPotensiDetail = async () => {
      setLoading(true);
      try {
        // Fetch data berdasarkan ID
        const { data, error } = await supabase.from("potensi").select("*").eq("id", id).single();

        if (error) throw error;
        setPotensi(data);
      } catch (err) {
        console.error("Error fetching produk:", err);
        setError("Produk tidak ditemukan");
      } finally {
        setLoading(false);
      }
    };

    fetchPotensiDetail();
  }, [id]);

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-pulse text-primary font-semibold">Memuat detail produk...</div>
      </main>
    );
  }

  if (error || !potensi) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center bg-background gap-4">
        <p className="text-muted-foreground">Produk tidak ditemukan 😢</p>
        <Link to="/produk" className="text-primary hover:underline">
          Kembali
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Tombol Kembali */}
        <Link to={`/produk`} className="text-primary inline-flex items-center gap-2 px-0 py-2 mb-6 hover:underline">
          <ChevronLeft className="w-5 h-5" />
          Kembali
        </Link>

        {/* Judul Utama */}
        <div className="flex flex-wrap items-center gap-4 mb-6">
          {/* Nama Produk */}
          <h1 className="text-3xl md:text-4xl font-bold text-primary">{potensi.name}</h1>

          {/* Badge Rating */}
          <div className="flex items-center gap-1.5 bg-yellow-50 px-3 py-1.5 rounded-full border border-yellow-200 shadow-sm">
            <Star className="w-5 h-5 text-orange-500 fill-orange-500" />
            <span className="font-bold text-lg text-orange-700">{potensi.rating}</span>
          </div>
        </div>

        {/* Grid: Gambar (Kiri) & Info Card (Kanan) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {/* 1. Gambar Produk (2/3 lebar) */}
          <div className="md:col-span-2 h-[400px] bg-gray-100 rounded-xl overflow-hidden shadow-lg ">
            <img src={potensi.image_url || "https://placehold.co/800x600?text=No+Image"} alt={potensi.name} className="w-full h-full object-cover" />
          </div>

          {/* 2. Card Info (1/3 lebar) */}
          <div className="flex flex-col gap-4">
            {infoCards.map((stat, index) => {
              const Icon = stat.icon;
              // Mengambil data dinamis berdasarkan key (operating_hours, address, contact)
              const value = potensi[stat.key] || "-";

              return (
                <div key={index} className="bg-card-bg rounded-xl shadow-md p-5 flex items-start gap-4  hover:shadow-lg transition-shadow h-[100px]">
                  {/* Icon Box */}
                  <div className="bg-primary p-3 rounded-lg flex items-center justify-center shrink-0">
                    <Icon className="w-6 h-6 text-card-bg" />
                  </div>

                  {/* Text Content */}
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-body2 uppercase tracking-wider mb-1">{stat.label}</span>
                    <span className="text-l font-bold text-primary leading-snug">{value}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 3. Deskripsi & Konten */}
        <div className="bg-card-bg rounded-xl shadow-md p-8 ">
          <h2 className="text-2xl font-bold text-primary mb-4">Tentang {potensi.name}</h2>

          {/* Deskripsi Singkat */}
          <p className="text-lg text-muted-foreground mb-6 italic leading-relaxed">{potensi.description}</p>

          {/* Konten Lengkap (Jika ada kolom 'content' di DB, kalau tidak ada pakai description lagi) */}
          <div className="prose max-w-none text-foreground leading-relaxed whitespace-pre-line">{potensi.content || "Belum ada informasi detail tambahan untuk produk ini."}</div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
