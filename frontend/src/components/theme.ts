import { useCallback, useSyncExternalStore } from "react";

// Tema ativo lido da classe .light no <html>: um único observer compartilhado por todos os componentes
const listeners = new Set<() => void>();
let observer: MutationObserver | null = null;

const subscribe = (onChange: () => void) => {
  listeners.add(onChange);
  if (!observer) {
    observer = new MutationObserver(() => listeners.forEach((l) => l()));
    observer.observe(document.documentElement, { attributeFilter: ["class"] });
  }
  return () => {
    listeners.delete(onChange);
    if (listeners.size === 0) {
      observer?.disconnect();
      observer = null;
    }
  };
};

const isLightSnapshot = () => document.documentElement.classList.contains("light");

export const useIsLight = () => useSyncExternalStore(subscribe, isLightSnapshot);

type Rgb = [number, number, number];

const hexToRgb = (hex: string): Rgb => {
  const h = hex.replace("#", "");
  return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16)) as Rgb;
};

const rgbToHex = (rgb: Rgb) =>
  `#${rgb.map((c) => Math.round(c).toString(16).padStart(2, "0")).join("")}`;

const luminance = ([r, g, b]: Rgb) => {
  const [lr, lg, lb] = [r, g, b].map((c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * lr + 0.7152 * lg + 0.0722 * lb;
};

const contrast = (a: Rgb, b: Rgb) => {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};

// Referência de fundo do tema claro (--color-card-background do Grafite)
const LIGHT_SURFACE = hexToRgb("#fcfcfc");

// Ícones sem cor (brancos/cinzas, ex. Next.js, Express, GitHub) viram tinta — escurecer só até 3:1 deixa um cinza com cara de desabilitado
const LIGHT_INK = "#27272a";
const isAchromatic = ([r, g, b]: Rgb) => Math.max(r, g, b) - Math.min(r, g, b) < 24;

const cache = new Map<string, string>();

// Escurece a cor na direção do preto até atingir o contraste mínimo sobre a superfície clara
export const darkenForLight = (hex: string, minContrast: number) => {
  const key = `${hex.toLowerCase()}:${minContrast}`;
  const cached = cache.get(key);
  if (cached) return cached;

  const base = hexToRgb(hex);
  if (isAchromatic(base) && contrast(base, LIGHT_SURFACE) < minContrast) {
    cache.set(key, LIGHT_INK);
    return LIGHT_INK;
  }
  let current = base;
  for (let t = 0; t <= 1 && contrast(current, LIGHT_SURFACE) < minContrast; t += 0.05) {
    current = base.map((c) => c * (1 - t)) as Rgb;
  }
  const result = rgbToHex(current);
  cache.set(key, result);
  return result;
};

// Cores de marca escuras demais para o fundo dark (o tema escuro não é ajustado automaticamente)
const darkOverrides: Record<string, string> = {
  "#2d3748": "#a3b1c2", // Prisma
  "#880000": "#c9544d", // Mongoose
};

// 3:1 é o mínimo WCAG para elementos gráficos (ícones); 4.5:1 para texto
export const ICON_CONTRAST = 3;
export const TEXT_CONTRAST = 4.5;

export const useBrandColor = () => {
  const isLight = useIsLight();
  return useCallback(
    (hex: string, minContrast: number = ICON_CONTRAST) =>
      isLight ? darkenForLight(hex, minContrast) : (darkOverrides[hex.toLowerCase()] ?? hex),
    [isLight],
  );
};
