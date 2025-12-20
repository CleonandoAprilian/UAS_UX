import { Users, Building2, Home, BarChart3 } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const services = [
  {
    icon: Users,
    title: "Data Kependudukan",
    description: "Informasi lengkap tentang kependudukan Kaluran Sidoarum",
    path: "/data",
  },
  {
    icon: Building2,
    title: "Portal Berita",
    description: "Berita terkini dan informasi terpenting dari Kaluran",
    path: "/berita",
  },
  {
    icon: Home,
    title: "Potensi Kaluran",
    description: "Informasi tentang potensi wisata dan usaha Kaluran",
    path: "/wisata",
  },
  {
    icon: BarChart3,
    title: "Survey Kepuasan",
    description: "Berikan masukan untuk perbaikan layanan kami",
    path: "/survei/hasil",
  },
];

export default function ServicesSection() {
  return (
    <section className="py-16 md:py-24 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Judul */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease: "easeOut" }} className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Layanan Utama</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base">Akses berbagai layanan dan informasi terkait Kaluran Sidoarum dari data kependudukan hingga potensi wisata</p>
        </motion.div>

        {/* Grid layanan */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <motion.div key={index} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: index * 0.12 }}>
                <Link to={service.path} className="block no-underline h-full">
                  <motion.div
                    whileHover={{ y: -6, scale: 1.04 }}
                    transition={{ type: "spring", stiffness: 260, damping: 22 }}
                    className="
                      bg-card-bg rounded-xl shadow-md hover:shadow-xl
                      p-4 sm:p-6
                      flex sm:flex-col items-center sm:items-center
                      gap-4 sm:gap-0
                      h-full
                    "
                  >
                    {/* Icon */}
                    <div
                      className="
                      bg-primary
                      w-12 h-12 sm:w-16 sm:h-16
                      rounded-lg
                      flex items-center justify-center
                      shrink-0
                      sm:mb-4
                    "
                    >
                      <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-card-bg" />
                    </div>

                    {/* Text */}
                    <div className="text-left sm:text-center">
                      <h3 className="text-base sm:text-lg font-semibold text-foreground mb-1 sm:mb-2">{service.title}</h3>
                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{service.description}</p>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
