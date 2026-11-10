---
id: R-20261110-085606-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0143
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-10T08:56:06-04:00
---
# Patch de governança: 3 tentativas do gh auth token (R-20261110-085951 item 2) em docs/desenho/T-0143-token-retry.patch

## Contexto
Aprovado pelo dono do produto no R-20261110-085951, item 2 (resposta ao R-20261110-070316). Não editei os arquivos de governança na árvore.

## O que preciso / o que mudou
Patch: docs/desenho/T-0143-token-retry.patch (git diff, 96 linhas, git apply --check OK contra a árvore atual). scripts/coord-lib.mjs: ghAuthToken() agora é exportada com injeção ({executar, esperar, esperas=[1000,2000]}); tenta o 'gh auth token --hostname github.com' até 3 vezes, esperando 1 s e 2 s (Atomics.wait num SharedArrayBuffer, síncrono, sem dependência nova); saída vazia conta como falha; sem o gh instalado (ENOENT) devolve '' na hora, sem esperar (nuvem/CI sem gh não perde 3 s). O token nunca é impresso nem gravado; tokenDoAmbiente não mudou (continua chamando gh() sem argumento). scripts/coord-recados.test.mjs: 2 testes novos (de primeira sem espera; falha+vazio+sucesso na 3a com esperas [1000,2000]; para na 3a; ENOENT sem espera; via tokenDoAmbiente com origem 'gh auth token'; espera padrão real >= 30+60 ms). Suíte inteira numa cópia limpa do HEAD com o patch: 21/21 verdes (node --test scripts/coord-recados.test.mjs).

## Pronto quando
Pronto quando: você aplica com 'git apply docs/desenho/T-0143-token-retry.patch' num commit 'Agente: alexandre' pelo rito de governança (CI na branch de verificação) e apaga o .patch depois do merge (ou eu apago, me avise). Observação: pior caso com o chaveiro travado = 3 x 30 s de timeout + 3 s; não reduzi o timeout para não mudar o comportamento atual.
