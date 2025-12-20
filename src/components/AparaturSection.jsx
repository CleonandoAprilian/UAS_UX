import { useState, useEffect } from "react";
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
  {
    id: 1,
    name: "Adhitya Pratama",
    position: "Dukuh Patrowangsan",
    role: "Carik",
    image: img1,
    pendidikan: "SLTA/Sederajat IPS",
    usia: "42 tahun",
  },
  {
    id: 2,
    name: "Donyasha, S.Pt",
    position: "Dukuh Tangkilan",
    role: "Jago Tani",
    image: img2,
    pendidikan: "D-III/Sederajat TEKNIK OTOMOTIF",
    usia: "38 tahun",
  },
  {
    id: 3,
    name: "Superjanto, SE",
    position: "Dukuh Kramat",
    role: "Kaur Tata Usaha",
    image: img3,
    pendidikan: "SLTA/Sederajat IPS",
    usia: "52 tahun",
  },
  {
    id: 4,
    name: "Mochedi, S.Ag",
    position: "Anggota",
    role: "Kaur Pemberdayaan",
    image: img4,
    lulusan: "Dukuh Patrowangsan",
    pendidikan: "S.Ag",
    usia: "45 tahun",
  },
  {
    id: 5,
    name: "Rizky Andika",
    position: "Anggota",
    role: "Kaur Umum",
    image: img5,
    lulusan: "Dukuh Tangkilan",
    pendidikan: "SLTA/Sederajat IPS",
    usia: "36 tahun",
  },
  {
    id: 6,
    name: "Fitri Handayani",
    position: "Anggota",
    role: "Kasi Pelayanan",
    image: img6,
    lulusan: "Dukuh Kramat",
    pendidikan: "SLTA/Sederajat IPA",
    usia: "40 tahun",
  },
  {
    id: 7,
    name: "Teguh Santoso",
    position: "Anggota",
    role: "Kasi Pemerintahan",
    image: img7,
    lulusan: "Dukuh Patrowangsan",
    pendidikan: "D-III Sosial",
    usia: "48 tahun",
  },
  {
    id: 8,
    name: "Nurul Aini",
    position: "Anggota",
    role: "Kasi Kesejahteraan",
    image: img8,
    lulusan: "Dukuh Tangkilan",
    pendidikan: "S.Kom",
    usia: "39 tahun",
  },
  {
    id: 9,
    name: "Agus Suryanto",
    position: "Anggota",
    role: "Kadus I",
    image: img9,
    lulusan: "Dukuh Kramat",
    pendidikan: "SLTA/Sederajat IPS",
    usia: "55 tahun",
  },
  {
    id: 10,
    name: "Siti Mulyani",
    position: "Anggota",
    role: "Kadus II",
    image: img10,
    lulusan: "Dukuh Patrowangsan",
    pendidikan: "SLTA/Sederajat IPA",
    usia: "44 tahun",
  },
  {
    id: 11,
    name: "Bambang Setiawan",
    position: "Anggota",
    role: "Kadus III",
    image: img11,
    lulusan: "Dukuh Tangkilan",
    pendidikan: "SLTA/Sederajat IPS",
    usia: "50 tahun",
  },
  {
    id: 12,
    name: "Lina Widya",
    position: "Anggota",
    role: "Kadus IV",
    image: img12,
    lulusan: "Dukuh Kramat",
    pendidikan: "SLTA/Sederajat IPA",
    usia: "41 tahun",
  },
];

export default function PamongSection() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(4); // default desktop

  // Deteksi ukuran layar
  useEffect(() => {
    const updateItemsPerPage = () => {
      if (window.innerWidth < 768) {
        setItemsPerPage(1);
      } else {
        setItemsPerPage(4);
      }
    };

    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);
    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

  // Reset halaman saat itemsPerPage berubah
  useEffect(() => {
    setCurrentPage(1);
  }, [itemsPerPage]);

  const totalPages = Math.ceil(pamongData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = pamongData.slice(startIndex, startIndex + itemsPerPage);

  const next = () => setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev));
  const prev = () => setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
  const goToPage = (page) => setCurrentPage(page);

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-primary text-center mb-12">Aparatur Kelurahan Sidoarum</h2>

        {/* Data Pamong */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {currentData.map((person) => (
            <div key={person.id} className="w-full max-w-[280px] mx-auto sm:max-w-none bg-card-bg rounded-2xl p-3 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col items-center">
              <div className="w-full aspect-[3.8/4] mb-4 overflow-hidden">
                <img src={person.image} alt={person.name} className="w-full h-full object-cover object-top" />
              </div>
              <div className="text-center w-full">
                <h3 className="font-extrabold text-lg md:text-xl text-pamong leading-tight mb-1">{person.name}</h3>
                <p className="text-sm md:text-base font-bold text-secondary uppercase mb-1">{person.position}</p>
                <p className="text-xs md:text-sm  mb-0.5 text-primary">{person.pendidikan}</p>
                <p className="text-xs md:text-sm text-primary">Usia {person.usia}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination — dinamis: selalu tampilkan 3 nomor di sekitar currentPage */}
        <div className="flex justify-center items-center gap-2">
          <button onClick={prev} disabled={currentPage === 1} className="p-2 hover:bg-muted rounded-lg transition-colors border border-border disabled:opacity-50">
            <ChevronLeft className="w-5 h-5" />
          </button>

          {(() => {
            let start = Math.max(1, currentPage - 1);
            let end = Math.min(totalPages, start + 2);

            if (end - start < 2) {
              start = Math.max(1, end - 2);
            }

            const pages = [];
            for (let i = start; i <= end; i++) {
              pages.push(i);
            }

            return pages.map((page) => (
              <button key={page} onClick={() => goToPage(page)} className={`w-8 h-8 rounded-lg font-semibold transition-colors ${currentPage === page ? "bg-primary text-white" : "border border-border text-foreground hover:bg-muted"}`}>
                {page}
              </button>
            ));
          })()}

          <button onClick={next} disabled={currentPage === totalPages} className="p-2 hover:bg-muted rounded-lg transition-colors border border-border disabled:opacity-50">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
