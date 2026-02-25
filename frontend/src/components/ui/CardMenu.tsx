import { ArrowUpRight } from "lucide-react";

export default function CardMenu({ image, title, description, link, tags = [] }) {
  return (
    <a
      href={link}
      className="group block w-full max-w-xs rounded-3xl overflow-hidden shadow-[0_4px_12px_rgba(0,0,0,0.12)] bg-white hover:shadow-xl transition-all duration-300"
    >
      <div
        className="relative h-40 bg-cover bg-center"
        style={{ backgroundImage: `url(${image})` }}
      >
        {/* TAGS */}
        <div className="absolute top-3 left-4 flex gap-2">
          {tags.map((tag, i) => (
            <span
              key={i}
              className="bg-slate-900/70 text-white text-xs px-3 py-1 rounded-full backdrop-blur-sm"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* ICON TOP RIGHT */}
        <div className="absolute top-3 right-3 bg-white/80 p-1.5 rounded-full backdrop-blur-sm shadow">
          <ArrowUpRight size={16} className="text-slate-700" />
        </div>
      </div>

      {/* CONTENT SECTION */}
      <div className="bg-[#e9f3ff] p-6 rounded-t-3xl">
        <h3 className="text-lg font-semibold text-slate-900 mb-2">
          {title}
        </h3>

        <p className="text-sm text-slate-600 leading-relaxed mb-3">
          {description}
        </p>

        {/* Resources count (optional) */}
        <p className="text-xs text-slate-500">
          {tags.length} resources
        </p>
      </div>
    </a>
  );
}
