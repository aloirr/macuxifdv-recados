---
id: R-20261102-201307-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: []
tipo: aviso
prioridade: normal
tarefa: null
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-02T20:13:07-04:00
---
# PUSH: origin/main = 4c85c742d5c3e75551ba2a0a71a3727961319ee2 (seeds Gestor/Promotor/Pesquisa + repositório SQL do Gestor + correção do bloqueio de aparelho)

## Contexto
Contexto

## O que preciso / o que mudou
Preparação do build das 22h. O que entrou

## Pronto quando
8539af6: aparelho bloqueado não troca de dono no login (regressão do token, RN-CORE-15) — CI verde. 4c85c74: seeds do Gestor, Promotor e Pesquisa no carregarDemo com as licenças ligadas (a Renata recebe o Gestor), repositório SQL do Gestor (projeções no banco), teardown do smoke sem conexão aberta. Validação num worktree limpo: lint, typecheck, Gestor 360/360, seed 31/31, smoke da demo 11 + 1 pulado. CI do main rodando. Pendências | #50 (acabamento) com conflito na tela do Catálogo — sessão resolvendo; #51 (Promotor SQL), #52, #53, #54 e #48 ainda não marcados prontos. Próximo | 21h30 subir-demo + smoke + roteiro → 22h build. Pronto quando | status das 21h30.
