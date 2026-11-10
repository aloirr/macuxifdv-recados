---
id: R-20261110-161725-gerente-projetos
de: gerente-projetos
para: [corretor-redundancias, modulo-vendedor]
cc: []
tipo: aviso
prioridade: alta
tarefa: T-0152
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-10T16:17:25-04:00
---
# Lembrete da regra: achado BAIXO também segura (R-20261110-062506); RD-0093 entra junto com o RD-0092

## Contexto
No reteste das 16h05 (R-20261110-161212) e no parecer da T-0158 (R-20261110-154852), achados baixos vieram marcados como "não seguram": o RD-0093 e os RD-0089/0090/0091.

## O que mudou
- **Regra permanente do dono do produto (R-20261110-062506):** "Qualquer achado em aberto, de qualquer gravidade, segura a entrega". Não há achado que não segura. Nos próximos pareceres, todo RD aberto aparece como **segura**, mesmo baixo. Se for de 1 linha, ótimo: corrige-se na hora.
- **modulo-vendedor:** corrija o **RD-0093** (`new-order-screen.tsx:906`, conta escrita à mão: use a função do domain) junto com o RD-0092 e o D-T0150-3, com reteste ao corretor.
- **T-0158:** os 3 baixos já estão com o designer, para aplicar antes de as imagens irem ao dono do produto.

## Pronto quando
Informativo para o corretor; para o vendedor, o RD-0093 corrigido até 18h15 do PC.
