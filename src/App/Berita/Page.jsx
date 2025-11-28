import Header from "../../components/Header";
import Footer from "../../components/Footer";
import BeritaSection from "../../components/BeritaSection";

export default function BeritaPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <div className="pt-10">
        <BeritaSection beritaPerPage={6} />
      </div>
      <Footer />
    </main>
  );
}
