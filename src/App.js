import React from "react";
import Navbar from "./pages/navbar/Navbar";
import Header from "./pages/header/Header";
import About from "./pages/about/About";
import Services from "./pages/services/Services";
import Portfolio from "./pages/portfolio/Portfolio";
import Contact from "./pages/contact/Contact";
import Footer from "./pages/footer/Footer";
import Theme from "./theme/Theme";
import FloatingNav from "./pages/floating-nav/FloatingNav";
import { useThemeContext } from "./context/theme-context";

const App = () => {
  const { themeState } = useThemeContext();

  return (
    <main className={`${themeState.primary} ${themeState.background}`}>
      <Navbar />
      <Header />
      <About />
      <Services />
      <Portfolio />
      <Contact />
      <Footer />
      <Theme />
      <FloatingNav />
    </main>
  );
};

export default App;
