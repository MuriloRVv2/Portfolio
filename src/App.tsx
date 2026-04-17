import { useState, useEffect, useRef } from "react";

const profileImageUrl = new URL("../imgs/Foto de Perfil.webp", import.meta.url).href;
const etecImageUrl = new URL("../imgs/ETEC.webp", import.meta.url).href;

/* ─────────────────────────────────────────────
   ICONS (inline SVG helpers)
───────────────────────────────────────────── */
const IconMenu = () => (
  <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);
const IconX = () => (
  <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);
const IconSun = () => (
  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <circle cx="9" cy="9" r="4" />
    <line x1="9" y1="1" x2="9" y2="3" /><line x1="9" y1="15" x2="9" y2="17" />
    <line x1="1" y1="9" x2="3" y2="9" /><line x1="15" y1="9" x2="17" y2="9" />
    <line x1="3.2" y1="3.2" x2="4.6" y2="4.6" /><line x1="13.4" y1="13.4" x2="14.8" y2="14.8" />
    <line x1="14.8" y1="3.2" x2="13.4" y2="4.6" /><line x1="4.6" y1="13.4" x2="3.2" y2="14.8" />
  </svg>
);
const IconMoon = () => (
  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M17 12a9 9 0 11-9-9 7 7 0 009 9z" />
  </svg>
);
const IconWhatsApp = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 16 16">
    <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232" />
  </svg>
);
const IconGithub = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.757-1.333-1.757-1.087-.744.084-.729.084-.729 1.205.084 1.84 1.236 1.84 1.236 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.304.76-1.603-2.665-.303-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.3 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.29-1.552 3.296-1.23 3.296-1.23.653 1.653.242 2.873.118 3.176.77.84 1.233 1.91 1.233 3.22 0 4.61-2.807 5.624-5.48 5.92.43.37.823 1.102.823 2.222 0 1.606-.015 2.898-.015 3.293 0 .322.218.694.825.576C20.565 21.796 24 17.297 24 12 24 5.37 18.63 0 12 0z" />
  </svg>
);
const IconInstagram = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 16 16">
    <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z" />
  </svg>
);
const IconLinkedIn = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 16 16">
    <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z" />
  </svg>
);
const IconExternalLink = () => (
  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" transform="scale(0.7)" />
    <polyline points="15 3 21 3 21 9" transform="scale(0.7)" />
    <line x1="10" y1="14" x2="21" y2="3" transform="scale(0.7)" />
  </svg>
);
const IconSend = () => (
  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <line x1="22" y1="2" x2="11" y2="13" transform="scale(0.75)" />
    <polygon points="22 2 15 22 11 13 2 9 22 2" transform="scale(0.75)" />
  </svg>
);
const IconCode = () => (
  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <polyline points="16 18 22 12 16 6" transform="scale(0.8) translate(1,1)" />
    <polyline points="8 6 2 12 8 18" transform="scale(0.8) translate(1,1)" />
  </svg>
);

/* ─────────────────────────────────────────────
   LOGO SVG
───────────────────────────────────────────── */
const LogoMR = () => (
  <svg width="40" height="40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <polygon points="50,5 95,27.5 95,72.5 50,95 5,72.5 5,27.5" fill="var(--primary)" stroke="var(--accent)" strokeWidth="4"/>
    <text x="50" y="65" textAnchor="middle" fontSize="40" fontWeight="800" fontFamily="Plus Jakarta Sans,sans-serif" fill="var(--accent)">MR</text>
  </svg>
);

/* ─────────────────────────────────────────────
   TYPING ANIMATION HOOK
───────────────────────────────────────────── */
function useTypingEffect(words: string[], speed = 80, pause = 1800) {
  const [display, setDisplay] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIdx];
    let timer: ReturnType<typeof setTimeout>;

    if (!deleting && charIdx <= current.length) {
      timer = setTimeout(() => {
        setDisplay(current.slice(0, charIdx));
        setCharIdx((c) => c + 1);
      }, speed);
    } else if (!deleting && charIdx > current.length) {
      timer = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && charIdx > 0) {
      timer = setTimeout(() => {
        setDisplay(current.slice(0, charIdx - 1));
        setCharIdx((c) => c - 1);
      }, speed / 2);
    } else {
      setDeleting(false);
      setWordIdx((w) => (w + 1) % words.length);
    }

    return () => clearTimeout(timer);
  }, [charIdx, deleting, wordIdx, words, speed, pause]);

  return display;
}

