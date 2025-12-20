import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Import gambar pamong
import img1 from "../assets/kalur.png";
import img2 from "../assets/kalur.png";
import img3 from "../assets/kalur.png";
import img4 from "../assets/kalur.png";
import img5 from "../assets/kalur.png";
import img6 from "../assets/kalur.png";
import img7 from "../assets/kalur.png";
import img8 from "../assets/kalur.png";
import img9 from "../assets/kalur.png";
import img10 from "../assets/kalur.png";
import img11 from "../assets/kalur.png";
import img12 from "../assets/kalur.png";

const pamongData = [
  { id: 1, name: "Adhitya Pratama", position: "Ketua", role: "Carik", image: img1 },
  { id: 2, name: "Donyasha, S.Pt", position: "Anggota", role: "Jago Tani", image: img2 },
  { id: 3, name: "Superjanto, SE", position: "Anggota", role: "Kaur Tata Usaha", image: img3 },
  { id: 4, name: "Mochedi, S.Ag", position: "Anggota", role: "Kaur Pemberdayaan", image: img4 },
  { id: 5, name: "Rizky Andika", position: "Anggota", role: "Kaur Umum", image: img5 },
  { id: 6, name: "Fitri Handayani", position: "Anggota", role: "Kasi Pelayanan", image: img6 },
  { id: 7, name: "Teguh Santoso", position: "Anggota", role: "Kasi Pemerintahan", image: img7 },
  { id: 8, name: "Nurul Aini", position: "Anggota", role: "Kasi Kesejahteraan", image: img8 },
  { id: 9, name: "Agus Suryanto", position: "Anggota", role: "Kadus I", image: img9 },
  { id: 10, name: "Siti Mulyani", position: "Anggota", role: "Kadus II", image: img10 },
  { id: 11, name: "Bambang Setiawan", position: "Anggota", role: "Kadus III", image: img11 },
  { id: 12, name: "Lina Widya", position: "Anggota", role: "Kadus IV", image: img12 },
];

export default function PamongSection() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const totalPages = Math.ceil(pamongData.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = pamongData.slice(startIndex, startIndex + itemsPerPage);

  const next = () => setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev));
  const prev = () => setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
  const goToPage = (page) => setCurrentPage(page);

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-primary text-center mb-12">Pamong Kalurahan Sidoarum</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 justify-items-center">
          {currentData.map((person) => (
            <div key={person.id} className="w-70 h-75 bg-card-bg rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col items-center mx-auto">
              {/* Container Foto (Rasio 3:4 seperti pas foto) */}
              <div className="w-full aspect-[3/4] mb-4 overflow-hidden rounded-xl">
                <img src={person.image} alt={person.name} className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500" />
              </div>

              {/* Bagian Teks */}
              <div className="text-center w-full">
                <h3 className="font-extrabold text-xl text-pamong leading-tight mb-1">{person.name}</h3>
                <p className="text-lg font-bold text-secondary uppercase">{person.position}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center gap-2">
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
      </div>
    </section>
  );
}
