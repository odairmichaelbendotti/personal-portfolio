import { useState } from "react";
import ContentLayout from "./Layout/ContentLayout";
import { motion, AnimatePresence } from "motion/react";
import CornerBox from "../CornerBox";

type ViewMode = "Overview" | "Expertise" | "Philosophy";

const viewModes: ViewMode[] = ["Overview", "Expertise", "Philosophy"];

const overviewData = {
  title: "Olá, sou Odair",
  subtitle: "Full Stack Developer",
  years: 6,
  location: "Brasil",
  focus:
    "Criando experiências digitais excepcionais através de código elegante e inovador",
};

const expertiseAreas = [
  {
    title: "Arquitetura",
    description:
      "Design de sistemas escaláveis e mantíveis com padrões modernos",
    items: ["SOLID", "Microserviços", "Clean Architecture"],
  },
  {
    title: "Frontend",
    description: "Interfaces responsivas e dinâmicas com melhor UX",
    items: ["React/Next.js", "TypeScript", "State Management"],
  },
  {
    title: "Backend",
    description: "APIs robustas e performáticas com segurança em foco",
    items: ["Node.js", "Database Design", "REST/GraphQL"],
  },
  {
    title: "DevOps",
    description: "Infraestrutura moderna para deployment contínuo",
    items: ["Docker", "CI/CD", "Cloud Platforms"],
  },
];

const philosophyPoints = [
  {
    label: "Código Limpo",
    description:
      "Escrevo código que é legível, mantível e testável, seguindo as melhores práticas",
  },
  {
    label: "User First",
    description:
      "Toda decisão técnica considera o impacto na experiência do usuário final",
  },
  {
    label: "Performance",
    description:
      "Otimização constante para garantir velocidade e eficiência em cada linha",
  },
  {
    label: "Aprendizado",
    description:
      "Busco crescimento contínuo estudando tendências e tecnologias emergentes",
  },
];

const CornerBorders = ({ isActive }: { isActive: boolean }) => (
  <>
    <motion.span
      className="absolute top-0 left-0 w-2 h-2 border-t border-l border-accent"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: isActive ? 1 : 0, scale: isActive ? 1 : 0.5 }}
      transition={{ duration: 0.2 }}
    />
    <motion.span
      className="absolute top-0 right-0 w-2 h-2 border-t border-r border-accent"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: isActive ? 1 : 0, scale: isActive ? 1 : 0.5 }}
      transition={{ duration: 0.2 }}
    />
    <motion.span
      className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-accent"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: isActive ? 1 : 0, scale: isActive ? 1 : 0.5 }}
      transition={{ duration: 0.2 }}
    />
    <motion.span
      className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-accent"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: isActive ? 1 : 0, scale: isActive ? 1 : 0.5 }}
      transition={{ duration: 0.2 }}
    />
  </>
);

