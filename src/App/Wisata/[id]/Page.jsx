import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Footer from "../../../components/Footer";
import img1 from "../../../assets/kali.jpg";
import img2 from "../../../assets/ngeloram.jpg";
import img3 from "../../../assets/CH.jpg";
import img4 from "../../../assets/kecebong.jpg";
import img5 from "../../../assets/plesiran.jpg";
import { MapPin, PhoneCall, Clock, ChevronLeft } from "lucide-react";

const lophone = [
  { icon: Clock, key: "operatingHours" },
  { icon: MapPin, key: "address" },
  { icon: PhoneCall, key: "contact" },
];
const wisataData = [
  { id: 1, name: "Kali Apung", description: "Lorem ipsum...", image: img1, operatingHours: "06.00-12.00 WIB", address: "Jambon, RT.04/RW.25, Sebaran, Sidoarum, Kec. Godean", contact: "0812-3456-7898", rating: 4.8 },
  { id: 2, name: "Kampung Nglarang", description: "Lorem ipsum...", image: img2, operatingHours: "06.00-12.00 WIB", address: "Jambon, RT.04/RW.25, Sebaran, Sidoarum, Kec. Godean", contact: "0812-3456-7898", rating: 4.8 },
  { id: 3, name: "Rocket Convention Hall", description: "Lorem ipsum...", image: img3, operatingHours: "06.00-12.00 WIB", address: "Jambon, RT.04/RW.25, Sebaran, Sidoarum, Kec. Godean", contact: "0812-3456-7898", rating: 4.8 },
  { id: 4, name: "Omah Kecebong", description: "Lorem ipsum...", image: img4, operatingHours: "06.00-12.00 WIB", address: "Jambon, RT.04/RW.25, Sebaran, Sidoarum, Kec. Godean", contact: "0812-3456-7898", rating: 4.8 },
  { id: 5, name: "Plesiran Ndeso", description: "Lorem ipsum...", image: img5, operatingHours: "06.00-12.00 WIB", address: "Jambon, RT.04/RW.25, Sebaran, Sidoarum, Kec. Godean", contact: "0812-3456-7898", rating: 4.8 },
];

export default function WisataDetailPage() {
  const { id } = useParams();
  const wisata = wisataData.find((p) => p.id === parseInt(id));

  if (!wisata) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p>Wisata tidak ditemukan 😢</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <Link to={`/wisata`} className="text-primary  flex items-center gap-2 px-4 py-2">
          <ChevronLeft className="w-4 h-4" />
          kembali
        </Link>
        <div className="flex items-center gap-3 mb-4">
          <h1 className="text-3xl font-bold text-primary">{wisata.name}</h1>
          <span className="text-sm font-semibold text-black bg-yellow-100 px-3 py-1 rounded-full shadow-sm">⭐ {wisata.rating}</span>
        </div>
        {/* Grid untuk gambar + card */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Gambar produk 2/3 */}
          <div className="md:col-span-2">
            <img src={wisata.image} alt={wisata.name} className="w-full h-80 object-cover rounded-xl" />
          </div>

          {/* Card info 1/3 */}
          <div className="flex flex-col gap-4">
            {lophone.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="bg-card-bg rounded-xl shadow-md p-5 flex flex-col">
                  <div className="flex items-start gap-3 mb-4">
                    {/* Icon dengan background */}
                    <div className="bg-primary p-3 rounded flex items-center justify-center">
                      <Icon className="w-6 h-6 text-card-bg" />
                    </div>

                    {/* Teks di bawah (kolom vertikal) */}
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-body2">{stat.key === "address" ? "Alamat Lengkap" : stat.key === "contact" ? "Contact Person" : stat.key === "operatingHours" ? "Jam Operasional" : ""}</span>
                      <span className="text-sm font-bold text-primary">{wisata[stat.key]}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Penjelasan/deskripsi full-width */}
        <div className="bg-card-bg rounded-xl shadow-md p-6">
          <h1 className="text-3xl font-bold text-primary mb-4">{wisata.name}</h1>
          <p className="text-muted-foreground mb-4">{wisata.description}</p>
          <div className="text-foreground leading-relaxed">{wisata.content}</div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
