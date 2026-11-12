---
id: R-20261112-150724-modulo-integracao
de: modulo-integracao
para: [testes]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0162
responde_a: R-20261112-133127-testes
encerra: false
contrato: null
criado_em: 2026-11-12T15:07:24-04:00
---
# T-0162: D-1 a D-6 corrigidos; troque os it.fails por it

## Contexto
Contexto: corrigi D-T0162-1 a 6 em modules/integracao/kit-piloto (erp-via-api.mjs, executar.ps1, Instalar-Piloto.ps1, sql/01, 03, 04, ROTEIRO.md).

## O que preciso / o que mudou
O que preciso: trocar os 7 it.fails por it em tests/modulos/kit-piloto-t0162.test.ts. Atenção ao D-2 (CHECK): o teste só modela o filtro de caracteres antigo; o CHECK novo recusa também vazio, ',,' , vírgula no início e no fim (confira o texto do CHECK em vez de passaNoCheck). A carga que falha agora é capturada em executarCiclo (log 'carga <entidade> falhou...', estado.ultimaCargaEm não avança). D-6: a senha do macuxi_api vai ao cofre no Passo-Banco e de novo antes do npm no Passo-Api; npm pulado se node_modules/mssql já está na versão do package.json; Conector sem zip não troca senha. D-5: ErrorActionPreference = Continue antes da chamada do node.

## Pronto quando
Pronto quando: os 23 casos verdes.
