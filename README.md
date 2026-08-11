# Aurevion

Landing page institucional e de conversão da Aurevion, construída com React, Vinext, CSS responsivo, Motion e uma composição audiovisual criada em Remotion.

Repositório público: https://github.com/albertocodexx/aurevion-site

## Conteúdo e contato

- WhatsApp: `+55 27 92002-6247`
- Link direto: `https://wa.me/5527920026247`
- O formulário monta a mensagem e abre o WhatsApp para revisão antes do envio.
- Os projetos exibidos são identificados como demonstrações conceituais. Não há clientes, métricas ou depoimentos inventados.

## Personalização

### Cores

Os tokens principais estão no início de `app/globals.css`:

- `--navy`: azul principal
- `--navy-deep`: fundo escuro
- `--gold`: CTA e destaques
- `--bg`, `--surface`, `--ink`: superfícies e texto

### Textos e serviços

O conteúdo fica em `app/page.tsx`. Os arrays `services`, `projects` e `principles` controlam os cards. Substitua os projetos conceituais por cases reais somente quando houver autorização para publicar nomes, imagens e resultados.

### Imagens e vídeo

- `public/aurevion-logo.png`: assinatura original em PNG
- `public/aurevion-symbol.png`: símbolo quadrado para avatar e favicon
- `public/og.png`: imagem de compartilhamento social
- `public/aurevion-hero.mp4`: composição audiovisual do hero
- `public/aurevion-hero-poster.png`: poster exibido antes do vídeo carregar

Mantenha a proporção do logo. As demonstrações da seção de projetos são interfaces em HTML/CSS e podem ser personalizadas em `app/page.tsx` e `app/globals.css`.

### Analytics

Copie `.env.example` para `.env.local` e informe o ID do Google Analytics. O script só é carregado quando `NEXT_PUBLIC_GA_ID` está definido. Avalie consentimento e política de privacidade conforme a LGPD antes de ativar rastreamento em produção.

## Desenvolvimento

Requer Node.js 22.13 ou superior.

```bash
npm install
npm run dev
```

Em Windows PowerShell, se o script de ambiente do npm não for interpretado, execute o Vinext com `WRANGLER_LOG_PATH` definido na sessão.

## Publicação

O site está publicado na Vercel em `aureviontecnologia.vercel.app`; o nome `aurevion.vercel.app` já estava ocupado. Para um domínio próprio no futuro, opções naturais são `aurevion.com.br` ou `aurevion.com` conforme disponibilidade.

## Checklist antes de publicar

- [ ] Confirmar número do WhatsApp e testar todos os CTAs
- [ ] Revisar serviços, área atendida e dados legais reais
- [ ] Trocar cases conceituais por cases autorizados quando existirem
- [ ] Adicionar depoimentos somente com texto, nome e foto aprovados
- [ ] Definir `NEXT_PUBLIC_SITE_URL` com a URL final
- [ ] Configurar `NEXT_PUBLIC_GA_ID` e consentimento LGPD, se necessário
- [ ] Rodar `npm test` e validar o build de produção
- [ ] Testar teclado, tema escuro permanente e preferência de movimento reduzido
- [ ] Testar 375 px, 768 px, 1024 px e desktop
- [ ] Verificar title, description, canonical, Open Graph, sitemap e robots
- [ ] Conferir compressão do vídeo e das imagens
- [ ] Conectar o domínio e habilitar HTTPS
