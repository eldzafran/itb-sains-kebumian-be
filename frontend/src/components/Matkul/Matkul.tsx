import { useEffect, useState } from "react";
import { ChevronDown, ArrowLeft } from "lucide-react";
import { coursesDummy, type Course} from "../../data/courseDummy";

export default function MataKuliahPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [openId, setOpenId] = useState<number | null>(null);

  useEffect(() => {
    setCourses(coursesDummy);
  }, []);

  const Bullet = () => (
    <div className="w-[18px] h-[20px] flex items-center">
      <div className="w-[8px] h-[8px] bg-blue-600 rounded-full" />
    </div>
  );

  return (
    <>
      <div className="w-[1240px] h-[24px] mx-auto mt-[40px] flex items-center gap-[12px] font-[Poppins]">
        <div className="w-[24px] h-[24px] flex items-center justify-center">
          <ArrowLeft className="w-[18px] h-[18px] text-blue-600" />
        </div>

        <span className="w-[265px] h-[21px] text-[14px] font-medium tracking-[-0.28px] text-[#0C1637]">
          Fakultas Ilmu dan Teknologi Kebumian
        </span>

        <span className="w-[19px] h-[24px] text-[16px] font-medium text-[#0C1637]">
          –
        </span>

        <span className="w-[166px] h-[21px] text-[14px] font-medium tracking-[-0.28px] text-[#0C1637]">
          Magister Sains Atmosfer
        </span>

        <span className="w-[19px] h-[24px] text-[16px] font-medium text-[#0C1637]">
          –
        </span>

        <span className="w-[347px] h-[21px] text-[14px] font-medium tracking-[-0.28px] text-[#0C1637]">
          Kurikulum Spesialisasi Mitigasi Bencana Kebumian
        </span>
      </div>
      <div className="w-[1267px] mx-auto mt-[20px] p-[10px] flex flex-col gap-[10px] font-[Poppins]">
        <div className="w-[1257px] p-[10px] flex flex-col gap-[10px]">

          <div className="w-[1237px] pt-[10px] pb-[32px] flex flex-col gap-[24px]">
            <h2 className="w-[1237px] h-[56px] text-[75px] leading-[56px] tracking-[-2px] font-normal text-[#0E0E0E]">
              Mata Kuliah
            </h2>

            <p className="w-[1237px] h-[72px] text-[32px] leading-[36px] tracking-[-0.96px] font-light text-[#0E0E0E] opacity-50">
              Daftar Mata Kuliah Komprehensif untuk Magister Sains Atmosfer
              Spesialisasi Mitigasi Bencana Kebumian
            </p>
          </div>

          <div className="flex flex-col gap-[10px] space-y-[4px] mb-24">
            {courses.map((course) => {
              const isOpen = openId === course.id;

              return (
                <div key={course.id} className="w-[1242px]">
                  <div className="w-[1242px] pt-[10px] pb-[10px] flex flex-col gap-[10px]">

                    <div className="w-[1242px] h-[140px] p-[24px] rounded-[10px] bg-white shadow-[0px_2px_4px_-2px_#0000001A,0px_4px_6px_-1px_#0000001A]">
                      <div className="w-[1194px] h-[92px] flex justify-between">
                        <div className="w-[1170px] h-[92px] flex flex-col gap-[24px]">

                          <div className="w-[1170px] h-[28px] flex gap-[12px]">
                            <div className="px-[12px] py-[4px] rounded-full bg-[#DBEAFE]">
                              <span className="text-[14px] font-medium text-[#1447E6]">
                                {course.code}
                              </span>
                            </div>
                            <div className="px-[12px] py-[4px] rounded-full bg-gray-100">
                              <span className="text-[14px] font-medium text-[#364153]">
                                {course.sks}
                              </span>
                            </div>
                          </div>

                          <h4 className="text-[32px] leading-[28px] font-bold text-[#101828]">
                            {course.title}
                          </h4>
                        </div>

                        <button onClick={() => setOpenId(isOpen ? null : course.id)}>
                          <ChevronDown className={`w-[24px] h-[24px] transition-transform ${isOpen ? "rotate-180" : ""}`} />
                        </button>
                      </div>
                    </div>

                    {isOpen && (
                      <div className="w-[1242px] bg-white rounded-[10px] p-[24px] border border-[#E5E7EB] flex flex-col gap-[24px]">

                        <div className="flex flex-col gap-[8px]">
                          <h5 className="text-[16px] font-semibold text-[#101828]">
                            Deskripsi Singkat
                          </h5>
                          <p className="text-[14px] text-[#364153] leading-[20px]">
                            {course.deskripsi}
                          </p>
                        </div>

                        <div className="flex flex-col gap-[8px]">
                          <h5 className="text-[16px] font-semibold text-[#101828]">
                            CPPS Prodi yang Ditarget
                          </h5>
                          {course.cpps.map((item: { id: number; text: string }) => (
                            <div key={item.id} className="flex gap-[8px] items-start">
                              <Bullet />
                              <p className="text-[14px] text-[#364153]">{item.text}</p>
                            </div>
                          ))}
                        </div>
                        <div className="flex flex-col gap-[8px]">
                          <h5 className="text-[16px] font-semibold text-[#101828]">
                            Capaian Pembelajaran Mata Kuliah (CPMK)
                          </h5>
                          {course.cpmk.map((item: { id: number; text: string }) => (
                            <div key={item.id} className="flex gap-[8px] items-start">
                              <Bullet />
                              <p className="text-[14px] text-[#364153]">{item.text}</p>
                            </div>
                          ))}
                        </div>
                        <div className="flex flex-col gap-[8px]">
                          <h6 className="text-[16px] font-semibold text-[#101828]">
                            Pemetaan Metode Pembelajaran
                          </h6>

                          <table className="w-full border border-[#5B5B5B]">
                            <thead>
                              <tr className="bg-[#99A1AF]">
                                <th className="border border-[#5B5B5B] p-[10px_12px] text-left w-[233px]">
                                  Metode
                                </th>
                                <th className="border border-[#5B5B5B] p-[10px_12px] text-left w-[561px]">
                                  Penjelasan Implementasi
                                </th>
                                <th className="border border-[#5B5B5B] p-[10px_12px] text-left w-[200px]">
                                  CPMK
                                </th>
                                <th className="border border-[#5B5B5B] p-[10px_12px] text-left w-[200px]">
                                  CPL
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {course.metode.map((row: any, i: number) => (
                                <tr key={i}>
                                  <td className="border border-[#5B5B5B] p-[10px_12px] font-semibold">
                                    {row.metode}
                                  </td>
                                  <td className="border border-[#5B5B5B] p-[10px_12px]">
                                    {row.penjelasan}
                                  </td>
                                  <td className="border border-[#5B5B5B] p-[10px_12px]">
                                    {row.cpmk}
                                  </td>
                                  <td className="border border-[#5B5B5B] p-[10px_12px]">
                                    {row.cpl}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                        <div className="flex flex-col gap-[8px]">
                            <h5 className="text-[16px] font-semibold text-[#101828]">
                            Rencana Pembelajaran Mingguan (14 Pertemuan)
                            </h5>
                            {course.rps.map((item) => (
                            <div key={item.id} className="flex gap-[8px] items-start">
                                <Bullet />
                                <p className="text-[14px] text-[#364153]">{item.text}</p>
                            </div>
                            ))}
                        </div>
                        <div className="flex flex-col gap-[8px]">
                          <h6 className="text-[16px] font-semibold text-[#101828]">
                            Strategi dan Instrumen Asesmen
                          </h6>

                          <table className="w-full border border-[#5B5B5B]">
                            <thead>
                              <tr className="bg-[#99A1AF]">
                                <th className="border border-[#5B5B5B] p-[10px_12px] text-left">
                                  Komponen
                                </th>
                                <th className="border border-[#5B5B5B] p-[10px_12px] text-left">
                                  Bentuk dan Rubrik
                                </th>
                                <th className="border border-[#5B5B5B] p-[10px_12px] text-left">
                                  Bobot
                                </th>
                                <th className="border border-[#5B5B5B] p-[10px_12px] text-left">
                                  CPL
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {course.asesmen.map((row: any, i: number) => (
                                <tr key={i}>
                                  <td className="border border-[#5B5B5B] p-[10px_12px] font-semibold">
                                    {row.komponen}
                                  </td>
                                  <td className="border border-[#5B5B5B] p-[10px_12px]">
                                    {row.bentuk}
                                  </td>
                                  <td className="border border-[#5B5B5B] p-[10px_12px]">
                                    {row.bobot}
                                  </td>
                                  <td className="border border-[#5B5B5B] p-[10px_12px]">
                                    {row.cpl}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>

                        <div className="p-[24px] bg-[#FFF7ED] rounded-[10px]">
                          <h5 className="text-[16px] font-semibold mb-2 text-[#101828]">
                            Etika Akademik
                          </h5>
                          <p className="text-[14px] text-[#364153]">
                            {course.etika}
                          </p>
                        </div>

                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </>
  );
}
