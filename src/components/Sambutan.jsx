import React, { useState, useEffect, useRef } from "react";
import { Venus, Mars } from "lucide-react";
import { PiUsersThree } from "react-icons/pi";
import kalur from "../assets/kalur.png";
import { supabase } from "../SupabaseClients";
import { motion, useInView } from "framer-motion";

export default function SambutanSection() {
  const [statistik, setStatistik] = useState({
    penduduk: 0,
    lakiLaki: 0,
    perempuan: 0,
  });

  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  useEffect(() => {
    async function fetchStatistik() {
      try {
        const { data, error } = await supabase.from("penduduk").select("jenis_kelamin");
        if (error) {
          console.error("Error fetching stats:", error);
          return;
        }

        let laki = 0;
        let perempuan = 0;
        data.forEach((p) => {
          const jk = p.jenis_kelamin?.toLowerCase();
          if (jk === "laki-laki") laki++;
          else if (jk === "perempuan") perempuan++;
        });

        setStatistik({
          penduduk: data.length,
          lakiLaki: laki,
          perempuan: perempuan,
        });
      } catch (err) {
        console.error("Unexpected error:", err);
      }
    }

    fetchStatistik();
  }, []);

  const stats = [
    {
      icon: PiUsersThree,
      label: "Penduduk",
      value: statistik.penduduk.toLocaleString("id-ID"),
    },
    {
      icon: Mars,
      label: "Laki – Laki",
      value: statistik.lakiLaki.toLocaleString("id-ID"),
    },
    {
      icon: Venus,
      label: "Perempuan",
      value: statistik.perempuan.toLocaleString("id-ID"),
    },
  ];

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-secondary2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12 items-center">
          {/* Kolom KIRI (Desktop): Foto Lurah — HANYA muncul di lg ke atas */}
          <motion.div initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, ease: "easeOut" }} className="hidden lg:flex flex-col items-center">
            <div className="relative">
              <div className="w-56 h-56 sm:w-64 sm:h-64 lg:w-72 lg:h-72 rounded-full border-[10px] border-primary2 flex items-center justify-center overflow-hidden shadow-lg bg-white">
                <img src={kalur} alt="Kepala Lurah" className="w-full h-full object-cover rounded-full" />
              </div>
            </div>

            <h3 className="text-xl md:text-2xl font-bold text-primary mt-6">HETY PUJIASTUTIK, S.H</h3>
            <p className="text-secondary mt-1 text-base">Periode 2021 - 2027</p>
          </motion.div>

          {/* Kolom KANAN (Desktop): Teks & Statistik */}
          <motion.div initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }} className="space-y-6">
            {/* JUDUL */}
            <h2 className="text-3xl md:text-4xl font-bold text-primary">Sambutan Kepala Lurah Sidoarum</h2>

            {/* FOTO — HANYA muncul di mobile & tablet (< lg) */}
            <motion.div initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, ease: "easeOut", delay: 0.3 }} className="flex flex-col items-center lg:hidden">
              <div className="relative">
                <div className="w-56 h-56 sm:w-64 sm:h-64 rounded-full border-[10px] border-primary2 flex items-center justify-center overflow-hidden shadow-lg bg-white">
                  <img src={kalur} alt="Kepala Lurah" className="w-full h-full object-cover rounded-full" />
                </div>
              </div>

              <h3 className="text-xl md:text-2xl font-bold text-primary mt-6">HETY PUJIASTUTIK, S.H</h3>
              <p className="text-secondary mt-1 text-base">Periode 2021 - 2027</p>
            </motion.div>

            {/* TEKS SAMBUTAN */}
            <h3 className="text-lg font-semibold text-primary">Assalamualaikum Wr. Wb.</h3>

            <p className="text-body text-justify leading-relaxed">
              Dalam era digital, akses informasi yang cepat dan efektif dapat dimanfaatkan secara positif, salah satunya untuk mendukung kinerja aparatur Pemerintah Desa. Upaya ini diwujudkan melalui konsep Desa Digital (DIGIDES), yang
              memanfaatkan teknologi digital untuk mempromosikan potensi alam, UMKM, dan budaya lokal Desa Sidoarum kepada khalayak luas.
            </p>

            <p className="text-body2 text-justify leading-relaxed">
              Melalui website desa, usaha masyarakat dapat dipromosikan hingga tingkat nasional, sementara warga dapat mengakses berbagai informasi desa dengan lengkap dalam satu platform.
            </p>

            {/* STATISTIK */}
            <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.9, ease: "easeOut", delay: 0.5 }} className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.1 * index }}
                    className="bg-card-bg rounded-xl shadow-md p-5 flex flex-col items-center text-center"
                  >
                    <Icon className="w-8 h-8 text-body2 mb-2" />
                    <p className="text-2xl font-bold text-body2">{stat.value}</p>
                    <p className="text-sm text-body2">{stat.label}</p>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
