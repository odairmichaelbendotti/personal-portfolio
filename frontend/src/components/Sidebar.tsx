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

const navItems = [
  { text: "About me", Icon: User },
  { text: "Skills", Icon: Award },
  { text: "Experience", Icon: Briefcase },
  { text: "Projects", Icon: FolderGit2 },
  { text: "Contact", Icon: Mail },
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
    <aside className="flex flex-col w-70 h-165 border border-default-border relative">
      {/* Portfólio title and theme switcher */}
      <div className="flex justify-between items-center py-3 border border-accent-third hachura px-4">
        <p className="text-xs uppercase">Portfolio</p>
        {theme === "light" ? (
          <Sun
            size={16}
            className="text-accent cursor-pointer"
            onClick={() => setTheme("dark")}
          />
        ) : (
          <Moon
            size={16}
            className="text-accent cursor-pointer"
            onClick={() => setTheme("light")}
          />
        )}
      </div>

      {/* User image and name */}
      <div className="flex flex-col items-center px-4 border-b border-default-border py-6 gap-4">
        <div className="w-20 h-20 border border-default-border bg-accent-third flex items-center justify-center rounded-sm shrink-0">
          <span className="font-mono text-lg font-bold text-accent tracking-widest">OB</span>
        </div>
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

      <nav className="border-b border-default-border flex-1">
        <ul className="px-4 mt-3">
          {navItems.map((item) => (
            <ButtonList
              key={item.text}
              text={item.text}
              Icon={item.Icon}
              setView={setView}
              view={view}
            />
          ))}
        </ul>
      </nav>

      <footer ref={footerRef} className="relative flex flex-col bg-accent-third border-t border-default-border text-text-secondary">

        {/* Docs dropdown — opens upward */}
        <AnimatePresence>
          {docsOpen && (
            <motion.div
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              transition={{ duration: 0.15 }}
              className="absolute bottom-full left-0 right-0 flex flex-col rounded-t-sm overflow-hidden"
              style={{
                backgroundColor: "var(--color-card-background)",
                border: "1px solid var(--color-default-border)",
                borderBottom: "none",
              }}
            >
              {docs.map((doc, i) => (
                <a
                  key={doc.file}
                  href={doc.file}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setDocsOpen(false)}
                  className="flex items-center gap-2.5 px-4 py-2.5 cursor-pointer transition-colors duration-100 group"
                  style={{
                    borderTop: i > 0 ? "1px solid var(--color-default-border)" : undefined,
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.backgroundColor = "var(--color-accent-third)";
                    (e.currentTarget as HTMLElement).style.color = "var(--color-accent)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
                    (e.currentTarget as HTMLElement).style.color = "var(--color-text-secondary)";
                  }}
                >
                  <Download size={11} style={{ color: "var(--color-accent)" }} />
                  <span className="font-mono text-[10px]">{doc.label}</span>
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Status row */}
        <div className="flex items-center justify-center gap-2 pt-2 pb-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          <span className="font-mono text-[10px] tracking-widest text-text-secondary">ready to deploy</span>
        </div>

        {/* Docs trigger button */}
        <button
          onClick={() => setDocsOpen((o) => !o)}
          className="flex items-center justify-center gap-2 mx-4 mb-3 py-1.5 border rounded-sm cursor-pointer transition-colors duration-150"
          style={{
            borderColor: docsOpen ? "var(--color-accent)" : "var(--color-default-border)",
            color: docsOpen ? "var(--color-accent)" : "var(--color-text-secondary)",
          }}
          onMouseEnter={(e) => {
            if (!docsOpen) {
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(64,203,246,0.4)";
              (e.currentTarget as HTMLElement).style.color = "var(--color-accent)";
            }
          }}
          onMouseLeave={(e) => {
            if (!docsOpen) {
              (e.currentTarget as HTMLElement).style.borderColor = "var(--color-default-border)";
              (e.currentTarget as HTMLElement).style.color = "var(--color-text-secondary)";
            }
          }}
        >
          <FileText size={11} />
          <span className="font-mono text-[10px]">documentos</span>
          <motion.div animate={{ rotate: docsOpen ? 180 : 0 }} transition={{ duration: 0.15 }}>
            <ChevronUp size={11} />
          </motion.div>
        </button>
      </footer>

      <div>
        <>
          <Dot position="top" side="right" geometry="square" size="w-3 h-3" borderColor="border-default-border" />
          <Dot position="top" side="left" geometry="square" size="w-3 h-3" borderColor="border-default-border" />
          <Dot position="bottom" side="right" geometry="square" size="w-3 h-3" borderColor="border-default-border" />
          <Dot position="bottom" side="left" geometry="square" size="w-3 h-3" borderColor="border-default-border" />
        </>
      </div>
    </aside>
  );
};

export default Sidebar;
