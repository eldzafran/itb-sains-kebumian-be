import { ArrowUpRight } from "lucide-react";

export default function JoinSection() {
  return (
    <section
      className="w-full rounded-t-[40px] px-4 sm:px-6 py-12 sm:py-24 flex items-center justify-center overflow-hidden"
      style={{
        background:
          "linear-gradient(125.33deg, #121B30 -3.22%, #17233E 26.15%, #172758 45.24%, #192745 61.88%, #121E35 86.37%)",
      }}
    >
      <div className="text-center max-w-5xl">
        {/* Button */}
        <div className="mb-6 sm:mb-10 flex justify-center">
          <button className="flex items-center gap-2 bg-white text-slate-800 px-4 sm:px-6 py-2 sm:py-3 rounded-full font-medium text-xs sm:text-sm shadow-md hover:scale-105 transition">
            <ArrowUpRight size={16} className="sm:size-[18px]" strokeWidth={2} />
            Daftar Program Magister dan Doktoral
          </button>
        </div>

        {/* Heading */}
        <h1 className="font-extrabold text-white text-4xl sm:text-6xl md:text-7xl lg:text-[96px] leading-tight sm:leading-[70px] md:leading-[90px] lg:leading-[110px] tracking-tight">
          BERGABUNG <br className="hidden sm:block" />
          DENGAN KAMI
        </h1>
      </div>
    </section>
  );
}