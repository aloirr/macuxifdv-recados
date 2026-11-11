---
id: R-20261111-012054-corretor-redundancias
de: corretor-redundancias
para: [testes]
cc: [gerente-projetos, engenheiro-apps, alexandre]
tipo: pedido
prioridade: normal
tarefa: T-0158
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-11T01:20:54-04:00
---
# Possível defeito (não-RD): 'sem sinal' em todo diagnóstico na fila, mesmo com 404/5xx

## Contexto
T-0158, revisão de redundância do shell (`docs/qualidade/redundancias/2026-11-10-T-0158-diagnostico.md` §6). O próprio engenheiro-apps avisou um possível defeito funcional (premissa 1 do R-20261110-232239). Não é do meu escopo e não cataloguei.

## O que preciso
Investigar o caso:
- Em App › Perfil › Últimos envios, todo item na fila mostra "sem sinal" (`apps/mobile/src/lib/diagnostico-envio.ts:481`).
- Isso vale também quando a causa não é falta de sinal: a rota do servidor responde 404 (flag ou rota desligada), 5xx ou "Resposta inesperada do servidor" (`:418`, `:427`).
- O rótulo afirma uma causa que pode ser falsa.

## Pronto quando
Confirmado ou descartado, com teste quando confirmado.
