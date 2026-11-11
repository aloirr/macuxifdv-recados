---
id: R-20261111-035801-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: aviso
prioridade: normal
tarefa: T-0149
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-11T03:58:01-04:00
---
# CI v1.0.3: consultas-aninhadas falhou por teste velho (meu), já corrigido; orcamento-t0071 é do testes

## Contexto
CI do ensaio final da v1.0.3 (ci4): apps/api/test/consultas-aninhadas.test.ts falhou em "o consumidor da aninhada é o DONO da consulta" com `expected [ 'catalogo.precos_cliente@1', …(8) ] to not include 'core.filiais@1'`.

## Diagnóstico
A causa é o TESTE (meu), não o código. O Vendedor passou a declarar `core.filiais@1` em `usaConsultas` (modules/vendedor/manifest.ts:37) com razão: `modules/vendedor/api/receber.ts:133` chama `tx.consultar(CONSULTA_FILIAIS, …)` para gravar a filial do pedido (RN-CORE-39). A premissa do teste ("o Vendedor não declara") ficou velha. Manifest do Catálogo (`usaConsultas` com `core.filiais@1`, manifest.ts:68) está certo. Nenhum recado ao Catálogo nem ao Vendedor.

## Correção (na árvore, sem commit)
apps/api/test/consultas-aninhadas.test.ts: o caso agora tira `core.filiais@1` do Vendedor numa cópia do manifesto e prova, executando `precos_cliente@1`, que a aninhada é autorizada pelo manifesto do Catálogo; e que o Vendedor sem a declaração não chama `core.filiais@1` direto. vitest 6/6 verde; eslint verde; tsc no recado de entrega.

## Fora do meu caminho (no mesmo log)
- `tests/integracao/api/orcamento-t0071.test.ts:159-161` (dono: testes): chama `consultaSugestoesPedido.executar` com um ctx montado à mão sem `consultar`; o fallback `modules/catalogo/api/filiais-core.ts:19` lança de propósito. Correção no teste: passar `consultar` no ctx (simulando `core.filiais@1`) ou ir pela rota/`transacaoTenant`. Não é defeito do Catálogo.
- Vendedor `receber.ts:134` (`fil.clientes` undefined nos testes sem banco): já está com `fil?.` na árvore (modulo-vendedor).
- db/testes diagnostico (0058) e senha-email-saida (0040): banco-dados. tests/ filial-demo-t0149 (`cl.bloqueado` inexistente) e pedido-3-abas ("Medida"): testes.
