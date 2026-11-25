"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

const WHATSAPP_NUMBER = "5527920026247";
const SUPPORT_EMAIL = "aureviontecnologia@gmail.com";
const SUPPORT_EMAIL_URL = `mailto:${SUPPORT_EMAIL}?subject=Suporte%20Aurevion`;
const SISTEMA_OS_URL = "https://sistemaosaurevion.vercel.app/";

function whatsappUrl(service?: string) {
  const message = service
    ? `Olá! Gostaria de conversar com a Aurevion sobre ${service}.`
    : "Olá! Gostaria de pedir um orçamento para minha empresa na Aurevion.";
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

const navigation = [
  { label: "Serviços", href: "#solucoes" },
  { label: "Projeto", href: "#demonstracao" },
  { label: "Como funciona", href: "#processo" },
  { label: "Dúvidas", href: "#duvidas" },
] as const;

const services = [
  {
    name: "Sites",
    title: "Apresente sua empresa. Facilite o contato.",
    description: "Um site organizado, com seus serviços, a identidade da sua marca e um caminho fácil até o orçamento. Feito para funcionar bem no celular e no computador.",
    examples: "Sites institucionais, páginas de serviços e páginas para campanhas.",
    request: "a criação ou melhoria de um site",
    event: "sites",
  },
  {
    name: "Sistemas",
    title: "Organize o trabalho em um só lugar.",
    description: "Um sistema feito para a rotina da sua empresa. Reúna informações, acompanhe tarefas e facilite o trabalho da equipe, sem depender de várias planilhas.",
    examples: "Cadastros de clientes, controle de pedidos e painéis de acompanhamento.",
    request: "um sistema para minha empresa",
    event: "sistemas",
  },
  {
    name: "Automações",
    title: "Diminua as tarefas repetitivas.",
    description: "Conecte as ferramentas que sua empresa já usa para reduzir cópias de informações e tarefas manuais. Primeiro, avaliamos o que é possível integrar.",
    examples: "Cadastro a partir de formulários, avisos para a equipe e atualização de dados.",
    request: "automações para minha empresa",
    event: "automacoes",
  },
] as const;

const steps = [
  { title: "Conversa", text: "Você conta o que sua empresa faz e o que precisa melhorar. Não precisa entender de tecnologia." },
  { title: "Proposta", text: "Você recebe as entregas, o valor e o prazo por escrito, antes de qualquer trabalho começar." },
  { title: "Desenvolvimento", text: "Com a proposta aprovada, desenvolvemos e revisamos a solução com você durante o caminho." },
  { title: "Entrega", text: "A solução é publicada e passa a funcionar. O suporte depois da entrega fica definido na proposta." },
] as const;

const sistemaOsFeatures = [
  "Ordens de serviço do balcão até a entrega",
  "Clientes, estoque e financeiro juntos",
  "Parcelas e lembretes de cobrança",
  "Computador e celular com os mesmos dados",
] as const;

const faqs = [
  {
    question: "Não sei se preciso de um site ou de um sistema. Vocês ajudam?",
    answer: "Sim. Conte o que sua empresa faz e o que precisa melhorar. Um site apresenta seus serviços para o público. Um sistema ajuda a organizar o trabalho. A conversa inicial serve para entender qual solução faz sentido no seu caso.",
  },
  {
    question: "Vocês podem melhorar um site que já existe?",
    answer: "Sim. Envie o endereço do site e conte o que não está funcionando bem. Avaliamos a estrutura atual para indicar se vale fazer ajustes ou desenvolver uma nova versão.",
  },
  {
    question: "Quanto custa e qual é o prazo?",
    answer: "O valor e o prazo dependem do tamanho do projeto e das funções necessárias. Depois de entender sua necessidade, apresentamos uma proposta com as entregas, o investimento e o prazo antes de começar.",
  },
  {
    question: "Dá para conectar as ferramentas que já usamos?",
    answer: "Quando as ferramentas permitem integração, sim. Analisamos quais vocês usam, quais informações precisam circular e quais custos ou limitações existem antes de propor a conexão.",
  },
  {
    question: "Como funciona o suporte depois da entrega?",
    answer: "O suporte e a manutenção são definidos na proposta. Se você já é cliente, pode falar com a Aurevion pelo WhatsApp ou pelo email aureviontecnologia@gmail.com para solicitar ajuda ou novas melhorias.",
  },
] as const;

function trackEvent(eventName: string, parameters: Record<string, string | number>) {
  const analyticsWindow = window as Window & {
    gtag?: (command: string, event: string, params: Record<string, string | number>) => void;
  };
  analyticsWindow.gtag?.("event", eventName, parameters);
}

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      {diagonal ? <path d="M6 18 18 6M6 6h12v12" /> : <path d="M4 12h15m-6-6 6 6-6 6" />}
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="21" height="21" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M20.4 11.7a8.4 8.4 0 0 1-12.5 7.4L3 20.5l1.4-4.8A8.4 8.4 0 1 1 20.4 11.7Z" />
      <path d="M8.1 7.5c-.8.7-.7 2 .1 3.4 1 1.9 2.5 3.3 4.5 4 1.4.5 2.7.3 3.1-.8l-2.5-1.3-.8 1c-1.8-.7-3-1.9-3.5-3.4l.9-.9-1.1-2.3-.7.3Z" />
    </svg>
  );
}

