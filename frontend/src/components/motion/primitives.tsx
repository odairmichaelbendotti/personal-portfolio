import { Fragment, useLayoutEffect, useRef } from "react";
import type { PointerEvent, ReactNode } from "react";
import { animate, motion, useReducedMotion, useSpring } from "motion/react";
import { DURATION, EASE, SOFT_SPRING } from "./constants";
import type { useSpotlight } from "./hooks";

type BaseProps = { children: ReactNode; className?: string };

export function Reveal({
  children,
  className,
  delay = 0,
  x = 0,
  y = 8,
}: BaseProps & { delay?: number; x?: number; y?: number }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x, y }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: DURATION.slow, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

export function Stagger({
  children,
  className,
  stagger = 0.06,
  delay = 0,
}: BaseProps & { stagger?: number; delay?: number }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      animate="show"
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
  x = 0,
  y = 6,
}: BaseProps & { x?: number; y?: number }) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, x, y },
        show: { opacity: 1, x: 0, y: 0, transition: { duration: DURATION.base, ease: EASE } },
      }}
    >
      {children}
    </motion.div>
  );
}

// Texto íntegro fica disponível para leitor de tela; as palavras animadas são decorativas
export function WordReveal({
  text,
  className,
  delay = 0,
  stagger = 0.03,
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
}) {
  const words = text.split(" ");
  return (
    <span className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden>
        {words.map((word, i) => (
          <Fragment key={i}>
            <motion.span
              className="inline-block"
              initial={{ opacity: 0, y: 6, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.4, ease: EASE, delay: delay + i * stagger }}
            >
              {word}
            </motion.span>
            {i < words.length - 1 && " "}
          </Fragment>
        ))}
      </span>
    </span>
  );
}

export function CountUp({
  value,
  prefix = "",
  suffix = "",
  duration = 1.1,
  delay = 0,
  className,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();
  const final = `${prefix}${value}${suffix}`;

  // Layout effect: o número inicial é escrito antes da pintura, sem piscar o valor final
  useLayoutEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (reduce) {
      node.textContent = final;
      return;
    }
    node.textContent = `${prefix}0${suffix}`;
    const controls = animate(0, value, {
      duration,
      delay,
      ease: EASE,
      onUpdate: (v) => {
        node.textContent = `${prefix}${Math.round(v)}${suffix}`;
      },
    });
    return () => {
      controls.stop();
      node.textContent = final;
    };
  }, [value, prefix, suffix, duration, delay, reduce, final]);

  return (
    <span className={className}>
      <span className="sr-only">{final}</span>
      <span ref={ref} aria-hidden className="tabular-nums" />
    </span>
  );
}

export function Magnetic({
  children,
  className,
  strength = 0.25,
}: BaseProps & { strength?: number }) {
  const reduce = useReducedMotion();
  const x = useSpring(0, SOFT_SPRING);
  const y = useSpring(0, SOFT_SPRING);

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse" || reduce) return;
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - (rect.left + rect.width / 2)) * strength);
    y.set((e.clientY - (rect.top + rect.height / 2)) * strength);
  };

  const onPointerLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      className={className}
      style={{ x, y }}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
    >
      {children}
    </motion.div>
  );
}


export function SpotlightLayer({ layer }: { layer: ReturnType<typeof useSpotlight>["layer"] }) {
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none absolute left-0 top-0 z-0 rounded-full"
      style={{
        x: layer.x,
        y: layer.y,
        opacity: layer.opacity,
        width: layer.size,
        height: layer.size,
        background:
          "radial-gradient(circle, color-mix(in srgb, var(--color-accent) 9%, transparent) 0%, transparent 70%)",
      }}
    />
  );
}
