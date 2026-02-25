import { MapPin, Phone, Mail, User } from "lucide-react";

export default function KontakDetail() {
  return (
    <section className="max-w-7xl mx-auto px-6 pt-24">
      <div className="bg-white rounded-3xl shadow-xl px-10 py-14 relative overflow-hidden mb-24">
        {/* Accent bottom line */}
        <div className="absolute bottom-0 left-0 w-full h-2 bg-blue-800" />

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900">Master&apos;s and Doctoral Programs in Earth Sciences</h1>

        <p className="mt-3 text-slate-600 text-lg max-w-3xl">Faculty of Earth Sciences and Technology Institut Teknologi Bandung</p>

        {/* Info Grid */}
        <div className="mt-10 grid md:grid-cols-2 gap-8">
          {/* ALAMAT */}
          <InfoItem
            icon={<MapPin />}
            title="ALAMAT"
            content={
              <>
                Jalan Ganesha 10 <br />
                Bandung, 40132 <br />
                LABTEK XI, 2nd Floor, East Corridor
              </>
            }
          />

          {/* TELEPON */}
          <InfoItem
            icon={<Phone />}
            title="TELEPON & FAX"
            content={
              <>
                Phone: <strong>(022) 2500494</strong> <br />
                Fax: <strong>(022) 2534139</strong>
              </>
            }
          />

          {/* EMAIL */}
          <InfoItem icon={<Mail />} title="EMAIL UMUM" content={<strong>fitb@itb.ac.id</strong>} />

          {/* KETUA */}
          <InfoItem icon={<User />} title="KETUA PROGRAM" content={<strong>lamona@itb.ac.id</strong>} />
        </div>
      </div>
    </section>
  );
}

function InfoItem({ icon, title, content }) {
  return (
    <div className="flex gap-4 items-start">
      <div className="p-3 rounded-xl bg-blue-100 text-blue-600">{icon}</div>
      <div>
        <p className="text-sm font-semibold text-slate-500">{title}</p>
        <p className="mt-1 text-slate-800 leading-relaxed">{content}</p>
      </div>
    </div>
  );
}
