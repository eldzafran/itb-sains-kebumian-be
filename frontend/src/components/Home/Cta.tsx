"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MoveUpRight } from "lucide-react";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function CTA() {
  const sectionRef = useRef(null);
  const pinRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "+=10%",
        pin: pinRef.current,
        scrub: true,
        pinSpacing: false,
      });
    }, sectionRef);

    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* CTA SECTION (DIPIN) */}
      <section ref={sectionRef} className="relative h-screen z-20">
        <div
          ref={pinRef}
          className="h-screen flex items-center justify-center"
          style={{
            background: "linear-gradient(12deg, #121B30 , #17233E,#172758,#192745,#121E35 )",
          }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full mb-6">
              <MoveUpRight size={16} className="text-slate-700" />
              <span className="text-sm text-black">Daftar Program Magister dan Doktoral</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-white mb-2">BERGABUNG</h1>
            <h1 className="text-5xl md:text-7xl font-bold text-white">DENGAN KAMI</h1>
          </div>
        </div>
      </section>

      {/* ⬇️ SPACER (INI YANG BIKIN FIX TERASA) */}
      <div className="h-[10vh]" />
    </>
  );
}
