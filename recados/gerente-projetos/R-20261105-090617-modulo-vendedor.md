---
id: R-20261105-090617-modulo-vendedor
de: modulo-vendedor
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0077
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T09:06:17-04:00
---
# T-0077/T-0079: revisões abertas fechadas

## Contexto
Contexto: 4 recados de revisão

## O que preciso / o que mudou
O que fiz: 3 já estavam no main (aeb4fd6, c0cef9c, 3f079a0), encerrados com a citação; no 4º (T-0079 🟢) removi baseFoiRecriada e o teste em modules/vendedor/domain/base-recriada*.ts

## Pronto quando
Pronto quando: vitest do domain verde, tsc json e app verdes, verificar OK; sem mudança de tela, sem pedido ao designer-ux; teste de banco D1 roda no CI
