import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";
import ContentLayout from "./Layout/ContentLayout";
import {
  SiNodedotjs, SiTypescript, SiDocker, SiPostgresql,
  SiMongodb, SiGithubactions, SiReact, SiNextdotjs,
  SiSocketdotio,
} from "react-icons/si";
import { FaAws } from "react-icons/fa";
import { SiJest } from "react-icons/si";

const techIconMap: Record<string, { icon: React.ElementType; color: string }> = {
  "Node.js":        { icon: SiNodedotjs,      color: "#339933" },
  "TypeScript":     { icon: SiTypescript,     color: "#3178C6" },
  "AWS":            { icon: FaAws,            color: "#FF9900" },
  "Docker":         { icon: SiDocker,         color: "#2496ED" },
  "Docker Compose": { icon: SiDocker,         color: "#2496ED" },
  "PostgreSQL":     { icon: SiPostgresql,     color: "#4169E1" },
  "MongoDB":        { icon: SiMongodb,        color: "#47A248" },
  "GitHub Actions": { icon: SiGithubactions,  color: "#2088FF" },
  "React":          { icon: SiReact,          color: "#61DAFB" },
  "Next.js":        { icon: SiNextdotjs,      color: "#ffffff" },
  "WebSockets":     { icon: SiSocketdotio,    color: "#ffffff" },
  "Jest":           { icon: SiJest,           color: "#C21325" },
};

type GroupId = "all" | "perf" | "devops" | "sistemas" | "qualidade";

