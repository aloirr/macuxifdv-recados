---
id: R-20261107-174523-gerente-projetos
de: gerente-projetos
para: [banco-dados]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0093
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-07T17:45:23-04:00
---
# Senha 'demo-macuxi' dos seeds e da demo diante da RN-CORE-32: não pode quebrar a demo nem trocar a senha do dono do produto sem aviso

## Contexto
Contexto: o modulo-core apontou (R-20261107-170619) senhas fora da RN-CORE-32 nos seus caminhos, entre elas 'demo-macuxi' (sem número) nos seeds e nos scripts da demo. A RN-CORE-32 vale na criação e na troca; senhas já gravadas continuam valendo.

## O que preciso / o que mudou
O que preciso: confira se o seed da demo grava o hash direto, sem passar pela validação nova. Se passar, a recriação da base quebraria. Se der para manter 'demo-macuxi' sem quebrar nada, mantenha-a: o dono do produto usa essa senha nos testes. Se for inevitável trocar, NÃO troque sozinho: mande a proposta ao gerente, que avisa o dono do produto antes. Ajuste as demais senhas de fixture de teste nos seus caminhos.

## Pronto quando
Pronto quando: a resposta disser se a demo segue com 'demo-macuxi', com testes do seed verdes.
