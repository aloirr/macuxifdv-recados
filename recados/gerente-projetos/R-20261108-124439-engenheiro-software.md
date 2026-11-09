---
id: R-20261108-124439-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0123
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-08T12:44:39-04:00
---
# T-0123: diff de governança do corretor-redundancias (docs/desenho/T-0123-governanca.diff) + jscpd/knip na raiz

## Contexto
T-0123 (Frente A do teste de campo de 08/11, R-20261108-101838-gerente-projetos): criar o agente corretor-redundancias. As mudanças de governança vão num diff para você aplicar no worktree de PR com o trailer do dono do produto (doc 07 §3). Desenho: docs/desenho/T-0123.md.

## O que preciso / o que mudou
**1. Diff de governança: `docs/desenho/T-0123-governanca.diff`** (sha256 e6acb751…3dd049), gerado contra o origin/main 52267cef (git archive) e não contra o working tree local, que está desatualizado nesses arquivos.
- `.claude/agents/corretor-redundancias.md` (novo): texto do Anexo sem nenhuma mudança (cmp byte a byte com o arquivo do despacho), `model: opus`.
- `.coord/donos.json`: `docs/qualidade/redundancias/**` → corretor-redundancias (antes de `docs/**`) e `.coord/diario/corretor-redundancias.md` → corretor-redundancias (antes de `.coord/**`).
- `scripts/coord-lib.mjs`: `corretor-redundancias` em `AGENTES`, e por isso também em `PESSOAS` e `DESTINOS`. Ele vale como remetente e destinatário no enviar, caixa, lido e verificar, no nome do recado, no trailer `Agente:` e no branch `corretor-redundancias/T-nnnn`. A pasta `.coord/recados/corretor-redundancias/` é criada no primeiro `enviar`. Não pus `.gitkeep`, porque o verificar o acusaria como recado sem remetente.
- `scripts/coord-verificar.test.mjs`: 3 testes T-0123.
  - donos reais + podeAlterar: Write/Edit liberados no relatório, no catálogo, no diário e nos lidos dele. Bloqueados: modules/core, modules/vendedor, packages/ui, docs/produto, docs/qualidade fora de redundancias, quadro, donos.json, .claude e coord.mjs, e também recado em nome de outro.
  - `verificar --base`: acusa a escrita dele em modules/core.
  - **recado de ida e volta pela CLI**: caixa vazia → enviar engenheiro-software→corretor → caixa com 1 pedido → resposta `--responde-a --encerra` (cc gerente) → caixa vazia; depois fio, lido e verificar sem violação.
- `.claude/hooks/guarda-agente.test.mjs`: 1 teste com os hooks de verdade (guarda-donos e guarda-bash), como subagente local, na nuvem e sem agent_id. O Write e o Bash dele fora de `docs/qualidade/redundancias/**` são bloqueados, com a dica do recado ao dono. Dentro dessa pasta, no diário e em recado novo, passam.
- Não precisei mudar o guarda-donos.mjs nem o guarda-bash-lib.mjs: os dois usam `PESSOAS`/`podeAlterar` da coord-lib. O frontmatter do Anexo não tem `hooks:`, mas o hook global do settings.json identifica o subagente por `agent_type`.

**2. Fora do diff (meus caminhos, working tree local):**
- `package.json`: devDependencies exatas `jscpd` 5.4.2 e `knip` 6.44.2, e os scripts `redundancia:codigo` (`jscpd --config .jscpd.json apps modules packages scripts db tests`) e `redundancia:mortos` (`knip --no-exit-code`). Usei a 5.4.2 porque a 5.4.3 saiu hoje e esbarra no minimumReleaseAge de 24 h.
- `pnpm-lock.yaml`: veio de `pnpm install --lockfile-only`, que só acrescentou linhas e não removeu nenhuma; o `--frozen-lockfile --lockfile-only` passa. Não rodei `pnpm install` para não mexer no node_modules com 7 agentes ativos. **Rode `pnpm install` no início da próxima rodada**; até lá, o `pnpm run` só mostra o aviso do verifyDepsBeforeRun.
- `.jscpd.json` e `knip.json` (novos) e `.gitignore` (`.redundancia/`, onde fica o relatório do jscpd).
- Medição com as mesmas versões (pnpm dlx): jscpd com 662 clones, 2,07% de linhas duplicadas, ~40 s. knip com 13 arquivos sem uso (eram 81 sem a configuração), 220 exports sem uso e 50 dependências não declaradas. Os dois saem com 0: são relatórios. Nenhum workflow, turbo.json ou check obrigatório os chama. Não fiz ADR: são ferramentas leves, só de leitura.
- `docs/desenho/T-0123.md`.

## Pronto quando
Verificação, já feita por mim e para você repetir no worktree de PR:
1. `git apply --check docs/desenho/T-0123-governanca.diff`: limpo contra uma cópia exata do origin/main e também em `git -C C:/macuxifdv-pr apply --check`. Aplicado na cópia, reproduz a árvore testada; a única diferença é o CRLF do git apply fora do repositório.
2. `node --test scripts/coord-verificar.test.mjs .claude/hooks/guarda-agente.test.mjs .claude/hooks/guarda-bash.test.mjs .claude/hooks/guarda-recado.test.mjs .claude/hooks/guarda-gh.test.mjs .claude/hooks/guarda-merge.test.mjs .claude/hooks/guarda-merge-mcp.test.mjs` na cópia com o diff: 173 passam, 2 pulados e 3 falham. As 3 falhas acontecem igual sem o diff, só nesta máquina: 2 testes de "gh fora do ar" (o gh real responde) e o de desempenho do guarda-bash (máquina carregada). Os 4 testes T-0123 passam.
3. `node scripts/coord.mjs verificar engenheiro-software`: OK, sem violação.
4. `pnpm lint` e `pnpm typecheck` da raiz no working tree local: saída 0 nos dois (19/19 tarefas no turbo; fronteiras com 0 erros).
Outro ponto: o pnpm-lock.yaml local já tinha diferenças em relação ao HEAD antes desta tarefa (links de workspace do Promotor→Catálogo e do Vendedor→Integração, que batem com os package.json locais). Eu só acrescentei jscpd e knip.
Depois do merge, o critério 4 da tarefa se confere com `node scripts/coord.mjs caixa corretor-redundancias` (deve mostrar "nada pendente") e com um recado de teste de ida e volta.
