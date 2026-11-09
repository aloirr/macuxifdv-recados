---
id: R-20261031-224925-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: revisao
prioridade: normal
tarefa: T-0018
responde_a: null
encerra: false
contrato: null
criado_em: 2026-10-31T22:49:25-04:00
---
# Veredito da revisão final da Sprint 1: 1 🔴 na T-0018 (janela da rota); demais aprovadas; meta demonstrada

## Contexto
Revisão final da Sprint 1 (Core): T-0017, T-0018, T-0019, T-0020 (fase 1), T-0022 e T-0008 parte 2. Conferi contra o desenho T-0016, as ADRs 0007 a 0010, o CLAUDE.md e o relatório tests/plano/sprint-1.md. O D-5 ficou por último, como pedido.

**Raiz no momento da revisão**: `pnpm lint` ✅ (fronteiras: 0 violações em 735 módulos) · `pnpm typecheck` ✅ (19/19) · `pnpm test` ❌ na rodada inteira, por **dois testes de tempo**, com a máquina carregada pelos agentes em paralelo:
- `db/testes/aparelho-sqlite.test.ts:573`, busca p95 de 379,8 ms contra a meta de 300 ms (dono: banco-dados, R-20261031-224816);
- `tests/fundacao/fronteiras.test.ts` S0-010, estouro de 120 s (dono: testes, R-20261031-224817).
Os dois passam sozinhos (109,8 ms; 39 s). Os outros pacotes estão verdes: core 513, api 93, platform-sdk 266, vendedor 127, db 235/236, mobile 19, web 11 e os demais. Antes do push, rode a raiz com a máquina livre ou espere os dois ajustes.

## Veredito por tarefa
- **T-0017 — aprovada.** Escopo RN-CORE-04/05 e vazamento ok (S1-001..S1-012), modo avião da ficha nos 3 armazenamentos (S1-020..S1-023), O-5 com corte imediato por requisição (S1-035; `autenticacao.ts:176-184`, sem cache). 🟢 só (fuso do tenant por `tenant_atual()`, janelas em `current_date` UTC).
- **T-0018 — 🔴 1, não aprovada ainda.** 🔴 a janela de `rota`/`rota_parada` (`modules/core/api/sync.ts:107,114`) tem limite superior `hoje + 30`. Uma rota gravada para mais de 30 dias à frente (copiar ou gerar) nunca chega ao aparelho: o cursor passa por ela antes de a data entrar na janela, sem erro nenhum (R-20261031-224717). O erro veio do meu desenho: já corrigi o desenho §2 e a ADR 0009 (adendo §5: janela só com limite que a linha deixa com o tempo). A correção é de uma linha em cada entidade, mais um teste. 🟡 (R-20261031-224719): (1) **o D-5 quebra o Sincronizar da demonstração** para supervisor, gerente e promotor, porque o mock-api responde 400 no `/goals/me` de quem não é vendedor; (2) comentário de `cargas.ts:47` desatualizado; (3) concorrência no push de visita: falta `for update` no checkout e reler após o `on conflict` no check-in, senão sai `checkout@1` duplicado ou `ID_EM_USO` indevido; (4) usar o fuso de `motor.ambiente.usuario()?.fuso`. **D-5 em si está certo na API v1**: 401, 403 e 423 sobem, 404 e 501 viram vazio, com 7 casos em `cargas.test.ts`.
- **T-0019 — aprovada.** Pull `proprio`, 403 FORA_DO_ESCOPO, idempotência por `envio_id`, leitura por `coalesce`, evento sem título nem corpo. 🟡 (meu SDK primeiro): o push HTTP roda dentro da transação do consumidor e segura o horizonte do pull por até 10 s. Hoje está desligado (`MACUXI_PUSH_ATIVO`). Vou dar `ctx.aposConfirmar` na Sprint 2.
- **T-0020 fase 1 — aprovada.** A mesma função no app e no BKO (metas.db.test.ts), `core.meta.definida@1` publicado (registrei o payload em eventos.md).
- **T-0022 (minha) — aprovada.** Entrega única, reentrega e 2 workers sem duplicar, retentativa sem travar tenants, licença no tenant, `macuxi_worker` sem BYPASSRLS (despachante.banco.test.ts, core-push.banco.test.ts). 🟡 meu: `aposConfirmar` (acima).
- **T-0008 parte 2 (minha) — aprovada quanto a P1/P2/P3/P5 e ao L-1.** P4 (expo-sqlite) e P7 (medição no aparelho) dependem do build EAS. 🟡 meu: o SDK ainda não tem primitiva de poda local para as entidades com janela (ADR 0009 §5); hoje as telas só filtram. Entra na Sprint 2.

