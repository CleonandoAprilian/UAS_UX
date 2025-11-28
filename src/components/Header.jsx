import { Link, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import logo from "../assets/sidoarum.png";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const location = useLocation();
  const dropdownRef = useRef(null);

  const menuItems = [
    { label: "Beranda", to: "/" },
    { label: "Profil", to: "/profil" },
    { label: "Data", to: "/data" },
    { label: "Berita", to: "/berita" },
    {
      label: "Potensi & Produk Usaha",
      submenu: [
        { label: "Potensi Wisata", to: "/wisata" },
        { label: "Produk Usaha", to: "/produk" },
      ],
    },
    { label: "Panduan", to: "/panduan" },
    {
      label: "Survei",
      to: "/survei/hasil",
    },
  ];

  // Tutup dropdown jika klik di luar
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpenDropdown(null);
      }
    };

    // hanya aktif di desktop
    if (window.innerWidth >= 768) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 bg-background border-b border-secondary shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Navbar utama */}
        <div className="flex justify-between items-center h-24">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="Logo" className="w-16 h-16 object-contain" />
            <div>
              <h1 className="text-2xl font-bold text-primary leading-tight italic">Kalurahan</h1>
              <h1 className="text-2xl font-bold text-primary leading-tight italic">Sidoarum</h1>
            </div>
          </Link>

          {/* Menu Desktop */}
          <nav className="hidden md:flex gap-8 relative">
            {menuItems.map((item, index) => {
              const isActive = location.pathname === item.to;

              if (item.submenu) {
                return (
                  <div key={item.label} ref={dropdownRef} className="relative">
                    <button
                      onClick={() => setOpenDropdown(openDropdown === index ? null : index)}
                      className={`flex items-center gap-1 text-base font-medium pb-2 transition-colors ${openDropdown === index ? "text-primary" : "text-body2 hover:text-primary"}`}
                    >
                      {item.label}
                      <ChevronDown className={`w-4 h-4 transition-transform ${openDropdown === index ? "rotate-180" : ""}`} />
                    </button>

                    {openDropdown === index && (
                      <div className="absolute left-0 mt-2 w-52 bg-card-bg border border-gray-200 rounded-lg shadow-md py-2 z-50">
                        {item.submenu.map((sub) => (
                          <Link key={sub.label} to={sub.to} className={`block px-4 py-2 text-sm transition-colors ${location.pathname === sub.to ? "text-primary bg-primary/10" : "text-body2 hover:text-primary hover:bg-gray-100"}`}>
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={item.label}
                  to={item.to}
                  className={`relative text-base font-medium pb-2 transition-colors ${
                    isActive ? "text-primary after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-[2px] after:bg-primary" : "text-body2 hover:text-primary"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Tombol mobile */}
          <button className="md:hidden p-2 rounded-md hover:bg-gray-100" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Menu Mobile */}
        {isOpen && (
          <nav className="md:hidden flex flex-col gap-1 pb-4 relative z-50">
            {menuItems.map((item, index) => {
              const isActive = location.pathname === item.to;

              if (item.submenu) {
                return (
                  <div key={item.label}>
                    <button
                      onClick={() => setOpenDropdown(openDropdown === index ? null : index)}
                      className="w-full text-left font-medium px-4 py-2 rounded-md flex justify-between items-center text-gray-700 hover:text-primary hover:bg-gray-100 transition-colors"
                    >
                      {item.label}
                      <ChevronDown className={`w-4 h-4 transition-transform ${openDropdown === index ? "rotate-180" : ""}`} />
                    </button>

                    {openDropdown === index && (
                      <div className="flex flex-col pl-6">
                        {item.submenu.map((sub) => (
                          <Link
                            key={sub.label}
                            to={sub.to}
                            onClick={() => {
                              setTimeout(() => setIsOpen(false), 100);
                            }}
                            className={`block px-4 py-2 rounded-md font-medium transition-colors ${location.pathname === sub.to ? "text-primary bg-primary/10" : "text-gray-700 hover:text-primary hover:bg-gray-100"}`}
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={item.label}
                  to={item.to}
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-2 rounded-md font-medium transition-colors ${isActive ? "text-primary bg-primary/10" : "text-gray-700 hover:text-primary hover:bg-gray-100"}`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        )}
      </div>
    </header>
  );
}
