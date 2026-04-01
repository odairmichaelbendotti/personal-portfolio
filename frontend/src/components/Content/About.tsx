import { useState, useEffect, useRef } from "react";
import ContentLayout from "./Layout/ContentLayout";
import { motion, AnimatePresence } from "motion/react";
import { MessageCircle } from "lucide-react";

const chatData = {
  greeting:
    "Olá! Sou Odair, desenvolvedor full stack com 6+ anos de experiência criando soluções digitais excepcionais.",
  questions: [
    {
      id: 1,
      question: "Qual é sua especialidade?",
      answer:
        "Minha especialidade está em transformar requisitos complexos em sistemas elegantes e performáticos, mantendo o código limpo e facilitando futuras manutenções.",
    },
    {
      id: 2,
      question: "Em quais tecnologias você trabalha?",
      answer:
        "Trabalho com React/Next.js no frontend, Node.js no backend, TypeScript, banco de dados, Docker e CI/CD. Tenho experiência completa em full stack.",
    },
    {
      id: 3,
      question: "Como você aborda um novo projeto?",
      answer:
        "Começo entendendo os requisitos e o contexto, desenho a arquitetura focando em escalabilidade, depois implemento com code review e testes. Sempre pensando no usuário final.",
    },
    {
      id: 4,
      question: "Qual é sua filosofia de desenvolvimento?",
      answer:
        "Código limpo, legível e testável. Toda decisão técnica deve considerar manutenibilidade futura e impacto na experiência do usuário. Aprendizado contínuo é fundamental.",
    },
    {
      id: 5,
      question: "Quantos projetos você já desenvolveu?",
      answer:
        "Mais de 50 projetos concluídos, desde MVPs até aplicações em produção com milhares de usuários. Cada projeto me ensinou algo novo.",
    },
  ],
};

const TypingAnimation = () => (
  <motion.div className="flex gap-1">
    {[0, 1, 2].map((i) => (
      <motion.div
        key={i}
        className="w-2 h-2 bg-accent rounded-full"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.1 }}
      />
    ))}
  </motion.div>
);

const About = () => {
  const [messages, setMessages] = useState<
    Array<{ type: "bot" | "user"; text: string }>
  >([]);
  const [availableQuestions, setAvailableQuestions] = useState<
    typeof chatData.questions
  >(chatData.questions);
  const [isLoadingGreeting, setIsLoadingGreeting] = useState(true);
  const [isLoadingResponse, setIsLoadingResponse] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll automático para o final do chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoadingResponse]);

  // Carrega saudação ao montar o componente (sempre reinicia as perguntas)
  useEffect(() => {
    const timer = setTimeout(() => {
      setMessages([{ type: "bot", text: chatData.greeting }]);
      setIsLoadingGreeting(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleSelectQuestion = (question: (typeof chatData.questions)[0]) => {
    // Add user message
    setMessages((prev) => [...prev, { type: "user", text: question.question }]);

    // Show loading
    setIsLoadingResponse(true);

    // Simulate typing delay
    setTimeout(() => {
      setMessages((prev) => [...prev, { type: "bot", text: question.answer }]);

      // Update available questions
      const updatedQuestions = availableQuestions.filter(
        (q) => q.id !== question.id,
      );
      setAvailableQuestions(updatedQuestions);

      setIsLoadingResponse(false);
    }, 800);
  };

  const handleResetChat = () => {
    // Reset state
    setMessages([{ type: "bot", text: chatData.greeting }]);
    setAvailableQuestions(chatData.questions);
    setIsLoadingGreeting(false);
    setIsLoadingResponse(false);
  };

  return (
    <ContentLayout>
      <div className="h-full w-full flex flex-col overflow-hidden bg-background">
        {/* HERO SECTION - Compact */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="px-2 sm:px-3 pt-2 pb-1.5 border-b border-default-border/50"
        >
          <div className="relative border border-default-border bg-linear-to-br from-background via-background to-accent-third/10 p-2.5 sm:p-3 rounded-sm overflow-hidden">
            <motion.div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 20% 50%, rgba(64, 203, 246, 0.1) 0%, transparent 50%)",
              }}
            />

            <div className="relative z-10 flex items-center justify-between gap-3">
              <div className="flex-1 min-w-0">
                <h1 className="text-xl sm:text-2xl font-bold text-accent leading-tight">
                  Olá, sou Odair
                </h1>
                <p className="text-xs sm:text-sm text-gray-300 mt-0.5 truncate">
                  6+ anos criando experiências digitais • Brasil
                </p>
              </div>

              {/* Icon Placeholder */}
              <motion.button
                onClick={handleResetChat}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-sm border border-accent/30 bg-accent/5 flex items-center justify-center hover:border-accent/50 hover:bg-accent/10 transition-all duration-300 cursor-pointer"
                title="Resetar conversa"
              >
                <motion.div
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <MessageCircle
                    className="w-6 h-6 sm:w-7 sm:h-7 text-accent"
                    strokeWidth={1.5}
                  />
                </motion.div>
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* CHAT SECTION */}
        <div className="flex-1 flex flex-col overflow-hidden p-2 sm:p-3 gap-2 pb-20 sm:pb-4">
          {/* Messages Container */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="flex-1 flex flex-col gap-2.5 overflow-y-auto scrollbar-hide"
          >
            <AnimatePresence>
              {isLoadingGreeting && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="px-3 py-2 rounded-sm border border-accent/30 bg-accent/10">
                    <TypingAnimation />
                  </div>
                </motion.div>
              )}
              {messages.map((msg, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${msg.type === "bot" ? "justify-start" : "justify-end"}`}
                >
                  <div
                    className={`max-w-sm sm:max-w-lg px-3 py-2 rounded-sm text-xs sm:text-sm leading-relaxed border ${
                      msg.type === "bot"
                        ? "bg-accent/10 border-accent/30 text-gray-200"
                        : "bg-green-500/20 border-green-500/50 text-white"
                    }`}
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {isLoadingResponse && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-start"
              >
                <div className="px-3 py-2 rounded-sm border border-accent/30 bg-accent/10">
                  <TypingAnimation />
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </motion.div>

          {/* Questions Container */}
          <AnimatePresence>
            {availableQuestions.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-2 border-t border-default-border/50 pt-2"
              >
                {availableQuestions.slice(0, 4).map((question, idx) => (
                  <motion.button
                    key={question.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: idx * 0.05 }}
                    onClick={() => handleSelectQuestion(question)}
                    disabled={isLoadingResponse}
                    className="group relative text-left p-2.5 text-xs sm:text-xs border border-default-border bg-background rounded-sm transition-all duration-300 hover:border-accent/50 hover:bg-accent/5 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <p className="font-semibold text-gray-200 group-hover:text-accent transition-colors line-clamp-2">
                      {question.question}
                    </p>
                  </motion.button>
                ))}
              </motion.div>
            )}

            {availableQuestions.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center justify-center py-2"
              >
                <p className="text-xs sm:text-sm text-gray-400 italic">
                  Você explorou todas as minhas áreas! 🚀
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </ContentLayout>
  );
};

export default About;
