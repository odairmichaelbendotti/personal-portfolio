import { useEffect, useRef, useState } from "react";
import ContentLayout from "./Layout/ContentLayout";
import MobileSectionHeader from "./Layout/MobileSectionHeader";
import { motion, AnimatePresence } from "motion/react";
import { DURATION, EASE, Magnetic, Stagger, StaggerItem } from "../motion";
import { useBrandColor } from "../theme";
import { Copy, Check, ArrowUpRight } from "lucide-react";
import { SiGithub, SiYoutube, SiWhatsapp, SiGmail } from "react-icons/si";
import { FaLinkedinIn } from "react-icons/fa";

const directContact = {
  email: "obendotti@gmail.com",
  phone: "+55 (45) 99999-9999",
  whatsapp: "5545999999999",
};

const socialLinks = [
  {
    id: "linkedin",
    name: "LinkedIn",
    handle: "/in/odair-bendotti",
    url: "https://linkedin.com/in/odair-bendotti",
    icon: FaLinkedinIn,
    color: "#0A66C2",
  },
  {
    id: "github",
    name: "GitHub",
    handle: "obendotti",
    url: "https://github.com/obendotti",
    icon: SiGithub,
    color: "#f0f6fc",
  },
  {
    id: "youtube",
    name: "YouTube",
    handle: "@obendotti",
    url: "https://youtube.com/@obendotti",
    icon: SiYoutube,
    color: "#FF0000",
  },
];

const COPIED_FEEDBACK_MS = 2000;

