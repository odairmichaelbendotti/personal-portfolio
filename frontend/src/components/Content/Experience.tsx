import { useState } from "react";
import { motion } from "motion/react";
import ContentLayout from "./Layout/ContentLayout";

type AchievementCategory = "performance" | "devops" | "architecture" | "testing" | "feature";
type GroupId = "all" | "perf" | "devops" | "sistemas" | "qualidade";

type Achievement = {
  id: string;
  metric: string;
  subMetric: string;
  text: string;
  highlight: string;
  category: AchievementCategory;
};

type AchievementGroup = {
  id: GroupId;
  title: string;
  achievements: Achievement[];
};

const achievementGroups: AchievementGroup[] = [
  {
    id: "perf",
    title: "Performance",
    achievements: [
      {
        id: "perf-1",
        metric: "3× capacidade",
        subMetric: "900ms → 350ms de resposta",
        text: "Reestruturou um sistema backend monolítico para arquitetura de microsserviços com Clean Architecture e DDD, usando Node.js, TypeScript e AWS. O resultado foi",
        highlight: "3× mais requisições simultâneas e latência reduzida de 900ms para 350ms.",
        category: "architecture",
      },
      {
        id: "perf-2",
        metric: "12s → ~2s",
        subMetric: "tempo de carregamento",
        text: "Desenvolveu módulo de gestão de notas fiscais, ordens de compra e contas a pagar. Otimizou queries SQL e migrou para banco relacional, reduzindo o tempo de carregamento do painel de",
        highlight: "12 segundos para menos de 2 segundos.",
        category: "performance",
      },
    ],
  },
  {
    id: "devops",
    title: "DevOps",
    achievements: [
      {
        id: "devops-1",
        metric: "2h → 12min",
        subMetric: "tempo de publicação",
        text: "Projetou e implementou pipeline de CI/CD com GitHub Actions, automatizando build, testes e deploy de aplicações Node.js e Next.js. O processo que levava 2 horas passou a ser concluído em",
        highlight: "12 minutos, sem intervenção manual.",
        category: "devops",
      },
      {
        id: "devops-2",
        metric: "Zero divergências",
        subMetric: "entre ambientes",
        text: "Containerizou toda a stack backend e frontend com Docker, tornando o ambiente de desenvolvimento idêntico ao de produção e",
        highlight: "eliminando falhas causadas por diferenças de configuração.",
        category: "devops",
      },
      {
        id: "devops-3",
        metric: "~13h/semana",
        subMetric: "recuperadas pelo time",
        text: "Automatizou a geração de relatórios financeiros que antes eram feitos manualmente, eliminando erros humanos na consolidação de dados e devolvendo ao time",
        highlight: "cerca de 13 horas de trabalho por semana.",
        category: "devops",
      },
    ],
  },
  {
    id: "sistemas",
    title: "Sistemas",
    achievements: [
      {
        id: "api-1",
        metric: "Orçamentos precisos",
        subMetric: "em segundos",
        text: "Criou módulo completo de estimativa de custos para construção civil integrado à base de dados governamental, com backend em Node.js, TypeScript e PostgreSQL e interface em React. Reduziu o tempo de elaboração de propostas e",
        highlight: "aumentou significativamente a precisão dos orçamentos.",
        category: "feature",
      },
      {
        id: "api-2",
        metric: "Tempo real",
        subMetric: "sem recarregar a página",
        text: "Projetou e implementou sistema de notificações em tempo real substituindo polling por WebSockets com Node.js, TypeScript, React e Next.js, garantindo que todos os usuários recebam",
        highlight: "atualizações instantâneas e sincronizadas.",
        category: "feature",
      },
      {
        id: "api-3",
        metric: "Alta concorrência",
        subMetric: "rastreabilidade total",
        text: "Arquitetou API de controle de pagamentos com Node.js, TypeScript e MongoDB, projetada para processar",
        highlight: "múltiplas transações simultâneas com rastreabilidade financeira completa.",
        category: "architecture",
      },
    ],
  },
  {
    id: "qualidade",
    title: "Qualidade",
    achievements: [
      {
        id: "test-1",
        metric: "60% de cobertura",
        subMetric: "testes automatizados",
        text: "Implementou testes unitários e de integração com Jest e TypeScript, garantindo que falhas sejam detectadas automaticamente antes de qualquer atualização chegar ao usuário final. Alcançou",
        highlight: "60% de cobertura de testes e aumentou a confiabilidade do sistema em produção.",
        category: "testing",
      },
    ],
  },
];

const totalCount = achievementGroups.reduce((s, g) => s + g.achievements.length, 0);

