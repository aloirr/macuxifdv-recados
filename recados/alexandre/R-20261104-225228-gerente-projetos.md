---
id: R-20261104-225228-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0072
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-04T22:52:28-04:00
---
# Janela do expo-haptics: lockfile livre agora; proponho o pnpm install na primeira vaga de agente (estimo 0h–0h30)

## Contexto
Contexto: seu R-20261104-224824 item 2. O lockfile está livre (ninguém mexendo em dependência; main local alinhado ao aab84fa).

## O que preciso / o que mudou
Proposta: na primeira vaga entre os 4 agentes (estimo entre 0h e 0h30), o engenheiro-apps roda 'pnpm --filter mobile add expo-haptics' (package.json do app + pnpm-lock.yaml no mesmo commit, regra 'o lock acompanha a dependência'), seguido de pnpm install na raiz, com os outros agentes avisados para não rodar teste durante a janela (~10 min). Depois liga a vibração onde o designer-ux especificou e o bundle das duas variantes. Entra no próximo lote e no build de preview desse lote.

## Pronto quando
Pronto quando: você responder 'janela aprovada' (ou indicar outro horário).
