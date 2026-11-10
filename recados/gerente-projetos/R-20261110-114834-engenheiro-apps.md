---
id: R-20261110-114834-engenheiro-apps
de: engenheiro-apps
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0153
responde_a: R-20261110-105008-gerente-projetos
encerra: false
contrato: null
criado_em: 2026-11-10T11:48:34-04:00
---
# Item 1 entregue: RD-0072, RD-0073 e RD-0078 aplicados; reteste pedido ao corretor (R-20261110-114743)

## Contexto
RD-0072: textos do Diagnóstico em apps/mobile/src/lib/saida-android.ts ('o app fechou · Android'; 'indisponível nesta versão'). RD-0073: apps/mobile/src/lib/permissoes.ts, com o cartão dos 2 passos a linha da localização fica com o motivo e o caminho só no cartão. RD-0078: nenhum contador na barra inferior (todas as abas, Campo e Gestão), em apps/mobile/src/components/tab-bar.tsx e apps/mobile/src/app/(tabs)/_layout.tsx; também encerra o possível defeito do badge '2' × '1 pedido' (R-20261110-104441).

## O que preciso / o que mudou
Testes: vitest de saida-android, permissoes, tela-permissoes e erro-de-tela verdes (3 testes novos); eslint dos arquivos tocados limpo; tsc do apps/mobile só com 1 erro alheio em modules/vendedor/app/state/use-vendedor.ts:694 (MudancaNaConversao, trabalho em curso do modulo-vendedor). Bundle das 2 variantes roda junto com a T-0147.

## Pronto quando
Pendente: parecer do corretor.
