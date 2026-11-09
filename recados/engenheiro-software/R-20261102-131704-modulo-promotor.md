---
id: R-20261102-131704-modulo-promotor
de: modulo-promotor
para: [gerente-projetos, alexandre]
cc: [engenheiro-software, engenheiro-apps]
tipo: entrega
prioridade: normal
tarefa: T-0056
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-02T13:17:04+00:00
---
# T-0056 entregue no PR #41: coletas do Promotor (push e REST), aba Loja e BKO de trade

## Contexto
Contexto: T-0056 (nuvem, branch nuvem/T-0056-coletas-loja), PR https://github.com/aloirr/macuxifdv/pull/41. Só modules/promotor (sem db) e docs/modulos/promotor. Domain novo com testes citando RN: coleta.ts (RN-PRO-02 janela check-in..checkout pelo instante da coleta, RN-PRO-04 variação sem confirmação, RN-PRO-06 checklist no checkout, idempotência), alvo.ts (RN-PRO-10) e relatorios.ts (RN-PRO-03/05/07). Contratos: 11 entidades de push das coletas e 9 de pull dos cadastros (contracts/entidades.ts, cadastros.ts), relatórios e PERFIS_RELATORIO; manifesto com o sync novo e usaConsultas core.cadastro_resumo@1. API: recebimento único para o push do sync e para POST /v1/promotor/visitas-loja e /coletas/* (perfil, carteira, idempotência, fotos, eventos promotor.*@1 validados antes de gravar, outbox); GET relatorios/share e relatorios/ruptura para supervisor, gerente, analista e admin no escopo de equipe e carteira. Repositório atrás de interface (memória nos testes); produção sem recebimento até a 0015 (push volta SYNC_NAO_IMPLEMENTADO e nada se perde). App: moduloApp com a aba Loja (campo, coleta.registrar, ordem 40), offline-first. BKO: página Trade marketing com share x meta, ruptura por loja, filtros na URL e CSV. Testes do módulo 204 para 299 verdes; pnpm lint, typecheck, fronteiras, test:tests, testes da API, bundle Android, build do BKO e verificar --base origin/main verdes localmente.

## O que preciso / o que mudou
O que ficou para o local: banco-dados = migração 0015 e seed da demo (R-20261102-131328-2); engenheiro-apps = registrar a câmera do Promotor no shell e revisar a tela, aba Trade do Gestão depois (R-20261102-131328); engenheiro-software = ordem do push entre entidades ou código retentável próprio, espelho do manifesto e deps de app/web com o lockfile (R-20261102-131347); testes = virar o D-C00b e cenários de API com createApp após a 0015 (R-20261102-131347-2). Critério de ponta a ponta na base demo NÃO feito (depende da 0015). Diário não alterado (regra da nuvem).

## Pronto quando
Pronto quando: CI do PR e do main verdes e merge feito; premissas no fim do PR (janela RN-PRO-02 pelo instante da coleta, encerrar coletas separado do checkout do Core, segmento do cliente como canal, relatórios pela última medição válida e 30 dias padrão).
