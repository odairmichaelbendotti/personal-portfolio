import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ExternalLink, Layers, Code2, Sparkles, Cpu } from "lucide-react";
import {
  SiNextdotjs, SiReact, SiTypescript, SiTailwindcss, SiVite,
  SiNodedotjs, SiExpress, SiFastify, SiPrisma,
  SiMongodb, SiPostgresql, SiRedis,
  SiDocker, SiKubernetes, SiSocketdotio, SiGraphql,
} from "react-icons/si";
import { FaAws } from "react-icons/fa";
import ContentLayout from "./Layout/ContentLayout";

const GitHubIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

type ProjectCategory = "All" | "Full Stack" | "Frontend" | "Backend";

interface Project {
  id: number;
  num: string;
  title: string;
  description: string;
  longDescription: string;
  category: ProjectCategory;
  tech: string[];
  github?: string;
  demo?: string;
  image?: string;
  featured: boolean;
  year: string;
  color: string;
}

const projects: Project[] = [
  {
    id: 1, num: "01",
    title: "E-Commerce Platform",
    description: "Plataforma completa de e-commerce com painel admin",
    longDescription: "Sistema completo de e-commerce com catálogo de produtos, carrinho de compras, checkout integrado com Stripe, painel administrativo para gestão de pedidos e produtos, notificações em tempo real via WebSocket.",
    category: "Full Stack",
    tech: ["Next.js", "Node.js", "PostgreSQL", "Redis"],
    github: "https://github.com/obendotti/ecommerce-platform",
    demo: "https://ecommerce.obendotti.dev",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80",
    featured: true,
    year: "2024",
    color: "#40cbf6",
  },
  {
    id: 2, num: "02",
    title: "API Gateway",
    description: "Gateway de APIs com rate limiting e cache",
    longDescription: "Sistema de gateway para gerenciamento de microsserviços com rate limiting, cache distribuído, autenticação OAuth2, logging centralizado, health checks e balanceamento de carga.",
    category: "Backend",
    tech: ["Node.js", "Fastify", "Redis", "Docker"],
    github: "https://github.com/obendotti/api-gateway",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80",
    featured: false,
    year: "2024",
    color: "#a78bfa",
  },
  {
    id: 3, num: "03",
    title: "Task Management",
    description: "Gerenciamento de tarefas com colaboração em tempo real",
    longDescription: "Aplicação de gerenciamento de projetos estilo Trello com drag-and-drop, colaboração em tempo real usando WebSocket, comentários, anexos, notificações e relatórios de produtividade.",
    category: "Full Stack",
    tech: ["React", "Express", "MongoDB", "Socket.io"],
    github: "https://github.com/obendotti/task-management",
    demo: "https://tasks.obendotti.dev",
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&q=80",
    featured: true,
    year: "2024",
    color: "#34d399",
  },
  {
    id: 4, num: "04",
    title: "Data Dashboard",
    description: "Dashboard analítico com visualização de dados complexos",
    longDescription: "Dashboard interativo para visualização de métricas de negócio com gráficos dinâmicos, filtros avançados, exportação de relatórios, integração com APIs externas e autenticação JWT.",
    category: "Frontend",
    tech: ["React", "TypeScript", "Tailwind", "Vite"],
    github: "https://github.com/obendotti/data-dashboard",
    demo: "https://dashboard.obendotti.dev",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    featured: false,
    year: "2023",
    color: "#f59e0b",
  },
  {
    id: 5, num: "05",
    title: "Social Network",
    description: "Rede social com feed em tempo real e stories",
    longDescription: "Aplicação de rede social completa com feed de posts, sistema de stories, chat em tempo real, notificações push, algoritmo de feed personalizado e sistema de seguidores.",
    category: "Full Stack",
    tech: ["Next.js", "Prisma", "PostgreSQL", "WebSocket"],
    github: "https://github.com/obendotti/social-network",
    demo: "https://social.obendotti.dev",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80",
    featured: true,
    year: "2024",
    color: "#f472b6",
  },
  {
    id: 6, num: "06",
    title: "Mobile Banking",
    description: "App bancário com biometria e PIX",
    longDescription: "Aplicativo mobile de serviços bancários com autenticação biométrica, integração PIX, extrato em tempo real, transferências, pagamento de boletos e cartão virtual.",
    category: "Frontend",
    tech: ["React Native", "Node.js", "PostgreSQL", "AWS"],
    github: "https://github.com/obendotti/mobile-banking",
    demo: "https://banking.obendotti.dev",
    image: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=800&q=80",
    featured: false,
    year: "2023",
    color: "#60a5fa",
  },
  {
    id: 7, num: "07",
    title: "CMS Headless",
    description: "CMS com edição visual e multi-tenant",
    longDescription: "Sistema de gerenciamento de conteúdo headless com editor visual drag-and-drop, suporte multi-tenant, versionamento de conteúdo, webhooks e API GraphQL/REST.",
    category: "Full Stack",
    tech: ["Next.js", "PostgreSQL", "Redis", "Kubernetes"],
    github: "https://github.com/obendotti/cms-headless",
    demo: "https://cms.obendotti.dev",
    image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&q=80",
    featured: false,
    year: "2024",
    color: "#fb923c",
  },
];

