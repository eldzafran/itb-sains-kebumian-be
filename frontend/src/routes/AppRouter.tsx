import { Navigate, useRoutes } from "react-router-dom";
import adminRoutes from "./adminRoutes";

// Import your Public Components
import Home from "../pages/Home/index";
import Profile from "../pages/Profile/index";
import MahasiswaAlumni from "../pages/MahasiswaAlumni/index";
import Akademik from "../pages/Akademik/index";
import Informasi from "../pages/Informasi/index";
import Artikel from "../pages/Informasi/Artikel";
import DetailArtikelPage from "../pages/Informasi/DetailArtikelPage";
import Dosen from "../pages/Dosen/index";
import DetailDosenPage from "../pages/Dosen/DetailDosenPage";
import KurikulumMitigasiPage from "../pages/KurikulumMitigasi/";
import Oseanografi from "../pages/AreaStudi/Oseanografi";
import SainsAtmosfer from "../pages/AreaStudi/SainsAtmosfer";
import SainsKembumian from "../pages/AreaStudi/SainsKebumian";
import SistemBumi from "../pages/AreaStudi/SistemBumi";
import PublikasiPrestasi from "../pages/PublikasiPrestasi/index";
import KontakKami from "../pages/KontakKami/index";

export default function AppRoutes() {
  return useRoutes([
    // 1. Public Routes (converted to Objects)
    { path: "/", element: <Home /> },
    { path: "/profil", element: <Profile /> },
    { path: "/mahasiswa-alumni", element: <MahasiswaAlumni /> },
    { path: "/akademik", element: <Akademik /> },
    {
      path: "/area-studi",
      children: [
        { path: "oseanografi", element: <Oseanografi /> },
        { path: "saint-atmosfer", element: <SainsAtmosfer /> },
        { path: "sains-kebumian", element: <SainsKembumian /> },
        { path: "interaksi-sistem-bumi", element: <SistemBumi /> },
      ]
    },
    {
      path: "/informasi",
      children: [
        { index: true, element: <Informasi /> },
        { path: "artikel", element: <Artikel /> },
        { path: "artikel/:id", element: <DetailArtikelPage /> },
      ]
    },
    { path: "/kurikulum-mitigasi-bencana", element: <KurikulumMitigasiPage /> },
    {
      path: "/dosen",
      children: [
        { index: true, element: <Dosen /> },
        { path: ":id", element: <DetailDosenPage /> },
      ]
    },
    { path: "/publikasi-prestasi", element: <PublikasiPrestasi /> },
    { path: "/kontak-kami", element: <KontakKami /> },

    // 2. Admin Routes (already objects)
    ...adminRoutes,

    // 3. Catch-all
    { path: "*", element: <Navigate to="/" replace /> },
  ]);
}