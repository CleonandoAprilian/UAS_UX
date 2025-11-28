import { useParams, Link } from "react-router-dom";
import Footer from "../../../components/Footer";
import img1 from "../../../assets/berita.png";
import { Check, ChevronLeft } from "lucide-react";

const panduan_detail = [
  {
    id: 1,
    title: "Panduan Pindah Penduduk",
    image: img1,
    steps: ["Datang ke RT/RW untuk meminta surat pengantar", "Siapkan semua dokumen persyaratan", "Mengisi formulir perpindahan di kantor kelurahan", "Tunggu proses verifikasi (1-3 hari kerja)", "Ambil surat keterangan pindah"],
    requirements: ["Kartu Keluarga (KK)", "KTP asli dan fotokopi", "Surat pengantar RT/RW", "Pas foto 3×4"],
  },
  {
    id: 2,
    title: "Persyaratan Masuk Penduduk",
    image: img1,
    steps: ["Daftar ke RT/RW setempat", "Bawa dokumen yang diperlukan", "Isi formulir pendaftaran penduduk baru", "Proses verifikasi data", "Terima surat bukti penerimaan penduduk"],
    requirements: ["KK atau akta kelahiran", "KTP dari daerah asal", "Surat keterangan pindah dari desa sebelumnya", "Bukti hubungan dengan penduduk lokal"],
  },
  {
    id: 3,
    title: "Persyaratan Akta Kelahiran",
    image: img1,
    steps: ["Persiapan dokumen kesehatan bayi", "Datang ke kantor desa dengan surat keterangan bidan", "Isi formulir permohonan akta kelahiran", "Verifikasi data oleh petugas", "Terima akta kelahiran asli"],
    requirements: ["Surat keterangan lahir dari bidan/dokter", "KTP ayah dan ibu", "KK", "Akta nikah/bukti perkawinan"],
  },
  {
    id: 4,
    title: "Panduan 4",
    image: img1,
    steps: ["Datang ke RT/RW untuk meminta surat pengantar", "Siapkan semua dokumen persyaratan", "Mengisi formulir perpindahan di kantor kelurahan", "Tunggu proses verifikasi (1-3 hari kerja)", "Ambil surat keterangan pindah"],
    requirements: ["Kartu Keluarga (KK)", "KTP asli dan fotokopi", "Surat pengantar RT/RW", "Pas foto 3×4"],
  },
  {
    id: 5,
    title: "Persyaratan 5",
    image: img1,
    steps: ["Daftar ke RT/RW setempat", "Bawa dokumen yang diperlukan", "Isi formulir pendaftaran penduduk baru", "Proses verifikasi data", "Terima surat bukti penerimaan penduduk"],
    requirements: ["KK atau akta kelahiran", "KTP dari daerah asal", "Surat keterangan pindah dari desa sebelumnya", "Bukti hubungan dengan penduduk lokal"],
  },
  {
    id: 6,
    title: "Persyaratan 6",
    image: img1,
    steps: ["Persiapan dokumen kesehatan bayi", "Datang ke kantor desa dengan surat keterangan bidan", "Isi formulir permohonan akta kelahiran", "Verifikasi data oleh petugas", "Terima akta kelahiran asli"],
    requirements: ["Surat keterangan lahir dari bidan/dokter", "KTP ayah dan ibu", "KK", "Akta nikah/bukti perkawinan"],
  },
];

export default function DetailPanduanPage() {
  const { id } = useParams();
  const detail = panduan_detail.find((p) => p.id === parseInt(id));

  if (!detail) {
    return (
      <main className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-12">
          <p className="text-center text-muted-foreground">Panduan tidak ditemukan</p>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        {/* Back Link */}
        <Link to="/panduan" className="text-primary flex items-center gap-2 px-4 py-2">
          <ChevronLeft className="w-4 h-4" />
          Kembali
        </Link>

        {/* Title */}
        <h1 className="text-4xl font-bold mb-8 text-primary">{detail.title}</h1>

        {/* Hero Image */}
        <div className="relative h-80 w-full rounded-lg overflow-hidden mb-12">
          <img src={detail.image} alt={detail.title} className="w-full h-full object-cover" />
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Steps */}
          <div className="md:col-span-2">
            <div className="space-y-4">
              {detail.steps.map((step, idx) => (
                <div key={idx} className="p-6 flex gap-4 bg-card-bg border border-border rounded-lg shadow-sm">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary text-card-bg font-bold">{idx + 1}</div>
                  </div>
                  <p className="text-muted-foreground font-medium flex items-center">{step}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Requirements */}
          <div>
            <div className="p-6 bg-primary/10 border border-primary/20 rounded-lg shadow-sm">
              <h3 className="font-bold text-lg mb-4 text-primary">Dokumen Persyaratan</h3>
              <div className="space-y-3">
                {detail.requirements.map((req, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">{req}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
