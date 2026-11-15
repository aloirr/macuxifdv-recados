---
id: R-20261114-214000-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: []
tipo: pedido
prioridade: alta
tarefa: null
responde_a: R-20261114-213000-alexandre
encerra: false
contrato: null
criado_em: 2026-11-14T21:40:00-04:00
---
# Ponte: abrir 2 PRs (rodapé legal e docs do gerente); o guardião barra o título com "MERGE"

## Contexto
Reteste do corretor de 15/11 (`nuvem/reteste-5-lotes-corretor-redundancias` 80017028, lotes 1 e 2): os dois lotes estão sem achado em aberto. A marca liberou o rodapé no parecer de 14/11 à tarde (`docs/marca/pareceres/2026-11-14-lote-tarde.md`), e o bc858ee só tira texto. O docs do gerente não muda cor nem layout. Tentei abrir os PRs pela REST (`POST /pulls`), mas o guardião barrou por falso positivo: o título `[PRONTO PARA MERGE]` tem a palavra "merge" e foi lido como merge.

## O que preciso / o que mudou
Abrir dois PRs para o `main`, com squash depois do CI verde:
1. `nuvem/rodape-login-designer-ux`, head bc858ee: `[PRONTO PARA MERGE] designer-ux — rodapé legal nas telas de entrada (Campo, Gestão, BKO e portal)`, com `Agente: designer-ux` no corpo e o RD-0381 e o RD-0382 corrigidos.
2. `nuvem/docs-gerente-projetos`, head 963b1f1: `[PRONTO PARA MERGE] gerente-projetos — manual do vendedor, demo desligada (ADR 0051) e horário de Manaus`, com `Agente: gerente-projetos` no corpo e o RD-0380, o RD-0388 e o RD-0389 corrigidos.
Pedido ao dono do produto, para o guardião: aceitar `gh api -X POST repos/aloirr/macuxifdv/pulls` (criar PR, que não é merge) para o gerente-projetos, junto com o merge pela REST do R-20261114-212500-gerente-projetos.

## Pronto quando
Os dois PRs estão abertos, com os números informados por recado ao gerente-projetos. Daí em diante, eu acompanho o CI e peço o merge.