function ServiceIcon({ kind }: { kind: string }) {
  if (kind === "sites") {
    return (
      <svg className="servico-icone" viewBox="0 0 48 48" fill="none" aria-hidden="true">
        <rect className="tr" pathLength={1} x="5" y="9" width="38" height="30" rx="3" />
        <path className="tr" pathLength={1} d="M5 17h38" />
        <path className="tr" pathLength={1} d="M12 25h14M12 31h9" />
        <rect className="tr" pathLength={1} x="30" y="24" width="7" height="9" rx="1.5" />
      </svg>
    );
  }
  if (kind === "sistemas") {
    return (
      <svg className="servico-icone" viewBox="0 0 48 48" fill="none" aria-hidden="true">
        <rect className="tr" pathLength={1} x="5" y="8" width="38" height="32" rx="3" />
        <path className="tr" pathLength={1} d="M16 8v32" />
        <path className="tr" pathLength={1} d="M22 16h15M22 24h15M22 32h9" />
      </svg>
    );
  }
  return (
    <svg className="servico-icone" viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <circle className="tr" pathLength={1} cx="12" cy="14" r="6" />
      <circle className="tr" pathLength={1} cx="36" cy="34" r="6" />
      <path className="tr" pathLength={1} d="M18 14h10a6 6 0 0 1 6 6v8" />
      <path className="tr" pathLength={1} d="m30 24 4 4 4-4" />
      <path className="tr" pathLength={1} d="M30 34H20a6 6 0 0 1-6-6v-8" />
    </svg>
  );
}

function WhatsAppLink({ children, className = "button button-primary", location, service, label }: {
  children: React.ReactNode;
  className?: string;
  location: string;
  service?: string;
  label?: string;
}) {
  return (
    <a href={whatsappUrl(service)} target="_blank" rel="noopener noreferrer" className={className} aria-label={label}
      onClick={() => {
        trackEvent("cta_click", { location, destination: "whatsapp" });
        trackEvent("contact_click", { location, channel: "whatsapp" });
        trackEvent("whatsapp_click", { location });
      }}>
      {children}{label ? null : <span className="sr-only"> (abre em nova aba)</span>}
    </a>
  );
}

function BrandMark() {
  return (
    <span className="brand-mark">
      <Image src="/aurevion-symbol-transparent.png" alt="" width={40} height={40} priority unoptimized />
      <span>AUREVION</span>
    </span>
  );
}

