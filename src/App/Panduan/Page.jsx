import Header from "../../components/Header";
import Footer from "../../components/Footer";
import PanduanSection from "../../components/PanduanSection";

export default function ProfilPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <div className="pt-10">
        <PanduanSection />
      </div>
      <Footer />
    </main>
  );
}
