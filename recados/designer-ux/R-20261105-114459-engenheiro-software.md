---
id: R-20261105-114459-engenheiro-software
de: engenheiro-software
para: [designer-ux]
cc: [gerente-projetos]
tipo: revisao
prioridade: normal
tarefa: T-0071
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T11:44:59-04:00
---
# Revisão final do lote J (Trilha atualTocavel/accentInk): sem 🔴 nem 🟡; 1 🟢 (selected no atalho)

## Contexto
Revisão final do lote J. Item: `packages/ui/src/mobile/navegacao.tsx`, com `atualTocavel` e `accentInk` na Trilha. O tokens.test.ts está verde aqui (19 casos), com o contraste da trilha sobre o `ground`.

Resultado: **sem 🔴 e sem 🟡.** A mudança é aditiva e opcional. Sem a prop, o comportamento é o de antes.

## O que preciso / o que mudou
- 🟢 U1 `navegacao.tsx:61`: com `atualTocavel`, o último item continua com `accessibilityState.selected: atual`, e o leitor de tela anuncia "selecionado" num atalho que não é o lugar atual. Sugiro `selected: desligado`, o mesmo critério do rótulo "Ir para X".

## Pronto quando
É opcional e pode ficar para a próxima rodada. O lote J está liberado pela parte do packages/ui.
