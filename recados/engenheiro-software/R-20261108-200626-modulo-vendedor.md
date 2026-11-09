---
id: R-20261108-200626-modulo-vendedor
de: modulo-vendedor
para: [gerente-projetos]
cc: [designer-ux, engenheiro-apps, engenheiro-software, testes]
tipo: entrega
prioridade: normal
tarefa: T-0138
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-08T20:06:26-04:00
---
# T-0138 entregue: detalhe do pedido/orçamento em tags, cancelamento integrado, Equivale a no PDF, emitido_em

## Contexto
T-0138 (Frente M, última da T-0131): detalhe do pedido e do orçamento, histórico em tags, cancelamento integrado, "Equivale a" no PDF e emitido_em. Não mexi em apps/mobile. Entra no build v1.0.1.

## O que foi feito
1. **D1 (RN-VEN-31, T-0114)**: `orderActions(status, { erpAceitaCancelamento })` com o aceite devolve can_cancel true, can_edit false e `MSG_ENVIADO_NAO_EDITA` (sem "cancele no ERP"); sem aceite e faturado mantêm a mensagem. `use-vendedor.acoesDe(status, aceite)` recebe o aceite de `erp_aceita_cancelamento` no pull: campo novo opcional em `PedidoSyncSchema`/`Order`, marcado só nos enviados/integrados por UMA consulta `integracao.cancelamento_erp@1` (licença tenant) por página (`api/sync.ts`). Não precisou de campo do Core nem da Integração. O D1 de `tests/modulos/defeitos-corretor-r173739.test.ts` (do testes) já acusa o `it.fails` como passando: o testes volta para `it`.
2. **Detalhe (Campo e Gestão)**: `app/screens/order-detail-screen.tsx` na ordem da spec: voltar + ⋮ → título com tag (orçamento "até dd/mm"/vencido; pedido, a última tag do histórico) → cliente com código → "Vendedor: …" → itens (8 + "Ver os N itens", desconto do item em 2ª linha) → Total separado com "forma · prazo · frete" → histórico `HistoricoEmTags` → `RodapeAcoes` (1 ação grande + ícones Editar/PDF/Duplicar/Pedido). Cancelar só no `MenuMais` (⋮), com a folha de confirmação e motivo ("Cancelar este pedido?", "O pedido não será enviado ao ERP." / "O cancelamento será pedido ao ERP." com o aceite). O botão do cancelamento integrado só aparece com o aceite (domain). Parte pura: `app/lib/detalhe-pedido.ts` (`acoesDoDetalhe`, itens, linhas) e `domain/historico-pedido.ts` (`eventosDoPedido`, `eventosDoOrcamento`). "Recebido pelo servidor" saiu (`orderNote` e `motivoDoEvento`). Autor só quando não é o vendedor nem sistema. `AvisoRapido` não soma mais insets.bottom (🟡 do engenheiro-apps).
3. **BKO**: `order-drawer.tsx` troca o `<ol>` do histórico por `HistoricoEmTags` do kit web.
4. **"Equivale a" no PDF** (T-0085 §5, RN-CAT-10): `equivaleAHtml` em `domain/pdf-pedido.ts`; PDF interno sempre, PDF do cliente só com `referencia_no_orcamento`. Referências lidas de `catalogo.textos_produto@1` na hora de gerar (`referenciasDeProdutos`).
5. **emitido_em** aditivo em `vendedor.pedido.criado@1` (aparelho limitado: `emitidoEm`), igual ao da consulta `pedidos_da_meta@1` (`EMITIDO_EM_SQL`). Recados ao engenheiro-software (registrar em `.coord/contratos/eventos.md`), modulo-gestor e modulo-core.

## Testes e verificações
- typecheck do módulo verde (3 projetos); `pnpm --filter ./modules/vendedor test`: 1124 verdes, 100 de banco pulados (sem Docker; CI decide); a falha encontrada na suíte (fonte da tela em `salvar-na-fila-telas.test.ts`) foi ajustada. Novos: `order.test.ts`, `api/sync-aceite.test.ts`, `app/lib/detalhe-pedido.test.ts` (22), `pdf-pedido.test.ts`, `aprovacao.test.ts`, `pedido-em-nome.test.ts`, `eventos.test.ts`, `pull.test.ts`, `textos-pedido-ux.test.ts`, `consulta-pedidos-da-meta.test.ts`. Lint nos arquivos tocados sem erros. `coord verificar modulo-vendedor`: sem violações.
- `tests/modulos/promotor-sem-pedido.test.ts` verde; defeitos-corretor: só o D1 (it.fails agora passa, sinal esperado) e o D3 (do catálogo, fora do meu escopo).

## Roteiro de reteste (APK v1.0.1, Campo e Gestão)
1. Orçamento aberto: tela abre com número + tag "Orçamento · até dd/mm", cliente "Nome · cód. X", "Vendedor: …", itens, Total separado com "Pix · À vista · CIF", histórico só "Salvo · dd/mm hh:mm". Rodapé: Transformar em pedido grande; Editar, PDF, Duplicar em ícone; ⋮ → Cancelar orçamento → confirma. Sem texto "Recebido pelo servidor".
2. Orçamento vencido: Duplicar vira o botão grande ("Entra pelos preços de hoje"), PDF em ícone, tag Vencido no histórico. Transformado: PDF, Duplicar, Pedido (abre o gerado).
3. Pedido enviado/aprovado/rejeitado: tag do cabeçalho igual à última do histórico; Rejeitado mostra o motivo em 1 linha; pedido em nome mostra o gestor na tag. Pedido na fila: só PDF; recusado: "Corrigir pedido" grande.
4. Pedido com mais de 8 itens: 8 + "Ver os N itens".
5. Gestão: mesma tela, sem Editar/Duplicar do vendedor, PDF disponível.
6. Conector com aceite de cancelamento: pedido integrado mostra "Cancelar pedido" no ⋮ e nenhum "cancele no ERP"; sem aceite, a nota "Pedido já enviado ao ERP — cancele no ERP" e sem o ⋮ de cancelar. Faturado nunca cancela.
7. PDF interno de produto com concorrente cadastrado: "Equivale a: <marca> <código>" abaixo da aplicação; PDF do cliente sem a linha (a menos que referencia_no_orcamento = sim).
8. BKO: gaveta do pedido com histórico em tags.
9. Rodapé: sem vão extra no pé (RodapeAcoes e aviso dentro das abas).

## Premissas / pendências
- Spec §4.3 manda "Corrigir pedido" no rejeitado; hoje, no v1, o pedido já no servidor não é editável pela regra de sempre (`estadoDasAcoes`), então só aparece no recusado da fila e no editável pelo domain. Ajuste de regra é decisão do gerente/engenheiro.
- Aceite de cancelamento chega ao aparelho quando a linha do pedido é puxada; mudança de configuração do conector só reflete na próxima atualização da linha (a API revalida no cancelar).
- Conflito de spec: designer diz "Equivale a nunca no PDF do cliente"; RN-CAT-10 e o desenho T-0085 §5 permitem com `referencia_no_orcamento`; segui a RN.
- Print antes/depois do APK e revisão do designer-ux (critério 2) ficam para o build.
- Falta Docker local: testes `*.db.test.ts` (incluindo a igualdade evento × consulta no banco) dependem do CI.
