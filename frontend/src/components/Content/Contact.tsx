import ContentLayout from "./Layout/ContentLayout";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
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

const now = new Date();
const localTime = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;

const Contact = () => {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleCopy = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    } catch {
      // clipboard not available
    }
  };

  const isCopied = (field: string) => copiedField === field;

  return (
    <ContentLayout>
      <div className="h-full w-full flex flex-col overflow-hidden bg-content-bg pb-20 md:pb-0">

        {/* Mobile header — System Panel */}
        <motion.div
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="shrink-0 md:hidden"
        >
          <div className="flex items-center justify-between px-4 pt-3 pb-2.5">
            <div className="flex items-center gap-2.5">
              <span className="font-mono text-[10px] text-accent/40 tracking-widest">§05</span>
              <span className="text-base font-bold text-text-primary tracking-tight">Contact</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
              <span className="font-mono text-[10px] text-text-secondary">disponível</span>
            </div>
          </div>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="h-0.5 origin-left"
            style={{ background: "linear-gradient(to right, #40cbf6, rgba(64,203,246,0.3), transparent)" }}
          />
        </motion.div>

        {/* Desktop header slim */}
        <motion.div
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          className="shrink-0 hidden md:block px-4 py-3"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-accent">Contato</span>
              <span className="text-text-secondary text-[10px]">·</span>
              <span className="text-xs text-text-primary/40">Odair Michael Bendotti</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
              <span className="font-mono text-[10px] text-text-secondary">disponível</span>
            </div>
          </div>
          <div className="mt-3 h-px bg-linear-to-r from-accent/30 via-default-border to-transparent" />
        </motion.div>

        {/* ── MOBILE BODY ─────────────────────────────────────────── */}
        <div className="md:hidden flex-1 overflow-y-auto scrollbar-hide px-4 py-5 flex flex-col gap-4">

          <p className="font-mono text-[9px] text-accent/40 uppercase tracking-widest">
            // contato direto
          </p>

          {/* Email card */}
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: 0.08 }}
            className="rounded-sm border p-4 flex flex-col gap-3"
            style={{ borderColor: "var(--color-default-border)", backgroundColor: "var(--color-background)" }}
          >
            <div className="flex flex-col gap-0.5">
              <span className="font-mono text-[9px] text-accent/40 uppercase tracking-widest">mailto://</span>
              <span className="font-mono text-sm font-medium text-text-primary">{directContact.email}</span>
            </div>
            <div className="flex gap-2 border-t pt-3" style={{ borderColor: "var(--color-default-border)" }}>
              <button
                onClick={() => handleCopy(directContact.email, "email")}
                className="flex-1 flex items-center justify-center gap-2 font-mono text-xs py-2 border rounded-sm cursor-pointer transition-colors duration-150"
                style={{
                  borderColor: isCopied("email") ? "rgba(40,167,69,0.4)" : "var(--color-default-border)",
                  color: isCopied("email") ? "var(--color-success)" : "var(--color-text-secondary)",
                }}
              >
                <AnimatePresence mode="wait">
                  {isCopied("email") ? (
                    <motion.span key="check" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                      <Check size={12} />
                    </motion.span>
                  ) : (
                    <motion.span key="copy" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                      <Copy size={12} />
                    </motion.span>
                  )}
                </AnimatePresence>
                {isCopied("email") ? "copiado" : "copiar"}
              </button>
              <a
                href={`mailto:${directContact.email}`}
                className="flex-1 flex items-center justify-center gap-2 font-mono text-xs py-2 border rounded-sm cursor-pointer transition-colors duration-150"
                style={{ borderColor: "var(--color-default-border)", color: "var(--color-text-secondary)" }}
              >
                <SiGmail size={12} />
                enviar →
              </a>
            </div>
          </motion.div>

          {/* Phone card */}
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: 0.16 }}
            className="rounded-sm border p-4 flex flex-col gap-3"
            style={{ borderColor: "var(--color-default-border)", backgroundColor: "var(--color-background)" }}
          >
            <div className="flex flex-col gap-0.5">
              <span className="font-mono text-[9px] text-accent/40 uppercase tracking-widest">wa.me//</span>
              <span className="font-mono text-sm font-medium text-text-primary">{directContact.phone}</span>
            </div>
            <div className="flex gap-2 border-t pt-3" style={{ borderColor: "var(--color-default-border)" }}>
              <button
                onClick={() => handleCopy(directContact.phone, "phone")}
                className="flex-1 flex items-center justify-center gap-2 font-mono text-xs py-2 border rounded-sm cursor-pointer transition-colors duration-150"
                style={{
                  borderColor: isCopied("phone") ? "rgba(40,167,69,0.4)" : "var(--color-default-border)",
                  color: isCopied("phone") ? "var(--color-success)" : "var(--color-text-secondary)",
                }}
              >
                <AnimatePresence mode="wait">
                  {isCopied("phone") ? (
                    <motion.span key="check" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                      <Check size={12} />
                    </motion.span>
                  ) : (
                    <motion.span key="copy" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                      <Copy size={12} />
                    </motion.span>
                  )}
                </AnimatePresence>
                {isCopied("phone") ? "copiado" : "copiar"}
              </button>
              <a
                href={`https://wa.me/${directContact.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 font-mono text-xs py-2 border rounded-sm cursor-pointer transition-colors duration-150"
                style={{ borderColor: "var(--color-default-border)", color: "var(--color-text-secondary)" }}
              >
                <SiWhatsapp size={12} />
                abrir chat →
              </a>
            </div>
          </motion.div>

          {/* Sociais divider */}
          <div className="flex items-center gap-3">
            <div className="h-px flex-1 bg-default-border/30" />
            <span className="font-mono text-[9px] text-accent/30 uppercase tracking-widest">sociais</span>
            <div className="h-px flex-1 bg-default-border/30" />
          </div>

          {/* Social grid 3 cols */}
          <div className="grid grid-cols-3 gap-3">
            {socialLinks.map((link, index) => {
              const Icon = link.icon;
              return (
                <motion.a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: 0.3 + index * 0.06 }}
                  className="flex flex-col items-center justify-center gap-2 py-4 rounded-sm border cursor-pointer"
                  style={{ borderColor: "var(--color-default-border)", backgroundColor: "var(--color-background)" }}
                >
                  <Icon size={22} style={{ color: link.color }} />
                  <span className="font-mono text-[10px] text-text-secondary">{link.name}</span>
                </motion.a>
              );
            })}
          </div>

        </div>

        {/* ── DESKTOP BODY ────────────────────────────────────────── */}
        <div className="hidden md:block flex-1 overflow-y-auto scrollbar-hide px-4 py-5">

          <p className="font-mono text-[9px] text-accent/40 uppercase tracking-widest mb-5">
            // presence log
          </p>

          {/* Email entry */}
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.08 }}
          >
            <div className="flex items-baseline gap-0">
              <span className="w-12 shrink-0 font-mono text-[10px] text-accent/50">{localTime}</span>
              <span className="w-24 shrink-0 font-mono text-[10px] text-text-secondary/60">mailto://</span>
              <span className="font-mono text-xs text-text-primary truncate flex-1">{directContact.email}</span>
            </div>
            <div className="mt-1.5 ml-36 flex items-center gap-2">
              <button
                onClick={() => handleCopy(directContact.email, "email")}
                className="flex items-center gap-1.5 font-mono text-[10px] px-2 py-0.5 border rounded-sm cursor-pointer transition-colors duration-150"
                style={{
                  borderColor: isCopied("email") ? "rgba(40,167,69,0.4)" : "var(--color-default-border)",
                  color: isCopied("email") ? "var(--color-success)" : "var(--color-text-secondary)",
                }}
                onMouseEnter={(e) => { if (!isCopied("email")) { (e.currentTarget as HTMLElement).style.borderColor = "rgba(64,203,246,0.3)"; (e.currentTarget as HTMLElement).style.color = "var(--color-accent)"; } }}
                onMouseLeave={(e) => { if (!isCopied("email")) { (e.currentTarget as HTMLElement).style.borderColor = "var(--color-default-border)"; (e.currentTarget as HTMLElement).style.color = "var(--color-text-secondary)"; } }}
              >
                <AnimatePresence mode="wait">
                  {isCopied("email") ? (
                    <motion.span key="check" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                      <Check size={10} />
                    </motion.span>
                  ) : (
                    <motion.span key="copy" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                      <Copy size={10} />
                    </motion.span>
                  )}
                </AnimatePresence>
                {isCopied("email") ? "copiado" : "copiar"}
              </button>
              <a
                href={`mailto:${directContact.email}`}
                className="flex items-center gap-1 font-mono text-[10px] px-2 py-0.5 border border-default-border/60 rounded-sm cursor-pointer text-text-secondary transition-colors duration-150 hover:border-accent/30 hover:text-accent"
              >
                <SiGmail size={10} />
                enviar →
              </a>
            </div>
          </motion.div>

          <div className="h-px bg-default-border/20 my-4" />

          {/* Phone entry */}
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.16 }}
          >
            <div className="flex items-baseline gap-0">
              <span className="w-12 shrink-0 font-mono text-[10px] text-accent/50">24/7</span>
              <span className="w-24 shrink-0 font-mono text-[10px] text-text-secondary/60">wa.me//</span>
              <span className="font-mono text-xs text-text-primary truncate flex-1">{directContact.phone}</span>
            </div>
            <div className="mt-1.5 ml-36 flex items-center gap-2">
              <button
                onClick={() => handleCopy(directContact.phone, "phone")}
                className="flex items-center gap-1.5 font-mono text-[10px] px-2 py-0.5 border rounded-sm cursor-pointer transition-colors duration-150"
                style={{
                  borderColor: isCopied("phone") ? "rgba(40,167,69,0.4)" : "var(--color-default-border)",
                  color: isCopied("phone") ? "var(--color-success)" : "var(--color-text-secondary)",
                }}
                onMouseEnter={(e) => { if (!isCopied("phone")) { (e.currentTarget as HTMLElement).style.borderColor = "rgba(64,203,246,0.3)"; (e.currentTarget as HTMLElement).style.color = "var(--color-accent)"; } }}
                onMouseLeave={(e) => { if (!isCopied("phone")) { (e.currentTarget as HTMLElement).style.borderColor = "var(--color-default-border)"; (e.currentTarget as HTMLElement).style.color = "var(--color-text-secondary)"; } }}
              >
                <AnimatePresence mode="wait">
                  {isCopied("phone") ? (
                    <motion.span key="check" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                      <Check size={10} />
                    </motion.span>
                  ) : (
                    <motion.span key="copy" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                      <Copy size={10} />
                    </motion.span>
                  )}
                </AnimatePresence>
                {isCopied("phone") ? "copiado" : "copiar"}
              </button>
              <a
                href={`https://wa.me/${directContact.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 font-mono text-[10px] px-2 py-0.5 border border-default-border/60 rounded-sm cursor-pointer text-text-secondary transition-colors duration-150 hover:border-green-500/30 hover:text-green-400"
              >
                <SiWhatsapp size={10} />
                abrir chat →
              </a>
            </div>
          </motion.div>

          {/* Sociais divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="h-px flex-1 bg-default-border/30" />
            <span className="font-mono text-[9px] text-accent/30 uppercase tracking-widest">sociais</span>
            <div className="h-px flex-1 bg-default-border/30" />
          </div>

          {/* Social rows */}
          <div className="flex flex-col">
            {socialLinks.map((link, index) => {
              const Icon = link.icon;
              return (
                <motion.a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: -4 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.25, delay: 0.3 + index * 0.06 }}
                  className="group flex items-center gap-3 py-2 border-l-2 border-transparent pl-2 -ml-2 transition-all duration-150 hover:border-accent/40 cursor-pointer"
                >
                  <Icon size={11} style={{ color: link.color }} className="shrink-0" />
                  <span className="font-mono text-xs text-text-secondary w-16 shrink-0 group-hover:text-text-primary transition-colors duration-150">
                    {link.name}
                  </span>
                  <span className="font-mono text-xs text-text-muted flex-1 group-hover:text-accent transition-colors duration-150">
                    {link.handle}
                  </span>
                  <ArrowUpRight
                    size={13}
                    className="text-text-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-150 shrink-0"
                  />
                </motion.a>
              );
            })}
          </div>

        </div>

        {/* Footer — shared */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.5 }}
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
