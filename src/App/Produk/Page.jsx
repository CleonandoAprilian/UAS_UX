import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ProdukSection from "../../components/ProdukSection";

export default function ProfilPage() {
  return (
    <main className="min-h-screen bg-background pt-10">
      <Header />
      <div className="">
        <ProdukSection />
      </div>
      <Footer />
    </main>
  );
}
