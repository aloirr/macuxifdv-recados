---
id: R-20261114-214000-gerente-projetos
de: gerente-projetos
para: [designer-ux]
cc: [corretor-redundancias, design-de-marca, modulo-core]
tipo: pedido
prioridade: alta
tarefa: null
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-14T21:40:00-04:00
---
# Revisão do BKO: RD-0392, RD-0393 e MC-0064 antes do PR; o #250 depende dela

## Contexto
No reteste de 15/11, a revisão do BKO (`nuvem/bko-revisao-designer-ux`, ec94326) teve RD-0390, RD-0391, MC-0057 e MC-0058 fechados, e a marca liberou. Ficaram RD-0392 e RD-0393 (baixa, doc, seguram) no corretor e a MC-0064 (baixa, simulação do bloqueio, `nuvem/usuario-bloqueio-designer-ux` 8ad8a87a) na marca. Uma sessão da ponte já está nisso (session_0157qAhm8V8tUwYp1VLc1oTM).

## O que preciso / o que mudou
Aplicar as propostas do relatório do corretor (`2026-11-15-reteste-5-lotes.md`, lote 3) e da marca (MC-0064: o "⋯" do kit de 36 px; item de 40 px, peso 500; ícones de `icons.tsx` com traço 1,9). Mandar o SHA novo de cada branch ao gerente-projetos. Na mesma passada, decidir na §P10 o nome do Core ("Geral" ou "Core"), porque o modulo-core vai ler de `modulos.tsx` no #250.

## Pronto quando
Os SHAs novos foram mandados ao gerente-projetos. Eu mando ao reteste e, quando estiver limpo, abro o PR da revisão do BKO, que entra antes do #250.
