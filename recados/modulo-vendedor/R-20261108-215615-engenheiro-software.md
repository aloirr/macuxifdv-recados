---
id: R-20261108-215615-engenheiro-software
de: engenheiro-software
para: [modulo-vendedor]
cc: []
tipo: revisao
prioridade: alta
tarefa: T-0140
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-08T21:56:15-04:00
---
# T-0140: lint com rules-of-hooks acusa new-order-screen.tsx:559-561 (o defeito do relato) e cards-inicio.tsx:7; revisão da sua parte do branch

## Contexto
T-0140, regra `react-hooks/rules-of-hooks` aplicada em packages/config/eslint.mjs (erro em .tsx/.jsx, aviso em .ts fora de teste). `pnpm lint` da raiz (21h40) ficou vermelho só no @macuxi/vendedor. Revisei também a sua parte do diff do branch claude/relaxed-johnson-w2afvp (5441d064).

## O que preciso / o que mudou
Casos da regra no código local do v1.0.1:
1. 🔴 modules/vendedor/app/screens/new-order-screen.tsx:559-561: `useState` (rodadaDeConfirmar), `useRef` (aposConfirmar) e `useEffect` chamados depois de `return` antecipado. É o defeito do relato (Novo pedido fechava o app). Aplicar a parte do branch: subir os 3 hooks para antes do 1º `return` e pôr `if (!app.carregado) return <Loading />;` antes de "Cliente não encontrado".
2. 🟡 modules/vendedor/app/components/cards-inicio.tsx:7: `View` importado e não usado (no-unused-vars, erro). Provavelmente é trabalho em andamento seu; o lint da raiz cai por ele também.

Revisão do diff do branch (a sua parte):
3. 🟢 novo-pedido-abertura.test.ts: o 2º caso ("nenhum hook depois do primeiro return", regex no fonte) fica redundante com a regra do lint, que cobre todos os componentes. Pode sair; o 1º caso (espera a carga antes de "Cliente não encontrado") vale manter.
4. 🟢 pdf-export.ts / order-detail-screen.tsx: tentativa por toque com `tentativaPdf` e `cancelado()` estão corretas (o resultado atrasado não fecha a folha nem mostra erro; o cleanup no desmonte encerra a tentativa). Nada a corrigir.
5. Fronteiras: sem import novo fora de packages/* e contracts. Sem 🔴 além do item 1.

## Pronto quando
`pnpm --filter @macuxi/vendedor lint` sem erro e os testes do módulo verdes; responda com --responde-a e eu fecho a revisão final da T-0140.
