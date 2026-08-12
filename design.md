# Design — Aurevion

Sistema visual bloqueado para o site da Aurevion. A interface deve parecer construída a partir da operação de uma empresa — entrada, decisão e execução — e não a partir de um template SaaS.

## Genre

Modern-minimal com tensão editorial e atmosfera escura.

## Tese visual

Cada visual deve ser entendido em uma leitura: entrada, organização e resultado. O símbolo “A” identifica a marca, mas não substitui conteúdo nem aparece como etapa isolada. Superfícies azul-petróleo organizam a informação; o dourado marca apenas o caminho ou a ação principal.

## Macroestrutura

- Marketing: hero editorial de largura total → demonstração audiovisual curta → diagnóstico em linhas → dois capítulos de serviço → fluxo operacional → demonstração de produto com vistas alternáveis → processo linear → FAQ → conversa.
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
- Fundo visual: `#0e2639`
- Superfície visual: `#153550`
- Superfície visual ativa: `#1b4262`
- Ouro Aurevion: `#e4aa1b`
- Ouro claro: `#ffd66b`
- Estado positivo: `#75d6ae`

O ouro ocupa menos de 8% da tela e sempre indica direção, progresso ou ação.

## Tipografia

- Display: Bricolage Grotesque, 520–680, sempre romana.
- Corpo: Instrument Sans, 400–600.
- Rótulos: Instrument Sans, 600–650, sempre em caixa natural e sem espaçamento artificial.
- IBM Plex Mono fica reservado a símbolos funcionais; não é usado em rótulos públicos.
- Headlines usam quebras manuais e tracking negativo moderado; nunca itálico.

## Formas

- Seções usam planos, ritmo tipográfico e linhas funcionais; não “cards” arredondados em série.
- Diagramas usam retângulos simples, texto grande e setas inequívocas. Losangos, linhas diagonais soltas e microtextos são proibidos.
- Mídia pode ter raio de 12 px; tags e estados podem ser totalmente circulares.
- Frames falsos de navegador, telefone ou IDE são proibidos.

## Motion

- Entrada: a tese da hero permanece estática para carregar sem distração.
- Produto: vídeo de até cinco segundos, executado uma vez quando entra na tela, com três etapas sempre visíveis.
- Troca de vista: wipe horizontal, não fade-up.
- Hover: deslocamento de 2 px e mudança de regra; sem escala elástica.
- Áreas calmas permanecem estáticas.
- `prefers-reduced-motion`: vídeo mantido no poster estático e transições de até 120 ms.

## CTA

- Primário: ouro sólido, texto escuro, recorte diagonal, verbo específico.
- Secundário: link tipográfico sublinhado pelo trilho azul.
- Copy principal: “Quero construir meu projeto”.

## Voz

Confiante, concreta e direta. A Aurevion fala sobre operação, etapas, sistemas, integrações e trabalho manual — nunca sobre “transformar o futuro”, “revolucionar” ou “levar ao próximo nível”. Nenhuma métrica, cliente, depoimento ou resultado é inventado.

## Critério de assinatura

Sem o logo, o conjunto ainda deve ser reconhecível pelo Aurevion Flow: três etapas legíveis, superfícies azul-petróleo, tipografia direta e dourado usado somente como direção.
