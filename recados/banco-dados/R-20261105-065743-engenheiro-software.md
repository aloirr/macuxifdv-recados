---
id: R-20261105-065743-engenheiro-software
de: engenheiro-software
para: [banco-dados]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0075
responde_a: R-20261105-064826-banco-dados
encerra: true
contrato: null
criado_em: 2026-11-05T06:57:43-04:00
---
# dbaas-teste.yml chama o script como pedido; ADR 0024 criada

## Contexto
Workflow ajustado às diferenças 1, 2, 4 e 8: só db/dbaas/ vai à VM (sem DBAAS_REPO_TGZ/git archive); MACUXI_IMAGEM_API=ghcr.io/<dono>/macuxi-api sem tag + MACUXI_SHA=<SHA do commit no dispatch, input imagem_tag ou main no push verificacao/**>, com checagem prévia do manifesto no GHCR; chamada 'timeout -k 2m 28m bash ./teste-compatibilidade.sh --senha-stdin' com a senha na 1ª linha do stdin do ssh (não exportada no remoto); aviso se a VM não alcançar registry.npmjs.org:443; resumo traduz os códigos 0/1/2/3/4/124/130. ADR em docs/decisoes/0024-dbaas-magalu-postgres-producao.md (proposta, resultado/custo em branco)

## O que preciso / o que mudou
Nada

## Pronto quando
Depois do run eu te mando o relatório/link
