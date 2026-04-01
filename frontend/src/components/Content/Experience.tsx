import { motion, AnimatePresence } from "motion/react";
import ContentLayout from "./Layout/ContentLayout";
import { useState } from "react";
import {
  Zap,
  Server,
  Database,
  Container,
  CreditCard,
  FileText,
  Code2,
  TrendingUp,
  GitBranch,
  TestTube,
  Cpu,
  Layers,
  Building2,
  Calendar,
  Briefcase,
  ChevronRight,
} from "lucide-react";

// Tech icons mapping (from Projects.tsx pattern)
const techIconMap: Record<string, string> = {
  "Node.js": "./icons/backend/nodejs.svg",
  TypeScript: "./icons/backend/typescript.svg",
  React: "./icons/frontend/react.svg",
  "Next.js": "./icons/frontend/nextjs.svg",
  AWS: "./icons/infrastructure/aws.svg",
  Docker: "./icons/infrastructure/docker.svg",
  PostgreSQL: "./icons/database/postgresql.svg",
  MongoDB: "./icons/database/mongodb.svg",
  Jest: "./icons/frontend/jest.svg",
};

// Grouped achievements for better organization
const achievementGroups = [
  {
    title: "Performance & Otimização",
    icon: Zap,
    achievements: [
      {
        id: "perf-1",
        text: "Rearquiteturou backend monolítico em ",
        highlight: "microserviços com DDD",
        metric: "3× mais requisições",
        subMetric: "latência 900ms → 350ms",
        icon: Layers,
        category: "architecture" as const,
      },
      {
        id: "perf-2",
        text: "Otimizou dashboard administrativo com ",
        highlight: "SQL otimizado",
        metric: "12s → ~2s",
        subMetric: "resposta de queries",
        icon: Database,
        category: "performance" as const,
      },
    ],
  },
  {
    title: "DevOps & Automação",
    icon: GitBranch,
    achievements: [
      {
        id: "devops-1",
        text: "Implementou ",
        highlight: "CI/CD com GitHub Actions",
        metric: "2h → 12min",
        subMetric: "tempo de deployment",
        icon: Server,
        category: "devops" as const,
      },
      {
        id: "devops-2",
        text: "Containerizou stack com ",
        highlight: "Docker",
        metric: "100%",
        subMetric: "consistência de ambiente",
        icon: Container,
        category: "devops" as const,
      },
      {
        id: "devops-3",
        text: "Automatizou relatórios financeiros",
        highlight: "automação completa",
        metric: "~13h economizadas",
        subMetric: "semanais",
        icon: FileText,
        category: "devops" as const,
      },
    ],
  },
  {
    title: "Sistemas & APIs",
    icon: Code2,
    achievements: [
      {
        id: "api-1",
        text: "Desenvolveu módulo de estimativa para ",
        highlight: "construção civil",
        metric: "Precisão",
        subMetric: "orçamentária otimizada",
        icon: Building2,
        category: "feature" as const,
      },
      {
        id: "api-2",
        text: "Construiu sistema ",
        highlight: "real-time com WebSockets",
        metric: "Notificações",
        subMetric: "instantâneas",
        icon: Cpu,
        category: "feature" as const,
      },
      {
        id: "api-3",
        text: "Desenhou ",
        highlight: "API de pagamentos",
        metric: "Alta concorrência",
        subMetric: "rastreabilidade financeira",
        icon: CreditCard,
        category: "architecture" as const,
      },
    ],
  },
  {
    title: "Qualidade & Testes",
    icon: TestTube,
    achievements: [
      {
        id: "test-1",
        text: "Implementou testes com Jest, alcançando ",
        highlight: "60% cobertura",
        metric: "Confiabilidade",
        subMetric: "em produção aumentada",
        icon: TrendingUp,
        category: "testing" as const,
      },
    ],
  },
];

// Category colors
const categoryColors = {
  performance: "from-yellow-500/20 to-orange-500/20",
  devops: "from-blue-500/20 to-cyan-500/20",
  architecture: "from-purple-500/20 to-pink-500/20",
  testing: "from-green-500/20 to-emerald-500/20",
  feature: "from-accent/20 to-accent-third/20",
};

const categoryBadgeColors = {
  performance: "bg-yellow-500/10 text-yellow-400 border-yellow-500/30",
  devops: "bg-blue-500/10 text-blue-400 border-blue-500/30",
  architecture: "bg-purple-500/10 text-purple-400 border-purple-500/30",
  testing: "bg-green-500/10 text-green-400 border-green-500/30",
  feature: "bg-accent/10 text-accent border-accent/30",
};

const TechIcon = ({ tech }: { tech: string }) => {
  const iconPath = techIconMap[tech];
  if (!iconPath) return null;

  return (
    <div className="w-6 h-6 p-0.5 bg-background/80 border border-default-border/50 rounded-sm flex items-center justify-center hover:border-accent/50 hover:scale-110 transition-all duration-200">
      <img
        src={iconPath}
        alt={tech}
        className="w-full h-full object-contain"
        onError={(e) => {
          (e.target as HTMLImageElement).style.display = "none";
        }}
      />
    </div>
  );
};

