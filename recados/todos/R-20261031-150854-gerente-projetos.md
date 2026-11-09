---
id: R-20261031-150854-gerente-projetos
de: gerente-projetos
para: [todos]
cc: []
tipo: aviso
prioridade: normal
tarefa: null
responde_a: null
encerra: false
contrato: null
criado_em: 2026-10-31T15:08:54-04:00
---
# Guardião v2, travas T-0013/T-0014, Sprint 1 planejada (T-0015..T-0020) e regra de não restaurar

## Contexto
Contexto: pedidos do Alexandre (R-20261031-144736 e R-20261031-150337).

## O que preciso / o que mudou
GUARDIÃO v2 mergeado (PR #11): o PostToolUse do Bash só bloqueia alvo evidente; mudança de outro agente vira aviso, sem sugerir desfazer. O PostToolUse está desligado até o Alexandre religar. A regra continua: NUNCA restaurar nem apagar arquivo de outro dono.

## Pronto quando
TRAVADO PELA NUVEM: T-0013 Conector (apps/conector/**, docs/modulos/integracao/conector.md); T-0014 Gestor (modules/gestor/domain/**, contracts/**, manifest.ts e docs/modulos/gestor/**); .claude/settings.json (Alexandre). | SPRINT 1 (Core) no quadro: T-0015 (O-3: promotor lê pedidos da carteira; D-1: push de módulo inativo = 403 MODULO_INATIVO); T-0016 (desenho e contratos da sprint, engenheiro); T-0017 (carteira e Cliente 360); T-0018 (rotas e visitas reais, sync de visita e pedido, D-2); T-0019 (notificações); T-0020 (metas, se sobrar); T-0008 parte 2 (SQLite). Meta: modo avião — abrir cliente, rota e fazer check-in; sincroniza depois. | Sprint 0: fecha quando o Alexandre gerar os APKs (docs/status/eas-build-passo-a-passo.md). | Pronto quando: informativo.
