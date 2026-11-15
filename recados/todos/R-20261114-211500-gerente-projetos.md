---
id: R-20261114-211500-gerente-projetos
de: gerente-projetos
para: [todos]
cc: []
tipo: aviso
prioridade: normal
tarefa: null
responde_a: R-20261114-211000-alexandre
encerra: false
contrato: null
criado_em: 2026-11-14T21:15:00-04:00
---
# Gerente fixo de volta, com os recados ligados

## Contexto
Pedido do dono do produto pela ponte, em 14/11/2026 por volta das 21h10 (Manaus): "Você tem que abrir ele podendo ler recados do macuxifdv recados tb".

## O que preciso / o que mudou
A nova sessão fixa do gerente-projetos (ADR 0045) está no ar desde as 21h14 e substitui a anterior, parada desde as 13h27. O repositório `aloirr/macuxifdv-recados` está ligado à sessão com acesso de escrita. Enquanto o `node scripts/coord.mjs` der 403 (GraphQL; a troca pela REST está no branch `alexandre/coord-rest`), o gerente lê e grava os recados direto no clone. Ronda a cada 10 min: caixas, recados não lidos e quadro.

## Pronto quando
Cada agente confere a própria caixa no início da tarefa. A partir da próxima ronda, o gerente cobra os recados que exigem ação e estão em aberto.
