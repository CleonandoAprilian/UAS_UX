import { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import Footer from "../../../components/Footer";
import { Check, ChevronLeft, User, Eye } from "lucide-react";
import { supabase } from "../../../SupabaseClients"; // Pastikan path ini benar sesuai struktur foldermu

export default function DetailPanduanPage() {
  const { id } = useParams();
  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const viewIncremented = useRef(false);

  useEffect(() => {
    const fetchPanduanDetail = async () => {
      try {
        setLoading(true);
        // 1. Ambil data panduan berdasarkan ID
        const { data, error } = await supabase.from("panduan").select("*").eq("id", id).single();

        if (error) throw error;
        setDetail(data);

        if (!viewIncremented.current) {
          await supabase.rpc("increment_views", { row_id: id });

          // Tandai bahwa view sudah ditambah agar tidak jalan 2x
          viewIncremented.current = true;
        }
      } catch (err) {
        console.error("Error fetching panduan:", err);
        setError("Panduan tidak ditemukan.");
      } finally {
        setLoading(false);
      }
    };

    fetchPanduanDetail();
  }, [id]);

  useEffect(() => {
    viewIncremented.current = false;
  }, [id]);

  if (loading) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-primary font-semibold">Memuat panduan...</div>
      </main>
    );
  }

  if (error || !detail) {
    return (
      <main className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-12 text-center">
          <p className="text-muted-foreground mb-4">{error || "Data tidak ditemukan"}</p>
          <Link to="/panduan" className="text-primary hover:underline">
            Kembali ke Daftar Panduan
          </Link>
        </div>
        <Footer />
      </main>
    );
  }

  // Fallback aman: Jika steps/requirements kosong/null, ganti dengan array kosong []
  // Helper aman untuk parsing JSON
  const safeParse = (data) => {
    try {
      if (typeof data === "string") return JSON.parse(data); // Jika string, ubah jadi array
      if (Array.isArray(data)) return data; // Jika sudah array, biarkan
      return []; // Jika null/undefined, kembalikan array kosong
    } catch (e) {
      console.error("Gagal parsing JSON:", e);
      return [];
    }
  };

  const stepsList = safeParse(detail.steps);
  const reqList = safeParse(detail.requirements);

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        {/* Tombol Kembali */}
        <Link to="/panduan" className="text-primary inline-flex items-center gap-2 px-0 py-2 mb-6 hover:underline">
          <ChevronLeft className="w-5 h-5" />
          Kembali
        </Link>

        {/* Judul Utama */}
        <h1 className="text-3xl md:text-5xl font-bold mb-6 text-primary">{detail.title}</h1>

        {/* Info Meta (Admin & Views) */}
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-8">
          <div className="flex items-center gap-1">
            <User className="w-4 h-4" /> Admin
          </div>
          <div className="flex items-center gap-1">
            <Eye className="w-4 h-4" /> {(detail.views || 0) + 1} dilihat
          </div>
        </div>

        {/* Hero Image */}
        <div className="relative h-[300px] md:h-[400px] w-full rounded-xl overflow-hidden mb-12 shadow-lg border border-border">
          <img src={detail.image_url || "https://placehold.co/1200x600?text=Panduan+Layanan"} alt={detail.title} className="w-full h-full object-cover" />
        </div>

        {/* Grid Layout: Langkah (Kiri) & Persyaratan (Kanan) */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* BAGIAN KIRI: Steps (Langkah-langkah) */}
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold text-primary mb-6">Langkah - Langkah</h2>
            {stepsList.length > 0 ? (
              <div className="space-y-4">
                {stepsList.map((step, idx) => (
                  <div key={idx} className="p-6 flex gap-4 bg-card-bg border border-border rounded-xl shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary text-white font-bold text-lg shadow-sm">{idx + 1}</div>
                    </div>
                    <p className="text-foreground font-medium flex items-center leading-relaxed">{step}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground italic">Belum ada langkah-langkah yang ditambahkan.</p>
            )}

            {/* Deskripsi Tambahan (Content) */}
            {detail.content && (
              <div className="mt-10 p-6 bg-gray-50 rounded-xl border border-border">
                <h3 className="font-bold text-lg mb-2 text-primary">Keterangan Lengkap:</h3>
                <p className="text-foreground leading-relaxed whitespace-pre-line">{detail.content}</p>
              </div>
            )}
          </div>

          {/* BAGIAN KANAN: Requirements (Persyaratan) */}
          <div>
            <div className="sticky top-24">
              <div className="p-6 bg-primary/5 border border-primary/20 rounded-xl shadow-sm">
                <h3 className="font-bold text-xl mb-6 text-primary flex items-center gap-2">Dokumen Persyaratan</h3>

                {reqList.length > 0 ? (
                  <div className="space-y-4">
                    {reqList.map((req, idx) => (
                      <div key={idx} className="flex items-start gap-3 p-2 rounded-lg hover:bg-white transition-colors">
                        <div className="mt-1 bg-primary/10 p-1 rounded-full">
                          <Check className="w-4 h-4 text-primary stroke-[3px]" />
                        </div>
                        <span className="text-sm font-medium text-foreground/80 leading-snug">{req}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground italic">Tidak ada persyaratan khusus.</p>
                )}

                {/* Tombol Bantuan */}
                <div className="mt-8 pt-6 border-t border-primary/10">
                  <p className="text-xs text-muted-foreground mb-3 text-center">Butuh bantuan lebih lanjut?</p>
                  <button className="w-full bg-primary text-white py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors shadow-sm">
                    <a href="#">Hubungi Petugas Desa</a>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
