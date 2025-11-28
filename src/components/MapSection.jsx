export default function MapSection() {
  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-8 text-center">Peta Kaluran Sidoarum</h2>

        <div className="rounded-lg overflow-hidden shadow-lg h-96 md:h-[500px]">
          <iframe
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31624.848476400148!2d110.29814626539648!3d-7.778578003411629!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7af7dd4d583e69%3A0x5027a76e3569910!2sSidoarum%2C%20Godean%2C%20Sleman%20Regency%2C%20Special%20Region%20of%20Yogyakarta%2C%20Indonesia!5e0!3m2!1sen!2sus!4v1761978602111!5m2!1sen!2sus"
            allowFullScreen
            aria-hidden="false"
            tabIndex={0}
          />
        </div>
      </div>
    </section>
  );
}
