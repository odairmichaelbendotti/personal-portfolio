import { useEffect, useState } from "react";
import ContentLayout from "./Layout/ContentLayout";
import { motion, AnimatePresence } from "motion/react";
import {
  Wrench,
  Server,
  Layout,
  Database,
  Cloud,
  ChevronRight,
  Code2,
} from "lucide-react";

type CategorySkill =
  | "Backend"
  | "Frontend"
  | "Database"
  | "Infrastructure"
  | "All";

const categories: CategorySkill[] = [
  "All",
  "Backend",
  "Frontend",
  "Database",
  "Infrastructure",
];

const categoryConfig: Record<
  Exclude<CategorySkill, "All">,
  { icon: React.ElementType; color: string; description: string }
> = {
  Backend: {
    icon: Server,
    color: "bg-blue-500/10 text-blue-400 border-blue-500/30",
    description: "Node.js, APIs REST, arquitetura de microsserviços",
  },
  Frontend: {
    icon: Layout,
    color: "bg-cyan-500/10 text-cyan-400 border-cyan-500/30",
    description: "React, interfaces responsivas, state management",
  },
  Database: {
    icon: Database,
    color: "bg-green-500/10 text-green-400 border-green-500/30",
    description: "SQL, NoSQL, caching, otimização de queries",
  },
  Infrastructure: {
    icon: Cloud,
    color: "bg-purple-500/10 text-purple-400 border-purple-500/30",
    description: "Docker, cloud services, CI/CD, devops",
  },
};

type Skill = {
  name: string;
  path: string;
  category: CategorySkill;
};

const skillList: Skill[] = [
  {
    name: "JavaScript",
    path: "./icons/backend/javascript.svg",
    category: "Backend",
  },
  {
    name: "TypeScript",
    path: "./icons/backend/typescript.svg",
    category: "Backend",
  },
  {
    name: "Node.js",
    path: "./icons/backend/nodejs.svg",
    category: "Backend",
  },
  {
    name: "Express",
    path: "./icons/backend/express.svg",
    category: "Backend",
  },
  {
    name: "Fastify",
    path: "./icons/backend/fastify.svg",
    category: "Backend",
  },
  {
    name: "NestJS",
    path: "./icons/backend/nestjs.svg",
    category: "Backend",
  },
  {
    name: "Swagger",
    path: "./icons/backend/swagger.svg",
    category: "Backend",
  },
  {
    name: "Jest",
    path: "./icons/backend/jest.svg",
    category: "Backend",
  },
  {
    name: "Prisma",
    path: "./icons/backend/prisma.svg",
    category: "Backend",
  },
  {
    name: "Mongoose",
    path: "./icons/backend/mongoose.svg",
    category: "Backend",
  },
  {
    name: "PostgreSQL",
    path: "./icons/database/postgresql.svg",
    category: "Database",
  },
  {
    name: "MongoDB",
    path: "./icons/database/mongodb.svg",
    category: "Database",
  },
  {
    name: "MySQL",
    path: "./icons/database/mysql.svg",
    category: "Database",
  },
  {
    name: "Redis",
    path: "./icons/database/redis.svg",
    category: "Database",
  },
  {
    name: "React",
    path: "./icons/frontend/react.svg",
    category: "Frontend",
  },
  {
    name: "Next.js",
    path: "./icons/frontend/nextjs.svg",
    category: "Frontend",
  },
  {
    name: "Tailwind CSS",
    path: "./icons/frontend/tailwindcss.svg",
    category: "Frontend",
  },
  {
    name: "Redux",
    path: "./icons/frontend/redux.svg",
    category: "Frontend",
  },
  {
    name: "Zustand",
    path: "./icons/frontend/zustand.svg",
    category: "Frontend",
  },
  {
    name: "Vite",
    path: "./icons/frontend/vite.svg",
    category: "Frontend",
  },
  {
    name: "Bootstrap",
    path: "./icons/frontend/bootstrap.svg",
    category: "Frontend",
  },
  {
    name: "Docker",
    path: "./icons/infrastructure/docker.svg",
    category: "Infrastructure",
  },
  {
    name: "Kubernetes",
    path: "./icons/infrastructure/kubernetes.svg",
    category: "Infrastructure",
  },
  {
    name: "AWS",
    path: "./icons/infrastructure/aws.svg",
    category: "Infrastructure",
  },
];

