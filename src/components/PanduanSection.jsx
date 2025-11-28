import { useState } from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import { ChevronLeft, ChevronRight, Eye, User } from "lucide-react";
import img1 from "../assets/berita.png";

const PanduanData = [
  {
    id: 1,
    title: "Panduan Pindah Penduduk",
    description: "Lorem ipsum neque aliquam amet diam in proin diam molestie vitae diam sed turpis diam vel scelerisque neque congue libero mattis magna cras dictumst aliquam consectetur nibh....",
    image: img1,
    admin: "Admin",
    date: "30 OKT",
    views: "55 kali",
  },
  {
    id: 2,
    title: "Persyaratan Masuk Penduduk",
    description: "Lorem ipsum neque aliquam amet diam in proin diam molestie vitae diam sed turpis diam vel scelerisque neque congue libero mattis magna cras dictumst aliquam consectetur nibh....",
    image: img1,
    admin: "Admin",
    date: "30 OKT",
    views: "55 kali",
  },
  {
    id: 3,
    title: "Persyaratan Akta Kelahiran",
    description: "Lorem ipsum neque aliquam amet diam in proin diam molestie vitae diam sed turpis diam vel scelerisque neque congue libero mattis magna cras dictumst aliquam consectetur nibh....",
    image: img1,
    admin: "Admin",
    date: "30 OKT",
    views: "55 kali",
  },
  {
    id: 4,
    title: "Syarat Pencatatan Akta Kematian",
    description: "Lorem ipsum neque aliquam amet diam in proin diam molestie vitae diam sed turpis diam vel scelerisque neque congue libero mattis magna cras dictumst aliquam consectetur nibh....",
    image: img1,
    admin: "Admin",
    date: "30 OKT",
    views: "55 kali",
  },
  {
    id: 5,
    title: "Panduan 4",
    description: "Lorem ipsum neque aliquam amet diam in proin diam molestie vitae diam sed turpis diam vel scelerisque neque congue libero mattis magna cras dictumst aliquam consectetur nibh....",
    image: img1,
    admin: "Admin",
    date: "30 OKT",
    views: "55 kali",
  },
  {
    id: 6,
    title: "Panduan 5",
    description: "Lorem ipsum neque aliquam amet diam in proin diam molestie vitae diam sed turpis diam vel scelerisque neque congue libero mattis magna cras dictumst aliquam consectetur nibh....",
    image: img1,
    admin: "Admin",
    date: "30 OKT",
    views: "55 kali",
  },
];

export default function ProdukUsahaPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const itemsPerPage = 6;
  const totalPages = Math.ceil(PanduanData.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = PanduanData.slice(startIndex, startIndex + itemsPerPage);

  const filteredProducts = PanduanData.filter((p) => p.title.toLowerCase().includes(searchQuery.toLowerCase()));

  const next = () => setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev));
  const prev = () => setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
  const goToPage = (page) => setCurrentPage(page);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const displayData = searchQuery ? filteredProducts : currentData;

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-primary">Panduan Layanan Publik</h1>

        {/* {SearchBar } */}
        <SearchBar value={searchQuery} onChange={handleSearch} />

        {/* Grid produk */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {displayData.length > 0 ? (
            displayData.map((panduan) => (
              <Link key={panduan.id} to={`/panduan/${panduan.id}`}>
                <div className="relative bg-card-bg rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col h-[400px]">
                  {/* Gambar utama */}
                  <div className="relative">
                    <img src={panduan.image} alt={panduan.title} className="w-full h-48 object-cover" />
                  </div>

                  {/* Konten card */}
                  <div className="p-4 flex flex-col flex-1">
                    <h3 className="font-bold text-lg mb-2 text-primary line-clamp-2">{panduan.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-3 flex-1">{panduan.description}</p>

                    {/* Info bawah */}
                    <div className="flex items-center justify-between text-xs text-muted-foreground mt-auto">
                      {/* Badge tanggal */}
                      <div className="absolute bottom-0 right-0 bg-primary text-white rounded-tl-lg px-3 py-2 text-center">
                        <p className="text-xs font-bold leading-none">{panduan.date?.split(" ")[0]}</p>
                        <p className="text-[10px] uppercase">{panduan.date?.split(" ")[1]}</p>
                      </div>
                      {/* Info bawah (Admin & Views) */}
                      <div className="flex flex-col items-start gap-1 text-xs text-muted-foreground mt-auto">
                        {/* Admin */}
                        <div className="flex items-center gap-1">
                          <User className="w-4 h-4 text-primary" />
                          <span>Admin</span>
                        </div>

                        {/* Views */}
                        <div className="flex items-center gap-1">
                          <Eye className="w-4 h-4 text-primary" />
                          <span>{panduan.views} kali</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-center col-span-3 text-muted-foreground">Tidak ada panduan yang cocok dengan pencarian.</p>
          )}
        </div>

        {!searchQuery && (
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
