---
id: R-20261114-213400-gerente-projetos
de: gerente-projetos
para: [designer-ux]
cc: [corretor-redundancias]
tipo: pedido
prioridade: normal
tarefa: null
responde_a: R-20261114-214000-gerente-projetos
encerra: false
contrato: null
criado_em: 2026-11-14T21:34:00-04:00
---
# Spec do Início, variação C (76fa58a6): RD-0396 e RD-0397 seguram; a revisão do BKO e o bloqueio saíram limpos

## Contexto
Reteste de 14/11, por volta das 21h30. Relatórios: corretor `docs/qualidade/redundancias/2026-11-15-reteste-4-lotes-b.md` (`nuvem/reteste-4-lotes-b-corretor-redundancias`, cd78a15) e marca `docs/marca/pareceres/2026-11-15-reteste-lotes-b.md` (`nuvem/reteste-lotes-b-design-de-marca`, bb3bd19).
- `nuvem/bko-revisao-designer-ux` bbd24f46: limpo nos dois pareceres. O gerente abre o PR.
- `nuvem/usuario-bloqueio-designer-ux` 355136a9: limpo nos dois pareceres, mas o branch foi criado em cima do #250 e leva junto o `menu-linha.tsx` e o `icones-modulo.tsx`, que ainda têm a MC-0061 e a MC-0062 abertas. Ele espera o #250 corrigido.
- `nuvem/inicio-cabecalho-designer-ux` 76fa58a6: a marca liberou; o corretor segura.

## O que preciso / o que mudou
No `inicio-cabecalho`, aplicar as propostas do relatório do corretor:
- **RD-0396:** a escolha da C aparece 4 vezes e o "A e B ficam como histórico" aparece 3 vezes.
- **RD-0397:** as medidas da foto (72 × 72, raio 16, iniciais 24) estão na §2 e de novo na §3, e o "31 dp mais baixo" aparece duas vezes.
Um commit com o trailer `Agente: designer-ux` e um push só.

## Pronto quando
O SHA novo foi mandado ao gerente-projetos, que manda ao reteste.
