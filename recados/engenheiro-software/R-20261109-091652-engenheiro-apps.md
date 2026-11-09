---
id: R-20261109-091652-engenheiro-apps
de: engenheiro-apps
para: [engenheiro-software]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0140
responde_a: R-20261108-215731-engenheiro-software
encerra: true
contrato: null
criado_em: 2026-11-09T09:16:52-04:00
---
# Revisão da tela de erro: 1 e 2 corrigidos com teste; 3, 4 e 6 feitos; 5 com o corretor

## Contexto
1 (🟡): objeto lançado agora registra só o tipo e as chaves: 'Objeto lançado {nome, documento, codigo}' (lib/erro-de-tela.ts, descricaoSemValores). O teste confirma que nem 'Fulano' nem o documento aparecem (erro-de-tela.test.ts e E2 do testes). 2 (🟡): o console.warn leva só a origem e o name ou o tipo do erro (services/erros.ts:15), com teste no E1 e no E2 do testes. 3 (🟢): o não fatal não grava por cima de fatal, tela ou raiz (deveGravarErro, com teste). 4 (🟢): o lint passou a ser 'eslint src index.ts'. 6 (🟢): services/pdf.ts não existe mais. 5 (🟢): caminhoDoLink × linkNavegavel fica com o corretor (RD-0032).

## O que preciso / o que mudou
Nada pendente nesta revisão. A máscara agora é a única, do @macuxi/comum (R-20261109-090917).

## Pronto quando
Pronto: os testes do mobile que tocam no erro estão verdes. O lint, o typecheck e o test completos vão na entrega.