const MetricBadge = ({
  metric,
  subMetric,
}: {
  metric: string;
  subMetric: string;
}) => (
  <div className="inline-flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 px-2 py-1 bg-accent/10 border border-accent/30 rounded-sm">
    <span className="text-[10px] sm:text-xs font-bold text-accent">
      {metric}
    </span>
    <span className="hidden sm:block w-px h-3 bg-accent/30" />
    <span className="text-[9px] sm:text-[10px] text-accent/80">
      {subMetric}
    </span>
  </div>
);

const AchievementCard = ({
  achievement,
  index,
  groupIndex,
}: {
  achievement: (typeof achievementGroups)[0]["achievements"][0];
  index: number;
  groupIndex: number;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const Icon = achievement.icon;
  const totalIndex = groupIndex * 10 + index;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: totalIndex * 0.08 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative"
    >
      <div className="flex gap-3 sm:gap-4">
        {/* Timeline */}
        <div className="flex flex-col items-center shrink-0">
          <motion.div
            className={`w-8 h-8 sm:w-10 sm:h-10 rounded-sm border flex items-center justify-center ${categoryBadgeColors[achievement.category]}`}
            animate={{
              scale: isHovered ? 1.1 : 1,
              rotate: isHovered ? 5 : 0,
            }}
            transition={{ duration: 0.2 }}
          >
            <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
          </motion.div>
          <div className="w-px flex-1 bg-linear-to-b from-accent/40 via-accent/20 to-transparent min-h-10" />
        </div>

        {/* Content Card */}
        <div className="flex-1 pb-4">
          <motion.div
            animate={{ x: isHovered ? 4 : 0 }}
            transition={{ duration: 0.2 }}
            className="relative p-3 sm:p-4 bg-card-background border border-default-border rounded-sm overflow-hidden group-hover:border-accent/30 transition-colors duration-300"
          >
            {/* Background gradient */}
            <div
              className={`absolute inset-0 bg-linear-to-br ${categoryColors[achievement.category]} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
            />

            {/* Corner accents */}
            <motion.div
              animate={{ opacity: isHovered ? 1 : 0 }}
              className="absolute top-0 left-0 w-2 h-2 border-t border-l border-accent"
            />
            <motion.div
              animate={{ opacity: isHovered ? 1 : 0 }}
              className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-accent"
            />

            <div className="relative z-10">
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed mb-2">
                {achievement.text}
                <span className="font-semibold text-accent ml-0.5">
                  {achievement.highlight}
                </span>
              </p>

              <div className="flex flex-wrap items-center gap-2">
                <MetricBadge
                  metric={achievement.metric}
                  subMetric={achievement.subMetric}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

const ExperienceGroup = ({
  group,
  index,
}: {
  group: (typeof achievementGroups)[0];
  index: number;
}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const Icon = group.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.15 }}
      className="mb-6"
    >
      {/* Group Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-2 sm:p-3 mb-3 bg-linear-to-r from-accent/5 to-transparent border-l-2 border-accent rounded-r-sm hover:from-accent/10 transition-colors cursor-pointer"
      >
        <div className="flex items-center gap-2 sm:gap-3">
          <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-accent" />
          <h3 className="text-sm sm:text-base font-semibold text-gray-200">
            {group.title}
          </h3>
        </div>
        <motion.div
          animate={{ rotate: isExpanded ? 90 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-accent/60"
        >
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
        </motion.div>
      </button>

      {/* Achievement Cards */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="ml-1 sm:ml-2"
          >
            {group.achievements.map((achievement, idx) => (
              <AchievementCard
                key={achievement.id}
                achievement={achievement}
                index={idx}
                groupIndex={index}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const Experience = () => {
  const techStack = [
    "Node.js",
    "TypeScript",
    "React",
    "Next.js",
    "AWS",
    "Docker",
    "PostgreSQL",
    "MongoDB",
    "Jest",
  ];

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
            <div className="flex items-start gap-3 mb-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 border border-accent/30 bg-accent/10 flex items-center justify-center rounded-sm shrink-0">
                <Briefcase className="w-5 h-5 sm:w-6 sm:h-6 text-accent" />
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="text-lg sm:text-xl font-bold text-accent mb-1">
                  Senior Full Stack Engineer
                </h2>
                <div className="flex flex-wrap items-center gap-2 text-xs text-gray-400">
                  <span className="flex items-center gap-1">
                    <Building2 className="w-3 h-3" />
                    Empresa Tecnologia
                  </span>
                  <span className="hidden sm:inline">•</span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    2022 - Presente
                  </span>
                </div>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
              Responsável pela arquitetura, desenvolvimento e otimização de
              sistemas críticos, liderando iniciativas de performance e DevOps.
            </p>
          </motion.div>

          {/* Timeline - All Achievements */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="space-y-1"
          >
            {achievementGroups.map((group, index) => (
              <ExperienceGroup key={group.title} group={group} index={index} />
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
          className="shrink-0 p-3 sm:p-4 border-t border-default-border/30 bg-linear-to-t from-background to-card-background/50"
        >
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">
              Stack Principal
            </p>
            <span className="text-[10px] text-gray-500">
              {techStack.length} tecnologias
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            {techStack.map((tech) => (
              <motion.div
                key={tech}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-1.5 px-2 py-1.5 bg-background/80 border border-default-border/50 rounded-sm hover:border-accent/50 hover:bg-accent/5 transition-all cursor-pointer group"
              >
                <TechIcon tech={tech} />
                <span className="text-[10px] sm:text-xs text-gray-300 group-hover:text-accent transition-colors">
                  {tech}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </ContentLayout>
  );
};

export default Experience;
