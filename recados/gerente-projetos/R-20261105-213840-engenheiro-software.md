---
id: R-20261105-213840-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0075
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T21:38:40-04:00
---
# T-0075: job do @macuxi/db sem superusuário no ci.yml (aplicado) e trailer de governança no verificar --por-commit (patch pronto; o guardião bloqueou scripts/coord*.mjs)

## Contexto
T-0075 e governança, pelas autorizações do Alexandre: R-20261105-191229, item 1 (job sem superusuário no ci.yml), e R-20261105-191228, item 2 (conferência do último bloco do trailer no `verificar --por-commit`). O job vem do pedido R-20261105-111837 (banco-dados). Antes de começar, conferi que db/scripts/admin-sem-superusuario.ts e o script `admin-sem-superusuario` do db/package.json já estão no main (7f5cce8).

## O que fiz
**1. Job `testes-db-sem-superusuario` no .github/workflows/ci.yml (aplicado na árvore).**
- Runner próprio e service `pgvector/pgvector:pg16` igual ao do testes-pacotes (TZ/PGTZ UTC, healthcheck).
- Passos: preparar → `pnpm --filter @macuxi/db admin-sem-superusuario` (roda como o superusuário `postgres` do env global) → `pnpm --filter @macuxi/db test`, com `MACUXI_PG_ADMIN_USUARIO=macuxi_admin_sem_super`, `MACUXI_PG_ADMIN_SENHA=macuxi_admin_sem_super_ci` e `MACUXI_PG_ADMIN_SEM_SUPER=1`. A senha é a pública do modo e só existe no Postgres descartável do job.
- `needs: governanca`. Roda em todo escopo completo (PR, push, agendado e manual), com timeout de 25 min. Entrou no `needs` do ci-ok; no escopo coordenação fica "skipped", como os outros jobs. O cabeçalho do workflow foi atualizado.
- Checagem do YAML: não há parser YAML instalado no PC, e não instalei nada. Fiz uma checagem estrutural, que passou: sem tab, indentação par, jobs sem repetição, todo `needs` aponta para um job que existe e todo job está no ci-ok. O critério final é o CI num branch de verificação.

