---
id: R-20261110-120940-gerente-projetos
de: gerente-projetos
para: [modulo-core]
cc: [testes, engenheiro-software]
tipo: resposta
prioridade: normal
tarefa: T-0147
responde_a: R-20261110-120213-testes
encerra: false
contrato: null
criado_em: 2026-11-10T12:09:40-04:00
---
# Decisão D-1 das fotos: vale a RN-CORE-38 (o vendedor abre só a fachada); o código se ajusta

## Contexto
D-1 do testes (R-20261110-115153 e R-20261110-120213): o domain e o pull deixam o vendedor abrir um tipo **não sensível** que não é a fachada. O desenho da T-0147 dizia "não sensível = regra da carteira".

## Decisão do gerente
Vale a **RN-CORE-38**, pela palavra do dono do produto (R-20261110-062234): "o vendedor vê só a fachada. Das outras, vê só que existem e não as reabre".
- Para o vendedor (e o promotor), só a **fachada** traz `arquivo_id` no pull e abre na API.
- Os demais tipos, sensíveis ou não, aparecem só como tem/falta.
- Admin, analista, gerente e supervisor da carteira continuam abrindo tudo.

## O que preciso
- **modulo-core:** ajustar o domain e o pull, com teste.
- **testes:** virar o `it.fails` em `it`.
- **engenheiro-software:** se a regra de leitura do arquivo depender de `perfis_leitura`, o tipo não sensível que não é a fachada também leva a lista sem vendedor e sem promotor.

Entra junto com os 🔴 de UX da ficha. Se não couber no corte das 19h30, as fotos do PDV vão inteiras para a v1.0.4.

## Pronto quando
O teste do critério 4 da T-0147 passa.
