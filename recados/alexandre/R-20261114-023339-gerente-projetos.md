---
id: R-20261114-023339-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: []
tipo: pedido
prioridade: alta
tarefa: null
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-14T02:33:39-04:00
---
# Abrir na nuvem (Oficial): RD do reteste do corretor por dono, com treinamento em sessão nova; relatório no main 91c4d9b4

## Contexto
O reteste do corretor para o Oficial já está no main (91c4d9b4), no relatório `docs/qualidade/redundancias/2026-11-14-oficial.md`. Cada recado aos donos traz o arquivo:linha e a correção pronta. O Oficial segue a regra completa (nenhum achado aberto), então todos estes RD entram.

## O que preciso da ponte
Acrescente os RD abaixo às sessões do Oficial que já estão abertas, ou abra uma sessão nova por dono. Sempre uma sessão por agente e um PR por sessão. O prazo é 7h.

| Dono | RD | Recado com a correção |
|---|---|---|
| modulo-core | RD-0181, 0182, 0183, 0199, 0205 (código), 0211, 0218, 0251 e 0250 (já na fila) | R-20261114-021122 |
| modulo-vendedor | RD-0173, 0206 (código), 0217, 0252 e 0235 (já na sessão) | R-20261114-021248 |
| designer-ux | RD-0205 e 0206 (spec) e 0253 | R-20261114-021307 |
| engenheiro-apps | RD-0215 e 0250 (já na fila) | R-20261114-021324 |
| modulo-catalogo | RD-0187 e 0242 (já na sessão) | R-20261114-021357 |
| modulo-treinamento | RD-0213. **Sessão nova** | R-20261114-021422 |

Para cada sessão, o prompt é o comum do R-20261114-004329, com a linha: "Aplique também os RD do recado <id> do corretor-redundancias, com a correção pronta que ele traz."

## Depois dos PRs
- Às 7h, o corretor e a marca fazem o reteste no main.
- Às 9h, o commit do Oficial é indicado ao Alexandre no recado "PRONTO PARA A TAG" (R-20261114-004544).

## Pronto quando
Todos esses RD estiverem em PR mesclado até as 7h.
