import Dot from "./Dot";
import * as motion from "motion/react-client";

type CornerBoxProps = {
  height: number;
  width: number;
  text: string;
};

const CornerBox = ({ height, width, text }: CornerBoxProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 30 }}
      className={`relative px-2 italic text-justify py-1.5 w-${width} h-${height} text-sm flex items-center justify-center bg-accent-third border border-accent-secondary text-accent`}
    >
      <Dot
        position="top"
        side="right"
        geometry="square"
        size="w-1.5 h-1.5"
        filled="bg-accent"
        borderColor="border-accent"
      />
      <Dot
        position="top"
        side="left"
        geometry="square"
        size="w-1.5 h-1.5"
        filled="bg-accent"
        borderColor="border-accent"
      />
      <Dot
        position="bottom"
        side="right"
        geometry="square"
        size="w-1.5 h-1.5"
        filled="bg-accent"
        borderColor="border-accent"
      />
      <Dot
        position="bottom"
        side="left"
        geometry="square"
        size="w-1.5 h-1.5"
        filled="bg-accent"
        borderColor="border-accent"
      />
      {text}
    </motion.div>
  );
};

export default CornerBox;
