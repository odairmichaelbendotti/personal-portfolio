import { useState, useEffect, useRef } from "react";
import ContentLayout from "./Layout/ContentLayout";
import MobileSectionHeader from "./Layout/MobileSectionHeader";
import { motion, AnimatePresence } from "motion/react";
import { DURATION, EASE, WordReveal } from "../motion";

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

const TYPING_DELAY_MS = 750;

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
  const num = String(question.id).padStart(2, "0");

  return (
    <motion.button
      layout
      type="button"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8, x: -10 }}
      transition={{
        duration: DURATION.fast,
        ease: EASE,
        delay: index * 0.06,
        layout: { duration: DURATION.base, ease: EASE },
      }}
      onClick={onSelect}
      disabled={disabled}
      className="group flex items-center gap-1.5 px-3 py-1.5 border rounded-sm font-mono text-[10px] transition-colors duration-200 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed border-default-border bg-background light:bg-card-background text-text-code hover:border-accent/50 hover:bg-accent/5 hover:text-accent"
    >
      <span className="relative inline-block w-4 shrink-0">
        <span className="absolute inset-0 flex items-center justify-center text-accent opacity-0 -translate-x-1 transition-all duration-150 group-hover:opacity-100 group-hover:translate-x-0">
          →
        </span>
        <span className="flex items-center justify-center text-accent/60 transition-opacity duration-150 group-hover:opacity-0">
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
  const transcriptRef = useRef<HTMLDivElement>(null);
  const typingTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Rola só o contêiner do transcript — scrollIntoView arrastava a página inteira no mobile
  useEffect(() => {
    const el = transcriptRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [transcript, isTyping]);

  useEffect(() => () => {
    if (typingTimer.current) clearTimeout(typingTimer.current);
  }, []);

  const handleSelect = (question: (typeof chatData.questions)[0]) => {
    setIsTyping(true);
    setAvailableQuestions((prev) => prev.filter((q) => q.id !== question.id));

    typingTimer.current = setTimeout(() => {
      typingTimer.current = null;
      setTranscript((prev) => [
        ...prev,
        { id: question.id, question: question.question, answer: question.answer },
      ]);
      setIsTyping(false);
    }, TYPING_DELAY_MS);
  };

  const handleReset = () => {
    if (typingTimer.current) {
      clearTimeout(typingTimer.current);
      typingTimer.current = null;
    }
    setTranscript([]);
    setIsTyping(false);
    setPillKey((k) => k + 1);
    setAvailableQuestions(chatData.questions);
  };

  const answeredCount = chatData.questions.length - availableQuestions.length;

  return (
    <ContentLayout>
      <div className="h-full w-full flex flex-col overflow-hidden bg-content-bg pb-20 md:pb-0">

        <MobileSectionHeader
          index="01"
          title="About"
          aside={
            <>
              <span className="font-mono text-sm font-bold text-accent tabular-nums">{answeredCount}/5</span>
              <span className="font-mono text-[10px] text-text-secondary ml-1">respondidas</span>
            </>
          }
        />

        {/* Greeting + pills */}
        <motion.div
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: DURATION.base, ease: EASE }}
          className="shrink-0 px-4 sm:px-6 pt-5 pb-4 flex flex-col gap-4"
        >
          {/* Greeting message */}
          <div className="border-l-2 border-accent bg-accent/10 px-3 py-2 rounded-sm">
            <span className="font-mono text-[10px] text-text-secondary mr-2">//</span>
            <WordReveal
              text={chatData.greeting}
              delay={0.15}
              className="text-xs text-text-code leading-relaxed"
            />
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

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: DURATION.slow, ease: EASE, delay: 0.3 }}
            className="h-px origin-left bg-linear-to-r from-accent/30 via-default-border to-transparent"
          />
        </motion.div>

        {/* Transcript */}
        <motion.div
          ref={transcriptRef}
          role="log"
          aria-live="polite"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: DURATION.base, delay: 0.12, ease: EASE }}
          className="flex-1 overflow-y-auto scrollbar-hide px-4 sm:px-6 py-3 flex flex-col gap-3"
        >
          {transcript.length === 0 && !isTyping && (
            <div className="flex-1 flex items-center justify-center">
              <p className="text-xs font-mono text-text-secondary/50">
                <span className="text-accent motion-safe:animate-pulse">▍</span>
                {" "}aguardando seleção
              </p>
            </div>
          )}

          {transcript.map((entry, i) => (
            <div key={entry.id} className="flex flex-col gap-0">
              {i > 0 && <hr className="border-default-border/20 mb-3" />}
              <motion.div
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: DURATION.base, ease: EASE }}
                className="bg-accent/5 border-l-2 border-accent px-3 py-2 rounded-sm"
              >
                <span className="font-mono text-xs">
                  <span className="text-accent mr-2">&gt;</span>
                  <span className="text-text-primary">{entry.question}</span>
                </span>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: DURATION.base, ease: EASE, delay: 0.12 }}
                className="border-l border-default-border/30 px-3 py-2"
              >
                <span className="font-mono text-[10px] text-text-secondary mr-2">//</span>
                <span className="text-text-code text-xs leading-relaxed">{entry.answer}</span>
              </motion.div>
            </div>
          ))}

          {isTyping && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-accent/5 border-l-2 border-accent px-3 py-2 rounded-sm"
            >
              <span className="font-mono text-xs text-accent">
                &gt; <span className="motion-safe:animate-pulse">▍</span>
              </span>
            </motion.div>
          )}
        </motion.div>

        {/* Footer */}
        <div className="shrink-0 border-t border-default-border/40 px-4 sm:px-6 py-2.5 flex items-center justify-between">
          <span className="text-[10px] text-text-secondary font-mono tabular-nums">
            {answeredCount}/{chatData.questions.length} respondidas
          </span>
          <button
            type="button"
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
