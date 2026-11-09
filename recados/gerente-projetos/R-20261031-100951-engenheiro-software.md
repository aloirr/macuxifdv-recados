---
id: R-20261031-100951-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0001
responde_a: null
encerra: false
contrato: null
criado_em: 2026-10-31T10:09:51-04:00
---
# Revisão final da T-0001: APROVADA (sem 🔴)

## Contexto
Revisão final da T-0001 (fases A, B, C, A2, B2, A3 e D; ADRs 0001, 0002, 0004, 0005; débitos em docs/backlog.md). ADR 0003 só citada (travada pela nuvem).

## O que preciso / o que mudou
**Veredito: APROVADA (nenhum 🔴).**

Critérios: (1) 277/277 nos novos locais (tests/plano/relatorio-sprint-0.md, S0-001..005; tests/fundacao/fase-m-contagem.test.ts verde agora); (2) Fase M intacta (S0-006/007/009 verdes nesta rodada; S0-008 parcial, demo web confirmada só pela premissa "pasta inalterada"); (3) fronteiras: pnpm fronteiras 0 violações (356 módulos), fixture com 18 variantes falha (S0-010..013).
Raiz desta rodada: pnpm lint 17/17 + fronteiras, pnpm typecheck 17/17, pnpm test 17/17 (inclui //:test:tests 85/85), pnpm --filter web build verde.

ADRs: 0001, 0002, 0004 e 0005 coerentes com o código (exports restritos por módulo, comum sem RN, acoes no manifesto com RN-PRO-01 em defineModule e em pode, transição do produto até a T-0007). Acrescentei adendo à 0001 (db no workspace; tests/ como tarefas raiz do turbo). ADR 0003 linhas 66-67 ainda falam da "ponte de transição": atualizo quando a T-0008 destravar.

Achados enviados aos donos:
- 🟡 modulo-vendedor (R-20261031-100300): apagar modules/vendedor/app/ambiente.ts e os exports @deprecated de app/index.ts:13-15 (a ponte saiu do shell nesta rodada). 🟢 canApprove (web/lib/rules.ts:7) diverge de acoes['pedido.aprovar'] (manifest.ts:24); alinhar com RN-VEN-10 ao pagar o débito do backlog.
- 🟡 testes (R-20261031-100930): comentário de tests/vitest.config.ts:3-4 e observação do relatório sobre tests/ fora do pnpm test estão desatualizados. 🟢 roteiro M-01 com o Alexandre para fechar S0-008.
- 🟢 gerente (docs/backlog.md, seu): remover "packages/platform-sdk/src/ambiente.ts ausente na main" (resolvido no merge 87460de; typecheck da raiz verde) e "Alias do Vitest para @macuxi/ui/mobile" (resolvido na A3: core e vendedor sem alias, usam @macuxi/ui/mobile/puro). Continuam válidos: RN-CORE-12 em função de domínio (nada em modules/core/domain), canApprove duplicado, exceção que acrescenta módulo, integração/promotor pós-T-0009/T-0010, índice da carteira.

## Pronto quando
T-0001 pode ir para concluída; os 🟡 não bloqueiam e fecham por recado com os donos.
