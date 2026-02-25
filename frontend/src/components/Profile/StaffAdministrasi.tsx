import { FolderOpen, Layers, Share2 } from "lucide-react";

export default function StaffAdministrasi() {
  const items = [
    {
      icon: <FolderOpen size={22} className="text-[#0A1738]" />,
      title: "Select a collection",
      desc: "and customize it",
      img: "/card1.png",
    },
    {
      icon: <Layers size={22} className="text-[#0A1738]" />,
      title: "Explore our resources",
      desc: "available in multiple formats",
      img: "/card2.png",
    },
    {
      icon: <Share2 size={22} className="text-[#0A1738]" />,
      title: "Share it with your students",
      desc: "using a link, Microsoft Teams, or Google Classroom",
      img: "/card3.png",
    },
  ];

  return (
    <section className="w-full py-28 px-3 bg-white">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-start">
        {/* LEFT SIDE */}
        <div>
          <h1 className="text-5xl md:text-6xl font-extrabold text-[#0A1738] leading-tight">
            STAF <br />
            PENGAJAR <br />
            DAN ADMINISTRASI
          </h1>

          <button className="mt-10 px-8 py-3 bg-[#0A1738] text-white rounded-full shadow-md hover:bg-[#122359] transition">Cek Lebih Lanjut Staf Pengajar Kami</button>
        </div>

        {/* RIGHT SIDE LIST */}
        <div className="space-y-10">
          {items.map((item, i) => (
            <div key={i} className="flex items-center gap-6 bg-white p-4 rounded-2xl shadow-[0_15px_40px_rgba(0,0,0,0.08)]">
              {/* Image */}
              <img src={item.img} alt="" className="w-20 h-20 rounded-xl object-cover" />

              {/* Text */}
              <div>
                <p className="text-[#0A1738] font-semibold flex items-center gap-2">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white shadow-md border border-slate-200">{item.icon}</span>
                  {item.title}
                </p>

                <p className="text-slate-500 text-sm mt-1">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
