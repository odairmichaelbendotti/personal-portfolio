import { useState, useMemo } from "react";
import ContentLayout from "./Layout/ContentLayout";
import { motion, AnimatePresence } from "framer-motion"; // Corrigido importação do motion
import {
  ExternalLink,
  Folder,
  Code2,
  Layers,
  Cpu,
  Sparkles,
} from "lucide-react";

// GitHub Icon Component (SVG inline)
const GitHubIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

type ProjectCategory = "All" | "Full Stack" | "Frontend" | "Backend";

interface Project {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  category: ProjectCategory;
  tech: string[];
  github?: string;
  demo?: string;
  color: string;
  gradient: string;
  featured: boolean;
  year: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "Plataforma completa de e-commerce com painel admin",
    longDescription:
      "Sistema completo de e-commerce com catálogo de produtos, carrinho de compras, checkout integrado com Stripe, painel administrativo para gestão de pedidos e produtos, notificações em tempo real via WebSocket.",
    category: "Full Stack",
    tech: ["Next.js", "Node.js", "PostgreSQL", "Redis"],
    github: "https://github.com",
    demo: "https://demo.com",
    color: "from-slate-600/20 to-slate-800/20",
    gradient: "from-slate-500 to-slate-700",
    featured: true,
    year: "2024",
  },
  {
    id: 2,
    title: "API Gateway",
    description: "Gateway de APIs com rate limiting e cache",
    longDescription:
      "Sistema de gateway para gerenciamento de microsserviços com rate limiting, cache distribuído, autenticação OAuth2, logging centralizado, health checks e balanceamento de carga.",
    category: "Backend",
    tech: ["Node.js", "Fastify", "Redis", "Docker"],
    github: "https://github.com",
    color: "from-zinc-600/20 to-zinc-800/20",
    gradient: "from-zinc-500 to-zinc-700",
    featured: false,
    year: "2024",
  },
  {
    id: 3,
    title: "Task Management",
    description: "Gerenciamento de tarefas com colaboração em tempo real",
    longDescription:
      "Aplicação de gerenciamento de projetos estilo Trello com drag-and-drop, colaboração em tempo real usando WebSocket, comentários, anexos, notificações e relatórios de produtividade.",
    category: "Full Stack",
    tech: ["React", "Express", "MongoDB", "Socket.io"],
    github: "https://github.com",
    demo: "https://demo.com",
    color: "from-gray-600/20 to-gray-800/20",
    gradient: "from-gray-500 to-gray-700",
    featured: true,
    year: "2024",
  },
  {
    id: 4,
    title: "Data Dashboard",
    description: "Dashboard analítico com visualização de dados complexos",
    longDescription:
      "Dashboard interativo para visualização de métricas de negócio com gráficos dinâmicos, filtros avançados, exportação de relatórios, integração com APIs externas e autenticação JWT.",
    category: "Frontend",
    tech: ["React", "TypeScript", "Tailwind", "Vite"],
    github: "https://github.com",
    demo: "https://demo.com",
    color: "from-slate-700/20 to-slate-900/20",
    gradient: "from-slate-600 to-slate-800",
    featured: false,
    year: "2023",
  },
  {
    id: 5,
    title: "Social Network",
    description: "Rede social com feed em tempo real e stories",
    longDescription:
      "Aplicação de rede social completa com feed de posts, sistema de stories, chat em tempo real, notificações push, algoritmo de feed personalizado e sistema de seguidores.",
    category: "Full Stack",
    tech: ["Next.js", "Prisma", "PostgreSQL", "WebSocket"],
    github: "https://github.com",
    demo: "https://demo.com",
    color: "from-stone-600/20 to-stone-800/20",
    gradient: "from-stone-500 to-stone-700",
    featured: true,
    year: "2024",
  },
  {
    id: 6,
    title: "Mobile Banking",
    description: "App bancário com biometria e PIX",
    longDescription:
      "Aplicativo mobile de serviços bancários com autenticação biométrica, integração PIX, extrato em tempo real, transferências, pagamento de boletos e cartão virtual.",
    category: "Frontend",
    tech: ["React Native", "Node.js", "PostgreSQL", "AWS"],
    github: "https://github.com",
    color: "from-neutral-600/20 to-neutral-800/20",
    gradient: "from-neutral-500 to-neutral-700",
    featured: false,
    year: "2023",
  },
  {
    id: 7,
    title: "CMS Headless",
    description: "CMS com edição visual e multi-tenant",
    longDescription:
      "Sistema de gerenciamento de conteúdo headless com editor visual drag-and-drop, suporte multi-tenant, versionamento de conteúdo, webhooks e API GraphQL/REST.",
    category: "Full Stack",
    tech: ["Next.js", "PostgreSQL", "Redis", "Kubernetes"],
    github: "https://github.com",
    demo: "https://demo.com",
    color: "from-slate-500/20 to-slate-700/20",
    gradient: "from-slate-400 to-slate-600",
    featured: false,
    year: "2024",
  },
];

