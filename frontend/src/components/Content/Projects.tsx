import { useState } from "react";
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
import MobileSectionHeader from "./Layout/MobileSectionHeader";
import { CountUp, DURATION, EASE, Magnetic, SPRING, Stagger, StaggerItem } from "../motion";
import { TEXT_CONTRAST, useBrandColor } from "../theme";

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
  Frontend: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20 light:text-cyan-800 light:border-cyan-800/25",
  Backend: "bg-blue-500/10 text-blue-400 border-blue-500/20 light:text-blue-800 light:border-blue-800/25",
};

const ProjectDetail = ({ project }: { project: Project }) => {
  const brandColor = useBrandColor();
  // Cor do projeto ajustada para contraste de texto no tema claro
  const tone = brandColor(project.color, TEXT_CONTRAST);
  return (
    <motion.div
      initial={{ opacity: 0, x: 8 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -8 }}
      transition={{ duration: DURATION.fast, ease: EASE }}
      className="p-5"
    >
      {project.image && (
        <div className="group w-full h-36 mb-4 rounded-sm overflow-hidden border border-default-border/40">
          <img
            src={project.image}
            alt={project.title}
            loading="lazy"
            decoding="async"
            width={800}
            height={288}
            className="w-full h-full object-cover opacity-80 transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </div>
      )}

      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: DURATION.slow, ease: EASE, delay: 0.1 }}
        className="h-0.5 w-12 mb-3 rounded-full origin-left"
        style={{ backgroundColor: tone }}
      />

      <h2 className="text-xl font-bold text-text-primary mb-1">{project.title}</h2>

      <div className="flex items-center gap-2 mb-4">
        <span className={`font-mono text-[9px] px-2 py-0.5 border rounded-sm ${categoryChipColors[project.category]}`}>
          {project.category}
        </span>
        <span className="font-mono text-[10px] text-text-muted">{project.year}</span>
      </div>

      {/* Action bar */}
      {(project.github || project.demo) && (
        <div className="flex items-center gap-2 mb-4">
          {project.github && (
            <Magnetic strength={0.2}>
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 border border-default-border/60 rounded-sm font-mono text-[10px] text-text-secondary hover:border-accent/40 hover:text-accent transition-colors"
              >
                <GitHubIcon className="w-3 h-3" />
                <span>GitHub</span>
              </a>
            </Magnetic>
          )}
          {project.demo && (
            <Magnetic strength={0.2}>
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-sm font-mono text-[10px] font-semibold transition-opacity hover:opacity-80"
                style={{
                  backgroundColor: tone + "22",
                  border: `1px solid ${tone}55`,
                  color: tone,
                }}
              >
                <ExternalLink size={11} />
                <span>Demo</span>
              </a>
            </Magnetic>
          )}
        </div>
      )}

      <div className="h-px bg-default-border/30 mb-4" />

      <p className="text-xs text-text-muted leading-relaxed mb-5">{project.longDescription}</p>

      <p className="font-mono text-[9px] text-accent/40 uppercase tracking-widest mb-2">stack</p>
      <Stagger className="flex flex-wrap gap-2" delay={0.12} stagger={0.04}>
        {project.tech.map((t) => {
          const entry = techIconMap[t];
          if (!entry) return null;
          const Icon = entry.icon;
          return (
            <StaggerItem key={t}>
              <div className="flex items-center gap-1.5 px-2 py-1.5 border border-default-border/50 bg-background/50 rounded-sm hover:border-accent/30 transition-colors group">
                <Icon size={13} style={{ color: brandColor(entry.color) }} />
                <span className="font-mono text-[10px] text-text-muted group-hover:text-text-code transition-colors">{t}</span>
              </div>
            </StaggerItem>
          );
        })}
      </Stagger>
    </motion.div>
  );
};

