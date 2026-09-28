import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  BellRing, Boxes, CalendarClock, Calculator, ChevronRight, Container, FileSpreadsheet,
  FlaskConical, Gauge, PackageSearch, Rocket, ShieldCheck, Wallet,
  type LucideIcon,
} from "lucide-react";
import ContentLayout from "./Layout/ContentLayout";
import MobileSectionHeader from "./Layout/MobileSectionHeader";
import { CountUp, DURATION, EASE, SPRING } from "../motion";

type Deliverable = {
  id: string;
  area: string;
  icon: LucideIcon;
  // Só para conquistas medidas: valor depois e antes, exibidos em destaque no detalhe
  highlight?: { after: string; before: string };
  headline: string;
  result: string;
  context: string;
  impact: string[];
  stack: string[];
};

type Track = {
  id: "fab" | "produtos";
  role: string;
  org: string;
  tag: string;
  period: string;
  heading: string;
  prompt: string;
  deliverables: Deliverable[];
};

const tracks: Track[] = [
  {
    id: "fab",
    role: "Engenharia de Software",
    org: "Força Aérea Brasileira",
    tag: "Setor público · Defesa",
    period: "6+ anos · atual",
    heading: "Principais conquistas",
    prompt: "Selecione uma conquista para ver os detalhes.",
    deliverables: [
      {
        id: "perf-1",
        area: "Performance",
        icon: Boxes,
        highlight: { after: "350ms", before: "900ms" },
        headline: "Monolito para microsserviços",
        result: "Latência de 900ms para 350ms e 3× mais requisições simultâneas, sem downtime.",
        context: "O sistema backend enfrentava gargalos críticos de escalabilidade sob carga real. A migração para microsserviços com Clean Architecture e DDD permitiu isolar responsabilidades, escalar serviços individualmente e introduzir filas assíncronas para operações pesadas. A refatoração foi feita de forma incremental, sem downtime.",
        impact: [
          "3× mais requisições simultâneas suportadas",
          "Latência de resposta: 900ms → 350ms",
          "Downtime zero durante a migração",
          "Deploys independentes por serviço",
        ],
        stack: ["Node.js", "TypeScript", "AWS", "Docker"],
      },
      {
        id: "perf-2",
        area: "Performance",
        icon: Gauge,
        highlight: { after: "< 2s", before: "12s" },
        headline: "Módulo financeiro mais rápido",
        result: "O painel que levava 12s passou a carregar em menos de 2s.",
        context: "O painel financeiro carregava dados via queries não otimizadas em banco NoSQL, causando lentidão crítica para os usuários. A migração para PostgreSQL com índices adequados, views materializadas e paginação server-side reduziu drasticamente o tempo de resposta do painel principal.",
        impact: [
          "Tempo de carregamento: 12s → menos de 2s",
          "Queries otimizadas com índices compostos",
          "Paginação server-side eliminando over-fetching",
          "Experiência do usuário significativamente melhorada",
        ],
        stack: ["PostgreSQL", "TypeScript", "Node.js"],
      },
      {
        id: "devops-1",
        area: "Automação",
        icon: Rocket,
        highlight: { after: "12min", before: "2h" },
        headline: "Deploy automatizado",
        result: "Publicação caiu de 2h para 12 minutos, sem intervenção manual.",
        context: "O processo de publicação era manual, propenso a erros e dependente de um único desenvolvedor. O pipeline implementado com GitHub Actions automatiza build, execução de testes, criação de imagem Docker e deploy em AWS, com rollback automático em caso de falha nos testes.",
        impact: [
          "Tempo de publicação: 2h → 12 minutos",
          "Zero intervenção manual no processo de deploy",
          "Rollback automático em falhas de teste",
          "Histórico completo de deploys auditável",
        ],
        stack: ["GitHub Actions", "Node.js", "Next.js", "Docker", "AWS"],
      },
      {
        id: "devops-3",
        area: "Automação",
        icon: FileSpreadsheet,
        headline: "Relatórios financeiros automáticos",
        result: "Cerca de 13 horas por semana devolvidas à equipe financeira.",
        context: "A equipe financeira gastava mais de 13 horas semanais consolidando dados manualmente em planilhas, com alto risco de erros humanos. O sistema automatizado coleta, processa e gera relatórios em PDF/Excel com agendamento configurável, notificando os responsáveis por e-mail ao concluir.",
        impact: [
          "~13 horas semanais devolvidas à equipe",
          "Erros de consolidação manual eliminados",
          "Relatórios gerados com agendamento automático",
          "Notificação por e-mail ao concluir geração",
        ],
        stack: ["Node.js", "TypeScript", "PostgreSQL"],
      },
      {
        id: "test-1",
        area: "Qualidade",
        icon: FlaskConical,
        headline: "Cultura de testes",
        result: "60% de cobertura com Jest, rodando no CI antes de cada deploy.",
        context: "O projeto não tinha cultura de testes estabelecida, resultando em regressões frequentes em produção. A implementação de testes unitários para regras de negócio críticas e testes de integração para os principais fluxos de API, combinada com a execução automática no pipeline de CI, criou uma rede de segurança que detecta problemas antes do deploy.",
        impact: [
          "60% de cobertura de testes automatizados",
          "Regressões detectadas automaticamente no CI",
          "Confiabilidade aumentada em produção",
          "Refatorações seguras com cobertura garantida",
        ],
        stack: ["Jest", "TypeScript", "Node.js"],
      },
      {
        id: "api-1",
        area: "Sistemas",
        icon: Calculator,
        headline: "Orçamento de obras em segundos",
        result: "Estimativa de custos integrada à base SINAPI, antes feita à mão em horas.",
        context: "Orçamentos de construção civil eram elaborados manualmente com tabelas desatualizadas, levando horas e gerando propostas imprecisas. O módulo integra-se à base de dados SINAPI (governo federal) para busca de insumos e composições, calcula automaticamente BDI e aplica regionalizações, entregando estimativas precisas em segundos.",
        impact: [
          "Tempo de elaboração: horas → segundos",
          "Integração com base SINAPI atualizada",
          "Cálculo automático de BDI e regionalização",
          "Aumento significativo na precisão dos orçamentos",
        ],
        stack: ["Node.js", "TypeScript", "PostgreSQL", "React"],
      },
      {
        id: "api-2",
        area: "Sistemas",
        icon: BellRing,
        headline: "Notificações em tempo real",
        result: "WebSockets no lugar de polling a cada 30s, com reconexão automática.",
        context: "O sistema anterior usava polling a cada 30 segundos para verificar novas notificações, causando carga desnecessária no servidor e atraso nas atualizações. A migração para WebSockets com Node.js garante que todos os usuários conectados recebam atualizações instantâneas e sincronizadas, com reconexão automática em caso de queda.",
        impact: [
          "Latência de notificação: 30s → instantânea",
          "Carga de servidor reduzida com eliminação do polling",
          "Reconexão automática com backoff exponencial",
          "Suporte a múltiplas abas/sessões simultâneas",
        ],
        stack: ["WebSockets", "Node.js", "TypeScript", "React", "Next.js"],
      },
      {
        id: "api-3",
        area: "Sistemas",
        icon: ShieldCheck,
        headline: "API de pagamentos rastreável",
        result: "Transações idempotentes e auditáveis, com extrato em menos de 100ms.",
        context: "A API de pagamentos precisava suportar múltiplas transações simultâneas com garantia de consistência e rastreabilidade total. A arquitetura usa padrão de eventos para auditoria, transações idempotentes para evitar duplicidade e índices otimizados no MongoDB para consultas de extrato em alta velocidade.",
        impact: [
          "Suporte a múltiplas transações simultâneas",
          "Rastreabilidade financeira completa via event log",
          "Idempotência garantida — sem duplicidade de cobranças",
          "Consultas de extrato em < 100ms",
        ],
        stack: ["Node.js", "TypeScript", "MongoDB"],
      },
      {
        id: "devops-2",
        area: "Automação",
        icon: Container,
        headline: "Ambientes idênticos com Docker",
        result: "Fim dos bugs exclusivos de produção e onboarding em minutos.",
        context: "Falhas recorrentes em produção eram causadas por diferenças entre ambientes de desenvolvimento e produção. A containerização completa da stack com Docker Compose para desenvolvimento e imagens otimizadas para produção eliminou essa classe de problema, além de simplificar o onboarding de novos desenvolvedores.",
        impact: [
          "Ambientes de dev e produção 100% idênticos",
          "Onboarding de novos devs: setup em minutos",
          "Eliminação de bugs exclusivos de produção por config",
          "Portabilidade total da stack",
        ],
        stack: ["Docker", "Docker Compose", "Node.js"],
      },
    ],
  },
  {
    id: "produtos",
    role: "Criador de produtos de software",
    org: "Produtos próprios",
    tag: "SaaS",
    period: "em paralelo",
    heading: "Produtos que criei",
    prompt: "Selecione um produto para ver os detalhes.",
    // TODO: textos provisórios — substituir pelas descrições reais do Finvero e dos outros dois sistemas antes do deploy
    deliverables: [
      {
        id: "finvero",
        area: "Produto · finanças",
        icon: Wallet,
        headline: "Finvero",
        result: "Gestão financeira para pequenos negócios: contas, conciliação bancária e fluxo de caixa.",
        context: "Pequenos negócios controlam o caixa em planilhas soltas, sem visão do que entra e sai nas próximas semanas. O Finvero centraliza os lançamentos, importa extratos para conciliação e projeta o fluxo de caixa.",
        impact: [
          "Conciliação a partir do extrato bancário",
          "Fluxo de caixa projetado por semana",
          "Múltiplas empresas com permissões por usuário",
        ],
        stack: ["Next.js", "Node.js", "TypeScript", "PostgreSQL"],
      },
      {
        id: "produto-agenda",
        area: "Produto · agendamento",
        icon: CalendarClock,
        headline: "Agendamento online",
        result: "Reservas e lembretes automáticos para prestadores de serviço.",
        context: "Prestadores de serviço perdem horários com faltas e confirmações feitas uma a uma por mensagem. A plataforma publica a agenda, recebe reservas e envia lembretes automáticos antes de cada atendimento.",
        impact: [
          "Agenda pública com reserva online",
          "Lembretes automáticos antes do atendimento",
          "Painel de horários em tempo real",
        ],
        stack: ["React", "Node.js", "TypeScript", "MongoDB"],
      },
      {
        id: "produto-estoque",
        area: "Produto · varejo",
        icon: PackageSearch,
        headline: "Controle de estoque",
        result: "Entradas, pedidos e alertas de reposição para o pequeno varejo.",
        context: "Lojas pequenas descobrem a falta de um produto só quando o cliente pede. O sistema registra entradas e saídas, acompanha pedidos a fornecedores e avisa quando um item chega ao estoque mínimo.",
        impact: [
          "Estoque atualizado a cada venda",
          "Alertas de estoque mínimo",
          "Histórico de pedidos por fornecedor",
        ],
        stack: ["Next.js", "PostgreSQL", "Docker"],
      },
    ],
  },
];