const CornerBorders = ({ isActive }: { isActive: boolean }) => (
  <>
    <motion.span
      className="absolute top-0 left-0 w-3 h-3 border-t border-l border-accent"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: isActive ? 1 : 0, scale: isActive ? 1 : 0.5 }}
      transition={{ duration: 0.2 }}
    />
    <motion.span
      className="absolute top-0 right-0 w-3 h-3 border-t border-r border-accent"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: isActive ? 1 : 0, scale: isActive ? 1 : 0.5 }}
      transition={{ duration: 0.2 }}
    />
    <motion.span
      className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-accent"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: isActive ? 1 : 0, scale: isActive ? 1 : 0.5 }}
      transition={{ duration: 0.2 }}
    />
    <motion.span
      className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-accent"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: isActive ? 1 : 0, scale: isActive ? 1 : 0.5 }}
      transition={{ duration: 0.2 }}
    />
  </>
);

const SkillCard = ({ skill }: { skill: Skill }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      key={`${skill.name}-${skill.category}`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.2 }}
      className="group relative flex flex-col items-center justify-start"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div className="relative bg-background hover:border-accent duration-300 hover:bg-accent-third cursor-pointer w-24 h-24 sm:w-28 sm:h-28 md:w-24 md:h-24 p-4 border border-default-border flex flex-col items-center justify-center gap-3 transition-all rounded-sm">
        <motion.img
          src={skill.path}
          className="w-8 h-8 sm:w-10 sm:h-10 absolute"
          alt={skill.name}
          animate={{ filter: isHovered ? "blur(4px)" : "blur(0px)" }}
          transition={{ duration: 0.2 }}
        />
        {/* Tooltip inside card - Desktop only */}
        <motion.div
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="hidden md:flex items-center justify-center text-center px-2 z-50"
        >
          <p className="text-xs font-semibold text-accent leading-tight">
            {skill.name}
          </p>
        </motion.div>
      </motion.div>
      {/* Name visible on mobile/tablet */}
      <p className="text-xs text-center mt-2 md:hidden text-gray-200 font-semibold leading-tight h-8 flex items-center justify-center w-full">
        {skill.name}
      </p>
    </motion.div>
  );
};

