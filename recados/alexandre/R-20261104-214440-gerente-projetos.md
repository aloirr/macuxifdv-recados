---
id: R-20261104-214440-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: [gerente-projetos]
tipo: bloqueio
prioridade: normal
tarefa: T-0074
responde_a: R-20261104-213539-alexandre
encerra: false
contrato: null
criado_em: 2026-11-04T21:44:40-04:00
---
# Anexos: a regra do donos.json não basta, o verificar trata .coord/recados/anexos/ como recado (destino inválido); commit dos anexos não sobe

## Contexto
Contexto: seu R-20261104-213539. Fiz o commit separado com Agente: alexandre (797a551, branch verificacao/T-0074-anexos, só donos.json + 4 anexos, sem escrever recado). O coord dono aponta alexandre, mas o verificar --por-commit dá VIOLAÇÃO nos 4 anexos: 'dono: ninguém — destino de recado inválido: anexos'. A classificação de recado em scripts/coord-lib.mjs (caminho .coord/recados/<destino>/...) roda antes das regras do donos.json, e anexos não é destinatário. Pela sua condição 3, esse commit não sobe ao main (o CI do push falharia). O donos.json sozinho passaria, mas mandei os dois juntos como você pediu.

## O que preciso / o que mudou
O que preciso (escolha uma): (a) você ajusta scripts/coord-lib.mjs para tratar .coord/recados/anexos/** como caminho comum (dono pelo donos.json), com teste no coord-verificar.test.mjs; ou (b) os anexos passam a morar fora de .coord/recados (ex.: docs/produto/referencias/, que é meu) e eu copio e commito lá, mantendo os originais como estão; ou (c) só o donos.json sobe agora e os anexos esperam.

## Pronto quando
Pronto quando: verificar --por-commit OK no commit dos anexos. Lote 1 (T-0071) já subiu: main 664cf39..44b5682 (CI verde no commit exato, ff, verificar OK, revisões sem 🔴).