**2. Trailer de governança no `verificar --por-commit` (NÃO aplicado: o guardião bloqueou).**
`scripts/coord.mjs` e `scripts/coord-verificar.test.mjs` são do dono "alexandre" (padrão scripts/coord*.mjs). O guardião recusou a edição ("só o Alexandre altera este arquivo"), e não contornei o bloqueio. Deixei o patch pronto e testado numa cópia fora do repositório. Quem tem a identidade do Alexandre (a sessão manual dele ou MACUXI_AGENTE com o nome dele) aplica com `git apply <patch>`. O `git apply --check` passa no main atual (0263f9f). O patch vai inteiro no fim deste recado e também está em:
C:\Users\domon\AppData\Local\Temp\claude\b5e741428393dd6e\dcc73486-2afb-480b-ae75-9b725bb97756\scratchpad\patches\T-0075-trailer-por-commit.patch
- Sem duplicar código: o coord importa `commitsDoIntervalo` e `violacoesDeTrailer` de scripts/ci/brechas-governanca.mjs. É a mesma função do job governança do CI: mesmos caminhos, último bloco e merges inclusive (`diff-tree -c`). O brechas-governanca.mjs não muda.
- Saída: no bloco de cada commit aparece "VIOLAÇÃO do trailer de governança: altera <arquivos> e o último bloco ...". O resumo traz a lista e a orientação: o trailer do dono do produto vai junto do Co-Authored-By, sem linha em branco; commit ainda local, corrigir antes do push; commit já no main, não reescrever e avisar por recado. Sai com código 1. A regra vale também para commit de merge e para commit sem trailer (que já sai com código 2).
- Testes no arquivo existente:
  - (a) caso real do 108e18a, com a mensagem literal → código 1; o mesmo commit com as duas linhas no mesmo bloco (amend) → código 0;
  - (b) engenheiro-software, dono do .github/**, sem o trailer do dono do produto → violação; scripts/coord-lib.mjs com o trailer certo → OK; arquivo fora da governança com o trailer em bloco separado → OK.
  - Os helpers dos repositórios temporários passam a copiar também scripts/ci/brechas-governanca.mjs (`copiarScripts`), e o `blocoDoCommit` reconhece o resumo novo.
- `node --test scripts/coord-verificar.test.mjs` na cópia: a suíte inteira teve 1 falha, só no delimitador do helper. Corrigi o delimitador, e os 2 casos novos ficaram 2/2 verdes. Não rodei a suíte inteira de novo depois da correção. Recomendo rodá-la depois de aplicar o patch (uns 20 min no Windows).
- Confirmado no repositório real: `node scripts/ci/brechas-governanca.mjs trailer 108e18a~1..108e18a` sai com código 1. A regra que o coord passa a usar recusa o 108e18a.

## Grupos para os commits
**Governança**: trailer do dono do produto ("Agente: " + o nome dele) no mesmo bloco final do `Co-Authored-By`, sem linha em branco entre os dois.
- .github/workflows/ci.yml (já na árvore)
- scripts/coord.mjs (depois de aplicar o patch)
- scripts/coord-verificar.test.mjs (depois de aplicar o patch; também casa com scripts/coord*.mjs)

**Resto**: trailer `Agente: engenheiro-software`.
- .coord/diario/engenheiro-software.md (a linha desta tarefa)
- o recado desta entrega

Atenção: .coord/contratos/eventos.md e .coord/contratos/modulos.md aparecem alterados no meu `verificar`, mas NÃO são desta tarefa. São da outra instância (T-0084/T-0085) e não entram nestes grupos.

## Verificações
- `node scripts/coord.mjs verificar engenheiro-software`: OK, nenhuma violação.
- Lint: o eslint da raiz não cobre scripts/ nem .github/, e nada do que mudou está no escopo dele. O `node --check` dos dois arquivos do patch passou.
- Não rodei `pnpm lint`, `typecheck` nem `test` da raiz: nenhum pacote mudou, e o job novo só roda no CI.

## Pendências
1. O Alexandre aplica o patch e roda a suíte inteira do coord. Antes do push, `verificar --por-commit origin/main..HEAD`.
2. Branch de verificação com o ci.yml novo: o job `testes-db-sem-superusuario` precisa sair verde, que é o critério do R-20261105-111837. Se algum caso falhar só nesse modo, mando o nome e a mensagem ao banco-dados.
3. Encerro o R-20261105-111837 (banco-dados) quando o job sair verde no CI.

## Patch (scripts/coord.mjs e scripts/coord-verificar.test.mjs)
```diff
--- a/scripts/coord.mjs
+++ b/scripts/coord.mjs
@@ -36,6 +36,10 @@
 //        commit de merge é ignorado; commit sem trailer (ou com agente desconhecido ou
 //        ambíguo) → código 2 com a lista; alexandre nunca viola por dono; intervalo vazio = OK.
 //        uso no CI, no push ao main: verificar --por-commit "$ANTES..$DEPOIS".
+//        trailer de governança (a mesma regra do brechas-governanca.mjs trailer, merges inclusive): commit que
+//        altera .claude/**, .coord/donos.json, scripts/coord*.mjs ou .github/** precisa de "Agente: alexandre"
+//        no ÚLTIMO bloco da mensagem, junto do Co-Authored-By (linha em branco entre os dois = VIOLAÇÃO, código 1).
+//        Uso local antes do push: verificar --por-commit origin/main..HEAD.
 //        regra "o lock acompanha a dependência" (--base e --por-commit): pnpm-lock.yaml e
 //        allowBuilds/onlyBuiltDependencies do pnpm-workspace.yaml são aceitos para o agente quando,
 //        no mesmo PR/commit, ele alterou o package.json de um pacote que é dele; a saída lista
@@ -56,6 +60,9 @@
   PESSOAS, classificarMudancas, agruparPorDono, agenteDoBranch, agenteDosTrailers, trailersAgente,
   WORKSPACE_PNPM, workspaceMudouSoEmBuilds, mudancasDeGovernanca, CAMINHOS_DE_GOVERNANCA,
 } from './coord-lib.mjs';
+// Mesma regra (e mesmo código) do job governança do CI (brechas-governanca.mjs trailer): commit que altera caminho de
+// governança só com "Agente: alexandre" no ÚLTIMO bloco da mensagem (R-20261105-191228).
+import { commitsDoIntervalo, violacoesDeTrailer } from './ci/brechas-governanca.mjs';
 
 const PASTA = join(RAIZ, '.coord', 'recados');
 const [, , cmd, ...resto] = process.argv;
@@ -274,6 +281,7 @@
 const TITULO_ACOMPANHANDO = 'Lock acompanhando dependência (aceito — revisão do engenheiro-software)';
 const DECLARADA_TRAILER = 'identidade alexandre declarada por trailer';
 const DECLARADA_BRANCH = 'identidade alexandre declarada por branch';
+const TITULO_TRAILER = 'VIOLAÇÃO do trailer de governança';
 
 function imprimirLista(tituloSecao, itens, fmt) {
   if (!itens.length) return;
@@ -325,14 +333,29 @@
     console.log('\nResultado: OK — nenhum commit no intervalo.');
     process.exit(0);
   }
+  let trailerRuim;
+  try {
+    trailerRuim = new Map(violacoesDeTrailer(commitsDoIntervalo(`${de}..${ate}`, RAIZ)).map((v) => [v.sha, v]));
+  } catch (e) {
+    erroUso(`falha no git ao conferir o trailer de governança (${String(e.stderr || e.message).trim().split('\n')[0]})`, false);
+  }
   const semAgente = [];
   const comViolacao = [];
+  const comTrailerRuim = [];
   const declarados = [];
   const acompanhando = [];
   let conferidos = 0;
+  /** Governança sem "Agente: alexandre" no último bloco: vale para todo commit, merge e sem trailer inclusive. */
+  const conferirTrailer = (c) => {
+    const v = trailerRuim.get(c.sha);
+    if (!v) return;
+    const declarado = v.agentes.length ? `o último bloco declara "Agente: ${v.agentes.join('", "Agente: ')}"` : 'o último bloco não tem "Agente: alexandre"';
+    console.log(`   ${TITULO_TRAILER}: altera ${v.arquivos.join(', ')} e ${declarado}`);
+    comTrailerRuim.push({ ...c, arquivos: v.arquivos });
+  };
   for (const c of commits) {
     const cab = `\n== ${c.curto} ${c.assunto}`;
-    if (c.merge) { console.log(`${cab}\n   commit de merge — ignorado`); continue; }
+    if (c.merge) { console.log(`${cab}\n   commit de merge — ignorado (só o trailer de governança é conferido)`); conferirTrailer(c); continue; }
     const nomes = trailersAgente(c.corpo);
     const invalidos = nomes.filter((n) => !PESSOAS.includes(n));
     if (!nomes.length || invalidos.length || nomes.length > 1) {
@@ -340,6 +363,7 @@
         : invalidos.length ? `trailer "Agente: ${invalidos.join(', ')}" não é um agente do time`
           : `agente ambíguo: ${[...nomes].sort().join(', ')}`;
       console.log(`${cab}\n   ERRO: ${motivo}`);
+      conferirTrailer(c);
       semAgente.push({ ...c, motivo });
       continue;
     }
@@ -360,6 +384,7 @@
     imprimirLista('  Outros donos (informativo — alexandre pode alterar)', r.outros, (i) => ` → ${i.dono}`);
     imprimirLista('  VIOLAÇÃO', r.violacoes, (i) => ` → dono: ${i.dono} — ${i.motivo}`);
     if (r.violacoes.length) comViolacao.push({ ...c, agente, n: r.violacoes.length });
+    conferirTrailer(c);
   }
   if (declarados.length) {
     console.log(`\nAtenção: ${DECLARADA_TRAILER} em ${declarados.length} commit(s) (o CI de governança cobre o resto):`);
@@ -373,13 +398,23 @@
     console.log(`\nVIOLAÇÃO em ${comViolacao.length} commit(s):`);
     for (const c of comViolacao) console.log(`  ${c.curto} (${c.agente}) — ${c.n} arquivo(s) fora das regras`);
   }