const categories: ProjectCategory[] = [
  "All",
  "Full Stack",
  "Frontend",
  "Backend",
];

const categoryIcons = {
  All: Layers,
  "Full Stack": Code2,
  Frontend: Sparkles,
  Backend: Cpu,
};

// Mapeamento de tecnologias para ícones
const techIconMap: Record<string, string> = {
  "Next.js": "./icons/frontend/nextjs.svg",
  React: "./icons/frontend/react.svg",
  "React Native": "./icons/frontend/react.svg",
  TypeScript: "./icons/backend/typescript.svg",
  Tailwind: "./icons/frontend/tailwindcss.svg",
  Vite: "./icons/frontend/vite.svg",
  "Node.js": "./icons/backend/nodejs.svg",
  Express: "./icons/backend/express.svg",
  Fastify: "./icons/backend/fastify.svg",
  Prisma: "./icons/backend/prisma.svg",
  MongoDB: "./icons/database/mongodb.svg",
  PostgreSQL: "./icons/database/postgresql.svg",
  Redis: "./icons/database/redis.svg",
  Docker: "./icons/infrastructure/docker.svg",
  AWS: "./icons/infrastructure/aws.svg",
  Kubernetes: "./icons/infrastructure/kubernetes.svg",
  "Socket.io": "./icons/backend/nodejs.svg",
  WebSocket: "./icons/backend/nodejs.svg",
};

