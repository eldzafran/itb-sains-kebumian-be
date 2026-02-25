import { useState } from "react";
import { Search, GraduationCap } from "lucide-react";

const SPAN = {
  1: "col-span-1",
  2: "col-span-2",
  3: "col-span-3",
  4: "col-span-4",
  5: "col-span-5",
  6: "col-span-6",
  7: "col-span-7",
  8: "col-span-8",
  9: "col-span-9",
  10: "col-span-10",
  11: "col-span-11",
  12: "col-span-12",
};

export default function DataDirectory({ subtitle, badgeText, searchPlaceholder, categories = [], columns = [], data = [], icon: Icon }) {
  const [active, setActive] = useState(categories[0]?.key);

  return (
    <section className="w-full py-28 px-6 bg-white">
      {/* ================= HEADER ================= */}
      <div className="max-w-5xl mx-auto text-center">
        <div
          className="flex items-center justify-center gap-3 text-white py-3 px-6 rounded-full w-fit mx-auto shadow-lg"
          style={{
            background: "linear-gradient(180deg, #51A2FF 0%, #8EC5FF 100%)",
          }}
        >
          {Icon && <Icon size={20} />}
          <span className="font-semibold">{badgeText}</span>
        </div>

        <p className="mt-4 text-slate-600 max-w-xl mx-auto text-sm">{subtitle}</p>

        {/* SEARCH */}
        <div className="mt-8 w-full max-w-xl mx-auto relative">
          <input type="text" placeholder={searchPlaceholder} className="w-full border border-slate-300 rounded-full px-5 py-3 outline-none shadow-sm" />
          <Search className="absolute right-4 top-3 text-slate-500" />
        </div>

        {/* TABS */}
        <div className="flex flex-wrap justify-center gap-4 mt-8">
          {categories.map((cat) => {
            const isActive = active === cat.key;

            return (
              <button
                key={cat.key}
                onClick={() => setActive(cat.key)}
                className={`
                  px-6 py-3 rounded-full text-sm font-semibold
                  flex items-center gap-2 shadow-md
                  border border-white transition-all duration-200
                  ${isActive ? "text-white" : "bg-[#0A1737] text-white"}
                `}
                style={
                  isActive
                    ? {
                        background: "linear-gradient(180deg, #51A2FF 0%, #8EC5FF 100%)",
                      }
                    : {}
                }
              >
                <GraduationCap className="w-4 h-4" />
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* ================= TABLE ================= */}
      <div className="max-w-4xl mx-auto mt-10">
        <div className="w-full px-6">
          <div className="h-[3px] w-full bg-[#0A1737] rounded-full" />
        </div>

        <div className="grid grid-cols-12 font-semibold text-sm text-[#0A1737] mt-4 px-6">
          <span className="col-span-1">No</span>
          {columns.map((col) => (
            <span key={col.key} className={SPAN[col.span]}>
              {col.label}
            </span>
          ))}
        </div>

        {/* TABLE ROWS */}
        <div className="space-y-3 mt-3">
          {data.map((row, idx) => {
            const isDark = idx % 2 === 0;

            return (
              <div
                key={idx}
                className={`
          grid grid-cols-12 items-center px-6 py-4 rounded-xl
          text-sm shadow-md
          ${isDark ? "bg-gradient-to-r from-[#0A1737] to-[#0F1E46] text-white" : "bg-gradient-to-r from-[#6FB6FF] to-[#8EC5FF] text-[#0A1737]"}
        `}
              >
                <div className="col-span-1 flex items-center gap-2 font-semibold">
                  <GraduationCap size={16} />
                  {idx + 1}
                </div>

                {columns.map((col) => (
                  <div key={col.key} className={`${SPAN[col.span]} font-medium`}>
                    {row[col.key]}
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
