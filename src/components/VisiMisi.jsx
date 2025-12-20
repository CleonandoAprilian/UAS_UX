import { motion } from "framer-motion";

export default function VisiMisi() {
  return (
    <section className="py-16 md:py-24 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Judul */}
        <motion.h1 initial={{ opacity: 0, y: -30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: "easeOut" }} className="text-4xl font-bold text-primary text-center mb-16 mt-8 md:mt-0">
          Visi dan Misi
        </motion.h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Visi */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            // whileHover={{ scale: 1.02 }}
            className="bg-card-bg rounded-lg shadow-xl p-8"
          >
            <h2 className="text-2xl font-bold text-primary mb-4">Visi Kaluran Sidoarum 2022-2027</h2>
            <p className="text-foreground leading-relaxed ">
              Mewujudkan Kaluran yang sejahtera, Unggul, Mandiri, Agamis dan Berkhlakul Karimah dengan basis ekonomi yang kuat, didukung oleh tata kelola pemerintahan yang baik serta keberagaman dan kebersamaan masyarakat dengan
              mempertahankan karakteristik lokal.
            </p>
          </motion.div>

          {/* Misi */}
          <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }} className="bg-card-bg rounded-lg shadow-xl p-8">
            <h2 className="text-2xl font-bold text-primary mb-4">Misi Kaluran Sidoarum 2022-2027</h2>

            <ol className="space-y-1.5 text-foreground">
              {[
                "Meningkatkan kualitas hidup masyarakat melalui program pembangunan yang berkelanjutan",
                "Memperkuat pemasyarakatan dan pembinaan masyarakat dengan cara meningkatkan partisipasi",
                "Menciptakan lingkungan yang aman, asri dan sehat",
                "Meningkatkan pembangunan infrastruktur dan sarana prasarana",
                "Memberantas korupsi, kolusi dan nepotisme (KKN)",
              ].map((item, index) => (
                <motion.li key={index} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: index * 0.12 }} className="grid grid-cols-[1.5rem_1fr] gap-3">
                  {/* Nomor */}
                  <span className="font-medium">{index + 1}.</span>

                  {/* Teks */}
                  <span className="leading-relaxed">{item}</span>
                </motion.li>
              ))}
            </ol>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
