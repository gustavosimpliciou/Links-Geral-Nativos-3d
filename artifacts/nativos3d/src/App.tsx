import React, { useEffect, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { FaInstagram, FaTiktok, FaYoutube, FaStore, FaMobileAlt, FaTimes } from "react-icons/fa";
import { SiShopee, SiMercadopago } from "react-icons/si";
import { ChevronRight } from "lucide-react";
import logo from "./assets/logo.png";

export default function App() {
  const { scrollY } = useScroll();
  const yBg = useTransform(scrollY, [0, 1000], [0, 300]);
  const [socialOpen, setSocialOpen] = useState(false);

  useEffect(() => {
    document.body.classList.add("dark");
  }, []);

  useEffect(() => {
    if (socialOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [socialOpen]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 },
    },
  };

  return (
    <div className="min-h-[100dvh] w-full bg-[#090909] text-white selection:bg-[#ff6500] selection:text-white relative overflow-hidden flex flex-col">
      <motion.div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          y: yBg,
          background: "radial-gradient(circle at 50% 30%, rgba(255, 101, 0, 0.05) 0%, transparent 60%)",
        }}
      />
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{ background: "linear-gradient(180deg, #090909 0%, #100b08 50%, #090909 100%)" }}
      />

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between max-w-[500px] mx-auto w-full backdrop-blur-md bg-[#090909]/60 border-b border-white/5">
        <div className="flex items-center">
          <img src={logo} alt="Nativos 3D" className="h-28 w-auto object-contain max-w-[320px] -my-6" />
        </div>
        <div className="flex items-center gap-4 text-white/80">
          <a href="https://www.instagram.com/nativos.3d/" target="_blank" rel="noopener noreferrer" className="hover:text-[#ff6500] transition-colors duration-300">
            <FaInstagram size={18} />
          </a>
          <a href="https://www.tiktok.com/@nativos.3d" target="_blank" rel="noopener noreferrer" className="hover:text-[#ff6500] transition-colors duration-300">
            <FaTiktok size={18} />
          </a>
          <a href="https://www.youtube.com/@Nativos3D" target="_blank" rel="noopener noreferrer" className="hover:text-[#ff6500] transition-colors duration-300">
            <FaYoutube size={20} />
          </a>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-[500px] mx-auto px-6 pt-32 pb-16 relative z-10 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center text-center mb-12 w-full"
        >
          <div className="mb-8 inline-block px-3 py-1 border border-[#ff6500] rounded-full">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#ff6500]">Produtos Premium</span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl leading-[0.95] tracking-tight mb-6">
            <div className="text-white block">CONHEÇA NOSSOS</div>
            <div className="text-[#ff6500] block">CANAIS DE VENDA</div>
          </h1>
        </motion.div>

        {/* Links */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full flex flex-col gap-4"
        >
          <LinkButton
            href="https://nativos3d.com.br/"
            icon={<FaStore size={22} />}
            title="Loja Virtual"
            subtitle="Conheça todos os nossos produtos exclusivos."
          />
          <LinkButton
            href="https://www.mercadolivre.com.br/pagina/pkecbxlc"
            icon={<SiMercadopago size={22} />}
            title="Mercado Livre"
            subtitle="Compre com segurança pelo Mercado Livre."
          />
          <LinkButton
            href="https://shopee.com.br/nativos.3d"
            icon={<SiShopee size={22} />}
            title="Shopee"
            subtitle="Ofertas especiais e envio rápido."
          />
          <SocialButton onClick={() => setSocialOpen(true)} />
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="w-full max-w-[500px] mx-auto px-6 py-10 text-center relative z-10 mt-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="flex flex-col items-center gap-2"
        >
          <span className="font-bold text-white tracking-widest uppercase text-sm">NATIVOS 3D</span>
          <p className="text-white/40 text-xs font-medium max-w-[250px]">
            Objetos impressos em 3D que transformam ambientes.
          </p>
          <p className="text-white/30 text-[10px] mt-4">
            &copy; 2026 Nativos 3D
          </p>
        </motion.div>
      </footer>

      {/* Social Popup */}
      <AnimatePresence>
        {socialOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-[60] bg-black/75 backdrop-blur-sm"
              onClick={() => setSocialOpen(false)}
            />

            {/* Modal */}
            <motion.div
              key="modal"
              initial={{ opacity: 0, y: 60, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 280, damping: 26 }}
              className="fixed bottom-0 left-1/2 -translate-x-1/2 z-[70] w-full max-w-[500px] px-4 pb-8"
            >
              <div className="bg-[#111111] border border-white/10 rounded-2xl overflow-hidden shadow-[0_-8px_40px_rgba(0,0,0,0.6)]">
                {/* Modal header */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-white/8">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-[#ff6500] font-bold mb-0.5">Redes Sociais</p>
                    <p className="text-white/50 text-xs">Escolha onde nos seguir</p>
                  </div>
                  <button
                    onClick={() => setSocialOpen(false)}
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-white/50 hover:text-white transition-all duration-200"
                  >
                    <FaTimes size={14} />
                  </button>
                </div>

                {/* Social options */}
                <div className="p-4 flex flex-col gap-3">
                  <SocialOption
                    href="https://www.instagram.com/nativos.3d/"
                    icon={<FaInstagram size={22} />}
                    label="Instagram"
                    handle="@nativos.3d"
                    color="#E1306C"
                  />
                  <SocialOption
                    href="https://www.tiktok.com/@nativos.3d"
                    icon={<FaTiktok size={20} />}
                    label="TikTok"
                    handle="@nativos.3d"
                    color="#ffffff"
                  />
                  <SocialOption
                    href="https://www.youtube.com/@Nativos3D"
                    icon={<FaYoutube size={22} />}
                    label="YouTube"
                    handle="@Nativos3D"
                    color="#FF0000"
                  />
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

function LinkButton({
  href,
  icon,
  title,
  subtitle,
}: {
  href: string;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
}) {
  return (
    <motion.a
      variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative w-full flex items-center bg-[#111111] border border-white/10 rounded-xl p-4 min-h-[76px] transition-all duration-300 hover:border-[#ff6500] hover:shadow-[0_0_20px_rgba(255,101,0,0.15)] hover:-translate-y-1"
    >
      <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-white/5 rounded-lg text-white group-hover:text-[#ff6500] group-hover:bg-[#ff6500]/10 transition-colors duration-300">
        {icon}
      </div>
      <div className="flex-1 flex flex-col justify-center ml-4 pr-6 text-left">
        <h3 className="font-semibold text-white text-base tracking-wide group-hover:text-[#ff6500] transition-colors duration-300">
          {title}
        </h3>
        <p className="text-white/50 text-[11px] sm:text-xs mt-0.5 line-clamp-1">{subtitle}</p>
      </div>
      <div className="absolute right-4 text-white/20 group-hover:text-[#ff6500] transition-colors duration-300">
        <ChevronRight size={20} />
      </div>
    </motion.a>
  );
}

function SocialButton({ onClick }: { onClick: () => void }) {
  return (
    <motion.button
      variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
      onClick={onClick}
      className="group relative w-full flex items-center bg-[#111111] border border-white/10 rounded-xl p-4 min-h-[76px] transition-all duration-300 hover:border-[#ff6500] hover:shadow-[0_0_20px_rgba(255,101,0,0.15)] hover:-translate-y-1 text-left"
    >
      <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-white/5 rounded-lg text-white group-hover:text-[#ff6500] group-hover:bg-[#ff6500]/10 transition-colors duration-300">
        <FaMobileAlt size={22} />
      </div>
      <div className="flex-1 flex flex-col justify-center ml-4 pr-6">
        <h3 className="font-semibold text-white text-base tracking-wide group-hover:text-[#ff6500] transition-colors duration-300">
          Redes Sociais
        </h3>
        <p className="text-white/50 text-[11px] sm:text-xs mt-0.5">Instagram + TikTok + YouTube</p>
      </div>
      <div className="absolute right-4 text-white/20 group-hover:text-[#ff6500] transition-colors duration-300">
        <ChevronRight size={20} />
      </div>
    </motion.button>
  );
}

function SocialOption({
  href,
  icon,
  label,
  handle,
  color,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  handle: string;
  color: string;
}) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ x: 4 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className="group flex items-center gap-4 bg-white/5 hover:bg-white/8 border border-white/8 hover:border-[#ff6500]/40 rounded-xl px-4 py-3.5 transition-all duration-200"
    >
      <div
        className="w-10 h-10 flex items-center justify-center rounded-lg flex-shrink-0"
        style={{ backgroundColor: `${color}18`, color }}
      >
        {icon}
      </div>
      <div className="flex-1">
        <p className="text-white font-semibold text-sm">{label}</p>
        <p className="text-white/40 text-xs mt-0.5">{handle}</p>
      </div>
      <ChevronRight size={16} className="text-white/20 group-hover:text-[#ff6500] transition-colors duration-200" />
    </motion.a>
  );
}
