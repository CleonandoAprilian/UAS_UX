import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  // useLocation mendeteksi perubahan URL (pathname)
  const { pathname } = useLocation();

  useEffect(() => {
    // Kembalikan scroll ke koordinat (0, 0) alias paling atas
    window.scrollTo(0, 0);

    // Jika ingin scroll halus (smooth), gunakan ini:
    // window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [pathname]); // useEffect jalan setiap 'pathname' berubah

  return null; // Komponen ini tidak merender tampilan apa-apa
}
