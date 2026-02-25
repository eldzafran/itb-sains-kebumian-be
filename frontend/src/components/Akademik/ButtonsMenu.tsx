import { Search, Share2, Camera } from "lucide-react";

export default function ButtonMenuAkademik() {
  const features = [
    {
      icon: <Search size={20} />,
      label: "Search our resource library",
      gradient: "from-pink-300 via-pink-400 to-purple-300",
    },
    {
      icon: <Share2 size={20} />,
      label: "Share with your class",
      gradient: "from-green-300 via-cyan-300 to-blue-300",
    },
    {
      icon: <Camera size={20} />,
      label: "Capture student learning",
      gradient: "from-yellow-300 via-orange-300 to-red-300",
    },
  ];

  return (
    <section className="w-full bg-white py-20">
      <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6 px-4">
        {features.map((item, i) => (
          <div
            key={i}
            className={`
              flex items-center gap-3 px-6 py-4 rounded-2xl shadow-md 
              text-slate-700 font-medium cursor-pointer transition 
              bg-gradient-to-r ${item.gradient}
            `}
          >
            <div className="p-2 bg-white rounded-full shadow-sm">{item.icon}</div>
            <span>{item.label}</span>
          </div>
        ))}
      </div>

      <div className="max-w-6xl mx-auto mt-24 px-4 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">Discover engaging resources for your classroom</h2>
          <p className="text-slate-600 leading-relaxed">
            Each piece of media comes with a ready-made activity designed to engage your students’ problem-solving and critical-thinking skills. Every resource is professionally produced, fact-checked, and vetted by experts.
          </p>
        </div>

        <div className="flex justify-center">
          <img src="/bumi.png" alt="Student with VR" className="rounded-3xl shadow-lg w-full max-w-md object-cover" />
        </div>
      </div>

      <div className="max-w-4xl mx-auto mt-28 px-4">
        <div className="rounded-3xl overflow-hidden shadow-xl w-full">
          <iframe
            className="w-full aspect-video"
            src="https://www.youtube.com/embed/HgP8LqG_Hj4"
            title="YouTube video testimonial"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>

        <p className="mt-4 text-center text-slate-600 text-sm">Hear from educators about their experience using Ocean School resources.</p>
      </div>
    </section>
  );
}