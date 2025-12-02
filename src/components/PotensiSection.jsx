import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import { ChevronLeft, ChevronRight, MapPin, Star } from "lucide-react";
import { supabase } from "../SupabaseClients"; // Pastikan path import ini benar

export default function PotensiWisataPage() {
  // State untuk data dari database
  const [wisataList, setWisataList] = useState([]);
  const [loading, setLoading] = useState(true);

  // State pagination & search
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const itemsPerPage = 6;

  // FETCH DATA DARI SUPABASE
  useEffect(() => {
    const fetchWisata = async () => {
      setLoading(true);
      try {
        // Asumsi nama tabel di Supabase adalah 'wisata'
        // Sesuaikan jika nama tabelmu berbeda (misal: 'potensi_wisata')
        const { data, error } = await supabase.from("potensi").select("*").order("id", { ascending: true });

        if (error) throw error;
        setWisataList(data);
      } catch (error) {
        console.error("Error fetching potensi:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWisata();
  }, []);

  // LOGIK FILTERING (Client-side)
  const filteredWisata = wisataList.filter((p) => p.name.toLowerCase().includes(searchQuery.toLowerCase()));

  // LOGIK PAGINATION
  const totalPages = Math.ceil(filteredWisata.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayData = filteredWisata.slice(startIndex, startIndex + itemsPerPage);

  // Navigasi
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
        <p className="text-primary font-semibold animate-pulse">Memuat potensi wisata...</p>
      </section>
    );
  }

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-primary">Potensi Wisata</h1>

        {/* SearchBar */}
        <div className="mb-8">
          <SearchBar value={searchQuery} onChange={handleSearch} placeholder="Cari wisata..." />
        </div>

        {/* Grid Wisata */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {displayData.length > 0 ? (
            displayData.map((potensi) => (
              <div key={potensi.id} className="bg-card-bg rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col h-full ">
                {/* Gambar */}
                <div className="relative h-48 overflow-hidden">
                  <img src={potensi.image_url || "https://placehold.co/600x400?text=Wisata"} alt={potensi.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center gap-1 text-xs font-bold text-orange-500 shadow-sm">
                    <Star className="w-3 h-3 fill-current" />
                    {potensi.rating}
                  </div>
                </div>

                <div className="p-5 flex flex-col flex-1">
                  <h3 className="text-xl font-bold mb-2 text-primary line-clamp-1">{potensi.name}</h3>

                  {/* Deskripsi Singkat */}
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2 flex-1">{potensi.description}</p>

                  {/* Lokasi (Opsional: ditampilkan di card depan) */}
                  <div className="flex items-start gap-1 text-xs text-secondary mb-4">
                    <MapPin className="w-4 h-4 shrink-0" />
                    <span className="line-clamp-1">{potensi.address}</span>
                  </div>

                  <Link to={`/wisata/${potensi.id}`} className="w-full block text-center bg-primary text-card-bg px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors font-semibold mt-auto">
                    Lihat Detail
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center col-span-3 text-muted-foreground py-12">Tidak ada wisata yang cocok dengan pencarian "{searchQuery}".</p>
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
