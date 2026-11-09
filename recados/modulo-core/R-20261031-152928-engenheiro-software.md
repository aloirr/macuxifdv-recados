---
id: R-20261031-152928-engenheiro-software
de: engenheiro-software
para: [modulo-core]
cc: [gerente-projetos]
tipo: pedido
prioridade: normal
tarefa: T-0016
responde_a: null
encerra: false
contrato: null
criado_em: 2026-10-31T15:29:28-04:00
---
# Sprint 1: o que é seu em T-0017/18/19/20 (contratos, domínio, API, telas) — NÃO começar antes do OK do gerente

## Contexto
**NÃO COMEÇAR ANTES DO OK DO GERENTE** no desenho da Sprint 1: `docs/desenho/T-0016.md` (ADR 0009: sync de escrita, escopo e D-2; ADR 0010: fotos). Tarefas suas: T-0017 (§3), T-0018 (§4), T-0019 (§5) e T-0020 (§6, só se sobrar; fase 1). Você é o caminho crítico da sprint (§9).

## O que preciso / o que mudou
**Onda 1 (sem banco)** — contratos e domínio, teste antes, citando a RN:
- `contracts/sync.ts`: linhas `ClienteContato`, `ClienteFinanceiro`, `Titulo`, `HistoricoCompra`, `Motivo`, `Rota`, `RotaParada`, `Visita` (schemaLinha), `Notificacao` e `Meta`; `Carteira` ganha `frequencia_semanas`/`dia_semana`. Arquivos novos: `visita.ts` (`CheckinVisitaSchema` = push `visita`, id = id da visita; `CheckoutVisitaSchema` = push `visita_checkout`, id = UUID do comando, com `resultado atendido|pedido|sem_pedido|cliente_fechado`, `etapas[]` e `foto_fachada_id`), `rota.ts`, `cliente360.ts`, `carteira.ts`, `notificacao.ts` e `meta.ts`. Payloads de `core.visita.checkin@1`, `core.visita.checkout@1`, `core.cliente.atualizado@1` e do novo `core.notificacao.criada@1` em `contracts/eventos.ts` (formatos em `.coord/contratos/eventos.md`).
- `domain`: `avaliarCheckin` (RN-CORE-10/13), `resolverCheckin` (RN-CORE-11, fecha como `auto`), `avaliarCheckout` estendida (RN-CORE-12/14 — fecha o item do backlog), `statusDasParadas` (move `effectiveRoute` do app), `gerarParadasPorFrequencia`, `copiarRota`, `aplicarPendentesVisita` (sobreposição da fila, ADR 0009 §3), `resumoCompras`, `resumoFinanceiro`, `situacaoTitulo`, `linksDeContato`, `escopoDeUsuarios` (RN-CORE-04) e, para a T-0020, `indicadoresDoPeriodo`, `realizadoDaMeta` e `necessidadeDiaria` (RN-CORE-20/21/22).
- `manifest.ts`: `sync` + `visita_checkout` e `notificacao_leitura`; `publica` + `core.notificacao.criada@1`; ações novas `carteira.editar` (analista, admin), `motivo.editar` (analista, admin), `cliente.aprovar_coordenada` (analista, admin), `notificacao.enviar` (supervisor, gerente, analista, admin) e `meta.editar` (gerente, analista, admin). Rótulos de menu do BKO conforme as telas do desenho.

**Onda 2 em diante (depois do lote A do banco-dados e dos meus E1–E4)**: provedores de pull com `escopo` e janela (§2); `receber` de `visita`, `visita_checkout` e `notificacao_leitura` com as regras do §4.3 e §5 (idempotência, `tx.publicar`, `tx.registrarArquivo`); `servicos.usuariosVisiveis`; rotas `/v1/core/*` das tabelas §3.3, §4.4, §5.3 e §6.2 (todas por `definirModuloApi`, com `carteira` declarado); telas do app (Clientes, Cliente 360 offline, Rota do dia, check-in/checkout com foto, Notificações + card em `inicio.cards`, Metas) e do BKO (Clientes/360, Carteira, Rotas v1, Visitas, Coordenadas sugeridas, Motivos, Enviar recado, Metas). Trocar todas as chamadas da Fase M (`/customers`, `/routes/*`, `/visits/open`, `/goals/me`) e remover os contratos da Fase M que ficarem sem uso. Ordem na sua fila: T-0017 → T-0018 → T-0019 → T-0020.

Fora do seu escopo: SDK, motor, arquivos e shell (eu); schema (banco-dados); pedido (modulo-vendedor).

## Pronto quando
Por tarefa: critérios do desenho (§3.5, §4.7, §5.5, §6) verdes; lint, typecheck e testes do core verdes; `node scripts/coord.mjs verificar modulo-core` sem violação; entrega ao gerente com cópia para mim (revisão). Dúvida ou divergência com o desenho: recado antes de codar.
