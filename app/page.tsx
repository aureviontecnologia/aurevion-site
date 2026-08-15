"use client";

import {
  FormEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import Image from "next/image";
import {
  AnimatePresence,
  LazyMotion,
  MotionConfig,
  domAnimation,
  m,
  useReducedMotion,
} from "motion/react";

const WHATSAPP_NUMBER = "5527920026247";
const SUPPORT_EMAIL = "aureviontecnologia@gmail.com";
const SUPPORT_EMAIL_URL = `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(
  "Suporte Aurevion",
)}`;
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Olá! Gostaria de conhecer os serviços da Aurevion.",
)}`;

const navigation = [
  { label: "Soluções", href: "#solucoes" },
  { label: "Como funciona", href: "#fluxo" },
  { label: "Demonstração", href: "#demonstracao" },
  { label: "Contato", href: "#contato" },
] as const;

const demoTabs = [
  {
    id: "operacao",
    label: "Operação",
    title: "Veja o que precisa ser feito.",
    text: "Pedidos, responsáveis e próximos passos ficam organizados em um só lugar.",
  },
  {
    id: "comercial",
    label: "Comercial",
    title: "Acompanhe cada novo contato.",
    text: "Cada contato fica com as informações necessárias para o atendimento.",
  },
  {
    id: "integracoes",
    label: "Conexões",
    title: "Conecte as ferramentas da empresa.",
    text: "Site, formulário, WhatsApp e sistema compartilham as mesmas informações.",
  },
] as const;

type DemoId = (typeof demoTabs)[number]["id"];

const processPhases = [
  {
    title: "Entender",
    text: "Conversamos sobre a empresa, a rotina e o que precisa melhorar.",
  },
  {
    title: "Planejar",
    text: "Organizamos a solução e mostramos como ela vai funcionar.",
  },
  {
    title: "Criar",
    text: "Desenvolvemos o projeto para funcionar bem no computador e no celular.",
  },
  {
    title: "Melhorar",
    text: "Depois da entrega, o projeto pode receber novas funções e melhorias.",
  },
] as const;

const faqs = [
  {
    question: "A Aurevion cria sites e sistemas?",
    answer:
      "Sim. Criamos sites para apresentar sua empresa e sistemas para organizar o trabalho.",
  },
  {
    question: "Vocês conectam as ferramentas que já usamos?",
    answer:
      "Sim, quando as ferramentas permitem conexão. Primeiro analisamos o que sua empresa usa e indicamos a melhor opção.",
  },
  {
    question: "Como o projeto começa?",
    answer:
      "Começamos com uma conversa para entender o que sua empresa precisa e qual resultado você espera. Depois apresentamos o próximo passo.",
  },
] as const;

function FaqItem({
  faq,
  index,
  prefersReducedMotion,
}: {
  faq: (typeof faqs)[number];
  index: number;
  prefersReducedMotion: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const triggerId = `faq-trigger-${index}`;
  const panelId = `faq-panel-${index}`;
  const duration = prefersReducedMotion ? 0 : isOpen ? 0.24 : 0.19;

  return (
    <article className={`faq-item${isOpen ? " is-open" : ""}`}>
      <button
        className="faq-trigger"
        id={triggerId}
        type="button"
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={() => setIsOpen((open) => !open)}
      >
        <span>{faq.question}</span>
        <m.span
          className="faq-icon"
          aria-hidden="true"
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration, ease: [0.215, 0.61, 0.355, 1] }}
        >
          +
        </m.span>
      </button>
      <m.div
        className="faq-answer"
        id={panelId}
        role="region"
        aria-labelledby={triggerId}
        aria-hidden={!isOpen}
        initial={false}
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
        transition={{
          height: { duration, ease: [0.215, 0.61, 0.355, 1] },
          opacity: {
            duration: prefersReducedMotion ? 0 : isOpen ? 0.18 : 0.12,
            ease: "easeOut",
          },
        }}
      >
        <div className="faq-answer-inner">
          <p>{faq.answer}</p>
        </div>
      </m.div>
    </article>
  );
}

function trackEvent(
  eventName: string,
  parameters: Record<string, string | number>,
) {
  if (typeof window === "undefined") return;
  const analyticsWindow = window as Window & {
    gtag?: (
      command: string,
      event: string,
      params: Record<string, string | number>,
    ) => void;
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
    <m.a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noreferrer"
      className={className}
      onClick={() => {
        trackEvent("cta_click", { location, destination: "whatsapp" });
        trackEvent("contact_click", { location, channel: "whatsapp" });
        trackEvent("whatsapp_click", { location });
      }}
      whileTap={{ transform: "scale(0.98)" }}
      aria-label={`${typeof children === "string" ? children : "Falar com a Aurevion"} (abre em nova aba)`}
    >
      {children}
    </m.a>
  );
}

function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <span className={compact ? "brand-mark is-compact" : "brand-mark"}>
      <Image
        src="/aurevion-symbol-transparent.png"
        alt=""
        width={42}
        height={42}
        priority={!compact}
        unoptimized
      />
      <span>AUREVION</span>
    </span>
  );
}

function DemoPanel({ active }: { active: DemoId }) {
  if (active === "operacao") {
    return (
      <div className="demo-scene demo-operation">
        <div className="demo-context">
          <span>Trabalho da equipe</span>
          <strong>Tarefas organizadas</strong>
        </div>
        <div className="operation-board">
          <div className="operation-lane">
            <span className="lane-title">Recebido</span>
            <div className="work-item"><i />Novo pedido comercial</div>
            <div className="work-item"><i />Ajuste solicitado</div>
          </div>
          <div className="operation-lane is-active">
            <span className="lane-title">Em andamento</span>
            <div className="work-item is-gold"><i />Proposta em preparação</div>
          </div>
          <div className="operation-lane">
            <span className="lane-title">Próximo passo</span>
            <div className="work-item"><i />Retorno ao cliente</div>
          </div>
        </div>
      </div>
    );
  }

  if (active === "comercial") {
    return (
      <div className="demo-scene demo-commercial">
        <div className="demo-context">
          <span>Atendimento comercial</span>
          <strong>Do contato ao atendimento</strong>
        </div>
        <div className="journey-track" aria-hidden="true">
          <div className="journey-step"><i />Contato recebido</div>
          <span className="journey-line" />
          <div className="journey-step is-current"><i />Informações organizadas</div>
          <span className="journey-line" />
          <div className="journey-step"><i />Equipe acionada</div>
          <span className="journey-line" />
          <div className="journey-step"><i />Retorno preparado</div>
        </div>
      </div>
    );
  }

  return (
    <div className="demo-scene demo-integrations">
      <div className="demo-context">
        <span>Ferramentas conectadas</span>
        <strong>A mesma informação em toda a empresa</strong>
      </div>
      <div
        className="integration-map"
        aria-label="Formulário e WhatsApp conectados ao cadastro de clientes e à equipe"
      >
        <div className="integration-group">
          <small>Onde começa</small>
          <div className="map-node">Formulário</div>
          <div className="map-node">WhatsApp</div>
        </div>
        <span className="integration-connector" aria-hidden="true" />
        <div className="map-core">
          <small>Organização</small>
          <strong>Informação organizada</strong>
        </div>
        <span className="integration-connector" aria-hidden="true" />
        <div className="integration-group">
          <small>Onde chega</small>
          <div className="map-node">Clientes</div>
          <div className="map-node">Equipe</div>
        </div>
      </div>
    </div>
  );
}

function AurevionFlow() {
  return (
    <section
      className="flow-section"
      id="fluxo"
      data-track="service_view"
      data-track-label="fluxo-aurevion"
    >
      <div className="flow-sticky shell">
        <div className="flow-copy">
          <span className="section-label">Como funciona</span>
          <h2>Cada informação chega à pessoa certa.</h2>
          <p>
            O contato entra, o sistema organiza e a equipe recebe o que precisa
            para agir.
          </p>
        </div>

        <div className="flow-map" aria-label="Exemplo de informações organizadas">
          <div className="flow-entry">
            <small>Entrada</small>
            <strong>Novo contato</strong>
          </div>
          <span className="flow-connector" aria-hidden="true" />
          <div className="flow-core">
            <small>Organização</small>
            <strong>Informações organizadas</strong>
          </div>
          <span className="flow-connector" aria-hidden="true" />
          <div className="flow-results">
            <small>Resultado</small>
            <strong>Equipe acionada</strong>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeDemo, setActiveDemo] = useState<DemoId>("operacao");
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuCloseRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const formStartedRef = useRef(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!menuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const frame = window.requestAnimationFrame(() => {
      menuRef.current?.querySelector<HTMLAnchorElement>("a")?.focus();
    });
    const handleMenuKeyboard = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
        return;
      }
      if (event.key !== "Tab") return;

      const menuLinks = Array.from(
        menuRef.current?.querySelectorAll<HTMLElement>("a[href]") || [],
      );
      const focusable = [menuCloseRef.current, ...menuLinks].filter(
        (element): element is HTMLElement => Boolean(element),
      );
      const currentIndex = focusable.indexOf(document.activeElement as HTMLElement);
      if (event.shiftKey && currentIndex <= 0) {
        event.preventDefault();
        focusable.at(-1)?.focus();
      } else if (!event.shiftKey && currentIndex === focusable.length - 1) {
        event.preventDefault();
        focusable[0]?.focus();
      }
    };
    window.addEventListener("keydown", handleMenuKeyboard);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.cancelAnimationFrame(frame);
      window.removeEventListener("keydown", handleMenuKeyboard);
    };
  }, [menuOpen]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (prefersReducedMotion) {
      video.pause();
      video.currentTime = 0;
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !video.ended) {
          void video.play().catch(() => undefined);
          return;
        }
        video.pause();
      },
      { threshold: 0.55 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, [prefersReducedMotion]);

  useEffect(() => {
    const reached = new Set<number>();
    const thresholds = [25, 50, 75, 90];
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      if (total <= 0) return;
      const depth = Math.round((window.scrollY / total) * 100);
      thresholds.forEach((threshold) => {
        if (depth < threshold || reached.has(threshold)) return;
        reached.add(threshold);
        trackEvent("scroll_depth", { percent: threshold });
      });
    };

    const seen = new Set<Element>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting || seen.has(entry.target)) return;
          seen.add(entry.target);
          const element = entry.target as HTMLElement;
          trackEvent(element.dataset.track || "section_view", {
            section: element.dataset.trackLabel || element.id || "unknown",
          });
        });
      },
      { threshold: 0.4 },
    );
    document.querySelectorAll<HTMLElement>("[data-track]").forEach((element) => {
      observer.observe(element);
    });
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  function closeMenu() {
    setMenuOpen(false);
  }

  function selectDemo(id: DemoId) {
    setActiveDemo(id);
    trackEvent("case_study_view", { demo: id });
  }

  function startForm() {
    if (formStartedRef.current) return;
    formStartedRef.current = true;
    trackEvent("form_start", { form: "project-contact" });
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
      `Email: ${email}`,
      `Projeto: ${message}`,
    ].join("\n");

    trackEvent("form_submit", { form: "project-contact", channel: "whatsapp" });
    trackEvent("demo_request", { location: "contact-form" });
    const contactUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
    window.location.assign(contactUrl);
  }

  return (
    <MotionConfig
      reducedMotion="user"
      transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
    >
      <LazyMotion features={domAnimation}>
        <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>

        <header className="site-header">
          <div className="header-inner shell">
            <a className="brand" href="#inicio" onClick={closeMenu} aria-label="Página inicial da Aurevion">
              <BrandMark />
            </a>
            <span className="header-capabilities">Sites · Sistemas · Automação</span>
            <div className="header-actions">
              <WhatsAppLink className="header-contact" location="header">
                Iniciar projeto
              </WhatsAppLink>
              <m.button
                ref={menuButtonRef}
                className={menuOpen ? "menu-toggle is-open" : "menu-toggle"}
                type="button"
                onClick={() => setMenuOpen((open) => !open)}
                whileTap={{ transform: "scale(0.96)" }}
                disabled={menuOpen}
                tabIndex={menuOpen ? -1 : 0}
                aria-hidden={menuOpen}
                aria-expanded={menuOpen}
                aria-controls="site-navigation"
                aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
              >
                <span />
                <span />
              </m.button>
            </div>
          </div>
        </header>

        <AnimatePresence>
          {menuOpen ? (
            <m.div
              className="menu-layer"
              initial={{ clipPath: "inset(0 0 100% 0)" }}
              animate={{ clipPath: "inset(0 0 0 0)" }}
              exit={{ clipPath: "inset(0 0 100% 0)" }}
              transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
            >
              <a
                className="menu-layer-brand"
                href="#inicio"
                onClick={closeMenu}
                aria-label="Página inicial da Aurevion"
              >
                <BrandMark />
              </a>
              <button
                ref={menuCloseRef}
                className="menu-close"
                type="button"
                onClick={() => {
                  setMenuOpen(false);
                  window.requestAnimationFrame(() => menuButtonRef.current?.focus());
                }}
                aria-label="Fechar menu"
              >
                <span aria-hidden="true" />
                <span aria-hidden="true" />
              </button>
              <nav
                ref={menuRef}
                id="site-navigation"
                className="menu-panel shell"
                aria-label="Navegação principal"
              >
                <div className="menu-links">
                  {navigation.map((item) => (
                    <a key={item.href} href={item.href} onClick={closeMenu}>{item.label}</a>
                  ))}
                </div>
                <div className="menu-side">
                  <span>Tem um projeto para sua empresa?</span>
                  <WhatsAppLink className="menu-whatsapp" location="menu">
                    Conversar no WhatsApp
                  </WhatsAppLink>
                </div>
              </nav>
            </m.div>
          ) : null}
        </AnimatePresence>

        <main id="conteudo">
          <section className="hero" id="inicio">
            <div className="hero-copy shell">
              <m.p
                className="hero-kicker"
                initial={false}
              >
                Sites e sistemas para empresas
              </m.p>
              <m.h1
                initial={false}
              >
                Sites que apresentam sua empresa. <span>Sistemas que organizam o trabalho.</span>
              </m.h1>
              <div className="hero-bottom">
                <p>
                  A Aurevion cria sites, sistemas e automações para sua empresa
                  vender melhor e trabalhar com mais organização.
                </p>
                <div className="hero-actions">
                  <WhatsAppLink className="button button-primary" location="hero">
                    Quero falar sobre meu projeto
                  </WhatsAppLink>
                  <a className="text-action" href="#demonstracao">
                    Ver como funciona
                  </a>
                </div>
              </div>
            </div>

            <m.div
              className="hero-film shell"
              initial={false}
            >
              <video
                ref={videoRef}
                className="hero-video"
                muted
                playsInline
                preload="metadata"
                poster="/aurevion-flow-v2-poster.webp"
                aria-hidden="true"
                tabIndex={-1}
              >
                <source src="/aurevion-flow-v2.mp4" type="video/mp4" />
              </video>
            </m.div>
          </section>

          <section className="problem-section shell">
            <p className="problem-lead">Quando faltam as ferramentas certas,</p>
            <div className="problem-lines">
              <p>as planilhas ficam espalhadas.</p>
              <p>as mensagens se perdem.</p>
              <p>e a equipe perde tempo.</p>
            </div>
          </section>

          <section className="solutions-section" id="solucoes">
            <div className="shell solutions-intro">
              <span className="section-label">Soluções para sua empresa</span>
              <h2>Sites para vender. Sistemas para organizar.</h2>
            </div>

            <article
              className="solution-chapter solution-site shell"
              data-track="service_view"
              data-track-label="sites"
            >
              <div className="solution-copy">
                <span>Sites</span>
                <h3>Um site que explica sua empresa e facilita o contato.</h3>
                <p>
                  Criamos sites rápidos, fáceis de usar e preparados para gerar
                  contatos pelo WhatsApp.
                </p>
                <ul>
                  <li>Texto claro</li>
                  <li>Funciona bem no celular</li>
                  <li>Contato direto pelo WhatsApp</li>
                </ul>
              </div>
              <div className="site-composition" aria-label="Estrutura de mensagem de um site">
                <div className="site-preview-head">
                  <span>Seu site</span>
                  <span>Mensagem clara</span>
                </div>
                <div className="site-statement">
                  <small>O que sua empresa oferece</small>
                  <strong>Sua empresa, apresentada com clareza.</strong>
                  <p>O cliente entende e sabe como entrar em contato.</p>
                </div>
                <div className="site-proof">
                  <div><small>Informações</small><strong>O que o cliente precisa saber</strong></div>
                  <div><small>Contato</small><strong>Falar no WhatsApp</strong></div>
                </div>
              </div>
            </article>

            <article
              className="solution-chapter solution-system shell"
              data-track="service_view"
              data-track-label="sistemas"
            >
              <div className="system-composition" aria-label="Exemplo de sistema para uma empresa">
                <div className="system-input"><small>Entrada</small><strong>Solicitação recebida</strong></div>
                <span className="system-connector" aria-hidden="true" />
                <div className="system-core"><small>Organização</small><strong>Sistema organiza e encaminha</strong></div>
                <span className="system-connector" aria-hidden="true" />
                <div className="system-output"><small>Resultado</small><strong>Equipe responsável acionada</strong></div>
              </div>
              <div className="solution-copy">
                <span>Sistemas</span>
                <h3>Um sistema que acompanha o trabalho da sua empresa.</h3>
                <p>
                  Criamos sistemas para organizar tarefas, informações e
                  atendimentos em um só lugar.
                </p>
                <ul>
                  <li>Sistemas para sua rotina</li>
                  <li>Menos tarefas manuais</li>
                  <li>Ferramentas conectadas</li>
                </ul>
              </div>
            </article>
          </section>

          <AurevionFlow />

          <section
            className="demo-section"
            id="demonstracao"
            data-track="case_study_view"
            data-track-label="demo-produto"
          >
            <div className="shell">
              <div className="demo-heading">
                <span className="section-label">Veja na prática</span>
                <h2>Informações claras para tomar decisões.</h2>
                <p>
                  Veja como um sistema pode organizar o trabalho, o atendimento
                  e as ferramentas da sua empresa.
                </p>
              </div>

              <div className="demo-console">
                <div className="demo-tabs" role="tablist" aria-label="Visões do sistema">
                  {demoTabs.map((tab) => (
                    <button
                      key={tab.id}
                      id={`tab-${tab.id}`}
                      type="button"
                      role="tab"
                      aria-selected={activeDemo === tab.id}
                      aria-controls={`panel-${tab.id}`}
                      tabIndex={activeDemo === tab.id ? 0 : -1}
                      onClick={() => selectDemo(tab.id)}
                      onKeyDown={(event) => {
                        const currentIndex = demoTabs.findIndex((item) => item.id === tab.id);
                        let nextIndex = currentIndex;
                        if (event.key === "ArrowRight") nextIndex = (currentIndex + 1) % demoTabs.length;
                        if (event.key === "ArrowLeft") nextIndex = (currentIndex - 1 + demoTabs.length) % demoTabs.length;
                        if (event.key === "Home") nextIndex = 0;
                        if (event.key === "End") nextIndex = demoTabs.length - 1;
                        if (nextIndex === currentIndex) return;
                        event.preventDefault();
                        const nextId = demoTabs[nextIndex].id;
                        selectDemo(nextId);
                        window.requestAnimationFrame(() => {
                          document.getElementById(`tab-${nextId}`)?.focus();
                        });
                      }}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                <div className="demo-panel-copy">
                  {demoTabs.map((tab) =>
                    tab.id === activeDemo ? (
                      <div key={tab.id}>
                        <h3>{tab.title}</h3>
                        <p>{tab.text}</p>
                      </div>
                    ) : null,
                  )}
                </div>

                <div
                  className="demo-viewport"
                  id={`panel-${activeDemo}`}
                  role="tabpanel"
                  aria-labelledby={`tab-${activeDemo}`}
                >
                  <AnimatePresence mode="wait" initial={false}>
                    <m.div
                      key={activeDemo}
                      initial={prefersReducedMotion ? false : { clipPath: "inset(0 100% 0 0)" }}
                      animate={{ clipPath: "inset(0 0 0 0)" }}
                      exit={prefersReducedMotion ? undefined : { clipPath: "inset(0 0 0 100%)" }}
                      transition={{ duration: 0.28, ease: [0.65, 0, 0.35, 1] }}
                    >
                      <DemoPanel active={activeDemo} />
                    </m.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </section>

          <section className="process-section shell" id="processo">
            <div className="process-heading">
              <span className="section-label">Etapas do projeto</span>
              <h2>Um processo simples e claro.</h2>
            </div>
            <div className="process-list">
              {processPhases.map((phase) => (
                <article key={phase.title}>
                  <h3>{phase.title}</h3>
                  <p>{phase.text}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="faq-section shell">
            <div className="faq-heading">
              <span className="section-label">Dúvidas comuns</span>
              <h2>O que você precisa saber.</h2>
            </div>
            <div className="faq-list">
              {faqs.map((faq, index) => (
                <FaqItem
                  key={faq.question}
                  faq={faq}
                  index={index}
                  prefersReducedMotion={Boolean(prefersReducedMotion)}
                />
              ))}
            </div>
          </section>

          <section className="contact-section" id="contato">
            <div className="contact-shell shell">
              <div className="contact-copy">
                <span className="section-label">Fale com a Aurevion</span>
                <h2>O que sua empresa precisa melhorar?</h2>
                <p>
                  Conte o que precisa. Vamos indicar uma solução de site, sistema
                  ou automação.
                </p>
                <div className="contact-channels">
                  <WhatsAppLink className="contact-direct" location="contact-direct">
                    +55 27 92002 6247
                  </WhatsAppLink>
                  <a className="contact-support" href={SUPPORT_EMAIL_URL}>
                    <span>Suporte por email</span>
                    {SUPPORT_EMAIL}
                  </a>
                </div>
              </div>

              <form className="contact-form" onSubmit={submitContact} onFocus={startForm}>
                <h3>Conte o que sua empresa precisa</h3>
                <label>
                  <span>Nome</span>
                  <input name="name" type="text" autoComplete="name" required minLength={2} />
                </label>
                <label>
                  <span>Email</span>
                  <input name="email" type="email" autoComplete="email" required />
                </label>
                <label>
                  <span>O que você precisa criar ou melhorar?</span>
                  <textarea name="message" rows={4} required minLength={10} />
                </label>
                <m.button className="button button-primary form-submit" type="submit" whileTap={{ transform: "scale(0.99)" }}>
                  Enviar pelo WhatsApp
                </m.button>
              </form>
            </div>
          </section>
        </main>

        <footer className="site-footer">
          <div className="footer-inner shell">
            <a href="#inicio" aria-label="Voltar ao início da página"><BrandMark compact /></a>
            <p>Tecnologia com direção.</p>
            <div className="footer-actions">
              <a href="#solucoes">Soluções</a>
              <a href={SUPPORT_EMAIL_URL}>Suporte: {SUPPORT_EMAIL}</a>
              <WhatsAppLink className="footer-whatsapp" location="footer">WhatsApp</WhatsAppLink>
            </div>
          </div>
          <div className="footer-bottom shell">
            <span>© {new Date().getFullYear()} Aurevion</span>
            <span>Sites · Sistemas · Automação</span>
          </div>
        </footer>
      </LazyMotion>
    </MotionConfig>
  );
}
