import { motion } from "motion/react";
import ContentLayout from "./Layout/ContentLayout";
import { useState } from "react";

interface AchievementPart {
  text: string;
  isBadge?: boolean;
}

interface Achievement {
  id: string;
  parts: AchievementPart[];
}

// Todos os achievements
const allAchievements: Achievement[] = [
  {
    id: "ach-1",
    parts: [
      { text: "Rearquiteturou backend monolítico em " },
      { text: "microserviços", isBadge: true },
      { text: " com DDD. Aumentou capacidade de requisições em " },
      { text: "3×", isBadge: true },
      { text: " e redus latência de " },
      { text: "900ms → 350ms", isBadge: true },
    ],
  },
  {
    id: "ach-2",
    parts: [
      { text: "Implementou " },
      { text: "CI/CD", isBadge: true },
      { text: " com GitHub Actions, reduzindo deployment de 2h para " },
      { text: "12min", isBadge: true },
    ],
  },
  {
    id: "ach-3",
    parts: [
      { text: "Desenvolveu módulo de estimativa para " },
      { text: "construção civil", isBadge: true },
      { text: " com precisão orçamentária otimizada." },
    ],
  },
  {
    id: "ach-4",
    parts: [
      { text: "Otimizou dashboard administrativo com " },
      { text: "SQL", isBadge: true },
      { text: ", reduzindo resposta de " },
      { text: "12s → ~2s", isBadge: true },
    ],
  },
  {
    id: "ach-5",
    parts: [
      { text: "Implementou testes com Jest, alcançando " },
      { text: "60% cobertura", isBadge: true },
      { text: " e aumentando confiabilidade em " },
      { text: "produção", isBadge: true },
    ],
  },
  {
    id: "ach-6",
    parts: [
      { text: "Construiu sistema " },
      { text: "real-time", isBadge: true },
      { text: " com WebSockets para notificações instantâneas." },
    ],
  },
  {
    id: "ach-7",
    parts: [
      { text: "Containerizou stack com " },
      { text: "Docker", isBadge: true },
      { text: ", eliminando inconsistências de ambiente." },
    ],
  },
  {
    id: "ach-8",
    parts: [
      { text: "Desenhou " },
      { text: "API de pagamentos", isBadge: true },
      { text: " suportando alta concorrência com rastreabilidade financeira." },
    ],
  },
  {
    id: "ach-9",
    parts: [
      { text: "Automatizou relatórios financeiros, economizando " },
      { text: "~13h semanais", isBadge: true },
    ],
  },
];

const AchievementItem = ({
  achievement,
  index,
}: {
  achievement: Achievement;
  index: number;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: -15 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.25, delay: index * 0.04 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative flex gap-2.5 group"
    >
      {/* Dot Timeline */}
      <div className="flex flex-col items-center shrink-0 pt-0.5">
        <motion.div
          className="w-2 h-2 rounded-full border border-accent"
          animate={{
            backgroundColor: isHovered ? "#40cbf6" : "transparent",
            scale: isHovered ? 1.1 : 1,
          }}
          transition={{ duration: 0.15 }}
        />
        {index !== allAchievements.length - 1 && (
          <div className="w-px h-6 bg-linear-to-b from-accent/40 to-accent/10" />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 pt-0.5">
        <p className="text-xs leading-relaxed text-gray-300">
          <span className="text-accent/60">•</span>{" "}
          {achievement.parts.map((part, idx) =>
            part.isBadge ? (
              <span
                key={idx}
                className="inline-block px-1.5 py-0.5 rounded text-xs font-semibold"
                style={{
                  backgroundColor: "rgba(10, 15, 5, 0.8)",
                  color: "#8fd952",
                }}
              >
                {part.text}
              </span>
            ) : (
              <span key={idx}>{part.text}</span>
            ),
          )}
        </p>
      </div>
    </motion.div>
  );
};

const Experience = () => {
  return (
    <ContentLayout>
      <div className="h-full w-full flex flex-col overflow-hidden">
        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-2 sm:p-3 space-y-3">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="border-b border-default-border/50 pb-3"
          >
            <h2 className="text-lg sm:text-xl font-bold text-accent mb-1">
              Senior Full Stack Engineer
            </h2>
            <p className="text-xs text-gray-400">
              <span className="font-mono">2022 - Presente</span>
            </p>
          </motion.div>

          {/* Timeline - All Achievements */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="space-y-1"
          >
            {allAchievements.map((achievement, index) => (
              <AchievementItem
                key={achievement.id}
                achievement={achievement}
                index={index}
              />
            ))}
          </motion.div>
        </div>

        {/* Tech Stack - Fixed at Bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="shrink-0 p-2 sm:p-3 border-t border-default-border/30 bg-background/50"
        >
          <p className="text-xs text-gray-400 mb-1.5">Stack:</p>
          <div className="flex flex-wrap gap-1.5">
            {[
              "Node.js",
              "TypeScript",
              "React",
              "Next.js",
              "AWS",
              "Docker",
              "PostgreSQL",
              "MongoDB",
              "Jest",
            ].map((tech) => (
              <span
                key={tech}
                className="px-1.5 py-0.5 rounded text-xs font-semibold"
                style={{
                  backgroundColor: "rgba(10, 15, 5, 0.7)",
                  color: "#8fd952",
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </ContentLayout>
  );
};

export default Experience;
