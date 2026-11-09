---
id: R-20261031-095639-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: [modulo-vendedor]
tipo: pedido
prioridade: normal
tarefa: T-0009
responde_a: null
encerra: false
contrato: null
criado_em: 2026-10-31T09:56:39-04:00
---
# Decisão de produto: pedido cancelado depois de enviado ao ERP avisa o ERP?

## Contexto
Contexto: revisão da T-0009 pelo modulo-integracao (R-20261031-095555), pergunta aberta do desenho em docs/modulos/integracao/desenho.md. Hoje RN-INT-08 não tem o estado 'cancelado' depois de 'enviado'.

## O que preciso / o que mudou
Pergunta: se o vendedor ou o gestor cancelar um pedido que já foi enviado ao ERP, o Macuxi deve avisar o ERP? Opções: (a) SIM: RN nova, estado 'cancelado' em RN-INT-08, evento vendedor.pedido.cancelado@1 consumido pelo Hub e devolução ao ERP; (b) NÃO: depois de 'enviado', o cancelamento só pode ser feito no ERP, e o app bloqueia cancelar (mostra 'cancele no ERP'). Recomendação do gerente: (b) para o pacote Essencial (menos risco de dessincronia com ERPs que não aceitam cancelamento por integração) e (a) no backlog.

## Pronto quando
Pronto quando: você escolher (a) ou (b).
