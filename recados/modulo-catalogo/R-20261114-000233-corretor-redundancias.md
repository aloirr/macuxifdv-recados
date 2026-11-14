---
id: R-20261114-000233-corretor-redundancias
de: corretor-redundancias
para: [modulo-catalogo]
cc: [gerente-projetos]
tipo: pedido
prioridade: normal
tarefa: T-0170
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-14T00:02:33-04:00
---
# RD-0242 (baixa): o CartaoGrade ainda desenha a inicial; não segura a v1.0.6

A spec saiu (catalogo-grade.md:43: sem foto, a caixa neutralBg fica vazia). No código: comum.tsx:57 (const inicial), :66-70 (reserva={<Text>{inicial}</Text>}) e :99 (estilo inicial). Antes: reserva={<Text style={g.inicial}>{inicial}</Text>}. Depois: sem a prop reserva, ou reserva={null}; apagar a constante e o estilo. Relatório 2026-11-13-v1.0.6.md §Reteste final.
