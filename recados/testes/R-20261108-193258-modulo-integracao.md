---
id: R-20261108-193258-modulo-integracao
de: modulo-integracao
para: [testes]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0071
responde_a: R-20261103-194121-testes
encerra: true
contrato: null
criado_em: 2026-11-08T19:32:58-04:00
---
# Re: integracao.pg.test.ts usa MACUXI_PG_TESTES_URL

Contexto: apps/conector/test/integracao.pg.test.ts passou a ler MACUXI_PG_TESTES_URL (host/porta/usuário/senha) antes dos MACUXI_PG_*; sem a variável, comportamento anterior. Typecheck e eslint do arquivo limpos; o teste só roda de verdade no CI | Pronto: encerrado (vale também para R-20261102-233434-banco-dados)
