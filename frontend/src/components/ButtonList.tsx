import { type LucideIcon } from "lucide-react";
import { motion } from "motion/react";
import Dot from "./Dot";
import { SPRING } from "./motion";

type ButtonListProps = {
  id: string;
  text: string;
  Icon: LucideIcon;
  view: string;
  setView: React.Dispatch<React.SetStateAction<string>>;
};

const corners = [
  { position: "top", side: "left" },
  { position: "top", side: "right" },
  { position: "bottom", side: "left" },
  { position: "bottom", side: "right" },
] as const;

const ButtonList = ({ id, text, Icon, view, setView }: ButtonListProps) => {
  const isActive = id === view;

  return (
    <li className="relative">
      {/* Moldura ativa compartilhada: desliza entre os itens via layoutId */}
      {isActive && (
        <motion.div
          layoutId="sidebar-active"
          transition={SPRING}
          className="pointer-events-none absolute inset-0 border border-accent bg-accent-third"
        >
          {corners.map((c) => (
            <Dot
              key={`${c.position}-${c.side}`}
              position={c.position}
              side={c.side}
              size="w-1.5 h-1.5"
              borderColor="border-accent"
              filled="bg-accent"
              geometry="square"
            />
          ))}
        </motion.div>
      )}

      <button
        type="button"
        aria-current={isActive ? "page" : undefined}
        onClick={() => setView(id)}
        className={`group relative w-full flex items-center gap-4 py-3 px-3 cursor-pointer text-left outline-none focus-visible:ring-1 focus-visible:ring-accent ${
          isActive ? "text-accent" : "text-text-secondary hover:bg-accent-third hover:text-text-primary"
        }`}
      >
        {!isActive && (
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 before:absolute before:inset-0 before:border before:border-accent before:[clip-path:inset(0_100%_0_0)] group-hover:before:[clip-path:inset(0_0%_0_0)] before:transition-[clip-path] before:duration-400 before:ease-in-out"
          />
        )}
        <Icon size={16} />
        <span className="text-xs">{text}</span>
      </button>
    </li>
  );
};

export default ButtonList;
