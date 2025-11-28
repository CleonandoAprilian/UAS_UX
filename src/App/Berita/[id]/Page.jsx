import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Footer from "../../../components/Footer";
import gambarberita from "../../../assets/berita.png";
import { ChevronLeft } from "lucide-react";

const Berita = [
  { id: 1, title: "Berita 1", description: "Lorem ipsum dolor sit amet...", content: "Ini isi lengkap berita 1. Bisa panjang banget, misalnya paragraf-paragraf detail tentang topiknya.", image: gambarberita, date: "Hari ini" },
  { id: 2, title: "Berita 2", description: "Sed do eiusmod tempor incididunt ut labore.", content: "Isi lengkap berita 2. Di sini bisa ditulis berita lebih detail.", image: gambarberita, date: "Kemarin" },
  { id: 3, title: "Berita 3", description: "Ut enim ad minim veniam.", content: "Isi lengkap berita 3, menjelaskan latar belakang, kutipan, dll.", image: gambarberita, date: "2 hari lalu" },
  { id: 4, title: "Berita 4", description: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.", content: "Isi lengkap berita 3, menjelaskan latar belakang, kutipan, dll.", image: gambarberita, date: "3 hari lalu" },
  { id: 5, title: "Berita 5", description: "Excepteur sint occaecat cupidatat non proident.", content: "Isi lengkap berita 3, menjelaskan latar belakang, kutipan, dll.", image: gambarberita, date: "4 hari lalu" },
  { id: 6, title: "Berita 6", description: "Sunt in culpa qui officia deserunt mollit anim id est laborum.", content: "Isi lengkap berita 3, menjelaskan latar belakang, kutipan, dll.", image: gambarberita, date: "5 hari lalu" },
  { id: 7, title: "Berita 7", description: "Curabitur non nulla sit amet nisl tempus convallis quis ac lectus.", content: "Isi lengkap berita 3, menjelaskan latar belakang, kutipan, dll.", image: gambarberita, date: "6 hari lalu" },
  { id: 8, title: "Berita 8", description: "Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus.", content: "Isi lengkap berita 3, menjelaskan latar belakang, kutipan, dll.", image: gambarberita, date: "1 minggu lalu" },
  { id: 9, title: "Berita 9", description: "Pellentesque in ipsum id orci porta dapibus.", content: "Isi lengkap berita 3, menjelaskan latar belakang, kutipan, dll.", image: gambarberita, date: "8 hari lalu" },
  { id: 10, title: "Berita 10", description: "Donec sollicitudin molestie malesuada.", content: "Isi lengkap berita 3, menjelaskan latar belakang, kutipan, dll.", image: gambarberita, date: "9 hari lalu" },
];

export default function BeritaDetailPage() {
  const { id } = useParams();
  const berita = Berita.find((b) => b.id === parseInt(id));

  if (!berita) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p>Berita tidak ditemukan 😢</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <Link to={`/berita`} className="text-primary  flex items-center gap-2 px-4 py-2">
          <ChevronLeft className="w-4 h-4" />
          kembali
        </Link>
        <h1 className="text-3xl font-bold text-primary mb-0">{berita.title}</h1>
        <p className="text-secondary text-sm font-medium mb-2">{berita.date}</p>
        <img src={berita.image} alt={berita.title} className="w-full h-80 object-cover rounded-xl mb-8" />
        <p className="text-secondary text-sm font-medium mb-2">{berita.description}</p>
        <div className="prose max-w-none text-foreground leading-relaxed">{berita.content}</div>
      </div>

      <Footer />
    </main>
  );
}
