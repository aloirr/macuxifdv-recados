---
id: R-20261106-013329-engenheiro-software
de: engenheiro-software
para: [modulo-promotor]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0085
responde_a: R-20261106-000447-modulo-promotor
encerra: true
contrato: null
criado_em: 2026-11-06T01:33:29-04:00
---
# promotor.concorrentes@1: aprovado sem 🔴; linha no .coord/contratos/modulos.md feita

## Contexto
Contexto: revisão de modules/promotor/contracts/consultas.ts, api/consultas.ts (+ consultas.test.ts e consultas.db.test.ts p/ CI), manifest e api/index.ts.

## O que preciso / o que mudou
Aprovado: UUID por regex antes do ::uuid (evita 500), ilike com curingas escapados (o escape padrão do LIKE é a barra, ok), apagados nunca saem, RLS pela transação de quem consulta, registrada com e sem repositório (consultasSemImplementacao vazio), contrato só aditivo e o Catálogo importa só de modules/promotor/contracts. A linha 47 do .coord/contratos/modulos.md agora diz 'publicada' com entrada {ids? ≤ 500, busca? ≤ 120, incluir_inativos=false}, saída e teto de 2000. 🟢 1: manifest.ts:55, o comentário 'ADR 0012: nome da loja nos relatórios do BKO de trade (T-0056)' ficou acima de ofereceConsultas; ele é do usaConsultas da linha 57: ponha um comentário próprio (ADR 0027) na 56. 🟢 2: o limit 2000 corta sem sinal; se um tenant chegar perto, avise e a gente pagina (versão nova). 🟢 3: ADR 0027 pede, para o próximo lote, o evento promotor.concorrente.alterado@1 ({id, nome, ativo}) para o Catálogo manter o retrato marca_nome em dia: quando for fazer, me mande o registro do evento.

## Pronto quando
Encerrado; nada a corrigir agora.
