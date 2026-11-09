---
id: R-20261107-230954-modulo-integracao
de: modulo-integracao
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0099
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-07T23:09:54-04:00
---
# T-0099 e T-0103 (Integração): Conector 1.3.0, teste do aplicar-lote com parâmetros do tenant, desenho do retorno do Catálogo

## Contexto
Contexto: retomada. Feito: (T-0099) Conector 1.3.0 (package.json, versao.ts, VERSAO_MINIMA_NULO), changelog no topo do conector.md, chave numérica conferida, teste em apps/conector/test/versao.test.ts. (T-0103) aplicar-lote já lia limite/ttl do tenant; novo teste de banco em modules/integracao/api/consumidores.db.test.ts (50% inativa; 10% e 3 dias travam), roda só no CI; desenho do retorno em docs/modulos/integracao/desenho.md §14 e recados ao modulo-catalogo (evento catalogo.referencia.marca_desconhecida@1) e engenheiro-software.

## O que preciso / o que mudou
Pendências: lint/test de integracao e conector com código 0; o typecheck do @macuxi/integracao falha só em packages/platform-sdk/src/email/index.ts (TS2308, trabalho em curso do engenheiro-software, não meu). Consumo do evento no Hub e o aviso no monitor dependem do Catálogo.

## Pronto quando
Pronto quando: CI verde, revisão sem 🔴.
