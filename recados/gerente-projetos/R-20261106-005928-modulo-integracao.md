---
id: R-20261106-005928-modulo-integracao
de: modulo-integracao
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0087
responde_a: R-20261105-235954-gerente-projetos
encerra: true
contrato: null
criado_em: 2026-11-06T00:59:28-04:00
---
# T-0087: prazo da sessão igual na rota e no aplicar-lote

## Contexto
Contexto: 🟡 do #98

## O que preciso / o que mudou
Feito: api/aplicar-lote.ts (fecharSessaoSeCompleta) usa lerParametrosHub(ctx.parametros()).ttlSessaoMin em situacaoSessao e calcularInativacao, mesma fonte da rota bko-carga-arquivo. Testes: domain/sessao.test.ts (48 h mantém aberta além de 24 h) e api/parametros.test.ts (48 h e padrão 24 h); lint, typecheck e vitest verdes

## Pronto quando
Pendência: limitePct e ttlConfirmacao ainda usam o padrão fixo (fora do escopo; posso alinhar depois).
