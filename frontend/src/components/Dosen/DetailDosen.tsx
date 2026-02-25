import {
  ArrowLeft, Mail, GraduationCap, BookOpen, FileText,
  Briefcase, Users, Award
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function DetailDosenExact() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const dummy = {
      name: "Hugh Davies",
      email: "hugh.davies@university.co.id",
      department: "Sains Atmosfer",
      position: "Rector",
      nip: "197505152000121001",
      researchInterests: ["Machine Learning", "Artificial Intelligence", "Deep Learning"],
      sintaId: "1234234",
      scopusId: "57123456789",
      researcherId: "1234234",
      orcid: "57123456789",
      education: [
        { degree: "S3 Computer Science", university: "Stanford University", year: "2015" },
        { degree: "S2 Computer Science", university: "MIT", year: "2010" },
        { degree: "S1 Teknik Informatika", university: "ITB", year: "2007" }
      ],
      courses: [
        { name: "Meteorologi Dinamika Lanjut", code: "5A501", sks: 3 },
        { name: "Analisis Data Atmosfer", code: "5A502", sks: 2 },
        { name: "Pemodelan Iklim", code: "5A503", sks: 3 }
      ],
      publications: [
        { title: "Deep Learning for Climate Prediction", journal: "Nature Climate Change (2023)", doi: "10.1038/nclimate.2023.001" },
        { title: "AI in Meteorology", journal: "Journal of Climate (2022)", doi: "10.1007/climate.2022.123" }
      ],
      projects: [
        { title: "AI-based Climate Forecasting System", role: "Principal Investigator", period: "2022-2025", funding: "Kemenristek BRIN" }
      ],
      community: [
        { title: "Pelatihan AI untuk Guru SMA", role: "Narasumber", year: "2023" }
      ],
      awards: [
        { title: "Best Researcher Award", organization: "ITB", year: "2023" },
        { title: "Outstanding Contribution in AI", organization: "Stanford", year: "2019" }
      ]
    };
    setData(dummy);
  }, []);

  if (!data) {
    return <div className="text-center py-20">Loading...</div>;
  }

  return (
    <div className="bg-[#F5F6F8] py-16 font-[Poppins] px-4 xl:px-0">
      <div className="w-full xl:w-[1238px] mx-auto flex flex-col gap-[40px]">
        <div className="flex items-center gap-[12px] text-[14px] text-[#364153]">
          <Link to="/dosen" className="flex items-center gap-1 hover:text-slate-800">
            <ArrowLeft size={16} color="#155DFC"/>
            <span className="text-[#0C1637]">Akademisi</span>
          </Link>
          <span>—</span>
          <span className="font-medium text-[#0C1637]">{data.name}</span>
        </div>
        <div className="w-full xl:w-[1238px] xl:h-[432px] rounded-[10px] p-[32px] bg-[#2C558D] shadow">
          <div className="flex flex-col xl:flex-row gap-[24px]">
            <div className="w-full xl:w-[312px] flex flex-col gap-[16px]">
              <div className="w-full xl:w-[312px] h-[337px] rounded-[10px] overflow-hidden">
                <img src="/davis.jpg" className="w-full h-full object-cover" />
              </div>
              <div className="flex items-center gap-[8px] text-white text-[12px]">
                <Mail size={16} />
                {data.email}
              </div>
            </div>
            <div className="flex-1 flex flex-col gap-[20px]">

              <div className="space-y-[8px]">
                <div>
                  <span className="px-[12px] py-[4px] rounded-full bg-[#F3E8FF] text-[#8200DB] text-[14px] font-medium">
                    {data.department}
                  </span>
                </div>
                <div className="text-white text-[24px] font-bold">
                  {data.name}
                </div>
                <div className="text-white text-[16px]">
                  {data.position}
                </div>
                <div className="text-white text-[14px]">
                  NIP: {data.nip}
                </div>

                <div className="bg-[#EFF6FF] rounded-[10px] p-[16px] space-y-[8px] mt-[16px]">
                  <div className="flex items-center gap-[8px] text-[16px] font-semibold text-[#101828]">
                    <BookOpen size={20} color="#155DFC" />
                    Minat Riset
                  </div>
                  <div className="text-[16px] text-[#364153]">
                    {data.researchInterests.join(", ")}
                  </div>
                </div>
              </div>

              {/* IDs */}
              <div className="flex flex-col gap-3 xl:gap-[20px]">
                <div className="flex flex-col xl:flex-row gap-3 xl:justify-between">
                  <div className="w-full xl:w-[400px] h-[36px] bg-[#F3F4F6] rounded-[10px] flex items-center justify-center text-[14px] text-[#364153]">
                    Sinta ID: {data.sintaId}
                  </div>
                  <div className="w-full xl:w-[400px] h-[36px] bg-[#F3F4F6] rounded-[10px] flex items-center justify-center text-[14px] text-[#364153]">
                    Scopus ID: {data.scopusId}
                  </div>
                </div>
                <div className="flex flex-col xl:flex-row gap-3 xl:justify-between">
                  <div className="w-full xl:w-[400px] h-[36px] bg-[#F3F4F6] rounded-[10px] flex items-center justify-center text-[14px] text-[#364153]">
                    Researcher ID: {data.researcherId}
                  </div>
                  <div className="w-full xl:w-[400px] h-[36px] bg-[#F3F4F6] rounded-[10px] flex items-center justify-center text-[14px] text-[#364153]">
                    Orcid: {data.orcid}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
        <div className="w-full xl:w-[1238px] rounded-[10px] bg-white p-[24px] space-y-[16px] shadow">
          <div className="flex items-center gap-[8px] text-[20px] font-bold text-[#101828]">
            <GraduationCap size={24} color="#155DFC" />
            Riwayat Pendidikan
          </div>
          <div className="border-l-[4px] bg-[#F9FAFB] rounded-l-[10px] border-[#155DFC] space-y-[8px]">
            {data.education.map((edu: any, idx: number) => (
              <div key={idx} className="p-[16px_16px_16px_20px] space-y-[4px]">
                <div className="text-[16px] font-semibold text-[#101828]">{edu.degree}</div>
                <div className="text-[16px] text-[#364153]">{edu.university}</div>
                <div className="text-[14px] text-[#4A5565]">{edu.year}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="w-full xl:w-[1238px] rounded-[10px] bg-white p-[24px] space-y-[16px] shadow">
          <div className="flex items-center gap-[8px] text-[20px] font-bold text-[#101828]">
            <BookOpen size={24} color="#00A63E" />
            Mata Kuliah yang Diajar
          </div>

          <div className="flex flex-col xl:flex-row gap-4 xl:justify-between">
            {data.courses.map((course: any, idx: number) => (
              <div
                key={idx}
                className="w-full xl:w-[375px] h-[76px] bg-[#F0FDF4] border-l-[4px] border-[#00A63E] rounded-[10px] p-[16px_16px_16px_20px] flex justify-between items-center"
              >
                <div>
                  <div className="text-[16px] font-semibold text-[#101828]">
                    {course.name}
                  </div>
                  <div className="text-[14px] text-[#4A5565]">
                    {course.code}
                  </div>
                </div>
                <div className="px-[12px] py-[4px] rounded-full bg-[#B9F8CF] text-[#016630] text-[14px] font-medium">
                  {course.sks} SKS
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="w-full xl:w-[1238px] rounded-[10px] bg-white p-[24px] space-y-[16px] shadow">
          <div className="flex items-center gap-[8px] text-[20px] font-bold text-[#101828]">
            <FileText size={24} color="#9810FA" />
            Publikasi
          </div>
          <div className="border-l-[4px] bg-[#F9FAFB] rounded-l-[10px] border-[#155DFC]">
            {data.publications.map((pub: any, idx: number) => (
              <div
                key={idx}
                className="p-[16px_16px_16px_20px] space-y-[4px]"
              >
                <div className="text-[16px] font-semibold text-[#101828]">
                  {pub.title}
                </div>
                <div className="text-[14px] text-[#364153]">
                  {pub.journal}
                </div>
                <div className="text-[12px] text-[#4A5565]">
                  DOI: {pub.doi}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="w-full xl:w-[1238px] rounded-[10px] bg-white p-[24px] space-y-[16px] shadow">
          <div className="flex items-center gap-[8px] text-[20px] font-bold text-[#101828]">
            <Briefcase size={24} color="#F54900" />
            Project/Penelitian
          </div>
          {data.projects.map((proj: any, idx: number) => (
            <div
              key={idx}
              className="bg-[#FFF7ED] border-l-[4px] border-[#F54900] rounded-[10px] p-[16px_16px_16px_20px] space-y-[4px]"
            >
              <div className="text-[16px] font-semibold text-[#101828]">
                {proj.title}
              </div>
              <div className="text-[14px] text-[#364153]">
                Role: {proj.role}
              </div>
              <div className="text-[14px] text-[#364153]">
                Period: {proj.period}
              </div>
              <div className="text-[14px] text-[#364153]">
                Funding: {proj.funding}
              </div>
            </div>
          ))}
        </div>
        <div className="w-full xl:w-[1238px] rounded-[10px] bg-white p-[24px] space-y-[16px] shadow">
          <div className="flex items-center gap-[8px] text-[20px] font-bold text-[#101828]">
            <Users size={24} color="#009689" />
            Pengabdian Kepada Masyarakat
          </div>
          {data.community.map((com: any, idx: number) => (
            <div
              key={idx}
              className="bg-[#F0FDFA] border-l-[4px] border-[#009689] rounded-[10px] p-[16px_16px_16px_20px] space-y-[4px]"
            >
              <div className="text-[16px] font-semibold text-[#101828]">
                {com.title}
              </div>
              <div className="text-[14px] text-[#364153]">
                Role: {com.role}
              </div>
              <div className="text-[14px] text-[#4A5565]">
                Year: {com.year}
              </div>
            </div>
          ))}
        </div>
        <div className="w-full xl:w-[1238px] rounded-[10px] bg-white p-[24px] space-y-[16px] shadow">
          <div className="flex items-center gap-[8px] text-[20px] font-bold text-[#101828]">
            <Award size={24} color="#D08700" />
            Award/Penghargaan
          </div>
          <div className="bg-[#FEFCE8] border-l-[4px] border-[#D08700] rounded-[10px]">
            {data.awards.map((award: any, idx: number) => (
              <div
                key={idx}
                className="p-[16px_16px_16px_20px] space-y-[4px]"
              >
                <div className="text-[16px] font-semibold text-[#101828]">
                  {award.title}
                </div>
                <div className="text-[14px] text-[#364153]">
                  {award.organization}
                </div>
                <div className="text-[14px] text-[#4A5565]">
                  {award.year}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
