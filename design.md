# Design — Aurevion

Sistema visual bloqueado para o site da Aurevion. A interface deve parecer construída a partir da operação de uma empresa — entrada, decisão e execução — e não a partir de um template SaaS.

## Genre

Modern-minimal com tensão editorial e atmosfera escura.

## Tese visual

O símbolo “A” funciona como núcleo: informações entram, regras organizam e ações saem. Linhas contínuas, cortes diagonais e mudanças de escala expressam direção. O dourado não decora; ele marca a etapa ativa ou a ação principal. O azul identifica estrutura e contexto.

## Macroestrutura

- Marketing: hero editorial de largura total → diagnóstico em linhas → fluxo operacional sticky → dois capítulos de serviço → uma demonstração de produto com vistas alternáveis → processo linear → FAQ → conversa.
- Nada de sequência repetida “título centralizado + texto + três cards”.
- Nenhum bloco existe apenas para preencher espaço ou simular prova social.

## Paleta

- Papel: `#07101a`
- Papel elevado: `#0b1724`
- Superfície: `#102235`
- Tinta: `#f1f5f7`
- Tinta secundária: `#a8b4c1`
- Regra: `#26394d`
- Azul Aurevion: `#204d7d`
- Ouro Aurevion: `#e4aa1b`
- Ouro claro: `#ffd66b`
- Estado positivo: `#75d6ae`

O ouro ocupa menos de 8% da tela e sempre indica direção, progresso ou ação.

## Tipografia

- Display: Bricolage Grotesque, 520–680, sempre romana.
- Corpo: Instrument Sans, 400–600.
- Utilitária: IBM Plex Mono, 500.
- Headlines usam quebras manuais e tracking negativo moderado; nunca itálico.

## Formas

- Seções usam planos, linhas e recortes; não “cards” arredondados em série.
- Controles têm raio pequeno e um corte diagonal no canto superior direito.
- Mídia pode ter raio de 12 px; tags e estados podem ser totalmente circulares.
- Frames falsos de navegador, telefone ou IDE são proibidos.

## Motion

- Entrada: máscara vertical para a tese da hero.
- Produto: trilho contínuo e pulsos que mostram o fluxo de dados.
- Troca de vista: wipe horizontal, não fade-up.
- Hover: deslocamento de 2 px e mudança de regra; sem escala elástica.
- Áreas calmas permanecem estáticas.
- `prefers-reduced-motion`: sem parallax, vídeo pausado e transições de até 120 ms.

## CTA

- Primário: ouro sólido, texto escuro, recorte diagonal, verbo específico.
- Secundário: link tipográfico sublinhado pelo trilho azul.
- Copy principal: “Quero construir meu sistema”.

## Voz

Confiante, concreta e direta. A Aurevion fala sobre operação, etapas, sistemas, integrações e trabalho manual — nunca sobre “transformar o futuro”, “revolucionar” ou “levar ao próximo nível”. Nenhuma métrica, cliente, depoimento ou resultado é inventado.

## Critério de assinatura

Sem o logo, o conjunto ainda deve ser reconhecível pelo Aurevion Flow: núcleo em “A”, trilhos azul/dourado, estados operacionais e recortes diagonais.
