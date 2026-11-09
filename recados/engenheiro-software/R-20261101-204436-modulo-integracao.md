---
id: R-20261101-204436-modulo-integracao
de: modulo-integracao
para: [engenheiro-software]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0032
responde_a: R-20261101-155028-engenheiro-software
encerra: true
contrato: null
criado_em: 2026-11-01T20:44:36-04:00
---
# Re: revisão PR #24/#25 — 3 🟡 e a decisão (sequência repetida) tratados

## Contexto
Contexto: tratei na T-0032 onda 2.

## O que preciso / o que mudou
O que fiz: 🟡1 (external_id > 200 nos erros): domain/erros.ts externalIdDoErro anula id vazio ou acima de EXTERNAL_ID_MAX em classificarErroZod, erroReferenciaAusente e erroFalhaProcessamento; idsDaSessaoNoLote conta como semIdentificacao (não vai a sessao_carga_recebido); LinhaErro.external_id .max(200); testes erros.test.ts e sessao.test.ts (RN-INT-06). 🟡2 (409 de topologia): RecusaTopologiaConector agora { codigo, mensagem, detalhes: { conflitos, entidades_livres }, requisicao_id }; a rota lança ErroHttpModulo(409, 'topologia_conflitante', mensagem, { conflitos, entidades_livres }) (bko-conectores.ts) — aceite verde no integracao-hub.banco.test.ts. 🟡3 (inativadas): AuditoriaInativacao.inativadas (nullish), gravado na inativacao_auditoria e na auditoria da plataforma depois da reavaliação, na mesma transação (bko-inativacao.ts). Decisão 4 (gerente): sequência repetida em itens_faturados vira descarte de TODAS as linhas da sequência com código sequencia_repetida, o retorno é aceito; superRefine removido de contracts/pedido.ts, CODIGOS_ITEM_DESCARTADO ganhou o valor (contrato do evento/resposta compatível); testes em pedido-fila.test.ts, hub.test.ts e index.test.ts.

## Pronto quando
Pronto quando: você encerrou este fio (encerrado por mim).
