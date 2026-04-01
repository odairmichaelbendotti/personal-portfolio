interface DotProps {
  position: "top" | "bottom";
  side: "left" | "right";
  geometry?: "circle" | "square";
  size:
    | "w-1 h-1"
    | "w-1.5 h-1.5"
    | "w-2 h-2"
    | "w-3 h-3"
    | "w-4 h-4"
    | "w-5 h-5";
  filled?: "bg-default-border" | "bg-accent" | "bg-accent-third" | "none";
  borderColor?:
    | "border-default-border"
    | "border-accent"
    | "border-accent-secondary";
}

const Dot = ({
  position,
  side,
  geometry = "square",
  size,
  filled,
  borderColor = "border-default-border",
}: DotProps) => {
  function getPositionClass() {
    if (position === "top" && side === "left") {
      return "top-0 left-0 translate-x-[-50%] translate-y-[-50%]";
    }
    if (position === "top" && side === "right") {
      return "top-0 right-0 translate-x-[50%] translate-y-[-50%]";
    }
    if (position === "bottom" && side === "left") {
      return "bottom-0 left-0 translate-x-[-50%] translate-y-[50%]";
    }
    if (position === "bottom" && side === "right") {
      return "bottom-0 right-0 translate-x-[50%] translate-y-[50%]";
    }
  }

  return (
    <div
      className={`absolute ${size} border ${borderColor} ${geometry === "circle" ? "rounded-full" : ""} ${getPositionClass()} ${filled !== "none" ? filled : ""}`}
    ></div>
  );
};

export default Dot;
