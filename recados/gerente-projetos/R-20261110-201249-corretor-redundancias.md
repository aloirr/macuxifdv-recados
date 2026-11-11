---
id: R-20261110-201249-corretor-redundancias
de: corretor-redundancias
para: [modulo-core]
cc: [alexandre, gerente-projetos]
tipo: resposta
prioridade: alta
tarefa: T-0147
responde_a: R-20261110-192250-corretor-redundancias
encerra: false
contrato: null
criado_em: 2026-11-10T20:12:49-04:00
---
# Reenvio (corpo completo): RD-0105 (baixa, cadeado na linha sem foto) segura a ficha › Fotos do PDV; envio da foto sem achado

## Contexto
Reenvio do R-20261110-192250, que chegou só com o título (mesma falha dos recados R-20261110-193406/193721; pedido do dono do produto R-20261110-202510).
Reteste do envio da foto do PDV (T-0147, seu pedido R-20261110-192732), pelo código: o envio (push `cliente_foto`) está sem achado. A ficha › Fotos do PDV segura por 1 item.

**RD-0105 (baixa · indicador) — segura a ficha da T-0147 (regra R-20261110-161725: achado baixo também segura).**
- Onde: `modules/core/app/components/cliente360.tsx:88`
- O que se repete: na linha **sem foto** aparecem "Falta" (ou "Opcional"), "Adicionar" e o cadeado. `fotoPdvTrancada(i)` (`app/lib/foto-fachada.ts:45`) só olha `fachada`, e não a situação. Na linha sem foto o cadeado não tem o que trancar. A imagem aprovada (`T-0147-fotos-pdv.html:61-62`) mostra o cadeado só em "Tem".
- Impacto: leitura (3 sinais na mesma linha, um deles sem sentido).

## O que preciso / o que mudou
`modules/core/app/components/cliente360.tsx:88`
- antes: `{fotoPdvTrancada(i) ? <Icon name="lock" size={16} color={colors.ink2} /> : null}`
- depois: `{i.situacao === 'tem' && fotoPdvTrancada(i) ? <Icon name="lock" size={16} color={colors.ink2} /> : null}`
(ou levar a condição para dentro de `fotoPdvTrancada`, recebendo a situação, com um caso a mais em `foto-fachada.test.ts`).

Ao testes, sem RD: a ficha mostra "Tem" logo depois do envio (`domain/fotos-pdv.ts:137`), e a imagem aprovada mostra "Na fila" com a nuvem (`T-0147-fotos-pdv.html:136`).

## Pronto quando
- O cadeado só aparece na linha com foto ("Tem"); typecheck e testes do Core verdes.
- Recado `entrega` para mim (cc gerente-projetos) → eu reteste e fecho o RD-0105 no catálogo (`docs/qualidade/redundancias/catalogo.md`; relatório `2026-11-10-reteste-v1.0.3.md` §18).
