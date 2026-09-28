import { useState } from "react";
import ContentLayout from "./Layout/ContentLayout";
import MobileSectionHeader from "./Layout/MobileSectionHeader";
import { motion, AnimatePresence } from "motion/react";
import {
  Server,
  Layout,
  Database,
  Cloud,
  Layers,
  ChevronRight,
} from "lucide-react";
import { Boxes } from "lucide-react";
import {
  SiJavascript,
  SiTypescript,
  SiNodedotjs,
  SiExpress,
  SiFastify,
  SiNestjs,
  SiSwagger,
  SiJest,
  SiPrisma,
  SiMongoose,
  SiPostgresql,
  SiMongodb,
  SiMysql,
  SiRedis,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiRedux,
  SiVite,
  SiBootstrap,
  SiDocker,
  SiKubernetes,
  SiGithubactions,
  SiSocketdotio,
  SiGraphql,
} from "react-icons/si";
import { FaAws } from "react-icons/fa";
import { CountUp, DURATION, EASE, SPRING, SpotlightLayer, useSpotlight } from "../motion";
import { useBrandColor } from "../theme";

type CategorySkill = "Backend" | "Frontend" | "Database" | "Infrastructure" | "All";

type Skill = {
  name: string;
  icon: React.ElementType;
  iconColor: string;
  category: CategorySkill;
  featured?: boolean;
};

const skillList: Skill[] = [
  // Fundação — linguagem e runtime
  { name: "JavaScript",    icon: SiJavascript,   iconColor: "#F7DF1E", category: "Backend",        featured: true },
  { name: "TypeScript",    icon: SiTypescript,   iconColor: "#3178C6", category: "Backend",        featured: true },
  { name: "Node.js",       icon: SiNodedotjs,    iconColor: "#339933", category: "Backend",        featured: true },
  // Frontend
  { name: "React",         icon: SiReact,        iconColor: "#61DAFB", category: "Frontend",       featured: true },
  { name: "Next.js",       icon: SiNextdotjs,    iconColor: "#ffffff", category: "Frontend",       featured: true },
  { name: "Tailwind CSS",  icon: SiTailwindcss,  iconColor: "#06B6D4", category: "Frontend" },
  { name: "Redux",         icon: SiRedux,        iconColor: "#764ABC", category: "Frontend" },
  { name: "Zustand",       icon: Boxes,          iconColor: "#99a4ac", category: "Frontend" },
  { name: "Vite",          icon: SiVite,         iconColor: "#646CFF", category: "Frontend" },
  { name: "Bootstrap",     icon: SiBootstrap,    iconColor: "#7952B3", category: "Frontend" },
  // Backend
  { name: "Express",       icon: SiExpress,      iconColor: "#ffffff", category: "Backend" },
  { name: "Fastify",       icon: SiFastify,      iconColor: "#ffffff", category: "Backend" },
  { name: "NestJS",        icon: SiNestjs,       iconColor: "#E0234E", category: "Backend" },
  { name: "GraphQL",       icon: SiGraphql,      iconColor: "#E10098", category: "Backend" },
  { name: "Socket.io",     icon: SiSocketdotio,  iconColor: "#ffffff", category: "Backend" },
  { name: "Swagger",       icon: SiSwagger,      iconColor: "#85EA2D", category: "Backend" },
  { name: "Jest",          icon: SiJest,         iconColor: "#C21325", category: "Backend" },
  { name: "Prisma",        icon: SiPrisma,       iconColor: "#2D3748", category: "Backend" },
  { name: "Mongoose",      icon: SiMongoose,     iconColor: "#880000", category: "Backend" },
  // Banco de dados
  { name: "PostgreSQL",    icon: SiPostgresql,   iconColor: "#4169E1", category: "Database",       featured: true },
  { name: "MongoDB",       icon: SiMongodb,      iconColor: "#47A248", category: "Database",       featured: true },
  { name: "MySQL",         icon: SiMysql,        iconColor: "#4479A1", category: "Database" },
  { name: "Redis",         icon: SiRedis,        iconColor: "#FF4438", category: "Database" },
  // Infraestrutura
  { name: "Docker",        icon: SiDocker,       iconColor: "#2496ED", category: "Infrastructure", featured: true },
  { name: "AWS",           icon: FaAws,          iconColor: "#FF9900", category: "Infrastructure", featured: true },
  { name: "Kubernetes",    icon: SiKubernetes,   iconColor: "#326CE5", category: "Infrastructure" },
  { name: "GitHub Actions",icon: SiGithubactions,iconColor: "#2088FF", category: "Infrastructure" },
];

