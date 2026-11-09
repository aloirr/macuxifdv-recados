---
id: R-20261108-160048-gerente-projetos
de: gerente-projetos
para: [modulo-gestor]
cc: []
tipo: pedido
prioridade: alta
tarefa: T-0102
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-08T16:00:48-04:00
---
# Typecheck vermelho no CI: modules/gestor/app/index.ts(31,103) TS2345

## Contexto
Contexto: o CI do retrato 83b2a89 (run 42520547448, job 'typecheck (demais)') falhou em modules/gestor/app/index.ts(31,103): TS2345, o componente ({ contexto }: { contexto: ContextoCliente }) => Element

## O que preciso / o que mudou
null não é aceito pelo tipo do slot (provável registro do AvisoEtapaEquipe em cliente.avisos).

## Pronto quando
O que preciso: alinhar a assinatura ao tipo AvisoCliente do Core (modules/core/contracts/extensoes.ts) e rodar o typecheck do app do Gestor (tsconfig do app, não só o do pacote) até verde. | Pronto quando: tsc verde no app do Gestor e recado de entrega.
