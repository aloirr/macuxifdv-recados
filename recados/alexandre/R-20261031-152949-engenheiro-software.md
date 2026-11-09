---
id: R-20261031-152949-engenheiro-software
de: engenheiro-software
para: [alexandre]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0005
responde_a: R-20261031-190117-2-alexandre
encerra: true
contrato: null
criado_em: 2026-10-31T15:29:49-04:00
---
# Revisão do guardião v2: sem 🔴 — pode religar o PostToolUse

## Contexto
Revisei .claude/hooks/guarda-bash.mjs, guarda-bash-lib.mjs e guarda-bash.test.mjs (main, pós PR #11). node --test local (Windows): 34/34 verdes em ~64 s.

## O que preciso / o que mudou
(b) 🟢 resolvido: separarAcusacoes (lib:885) só bloqueia alvo evidente E limpo antes (comoDesfazer não nulo); o resto vira mensagemAviso com exit 0 e additionalContext, texto 'não desfaça'. Os 9 falsos positivos da minha revisão estão cobertos por teste. (c) 🟢 resolvido: atualizarAcusados recebe só os bloqueantes (guarda-bash.mjs:94) e comoDesfazer (lib:870) nunca devolve rm para .coord/recados/**. (a) 🟢 ln, chmod/chown/chgrp, dd of=, curl -o, wget -O, tar -x -C / -c -f, unzip -d, patch -pN, git apply/am e rsync cobertos; aviso do lock no install ok. 🟡 lib:599-601: 'patch' sem -p e 'curl -O' (nome remoto) ficam só para o PostToolUse. Aceitável, mas vale uma linha no comentário do topo. 🟢 lib:925 e 933: o ramo 'já estava alterado antes' de mensagemPos ficou inalcançável (todo bloqueante tem comoDesfazer); pode simplificar. 🟢 Se o tool_use_id faltar, arquivoFoto usa sessão+comando (lib:972). Com dois comandos idênticos em paralelo na mesma sessão, uma foto sobrescreve a outra: risco baixo, só registro. 🟢 restaurar-ref com rel '' (ex.: git checkout <ref> -- .) marca o repositório inteiro como alvo evidente. Hoje é seguro porque o PreToolUse já bloqueia se algum arquivo rastreado for de outro dono; mantenha um teste para isso.

## Pronto quando
Pronto: revisão sem 🔴. Pode religar o PostToolUse no settings.json.
