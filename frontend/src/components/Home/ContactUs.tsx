import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import gsap from "gsap";

gsap.registerPlugin(ScrollTrigger);

export default function ContactUs() {
  const sectionRef = useRef(null);
  const pinRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "+=120%",
        pin: pinRef.current,
        scrub: true,
        pinSpacing: false,
      });
    }, sectionRef);

    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, []);

  const cards = [
    {
      title: "Sains Atmosfer",
      desc: "Mempelajari dinamika atmosfer, cuaca, iklim, dan interaksinya dengan komponen sistem bumi lainnya.",
      image: "/atmosfer.jpg",
      tags: ["Mitigasi Bencana"],
    },
    {
      title: "Oseanografi",
      desc: "Mengkaji sistem kelautan termasuk fisika, kimia, biologi laut dan perannya dalam sistem iklim global.",
      image: "/oseanografi.jpg",
      tags: ["Kelautan", "Transisi Energi"],
    },
    {
      title: "Interaksi Sistem Bumi",
      desc: "Memahami interaksi kompleks antara atmosfer, hidrosfer, litosfer, dan biosfer.",
      image: "/eco.jpg",
      tags: ["Earth System", "Keberlanjutan"],
    },
  ];

  return (
    <section ref={sectionRef} className="relative bg-slate-100 py-32 z-10">
      <div ref={pinRef} className="max-w-7xl mx-auto px-6">

        {/* Title */}
        <h2 className="text-5xl font-bold text-center text-slate-900 mb-20">
          Bidang Studi Keilmuan
        </h2>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-3 gap-10">
          {cards.map((card, index) => (
            <div
              key={index}
              className="group relative h-[520px] rounded-3xl overflow-hidden shadow-xl"
            >
              {/* Background Image */}
              <img
                src={card.image}
                alt={card.title}
                className="absolute inset-0 w-full h-full object-cover transition duration-700 group-hover:scale-110"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

              {/* Content */}
              <div className="relative h-full flex flex-col justify-between p-8 text-white">
                <div>
                  <h3 className="text-2xl font-semibold mb-4">
                    {card.title}
                  </h3>

                  <p className="text-sm text-white/90 mb-6 leading-relaxed">
                    {card.desc}
                  </p>

                  <div className="flex flex-wrap gap-3">
                    {card.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-4 py-1 text-xs rounded-full border border-white/40 backdrop-blur-md bg-white/10"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom */}
                <div className="flex items-center justify-between border-t border-white/20 pt-6">
                  <span className="text-sm font-medium">
                    Pelajari Bidang
                  </span>
                  <span className="text-xl transition group-hover:translate-x-1">
                    →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