+  if (comTrailerRuim.length) {
+    console.log(`\n${TITULO_TRAILER} em ${comTrailerRuim.length} commit(s): caminho de governança sem "Agente: alexandre" no último bloco:`);
+    for (const c of comTrailerRuim) console.log(`  ${c.curto} ${c.assunto} — ${c.arquivos.join(', ')}`);
+    console.log('  "Agente: alexandre" vai no ÚLTIMO bloco da mensagem, junto do Co-Authored-By, sem linha em branco entre os dois');
+    console.log('  (o job governança do CI recusa o mesmo no push ao main). Commit ainda local: corrija a mensagem antes do push.');
+    console.log('  Já no main: não reescreva o histórico; avise o gerente-projetos e o Alexandre por recado.');
+  }
   if (semAgente.length) {
     console.error(`\nErro: ${semAgente.length} commit(s) sem agente identificável pelo trailer "Agente: <nome>":`);
     for (const c of semAgente) console.error(`  ${c.curto} ${c.assunto} — ${c.motivo}`);
     process.exit(2);
   }
-  if (comViolacao.length) {
-    console.log(`\nResultado: VIOLAÇÃO — ${comViolacao.length} de ${conferidos} commit(s) conferido(s).`);
+  if (comViolacao.length || comTrailerRuim.length) {
+    const partes = [];
+    if (comViolacao.length) partes.push(`${comViolacao.length} de ${conferidos} commit(s) conferido(s)`);
+    if (comTrailerRuim.length) partes.push(`${comTrailerRuim.length} commit(s) com o trailer de governança fora do último bloco`);
+    console.log(`\nResultado: VIOLAÇÃO — ${partes.join('; ')}.`);
     process.exit(1);
   }
   console.log(`\nResultado: OK — ${conferidos} commit(s) conferido(s), nenhuma violação.`);
--- a/scripts/coord-verificar.test.mjs
+++ b/scripts/coord-verificar.test.mjs
@@ -46,6 +46,13 @@
   git(dir, 'add', '-A');
   git(dir, 'commit', '-q', '-m', msg);
 }