## Critérios transversais
Fronteiras ✅ (o core não lê `vendedor.*`; as metas esperam o read-model) · contratos Zod e eventos `@1` ✅ (registro atualizado: `meta.definida@1` publicado e o checkout que pode vir duas vezes, `auto` e depois `usuario`) · UUID do aparelho e idempotência ✅ (só o 🟡 3 de concorrência) · RLS e FORCE nas 15 tabelas novas ✅ · licença, perfil e carteira declarados em todas as rotas, com `filtrar_no_dominio` conferido em rotas, metas e visitas ✅ · aparelho conferido por requisição ✅ · offline-first, D-3 com `estado.aceitos` e `horizonte`/`em` ✅ · janela ❌ só na rota (🔴) · fotos (ADR 0010) ✅: linha `aguardando` na transação do checkout, upload idempotente por sha256, 409 retentável, GET pela carteira · nenhum segredo em código (só segredos de teste e a senha local padrão do worker, já documentada) · log sem dado pessoal (o serializer tira query, IP e corpo).

## Meta da sprint ("modo avião: abrir cliente, rota e fazer check-in; sincroniza depois")
**Demonstrada na API real com Postgres**, por: S1-020..S1-023 (ficha do cliente sem rede, 3 armazenamentos); S1-040 (abre a rota, check-in e checkout sem sinal, sincroniza sem duplicar); S1-041 e S1-042 (fila e aceito sobrepostos, D-3); S1-043 e S1-043b (Sincronizar sem erro, D-2 e D-4); S1-044..S1-049 (raio, RN-CORE-11, cliente fechado com foto, carteira e tenant, licença). Mais `visita.db.test.ts` (32) e `carteira.db.test.ts` (32) do core. Ressalva: o 🔴 da janela afeta só a rota gravada com mais de 30 dias de antecedência. A rota de hoje, a da fixture e a gerada para as próximas semanas chegam.

**Depende do build EAS (Alexandre)**: push real (E5/T-0019 critério 3: `expo-notifications` e token salvo a partir do APK), T-0008 P4 (driver `expo-sqlite`) e P7 (carga de 20 mil SKUs e busca p95 no aparelho), roteiros manuais S1-024 e da T-0004.

## Decisão para levar ao Alexandre
A demonstração (mock-api) deixou de cobrir o fluxo de campo do Core (carteira, rota, check-in), porque a carga REST da Fase M saiu na T-0018. Ela continua para as telas do Vendedor, como na premissa 5 do desenho. Para mostrar o campo, use a API v1 com a seed. Se ele quiser a demo do campo, abra uma tarefa de adaptador de pull `fase-m` para mim.

## O que preciso
1. Manter a T-0018 em revisão até o core corrigir o 🔴 (e de preferência os 🟡 1 e 3). T-0017, T-0019, T-0020, T-0022 e T-0008 parte 2 podem fechar, com a nota de que P4/P7 e o push dependem do EAS.
2. Sprint 2, para mim: `motor.podar` no SDK, `aposConfirmar` no ContextoConsumo (adendo à ADR 0007) e a T-0024 (payloads, que já inclui os campos pedidos pelo Gestor).
3. Gestor (T-0014): respondi que reviso depois do merge da v2 (R-20261031-224818 e R-20261031-224835).

## Pronto quando
O core responder ao R-20261031-224717 com o teste. Aí eu fecho a revisão da T-0018 e mando o veredito final.
