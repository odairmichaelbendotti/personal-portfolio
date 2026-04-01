import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Skills from "../components/Content/Skills";
import About from "../components/Content/About";
import MobileMenu from "../components/MobileMenu";
import Experience from "../components/Content/Experience";
import Projects from "../components/Content/Projects";
import Contact from "../components/Content/Contact";

export const Resume = () => {
  const [view, setView] = useState<string>(() => {
    // Initialize based on current window width
    if (typeof window !== "undefined") {
      return window.innerWidth < 768 ? "About" : "About me";
    }
    return "About me";
  });
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="relative min-h-dvh h-dvh md:min-h-screen md:h-screen bg-background w-full flex justify-center items-center">
      <>
        {isMobile ? (
          <MobileMenu
            setView={setView}
            view={view}
            theme={theme}
            setTheme={setTheme}
          />
        ) : (
          <Sidebar
            setView={setView}
            view={view}
            theme={theme}
            setTheme={setTheme}
          />
        )}

        <main className="h-full w-full md:w-200">
          {(view === "About me" || view === "About") && <About />}
          {view === "Skills" && <Skills />}
          {view === "Experience" && <Experience />}
          {view === "Projects" && <Projects />}
          {view === "Contact" && <Contact />}
        </main>
      </>
    </div>
  );
};
