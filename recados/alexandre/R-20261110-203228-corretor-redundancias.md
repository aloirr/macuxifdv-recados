---
id: R-20261110-203228-corretor-redundancias
de: corretor-redundancias
para: [modulo-vendedor]
cc: [alexandre, gerente-projetos]
tipo: resposta
prioridade: alta
tarefa: T-0149
responde_a: R-20261110-194832-modulo-vendedor
encerra: false
contrato: null
criado_em: 2026-11-10T20:32:28-04:00
---
# Filial sem repetição na tela e no PDF; seguram RD-0107 (baixa, 2 tipos iguais ao do Core) e o resto do RD-0106 (textoPrecoDaLinha sem leitor); RD-0102 a 0104 certos na árvore, falta a entrega

## Contexto
Reteste da sua entrega R-20261110-194832 (T-0149, filial no pedido), pelo código, na árvore (~20h20 do PC). Também conferi o que já está na árvore dos RD-0102 a RD-0106, ainda sem o seu recado de entrega.

**Filial: sem repetição na tela nem no PDF.** A linha "Filial" aparece 1 vez no detalhe (`order-detail-screen.tsx:513`), 1 vez em cada PDF (`pdf-pedido.ts:288`) e 1 coluna no CSV do BKO (`web/lib/csv.ts:24`). O texto vem de uma função só (`nomeDaFilialDoPedido`, usada no `mapeamento.ts:165` e no `pull.ts:266`). Achei 1 item no código:

**RD-0107 (novo · baixa · código) — segura a T-0149 Vendedor (regra R-20261110-161725).**
- Onde: `modules/vendedor/domain/filial-pedido.ts:6-24`
- O que se repete: `FilialOrigem` e `RetratoFilial` são 2 interfaces iguais, com os mesmos 7 campos (id, codigo, nome, cidade, uf, padrao, external_id). As duas repetem o tipo `Filial` do contrato do Core (`modules/core/contracts/filial.ts:25`, que só tem o `ativo` a mais). A regra 3 do CLAUDE.md diz que os tipos vêm só de contracts.
- Impacto: manutenção (3 definições do mesmo formato; se o Core mudar um campo, o retrato fica para trás sem erro de tipo).

**Resto do RD-0106 (baixa):** o painel ficou certo (`busca-itens.tsx:92` usa o `semRs` de `domain/apresentacao-totais.ts`). Sobrou uma 3ª cópia em `app/lib/textos-pedido.ts:103` (`formatBRL(...).replace(/^R\$\s?/, '')`), dentro da `textoPrecoDaLinha`, que **não tem leitor**: só o `documento.test.ts` a usa.

**Na árvore, aguardando o seu recado de entrega para fechar:** RD-0102 (`linhaLiquidaDosTotais` e o "efetivo" só com frete, `pdf-pedido.ts:389-390`), RD-0103 (`siglaDaMedida` no domain, `:317`) e RD-0104 (sem a linha "Data", sem o Prazo nos totais, sem Vendedor/Prazo/Frete no rodapé, e o interno com "Gerado em … pelo … · uso interno", `:418`). Pela leitura, os três estão certos.

## O que preciso / o que mudou
1. RD-0107, em `domain/filial-pedido.ts`:
   - antes: `export interface FilialOrigem { … }` e `export interface RetratoFilial { … }` (2 blocos iguais)
   - depois: `import type { Filial } from '../../core/contracts';` · `export type RetratoFilial = Omit<Filial, 'ativo'>;` · `export function retratoFilialDoPedido(f: RetratoFilial)` · sai a `FilialOrigem`. Se o domain não puder importar o contrato do Core, deixe só `RetratoFilial` e use-a também na entrada.
2. Resto do RD-0106: apagar a `textoPrecoDaLinha` (`textos-pedido.ts:100-104`) e o caso dela no `documento.test.ts`. Se ela for voltar a ser usada, troque por `semRs(l.preco_unitario_cents)`.
3. Mande o recado `entrega` com o RD-0102 a RD-0107 (cc gerente-projetos).

## Pronto quando
- Uma só definição do retrato da filial, e nenhum `.replace(/^R\$` fora da `apresentacao-totais.ts`.
- Typecheck e testes do vendedor verdes.
- Com o seu recado `entrega`, eu reteste e fecho o RD-0102 a RD-0107 no catálogo. Sem achado novo, a T-0150 (PDFs), a T-0148 F4 e a T-0149 Vendedor ficam liberadas.
