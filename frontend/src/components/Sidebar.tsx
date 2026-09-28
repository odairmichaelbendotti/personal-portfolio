import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  Sun,
  User,
  Mail,
  FolderGit2,
  Briefcase,
  Award,
  Moon,
  FileText,
  Download,
  ChevronUp,
} from "lucide-react";
import Dot from "./Dot";
import ButtonList from "./ButtonList";
import { DURATION, EASE, Magnetic, useTilt } from "./motion";

const navItems = [
  { id: "About", text: "About me", Icon: User },
  { id: "Skills", text: "Skills", Icon: Award },
  { id: "Experience", text: "Experience", Icon: Briefcase },
  { id: "Projects", text: "Projects", Icon: FolderGit2 },
  { id: "Contact", text: "Contact", Icon: Mail },
];

const docs = [
  { label: "Currículo", file: "/curriculo.pdf" },
  { label: "Carta de Apresentação", file: "/cover-letter.pdf" },
];

export type SidebarProps = {
  view: string;
  setView: React.Dispatch<React.SetStateAction<string>>;
  theme: "light" | "dark";
  setTheme: React.Dispatch<React.SetStateAction<"light" | "dark">>;
};

const Sidebar = ({ setView, view, theme, setTheme }: SidebarProps) => {
  return (
    <div className="hidden md:grid grid-cols-[30px_280px_30px] text-text-primary text-center">
      <div className="py-3"></div>
      <div className="py-3 border-l border-r border-default-border"></div>
      <div className="py-3"></div>
      <div className="border-t border-b border-default-border"></div>
      <Menu setView={setView} view={view} theme={theme} setTheme={setTheme} />
      <div className="border-t border-b border-default-border"></div>
      <div className="py-3"></div>
      <div className="py-3 border-l border-r border-default-border"></div>
      <div className="py-3"></div>
    </div>
  );
};

const Menu = ({ setView, view, theme, setTheme }: SidebarProps) => {
  const [docsOpen, setDocsOpen] = useState(false);
  const footerRef = useRef<HTMLElement>(null);
  const tilt = useTilt(10);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (footerRef.current && !footerRef.current.contains(e.target as Node)) {
        setDocsOpen(false);
      }
    };
    if (docsOpen) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [docsOpen]);

  return (
    <aside className="flex flex-col w-70 h-panel border border-default-border relative light:bg-card-background">
      {/* Portfólio title and theme switcher */}
      <div className="flex justify-between items-center py-3 border border-accent-third hachura px-4">
        <p className="text-xs uppercase">Portfolio</p>
        <button
          type="button"
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          aria-label={theme === "light" ? "Ativar tema escuro" : "Ativar tema claro"}
          className="relative w-4 h-4 text-accent cursor-pointer outline-none focus-visible:ring-1 focus-visible:ring-accent"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={theme}
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0, rotate: -90, scale: 0.6 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: 90, scale: 0.6 }}
              transition={{ duration: DURATION.fast, ease: EASE }}
            >
              {theme === "light" ? <Sun size={16} /> : <Moon size={16} />}
            </motion.span>
          </AnimatePresence>
        </button>
      </div>

      {/* User image and name */}
      <div className="flex flex-col items-center px-4 border-b border-default-border py-6 gap-4 [@media(max-height:640px)]:py-3 [@media(max-height:640px)]:gap-2">
        <motion.div
          style={tilt.style}
          {...tilt.handlers}
          className="w-20 h-20 [@media(max-height:640px)]:w-14 [@media(max-height:640px)]:h-14 border border-default-border bg-accent-third flex items-center justify-center rounded-sm shrink-0 transition-colors duration-300 hover:border-accent/40"
        >
          <span className="font-mono text-lg font-bold text-accent tracking-widest">OB</span>
        </motion.div>
        <div className="flex flex-col items-center gap-1.5 w-full">
          <div className="text-center leading-none">
            <p className="text-base font-black uppercase tracking-tight text-text-primary">Odair Michael</p>
            <p className="text-base font-black uppercase tracking-tight text-accent">Bendotti</p>
          </div>
          <div className="w-8 h-px bg-accent/30" />
          <span className="font-mono text-[10px] uppercase tracking-widest text-text-secondary text-center">
            Full-stack Software Engineer
          </span>
        </div>
      </div>

      <nav className="border-b border-default-border flex-1 min-h-0 overflow-y-auto scrollbar-hide">
        <ul className="px-4 mt-3">
          {navItems.map((item) => (
            <ButtonList
              key={item.id}
              id={item.id}
              text={item.text}
              Icon={item.Icon}
              setView={setView}
              view={view}
            />
          ))}
        </ul>
      </nav>

      <footer ref={footerRef} className="relative flex flex-col bg-accent-third light:bg-card-background border-t border-default-border text-text-secondary">

        {/* Docs dropdown — opens upward */}
        <AnimatePresence>
          {docsOpen && (
            <motion.div
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              transition={{ duration: DURATION.fast, ease: EASE }}
              className="absolute bottom-full left-0 right-0 flex flex-col rounded-t-sm overflow-hidden bg-card-background border border-b-0 border-default-border"
            >
              {docs.map((doc, i) => (
                <a
                  key={doc.file}
                  href={doc.file}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setDocsOpen(false)}
                  className={`flex items-center gap-2.5 px-4 py-2.5 cursor-pointer transition-colors duration-150 text-text-secondary hover:bg-accent-third hover:text-accent ${
                    i > 0 ? "border-t border-default-border" : ""
                  }`}
                >
                  <Download size={11} className="text-accent" />
                  <span className="font-mono text-[10px]">{doc.label}</span>
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Status row */}
        <div className="flex items-center justify-center gap-2 pt-2 pb-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-success motion-safe:animate-pulse" />
          <span className="font-mono text-[10px] tracking-widest text-text-secondary">ready to deploy</span>
        </div>

        {/* Docs trigger button */}
        <Magnetic className="mx-4 mb-3" strength={0.18}>
          <button
            type="button"
            aria-expanded={docsOpen}
            onClick={() => setDocsOpen((o) => !o)}
            className={`group relative w-full overflow-hidden flex items-center justify-center gap-2 py-1.5 border rounded-sm cursor-pointer transition-colors duration-150 ${
              docsOpen
                ? "border-accent text-accent"
                : "border-default-border text-text-secondary hover:border-accent/40 hover:text-accent"
            }`}
          >
            {/* Brilho que atravessa o botão no hover */}
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-accent/15 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
            />
            <FileText size={11} />
            <span className="font-mono text-[10px]">documentos</span>
            <motion.span
              className="flex"
              animate={{ rotate: docsOpen ? 180 : 0 }}
              transition={{ duration: DURATION.fast, ease: EASE }}
            >
              <ChevronUp size={11} />
            </motion.span>
          </button>
        </Magnetic>
      </footer>

      <div>
        <Dot position="top" side="right" geometry="square" size="w-3 h-3" borderColor="border-default-border" />
        <Dot position="top" side="left" geometry="square" size="w-3 h-3" borderColor="border-default-border" />
        <Dot position="bottom" side="right" geometry="square" size="w-3 h-3" borderColor="border-default-border" />
        <Dot position="bottom" side="left" geometry="square" size="w-3 h-3" borderColor="border-default-border" />
      </div>
    </aside>
  );
};

export default Sidebar;
