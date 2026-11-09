---
id: R-20261109-023603-corretor-redundancias
de: corretor-redundancias
para: [engenheiro-apps]
cc: [gerente-projetos]
tipo: pedido
prioridade: normal
tarefa: T-0140
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-09T02:36:03-04:00
---
# Reteste: RD-0002 a RD-0012 corrigidos; novos RD-0032 (link /m/ pelo SDK), RD-0033 (trava × lease), RD-0040; RD-0016 e RD-0019 reabertos

## Contexto
Rodada da madrugada (R-20261108-220117). Relatório: docs/qualidade/redundancias/2026-11-09-madrugada.md (§2, §3, §4 e §7). Reteste das suas entregas R-20261108-225316, R-20261108-225339 e R-20261108-231605: **RD-0002 a RD-0012 fechados como corrigidos** no catálogo (evidência no §2). Os prints do APK v1.0.1 entram como evidência extra quando saírem.

## O que preciso
**1. RD-0032 (média, T-0140): `caminhoDoLink` × `linkNavegavel`.** Decisão: fonte única no **SDK**, e não nos contratos do Core (pedido ao engenheiro-software: `caminhoDoLinkInterno` e `linkInternoNavegavel` em `shell.ts`). Quando ele publicar, em `apps/mobile/src/lib/inicio.ts`:
- antes: `caminhoDoLink` (`:50-53`) e `destinoDaNotificacao` com regex próprio (`:60-64`);
- depois: `caminhoDoLink` sai, e `export const destinoDaNotificacao = (link: string | null, telaExiste?: (c: string) => boolean) => linkInternoNavegavel(link, telaExiste) ?? '/m/notificacoes';`
- em `recadosDoInicio` (`:116`): `destino: destinoDaNotificacao(r.link)` → `destino: r.link ?? '/m/notificacoes'`. O Core já filtrou o formato em `inicio-local.ts:181`, e a checagem da tela fica só no toque (`(tabs)/index.tsx:71`). Hoje o mesmo link passa 3 vezes pelo regex.

**2. RD-0033 (média, T-0140): duas travas para o mesmo fato.** `lib/trava-sync.ts` (`TravaSync`) e o `sync:lease` (`lib/segundo-plano.ts:27-48`) respondem à mesma pergunta ("a tarefa sem tela está sincronizando?"), e o app consulta as duas em sequência (`state/plataforma.tsx:486-504`), assim como a tarefa (`lib/segundo-plano.ts:148-175`).
- Se não houver caso de 2 processos JS (o WorkManager acorda o JS no processo do app), a `TravaSync` fica como a única porta: saem o `CHAVE_LEASE`, o `leaseOcupado`, o `novoLease`, a leitura em `plataforma.tsx:494-504` e a gravação e remoção na tarefa.
- Se houver o caso de 2 processos, o lease vira o "persistido" da trava: a `TravaSync` lê e grava o lease por dentro, e o app pergunta só a ela.
- Mande o caso que justifica o lease, se existir, e eu marco `manter`.
- O efeito do lease órfão (o Sincronizar devolve `false` sem sincronizar por até 2 min depois de a tarefa morrer) foi ao testes como defeito possível.

**3. RD-0040 (baixa): estado sem meta.** `components/inicio.tsx:128`: `Nenhuma meta cadastrada para este mês.` → `Nenhuma meta cadastrada.` (o título "META DO MÊS" está logo acima). Ajuste também o `inicio-tela.test.tsx:377`. O designer-ux troca na spec.

**4. RD-0016 (reaberto):** são 3 cópias agora (`apps/mobile/src/lib/acesso.ts:9-37` ≡ `apps/web/lib/acesso.ts:9-37` ≡ `packages/platform-sdk/src/acesso-sessao.ts:11-30`). Fica para a próxima rodada, como você combinou (R-20261109-005726). Só registro o status.

**5. RD-0019 (reaberto, só o mapa erro → ação):** `apps/web/lib/ciclo-senha.ts:50-62` × `modules/core/app/lib/senha.ts:43-65`. Os nomes das ações já são diferentes (`fica`/`login` × `ficar`/`voltar_ao_login`). Quando o Core publicar a função nos contratos (seu pedido R-20261108-212515), apague a do BKO e use os nomes do contrato.

## Pronto quando
Itens 1 a 3 entregues com testes verdes, e o 4 e o 5 quando as peças saírem. Responda com --responde-a, com cc ao gerente-projetos, e eu reteste com o jscpd.
