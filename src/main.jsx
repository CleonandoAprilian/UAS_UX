import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./App/Page.jsx";
import ProfilPage from "./App/Profil/Page.jsx";
import BeritaPage from "./App/Berita/Page.jsx";
import BeritaDetailPage from "./App/Berita/[id]/Page.jsx";
import ProdukPage from "./App/Produk/Page.jsx";
import ProdukDetailPage from "./App/Produk/[id]/Page.jsx";
import PotensiWisataPage from "./App/Wisata/Page.jsx";
import WisataDetailPage from "./App/Wisata/[id]/Page.jsx";
import PanduanPage from "./App/Panduan/Page.jsx";
import PanduanDetailPage from "./App/Panduan/[id]/Page.jsx";
import SurveiPage from "./App/Survei/Page.jsx";
import HasilPage from "./App/Survei/Hasil/Page.jsx";
import DataPage from "./App/Data/Page.jsx";
import AccessibilityMenu from "./components/AccessibilityMenu";
import ScrollToTop from "./components/ScrollToTop";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AccessibilityMenu />
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* Halaman Utama */}
        <Route path="/" element={<Home />} />

        {/* Halaman Profil */}
        <Route path="/profil" element={<ProfilPage />} />

        {/* Halaman Berita */}
        <Route path="/berita" element={<BeritaPage />} />
        <Route path="/berita/:id" element={<BeritaDetailPage />} />

        {/* Halaman Data */}
        <Route path="/data" element={<DataPage />} />

        {/* Halaman Potensi */}
        <Route path="/wisata" element={<PotensiWisataPage />} />
        <Route path="/wisata/:id" element={<WisataDetailPage />} />
        <Route path="/produk" element={<ProdukPage />} />
        <Route path="/produk/:id" element={<ProdukDetailPage />} />

        {/* Halaman Panduan */}
        <Route path="/panduan" element={<PanduanPage />} />
        <Route path="/panduan/:id" element={<PanduanDetailPage />} />
        {/* Halaman Survei */}
        <Route path="/survei" element={<SurveiPage />} />
        <Route path="/survei/hasil" element={<HasilPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
