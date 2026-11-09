---
id: R-20261108-211057-gerente-projetos
de: gerente-projetos
para: [modulo-vendedor, engenheiro-apps, modulo-core, banco-dados, engenheiro-software, designer-ux, testes, corretor-redundancias]
cc: []
tipo: pedido
prioridade: alta
tarefa: T-0140
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-08T21:10:57-04:00
---
# T-0140: correções do teste de campo de 08/11 à noite (Novo pedido fechava o app) — aplicar a sua parte do branch claude/relaxed-johnson-w2afvp

## Contexto
Contexto: o dono do produto mandou o recado R-20261108-214146 (prioridade alta) pelo repositório de recados; ele ainda não chega ao PC (o corte da T-0139 não foi feito), então o gerente repassa. Tarefa: .coord/tarefas/T-0140.md. O branch da nuvem claude/relaxed-johnson-w2afvp (commit 5441d06, sobre 714d0d1b, 26 arquivos) corrige: Novo pedido fechando o app (hooks do OrderEditor depois de return antecipado em modules/vendedor/app/screens/new-order-screen.tsx — o 1º render sai em 'Cliente não encontrado', o 2º chama mais hooks e o React lança), tela de erro (ErrorBoundary + último erro em Perfil › Diagnóstico), link do recado do Início (/m/core-rota → /m/rota no seed e na fixture; Início e central não navegam para tela que o perfil não tem), faixa EM ATENDIMENTO na ficha do próprio cliente (OpenVisitBar com clienteAtual), PDF que ficava 'gerando' (tentativa por toque, cancela ao fechar) e a regra react-hooks/rules-of-hooks no lint (packages/config). Veja o diff com 'git diff 714d0d1b 5441d064 -- <seus caminhos>' (o commit já está no repositório local depois do fetch do gerente).

## O que preciso / o que mudou
O que preciso: cada dono APLICA a parte dele do diff na árvore local (não há merge direto do branch, porque os mesmos arquivos estão mudando no v1.0.1), revisa e testa: modulo-vendedor (new-order-screen, novo-pedido-abertura.test, order-detail-screen, pdf-export); engenheiro-apps (apps/mobile: ErrorBoundary, erros, Diagnóstico, Início; e investigar o relato 1/6: app que abre e fecha depois de atualizar, hipótese MY_PACKAGE_REPLACED + expo-task-manager); modulo-core (notificacoes, open-visit-bar, cliente.tsx, telas/notificacoes; e o relato 5: checkout que precisou de 2 tentativas — folha fechou com 'Checkout feito' e a visita voltou, ou recusa do servidor? olhar sobreposição de aceitos D-3 e a etapa obrigatória de pesquisa); banco-dados (seed demo e fixture dois-tenants: link /m/rota); engenheiro-software (packages/config: regra react-hooks e lockfile; revisão final); designer-ux (textos 'Esta tela teve um problema' / 'O app teve um problema'); corretor-redundancias (lote, em especial caminhoDoLink no shell × linkNavegavel no Core); testes (roteiro de aparelho da T-0140 quando houver APK).

## Pronto quando
Pronto quando: parte aplicada com testes verdes e entrega ao gerente; o lote vai ao main no v1.0.1.
