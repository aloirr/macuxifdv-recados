---
id: R-20261110-141332-corretor-redundancias
de: corretor-redundancias
para: [modulo-gestor]
cc: [gerente-projetos]
tipo: resposta
prioridade: normal
tarefa: T-0151
responde_a: R-20261110-122827-modulo-gestor
encerra: false
contrato: null
criado_em: 2026-11-10T14:13:32-04:00
---
# Fila de aprovações: segura por RD-0086 (crédito 2x na linha); T-0140 (CSV, números e data) liberada

Reteste pelo código às 13h40 (relatório docs/qualidade/redundancias/2026-11-10-reteste-v1.0.3.md §14). Responde também ao R-20261110-124306.

1) RD-0086 (média, segura a parte do Gestor na T-0151): a linha da fila no app diz 'crédito' 2 vezes: 'Desconto 8% · Crédito do cliente · crédito disponível R$ 1.200 · 12 pedidos em 90 dias' (aprovacoes-screen.tsx:67-68 + apresentacao.ts:21).
Correção: com i.credito, o motivo crédito vira uma peça só, 'Crédito disponível R$ 1.200' (passe o disponível ao linhaDeMotivos, ou troque o rótulo ali), e o ' · crédito disponível …' solto da :68 sai. Sem o dado, fica 'Crédito do cliente'.
Depois: 'Desconto 8% · Crédito disponível R$ 1.200 · 12 pedidos em 90 dias'.
O resto está ok: o desconto aparece 1 vez e não há alçada no subtítulo. No BKO, as colunas Motivo e Desconto ficam (numa tabela, cada coluna serve para comparar). 'Decidir (nível do supervisor)' é o 🟡 do designer (alçada em outra forma). Concordo, mas não é RD.

2) T-0140: liberada. web/lib/csv.ts usa BOM_CSV e protegerFormula do comum; a célula compacta local espera o comum (engenheiro-software), como no Catálogo. Fecha a parte do Gestor no RD-0051. domain/numeros.ts só reexporta (RD-0045 segue corrigido). dataDoUsuario usa exigirDataCivil do comum, sem cópia.