const IconTile = ({ Icon, active }: { Icon: LucideIcon; active: boolean }) => (
  <span
    className={`shrink-0 grid place-items-center w-6 h-6 rounded-sm border transition-colors duration-150 ${
      active
        ? "border-default-border bg-accent-third text-accent"
        : "border-transparent text-text-muted group-hover:text-text-secondary"
    }`}
  >
    <Icon size={13} strokeWidth={1.75} />
  </span>
);

const Label = ({ children }: { children: React.ReactNode }) => (
  <p className="mb-1.5 font-mono text-[9px] uppercase tracking-widest text-text-muted">{children}</p>
);

// Resultado em destaque: número "depois" com o "antes" riscado, quando a conquista foi medida
const ResultHighlight = ({ item }: { item: Deliverable }) => (
  <div className="flex items-center gap-4 px-4 py-3.5 rounded-sm border border-default-border bg-card-background light:shadow-xs">
    {item.highlight && (
      <div className="shrink-0 flex flex-col">
        <span className="font-mono text-2xl font-bold text-accent leading-none tracking-tight">{item.highlight.after}</span>
        <span className="mt-1 font-mono text-[10px] text-text-muted">
          antes <s>{item.highlight.before}</s>
        </span>
      </div>
    )}
    <p className="text-xs text-text-secondary leading-relaxed">{item.result}</p>
  </div>
);