const categoryConfig: Record<
  Exclude<CategorySkill, "All">,
  { icon: React.ElementType; description: string }
> = {
  Backend:        { icon: Server,   description: "Node.js, APIs REST, arquitetura de microsserviços" },
  Frontend:       { icon: Layout,   description: "React, interfaces responsivas, state management" },
  Database:       { icon: Database, description: "SQL, NoSQL, caching, otimização de queries" },
  Infrastructure: { icon: Cloud,    description: "Docker, cloud services, CI/CD, devops" },
};

const tabIcons: Record<CategorySkill, React.ElementType> = {
  All: Layers, Backend: Server, Frontend: Layout, Database: Database, Infrastructure: Cloud,
};

const categories: CategorySkill[] = ["All", "Backend", "Frontend", "Database", "Infrastructure"];

const cornerClasses = [
  "top-0 left-0 border-t border-l",
  "top-0 right-0 border-t border-r",
  "bottom-0 left-0 border-b border-l",
  "bottom-0 right-0 border-b border-r",
];

const CornerBorders = () => (
  <>
    {cornerClasses.map((pos) => (
      <span
        key={pos}
        aria-hidden
        className={`absolute ${pos} w-2.5 h-2.5 border-accent pointer-events-none opacity-0 transition-opacity duration-150 group-hover:opacity-100`}
      />
    ))}
  </>
);

// Glow em camada separada: anima só opacity, sem repintar drop-shadow a cada frame
const IconGlow = ({ color, size }: { color: string; size: string }) => (
  <span
    aria-hidden
    className={`absolute ${size} rounded-full blur-lg opacity-0 transition-opacity duration-300 group-hover:opacity-40 light:group-hover:opacity-15 pointer-events-none`}
    style={{ backgroundColor: color }}
  />
);

const FeaturedSkillCard = ({ skill, color }: { skill: Skill; color: string }) => {
  const Icon = skill.icon;
  return (
    <div className="group relative w-24 h-24 flex flex-col items-center justify-center gap-2 rounded-sm cursor-default border border-accent/12 bg-card-background light:shadow-xs transition-colors duration-250 hover:border-accent/70 hover:bg-accent-third">
      <CornerBorders />
      <span className="relative flex items-center justify-center">
        <IconGlow color={color} size="w-10 h-10" />
        <Icon size={32} style={{ color }} className="relative transition-transform duration-300 group-hover:scale-110" />
      </span>
      <span className="font-mono text-[10px] text-text-muted transition-colors duration-200 group-hover:text-accent">
        {skill.name}
      </span>
    </div>
  );
};

const SecondarySkillCard = ({ skill, color }: { skill: Skill; color: string }) => {
  const Icon = skill.icon;
  return (
    <div className="group relative aspect-square flex flex-col items-center justify-center gap-1.5 rounded-sm cursor-default border border-default-border/90 bg-card-background light:shadow-xs transition-colors duration-250 hover:border-accent/35 hover:bg-accent-third">
      <span className="relative flex items-center justify-center">
        <IconGlow color={color} size="w-7 h-7" />
        <Icon size={22} style={{ color }} className="relative transition-transform duration-300 group-hover:scale-110" />
      </span>
      <span className="font-mono text-[9px] text-text-muted transition-colors duration-200 group-hover:text-text-code">
        {skill.name}
      </span>
    </div>
  );
};

const gridItemMotion = (index: number) => ({
  layout: true,
  initial: { opacity: 0, scale: 0.92 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.92, transition: { duration: 0.12 } },
  transition: {
    duration: DURATION.fast,
    ease: EASE,
    delay: index * 0.02,
    layout: { duration: DURATION.base, ease: EASE },
  },
});

