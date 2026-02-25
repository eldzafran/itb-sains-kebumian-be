"use client";

export default function SectionHeader({ title }: { title: string }) {
  return (
    <section className="relative w-full h-[400px] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#121A2F] to-[#172758]" />
      <div className="absolute inset-0 opacity-40">
        {[...Array(60)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full"
            style={{
              width: Math.random() * 2 + 1 + "px",
              height: Math.random() * 2 + 1 + "px",
              top: Math.random() * 100 + "%",
              left: Math.random() * 100 + "%",
              opacity: Math.random() * 0.7 + 0.3,
            }}
          />
        ))}
      </div>


      <h1 className="text-white text-5xl font-bold drop-shadow-[0_0_12px_rgba(255,255,255,0.5)] relative z-10">{title}</h1>

      <div className="absolute bottom-0 left-0 right-0 z-20">
        <div aria-hidden="true" className=" bottom-0 left-0 w-full flex items-end justify-center">
          <div className="flex flex-col items-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 483 40" className="w-full h-8">
              <path d="M0 40C137.185 40 125.676 0 240 0s103.999 40 240 40H0Z" className="fill-white"></path>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
