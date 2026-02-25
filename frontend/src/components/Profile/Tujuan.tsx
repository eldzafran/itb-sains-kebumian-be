import React from "react";
import { CheckCircle } from "lucide-react";

const objectives = [
  "Menghasilkan lulusan yang kompeten dalam analisis sistem bumi secara holistik",
  "Mengembangkan kemampuan riset interdisipliner di bidang sains bumi",
  "Mempersiapkan ahli yang mampu berkontribusi dalam mitigasi perubahan iklim",
  "Membentuk profesional yang dapat bekerja di lembaga riset, industri, dan pemerintahan",
];

const TujuanProgramStudi: React.FC = () => {
  return (
    <section className="w-full bg-gradient-to-r from-[#0f1f3d] to-[#1f2f55] py-20 px-6">
      <div className="max-w-5xl mx-auto text-center text-white">
        {/* Title */}
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          Tujuan Program Studi
        </h2>

        {/* Subtitle */}
        <p className="text-slate-300 text-lg mb-14">
          Membentuk lulusan berkualitas yang siap menghadapi tantangan masa depan
        </p>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {objectives.map((item, index) => (
            <div
              key={index}
              className="flex items-start gap-4 bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-xl text-left hover:bg-white/10 transition duration-300"
            >
              <CheckCircle className="text-cyan-400 mt-1" size={22} />
              <p className="text-slate-200 leading-relaxed">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TujuanProgramStudi;
