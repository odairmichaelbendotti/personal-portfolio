import ContentLayout from "./Layout/ContentLayout";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import {
  ExternalLink,
  MessageCircle,
  Video,
  Code,
  Globe,
  Send,
  Copy,
  Check,
  Phone,
} from "lucide-react";

const contactLinks = [
  {
    id: "linkedin",
    name: "LinkedIn",
    description: "Conecte-se comigo profissionalmente",
    url: "https://linkedin.com/in/seu-perfil",
    icon: Globe,
    color: "#0077b5",
    gradient: "from-[#0077b5]/20 to-[#0077b5]/5",
  },
  {
    id: "youtube",
    name: "YouTube",
    description: "Conteúdo técnico e tutoriais",
    url: "https://youtube.com/seu-canal",
    icon: Video,
    color: "#ff0000",
    gradient: "from-[#ff0000]/20 to-[#ff0000]/5",
  },
  {
    id: "github",
    name: "GitHub",
    description: "Projetos open source e código",
    url: "https://github.com/seu-usuario",
    icon: Code,
    color: "#f0f6fc",
    gradient: "from-[#f0f6fc]/20 to-[#f0f6fc]/5",
  },
];

// Dados de contato direto - formato internacional
const directContact = {
  email: "seu.email@exemplo.com",
  phone: "+55 11 99999-9999", // Formato internacional
  whatsapp: "+5511999999999", // Sem formatação para WhatsApp link
};

