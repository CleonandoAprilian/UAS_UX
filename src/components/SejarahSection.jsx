import gamsejarah from "../assets/background.jpg";
import { motion } from "framer-motion";

export default function SejarahSection() {
  return (
    <section className="py-16 md:py-24 bg-muted/30 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }} className="text-3xl md:text-4xl font-bold text-primary text-center mb-12">
          Sejarah Kaluran Sidoarum
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Image — sekarang di atas di mobile, di kiri di desktop */}
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6, delay: 0.2 }} className="flex justify-center">
            <img src={gamsejarah} alt="Sejarah Kaluran" className="w-full max-w-lg h-auto rounded-lg shadow-lg object-cover" />
          </motion.div>

          {/* Text Content — sekarang di bawah di mobile, di kanan di desktop */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-card-bg w-full rounded-lg p-6 sm:p-8 shadow-inner"
          >
            <p className="text-foreground mb-4 text-justify">
              Sidoarum adalah sebuah desa yang terletak di Kecamatan Godean, Kabupaten Sleman, Daerah Istimewa Yogyakarta, Indonesia. Desa Sidoarum merupakan wilayah yang penuh dengan sejarah dan budaya. Pada masa awal berdirinya
              Pemerintahan Daerah Istimewa Yogyakarta, Desa Sidoarum termasuk dalam wilayah Kecamatan Godean.
            </p>
            <p className="text-foreground mb-4 text-justify">
              Berdasarkan Maklumat Pemerintah Daerah Istimewa Yogyakarta tahun 1948, terjadi pemekaran wilayah. Desa Sidoarum ikut mengalami pemekaran menjadi beberapa desa, salah satunya adalah Desa Odomo. Pemekaran ini didasarkan pada
              Maklumat Nomor 5 Tahun 1948 tentang Perubahan Daerah-Daerah Kalurahan.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
