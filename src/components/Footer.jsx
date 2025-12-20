import { Phone, Mail, Instagram } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "../assets/sidoarum.png";

export default function Footer() {
  // Daftar tautan cepat
  const quickLinks = [
    { label: "Beranda", to: "/" },
    { label: "Profil", to: "/profil" },
    { label: "Data", to: "/data" },
    { label: "Berita", to: "/berita" },
    { label: "Potensi Wisata", to: "/wisata" },
    { label: "Produk Usaha", to: "/produk" },
    { label: "Panduan", to: "/panduan" },
    { label: "Survei", to: "/survei/hasil" },
  ];

  return (
    <footer className="bg-primary text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* About */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src={logo} alt="Logo" className="w-20 h-20 object-contain" />
              <div>
                <h3 className="font-bold text-xl text-background2">Kelurahan Sidoarum</h3>
                <p className="text-sm text-ternary text-background2">Jl. Godean KM. 6.5, Nglarang, Sidoarum, Kecamatan Godean, Kabupaten Sleman, Provinsi Yogyakarta, 55564</p>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-lg mb-4 text-background2">Hubungi Kami</h4>
            <div className="space-y-3 text-ternary">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-background2" />
                <a href="tel:082338798647" className="hover:text-secondary text-background2">
                  0823 3879 8647
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-background2" />
                <a href="mailto:desasidoarum55564@gmail.com" className="hover:text-secondary text-background2">
                  desasidoarum55564@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Instagram className="w-4 h-4 text-background2" />
                <a href="#" className="hover:text-secondary text-background2">
                  @kalsidoarum
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-4 text-background2">Tautan Cepat</h4>
            <ul className="space-y-2 text-ternary">
              {quickLinks.map((item) => (
                <li key={item.label}>
                  <Link to={item.to} className="hover:text-secondary transition text-background2 block">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-ternary/40 pt-10 text-center text-sm text-background2">
          <p>&copy; 2025 Kelurahan Sidoarum. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