const MobileCategoryCard = ({
  category,
  skills,
  index,
  isExpanded,
  onToggle,
  resolveColor,
}: {
  category: Exclude<CategorySkill, "All">;
  skills: Skill[];
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
  resolveColor: (skill: Skill) => string;
}) => {
  const config = categoryConfig[category];
  const Icon = config.icon;
  const featured = skills.filter((s) => s.featured);
  const secondary = skills.filter((s) => !s.featured);
  const panelId = `skills-panel-${category}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: DURATION.base, ease: EASE, delay: 0.1 + index * 0.06 }}
      className="border border-default-border/60 rounded-sm overflow-hidden bg-background light:bg-card-background light:shadow-xs"
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isExpanded}
        aria-controls={panelId}
        className={`w-full flex items-center justify-between px-4 py-3 cursor-pointer border-b transition-colors duration-200 ${
          isExpanded ? "border-default-border" : "border-transparent"
        }`}
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 flex items-center justify-center rounded-sm shrink-0 bg-accent-third border border-default-border">
            <Icon className="w-4 h-4 text-accent" />
          </div>
          <div className="text-left">
            <p className="text-xs font-semibold text-text-primary">{category}</p>
            <p className="font-mono text-[10px] text-text-muted mt-0.5">{skills.length} tecnologias</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {/* Featured icons preview */}
          <AnimatePresence initial={false}>
            {!isExpanded && (
              <motion.div
                initial={{ opacity: 0, x: 6 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 6 }}
                transition={{ duration: DURATION.fast, ease: EASE }}
                className="flex items-center gap-1"
              >
                {featured.slice(0, 3).map((s) => {
                  const SI = s.icon;
                  return <SI key={s.name} size={13} style={{ color: resolveColor(s) }} />;
                })}
              </motion.div>
            )}
          </AnimatePresence>
          <motion.div animate={{ rotate: isExpanded ? 90 : 0 }} transition={{ duration: DURATION.fast, ease: EASE }}>
            <ChevronRight className="w-4 h-4 text-text-muted" />
          </motion.div>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            id={panelId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: DURATION.base, ease: EASE }}
            className="overflow-hidden"
          >
            <div className="px-4 pt-3 pb-4">
              {/* Featured */}
              {featured.length > 0 && (
                <div className="mb-3">
                  <p className="font-mono text-[9px] text-accent/40 uppercase tracking-widest mb-2">destaque</p>
                  <div className="flex flex-wrap gap-2">
                    {featured.map((skill) => {
                      const SkillIcon = skill.icon;
                      return (
                        <div
                          key={skill.name}
                          className="flex items-center gap-2 px-3 py-2 rounded-sm border border-default-border/50 bg-card-background"
                        >
                          <SkillIcon size={16} style={{ color: resolveColor(skill) }} />
                          <span className="text-xs text-text-code font-medium">{skill.name}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
              {/* Secondary */}
              {secondary.length > 0 && (
                <div className="mb-3">
                  <p className="font-mono text-[9px] text-accent/40 uppercase tracking-widest mb-2">demais</p>
                  <div className="flex flex-wrap gap-1.5">
                    {secondary.map((skill) => {
                      const SkillIcon = skill.icon;
                      return (
                        <div
                          key={skill.name}
                          className="flex items-center gap-1.5 px-2 py-1.5 rounded-sm border border-default-border/40 bg-card-background"
                        >
                          <SkillIcon size={12} style={{ color: resolveColor(skill) }} />
                          <span className="text-[10px] text-text-muted">{skill.name}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
              <p className="font-mono text-[10px] text-text-secondary leading-relaxed">{config.description}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState<CategorySkill>("All");
  const [expandedMobileCategory, setExpandedMobileCategory] = useState<Exclude<CategorySkill, "All"> | null>("Backend");
  const brandColor = useBrandColor();
  const spotlight = useSpotlight();
  const ic = (skill: Skill) => brandColor(skill.iconColor);

  const filteredSkills =
    activeCategory === "All"
      ? skillList
      : skillList.filter((s) => s.category === activeCategory);

  const featuredSkills = filteredSkills.filter((s) => s.featured);
  const secondarySkills = filteredSkills.filter((s) => !s.featured);

  const skillsByCategory = {
    Backend:        skillList.filter((s) => s.category === "Backend"),
    Frontend:       skillList.filter((s) => s.category === "Frontend"),
    Database:       skillList.filter((s) => s.category === "Database"),
    Infrastructure: skillList.filter((s) => s.category === "Infrastructure"),
  };

  const toggleMobileCategory = (category: Exclude<CategorySkill, "All">) => {
    setExpandedMobileCategory(expandedMobileCategory === category ? null : category);
  };

  const categoryCount = (cat: CategorySkill) =>
    cat === "All" ? skillList.length : skillList.filter((s) => s.category === cat).length;

  const activeConfig = activeCategory !== "All" ? categoryConfig[activeCategory] : null;

  return (
    <ContentLayout>
      <div className="h-full w-full flex flex-col overflow-hidden bg-content-bg">

        {/* Mobile View */}
        <div className="md:hidden flex flex-col h-full overflow-hidden">
          <MobileSectionHeader
            index="02"
            title="Skills"
            aside={
              <>
                <CountUp value={skillList.length} delay={0.2} className="font-mono text-sm font-bold text-accent" />
                <span className="font-mono text-[10px] text-text-secondary ml-1">tecnologias</span>
              </>
            }
          />
          <div className="flex-1 overflow-y-auto overflow-x-hidden p-4 space-y-3 pb-24 scrollbar-hide">
            {(Object.keys(skillsByCategory) as Exclude<CategorySkill, "All">[]).map((category, i) => (
              <MobileCategoryCard
                key={category}
                category={category}
                skills={skillsByCategory[category]}
                index={i}
                isExpanded={expandedMobileCategory === category}
                onToggle={() => toggleMobileCategory(category)}
                resolveColor={ic}
              />
            ))}
          </div>
        </div>

        {/* Desktop View */}
        <div className="hidden md:flex flex-row h-full">

          {/* Left: tabs + grid + footer */}
          <div className="flex flex-col flex-1 min-w-0 h-full">

            {/* Filter Tabs */}
            <div role="tablist" className="shrink-0 flex border-b border-default-border/40">
              {categories.map((cat) => {
                const TabIcon = tabIcons[cat];
                const isActive = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActiveCategory(cat)}
                    className={`relative flex items-center gap-2 px-4 py-2.5 text-xs cursor-pointer transition-colors duration-200 ${
                      isActive ? "text-accent" : "text-text-secondary hover:text-text-primary"
                    }`}
                  >
                    <TabIcon className="w-3.5 h-3.5" />
                    <span>{cat}</span>
                    <span className="font-mono text-[10px] text-accent/50">{categoryCount(cat)}</span>
                    {isActive && (
                      <motion.span
                        layoutId="skills-tab"
                        transition={SPRING}
                        className="absolute -bottom-px left-0 right-0 h-0.5 bg-accent"
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Skill Grid — holofote segue o cursor por cima dos cards */}
            <div className="relative flex-1 min-h-0 overflow-hidden" {...spotlight.handlers}>
              <div className="h-full overflow-y-auto scrollbar-hide p-4">
                <div className="flex flex-col gap-4">
                  {/* Featured row */}
                  <div className="relative flex flex-wrap gap-2">
                    <AnimatePresence mode="popLayout">
                      {featuredSkills.map((skill, i) => (
                        <motion.div key={skill.name} {...gridItemMotion(i)}>
                          <FeaturedSkillCard skill={skill} color={ic(skill)} />
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>

                  {/* Divider */}
                  {featuredSkills.length > 0 && secondarySkills.length > 0 && (
                    <motion.div layout transition={{ duration: DURATION.base, ease: EASE }} className="flex items-center gap-3">
                      <div className="h-px flex-1 bg-default-border/30" />
                      <span className="font-mono text-[9px] text-text-secondary/40 uppercase tracking-widest">demais</span>
                      <div className="h-px flex-1 bg-default-border/30" />
                    </motion.div>
                  )}

                  {/* Secondary grid — uniform cells */}
                  <div className="relative grid gap-2 grid-cols-[repeat(auto-fill,minmax(72px,1fr))]">
                    <AnimatePresence mode="popLayout">
                      {secondarySkills.map((skill, i) => (
                        <motion.div key={skill.name} {...gridItemMotion(featuredSkills.length + i)}>
                          <SecondarySkillCard skill={skill} color={ic(skill)} />
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
              <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden light:opacity-50">
                <SpotlightLayer layer={spotlight.layer} />
              </div>
            </div>

            {/* Context Footer */}
            <AnimatePresence>
              {activeConfig && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: DURATION.fast, ease: EASE }}
                  className="shrink-0 border-t border-default-border/30 px-4 py-2.5 flex items-center gap-2"
                >
                  {(() => {
                    const FooterIcon = activeConfig.icon;
                    return <FooterIcon className="w-3.5 h-3.5 text-accent/60 shrink-0" />;
                  })()}
                  <span className="font-mono text-xs text-accent/80">{activeCategory}</span>
                  <span className="text-text-muted/60 text-xs">·</span>
                  <span className="text-[10px] text-text-secondary">{activeConfig.description}</span>
                  <span className="text-text-muted/60 text-xs">·</span>
                  <span className="font-mono text-[10px] text-accent/50 shrink-0">
                    {filteredSkills.length} tecnologias
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

          </div>

          {/* Right: Índice Contextual Sidebar */}
          <div className="shrink-0 w-48 border-l border-default-border/40 flex flex-col overflow-hidden">
            <AnimatePresence mode="wait" initial={false}>
              {activeCategory === "All" ? (
                <motion.div
                  key="all"
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -8 }}
                  transition={{ duration: DURATION.fast, ease: EASE }}
                  className="flex flex-col h-full"
                >
                  {/* Header */}
                  <div className="shrink-0 px-4 pt-4 pb-3 border-b border-default-border/30">
                    <p className="font-mono text-[10px] text-accent/50">// índice</p>
                    <p className="font-mono text-[10px] text-text-secondary mt-0.5">{skillList.length} tecnologias</p>
                  </div>

                  {/* Category summaries */}
                  <div className="flex-1 overflow-y-auto scrollbar-hide px-4 py-3 flex flex-col gap-4">
                    {(Object.keys(skillsByCategory) as Exclude<CategorySkill, "All">[]).map((cat, i) => {
                      const cfg = categoryConfig[cat];
                      const CatIcon = cfg.icon;
                      const featured = skillsByCategory[cat].filter((s) => s.featured);
                      return (
                        <motion.div
                          key={cat}
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: DURATION.fast, ease: EASE, delay: i * 0.05 }}
                        >
                          <button
                            type="button"
                            onClick={() => setActiveCategory(cat)}
                            className="w-full flex items-center gap-2 mb-2 group cursor-pointer"
                          >
                            <CatIcon className="w-3 h-3 text-text-secondary group-hover:text-accent transition-colors duration-150 shrink-0" />
                            <span className="font-mono text-[10px] text-text-secondary group-hover:text-accent transition-colors duration-150 uppercase tracking-wider">{cat}</span>
                            <span className="font-mono text-[10px] text-accent/30 ml-auto">{skillsByCategory[cat].length}</span>
                          </button>
                          <div className="flex gap-1.5 flex-wrap">
                            {featured.map((skill) => {
                              const SkillIcon = skill.icon;
                              return (
                                <div
                                  key={skill.name}
                                  className="w-7 h-7 flex items-center justify-center border border-default-border/50 bg-background/60 rounded-sm"
                                  title={skill.name}
                                >
                                  <SkillIcon size={14} style={{ color: ic(skill) }} />
                                </div>
                              );
                            })}
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key={activeCategory}
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -8 }}
                  transition={{ duration: DURATION.fast, ease: EASE }}
                  className="flex flex-col h-full"
                >
                  {/* Header */}
                  <div className="shrink-0 px-4 pt-4 pb-3 border-b border-default-border/30">
                    {(() => {
                      const cfg = categoryConfig[activeCategory as Exclude<CategorySkill, "All">];
                      const HeaderIcon = cfg.icon;
                      return (
                        <>
                          <p className="font-mono text-[10px] text-accent/50">// {activeCategory.toLowerCase()}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <HeaderIcon className="w-4 h-4 text-accent/70" />
                            <span className="font-mono text-xs text-accent/80">{activeCategory}</span>
                          </div>
                        </>
                      );
                    })()}
                  </div>

                  {/* Featured skills detail */}
                  <div className="flex-1 overflow-y-auto scrollbar-hide px-4 py-3 flex flex-col gap-2">
                    <p className="font-mono text-[9px] text-text-secondary uppercase tracking-wider mb-1">destaque</p>
                    {featuredSkills.map((skill, i) => {
                      const SkillIcon = skill.icon;
                      return (
                        <motion.div
                          key={skill.name}
                          initial={{ opacity: 0, x: 8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: DURATION.fast, ease: EASE, delay: i * 0.05 }}
                          className="flex items-center gap-2.5 py-1.5 border-b border-default-border/20 last:border-0"
                        >
                          <div className="w-6 h-6 flex items-center justify-center shrink-0">
                            <SkillIcon size={16} style={{ color: ic(skill) }} />
                          </div>
                          <span className="font-mono text-[10px] text-text-code">{skill.name}</span>
                        </motion.div>
                      );
                    })}

                    {secondarySkills.length > 0 && (
                      <>
                        <p className="font-mono text-[9px] text-text-secondary uppercase tracking-wider mt-2 mb-1">demais</p>
                        <div className="flex flex-wrap gap-1.5">
                          {secondarySkills.map((skill) => {
                            const SkillIcon = skill.icon;
                            return (
                              <div
                                key={skill.name}
                                className="w-6 h-6 flex items-center justify-center border border-default-border/40 bg-background/50 rounded-sm"
                                title={skill.name}
                              >
                                <SkillIcon size={13} style={{ color: ic(skill) }} />
                              </div>
                            );
                          })}
                        </div>
                      </>
                    )}
                  </div>

                  {/* Back to all */}
                  <div className="shrink-0 px-4 py-3 border-t border-default-border/30">
                    <button
                      type="button"
                      onClick={() => setActiveCategory("All")}
                      className="font-mono text-[10px] text-text-secondary hover:text-accent transition-colors duration-150 cursor-pointer"
                    >
                      ← ver todas
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </ContentLayout>
  );
};

export default Skills;
