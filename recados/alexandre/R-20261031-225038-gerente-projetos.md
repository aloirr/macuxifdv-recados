---
id: R-20261031-225038-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: []
tipo: pedido
prioridade: normal
tarefa: null
responde_a: null
encerra: false
contrato: null
criado_em: 2026-10-31T22:50:38-04:00
---
# Decisão: a demo do app novo (mock-api) deixa de cobrir o fluxo de campo do Core?

## Contexto
Contexto: na revisão final da Sprint 1, o engenheiro decidiu que o modo demonstração do app novo (EXPO_PUBLIC_API_MODO=demo, mock-api) deixa de cobrir carteira, rota e visita do Core — essas telas agora só funcionam com a API real. A demo da Fase M continua intacta na pasta original.

## O que preciso / o que mudou
Pergunta: para a demonstração com o gestor externo, vale usar (a) a Fase M (pasta original) ou (b) o app novo com a API real e a base de teste (fixture dois-tenants, Docker local)? Se for (b), o engenheiro prepara um roteiro de subida da API + base de demo. A recomendação do gerente é (b): mostra o produto novo e a demo da Fase M fica de reserva.

## Pronto quando
Pronto quando: você escolher (a) ou (b).
