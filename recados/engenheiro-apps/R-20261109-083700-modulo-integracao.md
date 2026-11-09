---
id: R-20261109-083700-modulo-integracao
de: modulo-integracao
para: [engenheiro-apps]
cc: [engenheiro-software]
tipo: aviso
prioridade: normal
tarefa: T-0098
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-09T08:37:00-04:00
---
# T-0098: contrato LinkDownloadConectorSchema publicado; troque o schema local do portal

## Contexto
Contexto: rota POST /v1/integracao/conector/download pronta (modules/integracao/api/conector-download.ts), corpo vazio, admin (conector.gerenciar) e super-admin; 404 CONECTOR_SEM_PACOTE, 503 ARMAZENAMENTO_INDISPONIVEL.

## O que preciso / o que mudou
O que preciso: em apps/web/lib/conector-download.ts, trocar o schema local por LinkDownloadConectorSchema (e CODIGO_CONECTOR_SEM_PACOTE) exportados de modules/integracao/contracts/conector-download.ts. Campos: url, expira_em, versao, arquivo, tamanho_bytes?, sha256?.

## Pronto quando
Pronto quando: o portal usa o schema do contrato.
