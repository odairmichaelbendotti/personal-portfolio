import { useState, useEffect } from "react";

const useIsLight = () => {
  const [isLight, setIsLight] = useState(() =>
    document.documentElement.classList.contains("light")
  );
  useEffect(() => {
    const obs = new MutationObserver(() =>
      setIsLight(document.documentElement.classList.contains("light"))
    );
    obs.observe(document.documentElement, { attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, []);
  return isLight;
};
import ContentLayout from "./Layout/ContentLayout";
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

const iconColorLight: Record<string, string> = {
  "JavaScript":   "#b8960a",
  "React":        "#0ea5c8",
  "Next.js":      "#1a1a1a",
  "Express":      "#1a1a1a",
  "Fastify":      "#1a1a1a",
  "Socket.io":    "#1a1a1a",
  "Swagger":      "#4a8a00",
  "Prisma":       "#1a1a1a",
};

const categoryConfig: Record<
  Exclude<CategorySkill, "All">,
  { icon: React.ElementType; color: string; description: string }
> = {
  Backend:        { icon: Server,   color: "bg-blue-500/10 text-blue-400 border-blue-500/30",    description: "Node.js, APIs REST, arquitetura de microsserviços" },
  Frontend:       { icon: Layout,   color: "bg-cyan-500/10 text-cyan-400 border-cyan-500/30",    description: "React, interfaces responsivas, state management" },
  Database:       { icon: Database, color: "bg-green-500/10 text-green-400 border-green-500/30", description: "SQL, NoSQL, caching, otimização de queries" },
  Infrastructure: { icon: Cloud,    color: "bg-purple-500/10 text-purple-400 border-purple-500/30", description: "Docker, cloud services, CI/CD, devops" },
};

const tabIcons: Record<CategorySkill, React.ElementType> = {
  All: Layers, Backend: Server, Frontend: Layout, Database: Database, Infrastructure: Cloud,
};

const categories: CategorySkill[] = ["All", "Backend", "Frontend", "Database", "Infrastructure"];

const CornerBorders = ({ isActive }: { isActive: boolean }) => (
  <>
    <motion.span
      className="absolute top-0 left-0 w-2.5 h-2.5 border-t border-l border-accent pointer-events-none"
      animate={{ opacity: isActive ? 1 : 0 }}
      transition={{ duration: 0.15 }}
    />
    <motion.span
      className="absolute top-0 right-0 w-2.5 h-2.5 border-t border-r border-accent pointer-events-none"
      animate={{ opacity: isActive ? 1 : 0 }}
      transition={{ duration: 0.15 }}
    />
    <motion.span
      className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b border-l border-accent pointer-events-none"
      animate={{ opacity: isActive ? 1 : 0 }}
      transition={{ duration: 0.15 }}
    />
    <motion.span
      className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b border-r border-accent pointer-events-none"
      animate={{ opacity: isActive ? 1 : 0 }}
      transition={{ duration: 0.15 }}
    />
  </>
);

const FeaturedSkillCard = ({ skill, index }: { skill: Skill; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  const isLight = useIsLight();
  const Icon = skill.icon;
  const color = isLight ? (iconColorLight[skill.name] ?? skill.iconColor) : skill.iconColor;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2, delay: index * 0.03 }}
      className="relative w-24 h-24 flex flex-col items-center justify-center gap-2 rounded-sm cursor-pointer shrink-0"
      style={{
        border: isHovered
          ? "1px solid rgba(64,203,246,0.6)"
          : "1px solid rgba(64,203,246,0.2)",
        backgroundColor: isHovered ? "var(--color-accent-third)" : "var(--color-background)",
        transition: "border-color 0.25s, background-color 0.25s",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CornerBorders isActive={isHovered} />
      <motion.div
        animate={{
          filter: isHovered
            ? `drop-shadow(0 0 8px ${color})`
            : "drop-shadow(0 0 0px transparent)",
        }}
        transition={{ duration: 0.2 }}
      >
        <Icon size={32} style={{ color }} />
      </motion.div>
      <span
        className="font-mono text-[10px]"
        style={{
          color: isHovered ? "var(--color-accent)" : "var(--color-text-muted)",
          transition: "color 0.2s",
        }}
      >
        {skill.name}
      </span>
    </motion.div>
  );
};

const SecondarySkillCard = ({ skill, index }: { skill: Skill; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  const isLight = useIsLight();
  const Icon = skill.icon;
  const color = isLight ? (iconColorLight[skill.name] ?? skill.iconColor) : skill.iconColor;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2, delay: index * 0.02 }}
      className="relative flex flex-col items-center justify-center gap-1.5 rounded-sm cursor-pointer"
      style={{
        border: isHovered
          ? "1px solid rgba(64,203,246,0.4)"
          : "1px solid var(--color-default-border)",
        backgroundColor: isHovered ? "var(--color-accent-third)" : "var(--color-background)",
        transition: "border-color 0.25s, background-color 0.25s",
        aspectRatio: "1",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        animate={{
          filter: isHovered
            ? `drop-shadow(0 0 5px ${color})`
            : "drop-shadow(0 0 0px transparent)",
        }}
        transition={{ duration: 0.2 }}
      >
        <Icon size={22} style={{ color }} />
      </motion.div>
      <span
        className="font-mono text-[9px]"
        style={{
          color: isHovered ? "var(--color-text-code)" : "var(--color-text-muted)",
          transition: "color 0.2s",
        }}
      >
        {skill.name}
      </span>
    </motion.div>
  );
};

const MobileCategoryCard = ({
  category,
  skills,
  isExpanded,
  onToggle,
}: {
  category: Exclude<CategorySkill, "All">;
  skills: Skill[];
  isExpanded: boolean;
  onToggle: () => void;
}) => {
  const config = categoryConfig[category];
  const Icon = config.icon;
  const featured = skills.filter((s) => s.featured);
  const secondary = skills.filter((s) => !s.featured);
  const sorted = [...featured, ...secondary];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="border border-default-border rounded-sm overflow-hidden bg-card-background/30"
    >
      <button
        onClick={onToggle}
        className={`w-full flex items-center justify-between p-3 ${config.color} border-b border-default-border/50`}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 border border-current/30 bg-background/50 flex items-center justify-center rounded-sm">
            <Icon className="w-5 h-5" />
          </div>
          <div className="text-left">
            <h3 className="text-sm font-semibold">{category}</h3>
            <p className="text-[10px] opacity-80 mt-0.5">{skills.length} tecnologias</p>
          </div>
        </div>
        <motion.div animate={{ rotate: isExpanded ? 90 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronRight className="w-5 h-5" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="p-3 bg-background/50">
              <div className="flex flex-wrap gap-2 mb-3">
                {sorted.map((skill) => {
                  const SkillIcon = skill.icon;
                  return (
                    <div
                      key={skill.name}
                      className={`flex items-center gap-1.5 bg-background border border-default-border/50 rounded-sm ${
                        skill.featured ? "px-3 py-2" : "px-2 py-1.5"
                      }`}
                    >
                      <SkillIcon
                        size={skill.featured ? 18 : 14}
                        style={{ color: skill.iconColor }}
                      />
                      <span className={skill.featured ? "text-xs text-text-code" : "text-[10px] text-text-muted"}>
                        {skill.name}
                      </span>
                    </div>
                  );
                })}
              </div>
              <p className="text-[10px] text-text-secondary leading-relaxed">{config.description}</p>
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
  const isLight = useIsLight();
  const ic = (skill: Skill) => isLight ? (iconColorLight[skill.name] ?? skill.iconColor) : skill.iconColor;

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
      <div className="h-full w-full flex flex-col overflow-hidden bg-card-background">

        {/* Mobile View */}
        <div className="md:hidden flex flex-col h-full overflow-hidden">
          <div className="flex-1 overflow-y-auto overflow-x-hidden p-4 space-y-3 pb-20 scrollbar-hide">
            {(Object.keys(skillsByCategory) as Exclude<CategorySkill, "All">[]).map((category) => (
              <MobileCategoryCard
                key={category}
                category={category}
                skills={skillsByCategory[category]}
                isExpanded={expandedMobileCategory === category}
                onToggle={() => toggleMobileCategory(category)}
              />
            ))}
          </div>
        </div>

        {/* Desktop View */}
        <div className="hidden md:flex flex-row h-full">

          {/* Left: tabs + grid + footer */}
          <div className="flex flex-col flex-1 min-w-0 h-full">

            {/* Filter Tabs */}
            <div className="shrink-0 flex border-b border-default-border/40">
              {categories.map((cat) => {
                const TabIcon = tabIcons[cat];
                const isActive = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className="relative flex items-center gap-2 px-4 py-2.5 text-xs cursor-pointer border-b-2 transition-colors duration-200"
                    style={{
                      color: isActive ? "var(--color-accent)" : "var(--color-text-secondary)",
                      borderBottomColor: isActive ? "var(--color-accent)" : "transparent",
                    }}
                    onMouseEnter={(e) => { if (!isActive) (e.currentTarget as HTMLButtonElement).style.color = "var(--color-text-primary)"; }}
                    onMouseLeave={(e) => { if (!isActive) (e.currentTarget as HTMLButtonElement).style.color = "var(--color-text-secondary)"; }}
                  >
                    <TabIcon className="w-3.5 h-3.5" />
                    <span>{cat}</span>
                    <span className="font-mono text-[10px] text-accent/50">{categoryCount(cat)}</span>
                  </button>
                );
              })}
            </div>

            {/* Skill Grid */}
            <div className="flex-1 overflow-y-auto scrollbar-hide p-4">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.18 }}
                className="flex flex-col gap-4"
              >
                {/* Featured row */}
                {featuredSkills.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {featuredSkills.map((skill, i) => (
                      <FeaturedSkillCard key={skill.name} skill={skill} index={i} />
                    ))}
                  </div>
                )}

                {/* Divider */}
                {featuredSkills.length > 0 && secondarySkills.length > 0 && (
                  <div className="flex items-center gap-3">
                    <div className="h-px flex-1 bg-default-border/30" />
                    <span className="font-mono text-[9px] text-text-secondary/40 uppercase tracking-widest">demais</span>
                    <div className="h-px flex-1 bg-default-border/30" />
                  </div>
                )}

                {/* Secondary grid — uniform cells */}
                {secondarySkills.length > 0 && (
                  <div
                    className="grid gap-2"
                    style={{ gridTemplateColumns: "repeat(auto-fill, minmax(72px, 1fr))" }}
                  >
                    {secondarySkills.map((skill, i) => (
                      <SecondarySkillCard key={skill.name} skill={skill} index={featuredSkills.length + i} />
                    ))}
                  </div>
                )}
              </motion.div>
            </div>

            {/* Context Footer */}
            <AnimatePresence>
              {activeConfig && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.18 }}
                  className="shrink-0 border-t border-default-border/30 px-4 py-2.5 flex items-center gap-2"
                >
                  {(() => {
                    const FooterIcon = activeConfig.icon;
                    return <FooterIcon className="w-3.5 h-3.5 text-accent/60 shrink-0" />;
                  })()}
                  <span className="font-mono text-xs text-accent/80">{activeCategory}</span>
                  <span className="text-default-border/60 text-xs">·</span>
                  <span className="text-[10px] text-text-secondary">{activeConfig.description}</span>
                  <span className="text-default-border/60 text-xs">·</span>
                  <span className="font-mono text-[10px] text-accent/50 shrink-0">
                    {filteredSkills.length} tecnologias
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

          </div>

          {/* Right: Índice Contextual Sidebar */}
          <div className="shrink-0 w-48 border-l border-default-border/40 flex flex-col overflow-hidden">
            <AnimatePresence mode="popLayout">
              {activeCategory === "All" ? (
                <motion.div
                  key="all"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="flex flex-col h-full"
                >
                  {/* Header */}
                  <div className="shrink-0 px-4 pt-4 pb-3 border-b border-default-border/30">
                    <p className="font-mono text-[10px] text-accent/50">// índice</p>
                    <p className="font-mono text-[10px] text-text-secondary mt-0.5">{skillList.length} tecnologias</p>
                  </div>

                  {/* Category summaries */}
                  <div className="flex-1 overflow-y-auto scrollbar-hide px-4 py-3 flex flex-col gap-4">
                    {(Object.keys(skillsByCategory) as Exclude<CategorySkill, "All">[]).map((cat) => {
                      const cfg = categoryConfig[cat];
                      const CatIcon = cfg.icon;
                      const featured = skillsByCategory[cat].filter((s) => s.featured);
                      return (
                        <motion.div
                          key={cat}
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <button
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
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
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
                          transition={{ duration: 0.18, delay: i * 0.05 }}
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
