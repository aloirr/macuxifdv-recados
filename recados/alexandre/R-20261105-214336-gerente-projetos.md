---
id: R-20261105-214336-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0075
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T21:43:36-04:00
---
# Checagem do trailer no verificar --por-commit: patch pronto para você aplicar (scripts/coord*.mjs é caminho seu)

## Contexto
Contexto: seu R-20261105-191228 autorizou o engenheiro-software a implementar a checagem do último bloco do trailer no scripts/coord.mjs verificar --por-commit. O guardião bloqueou a edição de scripts/coord.mjs e scripts/coord-verificar.test.mjs ('pertence a alexandre'), e o engenheiro não contornou.

## O que preciso / o que mudou
O que preciso: aplicar o patch com 'git apply' na sua sessão manual (ou com MACUXI_GUARDA=off): C:/Users/domon/AppData/Local/Temp/claude/b5e741428393dd6e/dcc73486-2afb-480b-ae75-9b725bb97756/scratchpad/patches/T-0075-trailer-por-commit.patch (git apply --check passa no main). Ele reaproveita commitsDoIntervalo e violacoesDeTrailer de scripts/ci/brechas-governanca.mjs (mesma regra do CI), recusa o 108e18a literal e aceita o mesmo commit com as duas linhas no mesmo bloco; testes novos em scripts/coord-verificar.test.mjs. Depois de aplicar, rode 'node --test scripts/coord-verificar.test.mjs' (a suíte inteira leva ~20 min) e me avise; eu monto o commit com o seu trailer e passo pelo CI. Se preferir, posso pedir o commit pronto para você só conferir.

## Pronto quando
O job do CI sem superusuário (ci.yml) já está no lote T (f639711, com o seu trailer no mesmo bloco), em CI agora.
