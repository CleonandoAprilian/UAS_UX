import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import { ChevronLeft, ChevronRight, Eye, User } from "lucide-react";
import { supabase } from "../SupabaseClients"; // Pastikan path import ini benar

// Helper function untuk format tanggal (misal: 2023-10-30 -> 30 OKT)
const formatDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  const day = date.getDate();
  // Mengambil nama bulan dalam bahasa Indonesia (short form)
  const month = date.toLocaleDateString("id-ID", { month: "short" }).toUpperCase();
  return { day, month };
};

export default function BeritaSection({ beritaPerPage = 3 }) {
  // State untuk data dan loading
  const [beritaList, setBeritaList] = useState([]);
  const [loading, setLoading] = useState(true);

  // State pagination & search
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  // FETCH DATA DARI SUPABASE
  useEffect(() => {
    const fetchBerita = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase.from("berita").select("*").order("created_at", { ascending: false }); // Urutkan dari yang terbaru

        if (error) throw error;
        setBeritaList(data);
      } catch (error) {
        console.error("Error fetching berita:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBerita();
  }, []);

  // LOGIK FILTERING & PAGINATION (Client-side)
  // Kita filter dari 'beritaList' (data dari DB), bukan variable statis lagi
  const filteredBerita = beritaList.filter((b) => b.title.toLowerCase().includes(searchQuery.toLowerCase()));

  const totalPages = Math.ceil(filteredBerita.length / beritaPerPage);
  const startIndex = (currentPage - 1) * beritaPerPage;
  const displayData = filteredBerita.slice(startIndex, startIndex + beritaPerPage);

  // Navigasi
  const next = () => setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev));
  const prev = () => setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
  const goToPage = (page) => setCurrentPage(page);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  if (loading) {
    return <div className="py-24 text-center">Memuat berita...</div>;
  }

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Judul dan Search */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Portal Berita</h2>
          <SearchBar value={searchQuery} onChange={handleSearch} />
        </div>

        {/* Grid Berita */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {displayData.length > 0 ? (
            displayData.map((news) => {
              // Format tanggal per item
              const { day, month } = formatDate(news.created_at);

              return (
                <Link key={news.id} to={`/berita/${news.id}`}>
                  <div className="relative bg-card-bg rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col h-[400px]">
                    {/* Gambar utama (Ambil dari image_url Supabase) */}
                    <div className="relative">
                      <img src={news.image_url || "https://placehold.co/600x400?text=No+Image"} alt={news.title} className="w-full h-48 object-cover" />
                    </div>

                    {/* Konten card */}
                    <div className="p-4 flex flex-col flex-1">
                      <h3 className="font-bold text-lg mb-2 text-primary line-clamp-2">{news.title}</h3>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-3 flex-1">{news.description}</p>

                      {/* Info bawah */}
                      <div className="flex items-center justify-between text-xs text-muted-foreground mt-auto">
                        {/* Badge tanggal dinamis */}
                        <div className="absolute bottom-0 right-0 bg-secondary text-card-bg rounded-tl-lg px-3 py-2 text-center">
                          <p className="text-xs font-bold leading-none">{day}</p>
                          <p className="text-[10px] uppercase">{month}</p>
                        </div>

                        {/* Admin & Views */}
                        <div className="flex flex-col items-start gap-1 text-xs text-muted-foreground mt-auto">
                          <div className="flex items-center gap-1">
                            <Eye className="w-4 h-4 text-primary" />
                            {/* Tambahkan kata "kali" karena di DB cuma angka */}
                            <span>{news.views} kali</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })
          ) : (
            <p className="text-center col-span-3 text-muted-foreground">Tidak ada berita yang cocok dengan pencarian.</p>
          )}
        </div>

        {/* Pagination */}
        {!searchQuery && totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-8">
            <button onClick={prev} disabled={currentPage === 1} className="p-2 hover:bg-muted rounded-lg transition-colors border border-border disabled:opacity-50">
              <ChevronLeft className="w-5 h-5" />
            </button>

            {[...Array(totalPages)].map((_, index) => {
              const page = index + 1;
              return (
                <button key={page} onClick={() => goToPage(page)} className={`w-8 h-8 rounded-lg font-semibold transition-colors ${currentPage === page ? "bg-primary text-white" : "border border-border text-foreground hover:bg-muted"}`}>
                  {page}
                </button>
              );
            })}

            <button onClick={next} disabled={currentPage === totalPages} className="p-2 hover:bg-muted rounded-lg transition-colors border border-border disabled:opacity-50">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
