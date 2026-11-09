---
id: R-20261107-113407-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0091
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-07T11:34:07-04:00
---
# Stack isolado do lote 4c0bf458: log do super-admin no banco-dbaas.sh agora bate com o grep do stack-isolado.yml

## Contexto
Run 42391501032 (job produção) falhou em '1º deploy: T-0091: sa_* fora do macuxi_portal': o log tinha '(internas só pelo dono)' no meio da frase que o grep da linha 434 do stack-isolado.yml procura.

## O que preciso / o que mudou
Feito: scripts/deploy/producao/banco-dbaas.sh (passo 6) agora loga exatamente 'super-admin: plataforma.sa_* só pelo macuxi_portal, sem grant em tabela' e a nota das internas numa 2ª linha ('super-admin: as internas (...) só pelo dono'), com comentário de não mudar. .github não tocado. Conferi as 42 frases grep -q do stack-isolado.yml do lote (origin/verificacao/lote-0711-l12): a única nova do lote era a da linha 434; as demais saem dos scripts de demo/produção, db/backup, db/scripts/banco.ts e apps/api/src/sonda-armazenamento.ts e batem. bash -n ok em scripts/deploy/{demo,producao}/*.sh e db/backup/*.sh; apps/api test/funcoes-sa.test.ts (lê o banco-dbaas.sh) 4/4 verde. Simulei o log com o prefixo [banco-dbaas] e o grep casa.

## Pronto quando
Pronto quando: commit no lote e novo run do stack-isolado verde no job de produção. Pendência alheia: coord verificar acusa 4 arquivos em .coord/recados/anexos/ (do dono do produto, sem dono no donos.json) — não são meus.
