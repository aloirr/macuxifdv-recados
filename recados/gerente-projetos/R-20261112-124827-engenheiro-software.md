---
id: R-20261112-124827-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: [alexandre]
tipo: entrega
prioridade: normal
tarefa: T-0169
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-12T12:48:27-04:00
---
# T-0169: patch de governança do agente design-de-marca pronto (docs/desenho/T-0169-design-de-marca.diff)

## Contexto
T-0169: instalar o agente design-de-marca. A autorização do dono do produto está nos recados R-20261112-065523 e R-20261112-065914. Preparei o patch de governança numa worktree temporária, a partir de origin/main (71b35404). Não alterei nada de governança no repositório e não fiz commit no main.

## Patch
`docs/desenho/T-0169-design-de-marca.diff` (`git diff --binary origin/main`, 6 arquivos, +240 −1). Ele aplica limpo com `git apply --check --cached`, tanto em origin/main quanto no índice local atual.
- `.claude/agents/design-de-marca.md` (novo), idêntico ao anexo 2026-11-12-agente-design-de-marca.md (conferido com cmp).
- `.claude/skills/design-de-marca/SKILL.md` (novo), idêntico ao anexo 2026-11-12-skill-design-de-marca.md (conferido com cmp).
- `.coord/donos.json`: `.coord/diario/design-de-marca.md` entra antes de `.coord/**`, logo depois do diário do corretor; `docs/marca/**` entra antes de `docs/**`. As duas regras têm dono design-de-marca.
- `scripts/coord-lib.mjs`: `design-de-marca` entra em AGENTES, com um comentário citando a T-0169. PESSOAS e DESTINOS derivam de AGENTES.
- `scripts/coord-verificar.test.mjs`: dois testes novos para a T-0169, no padrão da T-0123. Eles conferem os donos reais, o podeAlterar com Write e Edit, os bloqueios com o dono e a dica do recado, o recado em nome de outro e o `verificar` acusando a escrita fora de `docs/marca/**`.
- `.claude/hooks/guarda-agente.test.mjs`: um teste novo do hook para a T-0169 cobrindo subagente, nuvem e sessão sem agent_id, com Edit, Write e Bash, dentro e fora de `docs/marca/**`.

O guardião não precisa de caso especial. Os hooks usam PESSOAS e donos.json, então a lista e as regras bastam. Nenhum teste nem hook fixa a contagem de agentes.

## Testes (na worktree)
- `node --test scripts/coord-*.test.mjs .claude/hooks/*.test.mjs`: 239 testes, 234 passaram, 2 foram pulados e 3 falharam. Os 3 testes novos da T-0169 passaram.
  - As 3 falhas são de tempo e de gh nesta máquina carregada: "desempenho: Pre e Post abaixo de 2,5 s" (guarda-bash), "v6 mcp: consultarPrRest — gh fora do ar…" (guarda-merge-mcp) e "hook v5: gh fora do ar…" (guarda-merge).
  - Elas falham igual numa worktree limpa de origin/main, sem o patch. Portanto já existiam e não vêm deste patch. Vale conferir no CI.
- `node --test scripts/ci/brechas-governanca.test.mjs`: 8 de 8 passaram.
- `node scripts/ci/brechas-governanca.mjs recados origin/main HEAD`: 0 achados, saída 0.
- `node scripts/ci/brechas-governanca.mjs trailer origin/main..HEAD`, num commit descartável SEM o trailer: saída 1, como esperado. O caso com `Agente: alexandre` não pude ensaiar, porque o guardião bloqueia, e com razão, um agente gravando esse trailer. Esse caso positivo fica com o rito do gerente.
- `node scripts/coord.mjs verificar alexandre --base origin/main`: OK nos 6 arquivos, nenhuma violação.

## Pendências
- O gerente aplica o patch pelo rito, com índice temporário, `git apply --cached`, o trailer `Agente: alexandre` e a citação de R-20261112-065523 e R-20261112-065914. Depois roda `brechas-governanca trailer` no intervalo.
- O critério 5 (regra no CLAUDE.md e no doc 07) não está no patch: é caminho do gerente.
- As worktrees temporárias foram removidas.
