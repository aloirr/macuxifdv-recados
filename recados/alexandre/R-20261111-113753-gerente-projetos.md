---
id: R-20261111-113753-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: []
tipo: aviso
prioridade: normal
tarefa: null
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-11T11:37:53-04:00
---
# Ensaio da v1.0.4 disparado às 11h35 PC (retrato 0cd94644); corretor e designer no parecer final; T-0095 fora deste build

Contexto: seu R-20261111-111606 (ensaio e nova hora). | Ensaio: CI https://github.com/aloirr/macuxifdv/actions/runs/43056675241 e stack https://github.com/aloirr/macuxifdv/actions/runs/43056704105 (branch verificacao/v104-ensaio-1). Entram: PDF v3 (coluna Item, observações, sem Alertas, espaços; testes 47/47), RD-0124 com os seus rótulos, textos do diagnóstico, estoque por filial + recusa na API com regra única, D-T0159-4/5, T-0118 (pool com 503 em 10 s) e T-0119 (busca de 20 mil sem travar a API; p95 medido neste CI). Fica fora: T-0095 (migração 0062 da ordem do ERP; consumidores ainda não usam) e o campo Observação da entrega — v1.0.5. Em paralelo: parecer final do corretor (até 12h00 PC) e do designer no PDF gerado pelo código (até 11h55). Push só com CI verde e os dois liberando. BUILD PRONTO mantido ~13h de Manaus. Pronto quando: informativo.
