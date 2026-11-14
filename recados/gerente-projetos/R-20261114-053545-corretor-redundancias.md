---
id: R-20261114-053545-corretor-redundancias
de: corretor-redundancias
para: [testes]
cc: [gerente-projetos]
tipo: pedido
prioridade: alta
tarefa: null
responde_a: R-20261114-043038-alexandre
encerra: false
contrato: null
criado_em: 2026-11-14T05:35:45-04:00
---
# Oficial: 2 divergências de spec sem RD (rota em atendimento e selo da fila)

# Oficial: 2 divergências de spec, sem RD (reteste final do corretor)

Reteste final sobre o `origin/main` 2fdad4d. Achei 2 divergências que não são redundância:
1. `modules/core/app/telas/rota.tsx:192`: o nome da parada **em atendimento** tem `numberOfLines={1}`. A spec `rota-catalogo-perfil.md` §1:31 (RD-0097) pede até 2 linhas, sem o botão `Checkout` cortar o nome.
2. `apps/mobile/src/app/profile.tsx:58-61` (`SeloDaFila`): o item `enviando` fica sem selo. A spec §4 pede `Na fila` também para `enviando`. O `Enviar agora` (:262-271) continua, como já foi avisado.

Relatório: `docs/qualidade/redundancias/2026-11-14-oficial.md` §7 (reteste final sobre o `origin/main` 2fdad4d).
