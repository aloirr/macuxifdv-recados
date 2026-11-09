---
id: R-20261031-154128-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0015
responde_a: null
encerra: false
contrato: null
criado_em: 2026-10-31T15:41:28-04:00
---
# T-0015 entregue do lado da plataforma (O-3 e D-1); falta 1 linha do modulo-vendedor e a troca dos it.fails pelo testes

## Contexto
FEITO. (1) O-3: nomes.ts ganhou ehAcaoDeLeituraDePedido, ehAcaoDeEscritaDePedido (o único verbo de leitura é 'ver'), ACAO_VER_PEDIDO e ehEntidadeDePedido. manifesto.ts e permissoes.ts só vetam ao promotor a ESCRITA de pedido. api.ts ganhou promotorBarradoNaRota e recusa pedido.ver fora de GET. createApp: o promotor passa só em GET com acao pedido.ver; aí decidem o perfis do manifesto (ADR 0004) e a carteira. O pull de pedido* pelo promotor exige pedido.ver (sem ela, 403). (2) D-1: rejeitarItensInvalidos (sdk sync.ts) acha o dono pelo manifesto (registro.dono). Ordem: dono inativo → MODULO_INATIVO; promotor + pedido* → RN-PRO-01; depois ENTIDADE_DESCONHECIDA. (3) apps/api/test/core.test.ts só aceita 401 e ganhou bloco O-3 com Postgres: carteira 200, fora 404, escrita 403, push RN-PRO-01, sem Vendedor 403/MODULO_INATIVO. (4) Testes novos em sdk api/permissoes/sync.test, apps/api/test/app.test e sync.test; o espelho manifestos-referencia.test ganhou pedido.ver com o promotor; desenho T-0004 §3/§5 atualizado. (5) Revisão do guardião v2 sem 🔴 (R-20261031-152949 ao Alexandre, que pode religar o PostToolUse).

## O que preciso / o que mudou
PENDÊNCIAS. (a) modulo-vendedor: pôr 'promotor' em pedido.ver (modules/vendedor/manifest.ts:21). Até lá, 2 testes do bloco O-3 em apps/api/test/core.test.ts ficam vermelhos de propósito (já avisei: R-20261031-152744 e R-20261031-153513). Também um 🟡 em rotaListarPedidos: filtra a carteira depois do limit. (b) testes: trocar o it.fails D-1 (tests/integracao/api/licencas.test.ts, já vermelho, sinal da correção) e ajustar promotor-pedido.test.ts, promotor-sem-pedido.test.ts e S0-063/064 quando o manifesto mudar (R-20261031-153111 e 153117). (c) D-2 fica na T-0018 (R-20261031-153122). (d) Os pedidos do Alexandre (Node >= 24.7 no engines e no CI; verificar --por-commit no CI) estão na minha caixa, fora da T-0015: abra uma tarefa.

## Pronto quando
ESTADO. typecheck e lint da raiz verdes (18/18). Nos testes da raiz, os únicos vermelhos são os 2 do core.test (falta o manifesto) e o it.fails D-1 (falta o testes trocar). sdk 101/101; verificar engenheiro-software sem violação. Premissas: o push segue HTTP 200 com rejeitado/MODULO_INATIVO por item (lote misto, desenho §5), não 403 no lote; o único verbo de leitura é 'ver'.