const AchievementCard = ({ achievement, index }: { achievement: Achievement; index: number }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, delay: index * 0.04 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative p-4 rounded-sm cursor-default"
      style={{
        border: hovered ? "1px solid rgba(64,203,246,0.25)" : "1px solid var(--color-default-border)",
        transition: "border-color 0.2s",
      }}
    >
      <p className="font-mono text-lg font-bold text-accent leading-none">
        {achievement.metric}
      </p>
      <p className="font-mono text-[10px] text-text-secondary mt-1 mb-3">
        {achievement.subMetric}
      </p>
      <p className="text-xs text-text-muted leading-relaxed">
        {achievement.text}{" "}
        <span className="text-text-code">{achievement.highlight}</span>
      </p>
    </motion.div>
  );
};

const Experience = () => {
  const [activeGroup, setActiveGroup] = useState<GroupId>("all");

  const visibleAchievements =
    activeGroup === "all"
      ? achievementGroups.flatMap((g) => g.achievements)
      : achievementGroups.find((g) => g.id === activeGroup)?.achievements ?? [];

  const navItems: { id: GroupId; label: string; count: number }[] = [
    { id: "all", label: "All", count: totalCount },
    ...achievementGroups.map((g) => ({ id: g.id, label: g.title, count: g.achievements.length })),
  ];

  return (
    <ContentLayout>
      <div className="h-full w-full flex flex-col overflow-hidden bg-content-bg">

        {/* Header slim */}
        <motion.div
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          className="shrink-0 px-4 py-3"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-mono text-xs text-accent">Senior Full Stack Engineer</span>
              <span className="text-text-secondary text-[10px]">·</span>
              <span className="text-xs text-text-primary/40">Odair Michael Bendotti</span>
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
              <span className="font-mono font-bold text-accent text-xs">6+</span>
              <span className="text-[10px] text-text-secondary">anos</span>
              <span className="text-text-secondary text-[10px] mx-1">·</span>
              <span className="font-mono font-bold text-accent text-xs">{totalCount}</span>
              <span className="text-[10px] text-text-secondary">conquistas</span>
            </div>
          </div>
          <div className="mt-3 h-px bg-linear-to-r from-accent/30 via-default-border to-transparent" />
        </motion.div>

        {/* Mobile: tabs horizontais */}
        <div className="md:hidden shrink-0 flex overflow-x-auto scrollbar-hide border-b border-default-border/40 px-4 gap-1">
          {navItems.map((item) => {
            const isActive = activeGroup === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveGroup(item.id)}
                className="relative flex items-center gap-1.5 px-3 py-2.5 text-xs cursor-pointer shrink-0 border-b-2 transition-colors duration-150"
                style={{
                  borderBottomColor: isActive ? "var(--color-accent)" : "transparent",
                  color: isActive ? "var(--color-accent)" : "var(--color-text-secondary)",
                }}
              >
                <span>{item.label}</span>
                <span className="font-mono text-[10px] opacity-50">{item.count}</span>
              </button>
            );
          })}
        </div>

        {/* Mobile: achievement area full width */}
        <div className="md:hidden flex-1 overflow-y-auto scrollbar-hide p-4 pb-24">
          <motion.div
            key={activeGroup + "-mobile"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.18 }}
            className="flex flex-col gap-3"
          >
            {visibleAchievements.map((achievement, i) => (
              <AchievementCard key={achievement.id} achievement={achievement} index={i} />
            ))}
          </motion.div>
        </div>

        {/* Body: nav + content — desktop only */}
        <div className="hidden md:flex flex-1 min-h-0">

          {/* Nav lateral */}
          <motion.div
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
            className="shrink-0 w-36 border-r border-default-border/40 flex flex-col py-2"
          >
            {navItems.map((item) => {
              const isActive = activeGroup === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveGroup(item.id)}
                  className="flex items-center justify-between px-4 py-2.5 cursor-pointer text-xs transition-colors duration-150 -ml-px"
                  style={{
                    borderLeft: isActive ? "2px solid #40cbf6" : "2px solid transparent",
                    color: isActive ? "var(--color-accent)" : "var(--color-text-secondary)",
                    backgroundColor: isActive ? "rgba(64,203,246,0.05)" : "transparent",
                  }}
                  onMouseEnter={(e) => { if (!isActive) (e.currentTarget as HTMLButtonElement).style.color = "var(--color-text-primary)"; }}
                  onMouseLeave={(e) => { if (!isActive) (e.currentTarget as HTMLButtonElement).style.color = "var(--color-text-secondary)"; }}
                >
                  <span>{item.label}</span>
                  <span className="font-mono text-[10px] text-accent/40">{item.count}</span>
                </button>
              );
            })}
          </motion.div>

          {/* Achievement area */}
          <div className="flex-1 overflow-y-auto scrollbar-hide p-4">
            <motion.div
              key={activeGroup}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.18 }}
              className="flex flex-col gap-2"
            >
              {visibleAchievements.map((achievement, i) => (
                <AchievementCard key={achievement.id} achievement={achievement} index={i} />
              ))}
            </motion.div>
          </div>

        </div>

      </div>
    </ContentLayout>
  );
};

export default Experience;
