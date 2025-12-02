import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import { ChevronLeft, ChevronRight, MapPin, Clock, Star } from "lucide-react"; // Menambah icon biar lebih cantik
import { supabase } from "../SupabaseClients"; // Sesuaikan path ini

export default function ProdukUsahaPage() {
  // State untuk data dari database
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // State untuk pagination & search
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const itemsPerPage = 6;

  // FETCH DATA DARI SUPABASE
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase.from("produk").select("*").order("name", { ascending: true }); // Urutkan berdasarkan nama A-Z

        if (error) throw error;
        setProducts(data);
      } catch (error) {
        console.error("Error fetching produk:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // FILTERING (Client-side)
  const filteredProducts = products.filter((p) => p.name.toLowerCase().includes(searchQuery.toLowerCase()));

  // PAGINATION LOGIC
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayData = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

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
        <p className="text-primary font-semibold animate-pulse">Memuat produk unggulan...</p>
      </section>
    );
  }

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-primary">Produk Usaha</h1>

        {/* SearchBar */}
        <div className="mb-8">
          <SearchBar value={searchQuery} onChange={handleSearch} />
        </div>

        {/* Grid produk */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {displayData.length > 0 ? (
            displayData.map((product) => (
              <div key={product.id} className="bg-card-bg rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col h-full ">
                {/* Gambar Produk */}
                <div className="relative h-48 overflow-hidden">
                  <img src={product.image_url || "https://placehold.co/600x400?text=Produk+UMKM"} alt={product.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                  {/* Badge Rating */}
                  <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center gap-1 text-xs font-bold text-orange-500 shadow-sm">
                    <Star className="w-3 h-3 fill-current" />
                    {product.rating}
                  </div>
                </div>

                {/* Konten Card */}
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="text-xl font-bold mb-2 text-primary line-clamp-1">{product.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2 flex-1">{product.description}</p>

                  {/* Info Tambahan (Jam & Lokasi) */}
                  <div className="space-y-2 mb-4 text-xs text-secondary font-medium">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-primary" />
                      <span>{product.operating_hours}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-primary shrink-0" />
                      <span className="line-clamp-1">{product.address}</span>
                    </div>
                  </div>

                  <Link to={`/produk/${product.id}`} className="w-full block text-center bg-primary text-card-bg px-4 py-2.5 rounded-lg hover:bg-primary/90 transition-colors font-semibold shadow-md mt-auto">
                    Lihat Detail
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center col-span-3 text-muted-foreground py-12">Tidak ada produk yang cocok dengan pencarian "{searchQuery}".</p>
          )}
        </div>

        {/* Pagination */}
        {!searchQuery && totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-12">
            <button onClick={prev} disabled={currentPage === 1} className="p-2 hover:bg-muted rounded-lg transition-colors border border-border disabled:opacity-50">
              <ChevronLeft className="w-5 h-5" />
            </button>

            {[...Array(totalPages)].map((_, index) => {
              const page = index + 1;
              return (
                <button
                  key={page}
                  onClick={() => goToPage(page)}
                  className={`w-8 h-8 rounded-lg font-semibold transition-colors ${currentPage === page ? "bg-primary text-white shadow-md" : "border border-border text-foreground hover:bg-muted"}`}
                >
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
