import {
  Sun,
  User,
  Mail,
  FolderGit2,
  Briefcase,
  Award,
  Moon,
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
  return (
    <aside className="flex flex-col w-70 h-155 border border-default-border relative">
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
      <footer className="flex gap-2 bg-accent-third items-center justify-center border-t border-default-border py-1.5 text-center text-text-secondary">
        <span className="w-2 h-2 rounded-full bg-green-500"></span>
        <p className="text-xs font-medium">Available to work</p>
      </footer>
      <div>
        <>
          <Dot
            position="top"
            side="right"
            geometry="square"
            size="w-3 h-3"
            borderColor="border-default-border"
          />
          <Dot
            position="top"
            side="left"
            geometry="square"
            size="w-3 h-3"
            borderColor="border-default-border"
          />
          <Dot
            position="bottom"
            side="right"
            geometry="square"
            size="w-3 h-3"
            borderColor="border-default-border"
          />
          <Dot
            position="bottom"
            side="left"
            geometry="square"
            size="w-3 h-3"
            borderColor="border-default-border"
          />
        </>
      </div>
    </aside>
  );
};

export default Sidebar;
