import { motion } from "framer-motion";
import bg from "../assets/background.jpg";

export default function HeroSection() {
  return (
    <section className="relative w-full min-h-[100vh] bg-gradient-to-b from-primary/5 to-background flex flex-col items-center justify-center text-center px-4 pt-16 pb-12 md:pt-24 md:pb-20">
      {/* Background overlay */}
      <div
        className="absolute inset-0 bg-center bg-cover opacity-20"
        style={{
          backgroundImage: `url(${bg})`,
        }}
      />

      {/* Animasi: Fade + Scale Halus — SEMUA BERSAMAAN */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.9,
          ease: "easeOut", // atau coba "easeInOut"
        }}
        className="relative z-10 max-w-4xl w-full"
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-primary mb-3 px-2">Selamat Datang!</h1>
        <p className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-primary mb-4 px-2">Di Website Kalurahan Sidoarum</p>
        <p className="text-lg sm:text-xl md:text-2xl font-medium text-primary2 mb-2 px-2">Jl. Godean KM 6.5, Ngjaruman, Sidoarum, Godean,</p>
        <p className="text-lg sm:text-xl md:text-2xl font-medium text-primary2 mb-3 px-2">Sleman, Yogyakarta 55564</p>
      </motion.div>
    </section>
  );
}
