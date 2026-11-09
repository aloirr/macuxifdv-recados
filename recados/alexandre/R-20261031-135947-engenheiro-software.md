---
id: R-20261031-135947-engenheiro-software
de: engenheiro-software
para: [alexandre]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0005
responde_a: R-20261031-150213-alexandre
encerra: true
contrato: null
criado_em: 2026-10-31T13:59:47-04:00
---
# Revisão do guardião do Bash: 🔴 atribuição de mudança concorrente; CI ligado

## Contexto
Revisão do guardião do Bash (.claude/hooks/guarda-bash.mjs, guarda-bash-lib.mjs, guarda-bash.test.mjs), pedida em R-20261031-150213-alexandre. Além da leitura do código, tenho evidência de uso real: nesta rodada da T-0003 rodei ~35 comandos Bash com banco-dados, modulo-pesquisa, modulo-promotor e gerente-projetos trabalhando em paralelo, e o PostToolUse me acusou 9 vezes, todas falsas (nenhum dos meus comandos tocou os arquivos acusados).

## O que preciso / o que mudou
(b) critério do PostToolUse (compararFotos) — 🔴 bloqueia o uso com agentes em paralelo
- Falsos positivos frequentes: arquivo limpo antes e alterado por OUTRO agente durante o meu comando passa no teste "data >= início da foto" e é atribuído a mim. Casos reais: `node scripts/coord.mjs caixa ...; ls` acusou modules/pesquisa/domain/{checkout,resultados}.test.ts; `pnpm view expo-image-picker dist-tags` (só leitura) acusou modules/pesquisa/domain/parametros.test.ts com "desfaça com: git restore"; `npx tsc` acusou docs/modulos/promotor/regras.md e modules/promotor/domain/checklist.test.ts com "desfaça com: git restore"; `npx vitest` acusou docs/banco/{README,core,fixture-dois-tenants}.md; `pnpm install` acusou um recado novo do banco-dados com "desfaça com: rm"; outro acusou .coord/tarefas/T-0010.md do gerente.
- Risco real: a mensagem manda o agente desfazer (git restore / rm) trabalho de outro agente, e chega como "blocking error". Um agente obediente apagaria o trabalho do colega. Não segui nenhuma (só avisei aqui).
- Comandos longos (pnpm test, 5 min) capturam tudo que o time faz na janela; não há como atribuir por data.
- Ajuste pedido: (1) só sugerir desfazer quando o arquivo acusado for ALVO EVIDENTE do comando (o mesmo analisarComando do PreToolUse, com os alvos guardados na foto); (2) mudança fora dos alvos evidentes = aviso não bloqueante (exit 0, texto "mudou durante o comando, provavelmente outro agente; não desfaça") e, se quiser, registro para o gerente; (3) nunca sugerir `rm` de recado novo de outro agente (.coord/recados/** criado por outro remetente); (4) incluir em SO_LEITURA os subcomandos de leitura do coord (caixa, ler, fio, dono, pendencias, verificar) e `pnpm view`/`npm view`, para nem tirar a foto.

(c) desfazer liberado só para acusados que estavam limpos antes — 🔴 consequência do item (b)
- A regra está certa para a escrita do próprio agente, mas hoje "limpo antes" inclui o arquivo que outro agente começou a editar durante o comando: o `git restore` liberado apaga o trabalho dele. Com o ajuste (1) do item (b), a liberação passa a valer só para alvos evidentes e fica segura.

(a) analisador de shell — 🟡
- Não tive bloqueio falso no PreToolUse nos comandos reais (heredoc, ;, &&, pipes, cd /c/..., aspas com $). Bom.
- Escrita evidente que ficou de fora (não bloqueia antes; só o PostToolUse vê): `ln`, `chmod`/`chown` (metadados), `dd of=`, `curl -o/--output`, `wget -O`, `tar -x ... -C`, `unzip -d`, `patch`, `git apply`, `git am`, `git merge`/`git pull` (só o gerente usa), `rsync`. `node -e "fs.writeFileSync(...)"`, `node script.cjs` e `python` ficam de fora por natureza (scripts) — ok deixar para o PostToolUse, mas com o item (b) resolvido.
- 🟢 `pnpm install` reescreve pnpm-lock.yaml (meu caminho): agentes que rodam install por corrida (o gerente orienta "espere e tente de novo") podem mexer no lock sem querer; vale um aviso específico.

(d) CI — 🟢 feito
- .github/workflows/ci.yml ganhou o passo `node --test .claude/hooks/guarda-bash.test.mjs` logo depois dos testes do coord. Local: 26/26 verdes (~40 s no Windows). Não rodei no Linux: se algum teste depender de caminho C:\, o CI acusa no primeiro push.

## Pronto quando
Encerrado do meu lado: 🔴 em (b) e (c) (atribuição de mudanças concorrentes e sugestão de desfazer); 🟡 em (a); 🟢 (d) feito. Os ajustes nos hooks são seus; me mande a revisão de novo quando o item (b) mudar.
