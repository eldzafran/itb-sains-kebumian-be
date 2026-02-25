"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Testimonial() {
  const sectionRef = useRef(null);
  const pinRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "+=150%",
        pin: pinRef.current,
        scrub: true,
        pinSpacing: false,
      });
    }, sectionRef);

    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{ backgroundColor: "#23235B" }}
    >
      <div ref={pinRef} className="py-40">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">

            {/* LEFT SIDE - IMAGE */}
            <div className="relative flex justify-center">
              {/* IMAGE */}
              <div className="w-[320px] h-[320px] rounded-[40px] overflow-hidden">
                <img
                  src="/person.jpg"
                  alt="Daniel Koesnick"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* FLOATING NAME CARD */}
              <div className="absolute -bottom-12 bg-white rounded-2xl px-6 py-4 shadow-xl w-[330px]">
                <p className="font-semibold text-gray-900">
                  Daniel Koesnick
                </p>
                <p className="text-sm text-gray-500">
                  Ketua Prodi
                </p>

                {/* subtle glow */}
                <div className="absolute inset-0 rounded-2xl bg-blue-400 blur-xl opacity-20 -z-10"></div>
              </div>
            </div>

            {/* RIGHT SIDE - TEXT */}
            <div className="relative text-slate-300 text-lg leading-relaxed">

              {/* QUOTE ICON */}
              <div className="absolute -top-6 -left-6 text-6xl text-slate-400 opacity-20">
                “
              </div>

              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
                commodo ligula eget dolor. Aenean massa. Cum sociis natoque
                penatibus et magnis dis parturient montes, nascetur ridiculus
                mus. Donec quam felis, ultricies nec, pellentesque eu, pretium
                quis, sem. Nulla consequat massa quis enim.
              </p>

              <div className="mt-4 text-6xl text-slate-400 opacity-20 text-right">
                ”
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
