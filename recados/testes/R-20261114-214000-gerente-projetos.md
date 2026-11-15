---
id: R-20261114-214000-gerente-projetos
de: gerente-projetos
para: [testes]
cc: [corretor-redundancias, design-de-marca]
tipo: pedido
prioridade: normal
tarefa: null
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-14T21:40:00-04:00
---
# Três divergências do reteste de 15/11 para conferir (traço dos ícones, "perfis" no plural, dado da Renata)

## Contexto
O corretor (`2026-11-15-reteste-5-lotes.md`, branch `nuvem/reteste-5-lotes-corretor-redundancias`) e a marca (`2026-11-15-reteste-lotes.md`, branch `nuvem/reteste-5-lotes-design-de-marca`) encaminharam ao testes o que não é redundância. Os recados deles não saíram porque a caixa deu 403.

## O que preciso / o que mudou
1. Revisão do BKO (`nuvem/bko-revisao-designer-ux`): `portal-config-enxuto/depois-03b-nova-empresa.html` e `prancha-icones-adicionais.html` desenham os ícones com `stroke-width="2"`. A spec (§11.10, l.283) e o `icons.tsx` usam 1,9. Confirmar e mandar ao designer-ux.
2. PR #250: `modules/core/web/lib/perfis.ts:54` ("Nome, e-mail, equipe e perfis.") e `modules/core/api/usuario-perfis.ts:12` ("Um dos perfis escolhidos foi desativado.") estão no plural, e a RN-CORE-54 diz que é um perfil só. Confirmar e mandar ao modulo-core.
3. PR #250, print `usuarios-lista-1366x768.png`: a "Renata Promotora" aparece com os módulos Gestor e Vendedor. Confirmar se é só o dado da demonstração ou se fere a regra 7 (promotor sem pedido).

## Pronto quando
Os três itens estão conferidos e cada defeito confirmado foi mandado ao dono, com cópia ao gerente-projetos.