const MobileCard = ({ project }: { project: Project }) => {
  const brandColor = useBrandColor();
  const tone = brandColor(project.color, TEXT_CONTRAST);
  return (
    <div className="rounded-sm overflow-hidden border border-default-border bg-background light:bg-card-background light:shadow-xs">
      {project.image && (
        <div className="relative w-full h-32 overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            loading="lazy"
            decoding="async"
            width={800}
            height={256}
            className="w-full h-full object-cover opacity-75"
          />
          {/* Gradient overlay bottom */}
          <div className="absolute inset-0 bg-linear-to-b from-transparent from-40% to-background" />
          {/* Featured badge */}
          {project.featured && (
            <div className="absolute top-2 right-2 font-mono text-[9px] px-2 py-0.5 rounded-sm bg-accent-third text-accent border border-default-border">
              ★ destaque
            </div>
          )}
          {/* num */}
          <span
            className="absolute bottom-2 left-3 font-mono text-[10px]"
            style={{ color: tone }}
          >
            {project.num}
          </span>
        </div>
      )}

      <div className="px-3 pt-2 pb-3">
        {/* Color bar */}
        <div className="h-0.5 w-8 mb-2 rounded-full" style={{ backgroundColor: tone }} />

        <div className="flex items-start justify-between gap-2 mb-1.5">
          <p className="text-sm font-semibold text-text-primary leading-tight">{project.title}</p>
          <div className="flex items-center gap-2.5 shrink-0 mt-0.5">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Repositório de ${project.title} no GitHub`}
                className="text-text-muted"
              >
                <GitHubIcon className="w-3 h-3" />
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Demo de ${project.title}`}
                className="text-accent"
              >
                <ExternalLink size={12} />
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
              return <Icon key={t} size={13} style={{ color: brandColor(entry.color) }} />;
            })}
            {project.tech.length > 4 && (
              <span className="font-mono text-[9px] text-text-muted">+{project.tech.length - 4}</span>
            )}
          </div>
          <span className="font-mono text-[9px] text-text-muted">{project.year}</span>
        </div>
      </div>
    </div>
  );
};

const categoryCount = (cat: ProjectCategory) =>
  cat === "All" ? projects.length : projects.filter((p) => p.category === cat).length;