const About = () => {
  const [activeView, setActiveView] = useState<ViewMode>("Overview");
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <ContentLayout>
      <div className="h-full w-full flex flex-col overflow-y-auto">
        <div className="flex-1 p-2 sm:p-3">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="space-y-2"
          >
            {/* HERO SECTION */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="relative border border-default-border bg-linear-to-br from-background via-background to-accent-third/20 p-2 sm:p-4 rounded-sm overflow-hidden"
            >
              {/* Background pattern effect */}
              <motion.div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 20% 50%, rgba(64, 203, 246, 0.1) 0%, transparent 50%)",
                }}
              />

              <div className="relative z-10">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <h1 className="text-2xl sm:text-3xl font-bold text-accent mb-1">
                    {overviewData.title}
                  </h1>
                  <p className="text-sm sm:text-base text-accent-third font-semibold mb-1.5">
                    {overviewData.subtitle}
                  </p>
                  <p className="text-xs text-gray-300 leading-relaxed max-w-2xl mb-2">
                    {overviewData.focus}
                  </p>
                </motion.div>

                {/* Quick stats */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-2 pt-2 border-t border-default-border/50"
                >
                  <div>
                    <p className="text-lg sm:text-xl font-bold text-accent">
                      {overviewData.years}+
                    </p>
                    <p className="text-xs text-gray-400">Anos de Experiência</p>
                  </div>
                  <div>
                    <p className="text-lg sm:text-xl font-bold text-accent">
                      50+
                    </p>
                    <p className="text-xs text-gray-400">Projetos Concluídos</p>
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <p className="text-base sm:text-lg font-bold text-accent">
                      {overviewData.location}
                    </p>
                    <p className="text-xs text-gray-400">Localização</p>
                  </div>
                </motion.div>
              </div>

              <CornerBorders isActive={true} />
            </motion.div>

            {/* TAB NAVIGATION */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex gap-2 sm:gap-3 border-b border-default-border pb-2"
            >
              {viewModes.map((mode, index) => (
                <motion.button
                  key={mode}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.35 + index * 0.08 }}
                  onClick={() => setActiveView(mode)}
                  className={`relative px-3 sm:px-4 py-3 text-sm font-bold transition-colors duration-300 ${
                    activeView === mode
                      ? "text-accent"
                      : "text-gray-400 hover:text-gray-300"
                  }`}
                >
                  {mode}
                  {activeView === mode && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 right-0 h-1 bg-accent"
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </motion.button>
              ))}
            </motion.div>

            {/* CONTENT SECTION */}
            <AnimatePresence mode="wait">
              {activeView === "Overview" && (
                <motion.div
                  key="overview"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-2"
                >
                  {/* Main Card */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="border border-default-border bg-background p-3 sm:p-4 rounded-sm"
                  >
                    <h2 className="text-base sm:text-lg font-bold text-accent mb-2">
                      Sobre Minha Jornada
                    </h2>
                    <div className="space-y-2 text-xs sm:text-sm text-gray-300 leading-relaxed">
                      <p>
                        Como desenvolvedor Full Stack, meu objetivo é criar
                        soluções que combinam
                        <span
                          className="ml-1 inline-block px-2 py-0.5 rounded-sm text-xs font-semibold"
                          style={{
                            backgroundColor: "#0a0f05",
                            color: "#8fd952",
                          }}
                        >
                          excelência técnica
                        </span>
                        com experiência excepcional do usuário.
                      </p>
                      <p>
                        Tenho experiência em todas as camadas:
                        <span
                          className="ml-1 inline-block px-2 py-0.5 rounded-sm text-xs font-semibold"
                          style={{
                            backgroundColor: "#0a1a2e",
                            color: "#40cbf6",
                          }}
                        >
                          backend escalável
                        </span>
                        <span
                          className="ml-1 inline-block px-2 py-0.5 rounded-sm text-xs font-semibold"
                          style={{
                            backgroundColor: "#0a0f05",
                            color: "#8fd952",
                          }}
                        >
                          interfaces responsivas
                        </span>
                        e otimização de infraestrutura.
                      </p>
                    </div>
                  </motion.div>

                  {/* Key Points */}
                  {/* <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    className="grid grid-cols-1 sm:grid-cols-2 gap-2"
                  >
                    {[
                      {
                        label: "Foco",
                        value: "Full Stack",
                        color: "#40cbf6",
                        bg: "#0a1a2e",
                      },
                      {
                        label: "Especialidade",
                        value: "Arquitetura",
                        color: "#8fd952",
                        bg: "#0a0f05",
                      },
                      {
                        label: "Metodologia",
                        value: "Clean Code",
                        color: "#40cbf6",
                        bg: "#0a1a2e",
                      },
                      {
                        label: "Objetivo",
                        value: "Impacto Real",
                        color: "#8fd952",
                        bg: "#0a0f05",
                      },
                    ].map((point, index) => (
                      <motion.div
                        key={point.label}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          duration: 0.3,
                          delay: 0.15 + index * 0.06,
                        }}
                        className="border border-default-border bg-background p-2.5 sm:p-3 rounded-sm"
                      >
                        <p className="text-xs text-gray-400 mb-1">
                          {point.label}
                        </p>
                        <p
                          className="font-bold text-xs inline-block px-2.5 py-0.5 rounded-sm"
                          style={{
                            backgroundColor: point.bg,
                            color: point.color,
                          }}
                        >
                          {point.value}
                        </p>
                      </motion.div>
                    ))}
                  </motion.div> */}

                  {/* Bottom Text */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                    className="border border-default-border bg-background p-3 sm:p-4 rounded-sm"
                  >
                    <p className="text-xs sm:text-sm text-gray-300 leading-relaxed italic">
                      Minha especialidade está em transformar requisitos
                      complexos em sistemas elegantes e performáticos,
                      <span
                        className="ml-1 inline-block px-2 py-0.5 rounded-sm text-xs font-semibold"
                        style={{ backgroundColor: "#0a0f05", color: "#8fd952" }}
                      >
                        mantendo o código limpo
                      </span>
                      e facilitando futuras manutenções.
                    </p>
                  </motion.div>
                </motion.div>
              )}

              {activeView === "Expertise" && (
                <motion.div
                  key="expertise"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-3"
                >
                  {expertiseAreas.map((area, index) => (
                    <motion.div
                      key={area.title}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.08 }}
                      onMouseEnter={() => setHoveredIndex(index)}
                      onMouseLeave={() => setHoveredIndex(null)}
                      className="group relative border border-default-border bg-background p-3 sm:p-4 rounded-sm transition-all duration-300 hover:bg-accent-third/10 hover:border-accent/50"
                    >
                      <CornerBorders isActive={hoveredIndex === index} />
                      <h3 className="text-sm sm:text-base font-bold text-accent mb-1">
                        {area.title}
                      </h3>
                      <p className="text-xs text-gray-400 mb-2">
                        {area.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {area.items.map((item) => (
                          <motion.span
                            key={item}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.2 }}
                            className="text-xs px-3 py-1 rounded-sm font-semibold"
                            style={{
                              backgroundColor: "#0a0f05",
                              color: "#8fd952",
                            }}
                          >
                            {item}
                          </motion.span>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}

              {activeView === "Philosophy" && (
                <motion.div
                  key="philosophy"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-2"
                >
                  {philosophyPoints.map((point, index) => (
                    <motion.div
                      key={point.label}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.08 }}
                      className="group relative border border-default-border bg-background p-3 sm:p-4 rounded-sm transition-all duration-300 hover:bg-accent-third/10"
                    >
                      <CornerBorders isActive={hoveredIndex === index} />
                      <div className="flex gap-2">
                        <div className="w-1 bg-linear-to-b from-accent via-accent to-transparent rounded-full" />
                        <div className="flex-1">
                          <h3 className="text-sm sm:text-base font-bold text-accent mb-1">
                            {point.label}
                          </h3>
                          <p className="text-xs text-gray-300 leading-relaxed">
                            {point.description}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </ContentLayout>
  );
};

export default About;