const techIconMap: Record<string, { icon: React.ElementType; color: string }> = {
  "Next.js":      { icon: SiNextdotjs,    color: "#ffffff" },
  "React":        { icon: SiReact,        color: "#61DAFB" },
  "React Native": { icon: SiReact,        color: "#61DAFB" },
  "TypeScript":   { icon: SiTypescript,   color: "#3178C6" },
  "Tailwind":     { icon: SiTailwindcss,  color: "#06B6D4" },
  "Vite":         { icon: SiVite,         color: "#646CFF" },
  "Node.js":      { icon: SiNodedotjs,    color: "#339933" },
  "Express":      { icon: SiExpress,      color: "#ffffff" },
  "Fastify":      { icon: SiFastify,      color: "#ffffff" },
  "Prisma":       { icon: SiPrisma,       color: "#2D3748" },
  "MongoDB":      { icon: SiMongodb,      color: "#47A248" },
  "PostgreSQL":   { icon: SiPostgresql,   color: "#4169E1" },
  "Redis":        { icon: SiRedis,        color: "#FF4438" },
  "Docker":       { icon: SiDocker,       color: "#2496ED" },
  "AWS":          { icon: FaAws,          color: "#FF9900" },
  "Kubernetes":   { icon: SiKubernetes,   color: "#326CE5" },
  "Socket.io":    { icon: SiSocketdotio,  color: "#ffffff" },
  "WebSocket":    { icon: SiSocketdotio,  color: "#ffffff" },
  "GraphQL":      { icon: SiGraphql,      color: "#E10098" },
};

const categories: ProjectCategory[] = ["All", "Full Stack", "Frontend", "Backend"];

const tabIcons: Record<ProjectCategory, React.ElementType> = {
  All: Layers,
  "Full Stack": Code2,
  Frontend: Sparkles,
  Backend: Cpu,
};

const categoryChipColors: Record<string, string> = {
  "Full Stack": "bg-accent/10 text-accent border-accent/20",
  Frontend: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
  Backend: "bg-blue-500/10 text-blue-400 border-blue-500/20",
};

const ProjectDetail = ({ project }: { project: Project }) => (
  <motion.div
    key={project.id}
    initial={{ opacity: 0, x: 8 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.2 }}
    className="p-5"
  >
    {project.image && (
      <div className="w-full h-36 mb-4 rounded-sm overflow-hidden border border-default-border/40">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover opacity-80"
        />
      </div>
    )}

    <div className="h-0.5 w-12 mb-4 rounded-full" style={{ backgroundColor: project.color }} />

    <h2 className="text-xl font-bold text-text-primary mb-1">{project.title}</h2>

    <div className="flex items-center flex-wrap gap-2 mb-4 text-xs">
      <span className={`font-mono text-[9px] px-2 py-0.5 border rounded-sm ${categoryChipColors[project.category]}`}>
        {project.category}
      </span>
      <span className="font-mono text-[10px] text-text-secondary">{project.year}</span>
      <span className="text-text-secondary">·</span>
      {project.github && (
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-text-secondary hover:text-accent transition-colors"
        >
          <GitHubIcon className="w-3.5 h-3.5" />
          <span>Code</span>
        </a>
      )}
      {project.demo && (
        <a
          href={project.demo}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-text-secondary hover:text-accent transition-colors"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          <span>Demo</span>
        </a>
      )}
    </div>

    <div className="h-px bg-default-border/30 mb-4" />

    <p className="text-xs text-text-muted leading-relaxed mb-5">{project.longDescription}</p>

    <p className="font-mono text-[9px] text-accent/40 uppercase tracking-widest mb-2">stack</p>
    <div className="flex flex-wrap gap-2">
      {project.tech.map((t) => {
        const entry = techIconMap[t];
        if (!entry) return null;
        const Icon = entry.icon;
        return (
          <div
            key={t}
            className="flex items-center gap-1.5 px-2 py-1.5 border border-default-border/50 bg-background/50 rounded-sm hover:border-accent/30 transition-colors group"
          >
            <Icon size={13} style={{ color: entry.color }} />
            <span className="font-mono text-[10px] text-text-muted group-hover:text-text-code transition-colors">{t}</span>
          </div>
        );
      })}
    </div>
  </motion.div>
);

