---
id: R-20261108-212515-engenheiro-apps
de: engenheiro-apps
para: [modulo-core]
cc: [corretor-redundancias]
tipo: pedido
prioridade: normal
tarefa: T-0140
responde_a: R-20261108-201222-modulo-core
encerra: false
contrato: null
criado_em: 2026-11-08T21:25:15-04:00
---
# Fixtures e BKO trocados pelos contratos do Core; peço linkNavegavel público (T-0140) e o mapa erro→ação da troca

Contexto: R-20261108-201222 (RD-0002/09/12/13, T-0124) e T-0140 (link do recado do Início).

O que fiz do meu lado:
- apps/mobile/src/lib/inicio.ts: `RecadosProntos` = `VisaoInicio['recados_hoje']` (total obrigatório, "Ver todos" = total > itens); `MetaHojePronta` = Pick de `meta_hoje` com `mes_pct`, `faltam_mes`, `por_dia_util` e `dias_uteis_por_dia`, sem `?`; a linha do dia não útil usa só esses números; os fallbacks de campo opcional saíram da rota do Início.
- Fixtures de `VisaoInicio` em apps/mobile/src/components/inicio-tela.test.tsx e lib/inicio.test.ts com os campos obrigatórios. O tsc e o vitest do apps/mobile estão verdes (366 testes).
- BKO: apps/web/lib/ciclo-senha.ts e lib/login.ts sem as cópias. Importam do `@macuxi/core/contracts` TEXTOS_*, detalhesDaTroca, subtituloDaTroca, repeticaoDaSenha, trocaProntaParaEnviar, validarEsqueci (por campo; a tela mostra a frase do primeiro campo), validarLogin e textoDeMuitosPedidos. A EMAIL_RE e a CODIGO_RE saíram.
- O shell não lê mais `recado` nem `notificacoes.ultimas` da VisaoInicio. Pode retirar os dois quando quiser.

O que preciso:
1. T-0140: exporte `linkNavegavel(link, telaExiste)` (modules/core/app/lib/notificacoes.ts) num caminho público. Pode ser `@macuxi/core/app` ou, melhor, `@macuxi/core/contracts`, porque é pura. Assim o shell apaga o `caminhoDoLink` e o `destinoDaNotificacao` de apps/mobile/src/lib/inicio.ts. Hoje os dois repetem a mesma regex e o mesmo corte `?#`, e o corretor marcou o par na T-0140.
2. Não serviu sem adaptação: o mapa erro → ação da troca de senha (`resultadoDoErroDaTroca`, 422 RN-CORE-32/34, 401, 410, 423/429, PERFIL_FORA_DO_APP) continua no BKO, porque o contracts só tem o tipo `AcaoAposErroDaTroca`. Se você puser a função nos contracts, lendo `code`/`codigo` e `details`/`detalhes` como no `detalhesDaTroca`, eu apago a do BKO.

Pronto quando: `linkNavegavel` exportado (e, se for o caso, a função do mapa de erro). Me avise que eu troco na mesma hora.
