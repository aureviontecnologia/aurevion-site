"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

const WHATSAPP_NUMBER = "5527920026247";
const SUPPORT_EMAIL = "aureviontecnologia@gmail.com";
const SUPPORT_EMAIL_URL = `mailto:${SUPPORT_EMAIL}?subject=Suporte%20Aurevion`;

function whatsappUrl(service?: string) {
  const message = service
    ? `Olá! Gostaria de conversar com a Aurevion sobre ${service}.`
    : "Olá! Gostaria de pedir um orçamento para minha empresa na Aurevion.";
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

const navigation = [
  { label: "Serviços", href: "#solucoes" },
  { label: "Projeto", href: "#demonstracao" },
  { label: "Dúvidas", href: "#duvidas" },
  { label: "Contato", href: "#contato" },
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

function WhatsAppLink({ children, className = "button button-primary", location, service }: {
  children: React.ReactNode;
  className?: string;
  location: string;
  service?: string;
}) {
  return (
    <a href={whatsappUrl(service)} target="_blank" rel="noopener noreferrer" className={className}
      onClick={() => {
        trackEvent("cta_click", { location, destination: "whatsapp" });
        trackEvent("contact_click", { location, channel: "whatsapp" });
        trackEvent("whatsapp_click", { location });
      }}>
      {children}<span className="sr-only"> (abre em nova aba)</span>
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
              </nav>
            </details>
          </div>
        </div>
      </header>

      <main id="conteudo" tabIndex={-1}>
        <section className="hero shell" id="inicio" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow">Tecnologia para o dia a dia da sua empresa</p>
            <h1 id="hero-title">Sites, sistemas<br />e automações<br /><span>para sua empresa.</span></h1>
            <p className="hero-description">Apresente seus serviços, organize o trabalho e reduza tarefas manuais. A Aurevion desenvolve a solução com você, do planejamento à publicação.</p>
            <div className="hero-actions">
              <WhatsAppLink location="hero"><WhatsAppIcon />Pedir orçamento no WhatsApp</WhatsAppLink>
              <a className="text-link" href="#solucoes">Conhecer os serviços <Arrow /></a>
            </div>
          </div>

          <figure className="project-preview" id="demonstracao" data-track="case_study_view" data-track-label="techreparos">
            <div className="project-caption-top"><span>Um projeto na prática</span><span>Site institucional</span></div>
            <a className="project-image-link" href="https://techreparos.vercel.app/" target="_blank" rel="noopener noreferrer" aria-label="Visitar o site da TechReparos, projeto da Aurevion (nova aba)" onClick={() => trackEvent("project_click", { project: "techreparos" })}>
              <Image src="/techreparos-site.jpg" alt="Site da TechReparos com serviços de assistência técnica e contato pelo WhatsApp" width={1120} height={820} priority unoptimized />
            </a>
            <figcaption><div><strong>TechReparos</strong><p>Serviços e contato em um site direto ao ponto.</p></div><a className="project-open" href="https://techreparos.vercel.app/" target="_blank" rel="noopener noreferrer" aria-label="Abrir projeto TechReparos (nova aba)" onClick={() => trackEvent("project_click", { project: "techreparos" })}><Arrow diagonal /></a></figcaption>
          </figure>
        </section>

        <section className="services-section" id="solucoes" aria-labelledby="services-title">
          <div className="shell">
            <div className="section-heading"><div><p className="eyebrow">O que fazemos</p><h2 id="services-title">Do seu site à rotina<br />da sua equipe.</h2></div><p>Comece pelo que sua empresa precisa agora. O projeto pode crescer junto com o negócio.</p></div>
            <div className="service-list">
              {services.map((service) => (
                <article className="service" key={service.event} data-track="service_view" data-track-label={service.event}>
                  <h3>{service.name}</h3>
                  <div className="service-description"><h4>{service.title}</h4><p>{service.description}</p><p className="service-examples"><span>Na prática</span>{service.examples}</p></div>
                  <WhatsAppLink className="service-link" location={`service-${service.event}`} service={service.request}><span>Conversar sobre {service.name.toLowerCase()}<small>pelo WhatsApp</small></span><Arrow diagonal /></WhatsAppLink>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="process-section shell" id="processo" aria-labelledby="process-title">
          <h2 id="process-title">Você entende o projeto<br />antes de começar.</h2>
          <div className="process-copy"><p>Primeiro, conversamos sobre o que sua empresa precisa. Depois, você recebe uma proposta com as entregas, o valor e o prazo.</p><p>Com a proposta aprovada, desenvolvemos e revisamos a solução com você até a entrega.</p><a className="text-link" href="#contato">Vamos conversar <Arrow /></a></div>
        </section>

        <section className="faq-section shell" id="duvidas" aria-labelledby="faq-title">
          <div className="faq-heading"><p className="eyebrow">Antes de começar</p><h2 id="faq-title">Dúvidas frequentes.</h2><p>Não precisa entender de tecnologia para conversar com a gente.</p></div>
          <div className="faq-list">
            {faqs.map((faq, index) => (
              <details className="faq-item" key={faq.question} onToggle={(event) => { if (event.currentTarget.open) trackEvent("faq_open", { question: index + 1 }); }}>
                <summary><h3>{faq.question}</h3><span className="faq-icon" aria-hidden="true">+</span></summary>
                <div className="faq-answer"><p>{faq.answer}</p></div>
              </details>
            ))}
          </div>
        </section>

        <section className="contact-section" id="contato" aria-labelledby="contact-title" data-track="section_view">
          <div className="contact-inner shell">
            <div className="contact-copy"><p className="eyebrow">Fale com a Aurevion</p><h2 id="contact-title">Conte o que sua<br />empresa precisa.</h2><p>Um site novo? Um sistema? Menos tarefas manuais? Mande uma mensagem e vamos entender seu projeto.</p></div>
            <div className="contact-channels">
              <WhatsAppLink location="contact-direct"><WhatsAppIcon />Pedir orçamento no WhatsApp</WhatsAppLink>
              <a className="phone-link" href={`tel:+${WHATSAPP_NUMBER}`} onClick={() => trackEvent("contact_click", { location: "contact", channel: "phone" })}>(27) 92002 6247 <span>Ligar <Arrow diagonal /></span></a>
              <div className="support-channel"><span>Já é cliente? Fale com o suporte.</span><a href={SUPPORT_EMAIL_URL} onClick={() => trackEvent("contact_click", { location: "support", channel: "email" })}>{SUPPORT_EMAIL}<Arrow diagonal /></a></div>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer shell">
        <a href="#inicio" aria-label="Aurevion, voltar ao início"><BrandMark /></a><p>Sites, sistemas e automações para empresas.</p><span>© {new Date().getFullYear()} Aurevion</span>
      </footer>
    </>
  );
}
