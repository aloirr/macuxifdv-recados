---
id: R-20261031-182056-engenheiro-software
de: engenheiro-software
para: [alexandre]
cc: [gerente-projetos]
tipo: resposta
prioridade: normal
tarefa: T-0005
responde_a: R-20261031-192837-alexandre
encerra: true
contrato: null
criado_em: 2026-10-31T18:20:56-04:00
---
# CI com --por-commit e testes de todos os hooks; GitGuardian com exceção só dos testes; revisão do guardião v3 sem vermelho (2 amarelos)

## Contexto
Pedido R-20261031-192837 (CI com `--por-commit`, testes de todos os hooks e revisão do guardião v3, 5d7e317). Junto vão os outros dois itens do R-20261031-172619 que eram meus: CI e GitGuardian. O zod foi em recado próprio (R-20261031-182013).

## O que preciso / o que mudou
**CI (.github/workflows/ci.yml), feito:**
- Novo passo "verificar donos por commit (push ao main)": `if: github.event_name == 'push' && github.event.before != '000…0'`, com `ANTES`/`DEPOIS` por env e `node scripts/coord.mjs verificar --por-commit "$ANTES..$DEPOIS"`. Decisão: o push que cria o branch (ANTES = 000…0) PULA o passo. Saída 1 ou 2 falha o CI. Um force push, cujo ANTES some do histórico, cai no 2 e falha também, de propósito.
- "testes dos guardiões": `node --test .claude/hooks/*.test.mjs` (guarda-bash + guarda-agente), em todo PR e push.
- setup-node: `node-version-file: .nvmrc` (24; engines >= 24.7), uma fonte só.
- Simulação local: `node --test .claude/hooks/*.test.mjs` deu 48/48 (~2 min). `verificar --por-commit 0418178..fc0b66d` deu 5 commits conferidos, merge ignorado, saída 0.

**GitGuardian, feito:** `.gitguardian.yaml` na raiz (version 2, `secret.ignored_paths`). Ficam de fora só `apps/conector/test/**` e `modules/core/api/autenticacao.test.ts`. A verificação continua ligada no resto do repositório (exemplos, configs e código de produção incluídos). O arquivo tem a regra para crescer a lista: só teste, só valor falso, com recado.

**Revisão do guardião v3: sem 🔴.**
- 🟡 1 · `scripts/coord-lib.mjs:319-322` (identificarAgente): `MACUXI_AGENTE` vence o subagente. A variável vem do ambiente do processo do Claude Code e todo subagente a herda. Numa sessão local com `MACUXI_AGENTE=alexandre`, um `modulo-core` lançado ali vira `alexandre` e altera qualquer arquivo. Sugestão: subagente (`agent_id` presente) antes da variável; a variável só para a sessão principal.
- 🟡 2 · `coord-lib.mjs:242/246/335` (agenteDoBranch e trailer do `nuvem/*`): `alexandre` é aceito por fonte que o próprio agente declara. Basta um `git checkout -b alexandre/x` ou um commit com `Agente: alexandre` no `nuvem/*`. Na nuvem, com merge automático no verde, o `verificar --base` também aceita `alexandre` (só informativo), então nenhuma barreira sobra. Sugestão: nos hooks, `alexandre` só por `MACUXI_AGENTE` ou sessão manual; branch e trailer valem só para os agentes do time. No GitHub, PR de `alexandre/*` ou que toque `.claude/**`, `.coord/donos.json`, `scripts/coord*.mjs` ou `.github/**` sem merge automático (revisão humana obrigatória). Se quiser, eu faço a parte do `.github/` quando você decidir.
- 🟢 3 · Comentários de `guarda-donos.mjs` e `guarda-bash.mjs` ("trailer … do último commit do branch que o tem") × código (`nomes.size === 1` em todos os commits do branch). O código é o mais seguro e o README (§Identificação, item 4) já descreve o ambíguo; falta alinhar os comentários.
- 🟢 4 · Na nuvem, a sessão principal sem branch reconhecível roda `git rev-parse` + `git log` (timeout de 5 s) a cada chamada de hook. Hoje é aceitável; se ficar lento, guarde o resultado por `HEAD` num arquivo temporário.
- 🟢 5 · Mudança de comportamento: sessão manual local (sem agent_type) num branch `<agente>/T-…` agora fica restrita a esse agente (antes era liberada). Faz sentido, mas vale uma linha no doc 07 ("trabalhar no branch de um agente = trabalhar como ele").
- OK: ordem argumento > subagente > sessão local > branch; ignorar o agent_type da sessão principal na nuvem (`tipo === agentePadrao`); `PESSOAS` nos hooks; `alexandre` em `podeAlterar` sem furar sem-dono/congelado/recado; `verificarPorCommit` pulando merges e saindo com 2 em commit sem trailer.

## Pronto quando
CI e GitGuardian entram no main na subida do gerente; os achados 🟡/🟢 ficam com você (`.claude/**` e `scripts/coord*.mjs` são seus). Encerro este pedido.
