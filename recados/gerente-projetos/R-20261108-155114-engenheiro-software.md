---
id: R-20261108-155114-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: alta
tarefa: T-0139
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-08T15:51:14-04:00
---
# T-0139 entregue: ADR 0035, sincronizar-recados.ps1, corte/volta, Actions do repositório novo, diff de governança e passo a passo

## Contexto
T-0139: recados online no repositório privado próprio (`aloirr/macuxifdv-recados`), a partir do chat do dono do produto de 08/11 ~13h25 (R-20261108-132842-gerente-projetos). A decisão está na ADR 0035. Não criei repositório nem secrets, não li `.env`, não mexi em `.coord/recados` nem em `.coord/lidos` e não rodei o corte.

## O que fiz
**Nos meus caminhos:**
- `docs/decisoes/0035-recados-em-repositorio-proprio.md` (+ índice `docs/decisoes/README.md`): repositório separado, junções `mklink /J`, `lidos/*.txt merge=union`, sincronização, Actions, riscos e plano de volta. O histórico vai como **cópia com commit de migração** que cita o sha de origem. A justificativa está na §7: recados são imutáveis, a história fica no repositório de código, e `subtree split`/`filter-repo` levariam muitos minutos com os agentes parados.
- `scripts/sincronizar-recados.ps1` (PowerShell 5.1, sem acentos de propósito):
  - trava por mutex, timeout por comando (40 s) e prazo total (100 s), sem prompt de credencial;
  - commit `recados: sync <host> <hora>` só se houver mudança, depois `pull --rebase --autostash` e push com 3 tentativas;
  - só sobem recados novos e lidos. Recado apagado no PC volta do git, e recado alterado não sobe e fica no log;
  - em conflito, faz `rebase --abort` e sai com 2;
  - o log fica em `%LOCALAPPDATA%\Macuxi\recados-sync.log`, sem segredo.
  - **Diferença do pedido:** o commit vem antes do pull, e não depois. O resultado é o mesmo, e o autostash fica quase vazio. A explicação está na ADR §4.
- `scripts/recados/corte.ps1`, `volta.ps1`, `agendar-sincronizacao.ps1` e `comum.ps1`, todos com `-Simular`, idempotentes:
  - o corte confere se há processo `claude`, copia sem sobrescrever (para em caso de conflito), confere por hash, faz commit e push, move as pastas para um backup fora do repositório, cria as junções, roda `git rm -r --cached` e grava a marca `/.coord/recados` e `/.coord/lidos` no `.gitignore`. O commit é seu, com `Agente: alexandre`;
  - o corte também publica no repositório novo os arquivos de `docs/desenho/T-0139-repo-recados/` que faltarem;
  - a tarefa do Agendador roda a cada 2 min, só com o usuário logado, com IgnoreNew e limite de 2 min. Usa `conhost --headless`, ou `-Simples` se ele falhar. O equivalente com `schtasks` está no script e no passo a passo.
- `docs/desenho/T-0139-repo-recados/`:
  - `.github/ISSUE_TEMPLATE/recado.yml`, com os campos para, cc, tipo, prioridade, tarefa, responde_a, encerra e texto;
  - `.github/workflows/issue-recado.yml`: só aceita a conta domontecristo, não interpola o texto no shell, permissões mínimas por job, push com 5 tentativas, e fecha a issue com o link;
  - `aviso-telegram.yml`, para recados novos em `recados/alexandre/`;
  - `status-horario.yml`: cron no minuto 7, marcador no cache do Actions, sem novidade não envia;
  - `.github/scripts/*.mjs` com teste, `.gitattributes` e `README.md`;
  - os secrets ficam só no env do passo, com `::add-mask::`.
- `docs/desenho/T-0139.md` (desenho, ordem e conferência das junções) e `docs/desenho/T-0139-passo-a-passo.md` (repositório, BotFather, chat id, 2 secrets, corte, Agendador e os 3 critérios).

**Diff de governança** `docs/desenho/T-0139-governanca.diff` (base origin/main 2449afe8, `git apply --check` limpo):
- `scripts/coord-lib.mjs`:
  - `juncoesDeRecados` e `relativoPorJuncao`;
  - `estadoDosRecados` pela marca no `.gitignore`: sem marca, a regra de sempre; no commit do **corte**, a saída das pastas só pelo alexandre; com a marca já na base (**fora**), qualquer arquivo novo em `.coord/recados` ou `.coord/lidos` é violação.
- `scripts/coord.mjs`: o `verificar` (árvore, `--base`, `--por-commit` e `--por-dono`) usa o estado.
- `.claude/hooks/guarda-donos.mjs`, `guarda-bash.mjs` e `guarda-bash-lib.mjs`:
  - o caminho de verdade no clone volta a ser `.coord/recados/...`, com as mesmas regras;
  - o resto do clone fica bloqueado;
  - o git que grava no clone fica bloqueado (só leitura passa);
  - `git clean -x` com junção fica bloqueado;
  - a foto do PostToolUse inclui o `git status` do clone.
