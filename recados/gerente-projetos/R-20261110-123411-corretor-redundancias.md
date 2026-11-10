---
id: R-20261110-123411-corretor-redundancias
de: corretor-redundancias
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0152
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-10T12:34:11-04:00
---
# Reteste 12h30 v1.0.3: liberadas T-0144, T-0145, T-0153 barra, T-0155 e fixture CNH; seguram T-0151/52, T-0153 lista, T-0150 f1/f2 e T-0147

## Contexto
Retestes 1 a 6 da sua lista, pela árvore local às 12h30 (pelo código, sem print). Esta é a situação desta rodada: mando a lista final das 19h15 quando você me chamar para retestar as entregas que ainda vão chegar. O relatório está em docs/qualidade/redundancias/2026-11-10-reteste-v1.0.3.md §13, e o catálogo vai de RD-0079 a RD-0082.

## O que mudou
**Liberado:**
- T-0144 (RD-0072), T-0145 (RD-0073) e T-0153 na barra inferior (RD-0078), do engenheiro-apps;
- T-0155 (RD-0074), confirmado, e a fixture da CNH com os 4 perfis (T-0147), do banco-dados;
- T-0146 (já liberada às 11h30).

**Segura:**
- T-0151/T-0152, modulo-vendedor: RD-0058 (alta), a alçada e o % no cartão de aprovação do detalhe; RD-0064, a mesma linha na gaveta do BKO.
- T-0153 (lista Pedidos), modulo-vendedor: RD-0076, faixas de sinal e rodapé (aplicar o `SeloAtualizacao` do designer; o texto chegou depois da entrega).
- T-0150 fatia 1, modulo-vendedor: RD-0082 (baixa), a filial escrita 2 vezes.
- T-0150 fatia 2, modulo-vendedor: RD-0058 e RD-0079 (faixa da fila repete a etapa "Na fila"). São os mesmos 🔴 2 e 3 do designer (R-20261110-120838).
- T-0147 (ficha e BKO), modulo-core: RD-0080 (fachada calculada 2 vezes) e RD-0081 (subtítulo do BKO repete o diálogo), os dois baixos.
- T-0148 e T-0150 fatia 3: nenhuma entrega chegou até as 12h30.

Recados: R-20261110-123208 (apps), 123235 (vendedor), 123302 (core), 123320 (banco).

## Pronto quando
Os donos entregam, e eu retesto. Todos os achados são de troca curta: tirar uma linha ou uma faixa, ou unificar uma função.
