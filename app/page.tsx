"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  LazyMotion,
  MotionConfig,
  domAnimation,
  m,
  useReducedMotion,
} from "motion/react";

const WHATSAPP_NUMBER = "5527920026247";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Olá! Gostaria de conhecer seus serviços.",
)}`;

const services = [
  {
    label: "Presença digital",
    title: "Sites que apresentam e convertem",
    text: "Criamos sites e landing pages rápidos, responsivos e alinhados à sua marca — com uma jornada clara para transformar visitas em conversas.",
    highlights: ["Estratégia", "Design", "Desenvolvimento"],
    accent: "blue",
    icon: "web",
  },
  {
    label: "Operação digital",
    title: "Sistemas que organizam e escalam",
    text: "Desenvolvemos sistemas sob medida para simplificar processos, conectar informações e dar mais controle à sua operação.",
    highlights: ["Sistemas web", "Automação", "Integrações"],
    accent: "gold",
    icon: "system",
  },
] as const;

const projects = [
  {
    title: "Presença premium",
    description:
      "Landing page para uma marca de serviços, com narrativa clara e conversão direta pelo WhatsApp.",
    tags: ["Web design", "Conversão"],
    kind: "website",
    theme: "navy",
  },
  {
    title: "Atendimento inteligente",
    description:
      "Fluxo que organiza contatos, qualifica demandas e encaminha cada oportunidade para o próximo passo.",
    tags: ["Automação", "IA"],
    kind: "automation",
    theme: "sand",
  },
  {
    title: "Operação em um só lugar",
    description:
      "Painel para acompanhar tarefas, indicadores e decisões sem depender de planilhas dispersas.",
    tags: ["Sistema", "Dashboard"],
    kind: "dashboard",
    theme: "ice",
  },
  {
    title: "Jornada integrada",
    description:
      "Experiência conectando site, formulário, CRM e atendimento em uma única jornada comercial.",
    tags: ["Integrações", "Produto digital"],
    kind: "integration",
    theme: "charcoal",
  },
] as const;

const principles = [
  {
    title: "Clareza desde o início",
    text: "Objetivos, prioridades e próximos passos definidos sem complicação.",
  },
  {
    title: "Design com propósito",
    text: "Uma experiência bonita, intuitiva e consistente em qualquer tela.",
  },
  {
    title: "Tecnologia preparada para evoluir",
    text: "Soluções rápidas, bem construídas e prontas para acompanhar o negócio.",
  },
] as const;

function trackEvent(eventName: string, parameters: Record<string, string>) {
  if (typeof window === "undefined") return;
  const analyticsWindow = window as Window & {
    gtag?: (command: string, event: string, params: Record<string, string>) => void;
  };
  analyticsWindow.gtag?.("event", eventName, parameters);
}

function WhatsAppLink({
  children,
  className,
  location,
}: {
  children: React.ReactNode;
  className: string;
  location: string;
}) {
  const isPrimaryAction = className.includes("button");

  return (
    <m.a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noreferrer"
      className={className}
      onClick={() => trackEvent("whatsapp_click", { location })}
      whileHover={isPrimaryAction ? { y: -2 } : undefined}
      whileTap={isPrimaryAction ? { scale: 0.985 } : undefined}
      aria-label={`${typeof children === "string" ? children : "Falar com a Aurevion"} (abre em nova aba)`}
    >
      {children}
    </m.a>
  );
}

function ServiceGlyph({ kind }: { kind: (typeof services)[number]["icon"] }) {
  const common = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  if (kind === "web") {
    return <svg {...common}><rect x="2.5" y="4" width="19" height="16" rx="3" /><path d="M2.5 8.5h19" /><path d="M6 6.3h.01M9 6.3h.01" /></svg>;
  }

  return <svg {...common}><rect x="3" y="3" width="7.5" height="7.5" rx="2" /><rect x="13.5" y="3" width="7.5" height="7.5" rx="2" /><rect x="3" y="13.5" width="7.5" height="7.5" rx="2" /><path d="M14 17.2h7M17.5 13.7v7" /></svg>;
}

function ProjectVisual({ kind }: { kind: (typeof projects)[number]["kind"] }) {
  if (kind === "website") {
    return (
      <figure className="project-visual visual-website">
        <div className="system-window website-window" aria-hidden="true">
          <div className="system-window-bar">
            <span className="window-dots"><i /><i /><i /></span>
            <small>aurevion.digital</small>
          </div>
          <div className="website-preview-nav"><strong>AUREVION</strong><span>ESTRATÉGIA · DESIGN · CÓDIGO</span></div>
          <div className="website-preview-body">
            <p>EXPERIÊNCIA DIGITAL</p>
            <h3>Ideias que<br />ganham direção.</h3>
            <span className="website-preview-cta">Começar projeto</span>
          </div>
          <div className="website-preview-status"><span>JORNADA CONECTADA</span><strong>Site + WhatsApp</strong></div>
        </div>
        <figcaption>Interface demonstrativa · presença digital</figcaption>
      </figure>
    );
  }

  if (kind === "automation") {
    return (
      <figure className="project-visual visual-automation">
        <div className="automation-canvas" aria-hidden="true">
          <div className="system-kicker"><span /> FLUXO DEMONSTRATIVO</div>
          <div className="flow-node flow-start"><small>ENTRADA</small><strong>Novo contato</strong><span>Formulário ou WhatsApp</span></div>
          <div className="flow-connector flow-connector-one" />
          <div className="flow-node flow-ai"><small>ORGANIZAÇÃO</small><strong>Regras + IA</strong><span>Classificação da demanda</span></div>
          <div className="flow-connector flow-connector-two" />
          <div className="flow-node flow-end"><small>DESTINO</small><strong>Próximo passo</strong><span>CRM e atendimento</span></div>
        </div>
        <figcaption>Interface demonstrativa · automação de atendimento</figcaption>
      </figure>
    );
  }

  if (kind === "dashboard") {
    return (
      <figure className="project-visual visual-dashboard">
        <div className="dashboard-shell" aria-hidden="true">
          <aside>
            <div className="dash-brand">A</div>
            <span className="dash-nav-item is-current">Visão</span>
            <span className="dash-nav-item">Fluxos</span>
            <span className="dash-nav-item">Equipe</span>
          </aside>
          <div className="dash-main">
            <div className="dash-head"><span>Visão operacional</span><small>HOJE</small></div>
            <div className="dash-metrics">
              <div><small>PROJETOS</small><strong>Em andamento</strong></div>
              <div><small>ATENDIMENTO</small><strong>Organizado</strong></div>
              <div><small>ENTREGAS</small><strong>Por etapa</strong></div>
            </div>
            <div className="dash-chart">
              <div className="dash-chart-head"><span>Ritmo da operação</span><small>7 DIAS</small></div>
              <div className="chart-bars"><i /><i /><i /><i /><i /><i /><i /></div>
            </div>
          </div>
        </div>
        <figcaption>Interface demonstrativa · painel sob medida</figcaption>
      </figure>
    );
  }

  return (
    <figure className="project-visual visual-integration">
      <div className="integration-canvas" aria-hidden="true">
        <div className="integration-grid" />
        <div className="integration-core"><span>A</span></div>
        <div className="integration-node node-site"><strong>Site</strong></div>
        <div className="integration-node node-crm"><strong>CRM</strong></div>
        <div className="integration-node node-whatsapp"><strong>WhatsApp</strong></div>
        <div className="integration-node node-data"><strong>Dados</strong></div>
        <i className="integration-line line-site" /><i className="integration-line line-crm" />
        <i className="integration-line line-whatsapp" /><i className="integration-line line-data" />
      </div>
      <figcaption>Interface demonstrativa · jornada integrada</figcaption>
    </figure>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const mobileNavRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!menuOpen) return;

    const focusFrame = window.requestAnimationFrame(() => {
      mobileNavRef.current?.querySelector<HTMLAnchorElement>("a")?.focus();
    });
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setMenuOpen(false);
      menuButtonRef.current?.focus();
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => {
      window.cancelAnimationFrame(focusFrame);
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [menuOpen]);

  function closeMenu() {
    setMenuOpen(false);
  }

  function submitContact(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const message = String(data.get("message") || "").trim();
    const text = [
      "Olá! Gostaria de conversar sobre um projeto com a Aurevion.",
      "",
      `Nome: ${name}`,
      `E-mail: ${email}`,
      `Projeto: ${message}`,
    ].join("\n");

    trackEvent("contact_form_submit", { channel: "whatsapp" });
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
  }

  return (
    <MotionConfig reducedMotion="user" transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}>
      <LazyMotion features={domAnimation}>
        <>
      <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>

      <header className="site-header">
        <div className="header-inner shell">
          <a className="brand" href="#inicio" onClick={closeMenu} aria-label="Aurevion — início">
            <img src="/aurevion-symbol.png" alt="" width="40" height="40" />
            <span>AUREVION</span>
          </a>

          <nav className="main-nav desktop-nav" aria-label="Navegação principal">
            <a href="#servicos">Serviços</a>
            <a href="#projetos">Projetos</a>
            <a href="#processo">Como fazemos</a>
            <a href="#contato">Contato</a>
          </nav>

          <div className="header-actions">
            <WhatsAppLink className="button button-small button-gold header-cta" location="header">
              Falar no WhatsApp
            </WhatsAppLink>
            <m.button
              ref={menuButtonRef}
              className={menuOpen ? "menu-toggle is-open" : "menu-toggle"}
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              whileTap={{ scale: 0.94 }}
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
              aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            >
              <i /><i />
            </m.button>
          </div>
        </div>
        <AnimatePresence>
          {menuOpen ? (
            <m.nav
              ref={mobileNavRef}
              id="mobile-navigation"
              className="mobile-nav"
              aria-label="Navegação mobile"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <a href="#servicos" onClick={closeMenu}>Serviços</a>
              <a href="#projetos" onClick={closeMenu}>Projetos</a>
              <a href="#processo" onClick={closeMenu}>Como fazemos</a>
              <a href="#contato" onClick={closeMenu}>Contato</a>
            </m.nav>
          ) : null}
        </AnimatePresence>
      </header>

      <main id="conteudo">
        <section className="hero" id="inicio">
          <div className="hero-inner shell">
            <m.div
              className="hero-copy"
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.72, delay: 0.08 }}
            >
              <div className="eyebrow eyebrow-light"><span /> Tecnologia com direção</div>
              <h1>Sites e sistemas que fazem sua empresa <em>avançar.</em></h1>
              <p className="hero-subtitle">
                A Aurevion transforma ideias em experiências digitais claras, bonitas e prontas para gerar novas oportunidades.
              </p>
              <div className="hero-actions">
                <WhatsAppLink className="button button-primary" location="hero">
                  Conversar no WhatsApp
                </WhatsAppLink>
                <m.a className="button button-ghost" href="#servicos" whileHover={{ y: -2 }} whileTap={{ scale: 0.985 }}>Conhecer soluções</m.a>
              </div>
            </m.div>

            <m.div
              className="hero-stage"
              aria-label="Filme de marca da Aurevion"
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.78, delay: 0.2 }}
            >
              <div className="hero-media">
                <video
                  className="hero-video"
                  autoPlay={!prefersReducedMotion}
                  muted
                  loop={!prefersReducedMotion}
                  playsInline
                  preload="metadata"
                  poster="/aurevion-hero-poster.png"
                  aria-label="Composição audiovisual da Aurevion: tecnologia com direção"
                >
                  <source src="/aurevion-hero.mp4" type="video/mp4" />
                </video>
                <div className="hero-media-shade" aria-hidden="true" />
              </div>
            </m.div>
          </div>

        </section>

        <section className="section services" id="servicos">
          <div className="shell">
            <div className="section-heading split-heading">
              <div>
                <div className="eyebrow"><span /> O que construímos</div>
                <h2>Digital, do jeito que<br />seu negócio precisa.</h2>
              </div>
              <p>Do primeiro contato à operação do dia a dia, criamos a tecnologia certa para cada objetivo.</p>
            </div>

            <div className="services-grid">
              {services.map((service, index) => (
                <m.article
                  className={`service-card accent-${service.accent}`}
                  key={service.title}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-70px" }}
                  transition={{ delay: index * 0.07 }}
                >
                  <div className="service-header">
                    <div className="service-icon"><ServiceGlyph kind={service.icon} /></div>
                    <span className="service-label">{service.label}</span>
                  </div>
                  <div className="service-copy">
                    <h3>{service.title}</h3>
                    <p>{service.text}</p>
                  </div>
                  <div className="service-highlights" aria-label={`Inclui ${service.highlights.join(", ")}`}>
                    {service.highlights.map((highlight) => <span key={highlight}>{highlight}</span>)}
                  </div>
                </m.article>
              ))}
            </div>
          </div>
        </section>

        <section className="section projects" id="projetos">
          <div className="shell">
            <div className="section-heading split-heading project-heading">
              <div>
                <div className="eyebrow"><span /> O que podemos criar</div>
                <h2>Experiências digitais<br />com acabamento de verdade.</h2>
              </div>
              <p>Interfaces que mostram como sites, sistemas e automações podem trabalhar juntos para melhorar a experiência do cliente e da equipe.</p>
            </div>

            <div className="projects-grid">
              {projects.map((project, index) => (
                <m.article
                  className={`project-card project-${project.theme}`}
                  key={project.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ delay: index * 0.06 }}
                >
                  <ProjectVisual kind={project.kind} />
                  <div className="project-info">
                    <div className="project-copy">
                      <h3>{project.title}</h3>
                      <p>{project.description}</p>
                      <div className="project-tags">
                        {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
                      </div>
                    </div>
                  </div>
                </m.article>
              ))}
            </div>
          </div>
        </section>

        <section className="section principles" id="processo">
          <div className="shell principles-shell">
            <div className="principles-intro">
              <div className="eyebrow eyebrow-light"><span /> Nosso jeito</div>
              <h2>Simples para você.<br /><em>Bem construído por nós.</em></h2>
              <p>Entendemos o objetivo, desenhamos a experiência e desenvolvemos uma solução pronta para funcionar bem hoje e evoluir amanhã.</p>
              <WhatsAppLink className="text-link" location="diferenciais">Falar sobre seu projeto</WhatsAppLink>
            </div>
            <div className="principles-list">
              {principles.map((principle) => (
                <m.article
                  className="principle-item"
                  key={principle.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                >
                  <span className="principle-mark" aria-hidden="true" />
                  <div><h3>{principle.title}</h3><p>{principle.text}</p></div>
                </m.article>
              ))}
            </div>
          </div>
        </section>

        <section className="section contact" id="contato">
          <div className="shell contact-shell">
            <div className="contact-copy">
              <div className="eyebrow"><span /> Vamos conversar</div>
              <h2>Vamos construir algo <em>muito bom.</em></h2>
              <p>Conte o que sua empresa precisa. A Aurevion ajuda a encontrar o melhor caminho e transforma a ideia em uma solução digital de verdade.</p>
              <div className="contact-direct">
                <span>Prefere ir direto?</span>
                <WhatsAppLink className="contact-phone" location="contato-direto">+55 27 92002-6247</WhatsAppLink>
              </div>
            </div>

            <m.form
              className="contact-form"
              onSubmit={submitContact}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
            >
              <div className="form-heading"><span>Conte um pouco sobre o projeto</span><small>Todos os campos são obrigatórios</small></div>
              <label>
                <span>Seu nome</span>
                <input type="text" name="name" placeholder="Como podemos chamar você?" autoComplete="name" required minLength={2} />
              </label>
              <label>
                <span>Seu e-mail</span>
                <input type="email" name="email" placeholder="voce@empresa.com" autoComplete="email" required />
              </label>
              <label>
                <span>Sobre o projeto</span>
                <textarea name="message" placeholder="O que você quer criar ou melhorar?" rows={4} required minLength={10} />
              </label>
              <m.button className="button button-primary form-submit" type="submit" whileHover={{ y: -2 }} whileTap={{ scale: 0.99 }}>Enviar pelo WhatsApp</m.button>
              <p className="form-note">Abriremos o WhatsApp com sua mensagem pronta. Você poderá revisar antes de enviar.</p>
            </m.form>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="shell footer-main">
          <div className="footer-brand">
            <a className="brand brand-footer" href="#inicio" aria-label="Aurevion — voltar ao início">
              <img src="/aurevion-symbol.png" alt="" width="44" height="44" />
              <span>AUREVION</span>
            </a>
            <p>Tecnologia com direção.<br />Experiências digitais com propósito.</p>
          </div>
          <div className="footer-links">
            <div><h3>Navegação</h3><a href="#servicos">Serviços</a><a href="#projetos">Projetos</a><a href="#processo">Como fazemos</a></div>
            <div><h3>Contato</h3><WhatsAppLink className="footer-link" location="footer">WhatsApp</WhatsAppLink><a href="#contato">Enviar briefing</a><a href="https://github.com/aureviontecnologia/aurevion-site" target="_blank" rel="noreferrer">GitHub</a></div>
          </div>
        </div>
        <div className="shell footer-bottom">
          <span>© {new Date().getFullYear()} Aurevion. Todos os direitos reservados.</span>
          <span>Design · Tecnologia · Evolução</span>
        </div>
      </footer>
        </>
      </LazyMotion>
    </MotionConfig>
  );
}
