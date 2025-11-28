import Header from "../components/Header";
import HeroSection from "../components/hero-section";
import ServicesSection from "../components/services-section";
import SambutanSection from "../components/Sambutan";
import BeritaSection from "../components/BeritaSection";
import MapSection from "../components/MapSection";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <ServicesSection />
      <SambutanSection />
      <BeritaSection beritaPerPage={3} />
      <MapSection />
      <Footer />
    </main>
  );
}