const Contact = () => {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleCopy = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <ContentLayout>
      <div className="h-full w-full flex flex-col bg-background overflow-hidden">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="px-3 sm:px-6 py-2 sm:py-4 border-b border-default-border/50 shrink-0"
        >
          <div className="flex items-center gap-3">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="w-10 h-10 rounded-sm bg-accent/10 border border-accent/30 flex items-center justify-center"
            >
              <MessageCircle className="w-5 h-5 text-accent" />
            </motion.div>
            <div>
              <h1 className="text-lg sm:text-2xl font-bold text-accent">
                Vamos conversar?
              </h1>
              <p className="text-[10px] sm:text-sm text-text-secondary">
                Escolha o melhor canal para se conectar
              </p>
            </div>
          </div>
        </motion.div>

        {/* Content */}
        <div className="flex-1 flex flex-col overflow-hidden min-h-0">
          {/* Main Content - Vertically Centered */}
          <div className="flex-1 flex items-center justify-center overflow-y-auto p-3 sm:p-6">
            <div className="w-full max-w-2xl">
              {/* Direct Contact - Email & Phone */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mb-3 sm:mb-6"
              >
                <h2 className="text-[10px] sm:text-xs uppercase tracking-wider text-text-secondary mb-2 sm:mb-3 text-center">
                  Contato Direto
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Email Card */}
                  <motion.button
                    onClick={() => handleCopy(directContact.email, "email")}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="group relative flex items-center gap-2 sm:gap-3 p-2.5 sm:p-4 border border-default-border bg-linear-to-br from-background via-background to-accent-third/30 rounded-sm transition-all duration-300 hover:border-accent/50 text-left cursor-pointer"
                  >
                    <motion.div
                      className="shrink-0 w-9 h-9 sm:w-12 sm:h-12 rounded-sm bg-linear-to-br from-accent/30 to-accent/5 border border-default-border group-hover:border-accent/30 flex items-center justify-center transition-all duration-300"
                      whileHover={{ rotate: [0, -5, 5, 0] }}
                    >
                      <Send className="w-4 h-4 sm:w-6 sm:h-6 text-accent" />
                    </motion.div>

                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-200 group-hover:text-accent transition-colors text-xs sm:text-sm">
                        E-mail
                      </h3>
                      <p className="text-xs text-text-secondary font-mono truncate">
                        {directContact.email}
                      </p>
                    </div>

                    {/* Copy Icon / Check */}
                    <div className="shrink-0">
                      <AnimatePresence mode="wait">
                        {copiedField === "email" ? (
                          <motion.div
                            key="check"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0 }}
                            className="w-6 h-6 sm:w-8 sm:h-8 rounded-sm bg-success/20 border border-success/50 flex items-center justify-center"
                          >
                            <Check className="w-3 h-3 sm:w-4 sm:h-4 text-success" />
                          </motion.div>
                        ) : (
                          <motion.div
                            key="copy"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0 }}
                            className="w-6 h-6 sm:w-8 sm:h-8 rounded-sm bg-accent/10 border border-accent/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <Copy className="w-3 h-3 sm:w-4 sm:h-4 text-accent" />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Copied Tooltip */}
                    <AnimatePresence>
                      {copiedField === "email" && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="absolute -top-6 sm:-top-8 left-1/2 -translate-x-1/2 px-2 py-0.5 sm:py-1 bg-success text-white text-[10px] sm:text-xs rounded-sm whitespace-nowrap"
                        >
                          E-mail copiado!
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.button>

                  {/* Phone Card */}
                  <motion.button
                    onClick={() => handleCopy(directContact.phone, "phone")}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="group relative flex items-center gap-2 sm:gap-3 p-2.5 sm:p-4 border border-default-border bg-linear-to-br from-background via-background to-accent-third/30 rounded-sm transition-all duration-300 hover:border-accent/50 text-left cursor-pointer"
                  >
                    <motion.div
                      className="shrink-0 w-9 h-9 sm:w-12 sm:h-12 rounded-sm bg-linear-to-br from-green-500/20 to-green-500/5 border border-default-border group-hover:border-green-500/30 flex items-center justify-center transition-all duration-300"
                      whileHover={{ rotate: [0, -5, 5, 0] }}
                    >
                      <Phone className="w-4 h-4 sm:w-6 sm:h-6 text-green-400" />
                    </motion.div>

                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-200 group-hover:text-green-400 transition-colors text-xs sm:text-sm">
                        Telefone / WhatsApp
                      </h3>
                      <p className="text-xs text-text-secondary font-mono truncate">
                        {directContact.phone}
                      </p>
                    </div>

                    {/* Copy Icon / Check */}
                    <div className="shrink-0">
                      <AnimatePresence mode="wait">
                        {copiedField === "phone" ? (
                          <motion.div
                            key="check"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0 }}
                            className="w-6 h-6 sm:w-8 sm:h-8 rounded-sm bg-success/20 border border-success/50 flex items-center justify-center"
                          >
                            <Check className="w-3 h-3 sm:w-4 sm:h-4 text-success" />
                          </motion.div>
                        ) : (
                          <motion.div
                            key="copy"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0 }}
                            className="w-6 h-6 sm:w-8 sm:h-8 rounded-sm bg-green-500/10 border border-green-500/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <Copy className="w-3 h-3 sm:w-4 sm:h-4 text-green-400" />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Copied Tooltip */}
                    <AnimatePresence>
                      {copiedField === "phone" && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="absolute -top-6 sm:-top-8 left-1/2 -translate-x-1/2 px-2 py-0.5 sm:py-1 bg-success text-white text-[10px] sm:text-xs rounded-sm whitespace-nowrap"
                        >
                          Telefone copiado!
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.button>
                </div>

                {/* WhatsApp Direct Link */}
                <motion.a
                  href={`https://wa.me/${directContact.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="mt-2 sm:mt-3 flex items-center justify-center gap-2 text-[10px] sm:text-xs text-text-secondary hover:text-green-400 transition-colors"
                >
                  <span>Ou clique para abrir WhatsApp diretamente</span>
                  <ExternalLink className="w-3 h-3" />
                </motion.a>
              </motion.div>

              {/* Divider */}
              <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="w-full h-px bg-default-border/50 mb-3 sm:mb-6"
              />

              {/* Redes Sociais */}
              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-[10px] sm:text-xs uppercase tracking-wider text-text-secondary mb-2 sm:mb-3 text-center"
              >
                Redes Sociais
              </motion.h2>

              {/* Contact Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
                {contactLinks.map((link, index) => {
                  const Icon = link.icon;
                  return (
                    <motion.a
                      key={link.id}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      className="group relative flex items-center gap-2 sm:gap-3 p-2.5 sm:p-4 border border-default-border bg-linear-to-br from-background via-background to-accent-third/30 rounded-sm transition-all duration-300 hover:border-accent/50"
                    >
                      {/* Icon Container */}
                      <motion.div
                        className={`shrink-0 w-9 h-9 sm:w-12 sm:h-12 rounded-sm bg-linear-to-br ${link.gradient} border border-default-border group-hover:border-accent/30 flex items-center justify-center transition-all duration-300`}
                        whileHover={{ rotate: [0, -5, 5, 0] }}
                        transition={{ duration: 0.5 }}
                      >
                        <Icon
                          className="w-4 h-4 sm:w-6 sm:h-6 transition-colors duration-300"
                          style={{ color: link.color }}
                        />
                      </motion.div>

                      {/* Text Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-sm text-gray-200 group-hover:text-accent transition-colors duration-300">
                            {link.name}
                          </h3>
                          <ExternalLink className="w-3 h-3 text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                        <p className="text-[10px] sm:text-xs text-text-secondary truncate">
                          {link.description}
                        </p>
                      </div>

                      {/* Hover Glow Effect */}
                      <motion.div
                        className="absolute inset-0 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                        style={{
                          background: `radial-gradient(circle at 50% 50%, ${link.color}10 0%, transparent 70%)`,
                        }}
                      />
                    </motion.a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Footer Note - Fixed at bottom */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.9 }}
            className="py-2 sm:py-4 px-3 sm:px-4 text-center border-t border-default-border/50 shrink-0"
          >
            <p className="text-[10px] sm:text-xs text-text-secondary italic">
              Disponível para oportunidades internacionais • Remote / Relocation
            </p>
            <div className="flex items-center justify-center gap-2 mt-1 sm:mt-2">
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-success animate-pulse" />
              <span className="text-[10px] sm:text-xs text-gray-400">
                Aberto a propostas
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </ContentLayout>
  );
};

export default Contact;
