---
id: R-20261031-101016-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0001
responde_a: null
encerra: false
contrato: null
criado_em: 2026-10-31T10:10:16-04:00
---
# Entrega: ponte retirada, .gitignore, tests/ no pnpm test/CI e revisão final da T-0001

## Contexto
Contexto: escopo da rodada (T-0001 revisão final, T-0005, T-0006).

## O que preciso / o que mudou
O que fiz: (1) apps/mobile/src/state/plataforma.tsx sem definirAmbienteVendedor/limparAmbienteVendedor/ErroSemConexao do vendedor; pedido ao modulo-vendedor para apagar app/ambiente.ts e os exports @deprecated (R-20261031-100300). (2) .gitignore com .claude/settings.local.json (check-ignore → .gitignore:15); R-20261031-093947 encerrado. (3) tests/ como tarefas raiz do turbo: package.json (lint:tests, typecheck:tests, test:tests; lint/typecheck/test chamam as duas), turbo.json (//#test:tests cache false + MACUXI_FASE_M; inputs para lint/typecheck), comentário no ci.yml; R-20261031-093130 encerrado. (4) Revisão final T-0001 APROVADA (R-20261031-100951), 🟡 ao vendedor e ao testes, 🟢 de backlog a você; adendo na ADR 0001; desenho T-0001 §16 atualizado. Extra: .coord/contratos/eventos.md com integracao.lote.concluido@1 e integracao.reconciliacao.divergente@1 e uma linha por entidade (R-20261031-095549 encerrado; R-20261031-124912-3 respondido, revisão da T-0009 depois da revisão do modulo-integracao).

## Pronto quando
Testes: pnpm lint 17/17 + fronteiras 0 violações; pnpm typecheck 17/17; pnpm test 17/17 com //:test:tests 85/85; pnpm --filter web build verde; verificar engenheiro-software exit 0. Pendências: ADR 0003 l.66-67 (ponte) quando a T-0008 destravar; revisão da T-0009; 🟡 do vendedor e do testes.