- `.claude/hooks/sincronizar-recados.mjs` (novo): hook SessionStart (espera até 40 s) e Stop (em segundo plano). Nunca bloqueia, sai na hora sem junção ou fora do Windows, e desliga com `MACUXI_RECADOS_SYNC=off`.
- `.claude/settings.json`: os hooks SessionStart e Stop, e `C:/macuxifdv-recados` em `additionalDirectories`.
- Testes novos: `.claude/hooks/guarda-juncao.test.mjs` (11) e 5 em `scripts/coord-verificar.test.mjs`.

**Conferência das junções (item 5):** o guardião e o `coord.mjs` **não** usam realpath. Pela junção, tudo segue dentro da raiz e as regras não mudam. O furo era o caminho de verdade do clone, fora da raiz e sem regra. A correção e os testes estão no diff.

## Ordem de execução
1. Você aplica o diff de governança com o ok do dono do produto (`Agente: alexandre`) e espera o CI do main ficar verde. **Isso tem que vir antes do commit do corte**, senão o `verificar --por-commit` acusa os 3,5 mil recados apagados.
2. O dono do produto faz os passos 1 a 4 do passo a passo: repositório, bot, chat id e secrets.
3. Você fecha a rodada (push, índice limpo) e para todos os agentes.
4. O dono do produto roda `corte.ps1 -Simular`, depois `corte.ps1` e `agendar-sincronizacao.ps1`.
5. Você faz o commit do corte (índice e `.gitignore` já preparados), com `Agente: alexandre` no último bloco, e o push. Depois atualiza o doc 07 e o `CLAUDE.md`:
   - § recados;
   - commit de rodada por dono: lidos e recados saem dele;
   - **recados da nuvem vão no corpo do PR** e você os transcreve;
   - `git clean -x` proibido.
6. O agente testes confere os critérios 1 a 3.

## Testes
- `scripts/recados/recados-ps.test.mjs`: **9 de 9 verdes** no Windows (em lotes, porque a máquina está carregada e o PowerShell leva cerca de 7 s para abrir). Cobrem sincronização sem clone, dois clones em paralelo sem conflito (`merge=union`), nada a fazer, conflito com abort, recado apagado e alterado, trava, sem rede, corte com simulação, idempotência e volta, e conflito no corte.
- `docs/desenho/T-0139-repo-recados/.github/scripts/recados-lib.test.mjs`: **11 de 11 verdes**. Inclui o recado do formulário lido pelo `coord.mjs caixa`/`ler` de verdade, e destinos e tipos iguais aos da coord-lib, já com o corretor-redundancias.
- Com o diff aplicado: `guarda-juncao` 11 de 11 e `coord-verificar` (5 novos) verdes. No conjunto completo de governança (`.claude/hooks/*.test.mjs`, `scripts/ci/*.test.mjs` e `coord-verificar`) com o diff: 219 verdes, 2 pulados e 3 falhas. As 3 falhas são de ambiente ("desempenho" do guardião com a máquina carregada e 2 de `gh` fora do ar) e aparecem iguais no origin/main limpo (132 de 136, com as mesmas 3).
- Lint e typecheck da raiz: **Vermelhos por arquivos de outros agentes em andamento, nenhum meu.** Meus arquivos (.ps1, scripts/*.mjs e docs) ficam fora do escopo do lint e do typecheck.
  - Lint: 18 de 19 tarefas verdes; o `//#lint:tests` acusa irregular whitespace em `tests/modulos/indicadores-valor-regra-t0124.test.ts` e `meta-de-hoje-rd0001-t0124.test.ts`, do testes.
  - Typecheck: passou do limite de 25 min com a máquina carregada; os erros vistos estão em `modules/gestor/app/index.ts` e `apps/mobile/src/components/inicio.tsx`.
- `node scripts/coord.mjs verificar engenheiro-software`: OK, sem violação.

## Riscos e pendências
- **3 min do formulário até o PC:** fica perto do limite com o PC carregado (até 2 min do Agendador, mais cerca de 30 s de sincronização, mais a Action). Se o teste passar de 3 min, o intervalo cai para 1 min.
- **Recado do formulário é `de: alexandre` legítimo:** quem tomar a conta domontecristo pode autorizar merge. O passo a passo pede 2FA nas duas contas.
- **Depois do corte, o repositório de recados não tem CI de donos.** A autoria fica garantida pelo guardião local no momento da escrita, como já era para recado não commitado.
- **Plano GitHub Free:** sem proteção de ramo em repositório privado. A defesa contra force push é a regra `deny` do settings e o bloqueio do git no clone pelo guardião.
- **`additionalDirectories` com `C:/macuxifdv-recados`** antes do corte (pasta ainda inexistente): o Claude Code deve ignorar. Se reclamar, a linha pode entrar só no commit do corte.
- **Recados abertos na minha caixa** (R-20261108-135742 T-0123-escopo, R-20261108-134932 T-0097 arquivos e outros antigos) **não foram tratados nesta tarefa**, como pedido. A T-0118 está com a outra instância.

## Pronto quando
- O dono do produto roda o corte.
- Os 3 critérios passam.
- O recado ao dono do produto sai com o sha, a ADR, os links das Actions e o passo a passo dos secrets.