const formatTime = (date: Date) =>
  `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;

// Hora local calculada no mount e atualizada a cada 30s (antes ficava congelada no carregamento do módulo)
const useLocalTime = () => {
  const [time, setTime] = useState(() => formatTime(new Date()));
  useEffect(() => {
    const id = setInterval(() => setTime(formatTime(new Date())), 30_000);
    return () => clearInterval(id);
  }, []);
  return time;
};

const CopyButton = ({ value, variant }: { value: string; variant: "card" | "inline" }) => {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), COPIED_FEEDBACK_MS);
    } catch {
      // clipboard not available
    }
  };

  const isCard = variant === "card";
  const iconSize = isCard ? 12 : 10;

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={`flex items-center justify-center font-mono border rounded-sm cursor-pointer transition-colors duration-150 ${
        isCard ? "flex-1 gap-2 text-xs py-2" : "gap-1.5 text-[10px] px-2 py-0.5"
      } ${
        copied
          ? "border-success/40 text-success"
          : "border-default-border text-text-secondary hover:border-accent/30 hover:text-accent"
      }`}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={copied ? "check" : "copy"}
          className="flex"
          initial={{ scale: 0, rotate: -45 }}
          animate={{ scale: 1, rotate: 0 }}
          exit={{ scale: 0, rotate: 45 }}
          transition={{ duration: 0.15, ease: EASE }}
        >
          {copied ? <Check size={iconSize} /> : <Copy size={iconSize} />}
        </motion.span>
      </AnimatePresence>
      <span aria-live="polite">{copied ? "copiado" : "copiar"}</span>
    </button>
  );
};

const Contact = () => {
  const localTime = useLocalTime();
  const brandColor = useBrandColor();

  return (
    <ContentLayout>
      <div className="h-full w-full flex flex-col overflow-hidden bg-content-bg pb-20 md:pb-0">

        <MobileSectionHeader
          index="05"
          title="Contact"
          aside={
            <>
              <span className="w-1.5 h-1.5 rounded-full bg-success motion-safe:animate-pulse" />
              <span className="font-mono text-[10px] text-text-secondary ml-0.5">disponível</span>
            </>
          }
        />

        {/* Desktop header slim */}
        <motion.div
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: DURATION.base, ease: EASE }}
          className="shrink-0 hidden md:block px-4 py-3"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-accent">Contato</span>
              <span className="text-text-secondary text-[10px]">·</span>
              <span className="text-xs text-text-primary/40">Odair Michael Bendotti</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-success motion-safe:animate-pulse" />
              <span className="font-mono text-[10px] text-text-secondary">disponível</span>
            </div>
          </div>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: DURATION.slow, ease: EASE, delay: 0.1 }}
            className="mt-3 h-px origin-left bg-linear-to-r from-accent/30 via-default-border to-transparent"
          />
        </motion.div>

        {/* ── MOBILE BODY ─────────────────────────────────────────── */}
        <Stagger
          className="md:hidden flex-1 overflow-y-auto scrollbar-hide px-4 py-5 flex flex-col gap-4"
          delay={0.08}
          stagger={0.08}
        >

          <p className="font-mono text-[9px] text-accent/40 uppercase tracking-widest">
            // contato direto
          </p>

          {/* Email card */}
          <StaggerItem className="rounded-sm border border-default-border bg-background light:bg-card-background light:shadow-xs p-4 flex flex-col gap-3">
            <div className="flex flex-col gap-0.5">
              <span className="font-mono text-[9px] text-accent/40 uppercase tracking-widest">mailto://</span>
              <span className="font-mono text-sm font-medium text-text-primary">{directContact.email}</span>
            </div>
            <div className="flex gap-2 border-t border-default-border pt-3">
              <CopyButton value={directContact.email} variant="card" />
              <a
                href={`mailto:${directContact.email}`}
                className="flex-1 flex items-center justify-center gap-2 font-mono text-xs py-2 border border-default-border rounded-sm cursor-pointer text-text-secondary transition-colors duration-150"
              >
                <SiGmail size={12} />
                enviar →
              </a>
            </div>
          </StaggerItem>

          {/* Phone card */}
          <StaggerItem className="rounded-sm border border-default-border bg-background light:bg-card-background light:shadow-xs p-4 flex flex-col gap-3">
            <div className="flex flex-col gap-0.5">
              <span className="font-mono text-[9px] text-accent/40 uppercase tracking-widest">wa.me//</span>
              <span className="font-mono text-sm font-medium text-text-primary">{directContact.phone}</span>
            </div>
            <div className="flex gap-2 border-t border-default-border pt-3">
              <CopyButton value={directContact.phone} variant="card" />
              <a
                href={`https://wa.me/${directContact.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 font-mono text-xs py-2 border border-default-border rounded-sm cursor-pointer text-text-secondary transition-colors duration-150"
              >
                <SiWhatsapp size={12} />
                abrir chat →
              </a>
            </div>
          </StaggerItem>

          {/* Sociais divider */}
          <StaggerItem className="flex items-center gap-3">
            <div className="h-px flex-1 bg-default-border/30" />
            <span className="font-mono text-[9px] text-accent/30 uppercase tracking-widest">sociais</span>
            <div className="h-px flex-1 bg-default-border/30" />
          </StaggerItem>

          {/* Social grid 3 cols */}
          <StaggerItem className="grid grid-cols-3 gap-3">
            {socialLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center justify-center gap-2 py-4 rounded-sm border border-default-border bg-background light:bg-card-background light:shadow-xs cursor-pointer active:scale-95 transition-transform"
                >
                  <Icon size={22} style={{ color: brandColor(link.color) }} />
                  <span className="font-mono text-[10px] text-text-secondary">{link.name}</span>
                </a>
              );
            })}
          </StaggerItem>

        </Stagger>

        {/* ── DESKTOP BODY ────────────────────────────────────────── */}
        <Stagger className="hidden md:block flex-1 overflow-y-auto scrollbar-hide px-4 py-5" delay={0.08} stagger={0.08}>

          <StaggerItem>
            <p className="font-mono text-[9px] text-accent/40 uppercase tracking-widest mb-5">
              // presence log
            </p>
          </StaggerItem>

          {/* Email entry */}
          <StaggerItem>
            <div className="flex items-baseline gap-0">
              <span className="w-12 shrink-0 font-mono text-[10px] text-accent/50 tabular-nums">{localTime}</span>
              <span className="w-24 shrink-0 font-mono text-[10px] text-text-secondary/60">mailto://</span>
              <span className="font-mono text-xs text-text-primary truncate flex-1">{directContact.email}</span>
            </div>
            <div className="mt-1.5 ml-36 flex items-center gap-2">
              <CopyButton value={directContact.email} variant="inline" />
              <Magnetic strength={0.25}>
                <a
                  href={`mailto:${directContact.email}`}
                  className="flex items-center gap-1 font-mono text-[10px] px-2 py-0.5 border border-default-border/60 rounded-sm cursor-pointer text-text-secondary transition-colors duration-150 hover:border-accent/30 hover:text-accent"
                >
                  <SiGmail size={10} />
                  enviar →
                </a>
              </Magnetic>
            </div>
          </StaggerItem>

          <div className="h-px bg-default-border/20 my-4" />

          {/* Phone entry */}
          <StaggerItem>
            <div className="flex items-baseline gap-0">
              <span className="w-12 shrink-0 font-mono text-[10px] text-accent/50">24/7</span>
              <span className="w-24 shrink-0 font-mono text-[10px] text-text-secondary/60">wa.me//</span>
              <span className="font-mono text-xs text-text-primary truncate flex-1">{directContact.phone}</span>
            </div>
            <div className="mt-1.5 ml-36 flex items-center gap-2">
              <CopyButton value={directContact.phone} variant="inline" />
              <Magnetic strength={0.25}>
                <a
                  href={`https://wa.me/${directContact.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 font-mono text-[10px] px-2 py-0.5 border border-default-border/60 rounded-sm cursor-pointer text-text-secondary transition-colors duration-150 hover:border-success/30 hover:text-success"
                >
                  <SiWhatsapp size={10} />
                  abrir chat →
                </a>
              </Magnetic>
            </div>
          </StaggerItem>

          {/* Sociais divider */}
          <StaggerItem className="flex items-center gap-3 my-6">
            <div className="h-px flex-1 bg-default-border/30" />
            <span className="font-mono text-[9px] text-accent/30 uppercase tracking-widest">sociais</span>
            <div className="h-px flex-1 bg-default-border/30" />
          </StaggerItem>

          {/* Social rows */}
          <div className="flex flex-col">
            {socialLinks.map((link) => {
              const Icon = link.icon;
              return (
                <StaggerItem key={link.id} x={-4} y={0}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 py-2 border-l-2 border-transparent pl-2 -ml-2 transition-colors duration-150 hover:border-accent/40 cursor-pointer"
                  >
                    <Icon
                      size={11}
                      style={{ color: brandColor(link.color) }}
                      className="shrink-0 transition-transform duration-200 group-hover:scale-125"
                    />
                    <span className="font-mono text-xs text-text-secondary w-16 shrink-0 group-hover:text-text-primary transition-colors duration-150">
                      {link.name}
                    </span>
                    <span className="font-mono text-xs text-text-muted flex-1 group-hover:text-accent transition-colors duration-150">
                      {link.handle}
                    </span>
                    <ArrowUpRight
                      size={13}
                      className="text-text-secondary opacity-0 -translate-x-1 translate-y-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-200 shrink-0"
                    />
                  </a>
                </StaggerItem>
              );
            })}
          </div>

        </Stagger>

        {/* Footer — shared */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: DURATION.slow, delay: 0.5, ease: EASE }}
          className="shrink-0 border-t border-default-border/40 px-4 py-2.5"
        >
          <p className="font-mono text-[9px] text-text-secondary/60 text-center tracking-widest">
            Remote · Relocation · Open to work
          </p>
        </motion.div>

      </div>
    </ContentLayout>
  );
};

export default Contact;