/* ─────────────────────────────────────────────
   PROFILE IMAGE (base64 placeholder or real)
───────────────────────────────────────────── */
const ProfileAvatar = () => (
  <div style={{ position: "relative", display: "inline-block" }}>
    {/* Rotating ring */}
    <div style={{
      position: "absolute", inset: -16,
      borderRadius: "50%",
      border: "2px dashed var(--accent)",
      opacity: 0.4,
      animation: "spin 20s linear infinite",
    }} />
    <div
      style={{
        width: 260,
        height: 260,
        borderRadius: "50%",
        border: "4px solid var(--accent)",
        boxShadow: "0 0 0 12px rgba(92,131,116,0.12), 0 25px 80px rgba(0,0,0,0.18)",
        background: `linear-gradient(135deg, var(--accent), var(--primary) 65%)`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: 800,
        color: "var(--accent)",
        overflow: "hidden",
        position: "relative",
        zIndex: 1,
      }}
    >
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.28), transparent 55%)",
        pointerEvents: "none",
      }} />
    { /* Hexagon logo style */ }
      <svg width="180" height="180" viewBox="0 0 100 100" fill="none">
        <polygon points="50,8 88,29 88,71 50,92 12,71 12, 29" fill="none" stroke="var(--accent)" strokeWidth="3" opacity="0.55"/>
        <polygon points="50,18 78,33 78,67 50,82 22,67 22,33" fill="var(--accent)" opacity="0.2"/>
        <text x="50" y="60" textAnchor="middle" fontSize="30" fontWeight="800" fontFamily="Plus Jakarta Sans,sans-serif" fill="var(--accent)">MR</text>
        <text x="50" y="75" textAnchor="middle" fontSize="8" fontFamily="Plus Jakarta Sans,sans-serif" fill="var(--text-muted)">DEV</text>
      </svg> 
    </div>
    <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
  </div>
);

