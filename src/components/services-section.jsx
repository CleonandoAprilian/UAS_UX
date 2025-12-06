import { Users, Building2, Home, BarChart3 } from "lucide-react";
import { Link } from "react-router-dom";

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
    <section className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Layanan Utama</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">Akses berbagai layanan dan informasi terkait Kaluran Sidoarum dari data kependudukan hingga potensi wisata</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Link to={service.path} key={index} className="no-underline relative transition-all duration-300 hover:z-10 hover:scale-110 **transform**">
                <div className="bg-card-bg rounded-lg p-6 shadow-lg transition-shadow text-center scale-100 hover:scale-110 transition-all duration-300 ">
                  <div className="bg-primary w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-card-bg" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{service.title}</h3>
                  <p className="text-sm text-muted-foreground">{service.description}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
