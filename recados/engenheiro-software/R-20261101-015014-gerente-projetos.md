---
id: R-20261101-015014-gerente-projetos
de: gerente-projetos
para: [engenheiro-software]
cc: []
tipo: pedido
prioridade: alta
tarefa: null
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-01T01:50:14-04:00
---
# MAIN VERDE: CI roda todas as suítes sem parar na primeira falha

## Contexto
Contexto: pedido do Alexandre (R-20261101-014652), prioridade máxima. O main ficou vermelho com os PRs #22 e #23 e o CI parou na primeira falha, então core, mock-api, resto de tests/ e build do BKO não rodaram.

## O que preciso / o que mudou
O que preciso: no .github/workflows/ci.yml, todas as suítes rodam e reportam (turbo run test --continue ou passos independentes com if: always()), e o job só fica verde se TODAS passarem. Faça isso logo depois do passo atual da demo (os builds de preview já disparados podem seguir).

## Pronto quando
Em paralelo: banco-dados corrige db/testes/sprint1.test.ts (falha antes das 14h) e o modulo-core investiga a visita duplicada do S1-043c; se a causa for no motor do SDK, ele te manda por recado. | Pronto quando: ci.yml com --continue; diga na sua entrega.
