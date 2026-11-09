---
id: R-20261031-215947-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0018
responde_a: null
encerra: false
contrato: null
criado_em: 2026-10-31T21:59:47-04:00
---
# Entrega: 🔴 D-3 (aceito sobreposto até o pull) e 🔴 L-1 (reindexação da busca) no SDK/API

## Contexto
Contexto: os dois 🔴 da Sprint 1 no motor de sync. D-3 (R-20261031-210639-testes): no aceito, o item sai de estado.fila e entra em estado.aceitos (ItemAceito, persistido em sync:aceitos). Ele continua sobreposto via motor.sobreposicao()/itensParaSobrepor até a passada do pull cobrir o aceite: PaginaSync.horizonte > ResultadoItemPush.em, os dois no relógio do banco, devolvidos agora pela API via BancoApp.instanteSync. Sem os campos, vale o relógio do aparelho + 5 s. RN-CORE-02/15 levam os aceitos junto. ADR 0009 ganhou adendo no §3. L-1 (R-20261031-205432-banco-dados): índice recriado vazio com fonte já sincronizada recebe a marca _busca:<i>:reindexar e é reindexado das linhas locais (lotes de 500 cedendo o loop) antes do rebuild, na consulta ou no finalizar. L-6 aplicado. L-2..L-5 e L-7 ficam para P4/P7; L-8 não. Arquivos: packages/platform-sdk/src/{motor-sync.ts,sync.ts,sync-simulado.ts,react/index.tsx,sqlite/armazenamento.ts,sqlite/esquema.ts,motor-sync.aceitos.test.ts,busca.test.ts}, apps/api/src/{sync.ts,banco.ts}, apps/api/test/{apoio.ts,sync.test.ts}, docs/decisoes/0009, docs/desenho/T-0008.md.

## O que preciso / o que mudou
O que preciso / pendências: (1) modulo-core aplicar as 6 trocas do R-20261031-215651 (pendentesDaFila aceita 'aceito'; estado.ts usa m.sobreposicao(); usar-core/usar-notificacoes/usar-painel-metas com estado.aceitos; fazerCheckin/fazerCheckout leem a visita antes do void enviar). Só então o S1-042 fica vermelho. (2) testes: o helper caixa de notificacoes.test.ts passa ap.motor.sobreposicao(['notificacao_leitura']), o que deixa o S1-065 vermelho; depois os dois viram it. (3) Ainda em aberto na minha caixa: o caso do despachante real com o push do Core (R-20261031-214136, T-0022), o transporte fase-m (R-20261031-195120) e as revisões do Gestor (T-0014).

## Pronto quando
Pronto quando / verificação: lint e typecheck da raiz verdes; pnpm test da raiz verde exceto S1-043 (tests/, it.fails do D-4 passou a falhar porque o modulo-vendedor corrigiu o D-4; falta o testes trocar por it). platform-sdk 266/266, api sync.test 18/18. verificar engenheiro-software sem violação.