/* Cena do topo: o traço dourado desenha a tela e o sistema pronto aparece por cima. */
function BuildScene() {
  return (
    <figure className="hero-cena" aria-label="Animação: o rascunho de uma tela vira o Sistema OS pronto">
      <div className="cena-janela">
        <div className="cena-barra" aria-hidden="true">
          <span className="cena-pontos"><i /><i /><i /></span>
          <span className="cena-endereco">sistemaosaurevion.vercel.app</span>
        </div>
        <div className="cena-tela">
          <Image className="cena-print" src="/sistema-os-preview.png" alt="Sistema OS: cadastro de ordem de serviço, aparelho, orçamento, prazo e parcelas, sem dados de clientes" width={1923} height={1010} priority unoptimized />
          <svg className="cena-rascunho" viewBox="0 0 1923 1010" fill="none" preserveAspectRatio="none" aria-hidden="true">
            <g className="g1">
              <path pathLength={1} d="M30 58h348" />
              <rect pathLength={1} x="1553" y="102" width="176" height="56" rx="8" />
              <rect pathLength={1} x="1741" y="102" width="137" height="56" rx="8" />
            </g>
            <g className="g2">
              <rect pathLength={1} x="31" y="178" width="1039" height="392" rx="10" />
              <rect pathLength={1} x="1099" y="178" width="779" height="826" rx="10" />
              <rect pathLength={1} x="31" y="592" width="1039" height="412" rx="10" />
            </g>
            <g className="g3">
              <rect pathLength={1} x="59" y="287" width="983" height="62" rx="6" />
              <rect pathLength={1} x="59" y="398" width="483" height="62" rx="6" />
              <rect pathLength={1} x="558" y="398" width="484" height="62" rx="6" />
              <rect pathLength={1} x="1127" y="287" width="722" height="63" rx="6" />
              <rect pathLength={1} x="1127" y="444" width="349" height="62" rx="6" />
              <rect pathLength={1} x="1498" y="444" width="350" height="62" rx="6" />
            </g>
            <g className="g4">
              <rect pathLength={1} x="59" y="699" width="316" height="62" rx="6" />
              <rect pathLength={1} x="392" y="699" width="316" height="62" rx="6" />
              <rect pathLength={1} x="725" y="699" width="316" height="62" rx="6" />
              <rect pathLength={1} x="59" y="811" width="316" height="62" rx="6" />
              <rect pathLength={1} x="392" y="811" width="316" height="62" rx="6" />
              <rect pathLength={1} x="1127" y="560" width="349" height="62" rx="6" />
              <rect pathLength={1} x="1127" y="677" width="349" height="62" rx="6" />
              <rect pathLength={1} x="1127" y="902" width="722" height="62" rx="6" />
            </g>
          </svg>
        </div>
      </div>
      <figcaption className="cena-etiqueta"><span className="cena-luz" aria-hidden="true" />Sistema OS no ar, feito pela Aurevion</figcaption>
    </figure>
  );
}

