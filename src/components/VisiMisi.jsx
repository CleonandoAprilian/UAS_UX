export default function VisiMisi() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-primary text-center mb-16">Visi dan Misi</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Visi */}
          <div className="bg-card-bg rounded-lg shadow-xl p-8">
            <h2 className="text-2xl font-bold text-primary mb-4">Visi Kaluran Sidoarum 2022-2027</h2>
            <p className="text-foreground leading-relaxed">
              Mewujudkan Kaluran yang sejahtera, Unggul, Mandiri, Agamis dan Berkhlakul Karimah dengan basis ekonomi yang kuat, didukung oleh tata kelola pemerintahan yang baik serta keberagaman dan kebersamaan masyarakat dengan
              mempertahankan karakteristik lokal.
            </p>
          </div>

          {/* Misi */}
          <div className="bg-card-bg rounded-lg shadow-xl p-8">
            <h2 className="text-2xl font-bold text-primary mb-4">Misi Kaluran Sidoarum 2022-2027</h2>
            <ol className="list-decimal list-inside space-y-2 text-foreground">
              <li>Meningkatkan kualitas hidup masyarakat melalui program pembangunan yang berkelanjutan</li>
              <li>Memperkuat pemasyarakatan dan pembinaan masyarakat dengan cara meningkatkan partisipasi</li>
              <li>Menciptakan lingkungan yang aman, asri dan sehat</li>
              <li>Meningkatkan pembangunan infrastruktur dan sarana prasarana</li>
              <li>Memberantas korupsi, kolusi dan nepotisme (KKN)</li>
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
