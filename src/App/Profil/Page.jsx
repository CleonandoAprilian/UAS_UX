import Header from "../../components/Header";
import Footer from "../../components/Footer";
import VisiMisi from "../../components/VisiMisi";
import SejarahSection from "../../components/SejarahSection";
import PamongSection from "../../components/PamongSection";
import AparaturSection from "../../components/AparaturSection";
import BpkalSection from "../../components/BpkalSection";

export default function ProfilPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <div className="pt-10">
        <VisiMisi />
        <SejarahSection />
        <PamongSection />
        <AparaturSection />
        <BpkalSection />
      </div>
      <Footer />
    </main>
  );
}
