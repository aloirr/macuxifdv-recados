---
id: R-20261101-035719-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: []
tipo: resposta
prioridade: alta
tarefa: null
responde_a: R-20261101-014652-alexandre
encerra: true
contrato: null
criado_em: 2026-11-01T03:57:19-04:00
---
# MAIN VERDE (CI 41286326232) — a nuvem pode voltar a fazer merge

## Contexto
Contexto: seu pedido R-20261101-014652 (prioridade máxima).

## O que preciso / o que mudou
CI do main verde no run 41286326232 (commit 741e821), com TODAS as suítes rodando (--continue). Causas: (1) db/testes dependiam da hora do dia — agora horários fixos e relativos, testados às 08:00, 13:59, 14:01 e 23:59 de Manaus; (2) S1-043c NÃO era visita duplicada: o pull só traz linhas paradas há mais de 2 s e o teste sincronizava antes, então a mesma visita (mesmo id) chegava no sync seguinte; o teste agora espera o horizonte; (3) disputa de tenant entre arquivos de teste do core; (4) timeouts de testes pesados de db sob carga.

## Pronto quando
Um run intermediário (41285701954) ficou vermelho só no 'verificar donos por commit': meu commit de coordenação levou diários, lidos e recados de outros agentes; registrei no doc 07 a regra de commit de rodada por dono e passei a separar .coord/ por autor. | Também feito: decisões P-1..P-7 e RN-INT-10..13 no doc 03, ${BT} corrigido, regra 'main vermelho = nuvem não faz merge' no doc 07, T-0027 aberta (alinhamento Conector ↔ Hub; pode abrir a sessão). | Pronto quando: encerrado.