/* ─────────────────────────────────────────────
   NAVBAR
───────────────────────────────────────────── */
function Navbar({ dark, toggleDark }: { dark: boolean; toggleDark: () => void }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#sobre", label: "Sobre" },
    { href: "#habilidades", label: "Habilidades" },
    { href: "#projetos", label: "Projetos" },
    { href: "#contato", label: "Contato" },
  ];

  const handleNav = (href: string) => {
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className="navbar"
      style={{
        boxShadow: scrolled ? "0 4px 24px rgba(0,0,0,0.12)" : "none",
        transition: "box-shadow 0.3s ease",
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "0.9rem 1.5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <a
          href="#"
          style={{ display: "flex", alignItems: "center", gap: "0.6rem", textDecoration: "none" }}
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
        >
          <LogoMR />
          <span style={{ fontWeight: 800, fontSize: "1.1rem", color: "var(--text)" }}>
            Murilo Rodrigues<span style={{ color: "var(--accent)" }}>.</span>
          </span>
        </a>

        {/* Desktop links */}
        <div style={{ display: "flex", alignItems: "center", gap: "2rem" }} className="nav-links-desktop">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="nav-link" onClick={(e) => { e.preventDefault(); handleNav(l.href); }}>
              {l.label}
            </a>
          ))} 
        </div>

        {/* Mobile hamburger */}
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <button
            onClick={toggleDark}
            aria-label="Alternar tema"
            style={{
              background: "none",
              border: "none",
              color: "var(--text)",
              cursor: "pointer",
              display: "none",
            }}
            className="mobile-theme-btn"
          >
            {dark ? <IconSun /> : <IconMoon />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          style={{
            background: "var(--nav-bg)",
            backdropFilter: "blur(12px)",
            borderTop: "1px solid var(--border)",
            padding: "1rem 1.5rem 1.5rem",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="nav-link"
              style={{ fontSize: "1.1rem" }}
              onClick={(e) => { e.preventDefault(); handleNav(l.href); }}
            >
              {l.label}
            </a>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .nav-links-desktop { display: none !important; }
          .hamburger-btn, .mobile-theme-btn { display: flex !important; }
        }
      `}</style>
    </nav>
  );
}

/* ─────────────────────────────────────────────
   HERO SECTION
───────────────────────────────────────────── */
function Hero() {
  const typedText = useTypingEffect(
    ["Desenvolvedor Backend", "Desenvolvedor Frontend", "Estudante de ADS", "Entusiasta de Java"],
    75,
    2000
  );

  return (
    <section
      id="inicio"
      className="grid-bg"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        paddingTop: "80px",
        paddingBottom: "4rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Glow blobs */}
      <div style={{
        position: "absolute", top: "20%", left: "10%",
        width: 400, height: 400, borderRadius: "50%",
        background: "radial-gradient(circle, color-mix(in srgb, var(--accent) 15%, transparent), transparent 70%)",
        filter: "blur(60px)", pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", bottom: "10%", right: "5%",
        width: 300, height: 300, borderRadius: "50%",
        background: "radial-gradient(circle, color-mix(in srgb, var(--highlight) 12%, transparent), transparent 70%)",
        filter: "blur(60px)", pointerEvents: "none",
      }} />

      <div style={{
        maxWidth: 1100, margin: "0 auto", padding: "0 1.5rem",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        gap: "3rem", flexWrap: "wrap",
        position: "relative", zIndex: 1,
      }}>
        {/* Text */}
        <div style={{ flex: "1 1 380px", minWidth: 280 }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "0.5rem",
            background: "var(--tag-bg)", border: "1px solid var(--border)",
            borderRadius: "9999px", padding: "0.4rem 1rem",
            marginBottom: "1.5rem",
          }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--accent)", display: "inline-block", animation: "pulse 2s infinite" }} />
            <span style={{ color: "var(--tag-text)", fontWeight: 600, fontSize: "0.85rem" }}>
              Disponível para oportunidades
            </span>
          </div>
          <h1 className="hero-title" style={{ marginBottom: "0.75rem" }}>
            Olá, eu sou{" "}
            <span className="gradient-text">Murilo Rodrigues</span>
          </h1>
          {/* Typing animation sub-title */}
          <div style={{
            display: "flex", alignItems: "center", gap: "0",
            fontSize: "1.3rem", fontWeight: 700,
            color: "var(--accent)", marginBottom: "1.5rem", minHeight: "2rem",
          }}>
            <span>{typedText}</span>
            <span className="cursor" />
          </div>
          <p style={{
            fontSize: "1.05rem", color: "var(--text-muted)", lineHeight: 1.8,
            maxWidth: 520, marginBottom: "2.5rem",
          }}>
            Estudante de <strong style={{ color: "var(--text)" }}>Análise e Desenvolvimento de Sistemas</strong> na ETEC Camargo Aranha. Apaixonado por <strong style={{ color: "var(--accent)" }}>Java</strong>, <strong style={{ color: "var(--accent)" }}>React</strong> e construção de soluções tecnológicas.
          </p>

          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <a
              href="#projetos"
              onClick={(e) => { e.preventDefault(); document.querySelector("#projetos")?.scrollIntoView({ behavior: "smooth" }); }}
              style={{
                background: "linear-gradient(135deg, var(--accent), var(--highlight))",
                color: "#fff", textDecoration: "none", fontWeight: 700,
                padding: "0.85rem 2rem", borderRadius: "0.75rem",
                fontSize: "1rem", transition: "opacity 0.3s, transform 0.2s",
                display: "flex", alignItems: "center", gap: "0.5rem",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.9"; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "translateY(0)"; }}
            >
              <IconCode /> Ver Projetos
            </a>
            <a
              href="#contato"
              onClick={(e) => { e.preventDefault(); document.querySelector("#contato")?.scrollIntoView({ behavior: "smooth" }); }}
              style={{
                background: "transparent", border: "2px solid var(--accent)",
                color: "var(--accent)", textDecoration: "none", fontWeight: 700,
                padding: "0.85rem 2rem", borderRadius: "0.75rem",
                fontSize: "1rem", transition: "background 0.3s, color 0.3s, transform 0.2s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "var(--accent)"; e.currentTarget.style.color = "#fff"; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--accent)"; e.currentTarget.style.transform = "translateY(0)"; }}
            >
              Entre em Contato
            </a>
          </div>
        </div>

        {/* Profile image */}
        <div style={{ flex: "0 0 auto", display: "flex", justifyContent: "center", alignItems: "center" }}>
          <ProfileAvatar />
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: "absolute", bottom: "2rem", left: "50%", transform: "translateX(-50%)",
        display: "flex", flexDirection: "column", alignItems: "center", gap: "0.4rem",
        color: "var(--text-muted)", fontSize: "0.8rem", fontWeight: 600,
      }}>
        <span>Role para baixo</span>
        <div style={{
          width: 24, height: 38, border: "2px solid var(--border)", borderRadius: 12,
          display: "flex", justifyContent: "center", paddingTop: 6,
        }}>
          <div style={{
            width: 4, height: 8, background: "var(--accent)", borderRadius: 2,
            animation: "scrollDot 1.5s infinite",
          }} />
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.4); }
        }
        @keyframes scrollDot {
          0% { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(12px); opacity: 0; }
        }
      `}</style>
    </section>
  );
}

