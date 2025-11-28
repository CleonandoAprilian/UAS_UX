import { useState } from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import { ChevronLeft, ChevronRight, Eye, User } from "lucide-react";
import gambarberita from "../assets/berita.png";

const Berita = [
  { id: 1, title: "Berita 1", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", image: gambarberita, date: "30 OKT", views: "55 kali" },
  { id: 2, title: "Berita 2", description: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", image: gambarberita, date: "29 OKT", views: "47 kali" },
  { id: 3, title: "Berita 3", description: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.", image: gambarberita, date: "28 OKT", views: "62 kali" },
  { id: 4, title: "Berita 4", description: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.", image: gambarberita, date: "27 OKT", views: "38 kali" },
  { id: 5, title: "Berita 5", description: "Excepteur sint occaecat cupidatat non proident.", image: gambarberita, date: "26 OKT", views: "80 kali" },
  { id: 6, title: "Berita 6", description: "Sunt in culpa qui officia deserunt mollit anim id est laborum.", image: gambarberita, date: "25 OKT", views: "25 kali" },
];

export default function BeritaSection({ beritaPerPage = 3 }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const totalPages = Math.ceil(Berita.length / beritaPerPage);

  const filteredBerita = Berita.filter((b) => b.title.toLowerCase().includes(searchQuery.toLowerCase()));

  const startIndex = (currentPage - 1) * beritaPerPage;
  const currentBerita = Berita.slice(startIndex, startIndex + beritaPerPage);

  const next = () => setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev));
  const prev = () => setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
  const goToPage = (page) => setCurrentPage(page);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const displayData = searchQuery ? filteredBerita : currentBerita;

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
            displayData.map((news) => (
              <Link key={news.id} to={`/berita/${news.id}`}>
                <div className="relative bg-card-bg rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col h-[360px]">
                  {/* Gambar utama */}
                  <div className="relative">
                    <img src={news.image} alt={news.title} className="w-full h-48 object-cover" />
                  </div>

                  {/* Konten card */}
                  <div className="p-4 flex flex-col flex-1">
                    <h3 className="font-bold text-lg mb-2 text-primary line-clamp-2">{news.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-3 flex-1">{news.description}</p>

                    {/* Info bawah */}
                    <div className="flex items-center justify-between text-xs text-muted-foreground mt-auto">
                      {/* Badge tanggal */}
                      <div className="absolute bottom-0 right-0 bg-secondary text-card-bg rounded-tl-lg px-3 py-2 text-center">
                        <p className="text-xs font-bold leading-none">{news.date?.split(" ")[0]}</p>
                        <p className="text-[10px] uppercase">{news.date?.split(" ")[1]}</p>
                      </div>

                      {/* Admin & Views */}
                      <div className="flex flex-col items-start gap-1 text-xs text-muted-foreground mt-auto">
                        <div className="flex items-center gap-1">
                          <User className="w-4 h-4 text-primary" />
                          <span>Admin</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Eye className="w-4 h-4 text-primary" />
                          <span>{news.views}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-center col-span-3 text-muted-foreground">Tidak ada berita yang cocok dengan pencarian.</p>
          )}
        </div>

        {/* Pagination */}
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
