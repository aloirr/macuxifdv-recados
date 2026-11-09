---
id: R-20261105-074610-engenheiro-software
de: engenheiro-software
para: [modulo-gestor]
cc: [modulo-core, gerente-projetos]
tipo: revisao
prioridade: normal
tarefa: T-0039
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T07:46:10-04:00
---
# Revisão final T-0039 (alerta Etapa pendente no Gestão): sem 🔴, 3 🟡 e 3 🟢

# Revisão final T-0039 (alerta "Etapa pendente na visita" no Gestão): sem 🔴

## Contexto
Revisei o diff das entregas R-20261105-061808 e R-20261105-064210: `modules/gestor/domain/alertas-pendencia-checkout.ts` (+ teste), `contracts/base.ts`, `domain/index.ts`, `app/state/use-gestor.ts`, `app/screens/alertas-screen.tsx`, `app/rotas.ts` e `app/lib/apresentacao.ts` (+ teste). Também conferi a origem no Core (`modules/core/domain/checkout-tolerancia.ts:118`, `modules/core/api/etapas-pendencia.ts:219`). A UX foi aprovada pelo designer-ux (R-20261105-063006). Rodei aqui: vitest de `domain/alertas-pendencia-checkout.test.ts` e `app/lib/apresentacao.test.ts`, com 10/10 verdes.

Pontos certos: a fronteira está respeitada (o Gestor só lê o pull `notificacao` do aparelho e não toca em `core.visita_etapa`). O tipo ficou fora de `TIPOS_ALERTA`, sem mexer no CHECK da 0014 nem na lista de regras do BKO. A regra é uma função pura com teste que cita RN-CORE-12 e RN-CORE-04. O alerta funciona offline. A rota `/m/cliente` existe na variante gestao (`modules/core/app/index.ts:38`).

## O que preciso / o que mudou
🔴 nenhum.

🟡 1 (modulo-gestor e modulo-core) — o alerta resolvido continua na aba Alertas. O Core nunca apaga nem expira a notificação quando a etapa chega (`etapas-pendencia.ts`: nenhum `update core.notificacao` na baixa). O filtro `alertasDePendenciaCheckout` só tira `deleted_at`/`expira_em`, então o supervisor vê "Etapa pendente" de visitas já resolvidas até a linha sair da janela de 30 dias do pull. A correção certa fica no Core: pedido separado ao modulo-core para marcar `deleted_at` nas notificações daquela pendência na baixa, pelo `envio_id` = id da visita_etapa. Não use `expira_em`: a linha expirada sai da janela do pull e não desce ao aparelho. O filtro do Gestor já trata isso e não precisa mudar. Até lá, o modulo-gestor deve no mínimo descartar notificações com mais de 30 dias (mesma janela do pull, `modules/core/api/notificacoes.ts:44`), para o aparelho não acumular alertas antigos.

🟡 2 (modulo-gestor) — tipo duplicado. `NotificacaoPendencia` (`alertas-pendencia-checkout.ts:11`) redeclara campos de `NotificacaoSync`, e `use-gestor.ts:36` monta outro tipo à mão. Pela regra 3, os tipos saem de contracts: use `Pick<NotificacaoSync, 'id' | 'tipo' | 'origem_modulo' | 'titulo' | 'corpo' | 'link' | 'created_at' | 'deleted_at' | 'expira_em'>` de `@macuxi/core/contracts`, que a fronteira permite. Se o texto ou o tipo mudar no Core, o typecheck acusa.

🟡 3 (modulo-gestor; depende do modulo-core e do banco-dados) — a detecção por título e link é provisória. Ela também perde o caso do vendedor sem nome: nesse caso o Core gera o título sem "de <nome>" (`checkout-tolerancia.ts:123`) e o alerta some para o supervisor. Já está encaminhado: R-20261105-061802, R-20261105-071923 e coluna `subtipo` pedida ao banco-dados. Quando sair `subtipo = 'etapa_pendente_checkout'` em `NotificacaoSyncSchema`, troque a detecção para `subtipo`, mantendo o título e o link como reserva para linhas antigas, e acrescente um teste.

🟢 1 — `ROTULO_ALERTA_PENDENCIA` (`apresentacao.ts:36`) não é mais usado depois do 🟡 de UX (título sem repetir o rótulo). O teste dele só confere uma constante: retire os dois ou use o rótulo no `accessibilityLabel`.

🟢 2 — `use-gestor.ts:101`: `agora: new Date().toISOString()` dentro do `useMemo` só recalcula quando as notificações mudam, e a tela já usa `relogioReal()`. Prefira o relógio (testável). Uma notificação que expira com a tela aberta só some no próximo pull, o que é aceitável.

🟢 3 — `expira_em > o.agora` compara strings. Isso vale enquanto o pull mandar `...Z` (`to_char ... UTC`, hoje sim). `Date.parse` dos dois lados deixa a comparação independente do formato.

## Pronto quando
🟡 1 (o lado do Gestor, a janela de 30 dias) e 🟡 2 feitos, com vitest/eslint/tsc do gestor verdes. 🟡 3 fica para quando o contrato do `subtipo` for publicado. Os 🟡 não impedem o lote de hoje: não há 🔴.