/* ─────────────────────────────────────────────
   ABOUT SECTION
───────────────────────────────────────────── */
function About() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.15 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      id="sobre"
      style={{
        padding: "6rem 1.5rem",
        background: "var(--bg2)",
        borderTop: "1px solid var(--border)",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(30px)",
        transition: "opacity 0.7s ease, transform 0.7s ease",
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <h2 className="section-title">Sobre Mim</h2>
        <div className="section-divider" />

        <div style={{
          display: "flex", gap: "4rem", alignItems: "center", flexWrap: "wrap",
        }}>
          {/* Text */}
          <div style={{ flex: "1 1 320px" }}>
            <p style={{
              fontSize: "1.1rem", lineHeight: 1.9, color: "var(--text-muted)",
              marginBottom: "1.5rem", textAlign: "justify",
            }}>
              Meu nome é <strong style={{ color: "var(--text)" }}>Murilo Rodrigues</strong>, tenho 18 anos e estudo{" "}
              <strong style={{ color: "var(--accent)" }}>Análise e Desenvolvimento de Sistemas</strong> com ensino médio integrado na{" "}
              <strong style={{ color: "var(--accent)" }}>ETEC Professor Camargo Aranha</strong>.
            </p>
            <p style={{
              fontSize: "1.1rem", lineHeight: 1.9, color: "var(--text-muted)",
              marginBottom: "1.5rem", textAlign: "justify",
            }}>
              Tenho me aprimorado em cursos de programação que desenvolveram habilidades como desenvolvimento de aplicações{" "}
              <strong style={{ color: "var(--accent)" }}>backend</strong> utilizando{" "}
              <strong style={{ color: "var(--accent)" }}>Java</strong>, além de conhecimentos em{" "}
              <strong style={{ color: "var(--accent)" }}>Web Design e Frontend</strong>.
            </p>
            <p style={{
              fontSize: "1.1rem", lineHeight: 1.9, color: "var(--text-muted)",
              textAlign: "justify",
            }}>
              Desenvolvi essas habilidades com o objetivo de aprimorar minhas competências técnicas e me preparar para atuar no mercado de{" "}
              <strong style={{ color: "var(--accent)" }}>desenvolvimento de software</strong>.
            </p>

            {/* Stats */}
            <div style={{
              display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem", marginTop: "2.5rem",
            }}>
              {[
                { value: "2+", label: "Anos estudando" },
                { value: "5+", label: "Projetos feitos" },
                { value: "Top 25", label: "Hackathon" },
              ].map((s) => (
                <div key={s.label} className="card" style={{ textAlign: "center", padding: "1.2rem 0.5rem" }}>
                  <div style={{ fontSize: "1.8rem", fontWeight: 800, color: "var(--accent)" }}>{s.value}</div>
                  <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: "0.2rem" }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ETEC image */}
          <div style={{
            flex: "0 0 auto", display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem",
          }}>
            <div className="card" style={{ padding: "1rem", textAlign: "center", maxWidth: 280 }}>
              <div style={{
                width: 250, height: 180,
                background: `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url(${etecImageUrl}) center/cover no-repeat`,
                borderRadius: "0.75rem",
                display: "flex", alignItems: "center", justifyContent: "center",
                marginBottom: "0.75rem",
                overflow: "hidden",
                position: "relative",
              }}>
                {/* ETEC building visual representation */}
                <div style={{ textAlign: "center", color: "#fff", padding: "1rem", marginRight: "0.75rem" }}>
                  <div style={{ fontWeight: 700, fontSize: "0.9rem", marginTop: "0.5rem", color: "#fff" }}>
                    ETEC Camargo Aranha
                  </div>
                </div>
              </div>
              <p style={{ color: "#fff", fontWeight: 700, fontSize: "0.9rem" }}>
                Análise e Desenvolvimento de Sistemas
              </p>
              <p style={{ color: "#e5e9f0", fontSize: "0.8rem", marginTop: "0.3rem" }}>
                São Paulo, SP · 2024 – presente
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   SKILLS SECTION
───────────────────────────────────────────── */
function Skills() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.15 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const skillGroups = [
    {
      title: "Backend",
      emoji: "⚙️",
      skills: ["Java", "Spring Boot", "REST APIs", "MySQL", "Git", "Github"],
    },
    {
      title: "Frontend",
      emoji: "🎨",
      skills: ["HTML5", "CSS3", "JavaScript", "React", "Tailwind CSS"],
    },
    {
      title: "Ferramentas",
      emoji: "🛠️",
      skills: ["Git & GitHub", "VS Code", "IntelliJ IDEA", "Figma"],
    },
  ];

  return (
    <section
      ref={ref}
      id="habilidades"
      style={{
        padding: "6rem 1.5rem",
        background: "var(--bg)",
        borderTop: "1px solid var(--border)",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(30px)",
        transition: "opacity 0.7s ease, transform 0.7s ease",
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <h2 className="section-title">Habilidades</h2>
        <div className="section-divider" />

        <div style={{
          display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "2rem",
        }}>
          {skillGroups.map((group) => (
            <div key={group.title} className="card" style={{ padding: "2rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem" }}>
                <span style={{ fontSize: "1.8rem" }}>{group.emoji}</span>
                <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "var(--text)" }}>{group.title}</h3>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem" }}>
                {group.skills.map((skill) => (
                  <span key={skill} className="skill-tag">{skill}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   PROJECTS SECTION
───────────────────────────────────────────── */
function Projects() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const projects = [
    {
      title: "Agenda de Contatos",
      description:
        "Aplicação desktop em Java para gerenciamento de contatos. Permite cadastrar, visualizar, atualizar e excluir contatos de forma simples e eficiente.",
      tags: ["Java", "MySQL", "Spring Boot"],
      emoji: "📒",
      gradient: "linear-gradient(135deg, #183d3d, #0b4242)",
      link: "https://github.com/MuriloRVv2/AgendaContatos",
      linkLabel: "GitHub",
    },
    {
      title: "Game On Tech – Hackathon",
      description:
        "Finalista (dentre 25 participantes) no Hackathon Game On de Tecnologia, promovido pela Se Liga By Mileto. 7 dias de desenvolvimento com 30 horas dedicadas, focado em IA e primeiro emprego.",
      tags: ["Hackathon", "IA", "Finalista", "30h"],
      emoji: "🏆",
      gradient: "linear-gradient(135deg, #1a1a2e, #16213e)",
      link: null,
      linkLabel: null,
    },
    {
      title: "Portfolio Pessoal",
      description:
        "Este portfolio! Desenvolvido com React, Vite e Tailwind CSS, animações de scroll e design responsivo.",
      tags: ["React", "TypeScript", "Tailwind CSS", "Vite"],
      emoji: "🌐",
      gradient: "linear-gradient(135deg, #0b4242, #183d3d)",
      link: "https://github.com/MuriloRVv2",
      linkLabel: "GitHub",
    },
    {
      title: "Projeto de Gerador de CSS com IA",
      description:
        "Projeto de curso online de Devclub para criar um gerador de código CSS usando inteligência artificial. O objetivo é permitir que os usuários descrevam o estilo desejado em linguagem natural e recebam o código CSS correspondente.",
      tags: ["HTML5", "CSS3", "JavaScript", "IA"],
      emoji: "🎨",
      gradient: "linear-gradient(135deg, #1a1a2e, #16213e)",
      link: "https://github.com/MuriloRVv2/DevClub-aula",
      linkLabel: "GitHub",
    },
    {
      title: "Projeto de Barbearia Online",
      description:
        "Projeto pessoal de criar um site de barbearia. O objetivo é desenvolver um site responsivo e moderno para uma barbearia fictícia, utilizando as melhores práticas de desenvolvimento web.",
      tags: ["Java", "Spring Boot", "React", "PostgreSQL"],
      emoji: "💈",
      gradient: "linear-gradient(135deg, #0b4242, #183d3d)",
      link: "https://github.com/MuriloRVv2/BarberList",
      linkLabel: "GitHub",
    },
    {
      title: "Ver mais projetos no meu GitHub",
      description:
        "Tenho diversos outros projetos menores e contribuições em andamento. Sinta-se à vontade para explorar meu perfil no GitHub e conferir o que mais estou desenvolvendo!",
      tags: ["GitHub"],
      emoji: "🌐",
      gradient: "linear-gradient(135deg, #1a1a2e, #16213e)",
      link: "https://github.com/MuriloRVv2",
      linkLabel: "GitHub",
    }

  ];

  return (
    <section
      ref={ref}
      id="projetos"
      style={{
        padding: "6rem 1.5rem",
        background: "var(--bg2)",
        borderTop: "1px solid var(--border)",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(30px)",
        transition: "opacity 0.7s ease, transform 0.7s ease",
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <h2 className="section-title">Projetos</h2>
        <div className="section-divider" />

        <div style={{
          display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem",
        }}>
          {projects.map((p, i) => (
            <div
              key={p.title}
              className="card"
              style={{
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                animationDelay: `${i * 0.1}s`,
              }}
            >
              {/* Card header */}
              <div style={{
                background: p.gradient,
                padding: "2.5rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "3.5rem",
                position: "relative",
              }}>
                {p.emoji}
                <div style={{
                  position: "absolute", inset: 0,
                  backgroundImage: "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
                  backgroundSize: "20px 20px",
                }} />
              </div>

              {/* Card body */}
              <div style={{ padding: "1.5rem", flex: 1, display: "flex", flexDirection: "column" }}>
                <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "var(--text)", marginBottom: "0.75rem" }}>
                  {p.title}
                </h3>
                <p style={{ color: "var(--text-muted)", lineHeight: 1.7, fontSize: "0.95rem", flex: 1, marginBottom: "1.2rem" }}>
                  {p.description}
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1.2rem" }}>
                  {p.tags.map((t) => <span key={t} className="skill-tag">{t}</span>)}
                </div>
                {p.link && (
                  <a
                    href={p.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "inline-flex", alignItems: "center", gap: "0.4rem",
                      color: "var(--accent)", fontWeight: 700, fontSize: "0.9rem",
                      textDecoration: "none", transition: "gap 0.3s ease",
                    }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.gap = "0.7rem"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.gap = "0.4rem"; }}
                  >
                    <IconExternalLink /> {p.linkLabel} →
                  </a>
                )}
                {!p.link && (
                  <span style={{
                    display: "inline-flex", alignItems: "center", gap: "0.4rem",
                    color: "var(--text-muted)", fontSize: "0.85rem", fontStyle: "italic",
                  }}>
                    🏅 Certificado de Finalista
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   CONTACT SECTION
───────────────────────────────────────────── */
function Contact() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [form, setForm] = useState({ nome: "", email: "", mensagem: "" });

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("https://formsubmit.co/ajax/muriloveroneze0987@gmail.com", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("success");
        setForm({ nome: "", email: "", mensagem: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section
      ref={ref}
      id="contato"
      style={{
        padding: "6rem 1.5rem",
        background: "var(--primary)",
        borderTop: "1px solid var(--border)",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(30px)",
        transition: "opacity 0.7s ease, transform 0.7s ease",
      }}
    >
      <div style={{ maxWidth: 700, margin: "0 auto" }}>
        <h2 className="section-title" style={{ color: "#e6edf3" }}>Entre em Contato</h2>
        <div className="section-divider" />
        <p style={{
          textAlign: "center", color: "#8b949e", marginBottom: "3rem",
          fontSize: "1.05rem", lineHeight: 1.7,
        }}>
          Tem algum projeto em mente ou quer conversar sobre oportunidades? Me manda uma mensagem!
        </p>

        {status === "success" ? (
          <div style={{
            textAlign: "center", padding: "3rem",
            background: "var(--card-bg)", borderRadius: "1rem",
            border: "1px solid var(--accent)",
          }}>
            <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>✅</div>
            <h3 style={{ color: "var(--accent)", fontSize: "1.5rem", fontWeight: 700, marginBottom: "0.5rem" }}>
              Mensagem enviada!
            </h3>
            <p style={{ color: "var(--text-muted)" }}>Obrigado pelo contato. Responderei em breve!</p>
            <button
              onClick={() => setStatus("idle")}
              className="submit-btn"
              style={{ marginTop: "1.5rem" }}
            >
              Enviar outra mensagem
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <div>
              <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 600, color: "#8b949e", fontSize: "0.9rem" }}>
                Nome *
              </label>
              <input
                className="form-input"
                type="text"
                name="nome"
                value={form.nome}
                onChange={handleChange}
                required
                placeholder="Seu nome completo"
              />
            </div>
            <div>
              <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 600, color: "#8b949e", fontSize: "0.9rem" }}>
                Email *
              </label>
              <input
                className="form-input"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="seu@email.com"
              />
            </div>
            <div>
              <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 600, color: "#8b949e", fontSize: "0.9rem" }}>
                Mensagem *
              </label>
              <textarea
                className="form-input"
                name="mensagem"
                value={form.mensagem}
                onChange={handleChange}
                required
                placeholder="Sua mensagem aqui..."
                style={{ height: 160, resize: "vertical" }}
              />
            </div>

            {status === "error" && (
              <p style={{ color: "#f85149", fontWeight: 600, textAlign: "center" }}>
                ❌ Erro ao enviar. Tente novamente ou entre em contato pelo WhatsApp.
              </p>
            )}

            <div style={{ display: "flex", gap: "1rem", justifyContent: "center", marginTop: "0.5rem" }}>
              <button type="submit" className="submit-btn" disabled={status === "sending"}
                style={{ display: "flex", alignItems: "center", gap: "0.5rem", opacity: status === "sending" ? 0.7 : 1 }}>
                <IconSend /> {status === "sending" ? "Enviando..." : "Enviar Mensagem"}
              </button>
              <button
                type="button"
                className="reset-btn"
                onClick={() => { setForm({ nome: "", email: "", mensagem: "" }); setStatus("idle"); }}
              >
                Limpar
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   FOOTER
───────────────────────────────────────────── */
function Footer() {
  const socials = [
    {
      name: "WhatsApp",
      cls: "whatsapp",
      href: "https://api.whatsapp.com/send/?phone=5511961440243&text&type=phone_number&app_absent=0",
      icon: <IconWhatsApp />,
    },
    {
      name: "GitHub",
      cls: "github",
      href: "https://github.com/MuriloRVv2",
      icon: <IconGithub />,
    },
    {
      name: "Instagram",
      cls: "instagram",
      href: "https://www.instagram.com/mrvv_o7/",
      icon: <IconInstagram />,
    },
    {
      name: "LinkedIn",
      cls: "linkedin",
      href: "https://www.linkedin.com/in/murilo-rodrigues-viegas-883628311",
      icon: <IconLinkedIn />,
    },
  ];

  return (
    <footer style={{
      background: "var(--primary)",
      borderTop: "1px solid var(--border)",
      padding: "3rem 1.5rem",
      textAlign: "center",
    }}>
      {/* Logo */}
      <div style={{ marginBottom: "1.5rem", display: "flex", justifyContent: "center" }}>
        <LogoMR />
      </div>

      {/* Social links */}
      <div style={{ display: "flex", gap: "1rem", justifyContent: "center", marginBottom: "2rem", flexWrap: "wrap" }}>
        {socials.map((s) => (
          <div key={s.name} className="tooltip-wrap">
            <a
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.name}
              className={`social-icon ${s.cls}`}
            >
              {s.icon}
            </a>
            <span className="tip">{s.name}</span>
          </div>
        ))}
      </div>

      {/* Nav links */}
      <div style={{ display: "flex", gap: "2rem", justifyContent: "center", marginBottom: "2rem", flexWrap: "wrap" }}>
        {[
          { href: "#sobre", label: "Sobre" },
          { href: "#habilidades", label: "Habilidades" },
          { href: "#projetos", label: "Projetos" },
          { href: "#contato", label: "Contato" },
        ].map((l) => (
          <a
            key={l.href}
            href={l.href}
            onClick={(e) => { e.preventDefault(); document.querySelector(l.href)?.scrollIntoView({ behavior: "smooth" }); }}
            style={{
              color: "#8b949e", textDecoration: "none", fontSize: "0.9rem", fontWeight: 600,
              transition: "color 0.3s ease",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--accent)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "#8b949e"; }}
          >
            {l.label}
          </a>
        ))}
      </div>

      <p style={{ color: "#8b949e", fontSize: "0.85rem" }}>
        © 2026 <strong style={{ color: "var(--accent)" }}>Murilo Rodrigues</strong>. Todos os direitos reservados.
      </p>
    </footer>
  );
}

/* ─────────────────────────────────────────────
   BACK TO TOP BUTTON
───────────────────────────────────────────── */
function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 400);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return show ? (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Voltar ao topo"
      style={{
        position: "fixed", bottom: "2rem", right: "2rem",
        width: 48, height: 48, borderRadius: "50%",
        background: "linear-gradient(135deg, var(--accent), var(--highlight))",
        border: "none", cursor: "pointer",
        display: "flex", alignItems: "center", justifyContent: "center",
        color: "#fff", fontSize: "1.2rem",
        boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
        zIndex: 998,
        transition: "transform 0.3s ease, opacity 0.3s ease",
      }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)"; }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}
    >
      ↑
    </button>
  ) : null;
}

/* ─────────────────────────────────────────────
   APP ROOT
───────────────────────────────────────────── */
export default function App() {
  const [dark, setDark] = useState(() => {
    try {
      return localStorage.getItem("tema") === "escuro";
    } catch {
      return false;
    }
  });

  const toggleDark = () => {
    setDark((d) => {
      const next = !d;
      localStorage.setItem("tema", next ? "escuro" : "claro");
      return next;
    });
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
  }, [dark]);

  return (
    <div>
      <Navbar dark={dark} toggleDark={toggleDark} />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
      <BackToTop />
    </div>
  );
}
