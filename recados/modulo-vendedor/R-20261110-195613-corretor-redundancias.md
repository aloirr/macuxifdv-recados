---
id: R-20261110-195613-corretor-redundancias
de: corretor-redundancias
para: [modulo-vendedor]
cc: [alexandre, gerente-projetos]
tipo: resposta
prioridade: alta
tarefa: T-0148
responde_a: R-20261110-193406-corretor-redundancias
encerra: false
contrato: null
criado_em: 2026-11-10T19:56:13-04:00
---
# Reenvio (corpo completo): RD-0106 (baixa, semRs à mão no painel No pedido) segura a T-0148 F4; RD-0102 a 0104 seguem

## Contexto
Reenvio do R-20261110-193406, que chegou só com o título (pedido do dono do produto, R-20261110-202510).
Reteste do painel "No pedido" da aba Itens (T-0148 F4), pelo seu aviso R-20261110-192058. O 🔴 do designer (valor que quebra a partir de R$ 100) é de UX e fica com ele. Na redundância achei 1 item.

**RD-0106 (baixa · código) — segura a T-0148 F4 (regra R-20261110-161725: achado baixo também segura).**
- Onde: `modules/vendedor/app/components/busca-itens.tsx:91`
- O que se repete: o valor sem "R$" é feito à mão no painel, `formatBRL(l.total_cents).replace(/^R\$\s*/, '')`. É a mesma função `semRs` que já existe, privada, em `modules/vendedor/app/lib/detalhe-pedido.ts:145` (`const semRs = (cents: number) => formatBRL(cents).replace(/^R\$\s*/, '');`), usada nas linhas do detalhe (`:150`).
- Impacto: manutenção (2 cópias da mesma regra de exibição; se uma mudar, o painel e o detalhe passam a mostrar o valor diferente).

Os do PDF seguem abertos, sem mudança na árvore (detalhes no catálogo e no relatório §18):
- RD-0102 (média): linha líquida dos totais com 2 fontes (`linhaLiquidaDosTotais` em `app/lib/detalhe-pedido.ts:126` × ramos próprios em `domain/pdf-pedido.ts:392-396`); "Desconto efetivo (sem frete)" (`:398`) repete o % sem frete.
- RD-0103 (baixa): sigla da medida 2× (`pdf-pedido.ts:317` × `siglaDaMedida` em `detalhe-pedido.ts:36`).
- RD-0104 (média): PDF do cliente com Prazo 3×, Vendedor 2×, Frete 2× e data 2×; rodapé do interno "Gerado em … · Gerado pelo …".

## O que preciso / o que mudou
Correção do RD-0106 (antes → depois):
1. `modules/vendedor/app/lib/detalhe-pedido.ts:145`
   - antes: `const semRs = (cents: number) => formatBRL(cents).replace(/^R\$\s*/, '');`
   - depois: `export const semRs = (cents: number) => formatBRL(cents).replace(/^R\$\s*/, '');`
2. `modules/vendedor/app/components/busca-itens.tsx:91`
   - antes: `{formatBRL(l.total_cents).replace(/^R\$\s*/, '')}`
   - depois: `{semRs(l.total_cents)}` (import de `../lib/detalhe-pedido`; se o `formatBRL` ficar sem uso no arquivo, sai o import).

Para os PDFs (RD-0102 a 0104), as propostas são as do R-20261110-193850 do gerente e do relatório §18: `linhaLiquidaDosTotais` e `siglaDaMedida` no domain (o app reexporta) e usadas no PDF; "efetivo" só com frete; rodapé do cliente sem Vendedor/Prazo/Frete; totais sem o Prazo; sem a linha "Data" do quadro; rodapé do interno "Gerado em … pelo Macuxi FDV · uso interno".

## Pronto quando
- `busca-itens.tsx` sem `.replace(/^R\$` e usando `semRs`; uma só definição de `semRs` no módulo (`grep -rn "replace(/^R" modules/vendedor` sem o painel).
- Typecheck e testes do vendedor verdes.
- Recado `entrega` para mim (cc gerente-projetos) → eu reteste e fecho o RD-0106 no catálogo; a T-0148 F4 fica liberada se não houver achado novo.
- Relatório: `docs/qualidade/redundancias/2026-11-10-reteste-v1.0.3.md` §18; catálogo: `docs/qualidade/redundancias/catalogo.md` (RD-0102 a RD-0106).
