import {  MoveRight } from "lucide-react";

export default function ProgramOptions() {
  const options = ["OSEANOGRAFI", "INTERAKSI SISTEM BUMI", "SAINS ATMOSFER"];

return (
    <section className="w-full py-16 px-11 bg-white">
        <div className=" mx-auto text-center ">
            <h1 className="text-3xl md:text-4xl font-bold text-[#0A1738] mb-24 ">
                Bergabung bersama kami di
                <br />
                opsi keilmuan impianmu!
            </h1>

            <div className="flex flex-col md:flex-row justify-center items-center gap-36">
                {options.map((item, i) => (
                    <button key={i} className="flex flex-col items-center gap-5 cursor-pointer">
                        <span className="text-2xl md:text-3xl font-extrabold text-[#0A1738] tracking-wide  ms-4">{item}</span>

                        <span className="flex items-center justify-center w-12 h-12 border border-[#0A1738] rounded-full hover:bg-[#0A1738] hover:text-white transition">
                            <MoveRight size={20} />
                        </span>
                    </button>
                ))}
            </div>
        </div>
    </section>
);
}
