"use client";

import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadFull } from "tsparticles";
import { MapPin, Phone, Mail, Facebook, Twitter, Instagram, Linkedin, Clock } from "lucide-react";

export default function Footer() {
  const [engineReady, setEngineReady] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadFull(engine);
    }).then(() => setEngineReady(true));
  }, []);

  return (
    <footer
      className="relative overflow-hidden text-slate-100 pt-20 pb-10"
      style={{
        background: "linear-gradient(180deg, #0B1226 0%, #121A2F 50%, #172758 100%)",
      }}
    >
      {engineReady && (
        <Particles id = "footerParticles"
          className="absolute inset-0 z-0 pointer-events-none"
          options={{
            fullScreen: { enable: false },
            fpsLimit: 60,

            interactivity: {
              events: {
                onHover: {
                  enable: true,
                  mode: "repulse",
                },
              },
              modes: {
                repulse: {
                  distance: 80,
                  duration: 0.4,
                },
              },
            },

            particles: {
              number: {
                value: 120,
                density: { enable: true, area: 900 },
              },

              color: { value: "#ffffff" },

              opacity: {
                value: { min: 0.2, max: 0.7 },
                animation: {
                  enable: true,
                  speed: 0.6,
                  minimumValue: 0.2,
                  sync: false,
                },
              },

              size: {
                value: { min: 1, max: 2.5 },
              },

              move: {
                enable: true,
                speed: 0.8,
                direction: "none",
                random: true,
                outModes: { default: "out" },
              },
            },

            detectRetina: true,
          }}
        />
      )}

      {/* ===== RADIAL GLOW ===== */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[900px]
                        bg-blue-500/10 rounded-full blur-[160px]"
        />
      </div>

      {/* ===== CONTENT ===== */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-14">
        {/* BRAND */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-sm">ITB</span>
            </div>
            <p className="text-white font-semibold leading-tight">
              Program Studi <br /> Sains Kebumian
            </p>
          </div>

          <p className="text-sm text-slate-300 mb-1">Program Magister dan Doktoral Sains Kebumian,</p>
          <p className="text-sm text-slate-300">Sekolah Pascasarjana, Institut Teknologi Bandung</p>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h4 className="font-semibold text-blue-300 mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            {["Profil Program Studi", "Akademik", "Penelitian", "Publikasi", "Beasiswa"].map((item, i) => (
              <li key={i}>
                <a href="#" className="hover:text-white transition">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h4 className="font-semibold text-blue-300 mb-4">Kontak</h4>
          <div className="space-y-4 text-sm">
            <div className="flex items-start gap-2">
              <MapPin size={18} className="text-blue-300" />
              <p>Gedung Labtek XI, Kampus ITB Ganesha, Jl. Ganesha 10, Bandung 40132</p>
            </div>

            <div className="flex items-center gap-2">
              <Phone size={18} className="text-blue-300" />
              <p>(022) 2504955</p>
            </div>

            <div className="flex items-center gap-2">
              <Mail size={18} className="text-blue-300" />
              <p>sk@itb.ac.id</p>
            </div>
          </div>
        </div>

        {/* SOCIAL */}
        <div>
          <h4 className="font-semibold text-blue-300 mb-4">Follow Us</h4>

          <div className="flex gap-4 mb-6">
            {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="w-10 h-10 flex items-center justify-center
                           border border-white/20 rounded-xl
                           hover:bg-white/10 transition"
              >
                <Icon size={20} />
              </a>
            ))}
          </div>

          <div className="bg-white/10 border border-white/20 rounded-xl p-4 text-sm backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-2">
              <Clock size={18} className="text-blue-300" />
              <span className="text-blue-200 font-semibold">Jam Operasional</span>
            </div>
            <p className="text-slate-200">Senin - Jumat: 08:00 - 16:00 WIB</p>
          </div>
        </div>
      </div>

      {/* ===== DIVIDER ===== */}
      <div className="border-t border-white/10 mt-16 pt-6">
        <div
          className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between
                        text-sm text-slate-400 gap-4"
        >
          <p>© 2025 Program Studi Sains Kebumian ITB. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition">
              Terms of Service
            </a>
            <a href="#" className="hover:text-white transition">
              Sitemap
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
