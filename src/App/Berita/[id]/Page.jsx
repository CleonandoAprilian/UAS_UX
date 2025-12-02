import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Footer from "../../../components/Footer";
import { ChevronLeft, Calendar, Eye } from "lucide-react";
import { supabase } from "../../../SupabaseClients"; // Pastikan path ini benar

// Helper format tanggal (sama seperti di halaman list)
const formatDate = (dateString) => {
  if (!dateString) return "-";
  return new Date(dateString).toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

export default function BeritaDetailPage() {
  const { id } = useParams(); // Ambil ID dari URL
  const [berita, setBerita] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBeritaDetail = async () => {
      try {
        setLoading(true);

        // 1. Ambil data berita berdasarkan ID
        const { data, error } = await supabase.from("berita").select("*").eq("id", id).single(); // .single() karena kita cuma mau 1 data spesifik

        if (error) throw error;

        setBerita(data);

        // 2. (Fitur Tambahan) Update jumlah views +1
        // Kita tidak perlu menunggu ini selesai (fire and forget)
        await supabase.rpc("increment_views", { row_id: id });
        // *Catatan: Jika RPC belum dibuat, cara manual ada di bawah*

        // Cara manual update views (tanpa RPC):
        /*
        const newViews = (data.views || 0) + 1;
        await supabase
          .from("berita")
          .update({ views: newViews })
          .eq("id", id);
        */
      } catch (err) {
        console.error("Gagal mengambil berita:", err);
        setError("Berita tidak ditemukan atau terjadi kesalahan.");
      } finally {
        setLoading(false);
      }
    };

    fetchBeritaDetail();
  }, [id]);

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-pulse text-primary font-semibold">Memuat berita...</div>
      </main>
    );
  }

  if (error || !berita) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center bg-background gap-4">
        <p className="text-lg text-muted-foreground">{error || "Berita tidak ditemukan 😢"}</p>
        <Link to="/berita" className="text-primary hover:underline">
          Kembali ke daftar berita
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Tombol Kembali */}
        <Link to={`/berita`} className="text-primary inline-flex items-center gap-2 px-0 py-2 mb-6 hover:underline transition-all">
          <ChevronLeft className="w-5 h-5" />
          Kembali
        </Link>

        {/* Judul Berita */}
        <h1 className="text-3xl md:text-5xl font-bold text-primary mb-4 leading-tight">{berita.title}</h1>

        {/* Info Meta (Tanggal & Views) */}
        <div className="flex items-center gap-4 text-secondary text-sm font-medium mb-8 border-b pb-4 border-gray-200">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>{formatDate(berita.created_at)}</span>
          </div>
          <div className="flex items-center gap-2">
            <Eye className="w-4 h-4" />
            <span>{berita.views ? berita.views + 1 : 1} kali dilihat</span>
          </div>
        </div>

        {/* Gambar Utama */}
        <div className="w-full aspect-video rounded-xl overflow-hidden mb-8 shadow-lg">
          <img src={berita.image_url || "https://placehold.co/800x400?text=No+Image"} alt={berita.title} className="w-full h-full object-cover" />
        </div>

        {/* Deskripsi Singkat (Bold/Italic) */}
        {berita.description && <p className="text-lg font-semibold text-foreground/80 mb-6 italic border-l-4 border-primary pl-4">{berita.description}</p>}

        {/* Isi Lengkap Berita (Content) */}
        <div className="prose max-w-none text-foreground leading-relaxed text-lg whitespace-pre-line">
          {/* whitespace-pre-line berguna agar enter/baris baru di database terbaca */}
          {berita.content || "Belum ada isi lengkap untuk berita ini."}
        </div>
      </div>

      <Footer />
    </main>
  );
}
