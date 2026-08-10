"use client";

import { FormEvent, useEffect, useState } from "react";
import {
  LazyMotion,
  MotionConfig,
  domAnimation,
  m,
  useScroll,
  useSpring,
} from "motion/react";

const WHATSAPP_NUMBER = "5527920026247";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Olá! Gostaria de conhecer seus serviços.",
)}`;

const services = [
  {
    number: "01",
    title: "Sites & landing pages",
    text: "Experiências rápidas, responsivas e pensadas para apresentar sua marca com clareza e gerar novos contatos.",
    accent: "blue",
  },
  {
    number: "02",
    title: "Sistemas sob medida",
    text: "Produtos digitais construídos em torno da sua operação, sem processos genéricos ou complexidade desnecessária.",
    accent: "gold",
  },
  {
    number: "03",
    title: "Automação & IA",
    text: "Fluxos inteligentes para reduzir tarefas repetitivas, acelerar o atendimento e organizar oportunidades.",
    accent: "ink",
  },
  {
    number: "04",
    title: "Integrações & evolução",
    text: "Conectamos ferramentas, dados e canais para sua tecnologia acompanhar o crescimento do negócio.",
    accent: "slate",
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
    number: "01",
    title: "Clareza antes do código",
    text: "Começamos pelo objetivo, pelo público e pela jornada. Cada decisão precisa ter uma razão.",
  },
  {
    number: "02",
    title: "Design premium, desempenho real",
    text: "Estética refinada, carregamento rápido e experiência consistente em qualquer tela.",
  },
  {
    number: "03",
    title: "Parceria próxima",
    text: "Comunicação direta, etapas transparentes e uma solução preparada para evoluir.",
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
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noreferrer"
      className={className}
      onClick={() => trackEvent("whatsapp_click", { location })}
      aria-label={`${typeof children === "string" ? children : "Falar com a Aurevion"} (abre em nova aba)`}
    >
      {children}
    </a>
  );
}

function ProjectVisual({ kind }: { kind: (typeof projects)[number]["kind"] }) {
  if (kind === "website") {
    return (
      <div className="mock-browser mock-website" aria-hidden="true">
        <div className="mock-toolbar"><i /><i /><i /></div>
        <div className="mock-nav"><span>AUREVION</span><b /></div>
        <div className="mock-web-body">
          <small>EXPERIÊNCIA DIGITAL</small>
          <strong>Ideias que<br />ganham direção.</strong>
          <div className="mock-button" />
        </div>
        <div className="mock-floating-card"><i /><span><b /> <b /></span></div>
      </div>
    );
  }

  if (kind === "automation") {
    return (
      <div className="automation-canvas" aria-hidden="true">
        <div className="automation-label">Fluxo ativo <span /></div>
        <div className="flow-node flow-start"><i>01</i><span><b>Novo contato</b><small>WhatsApp</small></span></div>
        <div className="flow-line line-one" />
        <div className="flow-node flow-ai"><i>AI</i><span><b>Qualificar lead</b><small>Automação</small></span></div>
        <div className="flow-line line-two" />
        <div className="flow-node flow-end"><i>03</i><span><b>Próxima ação</b><small>CRM</small></span></div>
      </div>
    );
  }

  if (kind === "dashboard") {
    return (
      <div className="dashboard-shell" aria-hidden="true">
        <aside><div className="dash-brand">A</div><i /><i /><i /><i /></aside>
        <div className="dash-main">
          <div className="dash-head"><span>Visão geral</span><b /></div>
          <div className="dash-metrics"><i /><i /><i /></div>
          <div className="dash-chart"><span>Performance</span><div className="chart-bars"><i /><i /><i /><i /><i /><i /><i /></div></div>
        </div>
      </div>
    );
  }

  return (
    <div className="integration-canvas" aria-hidden="true">
      <div className="integration-core">A</div>
      <div className="orbit orbit-one"><span>Site</span></div>
      <div className="orbit orbit-two"><span>CRM</span></div>
      <div className="orbit orbit-three"><span>IA</span></div>
      <div className="orbit orbit-four"><span>Dados</span></div>
      <i className="orbit-line l1" /><i className="orbit-line l2" />
      <i className="orbit-line l3" /><i className="orbit-line l4" />
    </div>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    mass: 0.2,
  });

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("aurevion-theme");
    const preferredDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initialTheme = savedTheme === "dark" || (!savedTheme && preferredDark) ? "dark" : "light";
    const animationFrame = window.requestAnimationFrame(() => {
      setTheme(initialTheme);
      document.documentElement.dataset.theme = initialTheme;
    });

    return () => window.cancelAnimationFrame(animationFrame);
  }, []);

  function toggleTheme() {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    document.documentElement.dataset.theme = nextTheme;
    window.localStorage.setItem("aurevion-theme", nextTheme);
  }

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
      <m.div className="scroll-progress" style={{ scaleX: smoothProgress }} aria-hidden="true" />
      <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>

      <header className="site-header">
        <div className="header-inner shell">
          <a className="brand" href="#inicio" onClick={closeMenu} aria-label="Aurevion — início">
            <img src="/aurevion-symbol.png" alt="" width="40" height="40" />
            <span>AUREVION</span>
          </a>

          <nav className={menuOpen ? "main-nav is-open" : "main-nav"} aria-label="Navegação principal">
            <a href="#servicos" onClick={closeMenu}>Serviços</a>
            <a href="#projetos" onClick={closeMenu}>Projetos</a>
            <a href="#processo" onClick={closeMenu}>Como fazemos</a>
            <a href="#contato" onClick={closeMenu}>Contato</a>
          </nav>

          <div className="header-actions">
            <button className="theme-toggle" type="button" onClick={toggleTheme} aria-label={`Ativar modo ${theme === "light" ? "escuro" : "claro"}`}>
              <span aria-hidden="true">{theme === "light" ? "◐" : "○"}</span>
            </button>
            <WhatsAppLink className="button button-small button-gold header-cta" location="header">
              Falar no WhatsApp
            </WhatsAppLink>
            <button
              className={menuOpen ? "menu-toggle is-open" : "menu-toggle"}
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
              aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            >
              <i /><i />
            </button>
          </div>
        </div>
      </header>

      <main id="conteudo">
        <section className="hero" id="inicio">
          <div className="hero-glow hero-glow-one" aria-hidden="true" />
          <div className="hero-glow hero-glow-two" aria-hidden="true" />
          <div className="hero-inner shell">
            <m.div
              className="hero-copy"
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.72, delay: 0.08 }}
            >
              <div className="eyebrow eyebrow-light"><span /> Tecnologia com direção</div>
              <h1>Ideias ambiciosas merecem experiências digitais <em>à altura.</em></h1>
              <p className="hero-subtitle">
                A Aurevion cria sites, sistemas e automações sob medida para transformar presença digital em oportunidades reais de negócio.
              </p>
              <div className="hero-actions">
                <WhatsAppLink className="button button-primary" location="hero">
                  Conversar no WhatsApp <span aria-hidden="true">↗</span>
                </WhatsAppLink>
                <a className="button button-ghost" href="#servicos">Conhecer soluções <span aria-hidden="true">↓</span></a>
              </div>
              <p className="hero-note"><span /> Conte sua ideia. A primeira conversa é sem compromisso.</p>
            </m.div>

            <m.div
              className="hero-stage"
              aria-label="Prévia de soluções digitais da Aurevion"
              initial={{ opacity: 0, x: 30, scale: 0.97 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.78, delay: 0.2 }}
            >
              <div className="stage-orbit orbit-large" aria-hidden="true" />
              <div className="stage-orbit orbit-small" aria-hidden="true" />
              <div className="stage-card stage-main">
                <div className="stage-toolbar"><span><i /><i /><i /></span><small>aurevion.digital</small></div>
                <video
                  className="hero-video"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  poster="/aurevion-hero-poster.png"
                  aria-label="Composição audiovisual da Aurevion: tecnologia com direção"
                >
                  <source src="/aurevion-hero.mp4" type="video/mp4" />
                </video>
              </div>
              <div className="stage-card stage-metric">
                <span>Experiência</span>
                <strong>Premium</strong>
                <div><i /><i /><i /><i /><i /></div>
              </div>
              <div className="stage-card stage-status">
                <i />
                <span><small>Projeto</small><strong>Em evolução</strong></span>
                <b>↗</b>
              </div>
            </m.div>
          </div>

          <div className="hero-strip shell" aria-label="Pilares da Aurevion">
            <span>Estratégia</span><i />
            <span>Design</span><i />
            <span>Tecnologia</span><i />
            <span>Evolução</span>
          </div>
        </section>

        <section className="section services" id="servicos">
          <div className="shell">
            <div className="section-heading split-heading">
              <div>
                <div className="eyebrow"><span /> O que construímos</div>
                <h2>Da primeira ideia à<br />experiência completa.</h2>
              </div>
              <p>Projetamos soluções digitais que unem clareza, estética e tecnologia para fazer seu negócio avançar.</p>
            </div>

            <div className="services-grid">
              {services.map((service) => (
                <m.article
                  className={`service-card accent-${service.accent}`}
                  key={service.number}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -6 }}
                  viewport={{ once: true, margin: "-70px" }}
                  transition={{ delay: Number(service.number) * 0.045 }}
                >
                  <div className="service-top"><span>{service.number}</span><i aria-hidden="true">↗</i></div>
                  <div className="service-icon" aria-hidden="true"><i /><i /><i /></div>
                  <h3>{service.title}</h3>
                  <p>{service.text}</p>
                </m.article>
              ))}
            </div>
          </div>
        </section>

        <section className="section projects" id="projetos">
          <div className="shell">
            <div className="section-heading split-heading project-heading">
              <div>
                <div className="eyebrow"><span /> Possibilidades</div>
                <h2>Experiências que podemos<br />colocar em movimento.</h2>
              </div>
              <p>Exemplos conceituais de soluções, criados para mostrar o padrão de direção, cuidado e acabamento da Aurevion.</p>
            </div>

            <div className="projects-grid">
              {projects.map((project, index) => (
                <m.article
                  className={`project-card project-${project.theme}`}
                  key={project.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -5 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ delay: index * 0.06 }}
                >
                  <div className="project-visual"><ProjectVisual kind={project.kind} /></div>
                  <div className="project-info">
                    <div className="project-index">0{index + 1}</div>
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
            <p className="concept-note"><span>Nota de transparência</span> Estes projetos são demonstrações conceituais e não são apresentados como trabalhos contratados por clientes.</p>
          </div>
        </section>

        <section className="section principles" id="processo">
          <div className="shell principles-shell">
            <div className="principles-intro">
              <div className="eyebrow eyebrow-light"><span /> Nosso jeito</div>
              <h2>Tecnologia que faz sentido.<br /><em>Do início ao próximo nível.</em></h2>
              <p>Menos ruído, mais direção. Você entende cada escolha e acompanha o projeto de perto.</p>
              <WhatsAppLink className="text-link" location="diferenciais">Conhecer o próximo passo <span aria-hidden="true">↗</span></WhatsAppLink>
            </div>
            <div className="principles-list">
              {principles.map((principle) => (
                <m.article
                  className="principle-item"
                  key={principle.number}
                  initial={{ opacity: 0, x: 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                >
                  <span>{principle.number}</span>
                  <div><h3>{principle.title}</h3><p>{principle.text}</p></div>
                </m.article>
              ))}
            </div>
          </div>
        </section>

        <section className="section trust" aria-labelledby="trust-title">
          <div className="shell">
            <m.div
              className="trust-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-90px" }}
            >
              <div className="trust-mark" aria-hidden="true">A</div>
              <div className="trust-content">
                <div className="eyebrow"><span /> Confiança sem atalhos</div>
                <h2 id="trust-title">Transparência também faz parte da entrega.</h2>
                <p>Uma marca nova não precisa inventar histórias antigas. Na Aurevion, a confiança nasce de escopo claro, acompanhamento próximo e resultados que podem ser demonstrados.</p>
              </div>
              <div className="trust-points">
                <div><span>01</span><p>Objetivos e prioridades definidos antes de começar.</p></div>
                <div><span>02</span><p>Visibilidade sobre cada etapa e decisão do projeto.</p></div>
                <div><span>03</span><p>Base preparada para medir, aprender e evoluir.</p></div>
              </div>
            </m.div>
          </div>
        </section>

        <section className="section contact" id="contato">
          <div className="shell contact-shell">
            <div className="contact-copy">
              <div className="eyebrow"><span /> Vamos conversar</div>
              <h2>Sua próxima ideia pode começar <em>agora.</em></h2>
              <p>Conte o que você quer criar ou melhorar. A Aurevion ajuda a transformar a intenção em um próximo passo claro.</p>
              <div className="contact-direct">
                <span>Prefere ir direto?</span>
                <WhatsAppLink className="contact-phone" location="contato-direto">+55 27 92002-6247 <i aria-hidden="true">↗</i></WhatsAppLink>
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
              <button className="button button-primary form-submit" type="submit">Enviar pelo WhatsApp <span aria-hidden="true">↗</span></button>
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
            <div><h3>Contato</h3><WhatsAppLink className="footer-link" location="footer">WhatsApp</WhatsAppLink><a href="#contato">Enviar briefing</a><a href="https://github.com/albertocodexx/aurevion-site" target="_blank" rel="noreferrer">GitHub</a></div>
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
