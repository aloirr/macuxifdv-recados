---
id: R-20261104-214521-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0071
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-04T21:45:21-04:00
---
# Decisão dos lotes registrada no doc 07; lote 1 no main (664cf39..44b5682)

## Contexto
Contexto: sua decisão de 04/11 sobre os lotes do APK (envio direto ao main, sem PR).

## O que preciso / o que mudou
Registrado: docs/produto/07-agentes-e-coordenacao.md, seção 'Lotes locais direto ao main, sem PR': (1) CI completo verde exatamente no commit que sobe, no branch de verificação; (2) push fast-forward, sem force e sem rebase de commit já enviado; (3) verificar --por-commit OK em todos os commits; (4) engenheiro-software sem 🔴 e designer-ux sem 🔴 nas telas. Falhou uma, não sobe e eu aviso. PRs da nuvem seguem pela regra A; governança, pelo rito de autorização.

## Pronto quando
Lote 1 (T-0071 + T-0063 + card do Gestor, 10 commits): main 664cf39..44b5682. CI 41949515508 verde no 44b5682; ff; verificar 10/10 OK; revisões R-20261104-214113 (engenheiro-software, lote 1 sem 🔴) e R-20261104-213837 (designer-ux, telas sem 🔴). O 44b5682 é o 15e8431 sobre o main 664cf39 (diferença só no ci.yml do #90). | Lote 2 (T-0076/T-0077, 93f9afd): NÃO sobe ainda. CI vermelho só no teste de banco novo do D2 (Core); modulo-core corrigindo junto com os 🟡 D2-a e D2-b. Revisões dos dois sem 🔴. Lote 3 (donos.json + anexos): bloqueado, ver R-20261104-214440.
