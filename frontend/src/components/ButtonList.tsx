import { type LucideIcon } from "lucide-react";
import Dot from "./Dot";

type ButtonListProps = {
  text: string;
  Icon: LucideIcon;
  view: string;
  setView: React.Dispatch<React.SetStateAction<string>>;
};

const ButtonList = ({ text, Icon, view, setView }: ButtonListProps) => {
  console.log(view);
  function hover() {
    return `pointer-events-none absolute inset-0
          before:absolute before:inset-0
          before:border before:border-accent
          before:[clip-path:inset(0_100%_0_0)]
          group-hover:before:[clip-path:inset(0_0%_0_0)]
          before:transition-[clip-path] before:duration-400 before:ease-in-out`;
  }

  function ativeView() {
    if (text === view) {
      return `relative border border-accent bg-accent-third group cursor-pointer`;
    }
    return `relative border border-transparent group cursor-pointer`;
  }

  return (
    <div className={`${ativeView()}`} onClick={() => setView(text)}>
      <span className={`${text !== view && hover()}`} />
      {view === text && (
        <>
          <Dot
            position="top"
            side="right"
            size="w-1.5 h-1.5"
            borderColor="border-accent"
            filled="bg-accent"
            geometry="square"
          />

          <Dot
            position="top"
            side="left"
            size="w-1.5 h-1.5"
            borderColor="border-accent"
            filled="bg-accent"
            geometry="square"
          />

          <Dot
            position="bottom"
            side="right"
            size="w-1.5 h-1.5"
            borderColor="border-accent"
            filled="bg-accent"
            geometry="square"
          />

          <Dot
            position="bottom"
            side="left"
            size="w-1.5 h-1.5"
            borderColor="border-accent"
            filled="bg-accent"
            geometry="square"
          />
        </>
      )}

      <li className="flex items-center gap-4 py-3 px-3 hover:bg-accent-third">
        <Icon size={16} />
        <p className="text-xs">{text}</p>
      </li>
    </div>
  );
};

export default ButtonList;
