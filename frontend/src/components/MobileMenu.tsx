import { motion } from "motion/react";
import { Award, Briefcase, FolderGit2, Mail, User, Sun, Moon } from "lucide-react";
import type { SidebarProps } from "./Sidebar";

const navItems = [
  { text: "About", Icon: User },
  { text: "Skills", Icon: Award },
  { text: "Experience", Icon: Briefcase },
  { text: "Projects", Icon: FolderGit2 },
  { text: "Contact", Icon: Mail },
];

const MobileMenu = ({ setView, view, theme, setTheme }: SidebarProps) => {
  return (
    <div
      className="absolute bottom-3 left-1/2 -translate-x-1/2 z-50 w-[92%] flex items-center"
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
              onClick={() => setView(item.text)}
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

      {/* Theme toggle */}
      <button
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="flex items-center justify-center w-12 h-full cursor-pointer shrink-0"
        style={{ color: "var(--color-text-secondary)" }}
      >
        {theme === "light" ? <Sun size={15} style={{ color: "var(--color-accent)" }} /> : <Moon size={15} style={{ color: "var(--color-accent)" }} />}
      </button>
    </div>
  );
};

export default MobileMenu;
