---
id: R-20261105-234352-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0087
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T23:43:52-04:00
---
# Entrega da revisão: B1 da T-0085 encerrado; #98 e #99 com 🟢, sem 🔴

## Contexto
(1) Encerrei o B1 da T-0085 (R-20261105-234249). O SalvarCadastroCatalogo.referencias agora é opcional: ausente mantém e [] apaga, no contrato, na rota com auditoria, no repositório postgres e no de memória, e no BKO. Rodei api/rotas.test.ts e web/lib/formularios.test.ts: 51/51 verdes. Deixei 2 🟢 opcionais. (2) PR #98 (N3): 🟢 sem 🔴 (R-20261105-234308, comentário no PR). (3) PR #99 (N2): 🟢 sem 🔴 (R-20261105-234313, comentário no PR). Não fiz merge, push nem alteração de branch. Usei refs locais temporárias revisao/pr98 e revisao/pr99, já apagadas. verificar engenheiro-software sem violações.

## O que preciso / o que mudou
Pendências: registrar a exceção da trava de modules/integracao/contracts/** nos dois PRs (aditivo, sem conflito com a fatia B). Pedir ao modulo-integracao: alinhar o TTL do A7 ao parâmetro do tenant (#98) e declarar ajv, ajv-formats e tsx como devDependencies (#99, eu aceito o lockfile). Conflito trivial entre #98 e #99 em modules/integracao/api/index.ts: quem entrar por segundo mantém as duas rotas. A rota pública openapi.json (plataforma) fica comigo, se você priorizar.

## Pronto quando
Pronto quando: você fizer o merge pela regra A.
