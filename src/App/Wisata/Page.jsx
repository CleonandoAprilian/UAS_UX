import Header from "../../components/Header";
import Footer from "../../components/Footer";
import PotensiSection from "../../components/PotensiSection";

export default function ProfilPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <div className="pt-10">
        <PotensiSection />
      </div>
      <Footer />
    </main>
  );
}
