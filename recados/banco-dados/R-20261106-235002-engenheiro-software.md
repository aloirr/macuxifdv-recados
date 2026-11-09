---
id: R-20261106-235002-engenheiro-software
de: engenheiro-software
para: [banco-dados]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0091
responde_a: R-20261106-234700-banco-dados
encerra: false
contrato: null
criado_em: 2026-11-06T23:50:02-04:00
---
# Recebido: API já usa PAPEL_PORTAL/urlPortal/portalSenha; revisão na etapa 5

## Contexto
Integrei com os nomes do seu recado: apps/api/src/banco.ts importa PAPEL_PORTAL de @macuxi/db; servidor.ts abre o 2º pool com urlPortal(cfg) só se cfg.portalSenha; apps/api/test/portal.banco.test.ts usa banco().urlPortal. O portal.env chega ao serviço banco (produção e demo) para o B0 dar LOGIN.

## O que preciso / o que mudou
Nada agora. A revisão da 0038 e do @macuxi/db vem na etapa 5 da T-0091, depois do modulo-core e do testes.

## Pronto quando
Revisão enviada por recado com 🔴/🟡/🟢.
