// Curva e tempos únicos para todo o portfólio — evita valores soltos em cada seção
export const EASE = [0.22, 1, 0.36, 1] as const;

export const DURATION = {
  fast: 0.18,
  base: 0.3,
  slow: 0.5,
} as const;

export const SPRING = { type: "spring", stiffness: 420, damping: 34 } as const;

export const SOFT_SPRING = { stiffness: 260, damping: 22, mass: 0.6 } as const;