type Achievement = {
  id: string;
  metric: string;
  metricSub: string;
  description: string;
  context: string;
  impact: string[];
  stack: string[];
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
        metric: "3×",
        metricSub: "throughput",
        description: "Migração de monolito para microsserviços com Clean Architecture e DDD — latência de 900ms → 350ms.",
        context: "O sistema backend enfrentava gargalos críticos de escalabilidade sob carga real. A migração para microsserviços com Clean Architecture e DDD permitiu isolar responsabilidades, escalar serviços individualmente e introduzir filas assíncronas para operações pesadas. A refatoração foi feita de forma incremental, sem downtime.",
        impact: [
          "3× mais requisições simultâneas suportadas",
          "Latência de resposta: 900ms → 350ms",
          "Downtime zero durante a migração",
          "Deploys independentes por serviço",
        ],
        stack: ["Node.js", "TypeScript", "AWS", "Docker"],
      },
      {
        id: "perf-2",
        metric: "12s → 2s",
        metricSub: "carregamento",
        description: "Otimização de queries SQL e migração para banco relacional no módulo financeiro.",
        context: "O painel financeiro carregava dados via queries não otimizadas em banco NoSQL, causando lentidão crítica para os usuários. A migração para PostgreSQL com índices adequados, views materializadas e paginação server-side reduziu drasticamente o tempo de resposta do painel principal.",
        impact: [
          "Tempo de carregamento: 12s → menos de 2s",
          "Queries otimizadas com índices compostos",
          "Paginação server-side eliminando over-fetching",
          "Experiência do usuário significativamente melhorada",
        ],
        stack: ["PostgreSQL", "TypeScript", "Node.js"],
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
        metricSub: "deploy",
        description: "Pipeline de CI/CD com GitHub Actions — build, testes e deploy automatizados sem intervenção manual.",
        context: "O processo de publicação era manual, propenso a erros e dependente de um único desenvolvedor. O pipeline implementado com GitHub Actions automatiza build, execução de testes, criação de imagem Docker e deploy em AWS, com rollback automático em caso de falha nos testes.",
        impact: [
          "Tempo de publicação: 2h → 12 minutos",
          "Zero intervenção manual no processo de deploy",
          "Rollback automático em falhas de teste",
          "Histórico completo de deploys auditável",
        ],
        stack: ["GitHub Actions", "Node.js", "Next.js", "Docker", "AWS"],
      },
      {
        id: "devops-2",
        metric: "Zero",
        metricSub: "divergências",
        description: "Stack containerizada com Docker — ambiente de dev idêntico ao de produção.",
        context: "Falhas recorrentes em produção eram causadas por diferenças entre ambientes de desenvolvimento e produção. A containerização completa da stack com Docker Compose para desenvolvimento e imagens otimizadas para produção eliminou essa classe de problema, além de simplificar o onboarding de novos desenvolvedores.",
        impact: [
          "Ambientes de dev e produção 100% idênticos",
          "Onboarding de novos devs: setup em minutos",
          "Eliminação de bugs exclusivos de produção por config",
          "Portabilidade total da stack",
        ],
        stack: ["Docker", "Docker Compose", "Node.js"],
      },
      {
        id: "devops-3",
        metric: "~13h",
        metricSub: "por semana",
        description: "Automação de relatórios financeiros antes feitos manualmente — erros eliminados.",
        context: "A equipe financeira gastava mais de 13 horas semanais consolidando dados manualmente em planilhas, com alto risco de erros humanos. O sistema automatizado coleta, processa e gera relatórios em PDF/Excel com agendamento configurável, notificando os responsáveis por e-mail ao concluir.",
        impact: [
          "~13 horas semanais devolvidas à equipe",
          "Erros de consolidação manual eliminados",
          "Relatórios gerados com agendamento automático",
          "Notificação por e-mail ao concluir geração",
        ],
        stack: ["Node.js", "TypeScript", "PostgreSQL"],
      },
    ],
  },
  {
    id: "sistemas",
    title: "Sistemas",
    achievements: [
      {
        id: "api-1",
        metric: "Segundos",
        metricSub: "vs. horas",
        description: "Módulo de estimativa de custos para construção civil integrado à base de dados governamental.",
        context: "Orçamentos de construção civil eram elaborados manualmente com tabelas desatualizadas, levando horas e gerando propostas imprecisas. O módulo integra-se à base de dados SINAPI (governo federal) para busca de insumos e composições, calcula automaticamente BDI e aplica regionalizações, entregando estimativas precisas em segundos.",
        impact: [
          "Tempo de elaboração: horas → segundos",
          "Integração com base SINAPI atualizada",
          "Cálculo automático de BDI e regionalização",
          "Aumento significativo na precisão dos orçamentos",
        ],
        stack: ["Node.js", "TypeScript", "PostgreSQL", "React"],
      },
      {
        id: "api-2",
        metric: "Tempo real",
        metricSub: "sem polling",
        description: "Sistema de notificações via WebSockets substituindo polling — atualizações instantâneas.",
        context: "O sistema anterior usava polling a cada 30 segundos para verificar novas notificações, causando carga desnecessária no servidor e atraso nas atualizações. A migração para WebSockets com Node.js garante que todos os usuários conectados recebam atualizações instantâneas e sincronizadas, com reconexão automática em caso de queda.",
        impact: [
          "Latência de notificação: 30s → instantânea",
          "Carga de servidor reduzida com eliminação do polling",
          "Reconexão automática com backoff exponencial",
          "Suporte a múltiplas abas/sessões simultâneas",
        ],
        stack: ["WebSockets", "Node.js", "TypeScript", "React", "Next.js"],
      },
      {
        id: "api-3",
        metric: "Alta",
        metricSub: "concorrência",
        description: "API de controle de pagamentos com rastreabilidade financeira completa.",
        context: "A API de pagamentos precisava suportar múltiplas transações simultâneas com garantia de consistência e rastreabilidade total. A arquitetura usa padrão de eventos para auditoria, transações idempotentes para evitar duplicidade e índices otimizados no MongoDB para consultas de extrato em alta velocidade.",
        impact: [
          "Suporte a múltiplas transações simultâneas",
          "Rastreabilidade financeira completa via event log",
          "Idempotência garantida — sem duplicidade de cobranças",
          "Consultas de extrato em < 100ms",
        ],
        stack: ["Node.js", "TypeScript", "MongoDB"],
      },
    ],
  },
  {
    id: "qualidade",
    title: "Qualidade",
    achievements: [
      {
        id: "test-1",
        metric: "60%",
        metricSub: "cobertura",
        description: "Testes unitários e de integração com Jest — falhas detectadas antes de chegar ao usuário.",
        context: "O projeto não tinha cultura de testes estabelecida, resultando em regressões frequentes em produção. A implementação de testes unitários para regras de negócio críticas e testes de integração para os principais fluxos de API, combinada com a execução automática no pipeline de CI, criou uma rede de segurança que detecta problemas antes do deploy.",
        impact: [
          "60% de cobertura de testes automatizados",
          "Regressões detectadas automaticamente no CI",
          "Confiabilidade aumentada em produção",
          "Refatorações seguras com cobertura garantida",
        ],
        stack: ["Jest", "TypeScript", "Node.js"],
      },
    ],
  },
];

