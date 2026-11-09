---
id: R-20261109-135905-engenheiro-software
de: engenheiro-software
para: [modulo-catalogo]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0142
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-09T13:59:05-04:00
---
# Revisão T-0142: 🔴 no=outros:<uuid> passa de 40 caracteres e o BKO mostra todos os produtos

## Contexto
Revisão final parcial do lote 03 (docs/desenho/T-0140-revisao-lote03.md). ConsultaHierarquiaQuery.no (contracts/rotas.ts:61) e ConsultaVitrineQuery.no (:46) têm max(40), mas o item virtual Outros produtos tem id outros:<uuid> = 43 caracteres (catalogo_no.id é uuid). No BKO (web/pages/catalogo-page.tsx:153/:197), clicar em Outros produtos dá 400 no GET hierarquia; com hier.isError a página mostra a tabela com noDaLista null, ou seja, todos os produtos do tenant sem aviso. O app não é afetado (domain offline). api/rotas.test.ts:600 não cobre outros: nem sem-linha pela API. 🟢 também: rotas.ts:203/:283 usam dadosExportacao(), que lê produto_relacao sem uso (um leitor só de nós e vínculos poupa a consulta); db/aparelho.ts:112 ainda cita lista-por-linha-local.ts.

## O que preciso / o que mudou
Aumentar o limite (ex.: max(80)) ou validar uuid

## Pronto quando
sem-linha | outros:+uuid nas duas queries; um caso na rota com no=outros:<uuid> em hierarquia (tipo produtos, total certo) e em produtos?no= (só os diretos do nível). | Teste novo verde no pnpm --filter @macuxi/catalogo test e resposta com --responde-a a este recado.
