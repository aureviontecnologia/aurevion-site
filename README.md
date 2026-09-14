# Aurevion

Site institucional da Aurevion em React, Vinext e CSS responsivo.

Produção: https://aureviontecnologia.vercel.app/
Repositório: https://github.com/aureviontecnologia/aurevion-site

## Conteúdo

A página apresenta sites, sistemas e automações, um projeto real da TechReparos, explicação da contratação, FAQ e contato. A revisão de setembro de 2026 removeu as demonstrações fictícias, o vídeo e o formulário obrigatório.

- WhatsApp: (27) 92002 6247
- Telefone: tel:+5527920026247
- Suporte: aureviontecnologia@gmail.com
- Os links de orçamento abrem uma conversa em nova aba. O usuário revisa e envia a mensagem no WhatsApp.

## Personalização

- app/page.tsx: contatos, navegação, serviços, perguntas e eventos.
- app/globals.css: tokens da paleta, layout e comportamento responsivo.
- app/layout.tsx: fontes, metadados, dados estruturados e Analytics.
- public/aurevion-symbol-transparent.png: símbolo do cabeçalho.
- public/techreparos-site.jpg: captura real do projeto, feita em 14/09/2026.
- public/og.png: imagem de compartilhamento.
- design.md: direção visual atual.

Os vídeos antigos permanecem no repositório, mas não são carregados pela página. O site funciona sem JavaScript para leitura, FAQ, menu e links de contato; o JavaScript adiciona fechamento do menu e medição de eventos.

## Desenvolvimento e verificações

Requer Node.js 22.13 ou superior.

```sh
npm install
npm run dev
npm test
npx eslint app/page.tsx app/layout.tsx tests/rendered-html.test.mjs
npm run build:vercel
```

O build Vercel exporta os arquivos para vercel-static. Não editar esse diretório gerado.

## Analytics

O identificador fica na variável NEXT_PUBLIC_GA_ID, configurada no ambiente de publicação, nunca em credenciais compartilhadas. O layout mantém a integração existente com o Google Analytics.

Eventos de contato: whatsapp_click, contact_click e cta_click. Cada um tem um propósito distinto; não somar os três como se fossem três pessoas. Um clique não confirma envio da mensagem nem venda. Também são medidos service_view, case_study_view, project_click, faq_open e scroll_depth. Os parâmetros não incluem nomes, emails ou mensagens dos visitantes.

## Publicação

Usar o projeto Vercel já associado à pasta e o comando vercel deploy --prod --yes --scope aurevion-projects. Conferir o domínio oficial depois que o deploy ficar pronto, incluindo NEXT_PUBLIC_GA_ID, assets, navegação, FAQ e contatos. Não publicar automaticamente em outro provedor.

Antes de publicar, revisar o diff e testar celular, tablet, desktop, teclado e movimento reduzido. Não inserir segredos, arquivos de configuração local ou resultados de testes no Git.
