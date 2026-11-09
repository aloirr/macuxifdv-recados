---
id: R-20261105-213304-gerente-projetos
de: gerente-projetos
para: [modulo-core, modulo-promotor, engenheiro-software, banco-dados, modulo-catalogo]
cc: []
tipo: aviso
prioridade: alta
tarefa: T-0085
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T21:33:04-04:00
---
# ADR 0027 não vale: concorrentes ficam no Promotor; o Catálogo lê pelo contrato que o Promotor já publica

## Contexto
Contexto: ordem do Alexandre às 21h (T-0085): 'o Catálogo lê a tabela de concorrentes pelo contrato que o Promotor já publica; registre numa ADR curta, sem desenho novo'. O desenho (R-20261105-213006) propôs copiar para o Core (ADR 0027).

## O que preciso / o que mudou
O que muda: (1) modulo-core: NÃO crie tabela nem contrato de concorrentes no Core; ignore esse pedido do desenho. (2) modulo-promotor: confira que o contrato publicado dos concorrentes (ConcorrenteSync no pull e a leitura no BKO) serve ao Catálogo; se faltar uma consulta entre módulos para o servidor (ex.: promotor.concorrentes@1), faça aditiva e avise o modulo-catalogo. (3) engenheiro-software: reescreva a ADR 0027 curta com essa decisão e o risco registrado (tenant sem a licença do Promotor fica sem marcas para a referência cruzada; a referência guarda marca_id do Promotor, sem FK entre schemas). (4) banco-dados e modulo-catalogo: produto_referencia com marca_id do Promotor.

## Pronto quando
Pronto quando: nenhum artefato de concorrente no Core; ADR 0027 reescrita.