// Mobile Category Card Component
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
            <p className="text-[10px] opacity-80 mt-0.5">
              {skills.length} technologies
            </p>
          </div>
        </div>
        <motion.div
          animate={{ rotate: isExpanded ? 90 : 0 }}
          transition={{ duration: 0.2 }}
        >
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
                {skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="flex items-center gap-1.5 px-2 py-1.5 bg-background border border-default-border/50 rounded-sm"
                  >
                    <img
                      src={skill.path}
                      alt={skill.name}
                      className="w-4 h-4"
                    />
                    <span className="text-xs text-gray-300">{skill.name}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-400 leading-relaxed">
                {config.description}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const Skills = () => {
  const [hoverCategory, setHoverCategory] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<CategorySkill>("All");
  const [filteredSkills, setFilteredSkills] = useState<Skill[]>(skillList);
  const [expandedMobileCategory, setExpandedMobileCategory] = useState<Exclude<
    CategorySkill,
    "All"
  > | null>("Backend");

  useEffect(() => {
    function handleFilterSkills() {
      if (activeCategory === "All") {
        setFilteredSkills(skillList);
        return;
      }
      const filtered = skillList.filter(
        (skill) => skill.category === activeCategory,
      );
      setFilteredSkills(filtered);
    }
    handleFilterSkills();
  }, [activeCategory]);

  // Group skills by category for mobile view
  const skillsByCategory = {
    Backend: skillList.filter((s) => s.category === "Backend"),
    Frontend: skillList.filter((s) => s.category === "Frontend"),
    Database: skillList.filter((s) => s.category === "Database"),
    Infrastructure: skillList.filter((s) => s.category === "Infrastructure"),
  };

  const toggleMobileCategory = (category: Exclude<CategorySkill, "All">) => {
    setExpandedMobileCategory(
      expandedMobileCategory === category ? null : category,
    );
  };

  return (
    <ContentLayout>
      <div className="h-full w-full flex flex-col md:flex-row min-h-0">
        {/* Skill filter */}
        <div className="flex flex-col w-full md:flex-1 min-h-0">
          {/* Desktop Filter */}
          <div className="hidden md:flex shrink-0">
            <div className="flex border border-default-border text-gray-300 text-sm">
              {categories.map((label) => (
                <button
                  key={label}
                  className={`relative flex items-center justify-center px-6.5 py-6 cursor-pointer border-r border-default-border transition-all duration-300 ${
                    activeCategory === label
                      ? "bg-accent-third"
                      : "hover:bg-accent-third/30"
                  }`}
                  onMouseEnter={() => setHoverCategory(label)}
                  onMouseLeave={() => setHoverCategory(null)}
                  onClick={() => setActiveCategory(label)}
                  aria-pressed={activeCategory === label}
                >
                  <CornerBorders
                    isActive={
                      activeCategory === label || hoverCategory === label
                    }
                  />
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Mobile View - Header + Category Cards */}
          <div className="md:hidden flex flex-col min-h-0 overflow-hidden overflow-x-hidden">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="border-b border-default-border/50 p-4 bg-linear-to-r from-background to-accent-third/5 shrink-0"
            >
              <div className="flex items-start gap-3 mb-3">
                <div className="w-12 h-12 border border-accent/30 bg-accent/10 flex items-center justify-center rounded-sm shrink-0">
                  <Wrench className="w-6 h-6 text-accent" />
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="text-lg font-bold text-accent mb-1">
                    Technical Skills
                  </h2>
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <Code2 className="w-3 h-3" />
                    <span>{skillList.length} technologies</span>
                  </div>
                </div>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed">
                Full-stack expertise with focus on backend architecture and
                scalable systems.
              </p>
            </motion.div>

            {/* Mobile Category Cards */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden p-4 space-y-3 pb-20">
              {(
                Object.keys(skillsByCategory) as Exclude<CategorySkill, "All">[]
              ).map((category) => (
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

          {/* Desktop Skills content */}
          <div className="hidden md:flex flex-col flex-1 min-h-0 overflow-y-auto">
            <div className="w-full flex-1 p-4 sm:p-6">
              <div className="grid grid-cols-4 md:grid-cols-5 gap-4 sm:gap-5 md:gap-6">
                <AnimatePresence mode="popLayout">
                  {filteredSkills.map((skill) => (
                    <SkillCard
                      key={`${skill.name}-${skill.category}`}
                      skill={skill}
                    />
                  ))}
                </AnimatePresence>
              </div>
              {filteredSkills.length === 0 && (
                <div className="flex items-center justify-center h-32 text-gray-500">
                  <p>No skills found</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Expertise Panel - Desktop only */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="hidden md:flex w-full md:w-80 border-t md:border-t-0 md:border-l border-default-border flex-col max-h-96 md:max-h-none overflow-y-auto md:overflow-visible"
        >
          <div className="flex-1 p-4 md:p-6 flex flex-col gap-4 md:gap-6">
            <div>
              <h3 className="text-base md:text-lg font-bold text-accent mb-1">
                Expertise
              </h3>
              <div className="w-12 h-0.5 bg-linear-to-r from-accent to-transparent" />
            </div>

            {/* Layout: vertical list */}
            <div className="flex flex-col gap-8">
              {categories.slice(1).map((category) => {
                const categorySkills = skillList.filter(
                  (s) => s.category === category,
                );
                const topSkills = categorySkills.slice(0, 3);

                return (
                  <motion.div
                    key={category}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className={`transition-opacity duration-300 ${
                      activeCategory === category || activeCategory === "All"
                        ? "opacity-100"
                        : "opacity-30"
                    }`}
                  >
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                      {category}
                    </p>
                    <div className="flex gap-2">
                      {topSkills.map((skill, idx) => (
                        <motion.div
                          key={skill.name}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{
                            duration: 0.3,
                            delay: idx * 0.1,
                          }}
                          className="relative group cursor-pointer"
                        >
                          <div className="w-12 h-12 border border-default-border bg-background hover:bg-accent-third hover:border-accent transition-all duration-300 flex items-center justify-center rounded-sm">
                            <img
                              src={skill.path}
                              alt={skill.name}
                              className="w-6 h-6"
                            />
                          </div>
                          <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileHover={{ opacity: 1, scale: 1 }}
                            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-accent text-background text-xs font-medium rounded whitespace-nowrap pointer-events-none z-50"
                          >
                            {skill.name}
                          </motion.div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <div className="mt-auto pt-4 md:pt-6 border-t border-default-border">
              <p className="text-xs text-gray-500 leading-relaxed">
                Click on categories to filter all skills
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </ContentLayout>
  );
};

export default Skills;