const Projects = () => {
  const brandColor = useBrandColor();
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>("All");
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const filteredProjects =
    activeCategory === "All" ? projects : projects.filter((p) => p.category === activeCategory);

  // Seleção derivada: se o projeto escolhido saiu do filtro, cai no primeiro da lista
  const selectedProject =
    filteredProjects.find((p) => p.id === selectedId) ?? filteredProjects[0] ?? projects[0];

  const changeCategory = (cat: ProjectCategory) => {
    setActiveCategory(cat);
    setSelectedId(null);
  };

  return (
    <ContentLayout>
      <div className="h-full w-full flex flex-col overflow-hidden bg-content-bg">

        <MobileSectionHeader
          index="04"
          title="Projects"
          aside={
            <>
              <CountUp value={projects.length} delay={0.2} className="font-mono text-sm font-bold text-accent" />
              <span className="font-mono text-[10px] text-text-secondary ml-1">projetos</span>
            </>
          }
        />

        {/* Desktop header */}
        <motion.div
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: DURATION.base, ease: EASE }}
          className="shrink-0 hidden md:block px-4 pt-3 pb-0"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-accent">Projetos</span>
              <span className="text-text-secondary text-[10px]">·</span>
              <span className="text-xs text-text-primary/40">Odair Michael Bendotti</span>
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
              <CountUp value={projects.length} delay={0.15} className="font-mono font-bold text-accent text-xs" />
              <span className="text-[10px] text-text-secondary">projetos</span>
            </div>
          </div>

          {/* Filter tabs — desktop only */}
          <div role="tablist" className="flex items-center border-b border-default-border/40">
            {categories.map((cat) => {
              const Icon = tabIcons[cat];
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => changeCategory(cat)}
                  className={`relative px-4 py-2.5 text-xs cursor-pointer flex items-center gap-2 transition-colors duration-150 ${
                    isActive ? "text-accent" : "text-text-secondary hover:text-text-primary"
                  }`}
                >
                  <Icon size={13} />
                  <span>{cat}</span>
                  <span className="font-mono text-[10px] text-accent/50">{categoryCount(cat)}</span>
                  {isActive && (
                    <motion.span
                      layoutId="projects-tab"
                      transition={SPRING}
                      className="absolute -bottom-px left-0 right-0 h-0.5 bg-accent"
                    />
                  )}
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
            transition={{ duration: DURATION.base, delay: 0.1, ease: EASE }}
            className="hidden md:flex relative shrink-0 w-52 border-r border-default-border/40 flex-col py-2 overflow-y-auto scrollbar-hide"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => {
                const isActive = selectedProject.id === project.id;
                const tone = brandColor(project.color, TEXT_CONTRAST);
                return (
                  <motion.button
                    key={project.id}
                    type="button"
                    layout
                    aria-current={isActive ? "true" : undefined}
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -6, transition: { duration: 0.12 } }}
                    transition={{
                      duration: DURATION.fast,
                      ease: EASE,
                      delay: index * 0.04,
                      layout: { duration: DURATION.base, ease: EASE },
                    }}
                    onClick={() => setSelectedId(project.id)}
                    className="group relative flex flex-col py-2 px-4 cursor-pointer -ml-px text-left"
                  >
                    {/* Indicador ativo desliza entre itens, na cor do projeto */}
                    {isActive && (
                      <motion.span
                        layoutId="projects-active"
                        transition={SPRING}
                        className="absolute inset-0 border-l-2"
                        style={{ borderLeftColor: tone, backgroundColor: tone + "0d" }}
                      />
                    )}
                    <div className="relative flex items-center gap-2">
                      <span
                        className="font-mono text-[10px] transition-colors duration-150"
                        style={{ color: isActive ? tone : "var(--color-text-muted)" }}
                      >
                        {project.num}
                      </span>
                      <span
                        className="text-[8px]"
                        style={{ color: tone, visibility: project.featured ? "visible" : "hidden" }}
                      >
                        ●
                      </span>
                      <span
                        className={`text-xs font-medium transition-colors duration-150 ${
                          isActive ? "text-accent" : "text-text-secondary group-hover:text-text-primary"
                        }`}
                      >
                        {project.title}
                      </span>
                    </div>
                    <div className="relative font-mono text-[9px] text-text-muted ml-8">
                      {project.category} · {project.year}
                    </div>
                  </motion.button>
                );
              })}
            </AnimatePresence>
          </motion.div>

          {/* Project detail — desktop */}
          <div className="hidden md:block flex-1 overflow-y-auto scrollbar-hide">
            <AnimatePresence mode="wait" initial={false}>
              <ProjectDetail key={selectedProject.id} project={selectedProject} />
            </AnimatePresence>
          </div>

          {/* Mobile list */}
          <div className="md:hidden flex-1 overflow-y-auto scrollbar-hide pb-24">
            {/* Mobile category filters */}
            <div role="tablist" className="flex overflow-x-auto scrollbar-hide border-b border-default-border/40 px-4 gap-1">
              {categories.map((cat) => {
                const Icon = tabIcons[cat];
                const isActive = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => changeCategory(cat)}
                    className={`relative flex items-center gap-1.5 px-3 py-2.5 text-xs cursor-pointer shrink-0 whitespace-nowrap transition-colors duration-150 ${
                      isActive ? "text-accent" : "text-text-secondary"
                    }`}
                  >
                    <Icon size={12} />
                    <span>{cat}</span>
                    <span className="font-mono text-[10px] opacity-50">{categoryCount(cat)}</span>
                    {isActive && (
                      <motion.span
                        layoutId="projects-tab-mobile"
                        transition={SPRING}
                        className="absolute -bottom-px left-0 right-0 h-0.5 bg-accent"
                      />
                    )}
                  </button>
                );
              })}
            </div>
            <div className="relative px-4 pt-3 flex flex-col gap-3">
              <AnimatePresence mode="popLayout">
                {filteredProjects.map((project, i) => (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.97, transition: { duration: 0.12 } }}
                    transition={{
                      duration: DURATION.base,
                      ease: EASE,
                      delay: i * 0.05,
                      layout: { duration: DURATION.base, ease: EASE },
                    }}
                  >
                    <MobileCard project={project} />
                  </motion.div>
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
