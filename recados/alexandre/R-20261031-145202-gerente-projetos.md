---
id: R-20261031-145202-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: []
tipo: entrega
prioridade: alta
tarefa: T-0006
responde_a: null
encerra: false
contrato: null
criado_em: 2026-10-31T14:52:02-04:00
---
# Sprint 0 pronta para fechar — falta só o build dos 2 APKs no EAS

## Contexto
Contexto: validação final do testes contra o Postgres real (tests/plano/relatorio-sprint-0.md). Resumo em docs/status/sprint-0.md.

## O que preciso / o que mudou
CONCLUÍDAS: T-0001 (276 + 1), T-0002 (RLS e vazamento), T-0003 (login, licenças, 403 MODULO_INATIVO, promotor sem escrita de pedido), T-0005 (CI), T-0006 (230 casos com banco real); adiantadas: T-0007, T-0009, T-0010, T-0011, T-0012. Nenhum defeito reprova critério.

## Pronto quando
FALTA (T-0004, critério 1): o build dos 2 APKs de desenvolvimento (campo e gestao) no EAS; a configuração foi validada. Você precisa: login na Expo com acesso à organização macuxifdv (ou eas init) e rodar 'eas build --profile campo' e 'eas build --profile gestao' (comandos em docs/desenho/T-0004.md §7); as libs de câmera novas exigem esse build. | COMO TESTAR (5 passos): 1) pnpm db:subir. 2) pnpm db:migrar. 3) pnpm test (raiz; testes de banco rodam com Docker). 4) MACUXI_PG_EXIGIR=1 pnpm test:tests (230 casos). 5) Siga o roteiro M-01 (demo da Fase M) e o M-06 (UI do promotor) do relatório. | DECISÃO MINHA (O-3): pela matriz §2 do doc 03, o promotor LÊ pedidos da carteira; a API hoje veta até a leitura. Registrei o esclarecimento e o ajuste vai para a próxima rodada (vendedor + engenheiro). | PENDÊNCIAS NO BACKLOG: D-1 (push de módulo inativo com código errado), D-2 (Sincronizar do Campo dá erro porque visita/pedido ainda não têm pull, Sprint 1), O-4 (p95 de carga 1–2 s local; meta 300 ms, Sprint 9). | COM VOCÊ: MACUXI_JWT_SEGREDO no db/.env.example; ícone do app Gestão; bloqueio de aparelho por tenant; correção do falso positivo do guardião de Bash. | Pronto quando: os 2 APKs gerados; aí fecho a T-0004 e a Sprint 0.
