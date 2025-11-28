import { useState } from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import { ChevronLeft, ChevronRight } from "lucide-react";
import img1 from "../assets/blangkon.jpg";
import img2 from "../assets/batik.jpg";
import img3 from "../assets/eggroll.jpg";
import img5 from "../assets/kue.jpg";
import img6 from "../assets/roti.jpg";
import img7 from "../assets/snack.jpg";

const productsData = [
  {
    id: 1,
    name: "Jono Blangkon",
    description: "Lorem ipsum...",
    image: img1,
    operatingHours: "06.00-12.00 WIB",
    address: "Jambon, RT.04/RW.25, Sebaran, Sidoarum, Kec. Godean",
    contact: "0812-3456-7898",
    rating: 4.8,
  },
  {
    id: 2,
    name: "Bass Batik",
    description: "Lorem ipsum...",
    image: img2,
    operatingHours: "06.00-12.00 WIB",
    address: "Jambon, RT.04/RW.25, Sebaran, Sidoarum, Kec. Godean",
    contact: "0812-3456-7898",
    rating: 4.8,
  },
  {
    id: 3,
    name: "Azmi Roti",
    description: "Lorem ipsum...",
    image: img6,
    operatingHours: "06.00-12.00 WIB",
    address: "Jambon, RT.04/RW.25, Sebaran, Sidoarum, Kec. Godean",
    contact: "0812-3456-7898",
    rating: 4.8,
  },
  {
    id: 4,
    name: "Flora Snack Box",
    description: "Lorem ipsum...",
    image: img7,
    operatingHours: "06.00-12.00 WIB",
    address: "Jambon, RT.04/RW.25, Sebaran, Sidoarum, Kec. Godean",
    contact: "0812-3456-7898",
    rating: 4.8,
  },
  {
    id: 5,
    name: "Kaffa Eggroll",
    description: "Lorem ipsum...",
    image: img3,
    operatingHours: "06.00-12.00 WIB",
    address: "Jambon, RT.04/RW.25, Sebaran, Sidoarum, Kec. Godean",
    contact: "0812-3456-7898",
    rating: 4.8,
  },
  {
    id: 6,
    name: "Kue Kering Dizza",
    description: "Lorem ipsum...",
    image: img5,
    operatingHours: "06.00-12.00 WIB",
    address: "Jambon, RT.04/RW.25, Sebaran, Sidoarum, Kec. Godean",
    contact: "0812-3456-7898",
    rating: 4.8,
  },
];

export default function ProdukUsahaPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const itemsPerPage = 6;
  const totalPages = Math.ceil(productsData.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = productsData.slice(startIndex, startIndex + itemsPerPage);

  const filteredProducts = productsData.filter((p) => p.name.toLowerCase().includes(searchQuery.toLowerCase()));

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
        <h1 className="text-4xl font-bold text-center mb-8 text-primary">Produk Usaha</h1>

        {/* {SearchBar } */}
        <SearchBar value={searchQuery} onChange={handleSearch} />

        {/* Grid produk */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {displayData.length > 0 ? (
            displayData.map((product) => (
              <div key={product.id} className="bg-card-bg rounded-lg overflow-hidden shadow-lg transition-shadow">
                <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="text-lg font-bold mb-2 text-primary">{product.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{product.description}</p>
                  <Link to={`/produk/${product.id}`} className="bg-primary text-card-bg px-4 py-2 rounded hover:bg-primary/90 transition-colors">
                    Lihat Detail
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center col-span-3 text-muted-foreground">Tidak ada produk yang cocok dengan pencarian.</p>
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
