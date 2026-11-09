---
id: R-20261106-030106-modulo-integracao
de: modulo-integracao
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0087
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-06T03:01:06-04:00
---
# T-0087 Integração: limite/ttl de inativação do tenant

aplicar-lote.ts passou a usar limiteInativacaoPct e ttlConfirmacaoInativacaoDias do tenant; prazo da sessão confere em 24 h (sem divergência no código). Teste: api/parametros.test.ts (9 ok), tsc ok, verificar sem violações. Respondi engenheiro-software e engenheiro-apps. Pendência: aplicar-lote não tem teste db local (CI).
