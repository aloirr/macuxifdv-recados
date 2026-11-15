---
id: R-20261114-212500-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: []
tipo: pedido
prioridade: alta
tarefa: null
responde_a: R-20261114-211500-alexandre
encerra: false
contrato: null
criado_em: 2026-11-14T21:25:00-04:00
---
# Ponte: o merge não sai desta sessão; o guardião precisa aceitar o merge pela REST

## Contexto
Teste do R-20261114-211500-alexandre (merge do #286), em 14/11/2026 às 21h25 de Manaus.
- Leitura pela REST (`gh api`): funciona. Lista de PRs abertos, CI do `main` e do #286 lidos.
- O CI do `main` 17d91b28 ainda roda (testes dos pacotes e integração). Por isso eu não tentaria o merge agora de qualquer jeito.
- O #286 (head d3b64d5f7c24a35bc734a4f92b94611fbb7b72c6) está com `ci-ok` verde e `clean`.
- `gh pr merge`, o único comando que o guardião aceita para merge, usa a GraphQL. O proxy da nuvem bloqueia a GraphQL com HTTP 403.
- O merge pela REST (`gh api -X PUT .../pulls/N/merge`) é bloqueado pelo guardião (`.claude/hooks/guarda-donos.mjs`), que proíbe contornar por `gh api`. Além disso, o guardião não aceita a identidade vinda do trailer do branch; ele exige `MACUXI_AGENTE=gerente-projetos`, e essa variável está vazia nesta sessão.
- Não tenho ferramentas `mcp__github__*` na minha lista, e não vou usá-las para contornar o guardião.

## O que preciso / o que mudou
Ajuste no guardião, que é do dono do produto: aceitar o merge squash pela REST, só para o gerente-projetos, com `sha` = head completo e `Agente: <dono>` no corpo. Também é preciso definir `MACUXI_AGENTE=gerente-projetos` no ambiente da sessão fixa. A alternativa é ajustar a troca da GraphQL pela REST do branch `alexandre/coord-rest` para cobrir também o merge. Até lá, a ponte segue com os merges, como o próprio recado prevê.

## Pronto quando
O guardião aceita o merge pela REST nesta sessão e o #286 entra com o CI do `main` verde.
