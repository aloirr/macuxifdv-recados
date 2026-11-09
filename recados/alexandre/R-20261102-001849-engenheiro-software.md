---
id: R-20261102-001849-engenheiro-software
de: engenheiro-software
para: [alexandre, gerente-projetos]
cc: []
tipo: entrega
prioridade: alta
tarefa: T-0049
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-02T00:18:49+00:00
---
# [PRONTO PARA MERGE] PR #35 T-0049 (brechas do guardião v5 no CI): conteúdo e33248c, head = commit deste recado; arquivo de governança .github/workflows/ci.yml

## [PRONTO PARA MERGE] rito de merge de governança (doc 07)
- **PR**: https://github.com/aloirr/macuxifdv/pull/35 (branch `nuvem/T-0049-brechas-guardiao`).
- **Conteúdo validado no commit `e33248cd8a933c7e5f8a416a11ac9c073ac80b6b`** (base `main` `f88a61c`). O **head do PR é o commit deste recado**, filho direto do `e33248c`, que só acrescenta este arquivo em `.coord/recados/`. O SHA de 40 caracteres do head e o resultado do `ci-ok` dele vão num comentário do PR. Sem `ci-ok` verde no head, este recado não vale.
- **Arquivos de governança e o que cada um muda:**
  - `.github/workflows/ci.yml`: o job `governanca` ganha 2 passos.
    - **Push ao `main`**: `node scripts/ci/brechas-governanca.mjs trailer "$ANTES..$DEPOIS"`. Fica vermelho se um commit do push alterar `.claude/**`, `.coord/donos.json`, `scripts/coord*.mjs` ou `.github/**` sem `Agente: alexandre` no último bloco da mensagem. Isso inclui o squash ou merge pelo MCP do GitHub.
    - **PR**: `... recados`. Reprova o PR que adiciona ou altera recado com a frase de autorização de merge do doc 07.
  - Nenhum passo, check ou condição existente foi removido ou enfraquecido. Os dois passos rodam também no escopo "só coordenação" e entram no `ci-ok`.
- **Outros arquivos** (não são de governança): `scripts/ci/brechas-governanca.mjs` e o `.test.mjs` (8 testes), adendo T-0049 na ADR 0014.
- **Testes**: `scripts/ci` 18 → 26 ✔, guardiões 75 ✔, `coord-verificar` 64 ✔, `pnpm lint` verde e `verificar engenheiro-software --base origin/main` OK. No histórico real do `main` desde o rito (`7359d9d..f88a61c`), 0 violações.
- **Para liberar o merge**: este recado aguarda a autorização do Alexandre, escrita localmente, na forma exata do doc 07, com o PR #35 e o head SHA do comentário.

## Para o gerente depois do merge
- Diário do engenheiro-software (linha da T-0049), ficha `.coord/tarefas/T-0049.md` e quadro.
- Doc 07, rito de governança: citar os dois passos novos. Avisar o time de que recado de PR não pode conter a frase de autorização, nem negada. O texto sugerido é "aguarda a autorização do Alexandre".
- Primeiro push ao `main` depois do merge: o passo do trailer roda no intervalo do push. O squash deste PR precisa do corpo `Agente: alexandre`, conforme o rito.

## Premissas e limites
- O passo do push é um **detector**: sem proteção de branch, o commit já está no `main` quando fica vermelho. O trailer é declarativo e evita erro, não fraude.
- Ficam como proposta ao Alexandre (`.claude/**` é dele): a proteção do `main` no GitHub e/ou um hook `mcp__github__merge_pull_request`.
- A frase é procurada em **qualquer** recado do PR (não só `-alexandre`), sem diferenciar maiúsculas, acentos, quebras de linha e markdown.
