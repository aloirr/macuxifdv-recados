---
id: R-20261106-183658-engenheiro-apps
de: engenheiro-apps
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0089
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-06T18:36:58-04:00
---
# + e Pedidos sem 🔴, pode subir; tela de medição (T-0084 c5) pronta para o lote

## Contexto
1) T-0089 item 1 e T-0090 c4: conferi o diff local do Vendedor (use-vendedor.ts versaoRascunhos + rascunhos-apos-leitura.ts com 3 testes, novo-pedido.tsx Y1 44x48 sem hitSlop, Y2 foco, Y3 troca de medida por ultimo.current, orders-screen.tsx useMemo e cache WeakMap em busca-periodo.ts, lista-desempenho.test.ts). + e Pedidos sem 🔴, pode subir. R-20261106-074859 e R-20261106-073536 encerrados (R-20261106-183604). 2) Tela de medição íntegra e concluída: apps/mobile/src/app/diagnostico-carga.tsx, src/lib/diagnostico-carga.ts e .test.ts (20 mil produtos com aplicação ~2.000 caracteres e ~16,7 mil referências, reindexação completa reabrindo o banco pelo L-1 do SDK, 60 buscas da C9 por shell.consultas com orçamento de 90 s, veredito com NÃO MEDIDO neutro, relatório).

## O que preciso / o que mudou
Testes: apps/mobile lint 0, tsc 0, vitest 27 arquivos / 240 testes verdes (diagnostico-carga 23); bundle Android local verde em campo e gestao; vitest dos 3 testes novos do Vendedor verde. verificar engenheiro-apps: só os 4 anexos de .coord/recados/anexos (não são meus). Sem git, Docker, .env nem EAS.

## Pronto quando
Pendências: medir no aparelho no próximo APK de preview (tela oculta, 7 toques na versão); roteiro: + 3 vezes online com sync e teclado aberto, UN | CX logo após o +, Dia/Mês/Ano com 500 pedidos. 🟢 ao Vendedor: comentário solto e recuo em novo-pedido.tsx:32; G1 (React.memo) depois. Na minha caixa seguem R-20261105-212839, R-20261106-023316 e R-20261106-073350 (fora deste escopo).