const totalCount = achievementGroups.reduce((s, g) => s + g.achievements.length, 0);

const DetailModal = ({ achievement, onClose }: { achievement: Achievement; onClose: () => void }) => {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.15 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{ backgroundColor: "rgba(3,5,7,0.75)", backdropFilter: "blur(2px)" }}
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="relative w-full max-w-lg max-h-[80vh] overflow-y-auto scrollbar-hide flex flex-col rounded-sm"
          style={{
            backgroundColor: "var(--color-card-background)",
            border: "1px solid var(--color-default-border)",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Modal header */}
          <div
            className="shrink-0 flex items-start justify-between px-5 pt-5 pb-4"
            style={{ borderBottom: "1px solid var(--color-default-border)" }}
          >
            <div className="flex flex-col gap-0.5">
              <span className="font-mono text-2xl font-bold text-accent leading-none">
                {achievement.metric}
              </span>
              <span className="font-mono text-[10px] text-text-secondary/60 uppercase tracking-widest">
                {achievement.metricSub}
              </span>
            </div>
            <button
              onClick={onClose}
              className="flex items-center justify-center w-7 h-7 rounded-sm cursor-pointer transition-colors duration-150"
              style={{ color: "var(--color-text-muted)", border: "1px solid var(--color-default-border)" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.color = "var(--color-accent)";
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(64,203,246,0.3)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.color = "var(--color-text-muted)";
                (e.currentTarget as HTMLElement).style.borderColor = "var(--color-default-border)";
              }}
            >
              <X size={13} />
            </button>
          </div>

          {/* Modal body */}
          <div className="flex flex-col gap-5 px-5 py-5">

            {/* Context */}
            <div className="flex flex-col gap-2">
              <span className="font-mono text-[9px] text-accent/40 uppercase tracking-widest">// contexto</span>
              <p className="text-xs text-text-secondary leading-relaxed">{achievement.context}</p>
            </div>

            {/* Divider */}
            <div className="h-px bg-default-border/40" />

            {/* Impact */}
            <div className="flex flex-col gap-2">
              <span className="font-mono text-[9px] text-accent/40 uppercase tracking-widest">// impacto</span>
              <ul className="flex flex-col gap-1.5">
                {achievement.impact.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="font-mono text-[10px] text-accent/50 shrink-0 mt-0.5">→</span>
                    <span className="text-xs text-text-code leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Divider */}
            <div className="h-px bg-default-border/40" />

            {/* Stack */}
            <div className="flex flex-col gap-2">
              <span className="font-mono text-[9px] text-accent/40 uppercase tracking-widest">// stack</span>
              <div className="flex flex-wrap gap-1.5">
                {achievement.stack.map((tech) => {
                  const entry = techIconMap[tech];
                  const Icon = entry?.icon;
                  return (
                    <span
                      key={tech}
                      className="flex items-center gap-1.5 font-mono text-[10px] px-2 py-1 rounded-sm"
                      style={{
                        backgroundColor: "var(--color-accent-third)",
                        color: "var(--color-text-secondary)",
                        border: "1px solid var(--color-default-border)",
                      }}
                    >
                      {Icon && <Icon size={12} style={{ color: entry.color }} />}
                      {tech}
                    </span>
                  );
                })}
              </div>
            </div>

          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const AchievementCard = ({
  achievement,
  index,
  onClick,
}: {
  achievement: Achievement;
  index: number;
  onClick: () => void;
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, delay: index * 0.04 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
      className="flex gap-4 px-4 py-3 rounded-sm cursor-pointer"
      style={{
        border: hovered ? "1px solid rgba(64,203,246,0.22)" : "1px solid var(--color-default-border)",
        backgroundColor: hovered ? "rgba(64,203,246,0.02)" : "transparent",
        transition: "border-color 0.2s, background-color 0.2s",
      }}
    >
      {/* Metric column */}
      <div className="shrink-0 w-20 flex flex-col justify-center">
        <span className="font-mono text-base font-bold text-accent leading-none">
          {achievement.metric}
        </span>
        <span className="font-mono text-[9px] text-text-secondary/60 mt-0.5 uppercase tracking-wider">
          {achievement.metricSub}
        </span>
      </div>

      {/* Divider */}
      <div
        className="shrink-0 w-px self-stretch"
        style={{ backgroundColor: hovered ? "rgba(64,203,246,0.2)" : "var(--color-default-border)" }}
      />

      {/* Content */}
      <div className="flex flex-col justify-center gap-1.5 min-w-0 flex-1">
        <p className="text-xs text-text-secondary leading-relaxed">
          {achievement.description}
        </p>
        <div className="flex flex-wrap gap-1">
          {achievement.stack.map((tech) => {
            const entry = techIconMap[tech];
            const Icon = entry?.icon;
            return (
              <span
                key={tech}
                className="flex items-center gap-1 font-mono text-[9px] px-1.5 py-0.5 rounded-sm"
                style={{
                  backgroundColor: "var(--color-accent-third)",
                  color: "var(--color-text-muted)",
                  border: "1px solid var(--color-default-border)",
                }}
              >
                {Icon && <Icon size={10} style={{ color: entry.color }} />}
                {tech}
              </span>
            );
          })}
        </div>
      </div>

      {/* Click hint */}
      <div className="shrink-0 flex items-center self-center">
        <span
          className="font-mono text-[9px] transition-colors duration-150"
          style={{ color: hovered ? "var(--color-accent)" : "var(--color-text-muted)" }}
        >
          ver →
        </span>
      </div>
    </motion.div>
  );
};

const Experience = () => {
  const [activeGroup, setActiveGroup] = useState<GroupId>("all");
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);

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

        {/* Mobile header — System Panel */}
        <motion.div
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="shrink-0 md:hidden"
        >
          <div className="flex items-center justify-between px-4 pt-3 pb-2.5">
            <div className="flex items-center gap-2.5">
              <span className="font-mono text-[10px] text-accent/40 tracking-widest">§03</span>
              <span className="text-base font-bold text-text-primary tracking-tight">Experience</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="font-mono text-sm font-bold text-accent">6+</span>
              <span className="font-mono text-[10px] text-text-secondary ml-1">anos</span>
            </div>
          </div>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="h-0.5 origin-left"
            style={{ background: "linear-gradient(to right, #40cbf6, rgba(64,203,246,0.3), transparent)" }}
          />
        </motion.div>

        {/* Desktop header slim */}
        <motion.div
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          className="shrink-0 hidden md:block px-4 py-3"
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

        {/* Mobile: achievement area */}
        <div className="md:hidden flex-1 overflow-y-auto scrollbar-hide p-4 pb-24">
          <motion.div
            key={activeGroup + "-mobile"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.18 }}
            className="flex flex-col gap-2"
          >
            {visibleAchievements.map((achievement, i) => (
              <AchievementCard
                key={achievement.id}
                achievement={achievement}
                index={i}
                onClick={() => setSelectedAchievement(achievement)}
              />
            ))}
          </motion.div>
        </div>

        {/* Desktop: nav lateral + content */}
        <div className="hidden md:flex flex-1 min-h-0">
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

          <div className="flex-1 overflow-y-auto scrollbar-hide p-4">
            <motion.div
              key={activeGroup}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.18 }}
              className="flex flex-col gap-2"
            >
              {visibleAchievements.map((achievement, i) => (
                <AchievementCard
                  key={achievement.id}
                  achievement={achievement}
                  index={i}
                  onClick={() => setSelectedAchievement(achievement)}
                />
              ))}
            </motion.div>
          </div>
        </div>

      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedAchievement && (
          <DetailModal
            achievement={selectedAchievement}
            onClose={() => setSelectedAchievement(null)}
          />
        )}
      </AnimatePresence>

    </ContentLayout>
  );
};

export default Experience;
