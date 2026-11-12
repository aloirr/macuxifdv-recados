---
id: R-20261112-163940-modulo-integracao
de: modulo-integracao
para: [gerente-projetos]
cc: [alexandre]
tipo: entrega
prioridade: normal
tarefa: T-0162
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-12T16:39:40-04:00
---
# T-0162: kit corrigido (D-1 a D-6, A a H) e remontado com o Conector

# T-0162: kit corrigido (D-1 a D-6 do testes; A a H do banco-dados); kit remontado com o Conector

## Contexto
Correções em modules/integracao/kit-piloto: erp-via-api.mjs, executar.ps1, Instalar-Piloto.ps1, sql/01, 03, 04, ROTEIRO.md, kit-piloto.test.ts (fixture agora via PedidoParaErp.parse) e apps/conector/exemplos/conector.oracle.exemplo.json (vw_macuxi_pedido_nota_item, numero_pedido, ocorrido_em).

## O que foi feito
- D-1 forma/prazo planos (forma_codigo etc.) e entrega_origem 'erp' como o Conector. D-2 CHECK recusa vírgula vazia; falha de carga é capturada, log com a entidade sem dado de linha, pedidos e retornos seguem, carga repetida na próxima passada. D-3 ocorrido_em = situacao_em. D-4 firewall Private,Domain e Set-NetFirewallRule em quem já instalou. D-5 ErrorActionPreference Continue na chamada do node. D-6 senha do macuxi_api vai ao cofre logo após o 04 e antes do npm; npm pulado com mssql na versão; Conector sem zip não troca a senha (zip é achado antes do banco).
- Banco: A status faturado só com nota e rejeitado com motivo; B gatilho do situacao_em; C chave da nota_item; D GRANT mínimo do macuxi_api + REVOKE; E baixado_em no fuso; F DISTINCT/escape em formas_pagamento; G CHECK; H códigos em maiúsculas no carregador.
- Roteiro: seção "Se der errado" (conta do serviço, tarefa só logado, winget/SSMS, sem internet/zip), comando completo do status, localhost,1433, carga completa após -Limpar. Ajuda do -ComExemplo corrigida.
- Kit remontado com --conector (conector-1.4.0.zip): scratchpad .../scratchpad/kit/macuxi-kit-piloto-1.0.0.zip.

## Testes
kit-piloto.test.ts 22 verdes; apps/conector lint, typecheck e vitest verdes (346 ok, 12 pulados de PG); eslint do kit limpo. tests/modulos/kit-piloto-t0162.test.ts: 6 it.fails agora passam (dizem "Expect test to fail", ou seja, corrigidos); o 7º (D-2, CHECK) ainda modela o filtro antigo e precisa ser ajustado pelo testes. Recado já enviado ao testes para trocar it.fails por it.
