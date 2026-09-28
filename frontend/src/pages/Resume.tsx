import { useEffect, useState } from "react";
import { AnimatePresence, MotionConfig, motion } from "motion/react";
import Sidebar from "../components/Sidebar";
import Skills from "../components/Content/Skills";
import About from "../components/Content/About";
import MobileMenu from "../components/MobileMenu";
import Experience from "../components/Content/Experience";
import Projects from "../components/Content/Projects";
import Contact from "../components/Content/Contact";
import { DURATION, EASE } from "../components/motion";

const MOBILE_QUERY = "(max-width: 767px)";

const sections: Record<string, React.ReactElement> = {
  About: <About />,
  Skills: <Skills />,
  Experience: <Experience />,
  Projects: <Projects />,
  Contact: <Contact />,
};

export const Resume = () => {
  const [view, setView] = useState<string>("About");
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [isMobile, setIsMobile] = useState<boolean>(() => window.matchMedia(MOBILE_QUERY).matches);

  useEffect(() => {
    document.documentElement.classList.toggle("light", theme === "light");
  }, [theme]);

  useEffect(() => {
    const query = window.matchMedia(MOBILE_QUERY);
    const handleChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    query.addEventListener("change", handleChange);
    return () => query.removeEventListener("change", handleChange);
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <div className="relative min-h-dvh h-dvh md:min-h-screen md:h-screen w-full flex md:flex-row justify-center items-center">
        {isMobile ? (
          <MobileMenu setView={setView} view={view} />
        ) : (
          <Sidebar setView={setView} view={view} theme={theme} setTheme={setTheme} />
        )}
        <main className="h-full md:h-auto w-full md:w-200">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={view}
              className="h-full"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: DURATION.fast, ease: EASE }}
            >
              {sections[view] ?? sections.About}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </MotionConfig>
  );
};