+/** scripts/coord.mjs, coord-lib.mjs e ci/brechas-governanca.mjs (o coord usa a regra do trailer do CI) no repositório `dir`. */
+function copiarScripts(dir) {
+  mkdirSync(join(dir, 'scripts', 'ci'), { recursive: true });
+  copyFileSync(join(AQUI, 'coord.mjs'), join(dir, 'scripts', 'coord.mjs'));
+  copyFileSync(join(AQUI, 'coord-lib.mjs'), join(dir, 'scripts', 'coord-lib.mjs'));
+  copyFileSync(join(AQUI, 'ci', 'brechas-governanca.mjs'), join(dir, 'scripts', 'ci', 'brechas-governanca.mjs'));
+}
 
 /** Repositório com main + 1 commit contendo scripts, donos, um recado e arquivos de cada dono. */
 function criarRepo() {
@@ -55,9 +62,7 @@
   git(dir, 'config', 'user.name', 'Teste');
   git(dir, 'config', 'user.email', 'teste@exemplo.invalid');
   git(dir, 'config', 'commit.gpgsign', 'false');
-  mkdirSync(join(dir, 'scripts'));
-  copyFileSync(join(AQUI, 'coord.mjs'), join(dir, 'scripts', 'coord.mjs'));
-  copyFileSync(join(AQUI, 'coord-lib.mjs'), join(dir, 'scripts', 'coord-lib.mjs'));
+  copiarScripts(dir);
   escrever(dir, '.coord/donos.json', JSON.stringify(DONOS, null, 2));
   escrever(dir, '.coord/recados/testes/R-20261031-000000-modulo-core.md', RECADO);
   escrever(dir, 'modules/core/a.ts');
@@ -368,9 +373,7 @@
   git(dir, 'config', 'user.name', 'Teste');
   git(dir, 'config', 'user.email', 'teste@exemplo.invalid');
   git(dir, 'config', 'commit.gpgsign', 'false');
-  mkdirSync(join(dir, 'scripts'));
-  copyFileSync(join(AQUI, 'coord.mjs'), join(dir, 'scripts', 'coord.mjs'));
-  copyFileSync(join(AQUI, 'coord-lib.mjs'), join(dir, 'scripts', 'coord-lib.mjs'));
+  copiarScripts(dir);
   escrever(dir, '.coord/donos.json', DONOS_REAIS);
   escrever(dir, RECADO_ENG, RECADO.replaceAll('modulo-core', 'engenheiro-software'));
   for (const f of [
@@ -769,7 +772,7 @@
   const i = saida.indexOf(`== ${sha}`);
   assert.ok(i >= 0, `commit ${sha} não aparece na saída:\n${saida}`);
   const resto = saida.slice(i);
-  const fim = resto.slice(3).search(/\n== |\nVIOLAÇÃO em |\nResultado:/);
+  const fim = resto.slice(3).search(/\n== |\nVIOLAÇÃO (?:em|do trailer) |\nResultado:/);
   return fim < 0 ? resto : resto.slice(0, fim + 3);
 }
 
@@ -1018,6 +1021,67 @@
   assert.match(rodar(dir, ['verificar', '--base', 'main']).saida, /Atenção: identidade alexandre declarada por branch/);
 });
 
