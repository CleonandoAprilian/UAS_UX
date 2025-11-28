import { useState } from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import { ChevronLeft, ChevronRight } from "lucide-react";
import img1 from "../assets/kali.jpg";
import img2 from "../assets/ngeloram.jpg";
import img3 from "../assets/CH.jpg";
import img4 from "../assets/kecebong.jpg";
import img5 from "../assets/plesiran.jpg";

const wisataData = [
  { id: 1, name: "Kali Apung", description: "Lorem ipsum...", image: img1, operatingHours: "06.00-12.00 WIB", address: "Jambon, RT.04/RW.25, Sebaran, Sidoarum, Kec. Godean", contact: "0812-3456-7898", rating: 4.8 },
  { id: 2, name: "Kampung Nglarang", description: "Lorem ipsum...", image: img2, operatingHours: "06.00-12.00 WIB", address: "Jambon, RT.04/RW.25, Sebaran, Sidoarum, Kec. Godean", contact: "0812-3456-7898", rating: 4.8 },
  { id: 3, name: "Rocket Convention Hall", description: "Lorem ipsum...", image: img3, operatingHours: "06.00-12.00 WIB", address: "Jambon, RT.04/RW.25, Sebaran, Sidoarum, Kec. Godean", contact: "0812-3456-7898", rating: 4.8 },
  { id: 4, name: "Omah Kecebong", description: "Lorem ipsum...", image: img4, operatingHours: "06.00-12.00 WIB", address: "Jambon, RT.04/RW.25, Sebaran, Sidoarum, Kec. Godean", contact: "0812-3456-7898", rating: 4.8 },
  { id: 5, name: "Plesiran Ndeso", description: "Lorem ipsum...", image: img5, operatingHours: "06.00-12.00 WIB", address: "Jambon, RT.04/RW.25, Sebaran, Sidoarum, Kec. Godean", contact: "0812-3456-7898", rating: 4.8 },
];

export default function PotensiWisataPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const itemsPerPage = 6;
  const totalPages = Math.ceil(wisataData.length / itemsPerPage);

  // hitung data untuk pagination
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = wisataData.slice(startIndex, startIndex + itemsPerPage);

  // filter berdasarkan pencarian
  const filteredWisata = wisataData.filter((p) => p.name.toLowerCase().includes(searchQuery.toLowerCase()));

  // navigasi pagination
  const next = () => setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev));
  const prev = () => setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
  const goToPage = (page) => setCurrentPage(page);

  // handle input search
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  // data yang akan ditampilkan di grid
  const displayData = searchQuery ? filteredWisata : currentData;

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-primary">Potensi Wisata</h1>

        {/*  Gunakan komponen SearchBar */}
        <SearchBar value={searchQuery} onChange={handleSearch} placeholder="Cari wisata..." />

        {/*  Grid Wisata */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {displayData.length > 0 ? (
            displayData.map((wisata) => (
              <div key={wisata.id} className="bg-card-bg rounded-lg overflow-hidden shadow-lg transition-shadow">
                <img src={wisata.image} alt={wisata.name} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="text-lg font-bold mb-2 text-primary">{wisata.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{wisata.description}</p>
                  <Link to={`/wisata/${wisata.id}`} className="bg-primary text-card-bg px-4 py-2 rounded hover:bg-primary/90 transition-colors text-sm">
                    Lihat Detail
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center col-span-3 text-muted-foreground">Tidak ada wisata yang cocok dengan pencarian.</p>
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