const DetailBody = ({ item }: { item: Deliverable }) => (
  <div className="flex flex-col gap-5">
    <ResultHighlight item={item} />
    <div>
      <Label>Contexto</Label>
      <p className="text-xs text-text-secondary leading-relaxed max-w-[62ch]">{item.context}</p>
    </div>
    <div>
      <Label>Impacto</Label>
      <ul className="flex flex-col gap-1.5">
        {item.impact.map((line) => (
          <li key={line} className="flex gap-2 text-xs text-text-code leading-relaxed">
            <span aria-hidden className="text-text-muted">–</span>
            {line}
          </li>
        ))}
      </ul>
    </div>
    <div>
      <Label>Stack</Label>
      <p className="font-mono text-[10px] text-text-muted">{item.stack.join(" · ")}</p>
    </div>
  </div>
);

const Experience = () => {
  const [trackId, setTrackId] = useState<Track["id"]>("fab");
  const [selectedId, setSelectedId] = useState(tracks[0].deliverables[0].id);
  const [openId, setOpenId] = useState<string | null>(null);

  const track = tracks.find((t) => t.id === trackId) ?? tracks[0];
  const selected = track.deliverables.find((d) => d.id === selectedId) ?? track.deliverables[0];

  const selectTrack = (id: Track["id"]) => {
    const next = tracks.find((t) => t.id === id) ?? tracks[0];
    setTrackId(id);
    setSelectedId(next.deliverables[0].id);
    setOpenId(null);
  };

  return (
    <ContentLayout>
      <div className="h-full w-full flex flex-col overflow-hidden bg-content-bg">

        <MobileSectionHeader
          index="03"
          title="Experience"
          aside={
            <>
              <CountUp value={6} suffix="+" delay={0.2} className="font-mono text-sm font-bold text-accent" />
              <span className="font-mono text-[10px] text-text-secondary ml-1">anos</span>
            </>
          }
        />

        {/* Trajetória: uma aba por frente de atuação */}
        <div role="tablist" aria-label="Trajetória" className="shrink-0 flex border-b border-default-border/40 px-2 md:px-3">
          {tracks.map((t) => {
            const isActive = t.id === trackId;
            return (
              <button
                key={t.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => selectTrack(t.id)}
                className={`relative flex items-center gap-2 px-3 py-3 text-xs cursor-pointer transition-colors duration-150 ${
                  isActive ? "text-accent" : "text-text-secondary hover:text-text-primary"
                }`}
              >
                {t.org}
                <span className="font-mono text-[10px] text-accent/50">{t.deliverables.length}</span>
                {isActive && (
                  <motion.span
                    layoutId="experience-track"
                    transition={SPRING}
                    className="absolute -bottom-px left-0 right-0 h-0.5 bg-accent"
                  />
                )}
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={track.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: DURATION.fast, ease: EASE }}
            className="flex-1 min-h-0 flex flex-col"
          >
            {/* Título da seção */}
            <div className="shrink-0 px-5 md:px-6 pt-5 pb-4 border-b border-default-border/60 flex items-end justify-between gap-4">
              <div>
                <h2 className="text-lg md:text-xl font-bold text-text-primary tracking-tight leading-tight">{track.heading}</h2>
                <p className="mt-1 text-xs text-text-secondary">{track.prompt}</p>
              </div>
              <p className="hidden md:block text-right font-mono text-[10px] text-text-muted leading-relaxed">
                {track.role}
                <br />
                {track.org} · {track.period}
              </p>
            </div>

            {/* Desktop: lista à esquerda, conquista selecionada à direita */}
            <div className="hidden md:grid grid-cols-[250px_minmax(0,1fr)] flex-1 min-h-0">
              <div
                role="tablist"
                aria-label={track.heading}
                aria-orientation="vertical"
                className="border-r border-default-border/60 overflow-y-auto scrollbar-hide py-2"
              >
                {track.deliverables.map((item, i) => {
                  const isActive = item.id === selected.id;
                  return (
                    <motion.button
                      key={item.id}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      aria-controls="experience-detail"
                      onClick={() => setSelectedId(item.id)}
                      initial={{ opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: DURATION.base, ease: EASE, delay: i * 0.03 }}
                      className="group relative w-full flex items-center gap-2.5 px-4 py-2.5 text-left cursor-pointer outline-none focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-accent"
                    >
                      {isActive && (
                        <motion.span
                          layoutId="experience-item"
                          transition={SPRING}
                          className="absolute inset-0 border-l-2 border-accent bg-card-background light:shadow-xs"
                        />
                      )}
                      <span className="relative">
                        <IconTile Icon={item.icon} active={isActive} />
                      </span>
                      <span
                        className={`relative text-xs leading-snug transition-colors duration-150 ${
                          isActive ? "text-text-primary font-semibold" : "text-text-secondary group-hover:text-text-primary"
                        }`}
                      >
                        {item.headline}
                      </span>
                    </motion.button>
                  );
                })}
              </div>

              <div id="experience-detail" role="tabpanel" className="overflow-y-auto scrollbar-hide px-7 py-6">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={selected.id}
                    initial={{ opacity: 0, x: 8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -8 }}
                    transition={{ duration: DURATION.fast, ease: EASE }}
                  >
                    <p className="font-mono text-[9px] uppercase tracking-widest text-text-muted">{selected.area}</p>
                    <h3 className="mt-1.5 mb-5 text-[22px] font-bold text-text-primary tracking-tight leading-tight">
                      {selected.headline}
                    </h3>
                    <DetailBody item={selected} />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Mobile: a mesma lista, com o detalhe abrindo abaixo do item */}
            <ul className="md:hidden flex-1 overflow-y-auto scrollbar-hide px-4 pb-24">
              {track.deliverables.map((item) => {
                const isOpen = openId === item.id;
                const panelId = `experience-mobile-${item.id}`;
                return (
                  <li key={item.id} className="border-b border-default-border/60 last:border-0">
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setOpenId(isOpen ? null : item.id)}
                      className="group w-full flex items-center gap-3 py-3 text-left cursor-pointer"
                    >
                      <IconTile Icon={item.icon} active={isOpen} />
                      <span className={`flex-1 text-[13px] leading-snug ${isOpen ? "text-text-primary font-semibold" : "text-text-code"}`}>
                        {item.headline}
                      </span>
                      <motion.span
                        animate={{ rotate: isOpen ? 90 : 0 }}
                        transition={{ duration: DURATION.fast, ease: EASE }}
                        className={`flex ${isOpen ? "text-accent" : "text-text-muted"}`}
                      >
                        <ChevronRight size={14} />
                      </motion.span>
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          id={panelId}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: DURATION.base, ease: EASE }}
                          className="overflow-hidden"
                        >
                          <div className="pb-5">
                            <DetailBody item={item} />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        </AnimatePresence>

      </div>
    </ContentLayout>
  );
};

export default Experience;
