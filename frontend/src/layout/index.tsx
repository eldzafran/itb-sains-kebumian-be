import Header from "./Header/index";
import Navbar from "./Navbar/index";
import Footer from "./Footer/index";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col " style={{ backgroundColor: "#ffffff" }}>
      <Header />
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

// import Header from "./Header";
// import Navbar from "./Navbar";
// import Footer from "./Footer";

// export default function Layout({ children }) {
//   return (
//     <div className="min-h-screen flex flex-col " style={{ backgroundColor: "#0F172A" }}>
//       <Header />
//       <Navbar />
//       <main className="flex-1">{children}</main>
//       <Footer />
//     </div>
//   );
// }