export default function Home() {
  const menuRef = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    const menu = menuRef.current;
    const onEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape" || !menu?.open) return;
      menu.open = false;
      menu.querySelector("summary")?.focus();
    };
    const onOutsideClick = (event: PointerEvent) => {
      if (menu?.open && event.target instanceof Node && !menu.contains(event.target)) menu.open = false;
    };
    document.addEventListener("keydown", onEscape);
    document.addEventListener("pointerdown", onOutsideClick);
    return () => {
      document.removeEventListener("keydown", onEscape);
      document.removeEventListener("pointerdown", onOutsideClick);
    };
  }, []);

  // Medição: profundidade de leitura e seções vistas.
  useEffect(() => {
    const reached = new Set<number>();
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      if (total <= 0) return;
      const depth = Math.round((window.scrollY / total) * 100);
      [25, 50, 75, 90].forEach((percent) => {
        if (depth < percent || reached.has(percent)) return;
        reached.add(percent);
        trackEvent("scroll_depth", { percent });
      });
    };
    const seen = new Set<Element>();
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting || seen.has(entry.target)) return;
        seen.add(entry.target);
        const element = entry.target as HTMLElement;
        trackEvent(element.dataset.track || "section_view", { section: element.dataset.trackLabel || element.id });
      });
    }, { threshold: 0.3 });
    document.querySelectorAll("[data-track]").forEach((element) => observer.observe(element));
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Animações: revelação ao rolar, cena do topo, linha de leitura, passos e WhatsApp flutuante.
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("js");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const canObserve = "IntersectionObserver" in window;
    const observers: IntersectionObserver[] = [];

    const revealables = document.querySelectorAll("[data-r]");
    if (reduceMotion || !canObserve) {
      revealables.forEach((element) => element.classList.add("in"));
    } else {
      const io = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        });
      }, { rootMargin: "0px 0px -8% 0px", threshold: 0.12 });
      revealables.forEach((element) => io.observe(element));
      observers.push(io);
    }

    const scene = document.querySelector(".hero-cena");
    if (scene) {
      if (reduceMotion || !canObserve) {
        scene.classList.add("toca");
      } else {
        const sceneIo = new IntersectionObserver((entries) => {
          if (!entries[0].isIntersecting) return;
          scene.classList.add("toca");
          sceneIo.disconnect();
        }, { threshold: 0.35 });
        sceneIo.observe(scene);
        observers.push(sceneIo);
      }
    }

    const header = document.querySelector<HTMLElement>(".site-header");
    const hero = document.querySelector<HTMLElement>(".hero");
    const contact = document.querySelector<HTMLElement>(".contact-section");
    const stepList = document.querySelector<HTMLElement>(".passos");
    const stepItems = stepList ? [...stepList.querySelectorAll<HTMLElement>(".passo")] : [];
    const floating = document.querySelector<HTMLElement>(".whats-flutuante");
    let ticking = false;

    const update = () => {
      ticking = false;
      const y = window.scrollY;
      const vh = window.innerHeight;
      const total = root.scrollHeight - vh;
      const heroBottom = hero ? hero.getBoundingClientRect().bottom : 0;
      const contactTop = contact ? contact.getBoundingClientRect().top : Infinity;
      const stepsRect = stepList ? stepList.getBoundingClientRect() : null;

      header?.classList.toggle("rolou", y > 8);
      header?.style.setProperty("--leitura", total > 0 ? Math.min(1, y / total).toFixed(4) : "0");
      if (stepList && stepsRect) {
        let p = reduceMotion ? 1 : (vh * 0.7 - stepsRect.top) / (stepsRect.height || 1);
        p = Math.min(1, Math.max(0, p));
        stepList.style.setProperty("--p", p.toFixed(3));
        const n = stepItems.length;
        stepItems.forEach((item, i) => item.classList.toggle("ativo", p > 0 && p >= (n > 1 ? i / (n - 1) : 0) - 0.001));
      }
      floating?.classList.toggle("visivel", heroBottom < 0 && contactTop > vh - 40);
    };
    const requestUpdate = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(update);
    };
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    update();

    return () => {
      observers.forEach((observer) => observer.disconnect());
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, []);

  function closeMenu() {
    if (menuRef.current) menuRef.current.open = false;
  }

  return (
    <>
      <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
      <header className="site-header">
        <div className="header-inner shell">
          <a className="brand" href="#inicio" aria-label="Aurevion, início" onClick={closeMenu}><BrandMark /></a>
          <nav className="desktop-nav" aria-label="Navegação principal">
            {navigation.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}
          </nav>
          <div className="header-actions">
            <WhatsAppLink className="button button-primary header-whatsapp" location="header"><WhatsAppIcon /><span>WhatsApp</span></WhatsAppLink>
            <details className="mobile-menu" ref={menuRef}>
              <summary aria-label="Menu de navegação">Menu</summary>
              <nav className="mobile-nav" aria-label="Navegação no celular">
                {navigation.map((item) => <a key={item.href} href={item.href} onClick={closeMenu}>{item.label}<Arrow /></a>)}
                <a href="#contato" onClick={closeMenu}>Contato<Arrow /></a>
              </nav>
            </details>
          </div>
        </div>
        <span className="leitura" aria-hidden="true" />
      </header>

      <main id="conteudo" tabIndex={-1}>
        <section className="hero shell" id="inicio" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow hero-eyebrow">Tecnologia para o dia a dia da sua empresa</p>
            <h1 id="hero-title" className="linhas">
              <span className="ln"><span>Sites, sistemas</span></span>
              <span className="ln"><span>e automações</span></span>
              <span className="ln"><span className="ouro">para sua empresa.</span></span>
            </h1>
            <p className="hero-description">Apresente seus serviços, organize o trabalho e reduza tarefas manuais. A Aurevion desenvolve a solução com você, do planejamento à publicação.</p>
            <div className="hero-actions">
              <WhatsAppLink location="hero"><WhatsAppIcon />Pedir orçamento no WhatsApp</WhatsAppLink>
              <a className="text-link" href="#demonstracao">Ver um projeto no ar <Arrow /></a>
            </div>
          </div>
          <BuildScene />
        </section>

        <section className="services-section" id="solucoes" aria-labelledby="services-title">
          <div className="shell">
            <div className="section-heading" data-r="">
              <div>
                <p className="eyebrow">O que fazemos</p>
                <h2 id="services-title" className="linhas"><span className="ln"><span>Do seu site à rotina</span></span><span className="ln"><span>da sua equipe.</span></span></h2>
              </div>
              <p>Comece pelo que sua empresa precisa agora. O projeto pode crescer junto com o negócio.</p>
            </div>
            <ul className="service-list">
              {services.map((service, index) => (
                <li className="service" key={service.event} data-r="" data-track="service_view" data-track-label={service.event} style={{ "--d": `${index * 0.08}s` } as React.CSSProperties}>
                  <div className="service-name"><ServiceIcon kind={service.event} /><h3>{service.name}</h3></div>
                  <div className="service-description"><h4>{service.title}</h4><p>{service.description}</p><p className="service-examples"><span>Na prática</span>{service.examples}</p></div>
                  <WhatsAppLink className="service-link" location={`service-${service.event}`} service={service.request}><span>Conversar sobre {service.name.toLowerCase()}<small>pelo WhatsApp</small></span><Arrow diagonal /></WhatsAppLink>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="project-section" id="demonstracao" aria-labelledby="project-title" data-track="case_study_view" data-track-label="sistema-os">
          <div className="shell project-inner">
            <div className="project-copy" data-r="">
              <p className="eyebrow">Um projeto da Aurevion no ar</p>
              <h2 id="project-title" className="linhas"><span className="ln"><span><strong>Sistema OS</strong></span></span><span className="ln"><span className="ouro">para assistências técnicas.</span></span></h2>
              <p className="project-lead">Ordens de serviço, clientes, cobranças e garantias em um só lugar. O sistema tem um site próprio, com uma demonstração que você testa ali mesmo.</p>
              <ul className="project-features">
                {sistemaOsFeatures.map((feature) => <li key={feature}>{feature}</li>)}
              </ul>
              <div className="project-actions">
                <a className="button button-primary" href={SISTEMA_OS_URL} target="_blank" rel="noopener noreferrer" onClick={() => trackEvent("project_click", { project: "sistema-os", action: "site" })}>Conhecer o Sistema OS <Arrow diagonal /><span className="sr-only"> (abre o site em nova aba)</span></a>
                <a className="text-link" href={whatsappUrl("o Sistema OS para minha assistência técnica")} target="_blank" rel="noopener noreferrer" onClick={() => trackEvent("project_click", { project: "sistema-os", action: "contact" })}>Falar sobre o Sistema OS <Arrow /><span className="sr-only"> (abre o WhatsApp em nova aba)</span></a>
              </div>
            </div>
            <a className="project-site" href={SISTEMA_OS_URL} target="_blank" rel="noopener noreferrer" data-r="" style={{ "--d": ".12s" } as React.CSSProperties} onClick={() => trackEvent("project_click", { project: "sistema-os", action: "preview" })}>
              <span className="project-site-barra" aria-hidden="true"><span className="cena-pontos"><i /><i /><i /></span>sistemaosaurevion.vercel.app</span>
              <Image src="/sistema-os-site.png" alt="Página inicial do site do Sistema OS, com a demonstração do sistema" width={1440} height={900} unoptimized />
              <span className="sr-only"> (abre o site do Sistema OS em nova aba)</span>
            </a>
          </div>
        </section>

        <section className="process-section" id="processo" aria-labelledby="process-title">
          <div className="shell process-inner">
            <div className="process-heading" data-r="">
              <p className="eyebrow">Como funciona</p>
              <h2 id="process-title" className="linhas"><span className="ln"><span>Você entende o projeto</span></span><span className="ln"><span>antes de começar.</span></span></h2>
              <a className="text-link" href="#contato">Vamos conversar <Arrow /></a>
            </div>
            <ol className="passos">
              {steps.map((step, index) => (
                <li className="passo" key={step.title} data-r="" style={{ "--d": `${index * 0.06}s` } as React.CSSProperties}>
                  <span className="passo-num" aria-hidden="true">{index + 1}</span>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="faq-section shell" id="duvidas" aria-labelledby="faq-title">
          <div className="faq-heading" data-r="">
            <p className="eyebrow">Antes de começar</p>
            <h2 id="faq-title" className="linhas"><span className="ln"><span>Dúvidas frequentes.</span></span></h2>
            <p>Não precisa entender de tecnologia para conversar com a gente.</p>
          </div>
          <div className="faq-list" data-r="" style={{ "--d": ".08s" } as React.CSSProperties}>
            {faqs.map((faq, index) => (
              <details className="faq-item" key={faq.question} onToggle={(event) => { if (event.currentTarget.open) trackEvent("faq_open", { question: index + 1 }); }}>
                <summary><h3>{faq.question}</h3><span className="faq-icon" aria-hidden="true" /></summary>
                <div className="faq-answer"><p>{faq.answer}</p></div>
              </details>
            ))}
          </div>
        </section>

        <section className="contact-section" id="contato" aria-labelledby="contact-title" data-track="section_view">
          <div className="contact-inner shell">
            <div className="contact-copy" data-r="">
              <p className="eyebrow">Fale com a Aurevion</p>
              <h2 id="contact-title" className="linhas"><span className="ln"><span>Conte o que sua</span></span><span className="ln"><span>empresa precisa.</span></span></h2>
              <p>Um site novo? Um sistema? Menos tarefas manuais? Mande uma mensagem e vamos entender seu projeto.</p>
            </div>
            <div className="contact-channels" data-r="" style={{ "--d": ".1s" } as React.CSSProperties}>
              <WhatsAppLink location="contact-direct"><WhatsAppIcon />Pedir orçamento no WhatsApp</WhatsAppLink>
              <a className="phone-link" href={`tel:+${WHATSAPP_NUMBER}`} onClick={() => trackEvent("contact_click", { location: "contact", channel: "phone" })}>(27) 92002 6247 <span>Ligar <Arrow diagonal /></span></a>
              <div className="support-channel"><span>Já é cliente? Fale com o suporte.</span><a href={SUPPORT_EMAIL_URL} onClick={() => trackEvent("contact_click", { location: "support", channel: "email" })}>{SUPPORT_EMAIL}<Arrow diagonal /></a></div>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer shell">
        <a href="#inicio" aria-label="Aurevion, voltar ao início"><BrandMark /></a>
        <p>Sites, sistemas e automações para empresas.</p>
        <a className="footer-link" href={SISTEMA_OS_URL} target="_blank" rel="noopener noreferrer">Sistema OS<span className="sr-only"> (abre em nova aba)</span></a>
        <span>© {new Date().getFullYear()} Aurevion</span>
      </footer>

      <WhatsAppLink className="whats-flutuante" location="floating" label="Pedir orçamento no WhatsApp (abre em nova aba)"><WhatsAppIcon /></WhatsAppLink>
    </>
  );
}
