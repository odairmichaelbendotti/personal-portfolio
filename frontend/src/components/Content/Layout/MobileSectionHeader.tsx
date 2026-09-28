import type { ReactNode } from "react";
import { motion } from "motion/react";
import { DURATION, EASE } from "../../motion";

type MobileSectionHeaderProps = {
  index: string;
  title: string;
  aside: ReactNode;
};

const MobileSectionHeader = ({ index, title, aside }: MobileSectionHeaderProps) => (
  <motion.div
    initial={{ opacity: 0, y: -4 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: DURATION.base, ease: EASE }}
    className="shrink-0 md:hidden"
  >
    <div className="flex items-center justify-between px-4 pt-3 pb-2.5">
      <div className="flex items-center gap-2.5">
        <span className="font-mono text-[10px] text-accent/40 tracking-widest">§{index}</span>
        <h2 className="text-base font-bold text-text-primary tracking-tight">{title}</h2>
      </div>
      <div className="flex items-center gap-1">{aside}</div>
    </div>
    <motion.div
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      transition={{ duration: DURATION.slow, ease: EASE, delay: 0.15 }}
      className="h-0.5 origin-left bg-linear-to-r from-accent via-accent/30 to-transparent"
    />
  </motion.div>
);

export default MobileSectionHeader;