+// ───── --por-commit × trailer de governança (R-20261105-191228): a regra do brechas-governanca.mjs trailer antes do push ─────
+
+/** Mensagem do 108e18a como está no main: "Agente: alexandre", linha em branco e só depois o Co-Authored-By. */
+const MSG_108E18A = [
+  'T-0075: dbaas-teste com job imagem (alvo teste-db publicado no GHCR com a tag do commit; a VM baixa e apaga no fim), saída 5 como aviso (aprovado só com plano B) e input suite — autorizado pelo dono do produto para a T-0075',
+  '',
+  'Agente: alexandre',
+  '',
+  'Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>',
+  '',
+].join('\n');
+/** O mesmo commit com as duas linhas no mesmo bloco final (o que o CI aceita). */
+const MSG_108E18A_CORRIGIDA = MSG_108E18A.replace('Agente: alexandre\n\nCo-Authored-By', 'Agente: alexandre\nCo-Authored-By');
+
+test('--por-commit: caso real do 108e18a (governança com "Agente: alexandre" fora do último bloco) → VIOLAÇÃO, código 1', () => {
+  const dir = criarRepoReal();
+  const inicio = git(dir, 'rev-parse', 'HEAD').trim();
+  escrever(dir, '.github/workflows/dbaas-teste.yml', 'on: workflow_dispatch\n');
+  commitar(dir, MSG_108E18A);
+  const sha = git(dir, 'rev-parse', '--short', 'HEAD').trim();
+  const r = rodar(dir, ['verificar', '--por-commit', `${inicio}..HEAD`]);
+  assert.equal(r.codigo, 1, r.tudo);
+  const bloco = blocoDoCommit(r.saida, sha);
+  assert.match(bloco, /agente: alexandre \(trailer\)/, 'o agente vem do trailer em qualquer bloco; o último bloco é outra regra');
+  assert.match(bloco, /VIOLAÇÃO do trailer de governança: altera \.github\/workflows\/dbaas-teste\.yml e o último bloco não tem "Agente: alexandre"/);
+  assert.match(r.saida, new RegExp(`VIOLAÇÃO do trailer de governança em 1 commit\\(s\\)[^\\n]*\\n  ${sha} T-0075: dbaas-teste[^\\n]* — \\.github/workflows/dbaas-teste\\.yml`));
+  assert.match(r.saida, /junto do Co-Authored-By, sem linha em branco entre os dois/);
+  assert.match(r.saida, /Resultado: VIOLAÇÃO — 1 commit\(s\) com o trailer de governança fora do último bloco\./);
+
+  // O mesmo commit com "Agente: alexandre" e Co-Authored-By no mesmo bloco final passa.
+  git(dir, 'commit', '-q', '--amend', '-m', MSG_108E18A_CORRIGIDA);
+  const corrigido = git(dir, 'rev-parse', '--short', 'HEAD').trim();
+  const ok = rodar(dir, ['verificar', '--por-commit', `${inicio}..HEAD`]);
+  assert.equal(ok.codigo, 0, ok.tudo);
+  assert.match(blocoDoCommit(ok.saida, corrigido), /agente: alexandre \(trailer\)/);
+  assert.doesNotMatch(ok.saida, /VIOLAÇÃO/);
+  assert.match(ok.saida, /Resultado: OK — 1 commit\(s\) conferido\(s\), nenhuma violação/);
+});
+
+test('--por-commit: trailer de governança vale para todo agente e todo caminho de governança; fora da governança o bloco não importa', () => {
+  const dir = criarRepoReal();
+  const inicio = git(dir, 'rev-parse', 'HEAD').trim();
+  // Dono do arquivo (engenheiro-software é dono do .github/**), mas governança exige "Agente: alexandre" no último bloco.
+  escrever(dir, '.github/workflows/ci.yml', 'on: push\n');
+  const eng = commitarComo(dir, 'engenheiro-software', 'T-0075: job novo');
+  // scripts/coord*.mjs com o trailer certo no último bloco: OK.
+  escrever(dir, 'scripts/coord-lib.mjs', readFileSync(join(dir, 'scripts', 'coord-lib.mjs'), 'utf8') + '\n');
+  commitar(dir, 'T-0005: coord\n\nCorpo.\n\nAgente: alexandre\nCo-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>');
+  const bom = git(dir, 'rev-parse', '--short', 'HEAD').trim();
+  // Fora da governança, o trailer em bloco separado não é desta regra.
+  escrever(dir, 'modules/core/app/lib/cargas.ts', 'core\n');
+  commitar(dir, 'T-0003: core\n\nAgente: modulo-core\n\nCo-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>');
+  const core = git(dir, 'rev-parse', '--short', 'HEAD').trim();
+  const r = rodar(dir, ['verificar', '--por-commit', `${inicio}..HEAD`]);
+  assert.equal(r.codigo, 1, r.tudo);
+  assert.match(blocoDoCommit(r.saida, eng), /VIOLAÇÃO do trailer de governança: altera \.github\/workflows\/ci\.yml e o último bloco declara "Agente: engenheiro-software"/);
+  assert.doesNotMatch(blocoDoCommit(r.saida, bom), /VIOLAÇÃO/);
+  assert.doesNotMatch(blocoDoCommit(r.saida, core), /VIOLAÇÃO/);
+  assert.match(r.saida, new RegExp(`em 1 commit\\(s\\)[^\\n]*\\n  ${eng} T-0075: job novo — \\.github/workflows/ci\\.yml\\n`));
+});
+
 test('v4 governanca --base: sai 1 com a lista quando o diff mexe em .claude/**, donos.json, scripts/coord*.mjs ou .github/**', () => {
   const casos = [
     ['.claude/hooks/guarda-donos.mjs'],
```
