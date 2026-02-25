import { useState, ChangeEvent, FormEvent } from "react";

interface FormData {
  name: string;
  email: string;
  message: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (
    e: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    setLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    console.log("Submitted:", formData);

    setFormData({
      name: "",
      email: "",
      message: "",
    });

    setLoading(false);
  };

  return (
    <section className="py-24">
      <div
        className="max-w-6xl mx-auto px-6 
                   grid lg:grid-cols-2 
                   gap-16 items-stretch"
      >
        {/* LEFT SIDE (ILUSTRASI) */}
        <div className="bg-white rounded-3xl shadow-xl p-8 h-[520px] flex items-center justify-center">
          <img
            src="/cs.jpg"
            alt="Contact Illustration"
            className="w-full h-full object-contain rounded-2xl"
        />
        </div>

        {/* RIGHT SIDE (FORM) */}
        <div className="bg-white/80 backdrop-blur-md p-10 rounded-3xl shadow-sm h-[520px] flex flex-col">
          <div>
            <h2 className="text-3xl font-bold text-[#1d1235] leading-tight mb-4">
              Tim Kami Akan Segera <br /> Membalas Pesan Anda.
            </h2>

            <p className="text-slate-600 mb-8">
              Kami siap membantu pertanyaan atau kebutuhan Anda.
              Silakan hubungi kami melalui formulir di bawah ini.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col h-full"
          >
            <div className="space-y-6">
              {/* NAME + EMAIL */}
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  type="text"
                  placeholder="Nama"
                  required
                  className="w-full rounded-xl bg-[#e6edf5] px-5 py-3 
                             outline-none transition
                             focus:ring-2 focus:ring-[#1d1235]/20
                             placeholder:text-slate-500"
                />

                <input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  type="email"
                  placeholder="Alamat Email"
                  required
                  className="w-full rounded-xl bg-[#e6edf5] px-5 py-3 
                             outline-none transition
                             focus:ring-2 focus:ring-[#1d1235]/20
                             placeholder:text-slate-500"
                />
              </div>

              {/* MESSAGE */}
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                placeholder="Tulis Pesan..."
                required
                className="w-full rounded-xl bg-[#e6edf5] px-5 py-4 
                           outline-none transition
                           focus:ring-2 focus:ring-[#1d1235]/20
                           resize-none placeholder:text-slate-500"
              />
            </div>

            {/* BUTTONS */}
            <div className="flex items-center gap-4 pt-6">
              <button
                type="submit"
                disabled={loading}
                className={`px-6 py-3 rounded-full font-semibold transition ${
                  loading
                    ? "bg-slate-300 text-slate-500 cursor-not-allowed"
                    : "bg-slate-200 text-slate-800 hover:bg-slate-300"
                }`}
              >
                {loading ? "Mengirim..." : "KIRIM PESAN"}
              </button>

              <button
                type="submit"
                disabled={loading}
                className={`w-12 h-12 rounded-full flex items-center justify-center 
                            transition ${
                              loading
                                ? "bg-slate-400 cursor-not-allowed"
                                : "bg-[#1d1235] hover:scale-105"
                            }`}
              >
                <svg
                  width="18"
                  height="18"
                  fill="none"
                  stroke="white"        
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M7 17L17 7" />
                  <path d="M7 7h10v10" />
                </svg>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
