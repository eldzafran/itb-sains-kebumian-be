"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, FlaskConical } from "lucide-react";

export default function FasilitasCarousel() {
  const slides = ["/gym.jpg", "/bmg.jpg", "/toserba.jpg"];
  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [current]);

  const fasilitas = [
    {
      title: "Laboratorium Atmosfer",
      desc: "Dilengkapi dengan peralatan monitoring cuaca dan kualitas udara modern",
    },
    {
      title: "Laboratorium Oseanografi",
      desc: "Fasilitas untuk penelitian fisika, kimia, dan biologi laut",
    },
    {
      title: "Pusat Komputasi",
      desc: "High-performance computing untuk pemodelan dan simulasi sistem bumi",
    },
    {
      title: "Stasiun Monitoring",
      desc: "Jaringan stasiun monitoring atmosfer dan laut di berbagai lokasi",
    },
    {
      title: "Perpustakaan Digital",
      desc: "Akses ke jurnal internasional dan database penelitian terkini",
    },
    {
      title: "Ruang Kolaborasi",
      desc: "Ruang modern untuk diskusi kelompok dan workshop",
    },
  ];

  return (
    <section className="w-full py-32 px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto text-center">
        {/* Heading */}
        <h2 className="text-5xl font-extrabold text-gray-800 mb-4">
          Fasilitas
        </h2>
        <p className="text-gray-500 max-w-2xl mx-auto mb-16">
          Fasilitas modern dan lengkap untuk mendukung pembelajaran dan
          penelitian
        </p>

        {/* Grid Card */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {fasilitas.map((item, idx) => (
            <div
              key={idx}
              className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition duration-300 text-left"
            >
              <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-blue-100 mb-4">
                <FlaskConical className="text-blue-600" size={20} />
              </div>

              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {item.title}
              </h3>

              <p className="text-gray-500 text-sm leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Carousel */}
        <div className="relative w-full h-[420px] md:h-[520px] overflow-hidden rounded-3xl shadow-2xl">
          <img
            src={slides[current]}
            alt="Fasilitas Kampus"
            className="w-full h-full object-cover transition duration-700 ease-in-out"
          />

          {/* Left Button */}
          <button
            onClick={prevSlide}
            className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition"
          >
            <ChevronLeft size={22} />
          </button>

          {/* Right Button */}
          <button
            onClick={nextSlide}
            className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition"
          >
            <ChevronRight size={22} />
          </button>
        </div>

        {/* Indicator */}
        <div className="flex justify-center mt-6 gap-3">
          {slides.map((_, index) => (
            <div
              key={index}
              onClick={() => setCurrent(index)}
              className={`w-3 h-3 rounded-full cursor-pointer transition ${
                index === current ? "bg-gray-800 scale-110" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
