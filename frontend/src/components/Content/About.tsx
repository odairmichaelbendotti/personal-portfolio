import { useState, useEffect, useRef } from "react";
import ContentLayout from "./Layout/ContentLayout";
import { motion, AnimatePresence } from "motion/react";

const chatData = {
  greeting: "Olá! Sou Odair, desenvolvedor full stack com 6+ anos de experiência criando soluções digitais excepcionais.",
  questions: [
    {
      id: 1,
      label: "Especialidade",
      question: "Qual é sua especialidade?",
      answer: "Minha especialidade está em transformar requisitos complexos em sistemas elegantes e performáticos, mantendo o código limpo e facilitando futuras manutenções.",
    },
    {
      id: 2,
      label: "Stack",
      question: "Em quais tecnologias você trabalha?",
      answer: "Trabalho com React/Next.js no frontend, Node.js no backend, TypeScript, banco de dados, Docker e CI/CD. Tenho experiência completa em full stack.",
    },
    {
      id: 3,
      label: "Abordagem",
      question: "Como você aborda um novo projeto?",
      answer: "Começo entendendo os requisitos e o contexto, desenho a arquitetura focando em escalabilidade, depois implemento com code review e testes. Sempre pensando no usuário final.",
    },
    {
      id: 4,
      label: "Filosofia",
      question: "Qual é sua filosofia de desenvolvimento?",
      answer: "Código limpo, legível e testável. Toda decisão técnica deve considerar manutenibilidade futura e impacto na experiência do usuário. Aprendizado contínuo é fundamental.",
    },
    {
      id: 5,
      label: "Projetos",
      question: "Quantos projetos você já desenvolveu?",
      answer: "Mais de 50 projetos concluídos, desde MVPs até aplicações em produção com milhares de usuários. Cada projeto me ensinou algo novo.",
    },
  ],
};

type TranscriptEntry = {
  id: number;
  question: string;
  answer: string;
};

const QuestionPill = ({
  question,
  index,
  onSelect,
  disabled,
}: {
  question: (typeof chatData.questions)[0];
  index: number;
  onSelect: () => void;
  disabled: boolean;
}) => {
  const [hovered, setHovered] = useState(false);
  const num = String(question.id).padStart(2, "0");

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8, x: -10 }}
      transition={{ duration: 0.2, delay: index * 0.06 }}
      onClick={onSelect}
      disabled={disabled}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`flex items-center gap-1.5 px-3 py-1.5 border rounded-sm font-mono text-[10px] transition-all duration-200 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed ${
        hovered
          ? "border-accent/50 bg-accent/5 text-accent"
          : "border-default-border bg-background text-gray-300"
      }`}
    >
      <span className="relative inline-block w-4 shrink-0">
        <span className={`absolute inset-0 flex items-center justify-center transition-all duration-150 ${hovered ? "opacity-100" : "opacity-0"} text-accent`}>
          →
        </span>
        <span className={`flex items-center justify-center transition-all duration-150 ${hovered ? "opacity-0" : "opacity-100"} text-accent/60`}>
          {num}
        </span>
      </span>
      <span>{question.label}</span>
    </motion.button>
  );
};

const About = () => {
  const [transcript, setTranscript] = useState<TranscriptEntry[]>([]);
  const [availableQuestions, setAvailableQuestions] = useState(chatData.questions);
  const [isTyping, setIsTyping] = useState(false);
  const [pillKey, setPillKey] = useState(0);
  const transcriptEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    transcriptEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [transcript, isTyping]);

  const handleSelect = (question: (typeof chatData.questions)[0]) => {
    setIsTyping(true);
    setAvailableQuestions((prev) => prev.filter((q) => q.id !== question.id));

    setTimeout(() => {
      setTranscript((prev) => [
        ...prev,
        { id: question.id, question: question.question, answer: question.answer },
      ]);
      setIsTyping(false);
    }, 750);
  };

  const handleReset = () => {
    setTranscript([]);
    setIsTyping(false);
    setPillKey((k) => k + 1);
    setAvailableQuestions(chatData.questions);
  };

  const answeredCount = chatData.questions.length - availableQuestions.length;

  return (
    <ContentLayout>
      <div className="h-full w-full flex flex-col overflow-hidden bg-background pb-20 md:pb-0">

        {/* Greeting + pills */}
        <motion.div
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          className="shrink-0 px-4 sm:px-6 pt-5 pb-4 flex flex-col gap-4"
        >
          {/* Greeting message */}
          <div className="border-l-2 border-accent bg-accent/5 px-3 py-2 rounded-sm">
            <span className="font-mono text-[10px] text-text-secondary mr-2">//</span>
            <span className="text-xs text-gray-300 leading-relaxed">{chatData.greeting}</span>
          </div>

          {/* Pills inline */}
          <div className="flex flex-col gap-2">
            <p className="font-mono text-[9px] text-accent/40 uppercase tracking-widest">
              // perguntas
            </p>
            <div className="flex flex-wrap gap-2">
              <AnimatePresence mode="popLayout">
                {availableQuestions.map((q, i) => (
                  <QuestionPill
                    key={`${pillKey}-${q.id}`}
                    question={q}
                    index={i}
                    onSelect={() => handleSelect(q)}
                    disabled={isTyping}
                  />
                ))}
              </AnimatePresence>

              {availableQuestions.length === 0 && !isTyping && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-[10px] font-mono text-text-secondary italic"
                >
                  // todas as perguntas respondidas
                </motion.p>
              )}
            </div>
          </div>

          <div className="h-px bg-linear-to-r from-accent/30 via-default-border to-transparent" />
        </motion.div>

        {/* Transcript */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.12, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex-1 overflow-y-auto scrollbar-hide px-4 sm:px-6 py-3 flex flex-col gap-3"
        >
          {transcript.length === 0 && !isTyping && (
            <div className="flex-1 flex items-center justify-center">
              <p className="text-xs font-mono text-text-secondary/50">
                <span className="text-accent animate-pulse">▍</span>
                {" "}aguardando seleção
              </p>
            </div>
          )}

          <AnimatePresence>
            {transcript.map((entry, i) => (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.25 }}
                className="flex flex-col gap-0"
              >
                {i > 0 && <hr className="border-default-border/20 mb-3" />}
                <div className="bg-accent/5 border-l-2 border-accent px-3 py-2 rounded-sm">
                  <span className="font-mono text-xs">
                    <span className="text-accent mr-2">&gt;</span>
                    <span className="text-white">{entry.question}</span>
                  </span>
                </div>
                <div className="border-l border-default-border/30 px-3 py-2">
                  <span className="font-mono text-[10px] text-text-secondary mr-2">//</span>
                  <span className="text-gray-300 text-xs leading-relaxed">{entry.answer}</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {isTyping && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-accent/5 border-l-2 border-accent px-3 py-2 rounded-sm"
            >
              <span className="font-mono text-xs text-accent">
                &gt; <span className="animate-pulse">▍</span>
              </span>
            </motion.div>
          )}

          <div ref={transcriptEndRef} />
        </motion.div>

        {/* Footer */}
        <div className="shrink-0 border-t border-default-border/40 px-4 sm:px-6 py-2.5 flex items-center justify-between">
          <span className="text-[10px] text-text-secondary font-mono">
            {answeredCount}/{chatData.questions.length} respondidas
          </span>
          <button
            onClick={handleReset}
            className="text-[10px] font-mono text-accent/50 hover:text-accent transition-colors cursor-pointer"
          >
            ↺ reiniciar
          </button>
        </div>

      </div>
    </ContentLayout>
  );
};

export default About;
