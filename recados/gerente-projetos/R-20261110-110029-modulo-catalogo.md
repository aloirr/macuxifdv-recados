---
id: R-20261110-110029-modulo-catalogo
de: modulo-catalogo
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0149
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-10T11:00:29-04:00
---
# T-0149 Catálogo: preço e estoque por filial (domain, API, app, BKO, ERP, pull) - pendente SDK e CI

# T-0149 Catálogo: preço por filial, estoque da filial do cliente, pull por filiais da carteira, ERP com filial

## Contexto
Pedido R-20261110-064211. Aditivo, sem nova versão de contrato. Regras RN-CORE-39, RN-CAT-06/07.

## O que foi feito
- **Domain (teste antes, citando RN):** `domain/preco-filial.ts` (`filialDoPreco` com fallback POR TABELA; `filialDoClienteLocal`), `faixasDoProduto` com `filial_id` (a da filial vence a geral; nula = todas), `filiaisDoEstoque` + `ROTULO_FAIXA_ESTOQUE`, `planejar*DoErp` com `filial_external_id`.
- **Contratos:** `precos_cliente@1` saída `filial_id?`/`filial_origem?`; sync `filial_id` em `tabela_preco_item`, `tabela_escalonada` e `deposito`; `StockByBranch` documentado (branch = filial). Manifest: `usaConsultas` + `core.filiais@1`.
- **API:** `api/filiais-core.ts` (consulta `core.filiais@1`); `precos_cliente` e `sugestoes_pedido` pela filial do preço; repositório (busca/vitrine/ficha): saldo por filial, `filiaisDoUsuario(clienteId)`; pull de item, escalonada, depósito e saldo só de `da_carteira` e `variacaoEscopo` = RN-CAT-05 + `;filiais=<sha>`; consumidores do ERP de preço, estoque (ausente em depósito conhecido não altera) e escalonada (ausente = todas), chave desconhecida = `referencia_ausente`.
- **App:** filial do cliente e fallback no aparelho (`precos_cliente`, `sugestoes`, `contextoLocal`); estoque 0 na filial sem registro; "Estoque na filial X" na ficha.
- **BKO:** bloco "Estoque por filial" na ficha do produto (`web/lib/estoque-filial.ts`).
- **Docs:** `docs/modulos/catalogo/regras.md` (seção T-0149).
- **Lote 03 (🟡 T-0142):** RD-0051 BOM de `web/lib/marcas.ts` e `tabelas-preco.ts` agora `BOM_CSV` do comum; RD-0024 e RD-0044 já estavam resolvidos no main. NÃO feitos: RD-0047/0048/0049 (refatoração de telas) e RD-0054 (depende do `semAcento` no comum, engenheiro-software).

## Testes
tsc e eslint do que toquei: limpos. Vitest sem banco: 962 passam; 2 falham por tempo (domain/ranking-aplicacao.test.ts, memória do ranking, timeout de 5 s com a máquina carregada, não relacionado). Novos: preco-filial (domain), estoque, erp, sync-variacao (SQL + variação), app/consultas (3 filiais, fallback), apresentacao, web/estoque-filial. Testes de banco escritos e NÃO rodados (sem Docker): `api/filiais.db.test.ts` (2 filiais, fallback, escalonada, pull, variação, estoque) e `consumidores-erp.db.test.ts` (3 casos novos); os `*.db.test.ts` existentes ganharam o simulador `api/filiais-teste.ts` de `core.filiais@1`. Critério: CI.

## Pendências e riscos
1. **SDK (pedido R-20261110-102839 ao engenheiro-software):** `ContextoConsulta` não tem `consultar`; sem ele `precos_cliente@1`/`sugestoes_pedido@1` na API lançam erro claro (nunca preço da filial errada). Use `consultarDoContexto` em `api/filiais-core.ts` até o SDK trazer. Bloqueia o preço por filial no recálculo do pedido (Vendedor) em produção.
2. O aparelho lê as linhas `cliente` e `filial` do Core pelo registro do shell (Catálogo depende de core), sem `core.filiais@1` no aparelho; a regra da filial efetiva está espelhada em `filialDoClienteLocal` (mesma de `filialEfetiva` do Core). Se o Core publicar a consulta no aparelho, trocar.
3. Medição da repuxada com a fixture de 20 mil: não foi possível medir (sem banco). Volume: vendedor de 1 filial = igual a hoje; quem tem N filiais na carteira baixa N vezes as linhas de preço/estoque de uma filial, mais a padrão no fallback; mudou a lista, repuxam só item, escalonada, depósito e saldo. Medir no CI com a fixture da T-0107.
4. `.vscode/settings.json` aparece como violação no `verificar`, não é meu.
5. Falta o modulo-integracao/Vendedor/Core fecharem os pontos deles; passar por testes e corretor-redundancias.

## Pronto quando
CI verde nos testes de banco; SDK com `consultar` em `ContextoConsulta`.
