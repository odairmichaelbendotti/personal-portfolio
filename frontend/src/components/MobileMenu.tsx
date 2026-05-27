import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Award, Briefcase, FolderGit2, Mail, User, FileText, Download } from "lucide-react";
import type { SidebarProps } from "./Sidebar";

const navItems = [
  { text: "About", Icon: User },
  { text: "Skills", Icon: Award },
  { text: "Experience", Icon: Briefcase },
  { text: "Projects", Icon: FolderGit2 },
  { text: "Contact", Icon: Mail },
];

const docs = [
  { label: "Currículo", file: "/curriculo.pdf" },
  { label: "Carta de Apresentação", file: "/cover-letter.pdf" },
];

const MobileMenu = ({ setView, view }: Omit<SidebarProps, "theme" | "setTheme">) => {
  const [docsOpen, setDocsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setDocsOpen(false);
      }
    };
    if (docsOpen) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [docsOpen]);

  return (
    <div ref={ref} className="absolute bottom-3 left-1/2 -translate-x-1/2 z-50 w-[92%]">

      {/* Docs dropdown */}
      <AnimatePresence>
        {docsOpen && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.15 }}
            className="absolute bottom-full right-0 mb-2 flex flex-col rounded-sm overflow-hidden"
            style={{
              backgroundColor: "var(--color-card-background)",
              border: "1px solid var(--color-default-border)",
              minWidth: "180px",
            }}
          >
            {docs.map((doc, i) => (
              <a
                key={doc.file}
                href={doc.file}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setDocsOpen(false)}
                className="flex items-center gap-2.5 px-3 py-2.5 cursor-pointer transition-colors duration-100"
                style={{
                  borderTop: i > 0 ? "1px solid var(--color-default-border)" : undefined,
                  color: "var(--color-text-secondary)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.color = "var(--color-accent)";
                  (e.currentTarget as HTMLElement).style.backgroundColor = "var(--color-accent-third)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.color = "var(--color-text-secondary)";
                  (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
                }}
              >
                <Download size={11} />
                <span className="font-mono text-[10px]">{doc.label}</span>
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bar */}
      <div
        className="flex items-center w-full"
        style={{
          backgroundColor: "var(--color-accent-third)",
          border: "1px solid var(--color-default-border)",
          borderRadius: "4px",
        }}
      >
        {/* Nav items */}
        <div className="flex flex-1">
          {navItems.map((item) => {
            const isActive = item.text === view;
            return (
              <button
                key={item.text}
                onClick={() => { setView(item.text); setDocsOpen(false); }}
                className="relative flex flex-col items-center justify-center flex-1 py-2.5 gap-1 cursor-pointer"
              >
                {isActive && (
                  <motion.div
                    layoutId="mobile-indicator"
                    className="absolute top-0 left-2 right-2 h-0.5 bg-accent rounded-full"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <motion.div
                  animate={{ scale: isActive ? 1 : 0.9, opacity: isActive ? 1 : 0.5 }}
                  transition={{ duration: 0.15 }}
                >
                  <item.Icon
                    size={18}
                    style={{ color: isActive ? "var(--color-accent)" : "var(--color-text-secondary)" }}
                  />
                </motion.div>
                <span
                  className="font-mono text-[9px] tracking-wide"
                  style={{ color: isActive ? "var(--color-accent)" : "var(--color-text-secondary)" }}
                >
                  {item.text}
                </span>
              </button>
            );
          })}
        </div>

        {/* Divider */}
        <div className="w-px h-8 bg-default-border/50 shrink-0" />

        {/* Docs trigger */}
        <button
          onClick={() => setDocsOpen((o) => !o)}
          className="flex flex-col items-center justify-center gap-1 px-4 py-2.5 cursor-pointer shrink-0"
        >
          <motion.div animate={{ rotate: docsOpen ? 45 : 0 }} transition={{ duration: 0.15 }}>
            <FileText size={18} style={{ color: docsOpen ? "var(--color-accent)" : "var(--color-text-secondary)" }} />
          </motion.div>
          <span
            className="font-mono text-[9px] tracking-wide"
            style={{ color: docsOpen ? "var(--color-accent)" : "var(--color-text-secondary)" }}
          >
            Docs
          </span>
        </button>
      </div>
    </div>
  );
};

export default MobileMenu;
