import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import { ChevronLeft, ChevronRight, Eye, User } from "lucide-react";
import { supabase } from "../SupabaseClients"; // Pastikan path benar

// Helper untuk format tanggal (Contoh: 30 OKT)
const formatDate = (dateString) => {
  if (!dateString) return { day: "-", month: "-" };
  const date = new Date(dateString);
  const day = date.getDate();
  // Mengambil 3 huruf pertama nama bulan (Jan, Feb, Mar...)
  const month = date.toLocaleDateString("id-ID", { month: "short" }).toUpperCase().replace(".", "");
  return { day, month };
};

export default function PanduanLayananPage() {
  const [panduanList, setPanduanList] = useState([]);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const itemsPerPage = 6;

  // FETCH DATA DARI SUPABASE
  useEffect(() => {
    const fetchPanduan = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase.from("panduan").select("*").order("created_at", { ascending: false }); // Yang terbaru di atas

        if (error) throw error;
        setPanduanList(data);
      } catch (error) {
        console.error("Error fetching panduan:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPanduan();
  }, []);

  // FILTER & PAGINATION
  const filteredPanduan = panduanList.filter((p) => p.title.toLowerCase().includes(searchQuery.toLowerCase()));

  const totalPages = Math.ceil(filteredPanduan.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayData = filteredPanduan.slice(startIndex, startIndex + itemsPerPage);

  const next = () => setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev));
  const prev = () => setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
  const goToPage = (page) => setCurrentPage(page);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  if (loading) {
    return (
      <section className="py-24 bg-background min-h-screen flex justify-center items-center">
        <p className="text-primary font-semibold animate-pulse">Memuat panduan layanan...</p>
      </section>
    );
  }

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-primary">Panduan Layanan Publik</h1>

        <div className="mb-8">
          <SearchBar value={searchQuery} onChange={handleSearch} placeholder="Cari panduan..." />
        </div>

        {/* Grid Panduan */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {displayData.length > 0 ? (
            displayData.map((panduan) => {
              // Format Tanggal Per Item
              const { day, month } = formatDate(panduan.created_at);

              return (
                <Link key={panduan.id} to={`/panduan/${panduan.id}`}>
                  <div className="relative bg-card-bg rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col h-[360px]">
                    {/* Gambar Utama */}
                    <div className="relative h-48 overflow-hidden">
                      <img src={panduan.image_url || "https://placehold.co/600x400?text=Panduan"} alt={panduan.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                    </div>

                    {/* Konten Card */}
                    <div className="p-4 flex flex-col flex-1">
                      <h3 className="font-bold text-lg mb-2 text-primary line-clamp-2">{panduan.title}</h3>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-3 flex-1">{panduan.description}</p>

                      {/* Info Bawah */}
                      <div className="flex items-center justify-between text-xs text-muted-foreground mt-auto ">
                        {/* Badge Tanggal*/}
                        <div className="absolute bottom-0 right-0 bg-secondary text-card-bg rounded-tl-lg px-3 py-2 text-center">
                          <p className="text-xs font-bold leading-none">{day}</p>
                          <p className="text-[10px] uppercase">{month}</p>
                        </div>

                        {/* Views */}
                        <div className="flex flex-col items-start gap-2 w-full">
                          <div className="flex items-center gap-2">
                            <Eye className="w-4 h-4 text-primary" />
                            {/* Tambah kata "kali" manual karena DB cuma angka */}
                            <span>{panduan.views || 0} kali</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })
          ) : (
            <p className="text-center col-span-3 text-muted-foreground py-12">Tidak ada panduan yang cocok dengan pencarian "{searchQuery}".</p>
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
