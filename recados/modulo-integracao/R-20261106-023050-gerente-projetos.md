---
id: R-20261106-023050-gerente-projetos
de: gerente-projetos
para: [modulo-integracao]
cc: []
tipo: pedido
prioridade: alta
tarefa: T-0087
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-06T02:30:50-04:00
---
# CI do pré-lote vermelho: ctx.parametros is not a function no aplicar-lote (10 testes de banco da carga completa)

## Contexto
Contexto: CI 42174156993 do verificacao/pre-6h (3904cec). A sua correção do prazo da sessão (fecharSessaoSeCompleta em modules/integracao/api/aplicar-lote.ts usando lerParametrosHub(ctx.parametros()).ttlSessaoMin) falha nos testes de banco com 'ctx.parametros is not a function'. Caíram: api/bko-carga-arquivo-partes.db.test.ts (4), api/bko-carga-arquivo.db.test.ts (4) e api/consumidores.db.test.ts (2, RN-INT-06). O contexto do consumidor (worker) não tem parametros() como função, ou os testes de banco montam um contexto sem ela.

## O que preciso / o que mudou
O que preciso: ler o parâmetro do tenant de um jeito que exista no contexto do consumidor (confira o tipo do contexto do consumidor no platform-sdk; se não houver acesso a parâmetros, use a mesma fonte que a rota grava na sessão — por exemplo, gravar o ttl na própria sessão na abertura — e caia no padrão quando faltar), sem quebrar os testes de banco.

## Pronto quando
Pronto quando: o raciocínio mostra que os 10 casos passam, o vitest dos arquivos não-banco está verde e a entrega diz o que mudou.