const MobileCard = ({ project, index }: { project: Project; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.2, delay: index * 0.05 }}
    className="rounded-sm overflow-hidden"
    style={{ border: "1px solid var(--color-default-border)", backgroundColor: "var(--color-background)" }}
  >
    {project.image && (
      <div className="relative w-full h-32 overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
          style={{ opacity: 0.75 }}
        />
        {/* Gradient overlay bottom */}
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to bottom, transparent 40%, var(--color-background) 100%)" }}
        />
        {/* Featured badge */}
        {project.featured && (
          <div
            className="absolute top-2 right-2 font-mono text-[9px] px-2 py-0.5 rounded-sm"
            style={{ backgroundColor: "var(--color-accent-third)", color: "var(--color-accent)", border: "1px solid var(--color-default-border)" }}
          >
            ★ destaque
          </div>
        )}
        {/* num */}
        <span
          className="absolute bottom-2 left-3 font-mono text-[10px]"
          style={{ color: project.color }}
        >
          {project.num}
        </span>
      </div>
    )}

    <div className="px-3 pt-2 pb-3">
      {/* Color bar */}
      <div className="h-0.5 w-8 mb-2 rounded-full" style={{ backgroundColor: project.color }} />

      <div className="flex items-start justify-between gap-2 mb-1.5">
        <p className="text-sm font-semibold text-text-primary leading-tight">{project.title}</p>
        <div className="flex items-center gap-1.5 shrink-0 mt-0.5">
          {project.github && (
            <a href={project.github} target="_blank" rel="noopener noreferrer">
              <ExternalLink size={12} style={{ color: "var(--color-text-muted)" }} />
            </a>
          )}
          {project.demo && (
            <a href={project.demo} target="_blank" rel="noopener noreferrer">
              <ExternalLink size={12} style={{ color: "var(--color-accent)" }} />
            </a>
          )}
        </div>
      </div>

      <p className="text-xs text-text-muted leading-relaxed line-clamp-2 mb-3">{project.description}</p>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          {project.tech.slice(0, 4).map((t) => {
            const entry = techIconMap[t];
            if (!entry) return null;
            const Icon = entry.icon;
            return <Icon key={t} size={13} style={{ color: entry.color }} />;
          })}
          {project.tech.length > 4 && (
            <span className="font-mono text-[9px] text-text-muted">+{project.tech.length - 4}</span>
          )}
        </div>
        <span className="font-mono text-[9px] text-text-muted">{project.year}</span>
      </div>
    </div>
  </motion.div>
);

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>("All");
  const [selectedId, setSelectedId] = useState<number>(1);

  const filteredProjects =
    activeCategory === "All" ? projects : projects.filter((p) => p.category === activeCategory);

  useEffect(() => {
    if (filteredProjects.length > 0) {
      setSelectedId(filteredProjects[0].id);
    }
  }, [activeCategory]);

  const selectedProject = projects.find((p) => p.id === selectedId) ?? projects[0];

  return (
    <ContentLayout>
      <div className="h-full w-full flex flex-col overflow-hidden bg-content-bg">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          className="shrink-0 px-4 pt-3 pb-0"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-accent">Projetos</span>
              <span className="text-text-secondary text-[10px]">·</span>
              <span className="text-xs text-text-primary/40">Odair Michael Bendotti</span>
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
              <span className="font-mono font-bold text-accent text-xs">7</span>
              <span className="text-[10px] text-text-secondary">projetos</span>
            </div>
          </div>

          {/* Filter tabs */}
          <div className="flex items-center border-b border-default-border/40">
            {categories.map((cat) => {
              const Icon = tabIcons[cat];
              const isActive = activeCategory === cat;
              const count = cat === "All" ? projects.length : projects.filter((p) => p.category === cat).length;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className="px-4 py-2.5 text-xs cursor-pointer flex items-center gap-2 border-b-2 transition-colors duration-150"
                  style={{
                    borderBottomColor: isActive ? "var(--color-accent)" : "transparent",
                    color: isActive ? "var(--color-accent)" : "var(--color-text-secondary)",
                  }}
                  onMouseEnter={(e) => { if (!isActive) (e.currentTarget as HTMLButtonElement).style.color = "var(--color-text-primary)"; }}
                  onMouseLeave={(e) => { if (!isActive) (e.currentTarget as HTMLButtonElement).style.color = "var(--color-text-secondary)"; }}
                >
                  <Icon size={13} />
                  <span>{cat}</span>
                  <span className="font-mono text-[10px] text-accent/50">{count}</span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Body — desktop split / mobile list */}
        <div className="flex flex-1 min-h-0">

          {/* Project list — desktop */}
          <motion.div
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            className="hidden md:flex shrink-0 w-52 border-r border-default-border/40 flex-col py-2 overflow-y-auto scrollbar-hide"
          >
            <AnimatePresence>
              {filteredProjects.map((project, index) => {
                const isActive = selectedId === project.id;
                return (
                  <motion.button
                    key={project.id}
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -6 }}
                    transition={{ duration: 0.2, delay: index * 0.04 }}
                    onClick={() => setSelectedId(project.id)}
                    className="flex flex-col py-2 px-4 cursor-pointer border-l-2 transition-colors duration-150 -ml-px text-left"
                    style={{
                      borderLeftColor: isActive ? project.color : "transparent",
                      backgroundColor: isActive ? project.color + "0d" : "transparent",
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        const title = (e.currentTarget as HTMLElement).querySelector(".item-title") as HTMLElement;
                        if (title) title.style.color = "var(--color-text-primary)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        const title = (e.currentTarget as HTMLElement).querySelector(".item-title") as HTMLElement;
                        if (title) title.style.color = "var(--color-text-secondary)";
                      }
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className="font-mono text-[10px]"
                        style={{ color: isActive ? project.color : "var(--color-text-muted)" }}
                      >
                        {project.num}
                      </span>
                      <span
                        className="text-[8px]"
                        style={{ color: project.color, visibility: project.featured ? "visible" : "hidden" }}
                      >
                        ●
                      </span>
                      <span
                        className="item-title text-xs font-medium transition-colors duration-150"
                        style={{ color: isActive ? "var(--color-accent)" : "var(--color-text-secondary)" }}
                      >
                        {project.title}
                      </span>
                    </div>
                    <div className="font-mono text-[9px] text-text-muted ml-8">
                      {project.category} · {project.year}
                    </div>
                  </motion.button>
                );
              })}
            </AnimatePresence>
          </motion.div>

          {/* Project detail — desktop */}
          <div className="hidden md:block flex-1 overflow-y-auto scrollbar-hide">
            <ProjectDetail project={selectedProject} />
          </div>

          {/* Mobile list */}
          <div className="md:hidden flex-1 overflow-y-auto scrollbar-hide pb-24">
            {/* Mobile category filters */}
            <div className="flex overflow-x-auto scrollbar-hide border-b border-default-border/40 px-4 gap-1">
              {categories.map((cat) => {
                const Icon = tabIcons[cat];
                const isActive = activeCategory === cat;
                const count = cat === "All" ? projects.length : projects.filter((p) => p.category === cat).length;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className="relative flex items-center gap-1.5 px-3 py-2.5 text-xs cursor-pointer shrink-0 border-b-2 transition-colors duration-150"
                    style={{
                      borderBottomColor: isActive ? "var(--color-accent)" : "transparent",
                      color: isActive ? "var(--color-accent)" : "var(--color-text-secondary)",
                    }}
                  >
                    <Icon size={12} />
                    <span>{cat}</span>
                    <span className="font-mono text-[10px] opacity-50">{count}</span>
                  </button>
                );
              })}
            </div>
            <div className="px-4 pt-3 flex flex-col gap-3">
              <AnimatePresence>
                {filteredProjects.map((project, i) => (
                  <MobileCard key={project.id} project={project} index={i} />
                ))}
              </AnimatePresence>
            </div>
          </div>

        </div>

      </div>
    </ContentLayout>
  );
};

export default Projects;
