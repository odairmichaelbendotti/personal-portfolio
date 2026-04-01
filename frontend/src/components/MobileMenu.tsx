import { Award, Briefcase, FolderGit2, Mail, User } from "lucide-react";
import type { SidebarProps } from "./Sidebar";

const MobileMenu = ({ setView, view }: SidebarProps) => {
  const navItems = [
    { text: "About me", Icon: User },
    { text: "Skills", Icon: Award },
    { text: "Experience", Icon: Briefcase },
    { text: "Projects", Icon: FolderGit2 },
    { text: "Contact", Icon: Mail },
  ];

  function activeClass(itemText: string) {
    return itemText === view ? "text-accent" : "text-default-text";
  }

  return (
    <div className="absolute bg-accent-third z-10 border-default-border text-white bottom-2 right-1/2 translate-x-[50%] w-[95%] grid grid-cols-5 px-3 py-0.5 rounded-lg">
      {navItems.map((item, index) => (
        <div
          key={index}
          className="flex flex-col items-center justify-center p-2"
        >
          <item.Icon
            size={20}
            className={activeClass(item.text)}
            onClick={() => setView(item.text)}
          />
          <span className={`text-xs mt-1 ${activeClass(item.text)}`}>
            {item.text}
          </span>
        </div>
      ))}
    </div>
  );
};

export default MobileMenu;
