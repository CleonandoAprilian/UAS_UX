import { useEffect, useState, useRef } from "react"; // 1. Tambahkan useRef
import { useParams, Link } from "react-router-dom";
import Footer from "../../../components/Footer";
import { ChevronLeft, Calendar, Eye } from "lucide-react";
import { supabase } from "../../../SupabaseClients";

// Helper format tanggal
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
  const { id } = useParams();
  const [berita, setBerita] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 2. Buat variabel ref untuk menandai apakah view sudah dihitung
  const viewIncremented = useRef(false);

  useEffect(() => {
    const fetchBeritaDetail = async () => {
      try {
        setLoading(true);

        // Ambil data berita
        const { data, error } = await supabase.from("berita").select("*").eq("id", id).single();

        if (error) throw error;
        setBerita(data);

        // 3. Cek apakah view sudah ditambah sebelumnya
        // Jika viewIncremented.current masih false, maka jalankan update
        if (!viewIncremented.current) {
          await supabase.rpc("increment_views", { row_id: id });

          // Tandai bahwa view sudah ditambah agar tidak jalan 2x
          viewIncremented.current = true;
        }
      } catch (err) {
        console.error("Gagal mengambil berita:", err);
        setError("Berita tidak ditemukan atau terjadi kesalahan.");
      } finally {
        setLoading(false);
      }
    };

    fetchBeritaDetail();

    // Reset ref jika ID berubah (user pindah ke berita lain tanpa refresh halaman)
    return () => {
      // Opsional: biasanya tidak perlu di-reset di sini kecuali logic navigasi Anda spesifik,
      // tapi karena dependency array [id], ref akan tetap terjaga per render cycle.
      // Supaya aman saat ganti ID berita, kita reset di awal useEffect atau biarkan [id] mentrigger ulang.
    };
  }, [id]);

  // Reset ref ketika ID berubah (penting jika user klik berita lain dari sidebar/rekomendasi)
  useEffect(() => {
    viewIncremented.current = false;
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
        <Link to={`/berita`} className="text-primary inline-flex items-center gap-2 px-0 py-2 mb-6 hover:underline transition-all">
          <ChevronLeft className="w-5 h-5" />
          Kembali
        </Link>

        <h1 className="text-3xl md:text-5xl font-bold text-primary mb-4 leading-tight">{berita.title}</h1>

        <div className="flex items-center gap-4 text-secondary text-sm font-medium mb-8 border-b pb-4 border-gray-200">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>{formatDate(berita.created_at)}</span>
          </div>
          <div className="flex items-center gap-2">
            <Eye className="w-4 h-4" />
            {/* Logika Tampilan: 
               Karena kita fetch dulu baru update views (async), data yang didapat adalah data LAMA.
               Jadi untuk tampilan visual ke user, kita tambah +1 secara manual di sini (Optimistic UI).
            */}
            <span>{(berita.views || 0) + 1} kali dilihat</span>
          </div>
        </div>

        <div className="w-full aspect-video rounded-xl overflow-hidden mb-8 shadow-lg">
          <img src={berita.image_url || "https://placehold.co/800x400?text=No+Image"} alt={berita.title} className="w-full h-full object-cover" />
        </div>

        {berita.description && <p className="text-lg font-semibold text-foreground/80 mb-6 italic border-l-4 border-primary pl-4">{berita.description}</p>}

        <div className="prose max-w-none text-foreground leading-relaxed text-lg whitespace-pre-line">{berita.content || "Belum ada isi lengkap untuk berita ini."}</div>
      </div>

      <Footer />
    </main>
  );
}