const TechIcon = ({ tech }: { tech: string }) => {
  const iconPath = techIconMap[tech];
  if (!iconPath) return null;

  return (
    <div className="w-5 h-5 p-0.5 bg-background/80 border border-default-border/50 rounded-sm flex items-center justify-center hover:border-accent/30 transition-colors">
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

// Card lateral para o segundo projeto
const SideProjectCard = ({
  project,
  onSelect,
}: {
  project: Project;
  onSelect: (p: Project) => void;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onSelect(project)}
      className="group relative cursor-pointer overflow-hidden rounded-sm border border-default-border bg-card-background h-full"
    >
      {/* Background */}
      <div
        className={`absolute inset-0 bg-linear-to-br ${project.color} opacity-40 transition-opacity duration-500 group-hover:opacity-70`}
      />

      {/* Corner accents */}
      <motion.div
        animate={{ opacity: isHovered ? 1 : 0.2 }}
        className="absolute top-0 left-0 w-3 h-3 border-t border-l border-accent"
      />
      <motion.div
        animate={{ opacity: isHovered ? 1 : 0.2 }}
        className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-accent"
      />

      {/* Content */}
      <div className="relative z-10 p-5 flex flex-col h-full justify-between">
        <div>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono text-gray-500">
                {project.year}
              </span>
              <span className="px-2 py-0.5 text-[10px] bg-accent/10 text-accent border border-accent/30 rounded-sm">
                {project.category}
              </span>
            </div>
            <motion.div
              animate={{ rotate: isHovered ? 45 : 0 }}
              transition={{ duration: 0.3 }}
              className="text-accent/60"
            >
              <ExternalLink className="w-4 h-4" />
            </motion.div>
          </div>

          <h3 className="text-base font-semibold text-gray-200 mb-2 group-hover:text-accent transition-colors line-clamp-1">
            {project.title}
          </h3>

          <p className="text-sm text-text-secondary line-clamp-3 mb-4">
            {project.description}
          </p>
        </div>

        {/* Tech icons - TODOS OS PROJETOS */}
        <div className="flex items-center gap-2">
          <p className="text-[10px] text-gray-500 uppercase">Tech:</p>
          <div className="flex -space-x-1">
            {project.tech.slice(0, 4).map((t, i) => (
              <div key={t} className="relative" style={{ zIndex: 4 - i }}>
                <TechIcon tech={t} />
              </div>
            ))}
          </div>
          {project.tech.length > 4 && (
            <span className="text-[10px] text-gray-500 ml-1">
              +{project.tech.length - 4}
            </span>
          )}
        </div>

        {/* Links */}
        <div className="flex items-center gap-3 mt-4 pt-3 border-t border-default-border/30">
          {project.github && (
            <motion.a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-1 text-xs text-gray-400 hover:text-accent transition-colors"
            >
              <GitHubIcon className="w-3.5 h-3.5" />
              <span>Code</span>
            </motion.a>
          )}
          {project.demo && (
            <motion.a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-1 text-xs text-gray-400 hover:text-accent transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Demo</span>
            </motion.a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

// Card principal maior (primeiro projeto)
const FeaturedProjectCard = ({
  project,
  onSelect,
}: {
  project: Project;
  onSelect: (p: Project) => void;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onSelect(project)}
      className="group relative cursor-pointer overflow-hidden rounded-sm border border-default-border bg-card-background"
    >
      {/* Background gradient - sem hover branco */}
      <div
        className={`absolute inset-0 bg-linear-to-br ${project.color} opacity-40`}
      />

      {/* Animated border glow removido - estava causando efeito branco */}

      {/* Corner accents - igual aos outros cards */}
      <motion.div
        animate={{ opacity: isHovered ? 1 : 0.2 }}
        className="absolute top-0 left-0 w-3 h-3 border-t border-l border-accent"
      />
      <motion.div
        animate={{ opacity: isHovered ? 1 : 0.2 }}
        className="absolute top-0 right-0 w-3 h-3 border-t border-r border-accent"
      />
      <motion.div
        animate={{ opacity: isHovered ? 1 : 0.2 }}
        className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-accent"
      />
      <motion.div
        animate={{ opacity: isHovered ? 1 : 0.2 }}
        className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-accent"
      />

      {/* Content */}
      <div className="relative z-10 p-5 sm:p-6 flex flex-col h-full min-h-60">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono text-gray-400">
              {project.year}
            </span>
            <span className="px-2 py-0.5 text-[10px] bg-accent/20 text-accent border border-accent/50 rounded-sm">
              ★ Featured
            </span>
          </div>
          <motion.div
            animate={{ rotate: isHovered ? 45 : 0 }}
            transition={{ duration: 0.3 }}
            className="text-accent/60"
          >
            <ExternalLink className="w-4 h-4" />
          </motion.div>
        </div>

        {/* Title */}
        <h3 className="text-lg sm:text-xl font-bold text-gray-100 mb-2 group-hover:text-accent transition-colors duration-300">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-text-secondary mb-4 line-clamp-2 flex-1">
          {project.description}
        </p>

        {/* Tech stack com ícones - TODOS OS PROJETOS */}
        <div className="mb-4">
          <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-2">
            Technologies
          </p>
          <div className="flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <TechIcon key={t} tech={t} />
            ))}
          </div>
        </div>

        {/* Links */}
        <div className="flex items-center gap-3 mt-auto pt-3 border-t border-default-border/50">
          {project.github && (
            <motion.a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-accent transition-colors"
            >
              <GitHubIcon className="w-3.5 h-3.5" />
              <span>Code</span>
            </motion.a>
          )}
          {project.demo && (
            <motion.a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-accent transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Demo</span>
            </motion.a>
          )}
        </div>
      </div>

      {/* Hover overlay removido - estava causando efeito branco */}
    </motion.div>
  );
};

// Card compacto para filtros de categoria
const CompactProjectCard = ({
  project,
  index,
  onSelect,
}: {
  project: Project;
  index: number;
  onSelect: (p: Project) => void;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onSelect(project)}
      className="group relative cursor-pointer overflow-hidden rounded-sm border border-default-border bg-card-background"
    >
      {/* Background */}
      <div
        className={`absolute inset-0 bg-linear-to-br ${project.color} opacity-30 transition-opacity duration-500 group-hover:opacity-60`}
      />

      {/* Corner accents */}
      <motion.div
        animate={{ opacity: isHovered ? 1 : 0.1 }}
        className="absolute top-0 left-0 w-2 h-2 border-t border-l border-accent"
      />
      <motion.div
        animate={{ opacity: isHovered ? 1 : 0.1 }}
        className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-accent"
      />

      {/* Content */}
      <div className="relative z-10 p-3 flex flex-col h-full min-h-30">
        {/* Header */}
        <div className="flex items-start justify-between mb-2">
          <span className="text-[10px] font-mono text-gray-500">
            {project.year}
          </span>
          <motion.div
            animate={{ rotate: isHovered ? 45 : 0 }}
            transition={{ duration: 0.3 }}
            className="text-accent/40"
          >
            <ExternalLink className="w-3 h-3" />
          </motion.div>
        </div>

        {/* Title */}
        <h3 className="text-sm font-medium text-gray-200 mb-1 group-hover:text-accent transition-colors line-clamp-1">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-xs text-text-secondary line-clamp-2 flex-1 mb-2">
          {project.description}
        </p>

        {/* Tech icons - TODOS OS CARDS COMPACTOS */}
        <div className="flex items-center gap-1.5 mt-auto">
          <div className="flex -space-x-1">
            {project.tech.slice(0, 3).map((t, i) => (
              <div key={t} className="relative" style={{ zIndex: 3 - i }}>
                <TechIcon tech={t} />
              </div>
            ))}
          </div>
          {project.tech.length > 3 && (
            <span className="text-[9px] text-gray-500 ml-1">
              +{project.tech.length - 3}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

// Card padrão para os demais projetos (All view)
const ProjectCard = ({
  project,
  index,
  onSelect,
}: {
  project: Project;
  index: number;
  onSelect: (p: Project) => void;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onSelect(project)}
      className="group relative cursor-pointer overflow-hidden rounded-sm border border-default-border bg-card-background"
    >
      {/* Background */}
      <div
        className={`absolute inset-0 bg-linear-to-br ${project.color} opacity-40 transition-opacity duration-500 group-hover:opacity-70`}
      />

      {/* Corner accents */}
      <motion.div
        animate={{ opacity: isHovered ? 1 : 0.2 }}
        className="absolute top-0 left-0 w-3 h-3 border-t border-l border-accent"
      />
      <motion.div
        animate={{ opacity: isHovered ? 1 : 0.2 }}
        className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-accent"
      />

      {/* Content */}
      <div className="relative z-10 p-4 flex flex-col h-full min-h-40">
        {/* Header */}
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono text-gray-500">
              {project.year}
            </span>
            {project.featured && (
              <span className="px-1 py-0.5 text-[9px] bg-accent/20 text-accent border border-accent/50 rounded-sm">
                ★
              </span>
            )}
          </div>
          <motion.div
            animate={{ rotate: isHovered ? 45 : 0 }}
            transition={{ duration: 0.3 }}
            className="text-accent/60"
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </motion.div>
        </div>

        {/* Title */}
        <h3 className="text-base font-medium text-gray-200 mb-1 group-hover:text-accent transition-colors line-clamp-1">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-xs text-text-secondary line-clamp-2 flex-1">
          {project.description}
        </p>

        {/* Tech icons - TODOS OS CARDS */}
        <div className="flex items-center gap-1.5 mt-3 mb-2">
          <div className="flex -space-x-1">
            {project.tech.slice(0, 3).map((t, i) => (
              <div key={t} className="relative" style={{ zIndex: 3 - i }}>
                <TechIcon tech={t} />
              </div>
            ))}
          </div>
          {project.tech.length > 3 && (
            <span className="text-[10px] text-gray-500 ml-1">
              +{project.tech.length - 3}
            </span>
          )}
        </div>

        {/* Category */}
        <div className="mt-auto pt-2">
          <span className="text-[10px] text-gray-500">{project.category}</span>
        </div>
      </div>
    </motion.div>
  );
};

const ProjectModal = ({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-card-background border border-default-border rounded-sm"
        >
          {/* Header gradient */}
          <div
            className={`h-24 sm:h-32 bg-linear-to-r ${project.gradient} relative`}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-black/50 text-white rounded-sm hover:bg-black/70 transition-colors"
            >
              ✕
            </button>
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-linear-to-t from-card-background to-transparent" />
          </div>

          {/* Content */}
          <div className="p-5 sm:p-6 -mt-8 relative">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-100 mb-1">
                  {project.title}
                </h2>
                <p className="text-sm text-gray-400">
                  {project.category} • {project.year}
                </p>
              </div>
              <div className="flex gap-2">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-2 text-sm bg-accent/10 text-accent border border-accent/30 rounded-sm hover:bg-accent/20 transition-colors"
                  >
                    <GitHubIcon className="w-4 h-4" />
                    <span className="hidden sm:inline">Github</span>
                  </a>
                )}
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-2 text-sm bg-accent text-background font-medium rounded-sm hover:bg-accent/80 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span className="hidden sm:inline">Demo</span>
                  </a>
                )}
              </div>
            </div>

            <p className="text-sm sm:text-base text-gray-300 leading-relaxed mb-6">
              {project.longDescription}
            </p>

            <div>
              <h4 className="text-sm font-semibold text-accent mb-3 uppercase tracking-wider">
                Technologies
              </h4>
              <div className="flex flex-wrap gap-3">
                {project.tech.map((t) => (
                  <div
                    key={t}
                    className="flex items-center gap-2 px-3 py-2 bg-background border border-default-border rounded-sm"
                  >
                    <TechIcon tech={t} />
                    <span className="text-sm text-gray-300">{t}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = useMemo(() => {
    if (activeCategory === "All") {
      return projects;
    }
    return projects.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  // Separa o primeiro projeto e o segundo (para o card lateral)
  const mainProject = filteredProjects[0];
  const sideProject = filteredProjects[1];
  const otherProjects = filteredProjects.slice(2);

  // Verifica se está filtrado por categoria (não "All")
  const isFiltered = activeCategory !== "All";

  return (
    <ContentLayout>
      <div className="h-full w-full flex flex-col bg-background overflow-hidden">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 sm:p-5 border-b border-default-border bg-linear-to-r from-background via-background to-accent-third/5"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 border border-accent/30 bg-accent/10 flex items-center justify-center rounded-sm">
              <Folder className="w-5 h-5 sm:w-6 sm:h-6 text-accent" />
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-accent">
                Projects
              </h1>
              <p className="text-xs sm:text-sm text-text-secondary">
                {filteredProjects.length} projects • {categories.length - 1}{" "}
                categories
              </p>
            </div>
          </div>

          {/* Category filters */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => {
              const Icon = categoryIcons[cat];
              const isActive = activeCategory === cat;
              return (
                <motion.button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm rounded-sm border transition-all duration-300 ${
                    isActive
                      ? "bg-accent text-background border-accent font-medium"
                      : "bg-background text-gray-400 border-default-border hover:border-accent/50 hover:text-accent"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{cat}</span>
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Projects Grid */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5">
          {filteredProjects.length > 0 ? (
            <div className="flex flex-col gap-4">
              {/* Row 1: Featured Project + Side Project (apenas na view All) */}
              {!isFiltered && mainProject && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  <div className="lg:col-span-2">
                    <FeaturedProjectCard
                      project={mainProject}
                      onSelect={setSelectedProject}
                    />
                  </div>
                  {sideProject && (
                    <div className="lg:col-span-1">
                      <SideProjectCard
                        project={sideProject}
                        onSelect={setSelectedProject}
                      />
                    </div>
                  )}
                </div>
              )}

              {/* Grid de projetos restantes (apenas quando não filtrado) */}
              {!isFiltered && otherProjects.length > 0 && (
                <motion.div
                  layout
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
                >
                  <AnimatePresence mode="popLayout">
                    {otherProjects.map((project, index) => (
                      <ProjectCard
                        key={project.id}
                        project={project}
                        index={index}
                        onSelect={setSelectedProject}
                      />
                    ))}
                  </AnimatePresence>
                </motion.div>
              )}

              {/* Quando filtrado, mostra todos em grid compacto */}
              {isFiltered && (
                <motion.div
                  layout
                  className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
                >
                  <AnimatePresence mode="popLayout">
                    {filteredProjects.map((project, index) => (
                      <CompactProjectCard
                        key={project.id}
                        project={project}
                        index={index}
                        onSelect={setSelectedProject}
                      />
                    ))}
                  </AnimatePresence>
                </motion.div>
              )}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center h-64 text-gray-500"
            >
              <Folder className="w-12 h-12 mb-3 opacity-50" />
              <p>No projects found in this category</p>
            </motion.div>
          )}
        </div>

        {/* Stats footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="px-4 sm:px-5 py-3 border-t border-default-border bg-linear-to-r from-accent-third/10 to-background"
        >
          <div className="flex items-center justify-between text-xs text-gray-400">
            <span>
              Showing {filteredProjects.length} of {projects.length} projects
            </span>
            <span className="hidden sm:inline">
              {projects.filter((p) => p.featured).length} featured
            </span>
          </div>
        </motion.div>
      </div>

      {/* Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </ContentLayout>
  );
};

export default Projects;
