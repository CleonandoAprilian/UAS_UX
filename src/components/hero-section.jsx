import { Search } from "lucide-react";
import bg from "../assets/background.jpg";

export default function HeroSection() {
  return (
    <section className="relative w-full h-[100vh] bg-gradient-to-b from-primary/5 to-background flex flex-col items-center justify-center text-center px-4 pt-24">
      {/* Background overlay */}
      <div
        className="absolute inset-0 bg-center bg-cover opacity-20"
        style={{
          backgroundImage: `url(${bg})`, // <--- gunakan template literal
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        <h1 className="text-4xl md:text-4xl font-extrabold text-primary mb-3">Selamat Datang!</h1>
        <p className="text-4xl md:text-4xl font-extrabold text-primary mb-3">Di Website Kalurahan Sidoarum</p>
        <p className="text-2xl md:text-2xl font-medium text-primary2 mb-3">Jl. Godean KM 6.5, Ngjaruman, Sidoarum, Godean, </p>
        <p className="text-2xl md:text-2xl font-medium text-primary2 mb-3"> Sleman, Yogyakarta 55564</p>
      </div>
    </section>
  );
}
