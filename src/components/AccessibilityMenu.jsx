import React, { useState, useEffect } from "react";
import { Accessibility, X, Type, Moon, Sun, Eye, MousePointer2, BookOpen, RotateCcw } from "lucide-react";

const AccessibilityMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  // States
  const [fontSize, setFontSize] = useState(100);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMonochrome, setIsMonochrome] = useState(false);
  const [isBigCursor, setIsBigCursor] = useState(false);
  const [isReadingGuide, setIsReadingGuide] = useState(false);
  const [guideY, setGuideY] = useState(0);

  // --- EFFECTS ---

  // 1. Font Size
  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize}%`;
  }, [fontSize]);

  // 2. Dark Mode (DIPERBAIKI)
  useEffect(() => {
    const html = document.documentElement;
    if (isDarkMode) {
      html.classList.add("dark");
      // Memaksa background body jadi gelap jika belum disetting di CSS global
      document.body.style.backgroundColor = "#0f172a"; // slate-900
      document.body.style.color = "#ffffff";
    } else {
      html.classList.remove("dark");
      // Kembalikan ke default (kosongkan agar ikut CSS bawaan)
      document.body.style.backgroundColor = "";
      document.body.style.color = "";
    }
  }, [isDarkMode]);

  // 3. Monochrome (DIPERBAIKI: Hapus logika filter body disini)
  // Kita akan handle ini di bagian return (render) menggunakan overlay div

  // 4. Big Cursor
  useEffect(() => {
    if (isBigCursor) {
      document.body.classList.add("cursor-big");

      // 1. SVG untuk Kursor Normal (Panah Besar)
      // Hotspot: 0 0 (Ujung kiri atas)
      const bigArrowSvg = `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="black" stroke="white" stroke-width="1"><path d="M5.5 3.21V20.8c0 .6.64 1 1.16.7l4.47-3 3.07 5.5 2.4-1.2-3-5.6h6.2c.6 0 1-.7.7-1.2L5.5 3.21z"/></svg>') 0 0, auto`;

      // Atau opsi Tangan Mickey Mouse (Hand Pointer klasik):
      const classicHandSvg = `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="black" stroke="white" stroke-width="1"><path d="M10 24c-3 0-6-2-6-5v-8c0-1.1.9-2 2-2s2 .9 2 2v5h2v-9c0-1.1.9-2 2-2s2 .9 2 2v2h2V6c0-1.1.9-2 2-2s2 .9 2 2v2h2V2c0-1.1.9-2 2-2s2 .9 2 2v11h1c1.7 0 3 1.3 3 3v5c0 3-3 5-6 5h-8z" transform="scale(0.6) translate(5,5)"/></svg>') 10 0, pointer`;

      const style = document.createElement("style");
      style.id = "big-cursor-style";

      // 3. Terapkan CSS terpisah
      style.innerHTML = `
        /* Kursor Default (Panah) untuk semua elemen */
        * { 
          cursor: ${bigArrowSvg} !important; 
        } 
        
        /* Kursor Tangan untuk elemen yang bisa diklik */
        a, button, input, select, textarea, [role="button"], .cursor-pointer { 
          cursor: ${classicHandSvg} !important; 
        }
      `;
      document.head.appendChild(style);
    } else {
      document.body.classList.remove("cursor-big");
      const style = document.getElementById("big-cursor-style");
      if (style) style.remove();
    }
  }, [isBigCursor]);

  // 5. Reading Guide
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isReadingGuide) setGuideY(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isReadingGuide]);

  const resetSettings = () => {
    setFontSize(100);
    setIsDarkMode(false);
    setIsMonochrome(false);
    setIsBigCursor(false);
    setIsReadingGuide(false);
  };

  const OptionButton = ({ label, icon, active, onClick }) => (
    <button
      onClick={onClick}
      className={`flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all duration-200 ${
        active ? "bg-slate-700 text-white border-slate-700" : "bg-white text-slate-600 border-transparent shadow-md hover:shadow-lg hover:scale-105"
      }`}
    >
      <div className="mb-2">{icon}</div>
      <span className="text-xs font-bold">{label}</span>
    </button>
  );

  return (
    <>
      {/* --- FITUR MONOCHROME (SOLUSI BARU) --- */}
      {/* Overlay ini akan menutupi layar dengan filter grayscale tanpa merusak posisi fixed */}
      {isMonochrome && <div className="fixed inset-0 z-[9999] pointer-events-none" style={{ backdropFilter: "grayscale(100%)", WebkitBackdropFilter: "grayscale(100%)" }}></div>}

      {/* Reading Guide Overlay */}
      {isReadingGuide && <div className="fixed left-0 w-full h-8 bg-yellow-400/30 border-y-2 border-yellow-500 pointer-events-none z-[9998]" style={{ top: guideY - 16 }} />}

      {/* FLOATING ACTION BUTTON */}
      <button onClick={() => setIsOpen(true)} className="fixed bottom-6 right-6 z-[50] bg-secondary text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform duration-300">
        <Accessibility size={32} />
      </button>

      {/* MODAL POPUP */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-slate-50 w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden p-6 relative">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-slate-800">Menu Aksesibilitas</h2>
              <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-slate-800">
                <X size={24} />
              </button>
            </div>

            <div className="grid gap-4">
              <div className="bg-white p-4 rounded-2xl shadow-sm flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Type size={24} className="text-slate-700" />
                  <span className="font-bold text-slate-700 text-sm">Sesuaikan Ukuran Font</span>
                </div>
                <div className="flex items-center gap-3 bg-slate-100 rounded-full p-1">
                  <button onClick={() => setFontSize((c) => Math.max(70, c - 10))} className="w-8 h-8 rounded-full bg-slate-300 text-slate-700 font-bold hover:bg-slate-400 flex items-center justify-center">
                    -
                  </button>
                  <span className="font-bold text-slate-700 text-sm w-12 text-center">{fontSize}%</span>
                  <button onClick={() => setFontSize((c) => Math.min(150, c + 10))} className="w-8 h-8 rounded-full bg-slate-700 text-white font-bold hover:bg-slate-800 flex items-center justify-center">
                    +
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <OptionButton label="Mode Gelap" active={isDarkMode} onClick={() => setIsDarkMode(!isDarkMode)} icon={isDarkMode ? <Sun size={32} /> : <Moon size={32} />} />
                <OptionButton label="Satu Warna" active={isMonochrome} onClick={() => setIsMonochrome(!isMonochrome)} icon={<Eye size={32} />} />
                <OptionButton label="Kursor Besar" active={isBigCursor} onClick={() => setIsBigCursor(!isBigCursor)} icon={<MousePointer2 size={32} />} />
                <OptionButton label="Panduan Membaca" active={isReadingGuide} onClick={() => setIsReadingGuide(!isReadingGuide)} icon={<BookOpen size={32} />} />
              </div>
            </div>

            <div className="mt-8 flex justify-center">
              <button onClick={resetSettings} className="bg-slate-600 hover:bg-slate-700 text-white px-8 py-3 rounded-full font-bold flex items-center gap-2 transition-colors shadow-lg w-full justify-center">
                <RotateCcw size={18} />
                Atur Ulang Pengaturan
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AccessibilityMenu;
