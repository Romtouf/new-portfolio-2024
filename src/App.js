import React from "react";
import Navbar from "./pages/navbar/Navbar";
import Header from "./pages/header/Header";
import About from "./pages/about/About";
import Services from "./pages/services/Services";
import Portfolio from "./pages/portfolio/Portfolio";
import Edito from "./pages/edito/Edito";
import Contact from "./pages/contact/Contact";
import Footer from "./pages/footer/Footer";
import FloatingNav from "./pages/floating-nav/FloatingNav";

function App() {
  return (
    <main>
      <Navbar />
      <Header />
      <About />
      <Services />
      <Portfolio />
      <Edito />
      <Contact />
      <Footer />
      <FloatingNav />
    </main>
  );
}

export default App;
