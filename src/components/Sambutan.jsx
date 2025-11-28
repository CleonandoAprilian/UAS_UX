import { Venus, Mars } from "lucide-react";
import { PiUsersThree } from "react-icons/pi";
import kalur from "../assets/kalur.png";

export default function SambutanSection() {
  const stats = [
    { icon: PiUsersThree, label: "Penduduk", value: "6.000" },
    { icon: Mars, label: "Laki – Laki", value: "3.500" },
    { icon: Venus, label: "Perempuan", value: "2.500" },
  ];

  return (
    <section className="py-16 md:py-24 bg-secondary2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* grid dengan proporsi 1/3 (gambar) dan 2/3 (teks) */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12 items-center">
          {/* FOTO LURAH */}
          <div className="flex flex-col items-center">
            <div className="relative">
              <div className="w-56 h-56 sm:w-64 sm:h-64 lg:w-72 lg:h-72 rounded-full border-[10px] border-primary2 flex items-center justify-center overflow-hidden shadow-lg bg-white">
                <img src={kalur} alt="Kepala Lurah" className="w-full h-full object-cover rounded-full" />
              </div>
            </div>

            <h3 className="text-xl md:text-2xl font-bold text-primary mt-6">HETY PUJIASTUTIK, S.H</h3>
            <p className="text-secondary mt-1 text-base">Periode 2021 - 2027</p>
          </div>

          {/* TEKS SAMBUTAN */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Sambutan Kepala Lurah Sidoarum</h2>

            <h3 className="text-lg font-semibold text-primary mb-4">Assalamualaikum Wr. Wb.</h3>

            <p className="text-body mb-4 text-justify leading-relaxed">
              Dalam era digital, akses informasi yang cepat dan efektif dapat dimanfaatkan secara positif, salah satunya untuk mendukung kinerja aparatur Pemerintah Desa. Upaya ini diwujudkan melalui konsep Desa Digital (DIGIDES), yang
              memanfaatkan teknologi digital untuk mempromosikan potensi alam, UMKM, dan budaya lokal Desa Sidoarum kepada khalayak luas.
            </p>

            <p className="text-body2 text-justify leading-relaxed mb-8">
              Melalui website desa, usaha masyarakat dapat dipromosikan hingga tingkat nasional, sementara warga dapat mengakses berbagai informasi desa dengan lengkap dalam satu platform.
            </p>

            {/* STATISTIK */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="bg-card-bg rounded-xl shadow-md p-5 flex flex-col items-center text-center">
                    <Icon className="w-8 h-8 text-body2 mb-2" />
                    <p className="text-2xl font-bold text-body2">{stat.value}</p>
                    <p className="text-sm text-body2">{stat.label}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
