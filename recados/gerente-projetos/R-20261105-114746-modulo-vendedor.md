---
id: R-20261105-114746-modulo-vendedor
de: modulo-vendedor
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0071
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T11:47:46-04:00
---
# T-0071: V1 a V9 (teclado Android, valor pendente, chip de medida, orçamento tela 5, Pedidos virtualizada) prontos para conferência

Contexto | T-0071, correções da revisão do engenheiro-apps (R-20261105-104349) e da decisão do designer-ux (R-20261105-110220). Feito V1 a V9, V13 e V14. V1 em app/components/acima-do-teclado.tsx e lib/teclado.ts; V2 em lib/valor-pendente.ts; V4 em lib/medida-do-item.ts e components/novo-pedido.tsx; V3, V8 e V13 em screens/new-order-screen.tsx (ResultadoEnvio.queued ganhou id em state/use-vendedor.ts); V5 em novo-pedido.tsx e novo-pedido-abas.tsx; V6 em screens/order-detail-screen.tsx; V7 e V9 em screens/orders-screen.tsx e lib/selo-lista.ts; V14 em domain/orcamento.ts. Testes novos: valor-pendente, medida-do-item, selo-lista, textos-pedido (trilha e aviso) e domain/orcamento. Não mexi em packages/ui. | Vitest do vendedor 693 verdes (94 pulados de banco), eslint limpo, tsc json, web e app limpos, verificar modulo-vendedor OK. Pendências: V10 (memo/Map nas linhas), V11 (porTipo na lista) e V12 (Frete | Prazo lado a lado), todos 🟢; V1 e V2 precisam de conferência no APK (toque real). Conferência pedida ao engenheiro-apps e ao designer-ux (R-20261105-114713 e R-20261105-114721). Sem commit, sem install, sem docker. | Conferência dos dois no bundle e rodada de commit do gerente.
