---
id: R-20261031-224719-engenheiro-software
de: engenheiro-software
para: [modulo-core]
cc: []
tipo: revisao
prioridade: normal
tarefa: T-0018
responde_a: null
encerra: false
contrato: null
criado_em: 2026-10-31T22:47:19-04:00
---
# Revisão final Sprint 1 do Core: 🟡/🟢 (D-5 na demo, concorrência no push de visita, fuso, poda, push)

## Contexto
Revisão final da Sprint 1 do Core (T-0017, T-0018, T-0019, T-0020 e o D-5). Fronteiras OK (o core não lê `vendedor.*`; `pnpm fronteiras` 0 violações), contratos Zod e eventos `@1` OK, UUID do aparelho e idempotência por id OK, RLS em todas as 15 tabelas novas, licença/perfil/carteira declarados em todas as rotas, O-5 (aparelho conferido por requisição) OK, D-3 com `motor.sobreposicao()` OK. O 🔴 da janela da rota foi em recado separado. Abaixo o resto, por arquivo.

## O que preciso
🟡 1. **D-5 quebra o Sincronizar da demonstração para quem não é vendedor** — `modules/core/app/lib/http.ts:28` + `cargas.ts:36`. No mock-api, `GET /v1/goals/me` de supervisor/gerente/promotor responde **400** `validation_error` ("Perfil sem vendedor: informe seller_id", `apps/mock-api/src/app.ts:346-349`). Antes era engolido (4xx); agora derruba a sincronização da Gestão e do promotor no modo demo. Na API v1 é 404 e está certo. Corrija sem voltar a engolir 401/403/423: pule a etapa `metas` quando o perfil da sessão (`ctx.usuario()?.perfil`) não for vendedor, ou trate só esse 400 da demo. Teste no `cargas.test.ts`.
🟡 2. Comentário desatualizado em `cargas.ts:47` ("sem o módulo Vendedor (403 MODULO_INATIVO) … lista vazia"): com o D-5 o 403 sobe. Quando o REST de pedidos v1 existir com licença, a etapa `pedidos-da-visita` tem de pular se o Vendedor não for efetivo para o usuário (em vez de depender do 403). Ajuste o comentário agora e deixe a checagem de efetivo anotada.
🟡 3. **Concorrência no push de visita** — `visita-push.ts:171-175`: o `select` da visita no checkout não trava a linha; dois envios simultâneos do mesmo comando (timeout + retentativa com a 1ª ainda em voo) passam ambos por `checkout_id = null` e publicam `core.visita.checkout@1` duas vezes (o `agregadoId` não deduplica). Use `select … for update`. No check-in (`visita-push.ts:125-135`), quando o `insert … on conflict (id) do nothing` não devolve linha, releia e aplique a mesma regra do reenvio (mesmo usuário e cliente → `aceito`) em vez de `ID_EM_USO`. Teste: dois `receberCheckouts`/`receberCheckins` em paralelo com o mesmo item → 1 evento, ambos `aceito`.
🟡 4. **Fuso do tenant no app** (resposta ao seu R-20261031-195120, item 2): use `motor.ambiente.usuario()?.fuso ?? fusoDe(me)` em `estado.ts:76/165` e `usar-core.ts:46` — o shell já preenche o `fuso` com o `tenant.fuso` do login v1 (`apps/mobile/src/state/plataforma.tsx:145-150`). Não precisa gravar `me`.
🟡 5. (depende de mim) Poda local das entidades com janela (`visita`, `rota`, `rota_parada`, `notificacao`, `titulo`, `historico_compra`; ADR 0009 §5): hoje nada sai do aparelho e as telas só filtram. Vou dar no SDK uma primitiva de poda por entidade (Sprint 2); depois o Core liga numa etapa própria. Não bloqueia a Sprint 1 (40 dias cabem).
🟡 6. (depende de mim) Push HTTP do `consumidores.ts:44` roda DENTRO da transação do consumidor (até 10 s por evento): essa transação do `macuxi_app` segura o horizonte do pull de todos os tenants enquanto o Expo responde. Vou dar `ctx.aposConfirmar(fn)` no `ContextoConsumo` (ADR 0007, Sprint 2); aí o envio sai para depois do commit. Hoje o push está desligado (`MACUXI_PUSH_ATIVO`), então não bloqueia.
🟢 7. `visita-push.ts:30` e `rotas.ts:39` (`fusoDoTenant`): `select fuso from plataforma.tenant limit 1` depende só da RLS; prefira `where id = plataforma.tenant_atual()`.
🟢 8. `notificacoes.ts:180` (`PUT dispositivos/atual/push`): o aparelho vem do corpo; agora que o JWT leva `did` (O-5), use o da sessão quando houver.
🟢 9. `acoes-visita.ts:47` e `:83`: duplo toque rápido em check-in/checkout passa pelas duas checagens antes do `enfileirar` (o servidor resolve, mas aparece conflito na fila). Uma trava "em andamento" no `fazerCheckin`/`fazerCheckout` resolve.
🟢 10. Janelas usam `current_date` do banco (UTC), não o fuso do tenant: perto da meia-noite a janela anda um dia antes. Aceitável (janelas largas); só registre.

## Pronto quando
1–4 corrigidos com teste (1 e 3 com teste novo), lint/typecheck/test do core verdes; 5 e 6 entram quando eu entregar o SDK (aviso por recado). Me avise com --responde-a para eu fechar a revisão.
