import gamsejarah from "../assets/background.jpg";
export default function SejarahSection() {
  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-primary text-center mb-12">Sejarah Kaluran Sidoarum</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Text Content */}
          <div className="bg-card-bg w-full rounded-lg p-8 shadow-inner">
            <p className="text-foreground mb-4 text-justify">
              Sidoarum adalah sebuah desa yang terletak di Kecamatan Desa Yogyakarta, Indonesia. Desa Sidoarum merupakan wilayah yang penuh dengan sejarah dan budaya. Pada zaman Perangai Darah Istimewa Yogyakarta Pada mula Pemerintahan
              Daerah Istimewa Yogyakarta, Desa Sidoarum merupakan wilayah yang termasuk dalam Kecamatan Godean.
            </p>
            <p className="text-foreground mb-4 text-justify">
              Berdasarkan maklumat Pemerintahan Daerah Istimewa tahun 1940 mengalami Pemekaran menjadi beberapa Kecamatan dari Desa Sidoarum. Pemekaran dilakukan 1 Desa yaitu Odomo dengan Basis Desa tersebut berdasarkan Maklumat Nomor 5
              Tahun 1948 tentang Perubahan Daerah – Daerah Kaluran.
            </p>
          </div>

          {/* Image */}
          <div className="flex justify-center">
            <img src={gamsejarah} alt="Sejarah Kaluran" className="w-full rounded-lg shadow-lg" />
          </div>
        </div>
      </div>
    </section>
  );
}
